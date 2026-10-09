#!/usr/bin/env node
/* Generate ADMIN_PASS_SALT and ADMIN_PASS_HASH for the admin panel.
 *
 * Usage:
 *   node scripts/gen-admin-hash.js "your-admin-password"
 *
 * Paste the printed lines into your Vercel Environment Variables (never commit
 * them). The plaintext password is never stored anywhere — only this hash.
 * Must use the SAME scrypt parameters as api/_lib/core.js. */
'use strict';

const crypto = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/gen-admin-hash.js "your-admin-password"');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
crypto.scrypt(String(password), salt, 64, { N: 16384, r: 8, p: 1 }, (err, dk) => {
  if (err) { console.error(err); process.exit(1); }
  const hash = dk.toString('hex');
  console.log('\nAdd these to your Vercel Environment Variables:\n');
  console.log('ADMIN_USER=admin_axiom');
  console.log('ADMIN_PASS_SALT=' + salt);
  console.log('ADMIN_PASS_HASH=' + hash);
  console.log('\n(ADMIN_USER can be anything you like — this is what you type in the login box.)');
});
