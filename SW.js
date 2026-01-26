 url=https://github.com/karmpur496-vijay/My-girder/blob/main/SW.js
// Service Worker for My-girder (caching + network-first fallback)
const CACHE_NAME = 'girder-cache-v1';
const CORE_ASSETS = [
  '/', '/index.html',
  '/daily_work.html',
  '/monthly_summary.html',
  '/With_tds_Girder_report_form.html',
  '/Without_tds_report.html',
  '/Clint_bank_add_report.html',
  '/technical_drawing.html',
  '/manifest.json',
  '/index.html', '/SW.js'
];

// Install: cache core assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
  );
});

// Activate: cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Try network first, fallback to cache. For navigation, serve index.html for SPA-like behavior.
self.addEventListener('fetch', event => {
  const req = event.request;
  // Only handle GET requests
  if (req.method !== 'GET') return;

  // Navigation requests -> network first, fallback to cached index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        // Optionally update cache with latest index
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put('/index.html', copy));
        return res;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For other assets: try cache first, then network, then cache fallback
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(networkRes => {
        // Cache responses for same-origin requests
        if (networkRes && networkRes.status === 200 && networkRes.type === 'basic') {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return networkRes;
      }).catch(() => {
        // Optional: provide a generic fallback for images or pages
        if (req.destination === 'image') {
          // return a small inline fallback or nothing
          return new Response('', {status: 404, statusText: 'Not Found'});
        }
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});