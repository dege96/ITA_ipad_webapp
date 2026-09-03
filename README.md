# Digital katalog — Bokmässan (iPad PWA)

Interaktiv digital bokkatalog för Göteborgs Bokmässa. Optimerad för **iPad 10th generation (10,9 tum)** i kiosk (Kiosk Pro Plus eller Safari + Guidad åtkomst). Vanilla PWA med offline-stöd, förlagsfilter, bokdetalj och QR.

## Live

Produktion: [https://catalogo-bokmassan.vercel.app](https://catalogo-bokmassan.vercel.app)

## Köra lokalt

Service workers kräver `localhost` eller HTTPS. I projektroten:

```bash
python -m http.server 8080
```

Öppna [http://localhost:8080](http://localhost:8080). För att efterlikna iPad 10th gen i Chrome/Edge DevTools: enhet **iPad** eller viewport **1180 × 820** (liggande) / **820 × 1180** (stående).

## Dokumentation

| Dokument | Innehåll |
|----------|----------|
| [projektbeskrivning.md](projektbeskrivning.md) | Syfte, funktioner, tekniska beslut |
| [arkitektur.md](arkitektur.md) | Filstruktur, PWA, service worker, idle, kiosk-CSS |
| [data-modell.md](data-modell.md) | Schema och exempel för `catalog.json` |
| [ui-floden.md](ui-floden.md) | Vyer, navigation, idle-reset |
| [kiosk-drift.md](kiosk-drift.md) | Checklista för montern |

## Status

v1 av appen är på plats: katalogvy, förlagsfilter, bokdetalj med QR, idle-reset 60 s och offline-cache.
