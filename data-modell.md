# Data-modell — catalog.json

Statisk katalog bundlad i PWA:n. Fil: `public/catalog.json`.

Filterenheten är **förlag** (publishers), inte enskilda författare. Kontaktpersoner i formulären (t.ex. Ginevra Grasso) är inte katalogposter.

## Schema

### `publishers[]`

| Fält | Typ | Obligatorisk | Beskrivning |
|------|-----|--------------|-------------|
| `id` | string | ja | Unikt id (slug), t.ex. `"kimerik"` |
| `name` | string | ja | Visningsnamn (Nominativo azienda) |
| `logo` | string | ja | Relativ sökväg till logga under `public/` |
| `bio` | string | nej | Company profile (engelska, ~100 ord) |
| `url` | string | ja | Förlagets webbplats (HTTPS) |
| `email` | string | nej | Kontaktmail |
| `phone` | string | nej | Telefon |
| `address` | string | nej | Adress |

### `books[]`

| Fält | Typ | Obligatorisk | Beskrivning |
|------|-----|--------------|-------------|
| `id` | string | ja | Unikt id (slug) |
| `title` | string | ja | Bok-/magasinstitel |
| `bookAuthor` | string | ja | Författare eller redaktion (visas i detaljvy) |
| `publisherId` | string | ja | Måste matcha en `publishers[].id` |
| `cover` | string | ja | Relativ sökväg till omslag under `public/covers/` |
| `summary` | string | ja | Kort sammanfattning för detaljvyn |
| `url` | string | ja | Publik HTTPS-URL för QR (bok- eller förlagssida) |

## Regler

- **Filter:** visa böcker där `book.publisherId === selectedPublisherId`.
- **Sökvägar:** relativa till `public/` (t.ex. `covers/...`, `logos/...`).
- **Offline:** alla `logo`/`cover`-filer som refereras måste finnas lokalt och cachas.
- **QR:** genereras från `books[].url`.
- **Referensintegritet:** varje `publisherId` måste finnas i `publishers`.

## Assets

```
public/
├── catalog.json
├── covers/     # bokomslag (JPG)
└── logos/      # förlagslogotyper (PNG/SVG)
```

## Underhåll

1. Lägg bildfiler i `public/covers/` och `public/logos/`.
2. Uppdatera `public/catalog.json`.
3. Bumpa `CACHE_NAME` i `sw.js` vid innehållsuppdatering.
4. Ladda appen online en gång på varje iPad innan mässan (se [kiosk-drift.md](kiosk-drift.md)).

## Kända luckor i nuvarande data

- **Gruppo Albatros:** individuella engelska sinopsis saknas i formuläret; `summary` är tillfällig.
- **QR-URL:er:** pekar på förlagets startsida tills specifik bok-URL finns.
- **Kimerik:** endast ett omslag (Wally Dall’Asta); formulärets generella sinopsis används som stödtext.
