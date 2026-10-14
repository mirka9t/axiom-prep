/* AXIOM backend — tiny Redis client over Upstash's REST API.
 *
 * Why Upstash REST: no driver/dependency, works from Vercel serverless with
 * just two env vars, free tier, no card. Every call is one HTTPS request.
 *
 * Required env:
 *   UPSTASH_REDIS_REST_URL   e.g. https://xxxx.upstash.io
 *   UPSTASH_REDIS_REST_TOKEN the REST token for that database
 */
'use strict';

// Accept whichever names the Vercel Redis/Upstash/KV integration provides.
const REST_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.REDIS_REST_API_URL || '';
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.REDIS_REST_API_TOKEN || '';
const HAS_UPSTASH = Boolean(REST_URL && REST_TOKEN);
// Vercel Blob storage (the user's chosen database) when no Redis is set.
const HAS_BLOB = !HAS_UPSTASH && Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const blob = HAS_BLOB ? require('./blobdb') : null;
// Local-dev convenience: when no real database is configured and we are NOT in
// production, use an in-memory store so the whole app runs with zero setup.
// Production always requires a real database (memory would not persist there).
const USE_MEM = !HAS_UPSTASH && !HAS_BLOB && process.env.NODE_ENV !== 'production';
const mem = USE_MEM ? require('./memdb') : null;

function configured() {
  return HAS_UPSTASH || HAS_BLOB || USE_MEM;
}
function backendName() {
  return HAS_UPSTASH ? 'redis' : (HAS_BLOB ? 'blob' : (USE_MEM ? 'memory' : 'none'));
}

/* Run one Redis command. args is an array like ['SET','k','v','EX','60']. */
async function cmd(args) {
  if (!HAS_UPSTASH) {
    if (HAS_BLOB) return blob.exec(args);
    if (USE_MEM) return mem.exec(args);
    const err = new Error('DB_NOT_CONFIGURED');
    err.code = 'DB_NOT_CONFIGURED';
    throw err;
  }
  const res = await fetch(REST_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + REST_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    throw new Error('DB_HTTP_' + res.status);
  }
  const data = await res.json();
  if (data && data.error) throw new Error('DB_ERR: ' + data.error);
  return data ? data.result : null;
}

/* Run several commands in one round trip. cmds is an array of arg-arrays. */
async function pipeline(cmds) {
  if (!cmds.length) return [];
  if (!HAS_UPSTASH) {
    if (HAS_BLOB || USE_MEM) return Promise.all(cmds.map((c) => cmd(c)));
    const err = new Error('DB_NOT_CONFIGURED');
    err.code = 'DB_NOT_CONFIGURED';
    throw err;
  }
  const res = await fetch(REST_URL.replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + REST_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cmds),
  });
  if (!res.ok) throw new Error('DB_HTTP_' + res.status);
  const data = await res.json();
  // pipeline returns an array of {result} / {error}
  return (Array.isArray(data) ? data : []).map((x) => (x && 'result' in x ? x.result : null));
}

/* ---- typed helpers -------------------------------------------------- */

const get = (k) => cmd(['GET', k]);
async function set(k, v, opts) {
  const a = ['SET', k, v];
  if (opts && opts.ex) a.push('EX', String(opts.ex));
  return cmd(a);
}
/* Atomically claim a key. Returns true only when the key did not exist. */
async function setNX(k, v, opts) {
  const args = ['SET', k, v, 'NX'];
  if (opts && opts.ex) args.push('EX', String(opts.ex));
  const result = await cmd(args);
  return result === 'OK';
}
const del = (...k) => cmd(['DEL', ...k]);
const exists = (k) => cmd(['EXISTS', k]);
const expire = (k, s) => cmd(['EXPIRE', k, String(s)]);
const incr = (k) => cmd(['INCR', k]);

async function getJSON(k) {
  const v = await get(k);
  if (v == null) return null;
  try { return JSON.parse(v); } catch (_) { return null; }
}
const setJSON = (k, v, opts) => set(k, JSON.stringify(v), opts);

const lpush = (k, v) => cmd(['LPUSH', k, v]);
const ltrim = (k, a, b) => cmd(['LTRIM', k, String(a), String(b)]);
const lrange = (k, a, b) => cmd(['LRANGE', k, String(a), String(b)]);
const llen = (k) => cmd(['LLEN', k]);

const sadd = (k, v) => cmd(['SADD', k, v]);
const srem = (k, v) => cmd(['SREM', k, v]);
const smembers = (k) => cmd(['SMEMBERS', k]);
const scard = (k) => cmd(['SCARD', k]);
const sismember = (k, v) => cmd(['SISMEMBER', k, v]);

const zadd = (k, score, member) => cmd(['ZADD', k, String(score), member]);
const zrem = (k, member) => cmd(['ZREM', k, member]);
const zcard = (k) => cmd(['ZCARD', k]);
async function zrange(k, start, stop, rev) {
  const a = ['ZRANGE', k, String(start), String(stop)];
  if (rev) a.push('REV');
  return cmd(a);
}

module.exports = {
  configured, backendName, cmd, pipeline,
  get, set, setNX, del, exists, expire, incr,
  getJSON, setJSON,
  lpush, ltrim, lrange, llen,
  sadd, srem, smembers, scard, sismember,
  zadd, zrem, zcard, zrange,
};
