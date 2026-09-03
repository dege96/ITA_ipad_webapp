const CACHE_NAME = "katalog-v18";
const SHELL = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./css/fonts/poppins-400.woff2",
  "./css/fonts/poppins-600.woff2",
  "./js/app.js",
  "./js/sw-register.js",
  "./js/qrcode.min.js",
  "./manifest.json",
  "./om-oss.md",
  "./newitalianbooks.md",
  "./kalender.md",
  "./massor/bologna.md",
  "./massor/piu-libri.md",
  "./massor/salone.md",
  "./en/om-oss.md",
  "./en/newitalianbooks.md",
  "./en/kalender.md",
  "./en/massor/bologna.md",
  "./en/massor/piu-libri.md",
  "./en/massor/salone.md",
  "./public/catalog.json",
  "./public/ics/bologna.ics",
  "./public/ics/piu-libri.ics",
  "./public/ics/salone.ics",
  "./public/events/piulibri_logo.svg",
  "./public/events/salone_logo.svg",
  "./public/background_image.png",
  "./public/logos/ITA-logo/ita-100-welcome.png",
  "./public/logos/ITA-logo/ita-100-header.png",
  "./public/icons/icon-192.png",
  "./public/icons/icon-512.png",
  "./public/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("./index.html"))
      )
  );
});
