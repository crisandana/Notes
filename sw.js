const version = "v1.0.0-beta.0";

const files = [
  "/notes/",
  "/notes/index.js",
  "/notes/assets/favicon/favicon.ico",
  "/notes/assets/favicon/favicon-16x16.png",
  "/notes/assets/favicon/favicon-32x32.png",
  "/notes/assets/favicon/apple-touch-icon.png",
  "/notes/assets/favicon/safari-pinned-tab.svg",
  "/notes/assets/favicon/manifest.json",
  "/notes/assets/favicon/android-chrome-192x192.png",
  "/notes/assets/favicon/android-chrome-512x512.png",
  "/notes/assets/favicon/browserconfig.xml",
  "/notes/assets/favicon/mstile-70x70.png",
  "/notes/assets/favicon/mstile-144x144.png",
  "/notes/assets/favicon/mstile-150x150.png",
  "/notes/assets/favicon/mstile-310x150.png",
  "/notes/assets/favicon/mstile-310x310.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      console.log("Cache " + version + " created.");
      return cache.addAll(files);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const keep = [version];
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (keep.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});