/* POST /api/auth/register  { username, password, name? }
 * Simple username + password sign-up (no email, no verification). Passwords are
 * stored only as salted scrypt hashes and are never sent to Telegram. */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  try {
    if (!db.configured()) return C.bad(res, 'backend_not_configured', 503);
    if (!(await C.rateLimit(req, 'register', 15, 3600, true))) return C.bad(res, 'too_many_requests', 429);

    const body = await C.readBody(req);
    const username = C.clampStr(typeof body.username === 'string' ? body.username.trim() : '', 20);
    const name = C.clampStr(typeof body.name === 'string' ? body.name.trim() : '', 60) || username;
    const password = typeof body.password === 'string' ? body.password : '';
    const unameLower = username.toLowerCase();

    if (!C.isUsername(username)) return C.bad(res, 'invalid_username');
    if (password.length < 6) return C.bad(res, 'password_too_short');
    if (password.length > 200) return C.bad(res, 'password_too_long');
    // The admin username is reserved and can only be used to sign in.
    if (C.adminConfigured() && unameLower === String(process.env.ADMIN_USER || '').toLowerCase()) {
      return C.bad(res, 'username_taken', 409);
    }

    const id = C.uid();
    // Claim the username atomically so two sign-ups can't race.
    const key = C.usernameKey(unameLower);
    if (!(await db.setNX(key, id, { ex: 120 }))) return C.bad(res, 'username_taken', 409);

    const { salt, hash } = await C.hashPassword(password);
    const user = {
      id, username, usernameLower: unameLower, name, salt, hash,
      created: C.now(), lastSeen: C.now(),
      banned: false, banReason: '', role: 'user',
    };

    await db.setJSON('user:' + id, user);
    await db.set(key, id);
    await db.lpush('users:all', id);
    try { await db.incr('stat:users'); } catch (_) {}
    await db.set('seen:' + id, String(C.now()));

    const t = await C.createSession(id);
    C.setCookie(res, 'axsid', t, C.SESSION_TTL);

    C.notify('A new AXIOM account was created (username: ' + username + '). No password is included.');

    return C.ok(res, { user: { id, username, name, role: 'user' } });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
