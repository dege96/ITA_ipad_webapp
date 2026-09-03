# Projektbeskrivning — Digital katalog (Göteborgs Bokmässa)

## Syfte

En interaktiv digital katalog för visning på Göteborgs Bokmässa. Appen fungerar som ett digitalt bibliotek där besökare på plats enkelt kan utforska deltagande italienska förlag och deras titlar via iPad-skärmar i mässmiljö.

## Målgrupp & användning

- **Primär yta:** iPad i kioskläge (touch).
- **Användare:** mässbesökare med varierande teknisk vana — gränssnittet ska vara självförklarande och kräva minimal vägledning.
- **Drift på plats:** företrädesvis [Kiosk Pro Plus](https://apps.apple.com/se/app/kiosk-pro-plus/id445701154). Om det inte fungerar: Safari med Guidad åtkomst. Se [kiosk-drift.md](kiosk-drift.md).

## Kärnfunktioner

### Bläddra bland böcker
- Visuellt gränssnitt med bokomslag.
- Touchvänlig navigering och bläddring.
- Klick/tryck på en bok öppnar detaljvy.

### Bokdetalj
- Kort sammanfattning av titeln.
- QR-kod genererad från bokens publika `url` så besökaren kan öppna informationen på egen enhet.

### Filter på förlag
- Knapp/läge för att filtrera på förlag.
- Visa förlagslogotyp med namn.
- Val av förlag visar endast dess titlar.
- Tydlig väg tillbaka till hela katalogen.

### Kioskbeteende
- **Återställningstimer:** efter **60 sekunder** inaktivitet återställs appen till katalogstart — filter rensas, detaljvy stängs.
- UI anpassat för mässbruk: begränsa oavsiktlig zoom, textmarkering och drag som flyttar sidan.

## Tekniska beslut (v1)

| Område | Beslut |
|--------|--------|
| Stack | Vanilla HTML/CSS/JS (ingen ramverk) |
| Typ | PWA (`manifest.json` + service worker) |
| Data | Statisk `public/catalog.json` + lokala omslag/loggor |
| Offline | Network-first med cache-fallback (shell, JSON, bilder) |
| Synkning | Ingen lead-kö; uppdaterad katalog via ny deploy + cache-bump |
| QR | Från varje boks `url` i JSON |
| Idle | 60 s → katalogstart, rensa filter |
| Enhet | Optimerad för iPad |

Detaljer: [arkitektur.md](arkitektur.md), [data-modell.md](data-modell.md), [ui-floden.md](ui-floden.md).

## Designprinciper

- Superenkelt: få steg, stora tryckytor, tydlig hierarki.
- Stilrent och visuellt: fokus på omslag och förlagslogotyper, inte på kontroller.
- Ett jobb per vy: katalog → filter/förlag → bokdetalj.
- Ingen distraktion från mässmiljön: stabil, “låst” känsla lämplig för kiosk.

## Leveransmål (kort)

1. Fungerande PWA med offline-cache och återställningstimer (60 s).
2. Katalogvy med omslag + detaljvy med sammanfattning och QR.
3. Förlagsfilter med logotyp + namn och filtrerad boklista.
4. Verifierad körning i Kiosk Pro Plus (fallback: Safari + Guidad åtkomst).

## Kvar att besluta (branding)

- Färger, typografi och logotyp för monter/förlag (påverkar CSS, inte datamodellen).
