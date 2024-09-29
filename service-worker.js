self.addEventListener('install', event => {
  console.log('Service Worker: Instalado');
  // Aquí puedes agregar la lógica para precachear recursos
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activado');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
