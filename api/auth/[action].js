/* Single serverless function for all /api/auth/* routes (keeps the function
 * count within the Vercel Hobby plan limit). Vercel maps /api/auth/login etc.
 * here; we dispatch by the last path segment. Client URLs are unchanged. */
'use strict';

const handlers = {
  register: require('./_register'),
  login: require('./_login'),
  logout: require('./_logout'),
  me: require('./_me'),
};

module.exports = (req, res) => {
  let action = '';
  try {
    const u = new URL(req.url, 'http://x');
    const parts = u.pathname.split('/').filter(Boolean); // ['api','auth','login']
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
