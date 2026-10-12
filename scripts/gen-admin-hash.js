#!/usr/bin/env node
/* Prompt privately for the AXIOM administrator password and generate its scrypt hash. */
'use strict';

const crypto = require('crypto');

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error('Run this from a terminal so the password can be entered without echo.');
  process.exit(1);
}

const stdin = process.stdin;
const stdout = process.stdout;
stdout.write('New administrator password (16+ characters): ');
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

let password = '';
function finish() {
  stdin.setRawMode(false);
  stdin.pause();
  stdout.write('\n');
  if (password.length < 16) {
    console.error('Use a unique password with at least 16 characters.');
    process.exit(1);
  }
  const salt = crypto.randomBytes(16).toString('hex');
  crypto.scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }, (err, key) => {
    password = '';
    if (err) { console.error('Could not generate the password hash.'); process.exit(1); }
    console.log('Add these values to the server environment (Vercel):');
    console.log('ADMIN_PASS_SALT=' + salt);
    console.log('ADMIN_PASS_HASH=' + key.toString('hex'));
    console.log('Set ADMIN_USER=admin_axiom separately if desired.');
  });
}

stdin.on('data', (chunk) => {
  for (const ch of chunk) {
    if (ch === '\u0003') { stdout.write('\n'); process.exit(130); }
    if (ch === '\r' || ch === '\n') { finish(); return; }
    if (ch === '\u007f' || ch === '\b') password = password.slice(0, -1);
    else if (ch >= ' ') password += ch;
  }
});
