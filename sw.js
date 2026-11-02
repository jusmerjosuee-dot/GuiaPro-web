// GuíaPro Web v0.4.10
// Service Worker: actualización online y funcionamiento offline.

const CACHE = 'guiapro-pwa-0410';

const CORE = [
  './index.html',
  './manifest.webmanifest'
];

const OPTIONAL = [
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// INSTALACIÓN
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);

    // Guardar los archivos principales.
    await cache.addAll(CORE);

    // Guardar iconos disponibles.
    await Promise.all(
      OPTIONAL.map(url =>
        cache.add(url).catch(() => {})
      )
    );

    // Activar la actualización sin esperar al cierre.
    await self.skipWaiting();
  })());
});

// ACTIVACIÓN
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    // Eliminar versiones anteriores de GuíaPro.
    await Promise.all(
      keys
        .filter(key =>
          key.startsWith('guiapro-pwa-') &&
          key !== CACHE
        )
        .map(key => caches.delete(key))
    );

    // Controlar las pestañas abiertas.
    await self.clients.claim();
  })());
});

// SOLICITUDES
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const scope = new URL(self.registration.scope);

  // No interceptar solicitudes externas.
  if (
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(scope.pathname)
  ) return;

  // NAVEGACIÓN: primero internet, después caché.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(event.request);

        if (response.ok) {
          const cache = await caches.open(CACHE);

          await cache.put(
            './index.html',
            response.clone()
          );
        }

        return response;

      } catch (error) {
        const cache = await caches.open(CACHE);

        const cached = await cache.match('./index.html');

        if (cached) return cached;

        return Response.error();
      }
    })());

    return;
  }

  // ARCHIVOS ESTÁTICOS: caché primero.
  event.respondWith((async () => {
    const cached = await caches.match(event.request);

    return cached || fetch(event.request);
  })());
});
