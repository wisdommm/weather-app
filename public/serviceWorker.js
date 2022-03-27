
  this.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open('last').then(function (cache) {
        return cache.addAll([
          "/weather-test/favicon.ico",
          "/weather-test/manifest.json",

          "/weather-test/static/css/main.0f36e62e.css",
          "/weather-test/static/js/main.048672a2.js",
          "/weather-test/static/js/787.13d76ca7.chunk.js",
          "/weather-test/static/media/sun.2857d53e5fcc0124a24f.png",
          "/weather-test/static/media/snow.2147bcf6dd11a10ae469.png",
          "/weather-test/static/media/overcast.e5f7d1e5452f24342990.png",
          "/weather-test/static/media/rain.f848fca9b7d52957bc68.png",
          "/weather-test/static/media/cloud.974591b65bdd465e882d.png",
          "/weather-test/static/media/today.2af6c7195788cc85089d.png",
          "/weather-test/index.html",
          "/weather-test/static/css/main.0f36e62e.css.map",
          "/weather-test/static/js/main.048672a2.js.map",
          "/weather-test/static/js/787.13d76ca7.chunk.js.map"
        ]);
      })
    );
  });

  this.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
    );
  });

  