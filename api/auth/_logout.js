/* POST /api/auth/logout — ends both the user and admin session on this device. */
'use strict';

const C = require('../_lib/core');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  try {
    const cookies = C.getCookies(req);
    if (cookies.axadm) await C.adminAudit('admin_logout', 'admin').catch(() => {});
    await C.destroySession(req);
    await C.destroyAdminSession(req);
  } catch (_) { /* ignore */ }
  C.clearCookie(res, 'axsid');
  C.clearCookie(res, 'axadm');
  return C.ok(res, { ok: true });
};
