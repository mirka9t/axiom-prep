/* /api/progress
 *   GET  -> { progress }   the signed-in user's saved progress blob
 *   POST { progress }      replace it (opaque JSON, capped at ~200 KB)
 * The server treats progress as an opaque blob, so the client keeps full
 * control of its own shape. */
'use strict';

const C = require('./_lib/core');
const db = require('./_lib/db');

module.exports = async (req, res) => {
  if (!C.methodGuard(req, res, ['GET', 'POST'])) return;
  try {
    const user = await C.requireUser(req, res);
    if (!user) return;

    if (req.method === 'GET') {
      const progress = await db.getJSON('progress:' + user.id);
      return C.ok(res, { progress: progress || null });
    }

    const body = await C.readBody(req);
    const progress = body.progress;
    if (progress == null || typeof progress !== 'object') return C.bad(res, 'invalid_progress');
    const serialized = JSON.stringify(progress);
    if (serialized.length > 200000) return C.bad(res, 'progress_too_large', 413);
    await db.set('progress:' + user.id, serialized);
    await db.set('seen:' + user.id, String(C.now()));
    return C.ok(res, { ok: true });
  } catch (e) {
    if (e && e.code === 'DB_NOT_CONFIGURED') return C.bad(res, 'backend_not_configured', 503);
    return C.bad(res, 'server_error', 500);
  }
};
