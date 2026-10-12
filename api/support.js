/* /api/support
 *   GET  -> { messages }   the signed-in user's support thread (chronological)
 *   POST { text }          user sends a message; stored in the support thread
 * The admin replies from the admin panel; replies appear here for the user. */
'use strict';

const C = require('./_lib/core');
const db = require('./_lib/db');

function readThread(list) {
  return (list || []).map((s) => { try { return JSON.parse(s); } catch (_) { return null; } })
    .filter(Boolean).reverse(); // stored newest-first; show oldest-first
}

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET', 'POST'])) return;
  try {
    // Restricted users can still read and send support messages to appeal a
    // moderation decision. Other account APIs continue to use requireUser.
    const user = await C.sessionUser(req);
    if (!user) return C.bad(res, 'not_signed_in', 401);

    if (req.method === 'GET') {
      const list = await db.lrange('support:' + user.id, 0, 199);
      return C.ok(res, { messages: readThread(list) });
    }

    if (!(await C.rateLimit(req, 'support', 20, 600))) return C.bad(res, 'too_many_requests', 429);
    const body = await C.readBody(req);
    const text = C.clampStr(typeof body.text === 'string' ? body.text.trim() : '', 2000);
    if (!text) return C.bad(res, 'empty_message');

    const entry = JSON.stringify({ from: 'user', text, ts: C.now() });
    await db.lpush('support:' + user.id, entry);
    await db.ltrim('support:' + user.id, 0, 199);
    await db.sadd('support:threads', user.id);
    await db.set('support:unread:' + user.id, '1');

    return C.ok(res, { ok: true });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
