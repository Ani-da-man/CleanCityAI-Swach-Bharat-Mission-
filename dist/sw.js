self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // A simple pass-through fetch handler is required by Chrome to trigger the install prompt
  e.respondWith(fetch(e.request).catch(() => new Response('Offline')));
});
