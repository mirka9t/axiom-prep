/* GET /api/admin/users?offset=0&limit=50 — paginated user list for the panel.
 * Returns safe fields only (never salt/hash). */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET'])) return;
  if (!(await C.requireAdmin(req, res))) return;
  try {
    const url = new URL(req.url, 'http://x');
    let offset = parseInt(url.searchParams.get('offset') || '0', 10);
    let limit = parseInt(url.searchParams.get('limit') || '50', 10);
    if (!Number.isFinite(offset) || offset < 0) offset = 0;
    if (!Number.isFinite(limit) || limit < 1) limit = 50;
    if (limit > 200) limit = 200;

    const total = (await db.llen('users:all')) || 0;
    const ids = (await db.lrange('users:all', offset, offset + limit - 1)) || [];

    const users = [];
    for (const id of ids) {
      const u = await db.getJSON('user:' + id);
      if (!u) continue;
      const seen = await db.get('seen:' + id);
      const unread = await db.get('support:unread:' + id);
      users.push({
        id: u.id,
        name: u.name,
        email: u.email,
        created: u.created,
        lastSeen: seen ? Number(seen) : (u.lastSeen || 0),
        banned: !!u.banned,
        banReason: u.banReason || '',
        unreadSupport: unread === '1',
      });
    }
    return C.ok(res, { users, total, offset, limit });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
