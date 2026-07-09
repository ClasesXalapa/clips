// Metiche Clipper ya no necesita COOP/COEP ni FFmpeg WASM.
// Este archivo queda como compatibilidad para navegadores que tengan registrado
// el service worker anterior. Si se instala, se desregistra a sí mismo.
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    try {
      await self.registration.unregister();
      const clients = await self.clients.matchAll({type: 'window', includeUncontrolled: true});
      for (const client of clients) {
        client.navigate(client.url);
      }
    } catch (err) {
      // No-op: se evita romper la app si el navegador bloquea alguna operación.
      console.warn('No se pudo desregistrar el service worker anterior:', err);
    }
  })());
});

self.addEventListener('fetch', event => {
  // Passthrough. No alteramos headers ni respuestas.
});
