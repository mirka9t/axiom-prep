/* POST /api/activity  { event, data? }
 * Records a usage event for the signed-in user (for the admin panel) and, for
 * notable events, sends a short summary to the operator's Telegram.
 * Never records passwords or secrets. */
'use strict';

const C = require('./_lib/core');
const db = require('./_lib/db');

const NOTABLE = new Set(['lesson_done', 'test_done', 'quiz_done', 'level_up']);

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['POST'])) return;
  try {
    const user = await C.requireUser(req, res);
    if (!user) return;
    if (!(await C.rateLimit(req, 'activity', 120, 600))) return C.ok(res, { ok: true }); // silently drop floods

    const body = await C.readBody(req);
    const event = C.clampStr((body.event || '').trim(), 40);
    if (!event) return C.bad(res, 'no_event');
    const data = body.data && typeof body.data === 'object' ? body.data : {};
    const safeData = JSON.stringify(data).slice(0, 2000);

    const entry = JSON.stringify({ event, data: JSON.parse(safeData), ts: C.now() });
    await db.lpush('activity:' + user.id, entry);
    await db.ltrim('activity:' + user.id, 0, 199);
    await db.set('seen:' + user.id, String(C.now()));

    if (NOTABLE.has(event)) {
      const d = JSON.parse(safeData);
      const bits = [];
      if (d.title) bits.push(String(d.title).slice(0, 120));
      if (d.score != null) bits.push('score ' + String(d.score).slice(0, 40));
      if (d.level != null) bits.push('level ' + String(d.level).slice(0, 20));
      C.notify(`📊 ${user.name} (${user.email})\n${event}${bits.length ? ' — ' + bits.join(', ') : ''}`);
    }
    return C.ok(res, { ok: true });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.ok(res, { ok: true, offline: true });
    return C.bad(res, 'server_error', 500);
  }
};
