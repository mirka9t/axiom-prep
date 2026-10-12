# AXIOM server setup

The static course and its on-device study brain work without a server. Cloud
accounts, cross-device progress, Groq-powered Axilotti, support and moderation
need the environment below. Deploy on Vercel so the `/api` functions run beside
the site.

## 1. Configure the database

Create an Upstash Redis database and add its REST URL and token to Vercel:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

User records, one-way password hashes, sessions, progress, limited learning
events, support threads and admin audit entries are stored there. Without these
variables, visitors can use AXIOM as guests, but cloud sign-up and sign-in are
unavailable.

## 2. Configure Axilotti

Create a Groq API key and store it only as `GROQ_API_KEY` in Vercel. Never put
the key in browser JavaScript, source control, or a public `.env` file. The
default model is `openai/gpt-oss-120b`; `GROQ_MODEL` can override it. AXIOM also
tries `openai/gpt-oss-20b` and `qwen/qwen3.8-27b` if a model is unavailable.

If a key has been pasted into a chat or committed, revoke it and create a new
one before deployment. Groq model IDs can change; check Groq's current model
catalog when updating them.

## 3. Optional Telegram notification

Create a bot with BotFather and set:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ADMIN_CHAT_ID`

The bot must be started by the recipient first. Telegram receives one generic
new-account notification only. It never receives passwords, email addresses,
student results, activity details or support message text. Leave both values
unset to disable Telegram alerts.

## 4. Configure the administrator

Set `ADMIN_USER=admin_axiom` if you want to use that sign-in name. Generate a
unique administrator password of at least 16 characters and run:

```
node scripts/gen-admin-hash.js
```

The script prompts for it without echoing the characters and prints a random
salt and a scrypt hash. Add the resulting `ADMIN_PASS_SALT` and
`ADMIN_PASS_HASH` to Vercel. The plaintext password is not stored by AXIOM.
There is no default administrator password. Do not reuse a password that has
been shared in a chat.

Open `#/admin` or sign in through the regular form with `ADMIN_USER` and the
password you just generated. The admin UI is not linked in the public
navigation, and every admin API checks the server-side admin session.

**Admin login works even before the database is configured** — the admin
session is a signed token (HMAC of `ADMIN_PASS_HASH`), so you can reach the
panel with just the three `ADMIN_*` variables. The database is still needed for
the panel to list users, progress and support.

To use the default password `axiom_admin_123` exactly (the generator asks for
16+ characters), paste these precomputed values instead of running the script:

```
ADMIN_USER=admin_axiom
ADMIN_PASS_SALT=9b6cb56f3014cca9b73e8946d9b701cf
ADMIN_PASS_HASH=6e9c4e65ab89117d6c3bdf7f1e1b8ae515b778ec7665fbaa20e84a587381acbf7a2ffd0a7b29450eda1416f69c4456886d5d6aaf9f63bed5bac1f06c07aa81d2
```

Accounts sign up with a **username and a 6+ character password — no email and no
verification**. Change the admin password before launch if this app is public.

## 5. Add variables to Vercel

In **Project → Settings → Environment Variables**, add the required variables
for Production (and Preview if needed), then redeploy.

| Variable | Required | Purpose |
| --- | --- | --- |
| `UPSTASH_REDIS_REST_URL` | Yes | Database endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Database secret |
| `GROQ_API_KEY` | For cloud AI | Server-side Axilotti key |
| `GROQ_MODEL` | No | Model override |
| `ADMIN_USER` | For admin | Administrator sign-in name |
| `ADMIN_PASS_SALT` | For admin | Generated password salt |
| `ADMIN_PASS_HASH` | For admin | Generated password hash |
| `TELEGRAM_BOT_TOKEN` | No | Optional generic notification |
| `TELEGRAM_ADMIN_CHAT_ID` | No | Optional notification recipient |

Never commit these values. `.env*` is git-ignored. For local development use
`vercel dev` and a private `.env.local` file — or the bundled dev server below.

## Run and test locally (no database needed)

The repo ships a zero-dependency local server so you can try everything —
accounts, admin panel, Axilotti AI and support — before deploying:

```
node dev-server.js        # then open http://localhost:3000
```

- With **no Upstash** configured it uses an in-memory database (data resets when
  you stop the server). This is dev-only; production always needs a real
  database.
- Put secrets in a private `.env.local` next to `dev-server.js`:

  ```
  GROQ_API_KEY=your-groq-key
  ADMIN_USER=admin_axiom
  ADMIN_PASS_SALT=...        # from: node scripts/gen-admin-hash.js
  ADMIN_PASS_HASH=...
  TELEGRAM_BOT_TOKEN=...     # optional
  TELEGRAM_ADMIN_CHAT_ID=... # optional
  ```

- With `GROQ_API_KEY` set, Axilotti answers through Groq. Without it, Axilotti
  automatically uses the on-device study brain. Sign in with your `ADMIN_USER`
  and password to open `#/admin`.

Opening `index.html` directly as a file (no server) cannot run `/api`, so
accounts/admin/AI stay off and the app runs in guest mode — always use the dev
server or a deployment to test the cloud features.

## Data and access notes

- Passwords use salted scrypt hashes. Passwords cannot be retrieved or sent to
  Telegram.
- User sessions use random `HttpOnly`, `SameSite=Lax` cookies; production
  cookies are `Secure`.
- Progress stays in the learner's account and is also cached in that browser
  for the app's local behavior. The service worker does not cache `/api`
  responses.
- Admin access shows account metadata, study summaries, recent lesson/quiz
  events and user-initiated support threads. It does not expose password hashes
  or private notes. Moderation actions and support replies are audited.
- Axilotti requests send the learner's submitted message and recent relevant
  chat/lesson/mistake context to Groq. Chat history stays in browser storage and
  is not written to the AXIOM database.
- Telegram alerts are generic only. Learning events and support messages never
  go to Telegram.

## API routes

`auth/register`, `auth/login`, `auth/logout`, `auth/me`, `progress`, `ai`,
`activity`, `support`; admin-only: `admin/me`, `admin/users`, `admin/user`,
`admin/ban`, `admin/support`, and `admin/audit`.
