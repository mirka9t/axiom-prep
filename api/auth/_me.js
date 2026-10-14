/* GET /api/auth/me — who is signed in on this device (and is admin unlocked?). */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET'])) return;
  try {
    const admin = C.isAdminReq(req); // stateless, no database needed
    const configured = db.configured(); // is the account database set up?
    const backend = db.backendName(); // which database backend is active
    const user = await C.sessionUser(req);
    if (!user) return C.ok(res, { user: null, admin, configured, backend });
    return C.ok(res, {
      user: { id: user.id, username: user.username, name: user.name, role: user.role || 'user' },
      admin,
      configured,
      backend,
      banned: !!user.banned,
      reason: user.banned ? (user.banReason || '') : '',
    });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.ok(res, { user: null, admin: false, offline: true });
    return C.bad(res, 'server_error', 500);
  }
};
