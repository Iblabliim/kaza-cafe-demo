/* ==========================================================================
   KAZA CAFÉ — DONNÉES DU MENU
   --------------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour changer le menu. Aucun code à toucher.

   Pour chaque item :
     id     identifiant unique (sert aussi au lien partageable : menu.html#id)
     cat    catégorie (voir la liste `categories` plus bas)
     name   nom en français          en     nom en anglais (facultatif)
     ing    ingrédients, en français (traduits via `ingredientsEN` plus bas)
     desc   courte description { fr, en } (facultatif)
     price  prix en dollars, ex. 6.5   → null affiche « — $ »
     img    chemin de la photo. Dépose la vraie photo à cet endroit, même nom.
            Tant qu'elle n'existe pas, le site affiche la mascotte de la catégorie.
     tags   "populaire" (apparaît dans En vedette), "vege", "noix", "halal"
     temp   "chaud" ou "glace" (filtres)
     caf    true / false — contient de la caféine (filtre « sans caféine »)
     opts   options affichées dans la fiche : "format", "saveurs",
            "saveursGlace", "saveursMatchaGlace", "extras"
     group  sous-titre à l'intérieur d'une catégorie (facultatif)

   HALAL : aucun item n'est marqué pour l'instant [À CONFIRMER avec Kaza].
   Ajoute "halal" dans `tags` des items concernés : le badge et le filtre
   apparaissent automatiquement.
   ========================================================================== */

