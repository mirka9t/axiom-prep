/* GET /api/auth/me — who is signed in on this device (and is admin unlocked?). */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET'])) return;
  try {
    let admin = false;
    const c = C.getCookies(req);
    if (c.axadm) {
      const s = await db.getJSON('adminsession:' + c.axadm);
      admin = Boolean(s);
    }
    const user = await C.sessionUser(req);
    if (!user) return C.ok(res, { user: null, admin });
    if (user.banned) { C.clearCookie(res, 'axsid'); return C.ok(res, { user: null, admin, banned: true, reason: user.banReason || '' }); }
    return C.ok(res, { user: { id: user.id, name: user.name, email: user.email, role: user.role || 'user' }, admin });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.ok(res, { user: null, admin: false, offline: true });
    return C.bad(res, 'server_error', 500);
  }
};
