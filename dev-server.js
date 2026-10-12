#!/usr/bin/env node
/* AXIOM local dev server — zero dependencies.
 *
 *   node dev-server.js        then open http://localhost:3000
 *
 * Serves the static site AND runs the /api/* serverless handlers in one Node
 * process, so you can test accounts, the admin panel, Axilotti AI and support
 * locally. With no Upstash configured it uses the in-memory dev database
 * (data resets when you stop the server). Put secrets in .env.local:
 *
 *   GROQ_API_KEY=...            (for Axilotti cloud answers)
 *   ADMIN_USER=admin_axiom
 *   ADMIN_PASS_SALT=...         (node scripts/gen-admin-hash.js)
 *   ADMIN_PASS_HASH=...
 *   TELEGRAM_BOT_TOKEN=...      (optional)
 *   TELEGRAM_ADMIN_CHAT_ID=...  (optional)
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

/* ---- load .env.local (simple KEY=VALUE) ---- */
(function loadEnv() {
  const f = path.join(ROOT, '.env.local');
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const s = line.trim();
    if (!s || s[0] === '#') continue;
    const i = s.indexOf('=');
    if (i < 0) continue;
    const key = s.slice(0, i).trim();
    let val = s.slice(i + 1).trim();
    if ((val[0] === '"' && val.endsWith('"')) || (val[0] === "'" && val.endsWith("'"))) val = val.slice(1, -1);
    if (!(key in process.env)) process.env[key] = val;
  }
})();

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.map': 'application/json',
};

function serveStatic(req, res) {
  let urlPath = decodeURIComponent((req.url.split('?')[0] || '/'));
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
  // Prevent path traversal.
  const abs = path.normalize(path.join(ROOT, urlPath));
  if (!abs.startsWith(ROOT)) { res.statusCode = 403; res.end('Forbidden'); return; }
  fs.stat(abs, (err, st) => {
    if (err || !st.isFile()) {
      // SPA fallback for extensionless / unknown paths.
      if (!path.extname(urlPath)) return sendFile(res, path.join(ROOT, 'index.html'));
      res.statusCode = 404; res.end('Not found'); return;
    }
    sendFile(res, abs);
  });
}
function sendFile(res, abs) {
  fs.readFile(abs, (err, buf) => {
    if (err) { res.statusCode = 500; res.end('Error'); return; }
    res.setHeader('Content-Type', TYPES[path.extname(abs).toLowerCase()] || 'application/octet-stream');
    if (abs.endsWith('sw.js')) res.setHeader('Cache-Control', 'no-cache');
    res.end(buf);
  });
}

function runApi(req, res) {
  const pathname = req.url.split('?')[0]; // e.g. /api/auth/login
  const rel = pathname.replace(/^\/api\//, '').replace(/\/+$/, '');
  // Block traversal and underscore-prefixed files/segments (helpers, like Vercel).
  if (!rel || rel.includes('..') || rel.split('/').some((s) => s.startsWith('_'))) {
    res.statusCode = 404; res.setHeader('Content-Type', 'application/json'); res.end('{"error":"not_found"}'); return;
  }
  let file = path.join(ROOT, 'api', rel + '.js');
  if (!fs.existsSync(file)) {
    // Fall back to a dynamic [action].js route in the same folder (Vercel-style).
    const dir = path.dirname(rel);
    const dyn = path.join(ROOT, 'api', dir === '.' ? '' : dir, '[action].js');
    if (dir !== '.' && fs.existsSync(dyn)) file = dyn;
  }
  if (!fs.existsSync(file)) {
    res.statusCode = 404; res.setHeader('Content-Type', 'application/json'); res.end('{"error":"not_found"}'); return;
  }
  let handler;
  try { handler = require(file); } catch (e) {
    console.error('Handler load error', rel, e);
    res.statusCode = 500; res.setHeader('Content-Type', 'application/json'); res.end('{"error":"handler_load"}'); return;
  }
  Promise.resolve()
    .then(() => handler(req, res))
    .catch((e) => {
      console.error('Handler error', rel, e);
      if (!res.writableEnded) { res.statusCode = 500; res.setHeader('Content-Type', 'application/json'); res.end('{"error":"server_error"}'); }
    });
}

http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) return runApi(req, res);
  return serveStatic(req, res);
}).listen(PORT, () => {
  const upstash = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  console.log('\nAXIOM dev server → http://localhost:' + PORT);
  console.log('  Database : ' + (upstash ? 'Upstash (real)' : 'in-memory (dev; resets on restart)'));
  console.log('  Groq AI  : ' + (process.env.GROQ_API_KEY ? 'configured' : 'NOT set (Axilotti uses the on-device brain)'));
  console.log('  Admin    : ' + (process.env.ADMIN_USER && process.env.ADMIN_PASS_HASH ? 'configured (log in with your admin user)' : 'NOT set'));
  console.log('  Telegram : ' + (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_ADMIN_CHAT_ID ? 'configured' : 'NOT set') + '\n');
});
