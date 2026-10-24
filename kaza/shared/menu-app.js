/* ==========================================================================
   KAZA CAFÉ — PAGE MENU
   Rendu depuis menu-data.js · barre de catégories collante + scrollspy ·
   recherche + filtres · fiche détaillée avec transition FLIP (la photo part
   de la grille et grandit), bottom-sheet sur mobile, lien #item partageable,
   fermeture Échap / clic extérieur / glisser vers le bas / bouton retour.
   ========================================================================== */
(function () {
  const K = window.KAZA, S = window.KazaSite, M = window.KazaMascots;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = () => window.matchMedia("(max-width: 719px)").matches;
  const EASE = "cubic-bezier(.2,.75,.15,1)";
  const DUR = 520;

  const els = {};
  const state = { q: "", temp: null, decaf: false, vege: false, halal: false, openId: null, sourceCard: null, pushed: false, busy: false };

  const norm = (s) => (s || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  /* ---------- Rendu ---------- */
  function ingText(it) {
    return (it.ing || []).map((x) => (S.lang === "en" ? K.ingredientsEN[x] || x : x));
  }
  function searchText(it) {
    return norm([it.name, it.en, ...(it.ing || []), ...ingText(it), S.pick(S.catOf(it)), it.desc ? it.desc.fr : "", it.desc ? it.desc.en : ""].join(" "));
  }
  function badges(it, cls) {
    const out = [];
    if (it.signature) out.push(`<span class="badge badge--sig">${S.t("b.signature")}</span>`);
    (it.tags || []).forEach((t) => out.push(`<span class="badge badge--${t}">${S.t("b." + t)}</span>`));
    return out.length ? `<span class="${cls}">${out.join("")}</span>` : "";
  }
  /* Item en ligne (façon carte de resto) : texte à gauche, photo à droite.
     Item vedette : grande photo, nom et prix posés dessus. */
  function card(it, big) {
    const data = `href="#${it.id}" data-id="${it.id}" data-search="${esc(searchText(it))}" data-temp="${it.temp || ""}" data-caf="${it.caf === false ? "0" : it.caf ? "1" : ""}" data-tags="${(it.tags || []).join(" ")}"`;
    if (big) {
      return `<a class="card feat" ${data}>
        ${S.media(it, "card-media")}
        <span class="feat-text"><span class="card-name">${S.itemName(it)}</span><span class="card-price">${S.price(it)}</span></span>
        <span class="feat-plus" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
      </a>`;
    }
    const desc = it.desc ? S.pick(it.desc) : "";
    const ing = ingText(it).join(", ");
    const tags = [];
    if ((it.tags || []).includes("populaire")) tags.push(`<span class="tag tag--pop">${S.t("b.populaire")}</span>`);
    if ((it.tags || []).includes("vege")) tags.push(`<span class="tag">${S.t("b.vege")}</span>`);
    if ((it.tags || []).includes("halal")) tags.push(`<span class="tag">${S.t("b.halal")}</span>`);
    if ((it.tags || []).includes("noix")) tags.push(`<span class="tag">*${S.t("b.noix")}</span>`);
    return `<a class="card item" ${data}>
      <span class="item-text">
        <span class="item-top"><span class="card-name">${S.itemName(it)}</span><span class="card-price">${S.price(it)}</span></span>
        ${desc || ing ? `<span class="item-desc">${[desc, ing].filter(Boolean).join(" ")}</span>` : ""}
        ${tags.length ? `<span class="item-tags">${tags.join("")}</span>` : ""}
      </span>
      ${S.media(it, "card-media")}
    </a>`;
  }

  function render() {
    // Barre de catégories
    const cats = [{ id: "vedette", mascot: "cookie", fr: "En vedette", en: "Featured" }, ...K.categories];
    els.bar.innerHTML = cats.map((c) =>
      `<a class="cat-chip" href="#cat-${c.id}" data-cat="${c.id}"><span class="cat-chip-icon">${M[c.mascot]()}</span><span>${S.pick(c)}</span></a>`
    ).join("");

    // Sections
    const featured = K.featured.map((id) => S.item(id)).filter(Boolean);
    let html = `<section class="cat-section cat-section--featured" id="cat-vedette" data-cat="vedette" aria-labelledby="h-vedette">
      <header class="cat-head"><h2 id="h-vedette">${S.t("menu.featured")}</h2>
        <span class="carousel-nav"><button type="button" class="arrow" data-car="-1" aria-label="${S.t("menu.prev")}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><button type="button" class="arrow" data-car="1" aria-label="${S.t("menu.next")}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button></span></header>
      <div class="carousel" data-carousel>${featured.map((it) => card(it, true)).join("")}</div></section>`;

    K.categories.forEach((c) => {
      const items = K.items.filter((i) => i.cat === c.id);
      if (!items.length) return;
      let lastGroup = null, inner = "";
      items.forEach((it) => {
        const g = it.group ? S.pick(it.group) : null;
        if (g && g !== lastGroup) { inner += `<h3 class="group">${g}</h3>`; lastGroup = g; }
        inner += card(it, false);
      });
      html += `<section class="cat-section" id="cat-${c.id}" data-cat="${c.id}" aria-labelledby="h-${c.id}">
        <header class="cat-head"><h2 id="h-${c.id}">${S.pick(c)}</h2>${c.note ? `<p class="cat-note">${S.pick(c.note)}</p>` : ""}</header>
        <div class="items">${inner}</div></section>`;
    });
    els.list.innerHTML = html;
    S.watchImages(els.list);

    // Filtres : on cache « Halal » tant qu'aucun item n'est marqué
    const hasHalal = K.items.some((i) => (i.tags || []).includes("halal"));
    const halalBtn = $('[data-filter="halal"]'); if (halalBtn) halalBtn.hidden = !hasHalal;

    initCarousel();
    observeSections();
    applyFilters();
    injectSchema();
  }

  /* ---------- Carrousel « En vedette » ---------- */
  function initCarousel() {
    const car = $("[data-carousel]"); if (!car) return;
    const btns = $$("[data-car]");
    const sync = () => {
      btns[0].disabled = car.scrollLeft < 4;
      btns[1].disabled = car.scrollLeft + car.clientWidth > car.scrollWidth - 4;
    };
    btns.forEach((b) => b.addEventListener("click", () => {
      car.scrollBy({ left: Number(b.dataset.car) * car.clientWidth * 0.8, behavior: reduce() ? "auto" : "smooth" });
    }));
    car.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  /* ---------- Recherche + filtres ---------- */
  function applyFilters() {
    const q = norm(state.q.trim());
    const active = q || state.temp || state.decaf || state.vege || state.halal;
    let count = 0;
    $$(".cat-section").forEach((sec) => {
      const featured = sec.dataset.cat === "vedette";
      if (featured) { sec.hidden = !!active; return; }
      let visible = 0;
      $$(".card", sec).forEach((c) => {
        let ok = true;
        if (q && !c.dataset.search.includes(q)) ok = false;
        if (state.temp && c.dataset.temp !== state.temp) ok = false;
        if (state.decaf && c.dataset.caf !== "0") ok = false;
        if (state.vege && !c.dataset.tags.includes("vege")) ok = false;
        if (state.halal && !c.dataset.tags.includes("halal")) ok = false;
        c.hidden = !ok; if (ok) visible++;
      });
      // sous-titres de groupe sans item visible
      $$(".group", sec).forEach((g) => {
        let n = g.nextElementSibling, any = false;
        while (n && !n.classList.contains("group")) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        g.hidden = !any;
      });
      sec.hidden = visible === 0;
      count += visible;
    });
    $$(".cat-chip").forEach((chip) => {
      const sec = document.getElementById("cat-" + chip.dataset.cat);
      chip.hidden = !sec || sec.hidden;
    });
    els.results.textContent = active ? S.t("menu.results", { n: count }) : "";
    els.clear.hidden = !active;
    els.empty.hidden = !(active && count === 0);
  }

  function initFilters() {
    els.search.addEventListener("input", () => { state.q = els.search.value; applyFilters(); });
    $$("[data-filter]").forEach((b) => {
      b.addEventListener("click", () => {
        const f = b.dataset.filter;
        if (f === "chaud" || f === "glace") {
          state.temp = state.temp === f ? null : f;
        } else state[f] = !state[f];
        syncFilterButtons(); applyFilters();
      });
    });
    els.clear.addEventListener("click", () => {
      state.q = ""; els.search.value = ""; state.temp = null; state.decaf = state.vege = state.halal = false;
      syncFilterButtons(); applyFilters(); els.search.focus();
    });
  }
  function syncFilterButtons() {
    $$("[data-filter]").forEach((b) => {
      const f = b.dataset.filter;
      const on = f === "chaud" || f === "glace" ? state.temp === f : !!state[f];
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  /* ---------- Barre collante + scrollspy ---------- */
  let io, clickLock = 0;
  function observeSections() {
    if (io) io.disconnect();
    io = new IntersectionObserver((entries) => {
      if (Date.now() < clickLock) return;
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.cat); });
    }, { rootMargin: "-30% 0px -65% 0px" });
    $$(".cat-section").forEach((s) => io.observe(s));
  }
  function setActive(id) {
    $$(".cat-chip").forEach((c) => {
      const on = c.dataset.cat === id;
      c.classList.toggle("is-active", on);
      if (on) {
        c.setAttribute("aria-current", "true");
        const bar = els.bar, beh = reduce() ? "auto" : "smooth";
        if (bar.scrollWidth > bar.clientWidth + 2) bar.scrollTo({ left: c.offsetLeft - bar.clientWidth / 2 + c.offsetWidth / 2, behavior: beh });
        else if (bar.scrollHeight > bar.clientHeight + 2) bar.scrollTo({ top: c.offsetTop - bar.clientHeight / 2 + c.offsetHeight / 2, behavior: beh });
      } else c.removeAttribute("aria-current");
    });
  }
  function initBar() {
    els.bar.addEventListener("click", (e) => {
      const chip = e.target.closest(".cat-chip"); if (!chip) return;
      e.preventDefault();
      const sec = document.getElementById("cat-" + chip.dataset.cat); if (!sec) return;
      clickLock = Date.now() + 900;
      setActive(chip.dataset.cat);
      sec.scrollIntoView({ behavior: reduce() ? "auto" : "smooth", block: "start" });
      const h = sec.querySelector("h2"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    });
    // ombre/filet quand la barre colle
    const sentinel = els.sentinel;
    if (sentinel) new IntersectionObserver(([e]) => els.sticky.classList.toggle("is-stuck", !e.isIntersecting)).observe(sentinel);
  }

  /* ---------- Fiche détaillée ---------- */
  function optionsHTML(it) {
    const opts = it.opts || [];
    if (!opts.length) return "";
    return opts.map((key, gi) => {
      const o = K.options[key]; if (!o) return "";
      const type = o.type === "many" ? "checkbox" : "radio";
      const name = `opt-${it.id}-${key}`;
      const extra = key === "extras";
      return `<fieldset class="opt${extra ? " opt--extras" : ""}">
        <legend>${S.pick(o.label)}</legend>
        <div class="opt-choices">${o.choices.map((c, i) => `
          <label class="opt-choice"><input type="${type}" name="${name}" id="${name}-${i}" ${type === "radio" && i === 0 ? "checked" : ""}><span>${S.pick(c)}</span></label>`).join("")}
        </div></fieldset>`;
    }).join("") + `<p class="opt-note">${S.t("sheet.optNote")}</p>`;
  }

  function fillSheet(it) {
    const cat = S.catOf(it);
    els.sheetMedia.innerHTML = `<div class="ph" aria-hidden="true">${M[cat.mascot]()}</div><img src="${it.img}" alt="${esc(S.itemName(it))}" decoding="async" width="900" height="900">`;
    els.sheetMedia.dataset.mascot = cat.mascot;
    els.sheetMedia.classList.remove("has-img");
    S.watchImages(els.sheet);
    els.sheetCat.innerHTML = `<span class="cat-icon">${M[cat.mascot]()}</span>${S.pick(cat)}`;
    els.sheetTitle.textContent = S.itemName(it);
    els.sheetPrice.textContent = S.price(it);
    els.sheetBadges.innerHTML = badges(it, "badges");
    els.sheetDesc.textContent = it.desc ? S.pick(it.desc) : "";
    els.sheetDesc.hidden = !it.desc;
    const ing = ingText(it);
    els.sheetIng.innerHTML = ing.map((x) => `<li>${x}</li>`).join("");
    els.sheetIngWrap.hidden = !ing.length;
    els.sheetOpts.innerHTML = optionsHTML(it);
    els.order.href = K.meta.orderUrl;
    els.sheetScroll.scrollTop = 0;
  }

  function rect(el) { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, width: r.width, height: r.height }; }
  function inView(r) { return r.bottom > 0 && r.top < innerHeight && r.width > 0; }

  /* Clone le média et le fait voyager d'un rectangle à l'autre (taille, coins, fond) */
  function flyClone(fromEl, toEl, fromR, toR) {
    const a = getComputedStyle(fromEl), b = getComputedStyle(toEl);
    const clone = fromEl.cloneNode(true);
    clone.classList.add("media-fly");
    clone.removeAttribute("id"); clone.removeAttribute("data-sheet-media");
    clone.style.cssText = `position:fixed;margin:0;z-index:120;visibility:visible;left:${fromR.left}px;top:${fromR.top}px;width:${fromR.width}px;height:${fromR.height}px;border-radius:${a.borderRadius};background-color:${a.backgroundColor};color:${a.color}`;
    document.body.appendChild(clone);
    const anim = clone.animate([
      { left: fromR.left + "px", top: fromR.top + "px", width: fromR.width + "px", height: fromR.height + "px", borderRadius: a.borderRadius, backgroundColor: a.backgroundColor, color: a.color },
      { left: toR.left + "px", top: toR.top + "px", width: toR.width + "px", height: toR.height + "px", borderRadius: b.borderRadius, backgroundColor: b.backgroundColor, color: b.color }
    ], { duration: DUR, easing: EASE, fill: "forwards" });
    return { clone, anim };
  }

  let lastFocus = null;
  function openItem(id, opts = {}) {
    const it = S.item(id); if (!it || state.busy) return;
    if (state.openId === id) return;
    if (state.openId) closeSheet({ instant: true, keepHash: true });
    state.openId = id;
    lastFocus = document.activeElement;
    fillSheet(it);

    // carte source : celle cliquée, sinon la première visible de cet item
    let src = opts.card || $$(`.card[data-id="${id}"]`).find((c) => !c.hidden && inView(c.getBoundingClientRect()));
    state.sourceCard = src || null;

    els.root.hidden = false;
    document.documentElement.classList.add("sheet-open");
    els.root.classList.add("is-open");
    const mobile = isMobile();

    const finish = () => {
      els.sheet.focus({ preventScroll: true });
      state.busy = false;
    };

    if (reduce() || !src) {
      els.root.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reduce() ? 1 : 220, easing: "ease-out" });
      finish();
    } else {
      state.busy = true;
      const srcMedia = src.querySelector(".card-media");
      const fromR = rect(srcMedia);
      const toR = rect(els.sheetMedia);
      els.sheetMedia.style.visibility = "hidden";
      srcMedia.style.visibility = "hidden";
      const { clone, anim } = flyClone(srcMedia, els.sheetMedia, fromR, toR);
      els.backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DUR, easing: "ease-out" });
      els.sheet.animate(mobile
        ? [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }]
        : [{ opacity: 0, transform: "translateY(16px) scale(.985)" }, { opacity: 1, transform: "none" }],
        { duration: DUR, easing: EASE });
      els.sheetBody.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: DUR, delay: DUR * 0.35, easing: EASE, fill: "backwards" });
      anim.onfinish = () => { els.sheetMedia.style.visibility = ""; clone.remove(); finish(); };
    }

    if (opts.push !== false) {
      try { history.pushState({ kaza: id }, "", "#" + id); state.pushed = true; } catch (e) { state.pushed = false; }
    }
  }

  function closeSheet(o = {}) {
    if (!state.openId) return;
    const src = state.sourceCard;
    const srcMedia = src ? src.querySelector(".card-media") : null;
    const done = () => {
      els.root.hidden = true;
      els.root.classList.remove("is-open");
      document.documentElement.classList.remove("sheet-open");
      els.sheet.style.transform = "";
      els.sheetMedia.style.visibility = "";
      if (srcMedia) srcMedia.style.visibility = "";
      state.openId = null; state.sourceCard = null; state.busy = false;
      if (!o.keepHash && location.hash) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} }
      if (lastFocus && document.contains(lastFocus) && !o.instant) lastFocus.focus({ preventScroll: true });
    };
    if (o.instant || reduce()) { done(); return; }

    state.busy = true;
    const mobile = isMobile();
    const srcR = srcMedia ? srcMedia.getBoundingClientRect() : null;
    const canFly = srcMedia && inView(srcR);
    const current = getComputedStyle(els.sheet).transform;
    const sheetAnim = els.sheet.animate(mobile
      ? [{ transform: current === "none" ? "translateY(0)" : current }, { transform: "translateY(100%)" }]
      : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(12px) scale(.985)" }],
      { duration: DUR * 0.85, easing: EASE, fill: "forwards" });
    els.backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: DUR * 0.85, easing: "ease-out", fill: "forwards" });

    if (canFly) {
      const fromR = rect(els.sheetMedia);
      els.sheetMedia.style.visibility = "hidden";
      const { clone, anim } = flyClone(els.sheetMedia, srcMedia, fromR, rect(srcMedia));
      anim.onfinish = () => { clone.remove(); sheetAnim.cancel(); els.backdrop.getAnimations().forEach((a) => a.cancel()); done(); };
    } else {
      sheetAnim.onfinish = () => { sheetAnim.cancel(); els.backdrop.getAnimations().forEach((a) => a.cancel()); done(); };
    }
  }

  /* Fermeture demandée par l'utilisateur : passe par l'historique si on l'a poussé */
  function requestClose() {
    if (state.busy) return;
    if (state.pushed && history.state && history.state.kaza) { state.pushed = false; history.back(); }
    else closeSheet();
  }

  function initSheet() {
    els.list.addEventListener("click", (e) => {
      const c = e.target.closest(".card"); if (!c) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      openItem(c.dataset.id, { card: c });
    });
    els.close.addEventListener("click", requestClose);
    els.backdrop.addEventListener("click", requestClose);
    els.root.addEventListener("click", (e) => { if (e.target === els.root) requestClose(); });

    document.addEventListener("keydown", (e) => {
      if (!state.openId) return;
      if (e.key === "Escape") { e.preventDefault(); requestClose(); }
      if (e.key === "Tab") { // garde le focus dans la fiche
        const f = $$('button, [href], input, [tabindex]:not([tabindex="-1"])', els.sheet).filter((x) => !x.hidden && x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === els.sheet)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    window.addEventListener("popstate", () => {
      const id = location.hash.slice(1);
      if (id && S.item(id)) { state.pushed = !!(history.state && history.state.kaza); openItem(id, { push: false }); }
      else if (state.openId) { state.pushed = false; closeSheet({ keepHash: true }); }
    });

    // Copier le lien de l'item
    els.share.addEventListener("click", () => {
      const url = location.href.split("#")[0] + "#" + state.openId;
      const ok = () => { els.share.textContent = S.t("sheet.copied"); setTimeout(() => (els.share.textContent = S.t("sheet.share")), 1600); };
      try { navigator.clipboard.writeText(url).then(ok, () => {}); } catch (e) {}
    });

    // Glisser vers le bas pour fermer (mobile)
    let startY = 0, dy = 0, t0 = 0, dragging = false;
    els.sheet.addEventListener("pointerdown", (e) => {
      if (!isMobile() || state.busy || e.pointerType === "mouse") return;
      if (e.target.closest("input, label, a, button") && !e.target.closest(".sheet-grip")) return;
      if (els.sheetScroll.scrollTop > 0 && !e.target.closest(".sheet-grip")) return;
      dragging = true; startY = e.clientY; dy = 0; t0 = performance.now();
    });
    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      dy = Math.max(0, e.clientY - startY);
      if (dy > 4) { els.sheet.style.transform = `translateY(${dy}px)`; els.sheet.classList.add("is-dragging"); }
    }, { passive: true });
    const end = () => {
      if (!dragging) return; dragging = false;
      els.sheet.classList.remove("is-dragging");
      const v = dy / Math.max(1, performance.now() - t0);
      if (dy > 120 || (v > 0.6 && dy > 30)) requestClose();
      else if (dy > 0) {
        els.sheet.animate([{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }], { duration: 260, easing: EASE });
        els.sheet.style.transform = "";
      }
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  }

  /* ---------- SEO : schema.org Menu généré depuis les données ---------- */
  function injectSchema() {
    const old = document.getElementById("menu-schema"); if (old) old.remove();
    const data = {
      "@context": "https://schema.org", "@type": "Menu", name: "Menu KAZA CAFÉ", inLanguage: S.lang === "en" ? "en-CA" : "fr-CA",
      hasMenuSection: K.categories.map((c) => ({
        "@type": "MenuSection", name: S.pick(c),
        hasMenuItem: K.items.filter((i) => i.cat === c.id).map((i) => {
          const o = { "@type": "MenuItem", name: S.itemName(i), description: ingText(i).join(", ") || undefined };
          if (i.price != null) o.offers = { "@type": "Offer", price: i.price, priceCurrency: "CAD" };
          if ((i.tags || []).includes("vege")) o.suitableForDiet = "https://schema.org/VegetarianDiet";
          if ((i.tags || []).includes("halal")) o.suitableForDiet = "https://schema.org/HalalDiet";
          return o;
        })
      }))
    };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.id = "menu-schema";
    s.textContent = JSON.stringify(data); document.head.appendChild(s);
  }

  /* ---------- Démarrage ---------- */
  function init() {
    Object.assign(els, {
      sticky: $("[data-sticky]"), sentinel: $("[data-sticky-sentinel]"), bar: $("[data-catbar]"), list: $("[data-menu]"),
      search: $("#menu-search"), results: $("[data-results]"), clear: $("[data-clear]"), empty: $("[data-empty]"),
      root: $("[data-sheet-root]"), backdrop: $("[data-sheet-backdrop]"), sheet: $("[data-sheet]"), close: $("[data-sheet-close]"),
      sheetScroll: $("[data-sheet-scroll]"), sheetMedia: $("[data-sheet-media]"), sheetBody: $("[data-sheet-body]"),
      sheetCat: $("[data-sheet-cat]"), sheetTitle: $("#sheet-title"), sheetPrice: $("[data-sheet-price]"), sheetBadges: $("[data-sheet-badges]"),
      sheetDesc: $("[data-sheet-desc]"), sheetIng: $("[data-sheet-ing]"), sheetIngWrap: $("[data-sheet-ing-wrap]"), sheetOpts: $("[data-sheet-opts]"),
      order: $("[data-order]"), share: $("[data-share]")
    });
    S.init();
    render();
    initBar(); initFilters(); initSheet();
    if (!location.hash) setActive("vedette");
    S.onLang(() => {
      const open = state.openId;
      if (open) closeSheet({ instant: true, keepHash: true });
      render();
      if (open) openItem(open, { push: false });
    });
    // lien direct vers un item (menu.html#avokaza) ou une catégorie (menu.html#cat-matcha-glace)
    const h = location.hash.slice(1);
    if (h && S.item(h)) {
      const c = $$(`.card[data-id="${h}"]`).pop();
      if (c) c.scrollIntoView({ block: "center" });
      requestAnimationFrame(() => openItem(h, { push: false }));
    } else if (h && h.startsWith("cat-")) {
      const sec = document.getElementById(h); if (sec) requestAnimationFrame(() => sec.scrollIntoView());
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
