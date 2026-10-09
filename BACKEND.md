# AXIOM backend — setup (about 10 minutes)

AXIOM now has a small, secure serverless backend that runs on Vercel next to the
static site. It powers: database-backed accounts, the Axilotti AI (Groq), the
admin panel, Telegram alerts, progress sync, activity tracking and support chat.

**Nothing works until you set the environment variables below.** Until then the
app automatically falls back to its old browser-only behaviour, so it never
breaks — it just runs without the new features.

---

## 1. Create the database (Upstash Redis — free, no card)

1. Go to <https://upstash.com> and sign up (GitHub login is fine).
2. **Create Database** → Redis → pick a region near your users → Create.
3. On the database page, open the **REST API** section and copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

(You can also use Vercel's own "Upstash for Redis" marketplace integration — it
sets the same two variables automatically.)

## 2. Get your Groq key (for Axilotti)

1. <https://console.groq.com> → **API Keys** → Create.
2. Copy it into `GROQ_API_KEY`.
   > ⚠️ If you ever pasted a key into a chat or committed it, **revoke it** in the
   > Groq console and make a new one. Keys in the browser are not secret.
3. Optional: `GROQ_MODEL` (default `openai/gpt-oss-120b`). The app also falls
   back to `openai/gpt-oss-20b` then `qwen/qwen3.8-27b` if a model is retired.

## 3. Telegram alerts (sign-ups, activity, support)

1. In Telegram, message **@BotFather** → `/newbot` → copy the bot **token** into
   `TELEGRAM_BOT_TOKEN`. (If a token was ever shared, use `/revoke` and make a new one.)
2. **Send your bot a message first** (say "hi") — a bot can't message you until you do.
3. Your numeric user id goes in `TELEGRAM_ADMIN_CHAT_ID` (e.g. `6325688361`).
   Not sure of it? Message **@userinfobot**, it tells you your id.

Alerts are **outbound only** and **never include passwords** — only name, email,
time, activity summaries and support messages.

## 4. Admin panel login

The admin password is checked on the server and never ships to the browser.
Generate the values from your chosen password:

```
node scripts/gen-admin-hash.js "axiom_admin_123"
```

That prints `ADMIN_USER`, `ADMIN_PASS_SALT`, `ADMIN_PASS_HASH`. For the default
password `axiom_admin_123` you can use these directly:

```
ADMIN_USER=admin_axiom
ADMIN_PASS_SALT=9b6cb56f3014cca9b73e8946d9b701cf
ADMIN_PASS_HASH=6e9c4e65ab89117d6c3bdf7f1e1b8ae515b778ec7665fbaa20e84a587381acbf7a2ffd0a7b29450eda1416f69c4456886d5d6aaf9f63bed5bac1f06c07aa81d2
```

> **Change this password before you go live.** Re-run the command with a strong
> password and replace the salt/hash. There is no visible admin link: open the
> panel by signing in on the normal login form with the admin username/password,
> or by visiting `#/admin`.

## 5. Put the variables into Vercel

Vercel → your project → **Settings → Environment Variables**. Add each one for
**Production** (and Preview if you want). Then **redeploy**.

| Variable | What it is |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Upstash REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token |
| `GROQ_API_KEY` | Groq API key (Axilotti) |
| `GROQ_MODEL` | *(optional)* model id |
| `TELEGRAM_BOT_TOKEN` | BotFather token |
| `TELEGRAM_ADMIN_CHAT_ID` | your Telegram user id |
| `ADMIN_USER` | admin login name |
| `ADMIN_PASS_SALT` | from the generator |
| `ADMIN_PASS_HASH` | from the generator |

**Never commit these.** They live only in Vercel. `.env*` is git-ignored.

---

## Local development

```
npm i -g vercel
vercel dev
```

Create a `.env.local` with the same variables (git-ignored) for local testing.

## How it stays safe

- Passwords are hashed with **scrypt** + a per-user salt and are never stored or
  sent in readable form. Forgotten passwords are reset, never retrieved.
- Sessions are random tokens in **HttpOnly, Secure, SameSite=Lax** cookies —
  not readable by page scripts.
- The Groq key, Telegram token and admin password stay **server-side only**.
- Auth, AI and support endpoints are **rate-limited**; the AI/Telegram keys are
  never exposed to the browser.
- Banning a user **revokes their active sessions** immediately.

## The API (all under `/api`)

`auth/register`, `auth/login`, `auth/logout`, `auth/me`, `progress`, `ai`,
`activity`, `support`, and admin-only: `admin/me`, `admin/users`, `admin/user`,
`admin/ban`, `admin/support`.
