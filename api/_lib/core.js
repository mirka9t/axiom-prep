/* AXIOM backend — shared core: request/response helpers, password hashing,
 * sessions (user + admin), rate limiting, validation, and Telegram alerts.
 *
 * No third-party dependencies: Node's built-in crypto + global fetch only.
 */
'use strict';

const crypto = require('crypto');
const db = require('./db');

const IS_PROD = process.env.NODE_ENV === 'production';
const SESSION_DAYS = 30;
const SESSION_TTL = SESSION_DAYS * 24 * 60 * 60; // seconds
const ADMIN_TTL = 12 * 60 * 60; // admin sessions are short-lived

/* ---- time / ids ----------------------------------------------------- */
const now = () => Date.now();
const uid = () => crypto.randomUUID();
const token = () => crypto.randomBytes(32).toString('hex');

/* ---- request body --------------------------------------------------- */
async function readBody(req) {
  // Vercel often pre-parses JSON into req.body.
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) {
    try { return JSON.parse(req.body); } catch (_) { return {}; }
  }
  // Fall back to reading the stream (cap at 256 KB).
  return await new Promise((resolve) => {
    let data = '';
    let tooBig = false;
    req.on('data', (c) => {
      data += c;
      if (data.length > 262144) { tooBig = true; req.destroy(); }
    });
    req.on('end', () => {
      if (tooBig || !data) return resolve({});
      try { resolve(JSON.parse(data)); } catch (_) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

/* ---- responses ------------------------------------------------------ */
function sendJSON(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}
const ok = (res, obj) => sendJSON(res, 200, obj || { ok: true });
const bad = (res, msg, status) => sendJSON(res, status || 400, { error: msg || 'bad_request' });

function methodGuard(req, res, methods) {
  if (!methods.includes(req.method)) {
    res.setHeader('Allow', methods.join(', '));
    sendJSON(res, 405, { error: 'method_not_allowed' });
    return false;
  }
  return true;
}

/* ---- cookies -------------------------------------------------------- */
function getCookies(req) {
  const out = {};
  const raw = req.headers.cookie || '';
  raw.split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i < 0) return;
    const k = p.slice(0, i).trim();
    const v = p.slice(i + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  });
  return out;
}
function cookieHeader(name, value, maxAge) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ];
  if (IS_PROD) parts.push('Secure');
  return parts.join('; ');
}
function appendCookie(res, header) {
  const prev = res.getHeader('Set-Cookie');
  if (!prev) res.setHeader('Set-Cookie', header);
  else res.setHeader('Set-Cookie', Array.isArray(prev) ? prev.concat(header) : [prev, header]);
}
const setCookie = (res, name, value, maxAge) => appendCookie(res, cookieHeader(name, value, maxAge));
const clearCookie = (res, name) => appendCookie(res, cookieHeader(name, '', 0));

