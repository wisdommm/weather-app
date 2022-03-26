
this.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open('last').then(function (cache) {
        return cache.addAll([
          '/weather-test/',
          '/weather-test/index.html',
          '/weather-test/static/js/main.2db67bc8.js',
          '/weather-test/static/css/main.e0ce3286.css',
          '/weather-test/static/js/787.13d76ca7.chunk.js',
          '/weather-test/static/media/sun.2857d53e5fcc0124a24f.png',
          '/weather-test/static/media/snow.2147bcf6dd11a10ae469.png',
          '/weather-test/static/media/today.9071f7f21653d1814559.png',
          '/weather-test/static/media/overcast.e5f7d1e5452f24342990.png',
          '/weather-test/static/media/rain.f848fca9b7d52957bc68.png',
          '/weather-test/static/media/cloud.974591b65bdd465e882d.png',
          '/weather-test/static/css/main.e0ce3286.css.map',
          '/weather-test/static/js/main.2db67bc8.js.map',
          '/weather-test/static/js/787.13d76ca7.chunk.js.map',
        ]);
      })
    );
  });
  
  this.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
    );
  });