const CACHE = "ethan-erp-work-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./operations.js",
  "./erp-modules.js",
  "./erp-upgrade.js",
  "./config.js",
  "./supabase-client.js",
  "./course-narration-data.js",
  "./assets/ethan-logo.jpeg"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE && (key.startsWith("ethan-erp-work-") || key.startsWith("ethan-erp-lms-"))).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isAppAsset =
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/styles.css") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/operations.js") ||
    url.pathname.endsWith("/erp-modules.js") ||
    url.pathname.endsWith("/erp-upgrade.js") ||
    url.pathname.endsWith("/config.js") ||
    url.pathname.endsWith("/supabase-client.js") ||
    url.pathname.endsWith("/course-narration-data.js");

  if (isAppAsset) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
