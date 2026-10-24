/* ==========================================================================
   KAZA CAFÉ — LOGIQUE COMMUNE (bilingue, statut ouvert/fermé, heures,
   aperçu « En vedette », saveurs, carte). Utilisé par l'accueil et le menu.
   ========================================================================== */
(function () {
  const K = window.KAZA;
  const M = window.KazaMascots;

  /* ---------- Textes FR / EN ---------- */
  const STR = {
    fr: {
      "skip": "Aller au contenu",
      "nav.menu": "Menu", "nav.matcha": "Matcha", "nav.place": "Le lieu", "nav.info": "Infos",
      "nav.home": "Accueil", "lang.switch": "EN", "lang.label": "Switch to English",
      "hero.line": "Le café du quartier où l'on se sent à la maison.",
      "hero.sub": "Matcha chaud ou glacé en {n} saveurs, sandwichs sur ciabatta, gâteaux, et thé marocain à la menthe servi comme à la maison.",
      "hero.since": "Rosemont–La Petite-Patrie · depuis septembre 2025",
      "hero.ph": "Vidéo : un matcha fraise-vanille qu'on verse",
      "cta.menu": "Voir le menu", "cta.directions": "Itinéraire",
      "matcha.eyebrow": "Ce que tout le monde commande",
      "matcha.title": "Le matcha",
      "matcha.body": "Du matcha servi chaud ou glacé, nature ou avec l'une des {n} saveurs de la maison. Le plus commandé : le Matcha Latté Glacé Fraise Vanille.",
      "matcha.count": "saveurs au choix",
      "matcha.sig": "Les signatures glacées",
      "matcha.flavours": "Saveurs latté & matcha",
      "matcha.link": "Voir tous les matchas",
      "matcha.press": "Kaza figure dans le guide des meilleurs cafés matcha de Montréal publié par Corner.",
      "preview.title": "En vedette", "preview.link": "Voir tout le menu",
      "place.title": "Le lieu",
      "place.lede": "Un endroit pour étudier, travailler ou simplement se poser.",
      "place.body": "Des petits sofas, une musique de fond douce et assez de calme pour ouvrir un livre ou un ordi. Des jeux de société à emprunter sur place.",
      "place.c1": "Les petits sofas", "place.c2": "La terrasse", "place.c3": "Le comptoir", "place.c4": "Le coin étude",
      "place.ph": "Photo à venir",
      "reviews.title": "Ce que les gens disent",
      "reviews.count": "sur plus de 200 avis Google",
      "reviews.link": "Lire tous les avis sur Google", "reviews.more": "Plus de 200 autres avis vous attendent.",
      "reviews.src": "Avis Google",
      "info.title": "Infos pratiques",
      "info.where": "Adresse", "info.hours": "Heures", "info.contact": "Contact", "info.services": "Sur place",
      "info.svc": "Sur place · À emporter", "info.access": "Entrée accessible en fauteuil roulant", "info.terrace": "Terrasse en saison",
      "info.hoursNote": "Heures à confirmer pendant les fériés.",
      "map.show": "Afficher la carte", "map.open": "Ouvrir dans Google Maps", "map.title": "Carte : KAZA CAFÉ, 3306 boul. Rosemont",
      "footer.avail": "Les articles peuvent varier selon la disponibilité.",
      "footer.made": "Café de quartier · Montréal",
      "closed": "Fermé",
      "days": ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      "status.open": "Ouvert maintenant · ferme à {h}",
      "status.closedLater": "Fermé · ouvre à {h}",
      "status.closedTomorrow": "Fermé · ouvre demain à {h}",
      "status.closedDay": "Fermé · ouvre {d} à {h}",
      /* Menu */
      "menu.title": "Le menu",
      "menu.lede": "Tout ce qu'on sert, sur une seule page. Touche un item pour voir les ingrédients et les options.",
      "menu.search": "Chercher : matcha, pesto, pistache…",
      "menu.searchLabel": "Chercher dans le menu",
      "menu.filters": "Filtres",
      "f.chaud": "Chaud", "f.glace": "Glacé", "f.decaf": "Sans caféine", "f.vege": "Végé", "f.halal": "Halal",
      "menu.results": "{n} résultat(s)",
      "menu.empty": "Rien ne correspond. Essaie un autre mot ou retire un filtre.",
      "menu.clear": "Tout effacer",
      "menu.featured": "En vedette", "menu.prev": "Précédent", "menu.next": "Suivant",
      "menu.categories": "Catégories du menu",
      "b.populaire": "Populaire", "b.vege": "Végé", "b.noix": "Contient des noix", "b.halal": "Halal", "b.signature": "Signature",
      "sheet.close": "Fermer", "sheet.order": "Commander", "sheet.ing": "Ingrédients", "sheet.share": "Copier le lien",
      "sheet.copied": "Lien copié",
      "sheet.optNote": "Précise tes choix au comptoir ou à la commande.",
      "price.none": "— $",
      "notfound.title": "Cette page s'est perdue en chemin.",
      "notfound.body": "Le sandwich est parti la chercher. En attendant :"
    },
    en: {
      "skip": "Skip to content",
      "nav.menu": "Menu", "nav.matcha": "Matcha", "nav.place": "The place", "nav.info": "Visit",
      "nav.home": "Home", "lang.switch": "FR", "lang.label": "Passer en français",
      "hero.line": "The neighbourhood café where you feel at home.",
      "hero.sub": "Hot or iced matcha in {n} flavours, sandwiches on ciabatta, cakes, and Moroccan mint tea served the way it's served at home.",
      "hero.since": "Rosemont–La Petite-Patrie · since September 2025",
      "hero.ph": "Video: a strawberry-vanilla matcha being poured",
      "cta.menu": "See the menu", "cta.directions": "Directions",
      "matcha.eyebrow": "What everyone orders",
      "matcha.title": "The matcha",
      "matcha.body": "Matcha served hot or iced, plain or with one of {n} house flavours. The most ordered: the Iced Strawberry Vanilla Matcha Latte.",
      "matcha.count": "flavours to choose from",
      "matcha.sig": "Iced signatures",
      "matcha.flavours": "Latte & matcha flavours",
      "matcha.link": "See every matcha",
      "matcha.press": "Kaza is listed in Corner's guide to the best matcha cafés in Montréal.",
      "preview.title": "Featured", "preview.link": "See the full menu",
      "place.title": "The place",
      "place.lede": "A place to study, work, or just sit for a while.",
      "place.body": "Small sofas, quiet music, and enough calm to open a book or a laptop. Board games to borrow.",
      "place.c1": "The small sofas", "place.c2": "The terrace", "place.c3": "The counter", "place.c4": "The study corner",
      "place.ph": "Photo coming soon",
      "reviews.title": "What people say",
      "reviews.count": "from 200+ Google reviews",
      "reviews.link": "Read every review on Google", "reviews.more": "200+ more reviews are waiting.",
      "reviews.src": "Google review",
      "info.title": "Visit",
      "info.where": "Address", "info.hours": "Hours", "info.contact": "Contact", "info.services": "On site",
      "info.svc": "Dine in · Takeout", "info.access": "Wheelchair-accessible entrance", "info.terrace": "Terrace in season",
      "info.hoursNote": "Holiday hours may vary.",
      "map.show": "Show the map", "map.open": "Open in Google Maps", "map.title": "Map: KAZA CAFÉ, 3306 boul. Rosemont",
      "footer.avail": "Items may vary depending on availability.",
      "footer.made": "Neighbourhood café · Montréal",
      "closed": "Closed",
      "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "status.open": "Open now · closes at {h}",
      "status.closedLater": "Closed · opens at {h}",
      "status.closedTomorrow": "Closed · opens tomorrow at {h}",
      "status.closedDay": "Closed · opens {d} at {h}",
      "menu.title": "The menu",
      "menu.lede": "Everything we serve, on one page. Tap an item for ingredients and options.",
      "menu.search": "Search: matcha, pesto, pistachio…",
      "menu.searchLabel": "Search the menu",
      "menu.filters": "Filters",
      "f.chaud": "Hot", "f.glace": "Iced", "f.decaf": "Caffeine-free", "f.vege": "Veggie", "f.halal": "Halal",
      "menu.results": "{n} result(s)",
      "menu.empty": "Nothing matches. Try another word or remove a filter.",
      "menu.clear": "Clear all",
      "menu.featured": "Featured", "menu.prev": "Previous", "menu.next": "Next",
      "menu.categories": "Menu categories",
      "b.populaire": "Popular", "b.vege": "Veggie", "b.noix": "Contains nuts", "b.halal": "Halal", "b.signature": "Signature",
      "sheet.close": "Close", "sheet.order": "Order", "sheet.ing": "Ingredients", "sheet.share": "Copy link",
      "sheet.copied": "Link copied",
      "sheet.optNote": "Tell us your choices at the counter or when ordering.",
      "price.none": "— $",
      "notfound.title": "This page got lost on the way.",
      "notfound.body": "The sandwich went looking for it. Meanwhile:"
    }
  };

  /* ---------- Langue ---------- */
  function readLang() {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (q === "en" || q === "fr") return q;
    } catch (e) {}
    try { const s = localStorage.getItem("kaza-lang"); if (s === "en" || s === "fr") return s; } catch (e) {}
    return "fr";
  }

  const listeners = [];
  const S = {
    lang: readLang(),
    t(key, vars) {
      let s = (STR[S.lang] && STR[S.lang][key]) ?? STR.fr[key] ?? key;
      if (vars && typeof s === "string") for (const k in vars) s = s.replace("{" + k + "}", vars[k]);
      return s;
    },
    pick(o) { if (o == null) return ""; if (typeof o === "string") return o; return o[S.lang] || o.fr || ""; },
    onLang(fn) { listeners.push(fn); },
    setLang(l) {
      S.lang = l;
      try { localStorage.setItem("kaza-lang", l); } catch (e) {}
      document.documentElement.lang = l === "en" ? "en-CA" : "fr-CA";
      S.apply(document);
      listeners.forEach((fn) => fn(l));
    },
    flavourCount() { return K.options.saveurs.choices.filter((c) => c.fr !== "Nature").length; },
    itemName(it) { return S.lang === "en" && it.en ? it.en : it.name; },
    price(it) {
      if (it.price == null) return S.t("price.none");
      const n = Number(it.price);
      return S.lang === "en" ? "$" + n.toFixed(2) : n.toFixed(2).replace(".", ",") + " $";
    },
    catOf(it) { return K.categories.find((c) => c.id === it.cat); },
    item(id) { return K.items.find((i) => i.id === id); },

    /* Remplit tout élément [data-i18n] / [data-i18n-attr="attr:key"] */
    apply(root) {
      const n = S.flavourCount();
      root.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = S.t(el.dataset.i18n, { n }); });
      root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
        el.dataset.i18nAttr.split(";").forEach((pair) => {
          const [attr, key] = pair.split(":"); if (attr && key) el.setAttribute(attr.trim(), S.t(key.trim(), { n }));
        });
      });
      root.querySelectorAll("[data-flavour-count]").forEach((el) => { el.textContent = n; });
      root.querySelectorAll("[data-rating]").forEach((el) => { el.textContent = S.lang === "en" ? K.meta.ratingEN : K.meta.rating; });
      S.renderHours(); S.renderStatus(); S.renderFeatured(); S.renderFlavours(); S.renderSignatures();
    },

    /* ---------- Heure de Montréal ---------- */
    now() {
      const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Montreal", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
      const get = (t) => parts.find((p) => p.type === t)?.value;
      const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
      return { day: wd, h: Number(get("hour")) % 24, m: Number(get("minute")) };
    },
    fmtHour(h) {
      if (S.lang === "en") { const hh = h % 12 || 12; return hh + (h < 12 ? " am" : " pm"); }
      return h + " h";
    },
    status() {
      const H = K.meta.hours, n = S.now(), mins = n.h * 60 + n.m, today = H[n.day];
      if (today && mins >= today[0] * 60 && mins < today[1] * 60) return { open: true, text: S.t("status.open", { h: S.fmtHour(today[1]) }) };
      if (today && mins < today[0] * 60) return { open: false, text: S.t("status.closedLater", { h: S.fmtHour(today[0]) }) };
      for (let i = 1; i <= 7; i++) {
        const d = (n.day + i) % 7, hrs = H[d];
        if (hrs) {
          if (i === 1) return { open: false, text: S.t("status.closedTomorrow", { h: S.fmtHour(hrs[0]) }) };
          return { open: false, text: S.t("status.closedDay", { d: S.t("days")[d].toLowerCase(), h: S.fmtHour(hrs[0]) }) };
        }
      }
      return { open: false, text: S.t("closed") };
    },
    renderStatus() {
      const st = S.status();
      document.querySelectorAll("[data-status]").forEach((el) => {
        el.classList.toggle("is-open", st.open);
        el.classList.toggle("is-closed", !st.open);
        const label = el.querySelector("[data-status-text]") || el;
        label.textContent = st.text;
      });
    },
    renderHours() {
      const H = K.meta.hours, today = S.now().day, days = S.t("days");
      document.querySelectorAll("[data-hours]").forEach((tb) => {
        const order = [1, 2, 3, 4, 5, 6, 0];
        tb.innerHTML = order.map((d) => {
          const h = H[d];
          const val = h ? `${S.fmtHour(h[0])} – ${S.fmtHour(h[1])}` : S.t("closed");
          return `<tr${d === today ? ' class="is-today" aria-current="date"' : ""}><th scope="row">${days[d]}</th><td>${val}</td></tr>`;
        }).join("");
      });
    },

    /* ---------- Média : photo ou mascotte en attendant ---------- */
    media(it, cls = "") {
      const cat = S.catOf(it);
      const name = S.itemName(it);
      return `<div class="media ${cls}" data-mascot="${cat.mascot}">
        <div class="ph" aria-hidden="true">${M[cat.mascot]()}</div>
        <img src="${it.img}" alt="${name.replace(/"/g, "&quot;")}" loading="lazy" decoding="async" width="600" height="600">
      </div>`;
    },

    /* Aperçu « En vedette » de l'accueil */
    renderFeatured() {
      document.querySelectorAll("[data-featured]").forEach((wrap) => {
        const href = wrap.dataset.featured || "menu.html";
        wrap.innerHTML = K.featured.map((id) => {
          const it = S.item(id); if (!it) return "";
          return `<a class="card feat" href="${href}#${it.id}">
            ${S.media(it, "card-media")}
            <span class="feat-text"><span class="card-name">${S.itemName(it)}</span><span class="card-price">${S.price(it)}</span></span>
          </a>`;
        }).join("");
        S.watchImages(wrap);
      });
    },
    renderFlavours() {
      document.querySelectorAll("[data-flavours]").forEach((ul) => {
        ul.innerHTML = K.options.saveurs.choices.filter((c) => c.fr !== "Nature").map((c) => `<li>${S.pick(c)}</li>`).join("");
      });
    },
    renderSignatures() {
      document.querySelectorAll("[data-signatures]").forEach((ul) => {
        const href = ul.dataset.signatures || "menu.html";
        const ids = ["matcha-glace-fraise-vanille", "matcha-kaza-jamila", "matcha-glace-grenadine-vanille", "matcha-glace-mangue"];
        ul.innerHTML = ids.map((id) => { const it = S.item(id); return `<li><a href="${href}#${id}"><span>${S.itemName(it)}</span><span class="leader" aria-hidden="true"></span><span class="sig-price">${S.price(it)}</span></a></li>`; }).join("");
      });
    },

    /* Remplace la mascotte par la photo seulement si la photo existe */
    watchImages(root) {
      root.querySelectorAll(".media img").forEach((img) => {
        const done = () => { if (img.naturalWidth > 0) img.closest(".media").classList.add("has-img"); else img.remove(); };
        if (img.complete) done(); else { img.addEventListener("load", done, { once: true }); img.addEventListener("error", () => img.remove(), { once: true }); }
      });
    },

    /* Carte : chargée seulement au clic (rien de tiers au chargement → page plus rapide) */
    initMap() {
      document.querySelectorAll("[data-map]").forEach((box) => {
        const btn = box.querySelector("[data-map-load]");
        if (!btn) return;
        btn.addEventListener("click", () => {
          const f = document.createElement("iframe");
          f.src = K.meta.mapsEmbed; f.title = S.t("map.title"); f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
          box.classList.add("is-loaded"); box.appendChild(f);
          btn.remove();
        });
      });
    },

    /* Avis : un à la fois, défilement + flèches + compteur */
    initReviews() {
      const list = document.querySelector("[data-reviews]"); if (!list) return;
      const items = Array.from(list.children), count = document.querySelector("[data-rev-count]");
      const btns = document.querySelectorAll("[data-rev]");
      const idx = () => Math.round(list.scrollLeft / Math.max(1, list.clientWidth));
      const sync = () => {
        const i = Math.min(items.length - 1, Math.max(0, idx()));
        if (count) count.textContent = `${i + 1} / ${items.length}`;
        btns[0].disabled = i === 0; btns[1].disabled = i === items.length - 1;
      };
      btns.forEach((b) => b.addEventListener("click", () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        list.scrollTo({ left: (idx() + Number(b.dataset.rev)) * list.clientWidth, behavior: reduce ? "auto" : "smooth" });
      }));
      list.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
      window.addEventListener("resize", sync);
      sync();
    },

    initLangSwitch() {
      document.querySelectorAll("[data-lang-switch]").forEach((b) => {
        b.addEventListener("click", () => S.setLang(S.lang === "fr" ? "en" : "fr"));
      });
    },

    /* Les mascottes décoratives déclarées en HTML : <span data-mascot-el="cup" class="m-walk"></span> */
    paintMascots(root = document) {
      root.querySelectorAll("[data-mascot-el]").forEach((el) => { if (!el.firstChild) el.innerHTML = M[el.dataset.mascotEl](); });
    },

    init() {
      document.documentElement.lang = S.lang === "en" ? "en-CA" : "fr-CA";
      S.paintMascots();
      S.initLangSwitch();
      S.initMap();
      S.initReviews();
      S.apply(document);
      setInterval(S.renderStatus, 60000);
      document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
    }
  };

  window.KazaSite = S;
})();
