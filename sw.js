// Simple service worker for basic PWA functionality
const CACHE_NAME = 'photo-style-editor-v1';
const urlsToCache = [
  '/Photo-style-editor-/',                  // root (keep trailing slash on GitHub Pages)
  '/Photo-style-editor-/index.html',
  '/Photo-style-editor-/style.css',         // update if your filename/path differs
  '/Photo-style-editor-/script.js',         // update if your filename/path differs
  '/Photo-style-editor-/icons/icon-192x192.png',
  '/Photo-style-editor-/icons/icon-512x512.png'
];

// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event - serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
