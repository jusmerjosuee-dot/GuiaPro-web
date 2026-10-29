// GuíaPro Web 0.4.8: solo almacena archivos públicos de interfaz.
const CACHE = 'guiapro-pwa-048';
const CORE = ['./index.html', './manifest.webmanifest'];
const OPTIONAL = ['./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Si falla la interfaz, no activar una versión offline incompleta.
    await cache.addAll(CORE);
    await Promise.all(OPTIONAL.map(url => cache.add(url).catch(() => {})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('guiapro-pwa-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match('./index.html');
      if (cached) return cached;
      return fetch(event.request);
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    return cached || fetch(event.request);
  })());
});
