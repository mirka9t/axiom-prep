/* /api/admin/support
 *   GET            -> { threads }   one row per user who has messaged support
 *   GET ?id=...    -> { messages }  the full thread for that user
 *   POST { userId, text }           admin reply (appears in the user's app)
 */
'use strict';

const C = require('../_lib/core');
const db = require('../_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET', 'POST'])) return;
  if (!(await C.requireAdmin(req, res))) return;
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url, 'http://x');
      const id = C.clampStr(url.searchParams.get('id') || '', 64);
      if (id) {
        const raw = (await db.lrange('support:' + id, 0, 199)) || [];
        const messages = raw.map((s) => { try { return JSON.parse(s); } catch (_) { return null; } }).filter(Boolean).reverse();
        await db.del('support:unread:' + id); // reading marks it read
        return C.ok(res, { messages });
      }
      const ids = (await db.smembers('support:threads')) || [];
      const threads = [];
      for (const uid of ids) {
        const u = await db.getJSON('user:' + uid);
        if (!u) continue;
        const raw = (await db.lrange('support:' + uid, 0, 0)) || [];
        let last = null;
        try { last = raw[0] ? JSON.parse(raw[0]) : null; } catch (_) { last = null; }
        const unread = await db.get('support:unread:' + uid);
        threads.push({
          userId: uid, name: u.name, username: u.username || u.email || '',
          lastText: last ? last.text : '', lastFrom: last ? last.from : '', lastTs: last ? last.ts : 0,
          unread: unread === '1',
        });
      }
      threads.sort((a, b) => (b.lastTs || 0) - (a.lastTs || 0));
      return C.ok(res, { threads });
    }

    // POST — admin reply
    const body = await C.readBody(req);
    const userId = C.clampStr(typeof body.userId === 'string' ? body.userId.trim() : '', 64);
    const text = C.clampStr(typeof body.text === 'string' ? body.text.trim() : '', 2000);
    if (!userId || !text) return C.bad(res, 'bad_request');
    const u = await db.getJSON('user:' + userId);
    if (!u) return C.bad(res, 'not_found', 404);

    const entry = JSON.stringify({ from: 'admin', text, ts: C.now() });
    await db.lpush('support:' + userId, entry);
    await db.ltrim('support:' + userId, 0, 199);
    await db.sadd('support:threads', userId);
    await db.del('support:unread:' + userId);
    await C.adminAudit('support_reply', userId);
    return C.ok(res, { ok: true });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
