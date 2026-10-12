/* GET /api/admin/audit — recent moderation/admin actions, without message text. */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET'])) return;
  if (!(await C.requireAdmin(req, res))) return;
  try {
    const raw = (await db.lrange('admin:audit', 0, 199)) || [];
    const entries = raw.map((s) => { try { return JSON.parse(s); } catch (_) { return null; } }).filter(Boolean);
    return C.ok(res, { entries });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
