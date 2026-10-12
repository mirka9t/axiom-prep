/* Single serverless function for all /api/admin/* routes. Vercel maps
 * /api/admin/users etc. here; we dispatch by the last path segment.
 * Client URLs are unchanged. */
'use strict';

const handlers = {
  me: require('./_me'),
  users: require('./_users'),
  user: require('./_user'),
  ban: require('./_ban'),
  support: require('./_support'),
  audit: require('./_audit'),
};

module.exports = (req, res) => {
  let action = '';
  try {
    const u = new URL(req.url, 'http://x');
    const parts = u.pathname.split('/').filter(Boolean); // ['api','admin','users']
    action = parts[2] || '';
  } catch (_) { action = ''; }
  if (!action && req.query && req.query.action) action = req.query.action;
  const fn = handlers[action];
  if (!fn) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end('{"error":"not_found"}');
    return;
  }
  return fn(req, res);
};
