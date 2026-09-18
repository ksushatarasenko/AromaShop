import { make, bi, editorial, factOrig, E } from './master-new-perfumes.mjs';

/** Remaining niche Master Assortment items */
export const newNichePerfumesPart2 = [
  make({
    id: 'xerjoff-naxos-edp-100',
    brandId: 'xerjoff',
    name: 'Naxos',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2015,
    country: 'Italy',
    moods: ['warm-vanilla', 'tobacco', 'sweet', 'spicy', 'luxury'],
    featured: true,
    bestseller: true,
    description: bi(
      'Xerjoff Naxos — miodowo-tytoniowy niszowy zapach z lawendą i wanilią. Oryginał w AromaShop.',
      'Xerjoff Naxos — медово-тютюновий нішевий аромат із лавандою та ваніллю. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Sycylijski luksus: miód, tytoń, lawenda i ciepła wanilia.',
      'Сицилійська розкіш: мед, тютюн, лаванда й тепла ваніль.'
    ),
    story: editorial(
      'Naxos',
      'Xerjoff',
      'od <strong>cytrusów i lawendy</strong>, a następnie przechodzi w miód, tytoń i wanilię — bogato, dojrzale i bardzo charakterystycznie.',
      'з <strong>цитрусів і лаванди</strong>, а далі — мед, тютюн і ваніль — богато, зріло й дуже характерно.',
      'Jeden z najbardziej lubianych współczesnych Xerjoffów.',
      'Один із найбільш улюблених сучасних Xerjoff.'
    ),
    facts: [
      bi('🍯 <strong>Naxos.</strong> Kompozycja z linii 1861 Xerjoff.', '🍯 <strong>Naxos.</strong> Композиція з лінії 1861 Xerjoff.'),
      factOrig('Naxos'),
    ],
    fragrance: {
      families: ['oriental', 'aromatic', 'gourmand'],
      accords: ['vanilla', 'tobacco', 'sweet', 'aromatic', 'warm-spicy'],
      notes: {
        top: ['bergamot', 'lemon', 'lavender'],
        heart: ['honey', 'cinnamon', 'cashmeran'],
        base: ['tobacco', 'vanilla', 'tonka-bean', 'musk'],
      },
    },
    character: { sweetness: 4, freshness: 2, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'evening', 'special'],
    },
    similar: [E.tobaccoVanille, E.grandSoir, 'kilian-angels-share-edp-050'],
    tags: ['honey', 'tobacco', 'vanilla', 'core'],
  }),

  make({
    id: 'bdk-gris-charnel-edp-100',
    brandId: 'bdk',
    name: 'Gris Charnel',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2019,
    country: 'France',
    moods: ['woody', 'spicy', 'luxury', 'evening'],
    featured: true,
    description: bi(
      'BDK Gris Charnel — figowo-drzewny paryski zapach z kardamonem i sandałowcem. Oryginał w AromaShop.',
      'BDK Gris Charnel — інжирно-деревний паризький аромат із кардамоном і сандалом. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Figa, kardamon i kremowy sandałowiec — zmysłowy paryski klimat.',
      'Інжир, кардамон і кремовий сандал — чуттєвий паризький клімат.'
    ),
    story: editorial(
      'Gris Charnel',
      'BDK',
      'od <strong>kardamonu i figi</strong>, a baza opiera się na sandałowcu, tonce i irisie — kremowo i nowocześnie.',
      'з <strong>кардамону та інжиру</strong>, а база тримається на сандалі, тонці й ірисі — кремово й сучасно.',
      'Współczesny paryski woody-spicy.',
      'Сучасний паризький woody-spicy.'
    ),
    facts: [
      bi('🩶 <strong>Gris Charnel.</strong> Jedna z najbardziej rozpoznawalnych kompozycji BDK.', '🩶 <strong>Gris Charnel.</strong> Одна з найбільш упізнаваних композицій BDK.'),
      factOrig('Gris Charnel'),
    ],
    fragrance: {
      families: ['woody', 'spicy', 'oriental'],
      accords: ['woody', 'warm-spicy', 'powdery', 'fruity'],
      notes: {
        top: ['cardamom', 'fig', 'black-tea'],
        heart: ['iris', 'bourbon-vetiver'],
        base: ['sandalwood', 'tonka-bean', 'vanilla'],
      },
    },
    character: { sweetness: 3, freshness: 2, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'office', 'evening'],
    },
    similar: [E.santal, E.philosykos, 'marc-antoine-barrois-ganymede-edp-100'],
    tags: ['fig', 'sandalwood', 'paris', 'discovery'],
  }),

  make({
    id: 'kilian-angels-share-edp-050',
    brandId: 'kilian',
    name: "Angels' Share",
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2020,
    country: 'France',
    ml: 50,
    moods: ['gourmand', 'warm-vanilla', 'spicy', 'evening', 'luxury'],
    featured: true,
    bestseller: true,
    description: bi(
      "Kilian Angels' Share — koniakowo-pralinowy niszowy zapach z cynamonem i wanilią. Oryginał w AromaShop.",
      "Kilian Angels' Share — коньячно-праліновий нішевий аромат із корицею та ваніллю. Оригінал в AromaShop."
    ),
    shortDescription: bi(
      'Boozy luksus: koniak, pralina, cynamon i dębowe ciepło.',
      'Boozy розкіш: коньяк, праліне, кориця й дубове тепло.'
    ),
    story: editorial(
      "Angels' Share",
      'Kilian',
      'od <strong>koniaku i cynamonu</strong>, a następnie przechodzi w pralinę, tonkę i wanilię — deserowo, dojrzale i wieczorowo.',
      'з <strong>коньяку та кориці</strong>, а далі — праліне, тонка й ваніль — десертно, зріло й вечірньо.',
      'Gourmand w wersji dorosłej i luksusowej.',
      'Gourmand у дорослій і люксовій версії.'
    ),
    facts: [
      bi('🥃 <strong>Angels’ Share.</strong> Nazwa nawiązuje do części alkoholu ulatniającej się z beczek.', '🥃 <strong>Angels’ Share.</strong> Назва відсилає до частки алкоголю, що випаровується з діжок.'),
      factOrig("Angels' Share"),
    ],
    fragrance: {
      families: ['gourmand', 'oriental', 'spicy'],
      accords: ['boozy', 'vanilla', 'sweet', 'warm-spicy', 'woody'],
      notes: {
        top: ['cognac', 'cinnamon'],
        heart: ['tonka-bean', 'oak'],
        base: ['praline', 'vanilla', 'sandalwood'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['date', 'evening', 'special'],
    },
    similar: [E.tobaccoVanille, E.grandSoir, 'xerjoff-naxos-edp-100'],
    tags: ['boozy', 'gourmand', 'winter', 'core'],
  }),

  make({
    id: 'juliette-has-a-gun-not-a-perfume-edp-100',
    brandId: 'juliette-has-a-gun',
    name: 'Not A Perfume',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2010,
    country: 'France',
    moods: ['skin', 'clean', 'musk', 'fresh'],
    featured: true,
    description: bi(
      'Juliette Has A Gun Not A Perfume — minimalistyczna kompozycja oparta na Cetalox. Oryginał w AromaShop.',
      'Juliette Has A Gun Not A Perfume — мінімалістична композиція на основі Cetalox. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Jedna molekuła, wiele skór: czysty, osobisty, niemal niewidzialny.',
      'Одна молекула, багато шкір: чистий, особистий, майже невидимий.'
    ),
    story: editorial(
      'Not A Perfume',
      'Juliette Has A Gun',
      'od czystego <strong>Cetalox</strong> — molekularnie, skórnie i bez klasycznej piramidy. Zapach adapts się do skóry.',
      'з чистого <strong>Cetalox</strong> — молекулярно, шкірно й без класичної піраміди. Аромат адаптується до шкіри.',
      'Anty-perfumy w najlepszym tego słowa znaczeniu.',
      'Анти-парфуми в найкращому сенсі слова.'
    ),
    facts: [
      bi('🧪 <strong>Cetalox.</strong> Kompozycja zbudowana wokół jednej molekuły zapachowej.', '🧪 <strong>Cetalox.</strong> Композиція побудована навколо однієї парфумерної молекули.'),
      factOrig('Not A Perfume'),
    ],
    fragrance: {
      families: ['woody', 'fresh'],
      accords: ['molecular', 'musky', 'woody', 'mineral'],
      notes: {
        top: ['cetalox'],
        heart: ['cetalox'],
        base: ['cetalox'],
      },
    },
    character: { sweetness: 1, freshness: 3, warmth: 2, intensity: 2 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual'],
    },
    similar: ['escentric-molecules-molecule-01-edt-100', 'glossier-you-edp-050', 'le-labo-another-13-edp-100'],
    tags: ['molecular', 'skin', 'discovery', 'minimal'],
  }),

  make({
    id: 'escentric-molecules-molecule-01-edt-100',
    brandId: 'escentric-molecules',
    name: 'Molecule 01',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDT',
    year: 2006,
    country: 'Germany',
    moods: ['skin', 'woody', 'clean', 'fresh'],
    featured: true,
    description: bi(
      'Escentric Molecules Molecule 01 — Iso E Super w czystej postaci. Oryginał w AromaShop.',
      'Escentric Molecules Molecule 01 — Iso E Super у чистому вигляді. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Czysty Iso E Super: drzewny, radiacyjny, ultra-osobisty.',
      'Чистий Iso E Super: деревний, радіаційний, ультра-особистий.'
    ),
    story: editorial(
      'Molecule 01',
      'Escentric Molecules',
      'od samego <strong>Iso E Super</strong> — bez ozdobników. Na niektórych skórach niemal znika, na innych staje się magnetyczny.',
      'з самого <strong>Iso E Super</strong> — без прикрас. На деяких шкірах майже зникає, на інших стає магнетичним.',
      'Ikona molekularnej perfumerii.',
      'Ікона молекулярної парфумерії.'
    ),
    facts: [
      bi('🔬 <strong>Iso E Super.</strong> Molecule 01 to solowy portret tej molekuły.', '🔬 <strong>Iso E Super.</strong> Molecule 01 — сольний портрет цієї молекули.'),
      factOrig('Molecule 01'),
    ],
    fragrance: {
      families: ['woody'],
      accords: ['molecular', 'woody', 'mineral'],
      notes: {
        top: ['iso-e-super'],
        heart: ['iso-e-super'],
        base: ['iso-e-super'],
      },
    },
    character: { sweetness: 1, freshness: 3, warmth: 2, intensity: 2 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual'],
    },
    similar: ['juliette-has-a-gun-not-a-perfume-edp-100', 'le-labo-another-13-edp-100', 'glossier-you-edp-050'],
    tags: ['molecular', 'iso-e', 'discovery'],
  }),

  make({
    id: 'mancera-cedrat-boise-edp-120',
    brandId: 'mancera',
    name: 'Cedrat Boise',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2011,
    country: 'France',
    ml: 120,
    moods: ['citrus', 'woody', 'fresh'],
    featured: true,
    bestseller: true,
    description: bi(
      'Mancera Cedrat Boise — cytrusowo-drzewny niszowy zapach z czarną porzeczką i skórą. Oryginał w AromaShop.',
      'Mancera Cedrat Boise — цитрусово-деревний нішевий аромат із чорною смородиною та шкірою. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Energetyczne cytrusy i suche drewno — Mancera w wersji uniwersalnej.',
      'Енергійні цитруси й сухе дерево — Mancera в універсальній версії.'
    ),
    story: editorial(
      'Cedrat Boise',
      'Mancera',
      'od <strong>cytrusów i czarnej porzeczki</strong>, a baza łączy drewno, piżmo i lekki akord skóry.',
      'з <strong>цитрусів і чорної смородини</strong>, а база поєднує дерево, мускус і легкий шкіряний акорд.',
      'Świeży niche o mocnej projekcji.',
      'Свіжий niche із сильною проекцією.'
    ),
    facts: [
      bi('🍋 <strong>Cedrat Boise.</strong> Jeden z najczęściej wybieranych zapachów Mancera.', '🍋 <strong>Cedrat Boise.</strong> Один із найчастіше обраних ароматів Mancera.'),
      factOrig('Cedrat Boise'),
    ],
    fragrance: {
      families: ['citrus', 'woody', 'fruity'],
      accords: ['citrus', 'woody', 'fruity', 'leather', 'musky'],
      notes: {
        top: ['citron', 'bergamot', 'blackcurrant'],
        heart: ['maize', 'aquatic-notes'],
        base: ['cedar', 'vetiver', 'leather', 'vanilla', 'white-musk'],
      },
    },
    character: { sweetness: 2, freshness: 4, warmth: 2, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'casual', 'office'],
    },
    similar: [E.aventus, 'mancera-intense-cedrat-boise-edp-120', 'montblanc-explorer-edp-100'],
    tags: ['citrus', 'woody', 'mancera', 'core'],
  }),

  make({
    id: 'mancera-instant-crush-edp-120',
    brandId: 'mancera',
    name: 'Instant Crush',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2019,
    country: 'France',
    ml: 120,
    moods: ['warm-vanilla', 'amber', 'sweet', 'floral'],
    featured: true,
    description: bi(
      'Mancera Instant Crush — szafranowo-waniliowy niszowy zapach inspirowany współczesnym luksusem. Oryginał w AromaShop.',
      'Mancera Instant Crush — шафраново-ванільний нішевий аромат, натхненний сучасною розкішшю. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Szafran, róże i wanilia — ciepły, „crushowy” profil.',
      'Шафран, троянди й ваніль — теплий crush-профіль.'
    ),
    story: editorial(
      'Instant Crush',
      'Mancera',
      'od <strong>szafranu i róż</strong>, a baza opiera się na wanilii, ambroksanie i drzewach — słodko i nowocześnie.',
      'з <strong>шафрану та троянд</strong>, а база тримається на ванілі, амброксані й деревах — солодко й сучасно.',
      'Ciepły signature Mancera o szerokim odbiorze.',
      'Теплий signature Mancera з широким сприйняттям.'
    ),
    facts: [
      bi('💛 <strong>Instant Crush.</strong> Popularny warmowy profil w ofercie Mancera.', '💛 <strong>Instant Crush.</strong> Популярний теплий профіль у лінійці Mancera.'),
      factOrig('Instant Crush'),
    ],
    fragrance: {
      families: ['oriental', 'floral'],
      accords: ['vanilla', 'saffron', 'rose', 'amber', 'woody'],
      notes: {
        top: ['saffron', 'bergamot', 'pink-pepper'],
        heart: ['rose', 'hedione', 'lavender'],
        base: ['vanilla', 'ambroxan', 'sandalwood', 'woody-notes'],
      },
    },
    character: { sweetness: 4, freshness: 2, warmth: 4, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'evening'],
    },
    similar: [E.baccarat, E.vanilla28, 'mancera-roses-vanille-edp-120'],
    tags: ['saffron', 'vanilla', 'mancera'],
  }),

  make({
    id: 'mancera-red-tobacco-edp-120',
    brandId: 'mancera',
    name: 'Red Tobacco',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2017,
    country: 'France',
    ml: 120,
    moods: ['tobacco', 'spicy', 'dark', 'sweet'],
    featured: true,
    bestseller: true,
    description: bi(
      'Mancera Red Tobacco — intensywny tytoniowo-korzenny niszowy zapach. Oryginał w AromaShop.',
      'Mancera Red Tobacco — інтенсивний тютюново-пряний нішевий аромат. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Głośny tytoń, przyprawy i słodycz — bardzo zdecydowany charakter.',
      'Гучний тютюн, спеції й солодкість — дуже впевнений характер.'
    ),
    story: editorial(
      'Red Tobacco',
      'Mancera',
      'od korzennego otwarcia i przechodzi w <strong>tytoń, cynamon i słodką bazę</strong> — intensywnie i długotrwale.',
      'з пряного відкриття й переходить у <strong>тютюн, корицю та солодку базу</strong> — інтенсивно й стійко.',
      'Dla fanów mocnych, ciepłych kompozycji.',
      'Для шанувальників потужних теплих композицій.'
    ),
    facts: [
      bi('🚬 <strong>Red Tobacco.</strong> Jedna z najmocniejszych pozycji Mancera.', '🚬 <strong>Red Tobacco.</strong> Одна з найпотужніших позицій Mancera.'),
      factOrig('Red Tobacco'),
    ],
    fragrance: {
      families: ['oriental', 'spicy', 'woody'],
      accords: ['tobacco', 'warm-spicy', 'sweet', 'woody', 'smoky'],
      notes: {
        top: ['cinnamon', 'saffron', 'incense', 'nutmeg'],
        heart: ['tobacco', 'green-notes', 'patchouli'],
        base: ['vanilla', 'agarwood', 'white-musk', 'amber'],
      },
    },
    character: { sweetness: 4, freshness: 1, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['evening', 'date', 'special'],
    },
    similar: [E.tobaccoVanille, E.oudGreatness, 'montale-arabians-tonka-edp-100'],
    tags: ['tobacco', 'intense', 'mancera', 'winter'],
  }),

  make({
    id: 'mancera-roses-vanille-edp-120',
    brandId: 'mancera',
    name: 'Roses Vanille',
    collection: 'niche',
    gender: 'women',
    concentration: 'EDP',
    year: 2011,
    country: 'France',
    ml: 120,
    moods: ['floral', 'warm-vanilla', 'sweet', 'gourmand'],
    featured: true,
    description: bi(
      'Mancera Roses Vanille — różano-waniliowy niszowy zapach o słodkim charakterze. Oryginał w AromaShop.',
      'Mancera Roses Vanille — трояндово-ванільний нішевий аромат із солодким характером. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Róża i wanilia w gęstym, otulającym wydaniu.',
      'Троянда й ваніль у густому обволікаючому звучанні.'
    ),
    story: editorial(
      'Roses Vanille',
      'Mancera',
      'od <strong>róży</strong>, a następnie otula skórę wanilią i słodką bazą — kobieco i bez kompleksów.',
      'з <strong>троянди</strong>, а далі огортає шкіру ваніллю та солодкою базою — жіночно й безкомпромісно.',
      'Prosta idea, mocne wykonanie.',
      'Проста ідея, потужне виконання.'
    ),
    facts: [
      bi('🌹 <strong>Roses Vanille.</strong> Klasyczny sweet-floral Mancera.', '🌹 <strong>Roses Vanille.</strong> Класичний sweet-floral Mancera.'),
      factOrig('Roses Vanille'),
    ],
    fragrance: {
      families: ['floral', 'oriental', 'gourmand'],
      accords: ['rose', 'vanilla', 'sweet', 'powdery'],
      notes: {
        top: ['rose', 'lemon'],
        heart: ['rose', 'geranium'],
        base: ['vanilla', 'white-musk', 'woody-notes'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'evening'],
    },
    similar: [E.vanilla28, E.goddess, 'montale-roses-musk-edp-100'],
    tags: ['rose', 'vanilla', 'sweet', 'mancera'],
  }),

  make({
    id: 'mancera-amore-caffe-edp-120',
    brandId: 'mancera',
    name: 'Amore Caffè',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2022,
    country: 'France',
    ml: 120,
    moods: ['coffee', 'gourmand', 'sweet', 'warm-vanilla'],
    featured: true,
    description: bi(
      'Mancera Amore Caffè — kawowo-gourmandowy niszowy zapach z mlekiem i wanilią. Oryginał w AromaShop.',
      'Mancera Amore Caffè — кавово-гурманський нішевий аромат із молоком і ваніллю. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Kawa latte w flakonie: kremowo, słodko, uzależniająco.',
      'Кава лате у флаконі: кремово, солодко, залежно.'
    ),
    story: editorial(
      'Amore Caffè',
      'Mancera',
      'od <strong>kawy i kremowej słodyczy</strong>, z wanilią i gourmandową bazą — deserowo, ale nowocześnie.',
      'з <strong>кави та кремової солодкості</strong> з ваніллю та гурманською базою — десертно, але сучасно.',
      'Dla miłośników kawowych kompozycji.',
      'Для любителів кавових композицій.'
    ),
    facts: [
      bi('☕ <strong>Amore Caffè.</strong> Kawowy gourmand w stylu Mancera.', '☕ <strong>Amore Caffè.</strong> Кавовий gourmand у стилі Mancera.'),
      factOrig('Amore Caffè'),
    ],
    fragrance: {
      families: ['gourmand', 'oriental'],
      accords: ['coffee', 'vanilla', 'sweet', 'woody'],
      notes: {
        top: ['coffee', 'bergamot'],
        heart: ['milk', 'caramel', 'hazelnut'],
        base: ['vanilla', 'white-musk', 'woody-notes'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['casual', 'date', 'daily'],
    },
    similar: [E.blackOpium, 'montale-intense-cafe-edp-100', E.vanilla28],
    tags: ['coffee', 'gourmand', 'mancera', 'trend'],
  }),

  make({
    id: 'mancera-intense-cedrat-boise-edp-120',
    brandId: 'mancera',
    name: 'Intense Cedrat Boise',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2020,
    country: 'France',
    ml: 120,
    moods: ['citrus', 'woody', 'fresh'],
    featured: true,
    description: bi(
      'Mancera Intense Cedrat Boise — głębsza, bardziej drzewna wersja Cedrat Boise. Oryginał w AromaShop.',
      'Mancera Intense Cedrat Boise — глибша, більш деревна версія Cedrat Boise. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Cedrat Boise z większą głębią i mocniejszą bazą.',
      'Cedrat Boise з більшою глибиною та сильнішою базою.'
    ),
    story: editorial(
      'Intense Cedrat Boise',
      'Mancera',
      'od cytrusowo-owocowego charakteru oryginału, ale z wyraźniejszą <strong>drzewną i skórzaną</strong> głębią.',
      'з цитрусово-фруктового характеру оригіналу, але з виразнішою <strong>деревною та шкіряною</strong> глибиною.',
      'Dla fanów Cedrat Boise, którzy chcą więcej mocy.',
      'Для шанувальників Cedrat Boise, які хочуть більше сили.'
    ),
    facts: [
      bi('🌲 <strong>Intense.</strong> Wzmocniona interpretacja Cedrat Boise.', '🌲 <strong>Intense.</strong> Посилена інтерпретація Cedrat Boise.'),
      factOrig('Intense Cedrat Boise'),
    ],
    fragrance: {
      families: ['citrus', 'woody'],
      accords: ['citrus', 'woody', 'fruity', 'leather'],
      notes: {
        top: ['citron', 'bergamot', 'apple'],
        heart: ['blackcurrant', 'aromatic-notes'],
        base: ['cedar', 'vetiver', 'leather', 'amber', 'white-musk'],
      },
    },
    character: { sweetness: 2, freshness: 4, warmth: 3, intensity: 5 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'casual', 'date'],
    },
    similar: ['mancera-cedrat-boise-edp-120', E.aventus],
    tags: ['citrus', 'woody', 'intense', 'mancera'],
  }),

  make({
    id: 'montale-arabians-tonka-edp-100',
    brandId: 'montale',
    name: 'Arabians Tonka',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2017,
    country: 'France',
    moods: ['warm-vanilla', 'oud', 'sweet', 'spicy', 'dark'],
    featured: true,
    bestseller: true,
    description: bi(
      'Montale Arabians Tonka — oudowo-tonkowy niszowy zapach o bogatym orientalnym charakterze. Oryginał w AromaShop.',
      'Montale Arabians Tonka — удо-тонковий нішевий аромат із багатим східним характером. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Oud, tonka i róża w intensywnym Montale.',
      'Уд, тонка й троянда в інтенсивному Montale.'
    ),
    story: editorial(
      'Arabians Tonka',
      'Montale',
      'od orientalnej słodyczy i przechodzi w <strong>oud, tonkę i różę</strong> — gęsto, długotrwale i zdecydowanie.',
      'зі східної солодкості й переходить у <strong>уд, тонку й троянду</strong> — густо, стійко й впевнено.',
      'Zimowy statement Montale.',
      'Зимовий statement Montale.'
    ),
    facts: [
      bi('🌙 <strong>Arabians Tonka.</strong> Popularny warm-oudowy profil Montale.', '🌙 <strong>Arabians Tonka.</strong> Популярний warm-oud профіль Montale.'),
      factOrig('Arabians Tonka'),
    ],
    fragrance: {
      families: ['oriental', 'woody', 'gourmand'],
      accords: ['oud', 'vanilla', 'sweet', 'rose', 'warm-spicy'],
      notes: {
        top: ['saffron', 'apple', 'bergamot'],
        heart: ['rose', 'oud', 'orange-blossom'],
        base: ['tonka-bean', 'vanilla', 'amber', 'white-musk'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['evening', 'date', 'special'],
    },
    similar: [E.oudGreatness, 'mancera-red-tobacco-edp-120', E.baccarat],
    tags: ['oud', 'tonka', 'montale', 'winter'],
  }),

  make({
    id: 'montale-intense-cafe-edp-100',
    brandId: 'montale',
    name: 'Intense Café',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2013,
    country: 'France',
    moods: ['coffee', 'floral', 'gourmand', 'sweet'],
    featured: true,
    bestseller: true,
    description: bi(
      'Montale Intense Café — kawowo-różany niszowy zapach. Oryginał w AromaShop.',
      'Montale Intense Café — кавово-трояндовий нішевий аромат. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Kawa i róża: gorzko-słodki, uzależniający kontrast.',
      'Кава й троянда: гірко-солодкий залежний контраст.'
    ),
    story: editorial(
      'Intense Café',
      'Montale',
      'od <strong>kawy i róży</strong>, a baza dodaje wanilię i piżmo — deserowo i kwiatowo jednocześnie.',
      'з <strong>кави та троянди</strong>, а база додає ваніль і мускус — десертно й квітково водночас.',
      'Kultowy kawowy Montale.',
      'Культовий кавовий Montale.'
    ),
    facts: [
      bi('☕ <strong>Intense Café.</strong> Jeden z najbardziej znanych kawowych zapachów niche.', '☕ <strong>Intense Café.</strong> Один із найбільш відомих кавових ароматів niche.'),
      factOrig('Intense Café'),
    ],
    fragrance: {
      families: ['floral', 'gourmand', 'oriental'],
      accords: ['coffee', 'rose', 'vanilla', 'sweet', 'floral'],
      notes: {
        top: ['coffee', 'floral'],
        heart: ['rose', 'coffee'],
        base: ['vanilla', 'white-musk', 'amber'],
      },
    },
    character: { sweetness: 4, freshness: 1, warmth: 4, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'casual'],
    },
    similar: [E.blackOpium, 'mancera-amore-caffe-edp-120'],
    tags: ['coffee', 'rose', 'montale', 'core'],
  }),

  make({
    id: 'montale-roses-musk-edp-100',
    brandId: 'montale',
    name: 'Roses Musk',
    collection: 'niche',
    gender: 'women',
    concentration: 'EDP',
    year: 2009,
    country: 'France',
    moods: ['floral', 'musk', 'clean', 'modern-feminine'],
    featured: true,
    description: bi(
      'Montale Roses Musk — czysta róża z piżmem w intensywnym wydaniu. Oryginał w AromaShop.',
      'Montale Roses Musk — чиста троянда з мускусом в інтенсивному звучанні. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Prosta, czysta róża i miękkie piżmo — głośniej niż wygląda.',
      'Проста чиста троянда й м’який мускус — гучніше, ніж здається.'
    ),
    story: editorial(
      'Roses Musk',
      'Montale',
      'od <strong>róży i białego piżma</strong> — czysto, kwiatowo i z charakterystyczną mocą Montale.',
      'з <strong>троянди та білого мускусу</strong> — чисто, квітково й із характерною силою Montale.',
      'Róża bez zbędnych ozdobników.',
      'Троянда без зайвих прикрас.'
    ),
    facts: [
      bi('🌹 <strong>Roses Musk.</strong> Minimalistyczna róża w stylu Montale.', '🌹 <strong>Roses Musk.</strong> Мінімалістична троянда в стилі Montale.'),
      factOrig('Roses Musk'),
    ],
    fragrance: {
      families: ['floral'],
      accords: ['rose', 'musky', 'floral', 'powdery'],
      notes: {
        top: ['rose'],
        heart: ['rose', 'white-musk'],
        base: ['white-musk', 'woody-notes'],
      },
    },
    character: { sweetness: 3, freshness: 3, warmth: 2, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'casual'],
    },
    similar: ['mancera-roses-vanille-edp-120', E.chance, E.blanche],
    tags: ['rose', 'musk', 'montale'],
  }),

  make({
    id: 'montale-black-aoud-edp-100',
    brandId: 'montale',
    name: 'Black Aoud',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2006,
    country: 'France',
    moods: ['oud', 'dark', 'woody', 'leather'],
    featured: true,
    description: bi(
      'Montale Black Aoud — ciemny oudowo-różany niszowy klasyk. Oryginał w AromaShop.',
      'Montale Black Aoud — темний удо-трояндовий нішевий класик. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Czarny oud Montale: intensywny, suchy i nieprzejednany.',
      'Чорний уд Montale: інтенсивний, сухий і безкомпромісний.'
    ),
    story: editorial(
      'Black Aoud',
      'Montale',
      'od ciemnego <strong>oudu i róży</strong>, z paczulą i skórzanymi niuansami — głęboko i mocno.',
      'з темного <strong>уду й троянди</strong> з пачулі та шкіряними нюансами — глибоко й потужно.',
      'Jeden z fundamentów oudowej linii Montale.',
      'Один із фундаментів удової лінії Montale.'
    ),
    facts: [
      bi('🖤 <strong>Black Aoud.</strong> Wczesny i ikoniczny oud Montale.', '🖤 <strong>Black Aoud.</strong> Ранній іконічний уд Montale.'),
      factOrig('Black Aoud'),
    ],
    fragrance: {
      families: ['woody', 'oriental', 'leather'],
      accords: ['oud', 'rose', 'woody', 'smoky', 'leather'],
      notes: {
        top: ['oud', 'rose'],
        heart: ['patchouli', 'leather'],
        base: ['oud', 'musk', 'woody-notes'],
      },
    },
    character: { sweetness: 2, freshness: 1, warmth: 4, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['evening', 'special', 'date'],
    },
    similar: [E.oudWood, E.oudGreatness, 'montale-arabians-tonka-edp-100'],
    tags: ['oud', 'dark', 'montale'],
  }),

  make({
    id: 'montale-vanilla-cake-edp-100',
    brandId: 'montale',
    name: 'Vanilla Cake',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2021,
    country: 'France',
    moods: ['gourmand', 'warm-vanilla', 'sweet'],
    featured: false,
    description: bi(
      'Montale Vanilla Cake — deserowy waniliowy niszowy zapach. Oryginał w AromaShop.',
      'Montale Vanilla Cake — десертний ванільний нішевий аромат. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Waniliowe ciasto w flakonie — miękko, słodko, gourmandowo.',
      'Ванільний торт у флаконі — м’яко, солодко, гурманськи.'
    ),
    story: editorial(
      'Vanilla Cake',
      'Montale',
      'od kremowej <strong>wanilii i deserowych akordów</strong> — otulająco i bezpretensjonalnie.',
      'з кремової <strong>ванілі та десертних акордів</strong> — обволікаюче й безпретензійно.',
      'Prosty gourmand na chłodniejsze dni.',
      'Простий gourmand на прохолодніші дні.'
    ),
    facts: [
      bi('🍰 <strong>Vanilla Cake.</strong> Deserowy profil w ofercie Montale.', '🍰 <strong>Vanilla Cake.</strong> Десертний профіль у лінійці Montale.'),
      factOrig('Vanilla Cake'),
    ],
    fragrance: {
      families: ['gourmand', 'oriental'],
      accords: ['vanilla', 'sweet', 'powdery'],
      notes: {
        top: ['vanilla', 'sugar'],
        heart: ['vanilla', 'caramel'],
        base: ['vanilla', 'white-musk', 'woody-notes'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['casual', 'daily', 'date'],
    },
    similar: [E.vanilla28, E.goddess, 'mancera-roses-vanille-edp-120'],
    tags: ['vanilla', 'gourmand', 'montale', 'seasonal'],
  }),

  make({
    id: 'montale-aoud-lemon-mint-edp-100',
    brandId: 'montale',
    name: 'Aoud Lemon Mint',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2013,
    country: 'France',
    moods: ['citrus', 'oud', 'fresh', 'aromatic'],
    featured: false,
    description: bi(
      'Montale Aoud Lemon Mint — cytrusowo-miętowy oud o świeższym charakterze. Oryginał w AromaShop.',
      'Montale Aoud Lemon Mint — цитрусово-м’ятний уд зі свіжішим характером. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Oud przełamany cytryną i miętą — nietypowo świeży.',
      'Уд, перебитий лимоном і м’ятою — нетипово свіжий.'
    ),
    story: editorial(
      'Aoud Lemon Mint',
      'Montale',
      'od <strong>cytryny i mięty</strong>, a następnie pojawia się oud — kontrast świeżości i orientalnej głębi.',
      'з <strong>лимона та м’яти</strong>, а далі з’являється уд — контраст свіжості й східної глибини.',
      'Oud na cieplejsze miesiące.',
      'Уд на тепліші місяці.'
    ),
    facts: [
      bi('🍋 <strong>Aoud Lemon Mint.</strong> Świeższa odsłona oudowej linii Montale.', '🍋 <strong>Aoud Lemon Mint.</strong> Свіжіше звучання удової лінії Montale.'),
      factOrig('Aoud Lemon Mint'),
    ],
    fragrance: {
      families: ['citrus', 'woody', 'aromatic'],
      accords: ['citrus', 'oud', 'aromatic', 'fresh-spicy'],
      notes: {
        top: ['lemon', 'mint', 'bergamot'],
        heart: ['oud', 'rose'],
        base: ['oud', 'white-musk', 'woody-notes'],
      },
    },
    character: { sweetness: 2, freshness: 4, warmth: 3, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer'],
      timeOfDay: ['day'],
      occasions: ['daily', 'casual'],
    },
    similar: ['montale-black-aoud-edp-100', E.oudWood, 'mancera-cedrat-boise-edp-120'],
    tags: ['oud', 'citrus', 'mint', 'seasonal'],
  }),

  make({
    id: 'nishane-hacivat-extrait-100',
    brandId: 'nishane',
    name: 'Hacivat',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'Extrait',
    year: 2017,
    country: 'Turkey',
    moods: ['woody', 'citrus', 'fresh', 'luxury'],
    featured: true,
    bestseller: true,
    description: bi(
      'Nishane Hacivat Extrait — ananasowo-drzewny niszowy extrait o wysokiej koncentracji. Oryginał w AromaShop.',
      'Nishane Hacivat Extrait — ананасово-деревний нішевий extrait високої концентрації. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Ananas, grapefruit i dębowy mech — chypre w współczesnym wydaniu.',
      'Ананас, грейпфрут і дубовий мох — шипр у сучасному звучанні.'
    ),
    story: editorial(
      'Hacivat',
      'Nishane',
      'od <strong>ananasa i grapefruita</strong>, a baza buduje dębowy mech i drzewa — świeżo, ale z niszą głębią.',
      'з <strong>ананаса та грейпфрута</strong>, а база будує дубовий мох і дерева — свіжо, але з нішевою глибиною.',
      'Jeden z wizytowych extrait Nishane.',
      'Один із візитних extrait Nishane.'
    ),
    facts: [
      bi('🎭 <strong>Hacivat.</strong> Extrait de parfum o rozpoznawalnym owocowo-drzewnym profilu.', '🎭 <strong>Hacivat.</strong> Extrait de parfum із впізнаваним фруктово-деревним профілем.'),
      factOrig('Hacivat'),
    ],
    fragrance: {
      families: ['chypre', 'woody', 'fruity'],
      accords: ['fruity', 'woody', 'citrus', 'earthy'],
      notes: {
        top: ['pineapple', 'grapefruit', 'bergamot'],
        heart: ['jasmine', 'woody-notes'],
        base: ['oakmoss', 'patchouli', 'cedar', 'clearwood'],
      },
    },
    character: { sweetness: 3, freshness: 4, warmth: 3, intensity: 5 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'special', 'office'],
    },
    similar: [E.aventus, 'mancera-cedrat-boise-edp-120', E.sauvage],
    tags: ['pineapple', 'chypre', 'nishane', 'core'],
  }),

  make({
    id: 'nishane-ani-extrait-100',
    brandId: 'nishane',
    name: 'Ani',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'Extrait',
    year: 2019,
    country: 'Turkey',
    moods: ['warm-vanilla', 'spicy', 'woody', 'luxury'],
    featured: true,
    description: bi(
      'Nishane Ani Extrait — waniliowo-korzenny niszowy extrait. Oryginał w AromaShop.',
      'Nishane Ani Extrait — ванільно-пряний нішевий extrait. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Wanilia, różowy pieprz i drzewa — elegancka słodycz Nishane.',
      'Ваніль, рожевий перець і дерева — елегантна солодкість Nishane.'
    ),
    story: editorial(
      'Ani',
      'Nishane',
      'od <strong>różowego pieprzu i bergamotki</strong>, a serce i baza budują wanilię, benzoes i drzewa.',
      'з <strong>рожевого перцю та бергамоту</strong>, а серце й база будують ваніль, бензоїн і дерева.',
      'Ciepły extrait o wysokiej elegancji.',
      'Теплий extrait високої елегантності.'
    ),
    facts: [
      bi('🏛️ <strong>Ani.</strong> Inspiracją jest historyczne miasto Ani.', '🏛️ <strong>Ani.</strong> Натхненням є історичне місто Ані.'),
      factOrig('Ani'),
    ],
    fragrance: {
      families: ['oriental', 'woody', 'spicy'],
      accords: ['vanilla', 'warm-spicy', 'woody', 'powdery'],
      notes: {
        top: ['pink-pepper', 'bergamot', 'ginger'],
        heart: ['vanilla', 'sandalwood', 'rosewood'],
        base: ['benzoin', 'vanilla', 'amber', 'musk'],
      },
    },
    character: { sweetness: 4, freshness: 2, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'evening', 'special'],
    },
    similar: [E.vanilla28, E.grandSoir, 'nishane-hundred-silent-ways-extrait-100'],
    tags: ['vanilla', 'spicy', 'nishane'],
  }),

  make({
    id: 'nishane-hundred-silent-ways-extrait-100',
    brandId: 'nishane',
    name: 'Hundred Silent Ways',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'Extrait',
    year: 2016,
    country: 'Turkey',
    moods: ['floral', 'warm-vanilla', 'sweet', 'modern-feminine'],
    featured: true,
    description: bi(
      'Nishane Hundred Silent Ways — tuberózowo-waniliowy niszowy extrait. Oryginał w AromaShop.',
      'Nishane Hundred Silent Ways — туберозово-ванільний нішевий extrait. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Tuberoza, wanilia i miękka zmysłowość w wysokiej koncentracji.',
      'Тубероза, ваніль і м’яка чуттєвість у високій концентрації.'
    ),
    story: editorial(
      'Hundred Silent Ways',
      'Nishane',
      'od kwiatowej słodyczy <strong>tuberozy</strong>, a baza otula wanilią i piżmem — zmysłowo, ale nie krzykliwie.',
      'з квіткової солодкості <strong>туберози</strong>, а база огортає ваніллю й мускусом — чуттєво, але не крикливо.',
      'Kwiatowy extrait o intymnym charakterze.',
      'Квітковий extrait з інтимним характером.'
    ),
    facts: [
      bi('🌸 <strong>Hundred Silent Ways.</strong> Poetycki floral-gourmand Nishane.', '🌸 <strong>Hundred Silent Ways.</strong> Поетичний floral-gourmand Nishane.'),
      factOrig('Hundred Silent Ways'),
    ],
    fragrance: {
      families: ['floral', 'oriental'],
      accords: ['white-floral', 'vanilla', 'sweet', 'powdery'],
      notes: {
        top: ['mandarin', 'bergamot'],
        heart: ['tuberose', 'orange-blossom', 'jasmine'],
        base: ['vanilla', 'sandalwood', 'amber', 'musk'],
      },
    },
    character: { sweetness: 4, freshness: 2, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['spring', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['date', 'evening', 'special', 'daily'],
    },
    similar: [E.libre, 'nishane-ani-extrait-100', E.vanilla28],
    tags: ['tuberose', 'vanilla', 'nishane'],
  }),

  make({
    id: 'tiziana-terenzi-kirke-extrait-100',
    brandId: 'tiziana-terenzi',
    name: 'Kirke',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'Extrait',
    year: 2015,
    country: 'Italy',
    moods: ['sweet', 'fresh', 'floral'],
    featured: true,
    bestseller: true,
    description: bi(
      'Tiziana Terenzi Kirke — owocowo-piżmowy niszowy extrait o mocnej projekcji. Oryginał w AromaShop.',
      'Tiziana Terenzi Kirke — фруктово-мускусний нішевий extrait із сильною проекцією. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Soczyste owoce i piżmo — głośny, słodki i bardzo rozpoznawalny.',
      'Соковиті фрукти й мускус — гучний, солодкий і дуже впізнаваний.'
    ),
    story: editorial(
      'Kirke',
      'Tiziana Terenzi',
      'od <strong>owocowego koktajlu</strong> — brzoskwinia, passiflora, malina — a baza jest piżmowo-drzewna i długotrwała.',
      'з <strong>фруктового коктейлю</strong> — персик, маракуя, малина — а база мускусно-деревна й стійка.',
      'Jeden z najbardziej „głośnych” extrait dekady.',
      'Один із найбільш «гучних» extrait десятиліття.'
    ),
    facts: [
      bi('🍑 <strong>Kirke.</strong> Owocowo-piżmowy signature Tiziana Terenzi.', '🍑 <strong>Kirke.</strong> Фруктово-мускусний signature Tiziana Terenzi.'),
      factOrig('Kirke'),
    ],
    fragrance: {
      families: ['fruity', 'floral'],
      accords: ['fruity', 'sweet', 'musky', 'woody'],
      notes: {
        top: ['peach', 'passionfruit', 'raspberry', 'pear'],
        heart: ['lily-of-the-valley', 'heliotrope'],
        base: ['musk', 'sandalwood', 'vanilla', 'patchouli'],
      },
    },
    character: { sweetness: 5, freshness: 3, warmth: 3, intensity: 5 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'party', 'casual'],
    },
    similar: ['xerjoff-erba-pura-edp-100', E.baccarat, 'parfums-de-marly-delina-edp-075'],
    tags: ['fruity', 'musk', 'loud', 'core'],
  }),

  make({
    id: 'mfk-gentle-fluidity-gold-edp-070',
    brandId: 'mfk',
    name: 'Gentle Fluidity Gold',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2019,
    country: 'France',
    ml: 70,
    moods: ['warm-vanilla', 'woody', 'spicy', 'luxury'],
    featured: true,
    description: bi(
      'Maison Francis Kurkdjian Gentle Fluidity Gold — waniliowo-korzenny niszowy zapach. Oryginał w AromaShop.',
      'Maison Francis Kurkdjian Gentle Fluidity Gold — ванільно-пряний нішевий аромат. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Złota Fluidity: wanilia, gałka muszkatołowa i miękkie drzewa.',
      'Золота Fluidity: ваніль, мускатний горіх і м’які дерева.'
    ),
    story: editorial(
      'Gentle Fluidity Gold',
      'Maison Francis Kurkdjian',
      'od korzennej elegancji i przechodzi w <strong>wanilię, muszkatołowiec i drzewne piżmo</strong> — gładko i luksusowo.',
      'з пряної елегантності й переходить у <strong>ваніль, мускат і деревний мускус</strong> — гладко й розкішно.',
      'Ciepła, unisexowa elegancja MFK.',
      'Тепла унісекс-елегантність MFK.'
    ),
    facts: [
      bi('✨ <strong>Gold.</strong> Waniliowo-korzenna odsłona duetu Gentle Fluidity.', '✨ <strong>Gold.</strong> Ванільно-пряне звучання дуету Gentle Fluidity.'),
      factOrig('Gentle Fluidity Gold'),
    ],
    fragrance: {
      families: ['oriental', 'woody'],
      accords: ['vanilla', 'warm-spicy', 'woody', 'musky'],
      notes: {
        top: ['nutmeg', 'coriander'],
        heart: ['vanilla'],
        base: ['woody-notes', 'musk', 'amber'],
      },
    },
    character: { sweetness: 4, freshness: 1, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'date', 'special'],
    },
    similar: [E.grandSoir, E.baccarat, E.vanilla28],
    tags: ['vanilla', 'mfk', 'unisex', 'core'],
  }),

  make({
    id: 'initio-side-effect-edp-090',
    brandId: 'initio',
    name: 'Side Effect',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2016,
    country: 'France',
    ml: 90,
    moods: ['tobacco', 'sweet', 'spicy', 'dark', 'evening'],
    featured: true,
    description: bi(
      'Initio Side Effect — rumowo-tytoniowy niszowy zapach o uzależniającym charakterze. Oryginał w AromaShop.',
      'Initio Side Effect — ромово-тютюновий нішевий аромат із залежним характером. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Rum, tytoń, wanilia — ciemny i magnetyczny.',
      'Ром, тютюн, ваніль — темний і магнетичний.'
    ),
    story: editorial(
      'Side Effect',
      'Initio',
      'od <strong>rumu i przypraw</strong>, a następnie przechodzi w tytoń i wanilię — boozy, ciemno i bardzo osobowościowo.',
      'з <strong>рому та спецій</strong>, а далі — тютюн і ваніль — boozy, темно й дуже характерно.',
      'Initio w wersji uzależniającej.',
      'Initio в залежній версії.'
    ),
    facts: [
      bi('🥃 <strong>Side Effect.</strong> Boozy-tobacco signature Initio.', '🥃 <strong>Side Effect.</strong> Boozy-tobacco signature Initio.'),
      factOrig('Side Effect'),
    ],
    fragrance: {
      families: ['oriental', 'spicy', 'gourmand'],
      accords: ['boozy', 'tobacco', 'vanilla', 'warm-spicy', 'sweet'],
      notes: {
        top: ['rum', 'cinnamon', 'saffron'],
        heart: ['tobacco', 'vanilla'],
        base: ['sandalwood', 'woody-notes', 'amber'],
      },
    },
    character: { sweetness: 4, freshness: 1, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['date', 'evening', 'special'],
    },
    similar: [E.tobaccoVanille, E.oudGreatness, 'kilian-angels-share-edp-050'],
    tags: ['rum', 'tobacco', 'initio', 'evening'],
  }),

  make({
    id: 'memo-paris-african-leather-edp-075',
    brandId: 'memo-paris',
    name: 'African Leather',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2015,
    country: 'France',
    ml: 75,
    moods: ['leather', 'spicy', 'woody', 'dark'],
    featured: true,
    description: bi(
      'Memo Paris African Leather — skórzano-korzenny niszowy zapach podróżniczy. Oryginał w AromaShop.',
      'Memo Paris African Leather — шкіряно-пряний нішевий мандрівний аромат. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Skóra, kardamon i geranium — dziko i elegancko.',
      'Шкіра, кардамон і герань — дико й елегантно.'
    ),
    story: editorial(
      'African Leather',
      'Memo Paris',
      'od <strong>kardamonu i geranium</strong>, a baza buduje skórę, wetiwer i patchouli — sucho, korzennie i podróżniczo.',
      'з <strong>кардамону та герані</strong>, а база будує шкіру, ветивер і пачулі — сухо, пряно й мандрівно.',
      'Skóra w wersji awanturniczej.',
      'Шкіра в авантюрній версії.'
    ),
    facts: [
      bi('🧳 <strong>Travel notes.</strong> Kompozycja z podróżniczej linii Memo Paris.', '🧳 <strong>Travel notes.</strong> Композиція з мандрівної лінії Memo Paris.'),
      factOrig('African Leather'),
    ],
    fragrance: {
      families: ['leather', 'spicy', 'woody'],
      accords: ['leather', 'warm-spicy', 'woody', 'aromatic'],
      notes: {
        top: ['cardamom', 'bergamot', 'geranium'],
        heart: ['leather', 'geranium', 'peppery'],
        base: ['patchouli', 'vetiver', 'oud', 'musk'],
      },
    },
    character: { sweetness: 2, freshness: 2, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'special', 'evening'],
    },
    similar: [E.oudWood, E.oudGreatness, 'marc-antoine-barrois-ganymede-edp-100'],
    tags: ['leather', 'spicy', 'memo', 'discovery'],
  }),

  make({
    id: 'nasomatto-black-afgano-extrait-030',
    brandId: 'nasomatto',
    name: 'Black Afgano',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'Extrait',
    year: 2009,
    country: 'Netherlands',
    ml: 30,
    moods: ['dark', 'oud', 'woody', 'evening'],
    featured: true,
    description: bi(
      'Nasomatto Black Afgano — ciemny, żywiczny extrait o uzależniającej intensywności. Oryginał w AromaShop.',
      'Nasomatto Black Afgano — темний смолистий extrait із залежною інтенсивністю. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Żywice, hashishowy klimat i głęboka ciemność Nasomatto.',
      'Смоли, hashish-клімат і глибока темрява Nasomatto.'
    ),
    story: editorial(
      'Black Afgano',
      'Nasomatto',
      'od ciemnych <strong>żywic i dymnych akordów</strong> — gęsto, animalicznie i bez kompromisów.',
      'з темних <strong>смол і димних акордів</strong> — густо, анімалістично й безкомпромісно.',
      'Kultowy ciemny extrait.',
      'Культовий темний extrait.'
    ),
    facts: [
      bi('🖤 <strong>Black Afgano.</strong> Jedna z najbardziej kultowych kompozycji Nasomatto.', '🖤 <strong>Black Afgano.</strong> Одна з найбільш культових композицій Nasomatto.'),
      factOrig('Black Afgano'),
    ],
    fragrance: {
      families: ['woody', 'oriental'],
      accords: ['smoky', 'woody', 'oud', 'earthy', 'animalic'],
      notes: {
        top: ['green-notes', 'herbal-notes'],
        heart: ['resins', 'tobacco', 'coffee'],
        base: ['oud', 'woody-notes', 'amber'],
      },
    },
    character: { sweetness: 2, freshness: 1, warmth: 4, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['evening', 'special', 'date'],
    },
    similar: [E.oudGreatness, 'montale-black-aoud-edp-100', E.oudWood],
    tags: ['dark', 'resin', 'nasomatto', 'discovery'],
  }),

  make({
    id: 'xerjoff-erba-pura-edp-100',
    brandId: 'xerjoff',
    name: 'Erba Pura',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2019,
    country: 'Italy',
    moods: ['sweet', 'fresh', 'floral'],
    featured: true,
    bestseller: true,
    description: bi(
      'Xerjoff Erba Pura — owocowo-piżmowy niszowy zapach o wysokiej projekcji. Oryginał w AromaShop.',
      'Xerjoff Erba Pura — фруктово-мускусний нішевий аромат із високою проекцією. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Sycylijskie owoce i białe piżmo — słodko, głośno, słonecznie.',
      'Сицилійські фрукти й білий мускус — солодко, гучно, сонячно.'
    ),
    story: editorial(
      'Erba Pura',
      'Xerjoff',
      'od <strong>owocowego blasku</strong> — pomarańcza, brzoskwinia, mango — a baza jest piżmowa i długotrwała.',
      'з <strong>фруктового блиску</strong> — апельсин, персик, манго — а база мускусна й стійка.',
      'Słoneczny głośny Xerjoff.',
      'Сонячний гучний Xerjoff.'
    ),
    facts: [
      bi('🍊 <strong>Erba Pura.</strong> Owocowo-piżmowy hit linii V Casamorati / Xerjoff popularnych kompozycji.', '🍊 <strong>Erba Pura.</strong> Фруктово-мускусний хіт популярних композицій Xerjoff.'),
      factOrig('Erba Pura'),
    ],
    fragrance: {
      families: ['fruity', 'floral'],
      accords: ['fruity', 'sweet', 'musky', 'citrus'],
      notes: {
        top: ['orange', 'bergamot', 'sicilian-orange'],
        heart: ['peach', 'mango', 'fruity-notes'],
        base: ['white-musk', 'amber', 'vanilla'],
      },
    },
    character: { sweetness: 5, freshness: 3, warmth: 3, intensity: 5 },
    wearing: {
      seasons: ['spring', 'summer'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'party', 'date', 'casual'],
    },
    similar: ['tiziana-terenzi-kirke-extrait-100', E.baccarat, 'parfums-de-marly-delina-edp-075'],
    tags: ['fruity', 'musk', 'loud', 'core'],
  }),

  make({
    id: 'maison-crivelli-hibiscus-mahajad-extrait-050',
    brandId: 'maison-crivelli',
    name: 'Hibiscus Mahajád',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'Extrait',
    year: 2018,
    country: 'France',
    ml: 50,
    moods: ['floral', 'leather', 'spicy', 'luxury'],
    featured: true,
    description: bi(
      'Maison Crivelli Hibiscus Mahajád — hibiskusowo-skórzany niszowy extrait. Oryginał w AromaShop.',
      'Maison Crivelli Hibiscus Mahajád — гібіскусно-шкіряний нішевий extrait. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Kwasowy hibiskus, róża i skóra — kontrastowy i nowoczesny.',
      'Кислий гібіскус, троянда й шкіра — контрастний і сучасний.'
    ),
    story: editorial(
      'Hibiscus Mahajád',
      'Maison Crivelli',
      'od <strong>hibiskusa i róży</strong>, a baza łączy skórę i warmowe akordy — kwiatowo, ale z ostrzejszym charakterem.',
      'з <strong>гібіскуса та троянди</strong>, а база поєднує шкіру й теплі акорди — квітково, але з гострішим характером.',
      'Discovery o wyraźnej osobowości.',
      'Discovery з виразною особистістю.'
    ),
    facts: [
      bi('🌺 <strong>Hibiscus Mahajád.</strong> Kontrastowy extrait Maison Crivelli.', '🌺 <strong>Hibiscus Mahajád.</strong> Контрастний extrait Maison Crivelli.'),
      factOrig('Hibiscus Mahajád'),
    ],
    fragrance: {
      families: ['floral', 'leather', 'oriental'],
      accords: ['floral', 'leather', 'fruity', 'rose'],
      notes: {
        top: ['hibiscus', 'raspberry', 'pink-pepper'],
        heart: ['rose', 'osmanthus'],
        base: ['leather', 'vanilla', 'musk'],
      },
    },
    character: { sweetness: 3, freshness: 2, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['date', 'special', 'evening'],
    },
    similar: [E.oudWood, 'memo-paris-african-leather-edp-075', 'parfums-de-marly-delina-edp-075'],
    tags: ['hibiscus', 'leather', 'discovery'],
  }),

  make({
    id: 'essential-parfums-bois-imperial-edp-100',
    brandId: 'essential-parfums',
    name: 'Bois Impérial',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2020,
    country: 'France',
    moods: ['woody', 'fresh', 'spicy'],
    featured: true,
    description: bi(
      'Essential Parfums Bois Impérial — nowoczesny drzewno-pieprzowy niszowy zapach (Quentin Bisch). Oryginał w AromaShop.',
      'Essential Parfums Bois Impérial — сучасний деревно-перцевий нішевий аромат (Quentin Bisch). Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Timut pepper i petioryka — suche, zielone, współczesne drewno.',
      'Перець тимут і петитгрейн — сухе, зелене, сучасне дерево.'
    ),
    story: editorial(
      'Bois Impérial',
      'Essential Parfums',
      'od <strong>pieprzu timut i petigrain</strong>, a baza buduje akord drzewny o mineralnej świeżości.',
      'з <strong>перцю тимут і петитгрейну</strong>, а база будує деревний акорд із мінеральною свіжістю.',
      'Przejrzysty contemporary woody.',
      'Прозорий contemporary woody.'
    ),
    facts: [
      bi('🌲 <strong>Bois Impérial.</strong> Kompozycja Quentina Bisch dla Essential Parfums.', '🌲 <strong>Bois Impérial.</strong> Композиція Quentin Bisch для Essential Parfums.'),
      factOrig('Bois Impérial'),
    ],
    fragrance: {
      families: ['woody', 'aromatic', 'fresh'],
      accords: ['woody', 'fresh-spicy', 'aromatic', 'green'],
      notes: {
        top: ['timut-pepper', 'petigrain', 'bergamot'],
        heart: ['thai-basil', 'gaiac', 'geranium'],
        base: ['indonesian-patchouli', 'woody-notes', 'ambroxan'],
      },
    },
    character: { sweetness: 1, freshness: 4, warmth: 2, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual'],
    },
    similar: ['marc-antoine-barrois-ganymede-edp-100', E.santal, 'burberry-hero-edp-100'],
    tags: ['woody', 'pepper', 'discovery', 'modern'],
  }),

  make({
    id: 'marc-antoine-barrois-ganymede-edp-100',
    brandId: 'marc-antoine-barrois',
    name: 'Ganymede',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2019,
    country: 'France',
    moods: ['mineral', 'woody', 'leather', 'fresh'],
    featured: true,
    description: bi(
      'Marc-Antoine Barrois Ganymede — mineralno-skórzany niszowy zapach Quentina Bisch. Oryginał w AromaShop.',
      'Marc-Antoine Barrois Ganymede — мінерально-шкіряний нішевий аромат Quentin Bisch. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Mandarynka, immortelle i mineralna skóra — kosmicznie nowocześnie.',
      'Мандарин, безсмертник і мінеральна шкіра — космічно сучасно.'
    ),
    story: editorial(
      'Ganymede',
      'Marc-Antoine Barrois',
      'od <strong>mandarynki i immortelle</strong>, a baza buduje mineralną, prawie metaliczną skórę — chłodno i fascynująco.',
      'з <strong>мандарина та безсмертника</strong>, а база будує мінеральну, майже металеву шкіру — прохолодно й захопливо.',
      'Discovery o rzadkim, współczesnym charakterze.',
      'Discovery з рідкісним сучасним характером.'
    ),
    facts: [
      bi('🪐 <strong>Ganymede.</strong> Współczesny mineralny signature MAB × Quentin Bisch.', '🪐 <strong>Ganymede.</strong> Сучасний мінеральний signature MAB × Quentin Bisch.'),
      factOrig('Ganymede'),
    ],
    fragrance: {
      families: ['woody', 'leather', 'fresh'],
      accords: ['mineral', 'leather', 'woody', 'fruity', 'metallic'],
      notes: {
        top: ['mandarin', 'saffron'],
        heart: ['immortelle', 'violet'],
        base: ['suede', 'mineral-notes', 'woody-notes'],
      },
    },
    character: { sweetness: 2, freshness: 3, warmth: 3, intensity: 4 },
    wearing: {
      seasons: ['spring', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'special', 'date'],
    },
    similar: ['essential-parfums-bois-imperial-edp-100', E.santal, 'bdk-gris-charnel-edp-100'],
    tags: ['mineral', 'leather', 'discovery'],
  }),

  make({
    id: 'le-labo-another-13-edp-100',
    brandId: 'le-labo',
    name: 'Another 13',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2010,
    country: 'United States',
    moods: ['skin', 'woody', 'clean', 'musk'],
    featured: true,
    description: bi(
      'Le Labo Another 13 — ambroksanowo-piżmowy niszowy skin scent. Oryginał w AromaShop.',
      'Le Labo Another 13 — амброксаново-мускусний нішевий skin scent. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Ambroksan, mech i gruszka — radiacyjny, miejski, intymny.',
      'Амброксан, мох і груша — радіаційний, міський, інтимний.'
    ),
    story: editorial(
      'Another 13',
      'Le Labo',
      'od miękkiej <strong>gruszki i ambroksanu</strong>, z jaśminem i mchem — skórnie, nowocześnie i trudny do uchwycenia.',
      'з м’якої <strong>груші та амброксану</strong> з жасмином і мохом — шкірно, сучасно й важко вловимо.',
      'Kultowy molecular-urban Le Labo.',
      'Культовий molecular-urban Le Labo.'
    ),
    facts: [
      bi('🧪 <strong>Another 13.</strong> Kompozycja zbudowana wokół współczesnych molekuł i 12 innych składników.', '🧪 <strong>Another 13.</strong> Композиція навколо сучасних молекул і 12 інших інгредієнтів.'),
      factOrig('Another 13'),
    ],
    fragrance: {
      families: ['woody', 'fresh'],
      accords: ['molecular', 'musky', 'woody', 'fruity'],
      notes: {
        top: ['pear', 'apple'],
        heart: ['ambroxan', 'jasmine', 'iso-e-super'],
        base: ['ambroxan', 'oakmoss', 'musk'],
      },
    },
    character: { sweetness: 2, freshness: 3, warmth: 2, intensity: 3 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual', 'date'],
    },
    similar: [E.santal, 'glossier-you-edp-050', 'escentric-molecules-molecule-01-edt-100', 'juliette-has-a-gun-not-a-perfume-edp-100'],
    tags: ['ambroxan', 'skin', 'molecular', 'discovery'],
  }),
];
