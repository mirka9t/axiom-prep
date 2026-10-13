/* AXIOM — offline support. Private API responses always stay network-only. */
const CACHE = 'axiom-v26';
const FILES = [
  './', 'index.html', 'css/app.css', 'manifest.webmanifest', 'icon.svg',
  'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png',
  'js/acct-pre.js', 'js/app.js', 'js/more1.js', 'js/more2.js', 'js/gen.js',
  'js/feat-a.js', 'js/feat-b.js', 'js/extra1.js', 'js/extra2.js', 'js/extra3.js',
  'js/extra4.js', 'js/ui1.js', 'js/ui2.js', 'js/ui3.js', 'js/ui4.js', 'js/c1.js',
  'js/c2.js', 'js/g2.js', 'js/game.js', 'js/d1.js', 'js/d2.js', 'js/g3.js',
  'js/n1.js', 'js/n2.js', 'js/n3.js', 'js/deep1.js', 'js/deep2.js', 'js/deep3.js',
  'js/deep4.js', 'js/visual1.js', 'js/visual2.js', 'js/visual3.js', 'js/visual4.js',
  'js/visual5.js', 'js/ux.js', 'js/feat2.js', 'js/feat3.js', 'js/tools.js',
  'js/diag.js', 'js/brand.js', 'js/better.js', 'js/final.js', 'js/lesson-ui.js',
  'js/think1.js', 'js/think2.js', 'js/think3.js', 'js/menu.js', 'js/mascot.js',
  'js/toolkit.js', 'js/graph2.js', 'js/intro.js', 'js/voice.js', 'js/guide.js',
  'js/axi-talk.js', 'js/copybook.js', 'js/cb-1.js', 'js/cb-2.js', 'js/cb-3.js',
  'js/cb-4.js', 'js/cb-5.js', 'js/copybook-ui.js', 'js/brain-math.js', 'js/brain.js',
  'js/axi-chat.js', 'js/axi-life.js', 'js/lessons-plus.js', 'js/fx.js',
  'js/axilotti-cloud.js', 'js/start.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Do not persist account, progress, support or admin responses on shared devices.
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) return;

  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
    }
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('index.html'))));
});
