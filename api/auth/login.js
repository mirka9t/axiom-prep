/* POST /api/auth/login  { email, password }
 * One form for everyone. If the identifier matches the configured ADMIN_USER,
 * this logs the admin in (sets a short-lived admin cookie) and returns
 * { admin:true } so the client can open the hidden admin panel. Otherwise it is
 * a normal user login. Errors are deliberately generic to avoid leaking which
 * field was wrong. */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  try {
    if (!(await C.rateLimit(req, 'login', 20, 900))) return C.bad(res, 'too_many_requests', 429);

    const body = await C.readBody(req);
    const idf = C.clampStr((body.email || '').trim(), 254);
    const password = typeof body.password === 'string' ? body.password : '';
    if (!idf || !password) return C.bad(res, 'invalid_credentials', 401);

    // Admin path — identifier equals the configured admin username.
    if (C.adminConfigured() && idf === process.env.ADMIN_USER) {
      const okAdmin = await C.verifyAdmin(idf, password);
      if (!okAdmin) return C.bad(res, 'invalid_credentials', 401);
      const t = await C.createAdminSession();
      C.setCookie(res, 'axadm', t, C.ADMIN_TTL);
      return C.ok(res, { admin: true });
    }

    // User path.
    if (!C.isEmail(idf)) return C.bad(res, 'invalid_credentials', 401);
    const uidVal = await db.get(C.emailKey(idf.toLowerCase()));
    if (!uidVal) return C.bad(res, 'invalid_credentials', 401);
    const user = await db.getJSON('user:' + uidVal);
    if (!user) return C.bad(res, 'invalid_credentials', 401);

    const good = await C.verifyPassword(password, user.salt, user.hash);
    if (!good) return C.bad(res, 'invalid_credentials', 401);
    if (user.banned) return C.bad(res, 'banned', 403);

    user.lastSeen = C.now();
    await db.setJSON('user:' + user.id, user);
    await db.set('seen:' + user.id, String(C.now()));

    const t = await C.createSession(user.id);
    C.setCookie(res, 'axsid', t, C.SESSION_TTL);
    return C.ok(res, { user: { id: user.id, name: user.name, email: user.email, role: user.role || 'user' } });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
