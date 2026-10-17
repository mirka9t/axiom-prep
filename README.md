# AXIOM — SAT Math, built from first principles

AXIOM is a static SAT Math course with an optional Vercel serverless backend.
The course and local math brain can be used as a guest; secure cloud accounts,
cross-device progress, Groq-powered Axilotti, user support and administration
require environment setup. See [BACKEND.md](BACKEND.md).

## Project structure

- `index.html` loads the app scripts in order.
- `css/app.css` contains the main styles.
- `js/` contains the lessons, question generators, app UI, animations, Axilotti
  chat and cloud integration.
- `api/` contains serverless auth, progress, AI, activity, support and admin
  endpoints. Secrets belong in server environment variables only.
- `sw.js` caches static app files for offline use; `/api` responses are never
  cached.
- `vercel.json` configures hosting and security headers.

When adding or renaming a JS asset, update `index.html` and the static file list
in `sw.js`, then bump the service worker cache version.

## Run and deploy

For the static guest experience, serve this folder over HTTP. To run the API
locally, use `vercel dev`. For cloud features, deploy to Vercel and configure
the variables listed in `BACKEND.md`.

## Axilotti

Axilotti is the friendly axolotl SAT Math tutor. The browser includes an
on-device fallback brain. When `GROQ_API_KEY` is configured, submitted chat
messages go through the server-side Groq proxy; the key never enters the
browser. Chat history remains in browser storage and is not saved to the AXIOM
database.

## Accounts and privacy

New cloud account passwords are hashed with scrypt on the server. User-selected
progress syncs to the configured Redis database. Legacy accounts created by an
older version remain local to that browser. The app includes its [Privacy
Policy](#/privacy) and [Terms of Use](#/terms); review them for your hosting and
jurisdiction before public launch.
# axiom-uni
