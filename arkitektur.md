# Arkitektur — Digital katalog-PWA

Vanilla HTML/CSS/JS-PWA för iPad i kioskläge. Ingen backend i v1; katalogdata bundlas som statisk JSON och bilder.

## Filstruktur

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── sw-register.js
├── sw.js
├── manifest.json
├── public/
│   ├── catalog.json
│   ├── covers/
│   ├── logos/
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
```

| Fil / mapp | Roll |
|------------|------|
| `index.html` | Shell: tre vyer (katalog, förlag, bokdetalj), ingen lead-formulär |
| `css/styles.css` | Layout + kiosk-CSS (låst viewport, ingen markering/zoom) |
| `js/app.js` | Ladda katalog, rendera vyer, filter, QR, idle-timer |
| `js/sw-register.js` | Registrerar service worker |
| `sw.js` | Cache av shell, JSON och assets; network-first med cache-fallback |
| `manifest.json` | Standalone PWA-manifest |
| `public/catalog.json` | Förlag + böcker (se [data-modell.md](data-modell.md)) |
| `public/covers/` | Bokomslag |
| `public/logos/` | Förlagslogotyper |
| `public/icons/` | PWA-ikoner |

## manifest.json

```json
{
  "name": "Digital katalog — Bokmässan",
  "short_name": "Katalog",
  "start_url": "./index.html",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#ffffff",
  "theme_color": "#1a1a1a",
  "icons": [
    {
      "src": "public/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "public/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Kiosk-CSS (styles.css)

Förhindrar oavsiktlig zoom, textmarkering och drag som flyttar sidan på surfplattan.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  touch-action: manipulation;
}

/* Innehållsytor som ska kunna scrollas (t.ex. bokgrid) får overflow: auto
   på en inre container — inte på body. */
```

## Service worker (sw.js)

Strategi: **network-first**, fallback till cache. Passar när katalogdata kan uppdateras mellan mässdagar men måste fungera offline under mässan.

```javascript
const CACHE_NAME = 'katalog-v1';
const SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/sw-register.js',
  './manifest.json',
  './public/catalog.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
```

**Bilder:** cacha covers/authors vid första lyckade hämtning (cache.put i fetch-handlern ovan), eller utöka `SHELL`/`addAll` med kända sökvägar från `catalog.json` vid build/deploy.

**Ingen** lead-kö, lokalStorage-synk av formulär eller `/api/leads`.

## Registrering (sw-register.js)

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
```

## App-logik (app.js) — översikt

1. Hämta `public/catalog.json` (network-first via SW).
2. Rendera katalogvy; hantera navigering till förlagsvy och bokdetalj.
3. Generera QR från bokens `url` (t.ex. bibliotek eller canvas-baserad QR-lib).
4. Idle-timer: efter **60 sekunder** utan interaktion → katalogstart, rensa filter, stäng detaljvy.

```javascript
const IDLE_TIMEOUT = 60_000;
let idleTimer;

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(resetToHome, IDLE_TIMEOUT);
}

function resetToHome() {
  // Stäng detaljvy, rensa publisherId-filter, scrolla katalog till topp
}

['touchstart', 'pointerdown', 'keydown'].forEach((evt) => {
  window.addEventListener(evt, resetIdleTimer, { passive: true });
});

resetIdleTimer();
```

Se [ui-floden.md](ui-floden.md) för vyer och [data-modell.md](data-modell.md) för JSON-schema.

## Vad som medvetet saknas i v1

- Backend, CMS, lead-capture
- Offline-kö för användardata
- Online/offline-statusindikator (katalog fungerar från cache utan synlig badge)
