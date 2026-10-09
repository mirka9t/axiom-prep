# AXIOM — SAT Math, built from first principles

Pure HTML, CSS and JavaScript. No database, no server, no build step.

## Structure
- index.html — the page
- css/app.css — styles
- js/ — the app (load order is set in index.html; acct-pre.js must stay first)
- manifest.webmanifest, sw.js, icon.svg, icon-*.png, apple-touch-icon.png — install on phones + offline use
- og.png — the picture shown when you share the link
- vercel.json — hosting settings (security headers, caching); 404.html sends lost visitors home; robots.txt
- js/mascot.js — Axi the axolotl (moods, looks, celebrations, jingles)
- js/intro.js — Axi's opening tour, daily quests, level journey
- js/graph2.js — graphing calculator with math keypad, sliders, trace, table; movable tool windows
- js/visual5.js — the newest set of visual lesson sections
- js/voice.js — Axi's voice: talking mouth, real voice / chirps / silent, read-aloud dock
- js/guide.js — Ask-Axi button, next-step coach, page tips, Simple / Everything menu
- js/axi-talk.js — connects Axi's voice to the intro, tour, celebrations, practice, Today and Settings
- js/copybook.js — the Copybook: notebook-style notes, real maths typesetting (fractions, roots, powers, coloured pens) and animated pictures
- js/cb-1.js … js/cb-5.js — 171 Copybook notes, one for every core lesson: the rule, the rule in human words, a picture, words to know, a memory trick, a warning and worked examples
- js/copybook-ui.js — puts the notes into lessons, typesets the maths inside examples, My Copybook page, formula of the day, Copybook flashcards
- js/brain-math.js — Axi's maths engine: exact fractions, equations, systems, inequalities, factoring, percents, statistics, probability, geometry, trig, unit conversions — every answer as steps
- js/brain.js — Axi's brain: understands English and Russian questions, searches all lessons/notes/formulas/glossary, quizzes, coaching, conversation memory
- js/axi-chat.js — the chat window (typing, voice input, read-aloud answers) and "Ask Axi" on selected text
- js/axi-life.js — Axi's eyes follow the pointer, idle moves, naps, and help when you're stuck
- js/lessons-plus.js — "Try it first" examples, a fresh "Your turn" question on every examples page, Ask-Axi chips on lesson pages
- js/fx.js — hover light, tilt, ripples, scroll reveal, page-change bar, smooth theme switch
- js/start.js — draws the page once all scripts have loaded (keep it last)

When you add or rename a file in js/, also add it to index.html and to FILES in sw.js,
and raise the CACHE number in sw.js so phones pick up the new version.

## Publish with VS Code + GitHub + Vercel
Copy everything inside the `axiom` folder (including `vercel.json`, `404.html`, `.gitignore` and the PNG icons) into your repository folder, replacing the old files.
    git add .
    git commit -m "AXIOM update"
    git push
(First time: git init, git branch -M main, git remote add origin https://github.com/mirka9t/axiom.git, git push -u origin main.)
Vercel redeploys automatically after every push. Framework Preset: "Other". Build command: none. Output directory: leave empty (the root).

After the first deploy: open your site once online so the service worker saves it for offline use.
Optional — sharing previews: in index.html change `og.png` in the two `og:image` / `twitter:image` lines to the full address, e.g. `https://your-site.vercel.app/og.png` (some apps only show previews with a full URL).

## Axi's brain
Axi runs entirely in the browser — no API key, no server, nothing leaves the device. Try:
`solve 3(x − 2) = 2x + 5` · `x^2 − 5x + 6 = 0` · `2x + 3y = 12 and x − y = 1` · `what is 15% of 80` · `probability of at least one 6 in 4 rolls` ·
`explain the discriminant` · `quiz me on percents` · `how am I doing?` · `open the graphing calculator`.
A link like `https://your-site.vercel.app/?ask=explain%20slope` opens the chat with that question.

## Accounts
Sign-up and login are stored in the browser (localStorage). Passwords are saved only as salted SHA-256 hashes.
Each account has its own progress. To move progress to another device: Progress -> Backup file. Axi's chat history is saved per account in the browser too.
# axiom-prep
