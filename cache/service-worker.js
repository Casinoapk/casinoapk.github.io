// Define the cache name and the list of URLs to cache
const CACHE_NAME = "casino-app-cache-v1";
const urlsToCache = [
    "../cache/engin.css",
    "../cache/engin.js"
];

// Event listener for the 'install' event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("✅ Кэш загружен");
            return cache.addAll(urlsToCache);
        })
    );
});

// Event listener for the 'activate' event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});

// Event listener for the 'fetch' event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                console.log("✅ Отдаём из кеша:", event.request.url);
                return cachedResponse;
            }
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(() => new Response("⚠️ Ошибка: Нет сети", { status: 500 }));
        })
    );
});
