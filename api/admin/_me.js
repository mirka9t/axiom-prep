/* GET /api/admin/me — confirms the admin panel session is valid. */
'use strict';
const C = require('../_lib/core');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET'])) return;
  if (!(await C.requireAdmin(req, res))) return;
  return C.ok(res, { admin: true });
};
