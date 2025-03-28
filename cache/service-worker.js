const CACHE_NAME = "casino-app-cache-v1";
const urlsToCache = [
    "/cache/engine.css",
    "/cache/engine.js"
];
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("✅ Кэш загружен");
            return cache.addAll(urlsToCache);
        })
    );
});
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
