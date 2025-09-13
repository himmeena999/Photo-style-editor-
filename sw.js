const CACHE_NAME = "prompt-app-v1";
const ASSETS = [
  "/Photo-style-editor-/",
  "/Photo-style-editor-/index.html",
  "/Photo-style-editor-/trending.html",
  "/Photo-style-editor-/manifest.json",
  "/Photo-style-editor-/icons/icon-192x192.png",
  "/Photo-style-editor-/icons/icon-512x512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
