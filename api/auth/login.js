/* POST /api/auth/login  { username, password }
 * One form for everyone. If the identifier equals the configured ADMIN_USER it
 * logs the admin in (stateless signed cookie — works even without a database)
 * and returns { admin:true } so the client opens the hidden admin panel.
 * Otherwise it is a normal username login. Errors are generic on purpose. */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  try {
    const body = await C.readBody(req);
    const idf = C.clampStr(typeof body.username === 'string' ? body.username.trim()
      : (typeof body.email === 'string' ? body.email.trim() : ''), 254);
    const password = typeof body.password === 'string' ? body.password : '';
    if (!idf || !password) return C.bad(res, 'invalid_credentials', 401);

    // ---- Admin path (checked first; does NOT require a database) ----
    if (C.adminConfigured() && idf === process.env.ADMIN_USER) {
      // Fail-open rate limit so a missing DB never blocks the admin.
      if (!(await C.rateLimit(req, 'login', 20, 900, false))) return C.bad(res, 'too_many_requests', 429);
      if (!(await C.verifyAdmin(idf, password))) return C.bad(res, 'invalid_credentials', 401);
      C.clearCookie(res, 'axsid'); // drop any user session on this device
      const t = await C.createAdminSession();
      C.setCookie(res, 'axadm', t, C.ADMIN_TTL);
      try { await C.adminAudit('admin_login', 'admin'); } catch (_) {}
      return C.ok(res, { admin: true });
    }

    // ---- User path (needs the database) ----
    if (!db.configured()) return C.bad(res, 'backend_not_configured', 503);
    if (!(await C.rateLimit(req, 'login', 20, 900, true))) return C.bad(res, 'too_many_requests', 429);
    if (!C.isUsername(idf)) return C.bad(res, 'invalid_credentials', 401);

    const uidVal = await db.get(C.usernameKey(idf.toLowerCase()));
    if (!uidVal) return C.bad(res, 'invalid_credentials', 401);
    const user = await db.getJSON('user:' + uidVal);
    if (!user) return C.bad(res, 'invalid_credentials', 401);

    const good = await C.verifyPassword(password, user.salt, user.hash);
    if (!good) return C.bad(res, 'invalid_credentials', 401);

    user.lastSeen = C.now();
    await db.setJSON('user:' + user.id, user);
    await db.set('seen:' + user.id, String(C.now()));

    C.clearCookie(res, 'axadm');
    const t = await C.createSession(user.id);
    C.setCookie(res, 'axsid', t, C.SESSION_TTL);
    return C.ok(res, {
      user: { id: user.id, username: user.username, name: user.name, role: user.role || 'user' },
      restricted: !!user.banned,
      reason: user.banned ? (user.banReason || '') : '',
    });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
