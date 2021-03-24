var CACHE_NAME = 'v1';
var urlsToCache = [
    'images',
    'index.html',
    'style.css',
    'main.js',
    'system-data.html',
    'system-state.html',
    'systemDM.html'
];


self.addEventListener("install", (event) => {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the
        // response isn't fulfilled from the HTTP cache; i.e., it will be from
        // the network.
        await cache.addAll(urlsToCache);
      })()
    );
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ("navigationPreload" in self.registration) {
          await self.registration.navigationPreload.enable();
        }
      })()
    );
  
    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // IMPORTANT: Clone the response. A response is a stream
              // and because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });
