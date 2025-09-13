// Service worker for Photo-style-editor- (GitHub Pages project site)
const CACHE_NAME = "prompt-app-v4"; // Bumped to force update
const BASE = "/Photo-style-editor-/";
const ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.json"
];

// Install: pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients?.claim?.();
});

// Fetch: cache-first for same-origin requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
