// GuíaPro Web v0.4.12 — archivos públicos de interfaz, sin datos personales.
const CACHE = 'guiapro-pwa-0412';
const CORE = ['./index.html', './manifest.webmanifest'];
const OPTIONAL = ['./icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
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
  const scopePath = new URL(self.registration.scope).pathname;
  if (url.origin !== self.location.origin || !url.pathname.startsWith(scopePath)) return;

  if (event.request.mode === 'navigate') {
    // Con conexión, mostrar la versión publicada más reciente.
    // Sin conexión, seguir funcionando con la última interfaz guardada.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(event.request, {cache: 'no-store'});
        if (response.ok) await cache.put('./index.html', response.clone());
        return response;
      } catch (_) {
        const cached = await cache.match('./index.html');
        if (cached) return cached;
        return Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok && url.pathname.startsWith(scopePath + 'icons/')) {
      await cache.put(event.request, response.clone());
    }
    return response;
  })());
});