window.KAZA = {
  meta: {
    name: "KAZA CAFÉ",
    address: "3306 boul. Rosemont",
    city: "Montréal, QC H1X 1K2",
    district: "Rosemont–La Petite-Patrie",
    phone: "(514) 291-0192",
    phoneHref: "+15142910192",
    instagram: "kazacafe.mtl",
    orderUrl: "#", // [LIEN À FOURNIR] — bouton « Commander »
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=KAZA+CAF%C3%89+3306+Boulevard+Rosemont+Montr%C3%A9al",
    mapsEmbed: "https://www.google.com/maps?q=3306+Boulevard+Rosemont+Montr%C3%A9al+QC+H1X+1K2&output=embed",
    reviewsUrl: "https://www.google.com/maps/search/?api=1&query=KAZA+CAF%C3%89+Rosemont+Montr%C3%A9al",
    rating: "4,9",
    ratingEN: "4.9",
    reviewCount: "200+",
    // 0 = dimanche … 6 = samedi. [heure d'ouverture, heure de fermeture] ou null = fermé
    hours: { 0: null, 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 18], 6: [10, 18] }
  },

  categories: [
    { id: "repas",          mascot: "sandwich", fr: "Repas Gourmets Kaza",    en: "Kaza Gourmet Meals" },
    { id: "mi-kaza",        mascot: "sandwich", fr: "Mi-Kaza",                en: "Mi-Kaza",
      note: { fr: "Pain ciabatta demi-format · Parfait pour une petite faim gourmande", en: "Half-size ciabatta · Just right for a small appetite" } },
    { id: "bols",           mascot: "sandwich", fr: "Bols",                   en: "Bowls" },
    { id: "cafes",          mascot: "cup",      fr: "Cafés",                  en: "Coffee",
      note: { fr: "Grain & rythme", en: "Grain & rhythm" } },
    { id: "matcha",         mascot: "cup",      fr: "Matcha & Hojicha",       en: "Matcha & Hojicha",
      note: { fr: "Matcha « Camellia »", en: "“Camellia” matcha" } },
    { id: "chai",           mascot: "cup",      fr: "Chaï",                   en: "Chai" },
    { id: "chocolat",       mascot: "cup",      fr: "Chocolat & London Fog",  en: "Chocolate & London Fog" },
    { id: "thes",           mascot: "cup",      fr: "Thés & Tisanes",         en: "Teas & Herbal" },
    { id: "cafes-glaces",   mascot: "glass",    fr: "Cafés glacés",           en: "Iced coffee" },
    { id: "lattes-glaces",  mascot: "glass",    fr: "Lattés glacés",          en: "Iced lattes",
      note: { fr: "Classiques & gourmands · 16 saveurs au choix", en: "Classic & indulgent · 16 flavours to choose from" } },
    { id: "matcha-glace",   mascot: "glass",    fr: "Matcha glacé",           en: "Iced matcha",
      note: { fr: "Matcha « Camellia »", en: "“Camellia” matcha" } },
    { id: "smoothies",      mascot: "glass",    fr: "Smoothies",              en: "Smoothies",
      note: { fr: "Vrais fruits + yaourt grec", en: "Real fruit + Greek yogurt" } },
    { id: "limonades",      mascot: "glass",    fr: "Limonades",              en: "Lemonades",
      note: { fr: "Limonades bio", en: "Organic lemonades" } },
    { id: "biscuits",       mascot: "cookie",   fr: "Biscuits",               en: "Cookies" },
    { id: "croissants",     mascot: "cookie",   fr: "Croissants",             en: "Croissants" },
    { id: "gaufres",        mascot: "cookie",   fr: "Gaufres",                en: "Waffles" },
    { id: "gateaux",        mascot: "cookie",   fr: "Gâteaux",                en: "Cakes" },
    { id: "muffins",        mascot: "cookie",   fr: "Muffins",                en: "Muffins" }
  ],

  // Ordre de la section « En vedette »
  featured: ["matcha-glace-fraise-vanille", "matcha-kaza-jamila", "kaza-jamila", "avokaza", "gateau-red-velvet", "croissant-dubai"],

  options: {
    format: {
      label: { fr: "Format", en: "Size" },
      type: "one",
      choices: [
        { fr: "Kaza", en: "Kaza" },
        { fr: "Mi-Kaza (demi-format)", en: "Mi-Kaza (half size)" }
      ]
    },
    saveurs: {
      label: { fr: "Saveur", en: "Flavour" },
      type: "one",
      choices: [
        { fr: "Nature", en: "Plain" },
        { fr: "Pistache", en: "Pistachio" }, { fr: "Coconut", en: "Coconut" }, { fr: "Vanille", en: "Vanilla" },
        { fr: "Coconut Vanille", en: "Coconut Vanilla" }, { fr: "Vanille Française", en: "French Vanilla" },
        { fr: "Sucre Brun Salé", en: "Salted Brown Sugar" }, { fr: "Biscoff Topping (+3 $)", en: "Biscoff Topping (+$3)" },
        { fr: "Earl Grey", en: "Earl Grey" }, { fr: "Caramel", en: "Caramel" }, { fr: "Lavande", en: "Lavender" },
        { fr: "Caramel Salé", en: "Salted Caramel" }, { fr: "Noisette Praline", en: "Hazelnut Praline" },
        { fr: "Amande Mocha", en: "Almond Mocha" }, { fr: "Miel Cannelle", en: "Honey Cinnamon" },
        { fr: "Banana Bread", en: "Banana Bread" }, { fr: "Érable Épicé", en: "Spiced Maple" },
        { fr: "Grenadine", en: "Grenadine" }, { fr: "Chaï", en: "Chai" }
      ]
    },
    saveursGlace: {
      label: { fr: "Saveur", en: "Flavour" },
      type: "one",
      choices: [
        { fr: "Vanille", en: "Vanilla" }, { fr: "Vanille Française", en: "French Vanilla" },
        { fr: "Coconut", en: "Coconut" }, { fr: "Coconut Vanille", en: "Coconut Vanilla" },
        { fr: "Pistache", en: "Pistachio" }, { fr: "Caramel", en: "Caramel" },
        { fr: "Caramel Salé", en: "Salted Caramel" }, { fr: "Sucre Brun Salé", en: "Salted Brown Sugar" },
        { fr: "Amande Mocha", en: "Almond Mocha" }, { fr: "Banana Bread", en: "Banana Bread" },
        { fr: "Noisette Praline", en: "Hazelnut Praline" }, { fr: "Miel Cannelle", en: "Honey Cinnamon" },
        { fr: "Érable Épicé", en: "Spiced Maple" }, { fr: "Earl Grey", en: "Earl Grey" },
        { fr: "Lavande", en: "Lavender" }, { fr: "Chaï", en: "Chai" }
      ]
    },
    saveursMatchaGlace: {
      label: { fr: "Saveur", en: "Flavour" },
      type: "one",
      choices: [
        { fr: "Nature", en: "Plain" }, { fr: "Vanille", en: "Vanilla" }, { fr: "Coconut Vanille", en: "Coconut Vanilla" },
        { fr: "Pistache", en: "Pistachio" }, { fr: "Caramel", en: "Caramel" }, { fr: "Banana Bread", en: "Banana Bread" },
        { fr: "Lavande", en: "Lavender" }, { fr: "Chaï", en: "Chai" }
      ]
    },
    extras: {
      label: { fr: "Extras", en: "Extras" },
      type: "many",
      choices: [
        { fr: "Lait végé", en: "Plant-based milk" },
        { fr: "Short espresso", en: "Espresso shot" },
        { fr: "Crème fouettée", en: "Whipped cream" }
      ]
    }
  },

  items: [
    /* ---------------- Repas Gourmets Kaza ---------------- */
    { id: "avokaza", cat: "repas", name: "Avokaza", price: null, img: "images/menu/avokaza.webp", tags: ["populaire"], opts: ["format"],
      ing: ["Pain ciabatta", "Poulet rôti", "Sauce avocat", "Tomate", "Roquette", "Fromage", "Sauce ail"] },
    { id: "kaza-pesto", cat: "repas", name: "Kaza Pesto", price: null, img: "images/menu/kaza-pesto.webp", tags: ["noix"], opts: ["format"],
      ing: ["Pain ciabatta", "Poulet rôti", "Sauce pesto", "Roquette", "Fromage", "Sauce mayo"] },
    { id: "chawarma-croustillant", cat: "repas", name: "Chawarma Croustillant", en: "Crispy Shawarma", price: null, img: "images/menu/chawarma-croustillant.webp", tags: [], opts: ["format"],
      ing: ["Pain ciabatta", "Steak de bœuf chawarma", "Humus", "Tomate", "Oignon", "Roquette", "Sauce ail"] },
    { id: "philly-kaza", cat: "repas", name: "Philly Kaza", price: null, img: "images/menu/philly-kaza.webp", tags: [], opts: ["format"],
      ing: ["Chawarma Croustillant", "Fromage"] },
    { id: "kaza-mix", cat: "repas", name: "Kaza Mix", price: null, img: "images/menu/kaza-mix.webp", tags: [], opts: ["format"],
      ing: ["Pain ciabatta", "Sauce mayo", "Mix smoked meat + mortadelle", "Tomate", "Oignon", "Roquette", "Fromage", "Sauce ail"] },
    { id: "kaza-smoke", cat: "repas", name: "Kaza Smoke", price: null, img: "images/menu/kaza-smoke.webp", tags: [], opts: ["format"],
      ing: ["Pain ciabatta", "Moutarde", "Smoked meat", "Cornichon", "Roquette"] },
    { id: "avopesto-vege", cat: "repas", name: "Avopesto Végé", en: "Veggie Avopesto", price: null, img: "images/menu/avopesto-vege.webp", tags: ["vege", "noix"], opts: ["format"],
      ing: ["Pain ciabatta", "Sauce pesto", "Avocat", "Tomate", "Oignon", "Poivron", "Concombre", "Roquette", "« Fromage »"] },

    /* ---------------- Mi-Kaza ---------------- */
    { id: "mi-avokaza", cat: "mi-kaza", name: "Mi-Avokaza", price: null, img: "images/menu/mi-avokaza.webp", tags: [],
      ing: ["Pain ciabatta", "Poulet rôti", "Sauce avocat", "Tomate", "Roquette", "Fromage", "Sauce ail"] },
    { id: "mi-kaza-pesto", cat: "mi-kaza", name: "Mi-Kaza Pesto", price: null, img: "images/menu/mi-kaza-pesto.webp", tags: ["noix"],
      ing: ["Pain ciabatta", "Poulet rôti", "Sauce pesto", "Roquette", "Fromage", "Sauce mayo"] },
    { id: "mi-chawarma-croustillant", cat: "mi-kaza", name: "Mi-Chawarma Croustillant", en: "Mi-Crispy Shawarma", price: null, img: "images/menu/mi-chawarma-croustillant.webp", tags: [],
      ing: ["Pain ciabatta", "Steak de bœuf chawarma", "Humus", "Tomate", "Oignon", "Roquette", "Sauce ail"] },
    { id: "mi-philly-kaza", cat: "mi-kaza", name: "Mi-Philly Kaza", price: null, img: "images/menu/mi-philly-kaza.webp", tags: [],
      ing: ["Chawarma Croustillant", "Fromage"] },
    { id: "mi-kaza-mix", cat: "mi-kaza", name: "Mi-Kaza Mix", price: null, img: "images/menu/mi-kaza-mix.webp", tags: [],
      ing: ["Pain ciabatta", "Sauce mayo", "Mix smoked meat + mortadelle", "Tomate", "Oignon", "Roquette", "Fromage", "Sauce ail"] },
    { id: "mi-kaza-smoke", cat: "mi-kaza", name: "Mi-Kaza Smoke", price: null, img: "images/menu/mi-kaza-smoke.webp", tags: [],
      ing: ["Pain ciabatta", "Moutarde", "Smoked meat", "Cornichon", "Roquette"] },
    { id: "mi-avopesto-vege", cat: "mi-kaza", name: "Mi-Avopesto Végé", en: "Mi-Veggie Avopesto", price: null, img: "images/menu/mi-avopesto-vege.webp", tags: ["vege", "noix"],
      ing: ["Pain ciabatta", "Sauce pesto", "Avocat", "Tomate", "Oignon", "Poivron", "Concombre", "Roquette", "« Fromage »"] },
    { id: "saumon-up", cat: "mi-kaza", name: "Saumon'Up", price: null, img: "images/menu/saumon-up.webp", tags: [],
      ing: ["Bagel", "Fromage à la crème", "Persil", "Roquette", "Poivre", "Saumon fumé « Sauvage »"] },
    { id: "bagel-fairmont", cat: "mi-kaza", name: "Bagel Fairmont", price: null, img: "images/menu/bagel-fairmont.webp", tags: [],
      ing: ["Bagel Fairmont", "Beurre", "Fromage à la crème"] },

    /* ---------------- Bols ---------------- */
    { id: "bol-mediterraneen", cat: "bols", name: "Bol Méditerranéen (poulet)", en: "Mediterranean Bowl (chicken)", price: null, img: "images/menu/bol-mediterraneen.webp", tags: [],
      ing: ["Bulgur", "Tomate", "Maïs", "Concombre", "Poivrons", "Cornichons", "Yaourt grec", "Sauce ail", "Sauce méditerranéenne"] },
    { id: "bol-orient", cat: "bols", name: "Bol Orient (bœuf)", en: "Orient Bowl (beef)", price: null, img: "images/menu/bol-orient.webp", tags: [],
      ing: ["Bulgur", "Tomate", "Maïs", "Concombre", "Poivrons", "Cornichons", "Yaourt grec", "Sauce ail", "Sauce méditerranéenne"] },

    /* ---------------- Cafés (chauds) ---------------- */
    { id: "espresso-simple", cat: "cafes", name: "Espresso Simple", en: "Single Espresso", price: null, img: "images/menu/espresso-simple.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Espresso"] },
    { id: "espresso-simple-allonge", cat: "cafes", name: "Espresso Simple Allongé", en: "Single Espresso Lungo", price: null, img: "images/menu/espresso-simple-allonge.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Espresso allongé"] },
    { id: "espresso-double", cat: "cafes", name: "Espresso Double", en: "Double Espresso", price: null, img: "images/menu/espresso-double.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Double espresso"] },
    { id: "canadiano", cat: "cafes", name: "Canadiano", price: null, img: "images/menu/canadiano.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Espresso", "Eau chaude"] },
    { id: "cortado", cat: "cafes", name: "Cortado", price: null, img: "images/menu/cortado.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Espresso", "Lait (au choix)"] },
    { id: "flat-white", cat: "cafes", name: "Flat White", price: null, img: "images/menu/flat-white.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Espresso", "Lait (au choix)"] },
    { id: "latte", cat: "cafes", name: "Latté", en: "Latte", price: null, img: "images/menu/latte.webp", tags: [], temp: "chaud", caf: true, opts: ["saveurs", "extras"],
      ing: ["Espresso", "Lait (au choix)", "Saveur (au choix)"] },
    { id: "cappuccino", cat: "cafes", name: "Cappuccino", price: null, img: "images/menu/cappuccino.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Espresso", "Lait (au choix)", "Mousse de lait"] },

    /* ---------------- Matcha & Hojicha (chauds) ---------------- */
    { id: "matcha-latte", cat: "matcha", name: "Matcha Latté « Camellia »", en: "“Camellia” Matcha Latte", price: null, img: "images/menu/matcha-latte.webp", tags: [], temp: "chaud", caf: true, opts: ["saveurs", "extras"],
      ing: ["Matcha Camellia", "Lait (au choix)", "Saveur (au choix)"] },
    { id: "hojicha-latte", cat: "matcha", name: "Hojicha Latté « Camellia »", en: "“Camellia” Hojicha Latte", price: null, img: "images/menu/hojicha-latte.webp", tags: [], temp: "chaud", caf: true, opts: ["saveurs", "extras"],
      ing: ["Hojicha (thé vert torréfié)", "Lait (au choix)", "Saveur (au choix)"] },

    /* ---------------- Chaï ---------------- */
    { id: "chai-latte", cat: "chai", name: "Chaï Latté « Camellia »", en: "“Camellia” Chai Latte", price: null, img: "images/menu/chai-latte.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Chaï épicé", "Lait (au choix)"] },
    { id: "dirty-chai-latte", cat: "chai", name: "Dirty Chaï Latté « Camellia »", en: "“Camellia” Dirty Chai Latte", price: null, img: "images/menu/dirty-chai-latte.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Chaï épicé", "Espresso", "Lait (au choix)"] },
    { id: "chai-latte-glace", cat: "chai", name: "Chaï Latté Glacé", en: "Iced Chai Latte", price: null, img: "images/menu/chai-latte-glace.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Chaï épicé", "Lait (au choix)", "Glace"] },
    { id: "dirty-chai-latte-glace", cat: "chai", name: "Dirty Chaï (Espresso) Latté Glacé", en: "Iced Dirty Chai (Espresso) Latte", price: null, img: "images/menu/dirty-chai-latte-glace.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Chaï épicé", "Espresso", "Lait (au choix)", "Glace"] },

    /* ---------------- Chocolat & London Fog ---------------- */
    { id: "chocolat-chaud", cat: "chocolat", name: "Chocolat Chaud « Belge » 72 % cacao", en: "“Belgian” Hot Chocolate, 72% cocoa", price: null, img: "images/menu/chocolat-chaud.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Chocolat belge 72 % cacao", "Lait (au choix)"] },
    { id: "mocha", cat: "chocolat", name: "Mocha « Chocolat Belge » 72 % cacao", en: "“Belgian Chocolate” Mocha, 72% cocoa", price: null, img: "images/menu/mocha.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Espresso", "Chocolat belge 72 % cacao", "Lait (au choix)"] },
    { id: "london-fog", cat: "chocolat", name: "London Fog « Camellia »", en: "“Camellia” London Fog", price: null, img: "images/menu/london-fog.webp", tags: [], temp: "chaud", caf: true, opts: ["extras"],
      ing: ["Thé Earl Grey", "Vanille", "Lait (au choix)"] },

    /* ---------------- Thés & Tisanes ---------------- */
    { id: "the-noir-chai", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé Noir « Chaï »", en: "“Chai” Black Tea", price: null, img: "images/menu/the-noir-chai.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Thé noir", "Épices chaï"] },
    { id: "the-noir-earl-grey", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé Noir « Earl Grey »", en: "“Earl Grey” Black Tea", price: null, img: "images/menu/the-noir-earl-grey.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Thé noir", "Bergamote"] },
    { id: "the-vert-sencha", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé Vert « Sencha Nagashima »", en: "“Sencha Nagashima” Green Tea", price: null, img: "images/menu/the-vert-sencha.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Thé vert sencha"] },
    { id: "the-vert-jasmin", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé Vert aux pétales de fleur de jasmin", en: "Green Tea with Jasmine Petals", price: null, img: "images/menu/the-vert-jasmin.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Thé vert", "Pétales de jasmin"] },
    { id: "the-vert-roses", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé Vert aux pétales de roses", en: "Green Tea with Rose Petals", price: null, img: "images/menu/the-vert-roses.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Thé vert", "Pétales de roses"] },
    { id: "the-marocain-menthe", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé marocain à la menthe", en: "Moroccan Mint Tea", price: null, img: "images/menu/the-marocain-menthe.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Thé vert", "Menthe"] },
    { id: "the-marocain-absinthe", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé marocain menthe & absinthe", en: "Moroccan Mint & Wormwood Tea", price: null, img: "images/menu/the-marocain-absinthe.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Thé vert", "Menthe", "Absinthe"] },
    { id: "the-marocain-elixir", cat: "thes", group: { fr: "Thés", en: "Teas" }, name: "Thé marocain Élixir (5 plantes)", en: "Moroccan Élixir Tea (5 herbs)", price: null, img: "images/menu/the-marocain-elixir.webp", tags: [], temp: "chaud", caf: true,
      ing: ["Mélange de 5 plantes"] },
    { id: "eclat-citron-gingembre", cat: "thes", group: { fr: "Tisanes — sans caféine", en: "Herbal — caffeine-free" }, name: "Éclat Citron Gingembre", en: "Lemon Ginger Burst", price: null, img: "images/menu/eclat-citron-gingembre.webp", tags: [], temp: "chaud", caf: false,
      ing: ["Citron", "Gingembre"] },
    { id: "sublime-camomille", cat: "thes", group: { fr: "Tisanes — sans caféine", en: "Herbal — caffeine-free" }, name: "Sublime Camomille", en: "Sublime Chamomile", price: null, img: "images/menu/sublime-camomille.webp", tags: [], temp: "chaud", caf: false,
      ing: ["Camomille"] },
    { id: "rooibos-zeste-eclair", cat: "thes", group: { fr: "Tisanes — sans caféine", en: "Herbal — caffeine-free" }, name: "Rooibos Zeste Éclair", en: "Rooibos Zest Burst", price: null, img: "images/menu/rooibos-zeste-eclair.webp", tags: [], temp: "chaud", caf: false,
      ing: ["Rooibos", "Pamplemousse", "Orange", "Cardamome", "Poivre", "Noix de coco"] },

    /* ---------------- Cafés glacés ---------------- */
    { id: "canadiano-glace", cat: "cafes-glaces", name: "Canadiano Glacé", en: "Iced Canadiano", price: null, img: "images/menu/canadiano-glace.webp", tags: [], temp: "glace", caf: true,
      ing: ["Espresso", "Eau", "Glace"] },
    { id: "mocha-latte-glace", cat: "cafes-glaces", name: "Mocha Latté Glacé", en: "Iced Mocha Latte", price: null, img: "images/menu/mocha-latte-glace.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Espresso", "Chocolat belge 72 % cacao", "Lait (au choix)", "Glace"] },
    { id: "cappuccino-latte-glace", cat: "cafes-glaces", name: "Cappuccino Latté Glacé", en: "Iced Cappuccino Latte", price: null, img: "images/menu/cappuccino-latte-glace.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Double shot espresso", "Lait (au choix)", "Glace"] },

    /* ---------------- Lattés glacés ---------------- */
    { id: "latte-glace", cat: "lattes-glaces", name: "Latté Glacé", en: "Iced Latte", price: null, img: "images/menu/latte-glace.webp", tags: [], temp: "glace", caf: true, opts: ["saveursGlace", "extras"],
      ing: ["Espresso", "Lait (au choix)", "Saveur (au choix)", "Glace"] },
    { id: "latte-glace-pistache-topping", cat: "lattes-glaces", name: "Latté Glacé Pistache Topping", en: "Iced Latte, Pistachio Topping", price: null, img: "images/menu/latte-glace-pistache-topping.webp", tags: ["noix"], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Espresso", "Lait (au choix)", "Topping pistache", "Glace"] },
    { id: "latte-glace-biscoff-topping", cat: "lattes-glaces", name: "Latté Glacé Biscoff Topping", en: "Iced Latte, Biscoff Topping", price: null, img: "images/menu/latte-glace-biscoff-topping.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Espresso", "Lait (au choix)", "Topping Biscoff", "Glace"] },

    /* ---------------- Matcha glacé ---------------- */
    { id: "matcha-glace-fraise-vanille", cat: "matcha-glace", group: { fr: "Fruités & signatures", en: "Fruity & signatures" }, name: "Matcha Latté Glacé Fraise Vanille", en: "Iced Strawberry Vanilla Matcha Latte", signature: true,
      price: null, img: "images/menu/matcha-glace-fraise-vanille.webp", tags: ["populaire"], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Matcha Camellia", "Lait (au choix)", "Fraise", "Vanille", "Glace"] },
    { id: "matcha-glace-grenadine-vanille", cat: "matcha-glace", group: { fr: "Fruités & signatures", en: "Fruity & signatures" }, name: "Matcha Latté Glacé Grenadine Vanille", en: "Iced Grenadine Vanilla Matcha Latte",
      price: null, img: "images/menu/matcha-glace-grenadine-vanille.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Matcha Camellia", "Lait (au choix)", "Grenadine", "Vanille", "Glace"] },
    { id: "matcha-glace-mangue", cat: "matcha-glace", group: { fr: "Fruités & signatures", en: "Fruity & signatures" }, name: "Matcha Latté Glacé Mangue", en: "Iced Mango Matcha Latte",
      price: null, img: "images/menu/matcha-glace-mangue.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Matcha Camellia", "Lait (au choix)", "Mangue", "Glace"] },
    { id: "matcha-kaza-jamila", cat: "matcha-glace", group: { fr: "Fruités & signatures", en: "Fruity & signatures" }, name: "Matcha Kaza Jamila", signature: true,
      price: null, img: "images/menu/matcha-kaza-jamila.webp", tags: ["populaire"], temp: "glace", caf: true, opts: ["extras"],
      desc: { fr: "La signature de la maison en version matcha, inspirée du Raïbi Jamila.", en: "The house signature in a matcha version, inspired by Raïbi Jamila." },
      ing: ["Matcha Camellia", "Glace"] },
    { id: "matcha-latte-glace", cat: "matcha-glace", group: { fr: "Classiques & gourmands", en: "Classic & indulgent" }, name: "Matcha Latté Glacé", en: "Iced Matcha Latte",
      price: null, img: "images/menu/matcha-latte-glace.webp", tags: [], temp: "glace", caf: true, opts: ["saveursMatchaGlace", "extras"],
      ing: ["Matcha Camellia", "Lait (au choix)", "Saveur (au choix)", "Glace"] },
    { id: "matcha-glace-biscoff-topping", cat: "matcha-glace", group: { fr: "Classiques & gourmands", en: "Classic & indulgent" }, name: "Matcha Latté Glacé Biscoff Topping (+3 $)", en: "Iced Matcha Latte, Biscoff Topping (+$3)",
      price: null, img: "images/menu/matcha-glace-biscoff-topping.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Matcha Camellia", "Lait (au choix)", "Topping Biscoff", "Glace"] },
    { id: "hojicha-latte-glace", cat: "matcha-glace", group: { fr: "Hojicha", en: "Hojicha" }, name: "Hojicha Latté Glacé « Camellia »", en: "“Camellia” Iced Hojicha Latte",
      price: null, img: "images/menu/hojicha-latte-glace.webp", tags: [], temp: "glace", caf: true, opts: ["extras"],
      ing: ["Hojicha (thé vert torréfié)", "Lait (au choix)", "Glace"] },

    /* ---------------- Smoothies ---------------- */
    { id: "kaza-jamila", cat: "smoothies", group: { fr: "Signature", en: "Signature" }, name: "Kaza Jamila", signature: true, price: null, img: "images/menu/kaza-jamila.webp", tags: ["populaire"], temp: "glace", caf: false,
      desc: { fr: "Inspirée du Raïbi Jamila.", en: "Inspired by Raïbi Jamila." },
      ing: ["Yaourt grec", "Grenadine", "Vanille"] },
    { id: "smoothie-jaune-tropical", cat: "smoothies", group: { fr: "Vrais fruits + yaourt grec", en: "Real fruit + Greek yogurt" }, name: "Jaune Tropical", en: "Tropical Yellow", price: null, img: "images/menu/smoothie-jaune-tropical.webp", tags: [], temp: "glace", caf: false,
      ing: ["Mangue", "Ananas", "Yaourt grec"] },
    { id: "smoothie-rouge", cat: "smoothies", group: { fr: "Vrais fruits + yaourt grec", en: "Real fruit + Greek yogurt" }, name: "Rouge", en: "Red", price: null, img: "images/menu/smoothie-rouge.webp", tags: [], temp: "glace", caf: false,
      ing: ["Fraise", "Mangue", "Yaourt grec"] },
    { id: "smoothie-vert-boost", cat: "smoothies", group: { fr: "Vrais fruits + yaourt grec", en: "Real fruit + Greek yogurt" }, name: "Vert Boost", en: "Green Boost", price: null, img: "images/menu/smoothie-vert-boost.webp", tags: [], temp: "glace", caf: false,
      ing: ["Épinards", "Mangue", "Yaourt grec"] },
    { id: "smoothie-jaune-monkey", cat: "smoothies", group: { fr: "Vrais fruits + yaourt grec", en: "Real fruit + Greek yogurt" }, name: "Jaune Monkey", en: "Yellow Monkey", price: null, img: "images/menu/smoothie-jaune-monkey.webp", tags: [], temp: "glace", caf: false,
      ing: ["Banane", "Mangue", "Yaourt grec"] },
    { id: "smoothie-orange-sunset", cat: "smoothies", group: { fr: "Vrais fruits + yaourt grec", en: "Real fruit + Greek yogurt" }, name: "Orange Sunset", price: null, img: "images/menu/smoothie-orange-sunset.webp", tags: [], temp: "glace", caf: false,
      ing: ["Mangue", "Fraise", "Banane", "Yaourt grec"] },

    /* ---------------- Limonades ---------------- */
    { id: "limonade-kaza", cat: "limonades", name: "Limonade Bio Kaza", en: "Kaza Organic Lemonade", price: null, img: "images/menu/limonade-kaza.webp", tags: [], temp: "glace", caf: false,
      ing: ["Limonade bio"] },
    { id: "limonade-matcha", cat: "limonades", name: "Limonade Bio Matcha « Camellia »", en: "“Camellia” Matcha Organic Lemonade", price: null, img: "images/menu/limonade-matcha.webp", tags: [], temp: "glace", caf: true,
      ing: ["Limonade bio", "Matcha Camellia"] },
    { id: "limonade-lavande", cat: "limonades", name: "Limonade Bio Lavande", en: "Lavender Organic Lemonade", price: null, img: "images/menu/limonade-lavande.webp", tags: [], temp: "glace", caf: false,
      ing: ["Limonade bio", "Lavande"] },
    { id: "mojito-limonade", cat: "limonades", name: "Mojito Limonade", en: "Mojito Lemonade", price: null, img: "images/menu/mojito-limonade.webp", tags: [], temp: "glace", caf: false,
      ing: ["Menthe", "Lime", "Soda", "Baies de goji"] },

    /* ---------------- Biscuits ---------------- */
    { id: "biscuit-pepites", cat: "biscuits", name: "Pépites de chocolat", en: "Chocolate Chip", price: null, img: "images/menu/biscuit-pepites.webp", tags: [] },
    { id: "biscuit-tout-chocolat", cat: "biscuits", name: "Tout chocolat", en: "Double Chocolate", price: null, img: "images/menu/biscuit-tout-chocolat.webp", tags: [] },
    { id: "biscuit-chocolat-blanc", cat: "biscuits", name: "Chocolat blanc", en: "White Chocolate", price: null, img: "images/menu/biscuit-chocolat-blanc.webp", tags: [] },
    { id: "biscuit-red-velvet", cat: "biscuits", name: "Red Velvet", price: null, img: "images/menu/biscuit-red-velvet.webp", tags: [] },
    { id: "biscuit-ricotta-citron", cat: "biscuits", name: "Ricotta citron", en: "Lemon Ricotta", price: null, img: "images/menu/biscuit-ricotta-citron.webp", tags: [] },
    { id: "biscuit-cheesecake", cat: "biscuits", name: "Cheesecake", price: null, img: "images/menu/biscuit-cheesecake.webp", tags: [] },
    { id: "biscotti", cat: "biscuits", name: "Biscotti", price: null, img: "images/menu/biscotti.webp", tags: [] },

    /* ---------------- Croissants ---------------- */
    { id: "croissant-beurre", cat: "croissants", name: "Croissant au beurre", en: "Butter Croissant", price: null, img: "images/menu/croissant-beurre.webp", tags: [] },
    { id: "croissant-dubai", cat: "croissants", name: "Croissant Dubaï", en: "Dubai Croissant", price: null, img: "images/menu/croissant-dubai.webp", tags: ["populaire", "noix"] },
    { id: "chocolatine", cat: "croissants", name: "Chocolatine", en: "Chocolate Croissant", price: null, img: "images/menu/chocolatine.webp", tags: [] },
    { id: "chausson-pommes", cat: "croissants", name: "Chausson aux pommes", en: "Apple Turnover", price: null, img: "images/menu/chausson-pommes.webp", tags: [] },

    /* ---------------- Gaufres ---------------- */
    { id: "gaufre-nature", cat: "gaufres", name: "Gaufre nature chaude", en: "Warm Plain Waffle", price: null, img: "images/menu/gaufre-nature.webp", tags: [] },
    { id: "gaufre-chocolat-arachides", cat: "gaufres", name: "Gaufre chocolat & arachides", en: "Chocolate & Peanut Waffle", price: null, img: "images/menu/gaufre-chocolat-arachides.webp", tags: ["noix"] },
    { id: "gaufre-dubai", cat: "gaufres", name: "Gaufre Dubaï chocolat pistache", en: "Dubai Chocolate Pistachio Waffle", price: null, img: "images/menu/gaufre-dubai.webp", tags: ["noix"] },
    { id: "gaufre-chocolat-biscoff", cat: "gaufres", name: "Gaufre chocolat Biscoff", en: "Chocolate Biscoff Waffle", price: null, img: "images/menu/gaufre-chocolat-biscoff.webp", tags: [] },

    /* ---------------- Gâteaux ---------------- */
    { id: "gateau-pistache", cat: "gateaux", name: "Gâteau Pistache", en: "Pistachio Cake", price: null, img: "images/menu/gateau-pistache.webp", tags: ["noix"] },
    { id: "gateau-red-velvet", cat: "gateaux", name: "Gâteau Red Velvet Crème", en: "Red Velvet Cream Cake", price: null, img: "images/menu/gateau-red-velvet.webp", tags: ["populaire"] },
    { id: "gateau-chocolat-caramel-fudge", cat: "gateaux", name: "Gâteau Chocolat Caramel Fudge", en: "Chocolate Caramel Fudge Cake", price: null, img: "images/menu/gateau-chocolat-caramel-fudge.webp", tags: [] },
    { id: "gateau-cannelle-noix", cat: "gateaux", name: "Gâteau Cannelle Noix de Grenoble", en: "Cinnamon Walnut Cake", price: null, img: "images/menu/gateau-cannelle-noix.webp", tags: ["noix"] },
    { id: "gateau-biscoff", cat: "gateaux", name: "Gâteau Biscoff", en: "Biscoff Cake", price: null, img: "images/menu/gateau-biscoff.webp", tags: [] },
    { id: "gateau-espresso-amaretto", cat: "gateaux", name: "Gâteau Espresso Amaretto", en: "Espresso Amaretto Cake", price: null, img: "images/menu/gateau-espresso-amaretto.webp", tags: ["noix"] },
    { id: "gateau-espresso-chocolat", cat: "gateaux", name: "Gâteau Espresso Chocolat", en: "Espresso Chocolate Cake", price: null, img: "images/menu/gateau-espresso-chocolat.webp", tags: [] },
    { id: "gateau-carotte", cat: "gateaux", name: "Gâteau Carotte", en: "Carrot Cake", price: null, img: "images/menu/gateau-carotte.webp", tags: [] },

    /* ---------------- Muffins ---------------- */
    { id: "muffin-tout-chocolat", cat: "muffins", name: "Muffin Moelleux Tout Chocolat", en: "Soft Double Chocolate Muffin", price: null, img: "images/menu/muffin-tout-chocolat.webp", tags: [] },
    { id: "muffin-banane-pacane", cat: "muffins", name: "Muffin Banane Pacane", en: "Banana Pecan Muffin", price: null, img: "images/menu/muffin-banane-pacane.webp", tags: ["noix"] }
  ],

  // Traductions anglaises des ingrédients (si absent, le texte français est affiché)
  ingredientsEN: {
    "Pain ciabatta": "Ciabatta", "Poulet rôti": "Roast chicken", "Sauce avocat": "Avocado sauce", "Tomate": "Tomato",
    "Roquette": "Arugula", "Fromage": "Cheese", "Sauce ail": "Garlic sauce", "Sauce pesto": "Pesto sauce", "Sauce mayo": "Mayo",
    "Steak de bœuf chawarma": "Beef shawarma steak", "Humus": "Hummus", "Oignon": "Onion", "Chawarma Croustillant": "Crispy Shawarma",
    "Mix smoked meat + mortadelle": "Smoked meat + mortadella mix", "Moutarde": "Mustard", "Cornichon": "Pickle", "Cornichons": "Pickles",
    "Avocat": "Avocado", "Poivron": "Bell pepper", "Poivrons": "Bell peppers", "Concombre": "Cucumber", "« Fromage »": "“Cheese”",
    "Bagel": "Bagel", "Fromage à la crème": "Cream cheese", "Persil": "Parsley", "Poivre": "Pepper", "Saumon fumé « Sauvage »": "“Wild” smoked salmon",
    "Bagel Fairmont": "Fairmount bagel", "Beurre": "Butter", "Bulgur": "Bulgur", "Maïs": "Corn", "Yaourt grec": "Greek yogurt",
    "Sauce méditerranéenne": "Mediterranean sauce", "Espresso": "Espresso", "Espresso allongé": "Long espresso", "Double espresso": "Double espresso",
    "Eau chaude": "Hot water", "Eau": "Water", "Lait (au choix)": "Milk (your choice)", "Saveur (au choix)": "Flavour (your choice)",
    "Mousse de lait": "Milk foam", "Matcha Camellia": "Camellia matcha", "Hojicha (thé vert torréfié)": "Hojicha (roasted green tea)",
    "Chaï épicé": "Spiced chai", "Glace": "Ice", "Chocolat belge 72 % cacao": "Belgian chocolate, 72% cocoa", "Thé Earl Grey": "Earl Grey tea",
    "Vanille": "Vanilla", "Thé noir": "Black tea", "Épices chaï": "Chai spices", "Bergamote": "Bergamot", "Thé vert sencha": "Sencha green tea",
    "Thé vert": "Green tea", "Pétales de jasmin": "Jasmine petals", "Pétales de roses": "Rose petals", "Menthe": "Mint", "Absinthe": "Wormwood",
    "Mélange de 5 plantes": "Blend of 5 herbs", "Citron": "Lemon", "Gingembre": "Ginger", "Camomille": "Chamomile", "Rooibos": "Rooibos",
    "Pamplemousse": "Grapefruit", "Orange": "Orange", "Cardamome": "Cardamom", "Noix de coco": "Coconut", "Double shot espresso": "Double espresso shot",
    "Topping pistache": "Pistachio topping", "Topping Biscoff": "Biscoff topping", "Fraise": "Strawberry", "Grenadine": "Grenadine",
    "Mangue": "Mango", "Ananas": "Pineapple", "Épinards": "Spinach", "Banane": "Banana", "Limonade bio": "Organic lemonade",
    "Lavande": "Lavender", "Lime": "Lime", "Soda": "Soda", "Baies de goji": "Goji berries"
  }
};
