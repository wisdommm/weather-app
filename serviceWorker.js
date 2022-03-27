
  this.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open('last').then(function (cache) {
        return cache.addAll([
          "/weather-test/favicon.ico",
          "/weather-test/manifest.json",

          "/weather-app/static/css/main.0f36e62e.css",
          "/weather-app/static/js/main.1aaf5e89.js",
          "/weather-app/static/js/787.13d76ca7.chunk.js",
          "/weather-app/static/media/sun.2857d53e5fcc0124a24f.png",
          "/weather-app/static/media/snow.2147bcf6dd11a10ae469.png",
          "/weather-app/static/media/overcast.e5f7d1e5452f24342990.png",
          "/weather-app/static/media/rain.f848fca9b7d52957bc68.png",
          "/weather-app/static/media/cloud.974591b65bdd465e882d.png",
          "/weather-app/static/media/today.2af6c7195788cc85089d.png",
          "/weather-app/index.html",
          "/weather-app/static/css/main.0f36e62e.css.map",
          "/weather-app/static/js/main.1aaf5e89.js.map",
          "/weather-app/static/js/787.13d76ca7.chunk.js.map"
        ]);
      })
    );
  });

  this.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
    );
  });

  