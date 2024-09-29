const CACHE_NAME = 'recibos-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://i.imgur.com/C9N75S2.png',
  '/styles.css',  // Agrega aquí otros archivos importantes
];

// Instalación del service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Archivos en caché:');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las solicitudes y servir desde caché cuando sea posible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si se encuentra en la caché, devolverla
        if (response) {
          return response;
        }
        // Si no está en la caché, hacer la solicitud normalmente
        return fetch(event.request);
      }
    )
  );
});

// Actualizar el caché
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
