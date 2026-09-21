(() => {
  const IDLE_TIMEOUT = 60_000;
  const CATALOG_URL = "./public/catalog.json";
  const NIB_SITE_URL = "https://www.newitalianbooks.it/";
  const ITA_SITE_URL = "https://www.ice.it/en/";
  const LANG_KEY = "ita-katalog-lang";
  /** Test flag: new share-QR + landing pages. Legacy QR stays in DOM but is hidden. */
  const SHARE_QR_TEST = false;

  const STRINGS = {
    sv: {
      homeAria: "Till välkomstskärm",
      filter: "Filter",
      welcomeLabel: "Välkommen",
      aboutBtn: "Om ITA Agency",
      booksBtn: "Urval av Italienska Titlar",
      calendarBtn: "Hitta Rätt Bokmässa i Italien",
      nibAria: "New Italian Books sida",
      catalogLabel: "Katalog",
      clearFilterAria: "Visa alla titlar",
      publishersLabel: "Filtrera på förlag",
      back: "Tillbaka",
      choosePublisher: "Välj förlag",
      choosePublisherLead: "Tryck på ett förlag för att visa deras titlar.",
      publishersKicker: "Katalog",
      bookLabel: "Bokdetalj",
      bookQrCaption: "Skanna QR-koden för mer information på din egen enhet",
      bookShareQrCaption: "Skanna för webbplats och kontaktkort på din egen enhet",
      calendarLabel: "Kalender",
      calendarKicker: "Evenemang",
      calendarHeading: "Bokmässor i Italien",
      calendarLead: "Tryck på en mässa för datum, plats och mer information.",
      fairLabel: "Mässa",
      fairVisitors: "Besökare",
      fairDates: "Datum",
      fairLocation: "Plats",
      fairQrCaption: "Skanna QR-koden för att veta mer om mässan",
      fairShareQrCaption: "Skanna för webbplats och kalender på din egen enhet",
      aboutLabel: "Om oss",
      aboutKicker: "Italian Trade Agency",
      aboutHeading: "Om ITA",
      aboutLead: "Vårt uppdrag inom förlagssektorn — och hur du når kontoret i Stockholm.",
      aboutQrCaption: "Skanna QR-koden för att besöka ice.it",
      nibQrCaption: "Skanna QR-koden för att besöka newitalianbooks.it",
      shareLabel: "Dela",
      shareVisitWebsite: "Besök webbplats",
      shareSaveContact: "Spara kontakt",
      shareAddCalendar: "Lägg till i kalender",
      shareBookLead: "Öppna webbplatsen eller spara förlaget som kontakt.",
      shareFairLead: "Öppna mässans webbplats eller lägg till datumen i kalendern.",
      shareUnavailable: "Informationen kunde inte öppnas.",
      shareCalendarMissing: "Kalenderdatum saknas för den här mässan.",
      bootMark: "Katalog",
      bootSub: "Italienska förlag",
      bootStatus: "Öppnar katalogen…",
      bootError: "Katalogen kunde inte laddas. Kontrollera anslutningen och försök igen.",
      emptyBooks: "Inga titlar att visa.",
      allTitles: "Alla titlar",
      loadError: "Informationen kunde inte laddas just nu.",
      calendarLoadError: "Kunde inte ladda kalendern.",
      pageTitle: "Katalog — Italienska förlag",
      pageDescription: "Digital katalog för italienska förlag på Göteborgs Bokmässa.",
    },
    en: {
      homeAria: "Back to welcome screen",
      filter: "Filter",
      welcomeLabel: "Welcome",
      aboutBtn: "About ITA Agency",
      booksBtn: "Selection of Italian Titles",
      calendarBtn: "Find the Right Book Fair in Italy",
      nibAria: "New Italian Books page",
      catalogLabel: "Catalogue",
      clearFilterAria: "Show all titles",
      publishersLabel: "Filter by publisher",
      back: "Back",
      choosePublisher: "Choose publisher",
      choosePublisherLead: "Tap a publisher to show their titles.",
      publishersKicker: "Catalogue",
      bookLabel: "Book detail",
      bookQrCaption: "Scan the QR code for more information on your own device",
      bookShareQrCaption: "Scan for website and contact card on your own device",
      calendarLabel: "Calendar",
      calendarKicker: "Events",
      calendarHeading: "Book fairs in Italy",
      calendarLead: "Tap a fair for dates, venue and more information.",
      fairLabel: "Book fair",
      fairVisitors: "Visitors",
      fairDates: "Dates",
      fairLocation: "Venue",
      fairQrCaption: "Scan the QR code to learn more about the fair",
      fairShareQrCaption: "Scan for website and calendar on your own device",
      aboutLabel: "About us",
      aboutKicker: "Italian Trade Agency",
      aboutHeading: "About ITA",
      aboutLead: "Our role in publishing — and how to reach the Stockholm office.",
      aboutQrCaption: "Scan the QR code to visit ice.it",
      nibQrCaption: "Scan the QR code to visit newitalianbooks.it",
      shareLabel: "Share",
      shareVisitWebsite: "Visit website",
      shareSaveContact: "Save contact",
      shareAddCalendar: "Add to calendar",
      shareBookLead: "Open the website or save the publisher as a contact.",
      shareFairLead: "Open the fair website or add the dates to your calendar.",
      shareUnavailable: "This information could not be opened.",
      shareCalendarMissing: "Calendar dates are missing for this fair.",
      bootMark: "Catalogue",
      bootSub: "Italian publishers",
      bootStatus: "Opening the catalogue…",
      bootError: "The catalogue could not be loaded. Check your connection and try again.",
      emptyBooks: "No titles to show.",
      allTitles: "All titles",
      loadError: "The information could not be loaded right now.",
      calendarLoadError: "Could not load the calendar.",
      pageTitle: "Catalogue — Italian publishers",
      pageDescription: "Digital catalogue for Italian publishers at the Göteborg Book Fair.",
    },
  };

  const CONTENT = {
    sv: {
      about: "./om-oss.md",
      calendar: "./kalender.md",
      nib: "./newitalianbooks.md",
      fairs: {
        bologna: "./massor/bologna.md",
        "piu-libri": "./massor/piu-libri.md",
        salone: "./massor/salone.md",
      },
    },
    en: {
      about: "./en/om-oss.md",
      calendar: "./en/kalender.md",
      nib: "./en/newitalianbooks.md",
      fairs: {
        bologna: "./en/massor/bologna.md",
        "piu-libri": "./en/massor/piu-libri.md",
        salone: "./en/massor/salone.md",
      },
    },
  };

  const els = {
    boot: document.getElementById("boot"),
    bootStatus: document.getElementById("boot-status"),
    app: document.getElementById("app"),
    btnHome: document.getElementById("btn-home"),
    btnBooks: document.getElementById("btn-books"),
    btnCalendar: document.getElementById("btn-calendar"),
    btnAbout: document.getElementById("btn-about"),
    btnNib: document.getElementById("btn-nib"),
    btnPublishers: document.getElementById("btn-publishers"),
    btnClearFilter: document.getElementById("btn-clear-filter"),
    btnBackPublishers: document.getElementById("btn-back-publishers"),
    btnBackBook: document.getElementById("btn-back-book"),
    btnBackFair: document.getElementById("btn-back-fair"),
    btnLangSv: document.getElementById("btn-lang-sv"),
    btnLangEn: document.getElementById("btn-lang-en"),
    viewWelcome: document.getElementById("view-welcome"),
    viewCatalog: document.getElementById("view-catalog"),
    viewPublishers: document.getElementById("view-publishers"),
    viewBook: document.getElementById("view-book"),
    viewCalendar: document.getElementById("view-calendar"),
    viewFair: document.getElementById("view-fair"),
    viewAbout: document.getElementById("view-about"),
    viewNib: document.getElementById("view-nib"),
    viewShare: document.getElementById("view-share"),
    calendarContent: document.getElementById("calendar-content"),
    fairBanner: document.getElementById("fair-banner"),
    fairLogo: document.getElementById("fair-logo"),
    fairContent: document.getElementById("fair-content"),
    fairQrWrap: document.getElementById("fair-qr-wrap"),
    fairQr: document.getElementById("fair-qr"),
    qrShareFair: document.getElementById("qr-share-fair"),
    aboutContent: document.getElementById("about-content"),
    nibBody: document.getElementById("nib-body"),
    nibContent: document.getElementById("nib-content"),
    nibQr: document.getElementById("nib-qr"),
    qrShareNib: document.getElementById("qr-share-nib"),
    filterBar: document.getElementById("filter-bar"),
    filterLogo: document.getElementById("filter-logo"),
    filterName: document.getElementById("filter-name"),
    bookGrid: document.getElementById("book-grid"),
    publisherGrid: document.getElementById("publisher-grid"),
    detailCover: document.getElementById("detail-cover"),
    detailPublisher: document.getElementById("detail-publisher"),
    detailTitle: document.getElementById("detail-title"),
    detailAuthor: document.getElementById("detail-author"),
    detailSummary: document.getElementById("detail-summary"),
    qr: document.getElementById("qr"),
    qrShareBook: document.getElementById("qr-share-book"),
    shareLogo: document.getElementById("share-logo"),
    shareKicker: document.getElementById("share-kicker"),
    shareTitle: document.getElementById("share-title"),
    shareLead: document.getElementById("share-lead"),
    shareActions: document.getElementById("share-actions"),
  };

  const views = {
    welcome: els.viewWelcome,
    catalog: els.viewCatalog,
    publishers: els.viewPublishers,
    book: els.viewBook,
    calendar: els.viewCalendar,
    fair: els.viewFair,
    about: els.viewAbout,
    nib: els.viewNib,
    share: els.viewShare,
  };

  let catalog = { publishers: [], books: [] };
  let selectedPublisherId = null;
  let idleTimer = null;
  let qrInstance = null;
  let lang = "sv";
  let currentView = "welcome";
  let currentFairId = null;
  let currentBookId = null;
  let shareMode = false;

  function t(key) {
    return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.sv[key] || key;
  }

  function contentUrls() {
    return CONTENT[lang] || CONTENT.sv;
  }

  function applyStaticTranslations() {
    document.documentElement.lang = lang;
    document.title = t("pageTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("pageDescription"));

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key) node.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const key = node.getAttribute("data-i18n-aria");
      if (key) node.setAttribute("aria-label", t(key));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
      const key = node.getAttribute("data-i18n-aria-label");
      if (key) node.setAttribute("aria-label", t(key));
    });

    els.btnLangSv.classList.toggle("is-active", lang === "sv");
    els.btnLangEn.classList.toggle("is-active", lang === "en");
    els.btnLangSv.setAttribute("aria-pressed", lang === "sv" ? "true" : "false");
    els.btnLangEn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
  }

  function publicUrl(rel) {
    return "./public/" + String(rel).split("/").map(encodeURIComponent).join("/");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function isSafeUrl(url) {
    return /^(https?:\/\/|mailto:|tel:|#|\.\/|\/|public\/)/i.test(url) && !/javascript:/i.test(url);
  }

  function inlineMarkdown(text) {
    let out = escapeHtml(text);
    out = out.replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, (_, alt, imgUrl, href) => {
      const src = imgUrl.trim().replace(/&amp;/g, "&");
      const linkHref = href.trim().replace(/&amp;/g, "&");
      if (!isSafeUrl(src) || !isSafeUrl(linkHref)) return alt;
      return `<a href="${escapeHtml(linkHref)}" rel="noopener noreferrer" class="calendar-fair-link"><img src="${escapeHtml(src)}" alt="${alt}" class="calendar-fair-logo" draggable="false"></a>`;
    });
    out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
      const src = url.trim().replace(/&amp;/g, "&");
      if (!isSafeUrl(src)) return alt;
      return `<img src="${escapeHtml(src)}" alt="${alt}" draggable="false">`;
    });
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      const href = url.trim().replace(/&amp;/g, "&");
      if (!isSafeUrl(href)) return label;
      return `<a href="${escapeHtml(href)}" rel="noopener noreferrer">${label}</a>`;
    });
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    out = out.replace(/_([^_]+)_/g, "<em>$1</em>");
    return out;
  }

  function markdownToHtml(source) {
    const text = String(source)
      .replace(/\r\n/g, "\n")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
    const lines = text.split("\n");
    const html = [];
    let para = [];
    let i = 0;

    function flushPara() {
      if (!para.length) return;
      html.push("<p>" + inlineMarkdown(para.join(" ")) + "</p>");
      para = [];
    }

    function parseRow(row) {
      return row
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim());
    }

    while (i < lines.length) {
      const trimmed = lines[i].trim();

      if (!trimmed) {
        flushPara();
        i += 1;
        continue;
      }

      if (/^---+$/.test(trimmed)) {
        flushPara();
        html.push("<hr>");
        i += 1;
        continue;
      }

      const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
      if (heading) {
        flushPara();
        const level = heading[1].length;
        html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        i += 1;
        continue;
      }

      if (/^>\s?/.test(trimmed)) {
        flushPara();
        const quotes = [];
        while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
          quotes.push(lines[i].trim().replace(/^>\s?/, ""));
          i += 1;
        }
        html.push("<blockquote><p>" + inlineMarkdown(quotes.join(" ")) + "</p></blockquote>");
        continue;
      }

      if (/^\|/.test(trimmed) && i + 1 < lines.length && /^\|?\s*:?-+:?\s*\|/.test(lines[i + 1].trim())) {
        flushPara();
        const headers = parseRow(trimmed);
        i += 2;
        const rows = [];
        while (i < lines.length && /^\|/.test(lines[i].trim())) {
          rows.push(parseRow(lines[i].trim()));
          i += 1;
        }
        html.push(
          "<table><thead><tr>" +
            headers.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("") +
            "</tr></thead><tbody>" +
            rows
              .map(
                (row) =>
                  "<tr>" +
                  headers.map((_, idx) => `<td>${inlineMarkdown(row[idx] || "")}</td>`).join("") +
                  "</tr>"
              )
              .join("") +
            "</tbody></table>"
        );
        continue;
      }

      if (/^[-*]\s+/.test(trimmed)) {
        flushPara();
        html.push("<ul>");
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
          html.push("<li>" + inlineMarkdown(lines[i].trim().replace(/^[-*]\s+/, "")) + "</li>");
          i += 1;
        }
        html.push("</ul>");
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        flushPara();
        html.push("<ol>");
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          html.push("<li>" + inlineMarkdown(lines[i].trim().replace(/^\d+\.\s+/, "")) + "</li>");
          i += 1;
        }
        html.push("</ol>");
        continue;
      }

      para.push(trimmed);
      i += 1;
    }

    flushPara();
    return html.join("");
  }

  function parseFairSource(source) {
    const text = String(source).replace(/\r\n/g, "\n");
    // "<!-- fair" must be followed by a newline so comments like
    // "<!-- Fair page — ... -->" are not treated as metadata blocks.
    const fairBlock = /<!--\s*fair\s*\n([\s\S]*?)-->/i.exec(text);
    const meta = {};
    if (fairBlock) {
      fairBlock[1].split("\n").forEach((line) => {
        const pair = /^\s*([a-z]+)\s*:\s*(.+?)\s*$/i.exec(line);
        if (pair) meta[pair[1].toLowerCase()] = pair[2].trim();
      });
    }
    return { meta, html: markdownToHtml(text) };
  }

  function renderFairInfobox(meta) {
    const rows = [
      meta.visitors ? { label: t("fairVisitors"), value: meta.visitors } : null,
      meta.dates ? { label: t("fairDates"), value: meta.dates } : null,
      meta.location ? { label: t("fairLocation"), value: meta.location } : null,
    ].filter(Boolean);
    if (!rows.length) return "";
    return (
      `<dl class="fair-infobox">` +
      rows
        .map(
          (row) =>
            `<div class="fair-infobox-row"><dt>${escapeHtml(row.label)}</dt><dd>${escapeHtml(row.value)}</dd></div>`
        )
        .join("") +
      `</dl>`
    );
  }

  function injectFairInfobox(html, meta) {
    const infobox = renderFairInfobox(meta);
    if (!infobox) return html;
    if (/<h2\b[^>]*>[\s\S]*?<\/h2>/i.test(html)) {
      return html.replace(/<h2\b[^>]*>[\s\S]*?<\/h2>/i, (heading) => heading + infobox);
    }
    return infobox + html;
  }

  function fairPageUrl(id) {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = `fair-${id}`;
    return url.href;
  }

  function sharePageUrl(kind, id) {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = `share/${kind}/${id}`;
    return url.href;
  }

  function setShareHash(kind, id) {
    const next = kind && id ? `#share/${kind}/${id}` : "";
    if (window.location.hash === next) return;
    if (kind && id) {
      history.replaceState(null, "", next);
    } else if (/^#share\//i.test(window.location.hash || "")) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  function shareRouteFromHash() {
    const match = /^#share\/(book|fair|publisher)\/([a-z0-9-]+)$/i.exec(window.location.hash || "");
    if (!match) return null;
    return { kind: match[1].toLowerCase(), id: match[2].toLowerCase() };
  }

  function escapeVCard(value) {
    return String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  }

  function buildVCard({ name, org, url, email, phone, address }) {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCard(name || org || "")}`,
    ];
    if (org) lines.push(`ORG:${escapeVCard(org)}`);
    if (url) lines.push(`URL:${escapeVCard(url)}`);
    if (email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCard(email)}`);
    if (phone) lines.push(`TEL;TYPE=WORK,VOICE:${escapeVCard(phone)}`);
    if (address) lines.push(`ADR;TYPE=WORK:;;${escapeVCard(address)};;;;`);
    lines.push("END:VCARD");
    return lines.join("\r\n");
  }

  function isoDateOnly(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || "").trim());
    return match ? `${match[1]}${match[2]}${match[3]}` : null;
  }

  function addOneDayIso(yyyymmdd) {
    const y = Number(yyyymmdd.slice(0, 4));
    const m = Number(yyyymmdd.slice(4, 6)) - 1;
    const d = Number(yyyymmdd.slice(6, 8));
    const date = new Date(Date.UTC(y, m, d));
    date.setUTCDate(date.getUTCDate() + 1);
    const yy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    return `${yy}${mm}${dd}`;
  }

  function buildIcs({ title, location, description, start, end, url }) {
    const dtStart = isoDateOnly(start);
    const dtEndRaw = isoDateOnly(end) || dtStart;
    if (!dtStart) return null;
    // All-day DTEND is exclusive in iCalendar.
    const dtEnd = addOneDayIso(dtEndRaw);
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    const uid = `ita-${dtStart}-${String(title || "event")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}@katalog`;
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ITA Katalog//Book Fair//SV",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${dtStart}`,
      `DTEND;VALUE=DATE:${dtEnd}`,
      `SUMMARY:${escapeVCard(title || "")}`,
    ];
    if (location) lines.push(`LOCATION:${escapeVCard(location)}`);
    if (description) lines.push(`DESCRIPTION:${escapeVCard(description)}`);
    if (url) lines.push(`URL:${escapeVCard(url)}`);
    lines.push("END:VEVENT", "END:VCALENDAR");
    return lines.join("\r\n");
  }

  function downloadTextFile(filename, mime, content) {
    const blob = new Blob([content], { type: mime });
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1500);
  }

  function slugFilename(value, fallback) {
    const slug = String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return slug || fallback;
  }

  function enterShareMode() {
    shareMode = true;
    clearTimeout(idleTimer);
    document.body.classList.add("is-share");
    els.app.classList.add("is-share");
  }

  function exitShareMode() {
    if (!shareMode) return;
    shareMode = false;
    document.body.classList.remove("is-share");
    els.app.classList.remove("is-share");
    setShareHash(null, null);
    resetIdleTimer();
  }

  function clearShareView() {
    els.shareLogo.hidden = true;
    els.shareLogo.removeAttribute("src");
    els.shareLogo.alt = "";
    els.shareKicker.textContent = "";
    els.shareTitle.textContent = "";
    els.shareLead.textContent = "";
    els.shareActions.innerHTML = "";
  }

  function renderShareActions(actions) {
    els.shareActions.innerHTML = actions
      .map((action) => {
        if (action.href) {
          return `<a class="share-action" href="${escapeHtml(action.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
            action.label
          )}</a>`;
        }
        return `<button type="button" class="share-action" data-share-action="${escapeHtml(action.id)}">${escapeHtml(
          action.label
        )}</button>`;
      })
      .join("");
  }

  function openShareUnavailable() {
    enterShareMode();
    clearShareView();
    els.shareTitle.textContent = t("shareUnavailable");
    els.shareLead.textContent = "";
    renderShareActions([]);
    showView("share");
  }

  function openSharePublisher(publisher, kicker) {
    if (!publisher) {
      openShareUnavailable();
      return;
    }
    enterShareMode();
    clearShareView();
    setShareHash("publisher", publisher.id);
    if (publisher.logo) {
      els.shareLogo.src = publicUrl(publisher.logo);
      els.shareLogo.alt = publisher.name;
      els.shareLogo.hidden = false;
    }
    els.shareKicker.textContent = kicker || "";
    els.shareTitle.textContent = publisher.name;
    els.shareLead.textContent = t("shareBookLead");
    const website = publisher.url && isSafeUrl(publisher.url) ? publisher.url : "";
    const actions = [];
    if (website) {
      actions.push({ id: "website", label: t("shareVisitWebsite"), href: website });
    }
    actions.push({ id: "vcard", label: t("shareSaveContact") });
    renderShareActions(actions);
    els.shareActions.dataset.shareKind = "publisher";
    els.shareActions.dataset.shareId = publisher.id;
    showView("share");
  }

  function openShareBook(id) {
    const book = bookById(id);
    if (!book) {
      openShareUnavailable();
      return;
    }
    const publisher = publisherById(book.publisherId);
    if (!publisher) {
      openShareUnavailable();
      return;
    }
    enterShareMode();
    clearShareView();
    setShareHash("book", book.id);
    if (publisher.logo) {
      els.shareLogo.src = publicUrl(publisher.logo);
      els.shareLogo.alt = publisher.name;
      els.shareLogo.hidden = false;
    }
    els.shareKicker.textContent = "";
    els.shareTitle.textContent = publisher.name;
    els.shareLead.textContent = t("shareBookLead");
    const website =
      (book.url && isSafeUrl(book.url) && book.url) ||
      (publisher.url && isSafeUrl(publisher.url) && publisher.url) ||
      "";
    const actions = [];
    if (website) {
      actions.push({ id: "website", label: t("shareVisitWebsite"), href: website });
    }
    actions.push({ id: "vcard", label: t("shareSaveContact") });
    renderShareActions(actions);
    els.shareActions.dataset.shareKind = "book";
    els.shareActions.dataset.shareId = book.id;
    showView("share");
  }

  async function openShareFair(id) {
    const url = contentUrls().fairs[id];
    if (!url) {
      openShareUnavailable();
      return;
    }
    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Kunde inte läsa ${url}.`);
      const markdown = await response.text();
      const { meta } = parseFairSource(markdown);
      enterShareMode();
      clearShareView();
      setShareHash("fair", id);
      if (meta.logo) {
        els.shareLogo.src = publicUrl(meta.logo);
        els.shareLogo.alt = meta.title || "";
        els.shareLogo.hidden = false;
      }
      els.shareKicker.textContent = meta.dates || "";
      els.shareTitle.textContent = meta.title || id;
      els.shareLead.textContent = t("shareFairLead");
      const website = meta.website && isSafeUrl(meta.website) ? meta.website : "";
      const actions = [];
      if (website) {
        actions.push({ id: "website", label: t("shareVisitWebsite"), href: website });
      }
      actions.push({ id: "ics", label: t("shareAddCalendar") });
      renderShareActions(actions);
      els.shareActions.dataset.shareKind = "fair";
      els.shareActions.dataset.shareId = id;
      els.shareActions.dataset.fairStart = meta.start || "";
      els.shareActions.dataset.fairEnd = meta.end || "";
      els.shareActions.dataset.fairLocation = meta.location || "";
      els.shareActions.dataset.fairWebsite = website;
      els.shareActions.dataset.fairTitle = meta.title || id;
      showView("share");
    } catch (error) {
      console.error(error);
      openShareUnavailable();
    }
  }

  async function openShareRoute(route) {
    if (!route) return false;
    if (route.kind === "book") {
      openShareBook(route.id);
      return true;
    }
    if (route.kind === "publisher") {
      openSharePublisher(publisherById(route.id));
      return true;
    }
    if (route.kind === "fair") {
      await openShareFair(route.id);
      return true;
    }
    return false;
  }

  function handleShareAction(actionId) {
    const kind = els.shareActions.dataset.shareKind;
    const id = els.shareActions.dataset.shareId;
    if (actionId === "vcard") {
      let publisher = null;
      if (kind === "publisher") publisher = publisherById(id);
      if (kind === "book") {
        const book = bookById(id);
        publisher = book ? publisherById(book.publisherId) : null;
      }
      if (!publisher) return;
      const vcard = buildVCard({
        name: publisher.name,
        org: publisher.name,
        url: publisher.url,
        email: publisher.email,
        phone: publisher.phone,
        address: publisher.address,
      });
      downloadTextFile(`${slugFilename(publisher.id || publisher.name, "contact")}.vcf`, "text/vcard;charset=utf-8", vcard);
      return;
    }
    if (actionId === "ics") {
      const ics = buildIcs({
        title: els.shareActions.dataset.fairTitle,
        location: els.shareActions.dataset.fairLocation,
        description: els.shareActions.dataset.fairTitle,
        start: els.shareActions.dataset.fairStart,
        end: els.shareActions.dataset.fairEnd,
        url: els.shareActions.dataset.fairWebsite,
      });
      if (!ics) {
        els.shareLead.textContent = t("shareCalendarMissing");
        return;
      }
      downloadTextFile(`${slugFilename(id, "fair")}.ics`, "text/calendar;charset=utf-8", ics);
    }
  }

  function setFairHash(id) {
    if (shareMode) return;
    const next = id ? `#fair-${id}` : "";
    if (window.location.hash === next) return;
    if (id) {
      history.replaceState(null, "", `#fair-${id}`);
    } else if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  function publisherById(id) {
    return catalog.publishers.find((publisher) => publisher.id === id) || null;
  }

  function bookById(id) {
    return catalog.books.find((book) => book.id === id) || null;
  }

  function bookSummary(book) {
    const summary = book && book.summary;
    if (!summary) return "";
    if (typeof summary === "object") {
      return summary[lang] || summary.sv || summary.en || "";
    }
    return String(summary);
  }

  function visibleBooks() {
    if (!selectedPublisherId) return catalog.books;
    return catalog.books.filter((book) => book.publisherId === selectedPublisherId);
  }

  function showView(name) {
    if (name !== "share" && shareMode) {
      shareMode = false;
      document.body.classList.remove("is-share");
      els.app.classList.remove("is-share");
      setShareHash(null, null);
      resetIdleTimer();
    }
    currentView = name;
    Object.entries(views).forEach(([key, node]) => {
      const active = key === name;
      node.classList.toggle("is-active", active);
      node.setAttribute("aria-hidden", active ? "false" : "true");
    });
    els.app.classList.toggle("is-welcome", name === "welcome");
    const pickerOpen = name === "publishers";
    els.btnPublishers.classList.toggle("is-open", pickerOpen);
    els.btnPublishers.setAttribute("aria-expanded", pickerOpen ? "true" : "false");
    els.btnPublishers.hidden = name !== "catalog" && name !== "publishers";
    if (name !== "fair") {
      currentFairId = null;
      setFairHash(null);
    }
  }

  function updateFilterBar() {
    const publisher = selectedPublisherId ? publisherById(selectedPublisherId) : null;
    const filtered = Boolean(publisher);
    els.filterBar.hidden = !filtered;
    els.btnPublishers.classList.toggle("is-active", filtered);
    if (publisher) {
      els.filterName.textContent = publisher.name;
      els.filterLogo.src = publicUrl(publisher.logo);
      els.filterLogo.alt = publisher.name;
    }
  }

  function renderCatalog() {
    const books = visibleBooks();
    if (!books.length) {
      els.bookGrid.innerHTML = `<p class="empty-state">${escapeHtml(t("emptyBooks"))}</p>`;
      return;
    }

    els.bookGrid.innerHTML = books
      .map((book) => {
        return `
          <button class="book-card" type="button" data-book-id="${escapeHtml(book.id)}">
            <span class="book-cover-wrap">
              <img src="${publicUrl(book.cover)}" alt="${escapeHtml(book.title)}" draggable="false">
            </span>
            <span class="book-card-meta">
              <span class="book-card-title">${escapeHtml(book.title)}</span>
              <span class="book-card-author">${escapeHtml(book.bookAuthor)}</span>
            </span>
          </button>
        `;
      })
      .join("");
  }

  function renderPublishers() {
    const allCard = `
      <button class="publisher-card publisher-card-all${!selectedPublisherId ? " is-selected" : ""}" type="button" data-publisher-id="all">
        <span class="publisher-name">${escapeHtml(t("allTitles"))}</span>
      </button>
    `;

    const publisherCards = catalog.publishers
      .map((publisher) => {
        const selected = publisher.id === selectedPublisherId ? " is-selected" : "";
        return `
          <button class="publisher-card${selected}" type="button" data-publisher-id="${escapeHtml(publisher.id)}">
            <span class="publisher-logo-well">
              <img src="${publicUrl(publisher.logo)}" alt="" draggable="false">
            </span>
            <span class="publisher-name">${escapeHtml(publisher.name)}</span>
          </button>
        `;
      })
      .join("");

    els.publisherGrid.innerHTML = allCard + publisherCards;
  }

  function renderQR(url, mount) {
    const node = mount || els.qr;
    node.innerHTML = "";
    node.removeAttribute("title");
    if (node === els.qr) qrInstance = null;
    if (!url || typeof QRCode === "undefined") return;

    const instance = new QRCode(node, {
      text: url,
      width: 200,
      height: 200,
      colorDark: "#1a1210",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
    if (node === els.qr) qrInstance = instance;
    node.removeAttribute("title");
  }

  function clearFairBanner() {
    els.fairBanner.hidden = true;
    els.fairBanner.removeAttribute("src");
    els.fairBanner.alt = "";
    clearFairLogo();
  }

  function clearFairLogo() {
    els.fairLogo.hidden = true;
    els.fairLogo.removeAttribute("src");
    els.fairLogo.alt = "";
  }

  function setFairBanner(src, alt) {
    if (!src) {
      clearFairBanner();
      return;
    }
    els.fairBanner.src = src;
    els.fairBanner.alt = alt || "";
    els.fairBanner.hidden = false;
  }

  function setFairLogo(src, alt) {
    if (!src) {
      clearFairLogo();
      return;
    }
    els.fairLogo.src = src;
    els.fairLogo.alt = alt || "";
    els.fairLogo.hidden = false;
  }

  function clearFairView() {
    currentFairId = null;
    clearFairBanner();
    els.fairContent.innerHTML = "";
    els.fairContent.scrollTop = 0;
    els.fairQr.innerHTML = "";
    if (els.qrShareFair) els.qrShareFair.innerHTML = "";
    els.fairQrWrap.hidden = true;
  }

  function showFairUnavailable() {
    currentFairId = null;
    clearFairBanner();
    els.fairContent.innerHTML = `<p class="empty-state">${escapeHtml(t("loadError"))}</p>`;
    els.fairQr.innerHTML = "";
    if (els.qrShareFair) els.qrShareFair.innerHTML = "";
    els.fairQrWrap.hidden = true;
    showView("fair");
    els.fairContent.scrollTop = 0;
  }

  async function openFair(id) {
    const url = contentUrls().fairs[id];
    if (!url) {
      showFairUnavailable();
      return;
    }
    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Kunde inte läsa ${url}.`);
      const markdown = await response.text();
      const { meta, html } = parseFairSource(markdown);
      currentFairId = id;
      setFairBanner(meta.image ? publicUrl(meta.image) : "", meta.title || "");
      setFairLogo(meta.logo ? publicUrl(meta.logo) : "", meta.title || "");
      const body = html ? injectFairInfobox(html, meta) : "";
      els.fairContent.innerHTML = body || `<p class="empty-state">${escapeHtml(t("loadError"))}</p>`;
      els.fairQrWrap.hidden = false;
      const legacyUrl = meta.website && isSafeUrl(meta.website) ? meta.website : fairPageUrl(id);
      // Keep legacy QR generation so it can be re-enabled without code loss.
      renderQR(legacyUrl, els.fairQr);
      if (SHARE_QR_TEST && els.qrShareFair) {
        renderQR(sharePageUrl("fair", id), els.qrShareFair);
      }
      showView("fair");
      setFairHash(id);
      els.fairContent.scrollTop = 0;
    } catch (error) {
      console.error(error);
      showFairUnavailable();
    }
  }

  function openBook(id) {
    const book = bookById(id);
    if (!book) return;
    const publisher = publisherById(book.publisherId);
    currentBookId = id;
    els.detailCover.src = publicUrl(book.cover);
    els.detailCover.alt = book.title;
    els.detailPublisher.textContent = publisher ? publisher.name : "";
    els.detailTitle.textContent = book.title;
    els.detailAuthor.textContent = book.bookAuthor;
    els.detailSummary.textContent = bookSummary(book);
    // Legacy QR path retained for easy rollback.
    renderQR(book.url);
    if (SHARE_QR_TEST && els.qrShareBook) {
      renderQR(sharePageUrl("book", book.id), els.qrShareBook);
    }
    showView("book");
    els.viewBook.scrollTop = 0;
    const body = els.viewBook.querySelector(".detail-body");
    if (body) body.scrollTop = 0;
  }

  function setFilter(publisherId) {
    selectedPublisherId = publisherId;
    updateFilterBar();
    renderPublishers();
    renderCatalog();
    els.bookGrid.scrollTop = 0;
    showView("catalog");
  }

  function resetToHome() {
    if (shareMode) return;
    selectedPublisherId = null;
    currentBookId = null;
    updateFilterBar();
    renderPublishers();
    renderCatalog();
    els.bookGrid.scrollTop = 0;
    els.calendarContent.scrollTop = 0;
    els.aboutContent.scrollTop = 0;
    els.nibBody.scrollTop = 0;
    clearFairView();
    setFairHash(null);
    showView("welcome");
    els.qr.innerHTML = "";
    if (els.qrShareBook) els.qrShareBook.innerHTML = "";
  }

  function resetIdleTimer() {
    if (shareMode) return;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(resetToHome, IDLE_TIMEOUT);
  }

  function precacheAssets() {
    const urls = [
      ...catalog.publishers.map((publisher) => publicUrl(publisher.logo)),
      ...catalog.books.map((book) => publicUrl(book.cover)),
    ];
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  function enhanceAboutHtml(html) {
    const match = /<h2>(Kontakt|Contact)<\/h2>/i.exec(html);
    const qrBlock =
      `<div class="qr-block fair-qr-card contact-qr">` +
      `<div id="about-qr" class="qr" aria-hidden="true"></div>` +
      `<p class="qr-caption">${escapeHtml(t("aboutQrCaption"))}</p>` +
      `</div>`;
    if (!match) {
      return `<div class="about-body">${html}</div><aside class="contact-panel" aria-label="Kontakt">${qrBlock}</aside>`;
    }
    const idx = html.indexOf(match[0]);
    const body = html.slice(0, idx).trim();
    const contact = html.slice(idx).trim();
    return (
      `<div class="about-body">${body}</div>` +
      `<aside class="contact-panel" aria-label="${escapeHtml(match[1])}">${contact}${qrBlock}</aside>`
    );
  }

  function renderAboutQr() {
    const mount = document.getElementById("about-qr");
    if (mount) renderQR(ITA_SITE_URL, mount);
  }

  async function loadMarkdown(url, target, enhance) {
    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Kunde inte läsa ${url}.`);
      const markdown = await response.text();
      let html = markdownToHtml(markdown);
      if (typeof enhance === "function") html = enhance(html);
      target.innerHTML = html;
    } catch (error) {
      target.innerHTML = `<p class="empty-state">${escapeHtml(t("loadError"))}</p>`;
      console.error(error);
    }
  }

  async function loadAbout() {
    await loadMarkdown(contentUrls().about, els.aboutContent, enhanceAboutHtml);
    renderAboutQr();
  }

  function loadNib() {
    return loadMarkdown(contentUrls().nib, els.nibContent);
  }

  function enhanceCalendar(root) {
    root.querySelectorAll("tbody tr").forEach((row) => {
      const link = row.querySelector('a[href^="#fair-"]');
      if (!link) return;
      const fairMatch = /^#fair-([a-z0-9-]+)$/i.exec(link.getAttribute("href") || "");
      if (fairMatch) row.dataset.fairId = fairMatch[1].toLowerCase();

      if (!row.querySelector(".calendar-row-affordance")) {
        const cell = document.createElement("td");
        cell.className = "calendar-row-affordance";
        cell.setAttribute("aria-hidden", "true");
        cell.innerHTML =
          '<span class="calendar-row-arrow"><svg viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.41 1.41l4.59-4.58a1 1 0 0 0 0-1.42l-4.59-4.58a1 1 0 0 0-1.41 0Z"/></svg></span>';
        row.appendChild(cell);
      }
    });
  }

  async function loadCalendar() {
    try {
      const response = await fetch(contentUrls().calendar, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Kunde inte läsa kalendern.`);
      const markdown = await response.text();
      els.calendarContent.innerHTML = markdownToHtml(markdown);
      enhanceCalendar(els.calendarContent);
    } catch (error) {
      els.calendarContent.innerHTML = `<p>${escapeHtml(t("calendarLoadError"))}</p>`;
      console.error(error);
    }
  }

  async function setLanguage(nextLang) {
    if (!STRINGS[nextLang] || nextLang === lang) return;
    lang = nextLang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {
      /* ignore */
    }
    applyStaticTranslations();
    renderPublishers();
    renderCatalog();
    await Promise.all([loadAbout(), loadCalendar(), loadNib()]);
    if (currentView === "fair" && currentFairId) {
      await openFair(currentFairId);
    } else if (currentView === "book" && currentBookId) {
      openBook(currentBookId);
    } else if (currentView === "about") {
      renderAboutQr();
    } else if (currentView === "nib") {
      renderQR(NIB_SITE_URL, els.nibQr);
      if (SHARE_QR_TEST && els.qrShareNib) renderQR(NIB_SITE_URL, els.qrShareNib);
    } else if (currentView === "share") {
      const route = shareRouteFromHash();
      if (route) await openShareRoute(route);
    }
  }

  function bindEvents() {
    els.btnHome.addEventListener("click", () => {
      resetToHome();
    });
    els.btnBooks.addEventListener("click", () => {
      setFilter(null);
    });
    els.btnCalendar.addEventListener("click", () => {
      els.calendarContent.scrollTop = 0;
      showView("calendar");
    });
    els.btnAbout.addEventListener("click", () => {
      els.aboutContent.scrollTop = 0;
      renderAboutQr();
      showView("about");
    });
    els.btnNib.addEventListener("click", () => {
      els.nibBody.scrollTop = 0;
      renderQR(NIB_SITE_URL, els.nibQr);
      if (SHARE_QR_TEST && els.qrShareNib) renderQR(NIB_SITE_URL, els.qrShareNib);
      showView("nib");
    });
    els.btnPublishers.addEventListener("click", () => {
      if (els.viewPublishers.classList.contains("is-active")) {
        showView("catalog");
        return;
      }
      showView("publishers");
      els.publisherGrid.scrollTop = 0;
    });
    els.btnClearFilter.addEventListener("click", () => {
      setFilter(null);
    });
    els.btnBackPublishers.addEventListener("click", () => {
      showView("catalog");
    });
    els.btnBackBook.addEventListener("click", () => {
      showView("catalog");
    });
    els.btnBackFair.addEventListener("click", () => {
      clearFairView();
      setFairHash(null);
      showView("calendar");
    });

    els.btnLangSv.addEventListener("click", () => setLanguage("sv"));
    els.btnLangEn.addEventListener("click", () => setLanguage("en"));

    document.addEventListener(
      "click",
      (event) => {
        const shareAction = event.target.closest("[data-share-action]");
        if (shareAction) {
          event.preventDefault();
          handleShareAction(shareAction.getAttribute("data-share-action"));
          return;
        }
        const link = event.target.closest("a[href]");
        if (!link) return;
        const href = (link.getAttribute("href") || "").trim().replace(/&amp;/g, "&");
        const fairMatch = /^#fair-([a-z0-9-]+)$/i.exec(href);
        if (fairMatch) {
          event.preventDefault();
          openFair(fairMatch[1].toLowerCase());
          return;
        }
        // In share mode (phone landing), allow https / mailto / tel / downloads.
        if (shareMode) return;
        if (/^(https?:|\/\/|mailto:|tel:)/i.test(href)) {
          event.preventDefault();
        }
      },
      true
    );

    els.calendarContent.addEventListener("click", (event) => {
      const row = event.target.closest("tbody tr");
      if (!row || event.target.closest("a[href]")) return;
      const fairLink = row.querySelector('a[href^="#fair-"]');
      if (!fairLink) return;
      event.preventDefault();
      const fairMatch = /^#fair-([a-z0-9-]+)$/i.exec(fairLink.getAttribute("href") || "");
      if (fairMatch) openFair(fairMatch[1].toLowerCase());
    });

    els.bookGrid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-book-id]");
      if (card) openBook(card.dataset.bookId);
    });

    els.publisherGrid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-publisher-id]");
      if (!card) return;
      const id = card.dataset.publisherId;
      setFilter(id === "all" ? null : id);
    });

    window.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("dblclick", (event) => event.preventDefault());
    ["gesturestart", "gesturechange", "gestureend"].forEach((evt) => {
      document.addEventListener(evt, (event) => event.preventDefault());
    });

    ["touchstart", "pointerdown", "keydown", "touchmove"].forEach((evt) => {
      window.addEventListener(evt, resetIdleTimer, { passive: true });
    });
    els.bookGrid.addEventListener("scroll", resetIdleTimer, { passive: true });
    els.calendarContent.addEventListener("scroll", resetIdleTimer, { passive: true });
    els.fairContent.addEventListener("scroll", resetIdleTimer, { passive: true });
    els.aboutContent.addEventListener("scroll", resetIdleTimer, { passive: true });
    els.nibBody.addEventListener("scroll", resetIdleTimer, { passive: true });
  }

  async function loadCatalog() {
    const response = await fetch(CATALOG_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error("Kunde inte läsa katalogen.");
    const data = await response.json();
    if (!data.publishers || !data.books) throw new Error("Ogiltig katalogdata.");
    return data;
  }

  function readStoredLang() {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "sv") return stored;
    } catch (_) {
      /* ignore */
    }
    return "sv";
  }

  function fairIdFromHash() {
    const match = /^#fair-([a-z0-9-]+)$/i.exec(window.location.hash || "");
    return match ? match[1].toLowerCase() : null;
  }

  async function routeFromLocation() {
    const shareRoute = shareRouteFromHash();
    if (shareRoute) {
      await openShareRoute(shareRoute);
      return;
    }
    if (shareMode) exitShareMode();
    const deepFair = fairIdFromHash();
    if (deepFair && contentUrls().fairs[deepFair]) {
      await openFair(deepFair);
    }
  }

  async function init() {
    lang = readStoredLang();
    applyStaticTranslations();
    bindEvents();
    window.addEventListener("hashchange", () => {
      routeFromLocation().catch((error) => console.error(error));
    });
    resetIdleTimer();
    try {
      catalog = await loadCatalog();
      renderPublishers();
      renderCatalog();
      updateFilterBar();
      precacheAssets();
      await Promise.all([loadAbout(), loadCalendar(), loadNib()]);
      const shareRoute = shareRouteFromHash();
      if (shareRoute) {
        await openShareRoute(shareRoute);
      } else {
        const deepFair = fairIdFromHash();
        if (deepFair && contentUrls().fairs[deepFair]) {
          await openFair(deepFair);
        } else {
          showView("welcome");
        }
      }
      els.boot.classList.add("is-done");
      els.boot.setAttribute("aria-hidden", "true");
    } catch (error) {
      els.boot.classList.add("is-error");
      els.bootStatus.textContent = t("bootError");
      console.error(error);
    }
  }

  init();
})();