/* ---- password hashing (scrypt) ------------------------------------- */
function hashPassword(password, saltHex) {
  const salt = saltHex || crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(String(password), salt, 64, { N: 16384, r: 8, p: 1 }, (err, dk) => {
      if (err) reject(err);
      else resolve({ salt, hash: dk.toString('hex') });
    });
  });
}
async function verifyPassword(password, saltHex, expectedHex) {
  if (!saltHex || !expectedHex) return false;
  const { hash } = await hashPassword(password, saltHex);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(expectedHex, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/* ---- sessions (users) ---------------------------------------------- */
async function createSession(userId) {
  const t = token();
  await db.setJSON('session:' + t, { userId, created: now() }, { ex: SESSION_TTL });
  // Index the token under the user so a ban can revoke every active session.
  try { await db.sadd('usersessions:' + userId, t); } catch (_) {}
  return t;
}
async function killUserSessions(userId) {
  try {
    const toks = (await db.smembers('usersessions:' + userId)) || [];
    if (toks.length) await db.del(...toks.map((t) => 'session:' + t));
    await db.del('usersessions:' + userId);
  } catch (_) { /* best effort */ }
}
async function sessionUser(req) {
  const c = getCookies(req);
  const t = c.axsid;
  if (!t) return null;
  const s = await db.getJSON('session:' + t);
  if (!s || !s.userId) return null;
  const user = await db.getJSON('user:' + s.userId);
  if (!user) return null;
  user._token = t;
  return user;
}
async function destroySession(req) {
  const c = getCookies(req);
  if (c.axsid) await db.del('session:' + c.axsid);
}

/* Guard: resolves to the user or sends 401 and returns null. Also blocks bans. */
async function requireUser(req, res) {
  const user = await sessionUser(req);
  if (!user) { sendJSON(res, 401, { error: 'not_signed_in' }); return null; }
  if (user.banned) { sendJSON(res, 403, { error: 'banned', reason: user.banReason || '' }); return null; }
  return user;
}

/* ---- sessions (admin) ---------------------------------------------- */
function adminConfigured() {
  return Boolean(process.env.ADMIN_USER && process.env.ADMIN_PASS_HASH && process.env.ADMIN_PASS_SALT);
}
async function verifyAdmin(username, password) {
  if (!adminConfigured()) return false;
  const u = process.env.ADMIN_USER || '';
  // constant-time-ish username compare
  const ub = Buffer.from(String(username));
  const eb = Buffer.from(u);
  const userOk = ub.length === eb.length && crypto.timingSafeEqual(ub, eb);
  const passOk = await verifyPassword(password, process.env.ADMIN_PASS_SALT, process.env.ADMIN_PASS_HASH);
  return userOk && passOk;
}
async function createAdminSession() {
  const t = token();
  await db.setJSON('adminsession:' + t, { created: now() }, { ex: ADMIN_TTL });
  return t;
}
async function requireAdmin(req, res) {
  const c = getCookies(req);
  const t = c.axadm;
  if (t) {
    const s = await db.getJSON('adminsession:' + t);
    if (s) return true;
  }
  sendJSON(res, 401, { error: 'admin_auth_required' });
  return false;
}
async function destroyAdminSession(req) {
  const c = getCookies(req);
  if (c.axadm) await db.del('adminsession:' + c.axadm);
}

/* ---- rate limiting (fixed window via Redis INCR) ------------------- */
function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (xf) return String(xf).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}
/* Returns true if the request is allowed, false if the limit is exceeded.
 * Fails OPEN if the DB is unavailable (never locks real users out). */
async function rateLimit(req, name, max, windowSec) {
  try {
    const key = 'rl:' + name + ':' + clientIp(req);
    const n = await db.incr(key);
    if (n === 1) await db.expire(key, windowSec);
    return n <= max;
  } catch (_) {
    return true;
  }
}

/* ---- validation ----------------------------------------------------- */
const isEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
const clampStr = (s, max) => (typeof s === 'string' ? s.slice(0, max) : '');
function emailKey(email) { return 'email:' + String(email).trim().toLowerCase(); }

/* ---- Telegram alerts (outbound only; never throws, never blocks) ---- */
function tgConfigured() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_ADMIN_CHAT_ID);
}
async function telegram(text) {
  if (!tgConfigured()) return;
  try {
    const url = 'https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/sendMessage';
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
        text: String(text).slice(0, 3800),
        disable_web_page_preview: true,
      }),
    });
  } catch (_) { /* notifications must never break the request */ }
}
/* Fire-and-forget so the user's response isn't delayed by Telegram. */
function notify(text) { telegram(text).catch(() => {}); }

module.exports = {
  IS_PROD, SESSION_TTL, ADMIN_TTL,
  now, uid, token,
  readBody, sendJSON, ok, bad, methodGuard,
  getCookies, setCookie, clearCookie,
  hashPassword, verifyPassword,
  createSession, killUserSessions, sessionUser, destroySession, requireUser,
  adminConfigured, verifyAdmin, createAdminSession, requireAdmin, destroyAdminSession,
  clientIp, rateLimit,
  isEmail, clampStr, emailKey,
  tgConfigured, telegram, notify,
};
