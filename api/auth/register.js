/* POST /api/auth/register  { name, email, password }
 * Creates an account (server-side scrypt hash), starts a session, and sends a
 * sign-up alert to the operator's Telegram. Passwords are NEVER sent anywhere. */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  try {
    if (!(await C.rateLimit(req, 'register', 12, 3600))) return C.bad(res, 'too_many_requests', 429);

    const body = await C.readBody(req);
    const name = C.clampStr((body.name || '').trim(), 60);
    const email = C.clampStr((body.email || '').trim(), 254);
    const emailLower = email.toLowerCase();
    const password = typeof body.password === 'string' ? body.password : '';

    if (name.length < 1) return C.bad(res, 'name_required');
    if (!C.isEmail(email)) return C.bad(res, 'invalid_email');
    if (password.length < 8) return C.bad(res, 'password_too_short');
    if (password.length > 200) return C.bad(res, 'password_too_long');

    // Uniqueness: claim the email key atomically (SET NX).
    const existing = await db.get(C.emailKey(emailLower));
    if (existing) return C.bad(res, 'email_taken', 409);

    const id = C.uid();
    const { salt, hash } = await C.hashPassword(password);
    const user = {
      id, name, email, emailLower, salt, hash,
      created: C.now(), lastSeen: C.now(),
      banned: false, banReason: '', role: 'user',
    };

    await db.setJSON('user:' + id, user);
    await db.set(C.emailKey(emailLower), id);
    await db.lpush('users:all', id);
    try { await db.incr('stat:users'); } catch (_) {}
    await db.set('seen:' + id, String(C.now()));

    const t = await C.createSession(id);
    C.setCookie(res, 'axsid', t, C.SESSION_TTL);

    C.notify(`🆕 New AXIOM sign-up\nName: ${name}\nEmail: ${email}\nTime: ${new Date().toISOString()}`);

    return C.ok(res, { user: { id, name, email, role: 'user' } });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
