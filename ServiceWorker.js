const cacheName = "DefaultCompany-pruebafigma-1.0";
const contentToCache = [
    "Build/c013a36442f6e33ebac50612d88f5967.loader.js",
    "Build/c12682e1bb8ffeb6afa470a18f688f92.framework.js",
    "Build/a00ec942c101a782cea4ab531bac508d.data",
    "Build/6b216e33339e7fe61ee7f17872034075.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
