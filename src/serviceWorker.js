
this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('last').then(function (cache) {
      return cache.addAll([
        './index.html',
        '/static/js/bundle.js',
        '/manifest.json',
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
  );
});