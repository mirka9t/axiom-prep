/* POST /api/activity  { event, data? }
 * Records a small allowlisted learning event for the signed-in user. It never
 * records passwords, messages, or secrets, and it never sends Telegram alerts. */
'use strict';

const C = require('./_lib/core');
const db = require('./_lib/db');

const ALLOWED = {
  lesson_done: ['title', 'unitId', 'lessonId'],
  test_done: ['title', 'score'],
  quiz_done: ['title', 'score'],
};

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  try {
    const user = await C.requireUser(req, res);
    if (!user) return;
    if (!(await C.rateLimit(req, 'activity', 120, 600))) return C.ok(res, { ok: true }); // silently drop floods

    const body = await C.readBody(req);
    const event = C.clampStr(typeof body.event === 'string' ? body.event.trim() : '', 40);
    if (!Object.prototype.hasOwnProperty.call(ALLOWED, event)) return C.bad(res, 'invalid_event');
    const data = body.data && typeof body.data === 'object' ? body.data : {};
    const safe = {};
    for (const field of ALLOWED[event]) {
      if (data[field] == null) continue;
      if (field === 'score') {
        const score = Number(data[field]);
        if (Number.isFinite(score)) safe.score = Math.max(0, Math.min(800, Math.round(score)));
      } else if (typeof data[field] === 'string') {
        safe[field] = data[field].slice(0, field === 'title' ? 120 : 64);
      }
    }

    const entry = JSON.stringify({ event, data: safe, ts: C.now() });
    await db.lpush('activity:' + user.id, entry);
    await db.ltrim('activity:' + user.id, 0, 199);
    await db.set('seen:' + user.id, String(C.now()));

    return C.ok(res, { ok: true });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.ok(res, { ok: true, offline: true });
    return C.bad(res, 'server_error', 500);
  }
};
