(() => {
  const IDLE_TIMEOUT = 60_000;
  const CATALOG_URL = "./public/catalog.json";
  const NIB_SITE_URL = "https://www.newitalianbooks.it/";
  const LANG_KEY = "ita-katalog-lang";

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
      choosePublisherLead: "Visa titlar från ett förlag.",
      bookLabel: "Bokdetalj",
      bookQrCaption: "Skanna QR-koden för mer information på din egen enhet",
      calendarLabel: "Kalender",
      calendarHeading: "Kalender",
      calendarLead: "Italienska mässor i samarbete med ITA.",
      fairLabel: "Mässa",
      fairQrCaption: "Skanna QR-koden för att veta mer om mässan",
      aboutLabel: "Om oss",
      aboutHeading: "Om oss",
      aboutLead: "Italian Trade Agency och hur du når oss.",
      nibQrCaption: "Skanna QR-koden för att besöka newitalianbooks.it",
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
      choosePublisherLead: "Show titles from one publisher.",
      bookLabel: "Book detail",
      bookQrCaption: "Scan the QR code for more information on your own device",
      calendarLabel: "Calendar",
      calendarHeading: "Calendar",
      calendarLead: "Italian book fairs in cooperation with ITA.",
      fairLabel: "Book fair",
      fairQrCaption: "Scan the QR code to learn more about the fair",
      aboutLabel: "About us",
      aboutHeading: "About us",
      aboutLead: "Italian Trade Agency and how to reach us.",
      nibQrCaption: "Scan the QR code to visit newitalianbooks.it",
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
    calendarContent: document.getElementById("calendar-content"),
    fairMeta: document.getElementById("fair-meta"),
    fairContent: document.getElementById("fair-content"),
    fairQrWrap: document.getElementById("fair-qr-wrap"),
    fairQr: document.getElementById("fair-qr"),
    aboutContent: document.getElementById("about-content"),
    nibContent: document.getElementById("nib-content"),
    nibQr: document.getElementById("nib-qr"),
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
  };

  let catalog = { publishers: [], books: [] };
  let selectedPublisherId = null;
  let idleTimer = null;
  let qrInstance = null;
  let lang = "sv";
  let currentView = "welcome";
  let currentFairId = null;
  let currentBookId = null;

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
    const fairBlock = /<!--\s*fair\s+([\s\S]*?)-->/i.exec(text);
    const meta = {};
    if (fairBlock) {
      fairBlock[1].split("\n").forEach((line) => {
        const pair = /^\s*([a-z]+)\s*:\s*(.+?)\s*$/i.exec(line);
        if (pair) meta[pair[1].toLowerCase()] = pair[2].trim();
      });
    }
    return { meta, html: markdownToHtml(text) };
  }

  function fairPageUrl(id) {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = `fair-${id}`;
    return url.href;
  }

  function setFairHash(id) {
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

  function visibleBooks() {
    if (!selectedPublisherId) return catalog.books;
    return catalog.books.filter((book) => book.publisherId === selectedPublisherId);
  }

  function showView(name) {
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

  function clearFairView() {
    currentFairId = null;
    els.fairMeta.textContent = "";
    els.fairMeta.hidden = true;
    els.fairContent.innerHTML = "";
    els.fairContent.scrollTop = 0;
    els.fairQr.innerHTML = "";
    els.fairQrWrap.hidden = true;
  }

  function showFairUnavailable() {
    currentFairId = null;
    els.fairMeta.textContent = "";
    els.fairMeta.hidden = true;
    els.fairContent.innerHTML = `<p class="empty-state">${escapeHtml(t("loadError"))}</p>`;
    els.fairQr.innerHTML = "";
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
      const metaLine = [meta.dates, meta.location].filter(Boolean).join(" · ");
      currentFairId = id;
      els.fairMeta.textContent = metaLine;
      els.fairMeta.hidden = !metaLine;
      els.fairContent.innerHTML = html || `<p class="empty-state">${escapeHtml(t("loadError"))}</p>`;
      els.fairQrWrap.hidden = false;
      renderQR(fairPageUrl(id), els.fairQr);
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
    els.detailSummary.textContent = book.summary;
    renderQR(book.url);
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
    selectedPublisherId = null;
    currentBookId = null;
    updateFilterBar();
    renderPublishers();
    renderCatalog();
    els.bookGrid.scrollTop = 0;
    els.calendarContent.scrollTop = 0;
    els.aboutContent.scrollTop = 0;
    els.nibContent.scrollTop = 0;
    clearFairView();
    setFairHash(null);
    showView("welcome");
    els.qr.innerHTML = "";
  }

  function resetIdleTimer() {
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

  async function loadMarkdown(url, target) {
    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Kunde inte läsa ${url}.`);
      const markdown = await response.text();
      target.innerHTML = markdownToHtml(markdown);
    } catch (error) {
      target.innerHTML = `<p class="empty-state">${escapeHtml(t("loadError"))}</p>`;
      console.error(error);
    }
  }

  function loadAbout() {
    return loadMarkdown(contentUrls().about, els.aboutContent);
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
    } else if (currentView === "nib") {
      renderQR(NIB_SITE_URL, els.nibQr);
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
      showView("about");
    });
    els.btnNib.addEventListener("click", () => {
      els.nibContent.scrollTop = 0;
      renderQR(NIB_SITE_URL, els.nibQr);
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
        const link = event.target.closest("a[href]");
        if (!link) return;
        const href = (link.getAttribute("href") || "").trim().replace(/&amp;/g, "&");
        const fairMatch = /^#fair-([a-z0-9-]+)$/i.exec(href);
        if (fairMatch) {
          event.preventDefault();
          openFair(fairMatch[1].toLowerCase());
          return;
        }
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
    els.nibContent.addEventListener("scroll", resetIdleTimer, { passive: true });
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

  async function init() {
    lang = readStoredLang();
    applyStaticTranslations();
    bindEvents();
    resetIdleTimer();
    try {
      catalog = await loadCatalog();
      renderPublishers();
      renderCatalog();
      updateFilterBar();
      precacheAssets();
      await Promise.all([loadAbout(), loadCalendar(), loadNib()]);
      const deepFair = fairIdFromHash();
      if (deepFair && contentUrls().fairs[deepFair]) {
        await openFair(deepFair);
      } else {
        showView("welcome");
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
