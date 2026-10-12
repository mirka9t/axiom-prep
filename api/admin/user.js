/* GET /api/admin/user?id=... — account metadata and a limited study summary.
 * Private notes and password hashes are not returned. */
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
    const savedProgress = await db.getJSON('progress:' + id);
    const history = savedProgress && Array.isArray(savedProgress.mockHist) ? savedProgress.mockHist : [];
    const progress = savedProgress ? {
      xp: Number(savedProgress.xp) || 0,
      lessonsCompleted: savedProgress.lessons && typeof savedProgress.lessons === 'object' ? Object.keys(savedProgress.lessons).length : 0,
      quiz: savedProgress.quiz && typeof savedProgress.quiz === 'object' ? savedProgress.quiz : {},
      answered: Number(savedProgress.answered) || 0,
      correctN: Number(savedProgress.correctN) || 0,
      mockHist: history.slice(-20).map((r) => ({
        date: C.clampStr(r && r.date, 20),
        score: Math.max(0, Math.min(800, Number(r && r.score) || 0)),
        raw: Number(r && r.raw) || 0,
        total: Number(r && r.total) || 0,
        full: !!(r && r.full),
        mods: Number(r && r.mods) || 0,
      })),
    } : null;
    const actRaw = (await db.lrange('activity:' + id, 0, 199)) || [];
    const activity = actRaw.map((s) => { try { return JSON.parse(s); } catch (_) { return null; } }).filter(Boolean);
    return C.ok(res, {
      user: {
        id: u.id, name: u.name, username: u.username || u.email || '', created: u.created,
        lastSeen: seen ? Number(seen) : (u.lastSeen || 0),
        banned: !!u.banned, banReason: u.banReason || '', role: u.role || 'user',
      },
      progress: progress || null,
      activity,
    });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
