/* POST /api/admin/ban  { id, banned:true|false, reason? }
 * Bans or unbans a user. Banning also revokes every active session so the
 * block takes effect immediately. */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  if (!(await C.requireAdmin(req, res))) return;
  try {
    const body = await C.readBody(req);
    const id = C.clampStr(typeof body.id === 'string' ? body.id.trim() : '', 64);
    if (typeof body.banned !== 'boolean') return C.bad(res, 'invalid_status');
    const banned = body.banned;
    const reason = C.clampStr(typeof body.reason === 'string' ? body.reason.trim() : '', 300);
    if (!id) return C.bad(res, 'no_id');

    const u = await db.getJSON('user:' + id);
    if (!u) return C.bad(res, 'not_found', 404);

    u.banned = banned;
    u.banReason = banned ? reason : '';
    await db.setJSON('user:' + id, u);
    if (banned) await C.killUserSessions(id);

    await C.adminAudit('user_ban', id, { banned });
    return C.ok(res, { ok: true, banned });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
