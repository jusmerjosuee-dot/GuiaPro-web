// ========================================
// GUIAPRO WEB
// VERSION 0.4.7.1
// SERVICE WORKER - MODO OFFLINE
// ========================================

// Nombre de la memoria caché
const CACHE = 'guiapro-pwa-0471';

// Archivos principales necesarios
const CORE = [
  './index.html',
  './manifest.webmanifest'
];

// Archivos adicionales
const OPTIONAL = [
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ========================================
// INSTALACIÓN
// ========================================

self.addEventListener('install', event => {

  event.waitUntil((async () => {

    const cache = await caches.open(CACHE);

    // Guardar archivos principales.
    // Si fallan, no activar una versión incompleta.
    await cache.addAll(CORE);

    // Guardar iconos disponibles.
    await Promise.all(
      OPTIONAL.map(url =>
        cache.add(url).catch(() => {})
      )
    );

    // Activar la nueva versión.
    await self.skipWaiting();

  })());

});

// ========================================
// ACTIVACIÓN
// ========================================

self.addEventListener('activate', event => {

  event.waitUntil((async () => {

    const keys = await caches.keys();

    // Eliminar cachés antiguas de GuíaPro
    await Promise.all(
      keys
        .filter(key =>
          key.startsWith('guiapro-pwa-') &&
          key !== CACHE
        )
        .map(key => caches.delete(key))
    );

    // Controlar las páginas abiertas
    await self.clients.claim();

  })());

});

// ========================================
// FUNCIONAMIENTO SIN INTERNET
// ========================================

self.addEventListener('fetch', event => {

  // Solo procesar solicitudes GET
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // No interceptar recursos externos
  if (url.origin !== self.location.origin) {
    return;
  }

  // Respetar la carpeta de GuíaPro
  const scopePath = new URL(
    self.registration.scope
  ).pathname;

  if (!url.pathname.startsWith(scopePath)) {
    return;
  }

  // =====================================
  // NAVEGACIÓN PRINCIPAL
  // =====================================

  if (event.request.mode === 'navigate') {

    event.respondWith((async () => {

      const cache = await caches.open(CACHE);

      const cached = await cache.match(
        './index.html'
      );

      // Usar interfaz almacenada
      if (cached) {
        return cached;
      }

      // Si todavía no existe caché
      return fetch(event.request);

    })());

    return;
  }

  // =====================================
  // ARCHIVOS ADICIONALES
  // =====================================

  event.respondWith((async () => {

    const cached = await caches.match(
      event.request
    );

    // Primero caché; después internet
    return cached || fetch(event.request);

  })());

});
