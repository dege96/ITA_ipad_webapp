# Kiosk-drift — Bokmässan

Checklista för iPad i montern. Primärt [Kiosk Pro Plus](https://apps.apple.com/se/app/kiosk-pro-plus/id445701154). Fallback: Safari + Guidad åtkomst.

## Inför mässan

1. Deploya eller hosta PWA:n på en stabil HTTPS-URL (eller lokal server i montern om ni kör offline-first efter cache).
2. Öppna URL:en **online** på varje iPad så service worker installeras och `catalog.json` + bilder cachas.
3. Slå på **flygplansläge** eller koppla bort Wi‑Fi och verifiera att katalogen, omslag, författarbilder och QR fortfarande syns.
4. Bekräfta idle: öppna en bok, vänta 60 s utan touch → åter till katalog utan filter.
5. Bumpa `CACHE_NAME` i `sw.js` vid innehållsuppdatering; öppna appen online igen på varje enhet.

## Primärt: Kiosk Pro Plus

- Ange appens start-URL.
- Fullscreen / dölj webbläsar-UI.
- Lås så besökare inte kan lämna appen eller öppna andra URL:er.
- Inaktivera gester som stör (zoom, refresh) enligt appens inställningar.
- Ljud/avbrott: stäng av onödiga notiser på iPad (Fokus / Stör ej).

Testa tidigt: om Kiosk Pro Plus blockerar service worker, cache eller QR-rendering — gå till fallback nedan.

## Fallback: Safari + Guidad åtkomst

1. Öppna PWA-URL:en i Safari (helst “Lägg till på hemskärmen” / standalone om det fungerar i er iPadOS-version).
2. Aktivera **Guidad åtkomst** (Inställningar → Hjälpmedel → Guidad åtkomst).
3. Trippelklicka hem/sidoknapp, begränsa till appfönstret, stäng av oönskade gester om möjligt.
4. Lösenkod endast för personal.

## Under mässan

| Situation | Åtgärd |
|-----------|--------|
| Vit/tom skärm | Starta om Kiosk Pro / Safari; öppna URL online en gång; kontrollera cache |
| Gammal katalog | Online + ny `CACHE_NAME`; hard refresh enligt kioskapp |
| QR oläsbar | Öka QR-storlek i detaljvy; kontrollera kontrast och `url` i JSON |
| Besökare “fastnar” i filter | Idle 60 s ska rensa; personal kan trycka “Visa alla” |

## Tekniska påminnelser

- Idle: 60 sekunder → katalogstart, rensa filter (se [ui-floden.md](ui-floden.md)).
- CSS begränsar markering/zoom; kioskappen är yttersta låset.
- Ingen lead-synk eller API krävs för drift i v1.
