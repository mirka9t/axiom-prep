/* AXIOM backend — a small key/value store built on Vercel Blob.
 *
 * Vercel Blob is object storage, not a database, so this adapter emulates the
 * tiny Redis subset the app uses:
 *   - each logical key -> one JSON blob at a deterministic pathname (kv/...)
 *   - values are wrapped in an envelope { t, v, exp } so we can fake TTL
 *   - lists and sets are stored as the whole array and rewritten on change
 *   - reads fetch the blob by the store's own URL (never exposed to the client)
 *
 * It implements exec(args) with the same command shape as the Redis/in-memory
 * backends, so db.js can route to it unchanged. Not atomic (Blob has no
 * compare-and-set); fine for this app's low write concurrency.
 *
 * Needs env BLOB_READ_WRITE_TOKEN (set by Vercel's Blob integration).
 */
'use strict';

let _client = null;              // { put, list, del } from @vercel/blob
function client() {
  if (!_client) _client = require('@vercel/blob');
  return _client;
}
function __setClient(c) { _client = c; } // test seam

const TOKEN = () => process.env.BLOB_READ_WRITE_TOKEN || '';
const now = () => Date.now();

let baseUrl = null; // e.g. https://<store>.public.blob.vercel-storage.com/

function pathFor(key) {
  return 'kv/' + String(key).replace(/:/g, '/').replace(/[^a-zA-Z0-9/._-]/g, '_');
}
async function ensureBase() {
  if (baseUrl) return baseUrl;
  try {
    const { list } = client();
    const out = await list({ token: TOKEN(), limit: 1 });
    const b = out && out.blobs && out.blobs[0];
    if (b && b.url && b.pathname) baseUrl = b.url.slice(0, b.url.length - b.pathname.length);
  } catch (_) { /* empty store or transient */ }
  return baseUrl;
}

async function readEnv(key) {
  const path = pathFor(key);
  const base = await ensureBase();
  if (!base) return null; // nothing stored yet
  let res;
  try { res = await fetch(base + path, { cache: 'no-store' }); } catch (_) { return null; }
  if (!res || !res.ok) return null;
  let env;
  try { env = JSON.parse(await res.text()); } catch (_) { return null; }
  if (env && env.exp && now() > env.exp) { try { await delKey(key); } catch (_) {} return null; }
  return env;
}
async function writeEnv(key, env, nx) {
  const { put } = client();
  const r = await put(pathFor(key), JSON.stringify(env), {
    access: 'public', token: TOKEN(), addRandomSuffix: false,
    allowOverwrite: !nx, contentType: 'application/json',
  });
  if (r && r.url && r.pathname) baseUrl = r.url.slice(0, r.url.length - r.pathname.length);
  return r;
}
async function delKey(key) {
  const path = pathFor(key);
  const base = await ensureBase();
  const { del } = client();
  try { if (base) await del(base + path, { token: TOKEN() }); } catch (_) {}
  return 1;
}

async function exec(args) {
  const op = String(args[0] || '').toUpperCase();
  const k = args[1];
  switch (op) {
    case 'GET': { const e = await readEnv(k); return e && e.t === 's' ? e.v : null; }
    case 'SET': {
      let ex = 0, nx = false;
      for (let i = 3; i < args.length; i++) { const f = String(args[i]).toUpperCase(); if (f === 'EX') ex = Number(args[++i]) || 0; else if (f === 'NX') nx = true; }
      if (nx) { const existing = await readEnv(k); if (existing) return null; }
      try { await writeEnv(k, { t: 's', v: String(args[2]), exp: ex ? now() + ex * 1000 : 0 }, nx); }
      catch (e) { if (nx) return null; throw e; }
      return 'OK';
    }
    case 'DEL': { let n = 0; for (let i = 1; i < args.length; i++) { await delKey(args[i]); n++; } return n; }
    case 'EXISTS': return (await readEnv(k)) ? 1 : 0;
    case 'EXPIRE': { const e = await readEnv(k); if (!e) return 0; e.exp = now() + (Number(args[2]) || 0) * 1000; await writeEnv(k, e); return 1; }
    case 'INCR': { const e = await readEnv(k); const n = (e && e.t === 's' ? Number(e.v) || 0 : 0) + 1; await writeEnv(k, { t: 's', v: String(n), exp: e ? e.exp : 0 }); return n; }
    case 'LPUSH': { const e = (await readEnv(k)) || { t: 'l', v: [], exp: 0 }; if (e.t !== 'l') { e.t = 'l'; e.v = []; } for (let i = 2; i < args.length; i++) e.v.unshift(String(args[i])); await writeEnv(k, e); return e.v.length; }
    case 'LLEN': { const e = await readEnv(k); return e && e.t === 'l' ? e.v.length : 0; }
    case 'LRANGE': { const e = await readEnv(k); if (!e || e.t !== 'l') return []; let a = Number(args[2]), b = Number(args[3]); const len = e.v.length; if (a < 0) a = Math.max(0, len + a); if (b < 0) b = len + b; return e.v.slice(a, b + 1); }
    case 'LTRIM': { const e = await readEnv(k); if (!e || e.t !== 'l') return 'OK'; let a = Number(args[2]), b = Number(args[3]); const len = e.v.length; if (a < 0) a = Math.max(0, len + a); if (b < 0) b = len + b; e.v = e.v.slice(a, b + 1); await writeEnv(k, e); return 'OK'; }
    case 'SADD': { const e = (await readEnv(k)) || { t: 'set', v: [], exp: 0 }; if (e.t !== 'set') { e.t = 'set'; e.v = []; } const s = new Set(e.v); let n = 0; for (let i = 2; i < args.length; i++) { if (!s.has(String(args[i]))) { s.add(String(args[i])); n++; } } e.v = Array.from(s); await writeEnv(k, e); return n; }
    case 'SREM': { const e = await readEnv(k); if (!e || e.t !== 'set') return 0; const s = new Set(e.v); let n = 0; for (let i = 2; i < args.length; i++) { if (s.delete(String(args[i]))) n++; } e.v = Array.from(s); await writeEnv(k, e); return n; }
    case 'SMEMBERS': { const e = await readEnv(k); return e && e.t === 'set' ? e.v.slice() : []; }
    case 'SCARD': { const e = await readEnv(k); return e && e.t === 'set' ? e.v.length : 0; }
    case 'SISMEMBER': { const e = await readEnv(k); return e && e.t === 'set' && e.v.indexOf(String(args[2])) >= 0 ? 1 : 0; }
    case 'ZADD': return 1; case 'ZREM': return 1; case 'ZCARD': return 0; case 'ZRANGE': return [];
    default: return null;
  }
}

module.exports = { exec, __setClient, _pathFor: pathFor, _reset: () => { baseUrl = null; } };
