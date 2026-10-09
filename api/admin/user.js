/* GET /api/admin/user?id=... — full detail on one user: profile, progress,
 * recent activity, and support thread. Never returns salt/hash. */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET'])) return;
  if (!(await C.requireAdmin(req, res))) return;
  try {
    const url = new URL(req.url, 'http://x');
    const id = C.clampStr(url.searchParams.get('id') || '', 64);
    if (!id) return C.bad(res, 'no_id');

    const u = await db.getJSON('user:' + id);
    if (!u) return C.bad(res, 'not_found', 404);

    const seen = await db.get('seen:' + id);
    const progress = await db.getJSON('progress:' + id);
    const actRaw = (await db.lrange('activity:' + id, 0, 199)) || [];
    const activity = actRaw.map((s) => { try { return JSON.parse(s); } catch (_) { return null; } }).filter(Boolean);
    const supRaw = (await db.lrange('support:' + id, 0, 199)) || [];
    const support = supRaw.map((s) => { try { return JSON.parse(s); } catch (_) { return null; } }).filter(Boolean).reverse();

    return C.ok(res, {
      user: {
        id: u.id, name: u.name, email: u.email, created: u.created,
        lastSeen: seen ? Number(seen) : (u.lastSeen || 0),
        banned: !!u.banned, banReason: u.banReason || '', role: u.role || 'user',
      },
      progress: progress || null,
      activity,
      support,
    });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
