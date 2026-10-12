/* AXIOM backend — in-memory fallback datastore for LOCAL DEVELOPMENT ONLY.
 *
 * When no Upstash credentials are set AND NODE_ENV !== 'production', db.js uses
 * this so you can run the whole app locally (accounts, admin, AI, support) with
 * zero database setup. It implements the small Redis subset the app uses.
 *
 * It is per-process and NOT shared across serverless invocations, so it is
 * never used in production — there, a real database (Upstash) is required.
 */
'use strict';

const store = new Map(); // key -> { t:'s'|'l'|'set', v, exp:number|0 }

function live(key) {
  const e = store.get(key);
  if (!e) return null;
  if (e.exp && Date.now() > e.exp) { store.delete(key); return null; }
  return e;
}
function ensure(key, type, make) {
  let e = live(key);
  if (!e) { e = { t: type, v: make(), exp: 0 }; store.set(key, e); }
  return e;
}

function exec(args) {
  const op = String(args[0] || '').toUpperCase();
  const k = args[1];
  switch (op) {
    case 'GET': { const e = live(k); return e && e.t === 's' ? e.v : null; }
    case 'SET': {
      const val = String(args[2]);
      let ex = 0, nx = false;
      for (let i = 3; i < args.length; i++) {
        const f = String(args[i]).toUpperCase();
        if (f === 'EX') ex = Number(args[++i]) || 0;
        else if (f === 'NX') nx = true;
      }
      if (nx && live(k)) return null;
      store.set(k, { t: 's', v: val, exp: ex ? Date.now() + ex * 1000 : 0 });
      return 'OK';
    }
    case 'DEL': { let n = 0; for (let i = 1; i < args.length; i++) { if (live(args[i])) n++; store.delete(args[i]); } return n; }
    case 'EXISTS': return live(k) ? 1 : 0;
    case 'EXPIRE': { const e = live(k); if (!e) return 0; e.exp = Date.now() + (Number(args[2]) || 0) * 1000; return 1; }
    case 'INCR': { const e = ensure(k, 's', () => '0'); const n = (Number(e.v) || 0) + 1; e.v = String(n); return n; }
    case 'LPUSH': { const e = ensure(k, 'l', () => []); for (let i = 2; i < args.length; i++) e.v.unshift(String(args[i])); return e.v.length; }
    case 'RPUSH': { const e = ensure(k, 'l', () => []); for (let i = 2; i < args.length; i++) e.v.push(String(args[i])); return e.v.length; }
    case 'LLEN': { const e = live(k); return e && e.t === 'l' ? e.v.length : 0; }
    case 'LRANGE': {
      const e = live(k); if (!e || e.t !== 'l') return [];
      let a = Number(args[2]), b = Number(args[3]); const len = e.v.length;
      if (a < 0) a = Math.max(0, len + a);
      if (b < 0) b = len + b;
      return e.v.slice(a, b + 1);
    }
    case 'LTRIM': {
      const e = live(k); if (!e || e.t !== 'l') return 'OK';
      let a = Number(args[2]), b = Number(args[3]); const len = e.v.length;
      if (a < 0) a = Math.max(0, len + a);
      if (b < 0) b = len + b;
      e.v = e.v.slice(a, b + 1); return 'OK';
    }
    case 'SADD': { const e = ensure(k, 'set', () => new Set()); let n = 0; for (let i = 2; i < args.length; i++) { if (!e.v.has(String(args[i]))) { e.v.add(String(args[i])); n++; } } return n; }
    case 'SREM': { const e = live(k); if (!e || e.t !== 'set') return 0; let n = 0; for (let i = 2; i < args.length; i++) { if (e.v.delete(String(args[i]))) n++; } return n; }
    case 'SMEMBERS': { const e = live(k); return e && e.t === 'set' ? Array.from(e.v) : []; }
    case 'SCARD': { const e = live(k); return e && e.t === 'set' ? e.v.size : 0; }
    case 'SISMEMBER': { const e = live(k); return e && e.t === 'set' && e.v.has(String(args[2])) ? 1 : 0; }
    // ZSET ops are declared in db.js but unused by the app; minimal no-ops keep parity.
    case 'ZADD': return 1;
    case 'ZREM': return 1;
    case 'ZCARD': return 0;
    case 'ZRANGE': return [];
    default: return null;
  }
}

function reset() { store.clear(); }

module.exports = { exec, reset };
