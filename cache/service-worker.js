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
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => cachedResponse || new Response("⚠️ Ошибка: Нет сети", { status: 500 }));
                
                return cachedResponse || fetchPromise;
            });
        })
    );
});
