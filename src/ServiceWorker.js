this.addEventListener('install', (event) => {
    console.log('Service worker installed');
    event.waitUntil(caches.open('NEON-CACHE')
        .then((cache) => {
            // Upload in cache files
            return cache.addAll([
                '/img/user-default.jpg',
                '/index.html',
            ]);
        }).catch((error) => {
            console.log(error);
        }));
});

this.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((cachedResponse) => {
            // Get cache
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request);
        }));
});
