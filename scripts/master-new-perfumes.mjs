/** New Master Assortment perfumes (missing only). */
const d = (enabled = true) => ({
  enabled,
  sizes: [1, 5, 10, 15, 20],
  pricePerMl: null,
});

const bi = (pl, uk) => ({ pl, uk });

function make(p) {
  return {
    featured: !!p.featured,
    new: true,
    bestseller: !!p.bestseller,
    decant: d(),
    image: 'main.jpg',
    gallery: ['02.jpg', '03.jpg'],
    id: p.id,
    brandId: p.brandId,
    name: p.name,
    collection: p.collection,
    gender: p.gender,
    concentration: p.concentration,
    year: p.year ?? null,
    perfumer: p.perfumer || '',
    country: p.country || '',
    moods: p.moods || [],
    description: p.description,
    shortDescription: p.shortDescription,
    story: p.story,
    facts: p.facts || [],
    fragrance: p.fragrance,
    character: p.character,
    wearing: p.wearing,
    performance: p.performance || { longevity: 4, sillage: 3 },
    sizes: [{ ml: p.ml || 100, price: null, stock: true }],
    similar: p.similar || [],
    tags: p.tags || [],
  };
}

function editorial(name, brand, openPl, openUk, closePl, closeUk) {
  return bi(
    `${name} otwiera się ${openPl}\n\nZ czasem kompozycja nabiera głębi i osobowości, pozostając wierna charakterowi ${brand}.\n\n<strong>${closePl}</strong>`,
    `${name} починається ${openUk}\n\nЗгодом композиція набирає глибини й особистості, лишаючись вірною характеру ${brand}.\n\n<strong>${closeUk}</strong>`
  );
}

function factOrig(brand) {
  return bi(
    `🛍️ <strong>Oryginalny produkt.</strong> ${brand} w AromaShop to oryginalny produkt.`,
    `🛍️ <strong>Оригінальний продукт.</strong> ${brand} в AromaShop — оригінальний продукт.`
  );
}

const E = {
  blackOpium: 'ysl-black-opium-edp-090',
  libre: 'ysl-libre-edp-090',
  oudWood: 'tom-ford-oud-wood-edp-050',
  sauvage: 'dior-sauvage-edp-100',
  chance: 'chanel-chance-eau-tendre-edt-100',
  lsm: 'maison-margiela-replica-lazy-sunday-morning-edt-100',
  tobaccoVanille: 'tom-ford-tobacco-vanille-edp-100',
  forHer: 'narciso-rodriguez-for-her-edp-100',
  vanilla28: 'kayali-vanilla-28-edp-100',
  paradoxe: 'prada-paradoxe-edp-090',
  goddess: 'burberry-goddess-edp-100',
  aventus: 'creed-aventus-edp-100',
  gypsy: 'byredo-gypsy-water-edp-100',
  santal: 'le-labo-santal-33-edp-100',
  philosykos: 'diptyque-philosykos-edt-100',
  oudGreatness: 'initio-oud-for-greatness-edp-090',
  baccarat: 'mfk-baccarat-rouge-540-edp-070',
  blanche: 'byredo-blanche-edp-100',
  grandSoir: 'mfk-grand-soir-edp-070',
};

export const newLuxuryPerfumes = [
  make({
    id: 'tom-ford-lost-cherry-edp-050',
    brandId: 'tom-ford',
    name: 'Lost Cherry',
    collection: 'luxury',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2018,
    country: 'United States',
    ml: 50,
    moods: ['cherry', 'gourmand', 'dark', 'sweet', 'evening'],
    featured: true,
    description: bi(
      'Tom Ford Lost Cherry Eau de Parfum — ciemna gourmandowa wiśnia z migdałem i tonką. Oryginał w AromaShop.',
      'Tom Ford Lost Cherry Eau de Parfum — темна гурманська вишня з мигдалем і тонкою. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Dojrzała, alkoholowa wiśnia w luksusowym deserowym wydaniu.',
      'Зріла алкогольна вишня в люксовому десертному звучанні.'
    ),
    story: editorial(
      'Lost Cherry',
      'Tom Ford',
      'od <strong>czarnej wiśni i gorzkiego migdału</strong> — dojrzało, lekko alkoholowo, bez cukierkowej dosłowności. W sercu pojawiają się róża i jaśmin, a baza łączy tonkę, sandałowiec i ciepłe balsamy.',
      'з <strong>чорної вишні та гіркого мигдалю</strong> — зріло, трохи алкогольно, без цукеркової буквальності. У серці — троянда й жасмин, а база поєднує тонку, сандал і теплі бальзами.',
      'Lost Cherry brzmi jak zabroniony deser w eleganckim flakonie.',
      'Lost Cherry звучить як заборонений десерт в елегантному флаконі.'
    ),
    facts: [
      bi('🍒 <strong>Private Blend.</strong> Lost Cherry należy do linii Tom Ford Private Blend.', '🍒 <strong>Private Blend.</strong> Lost Cherry належить до лінії Tom Ford Private Blend.'),
      factOrig('Lost Cherry'),
    ],
    fragrance: {
      families: ['gourmand', 'fruity', 'floral'],
      accords: ['cherry', 'sweet', 'fruity', 'woody', 'vanilla'],
      notes: {
        top: ['black-cherry', 'cherry', 'almond'],
        heart: ['cherry', 'rose', 'jasmine'],
        base: ['tonka-bean', 'vanilla', 'sandalwood', 'cashmere-wood', 'benzoin'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 4, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['date', 'evening', 'special', 'party'],
    },
    performance: { longevity: 4, sillage: 4 },
    similar: [E.tobaccoVanille, E.vanilla28, E.blackOpium],
    tags: ['cherry', 'gourmand', 'trend', 'evening'],
  }),

  make({
    id: 'valentino-donna-born-in-roma-intense-edp-100',
    brandId: 'valentino',
    name: 'Donna Born in Roma Intense',
    collection: 'luxury',
    gender: 'women',
    concentration: 'EDP',
    year: 2022,
    country: 'Italy',
    moods: ['modern-feminine', 'warm-vanilla', 'floral', 'sweet'],
    featured: true,
    bestseller: true,
    description: bi(
      'Valentino Donna Born in Roma Intense — kwiatowo-waniliowy zapach o miejskim, intensywnym charakterze. Oryginał w AromaShop.',
      'Valentino Donna Born in Roma Intense — квітково-ванільний аромат із міським інтенсивним характером. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Intensywniejsza Born in Roma: wanilia, białe kwiaty, miejska kobiecość.',
      'Інтенсивніша Born in Roma: ваніль, білі квіти, міська жіночність.'
    ),
    story: editorial(
      'Donna Born in Roma Intense',
      'Valentino',
      'od <strong>czarnej porzeczki i różowego pieprzu</strong>, przechodzi w białe kwiaty, a baza opiera się na wanilii bourbon i drzewnych akordach.',
      'з <strong>чорної смородини та рожевого перцю</strong>, переходить у білі квіти, а база тримається на ванілі bourbon і деревних акордах.',
      'Współczesna rzymska kobiecość w cieplejszym wydaniu.',
      'Сучасна римська жіночність у теплішому звучанні.'
    ),
    facts: [
      bi('🏙️ <strong>Intense.</strong> Cieplejszy flanker linii Born in Roma.', '🏙️ <strong>Intense.</strong> Тепліший фланкер лінії Born in Roma.'),
      factOrig('Donna Born in Roma Intense'),
    ],
    fragrance: {
      families: ['floral', 'oriental'],
      accords: ['vanilla', 'white-floral', 'sweet', 'fruity', 'woody'],
      notes: {
        top: ['blackcurrant', 'pink-pepper'],
        heart: ['white-flowers', 'jasmine'],
        base: ['vanilla', 'woody-notes', 'benzoin'],
      },
    },
    character: { sweetness: 4, freshness: 2, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'evening', 'party'],
    },
    similar: [E.paradoxe, E.goddess, E.libre],
    tags: ['vanilla', 'floral', 'modern', 'core'],
  }),

  make({
    id: 'prada-paradoxe-intense-edp-090',
    brandId: 'prada',
    name: 'Paradoxe Intense',
    collection: 'luxury',
    gender: 'women',
    concentration: 'EDP',
    year: 2023,
    country: 'Italy',
    ml: 90,
    moods: ['modern-feminine', 'warm-vanilla', 'amber', 'evening'],
    featured: true,
    description: bi(
      'Prada Paradoxe Intense — głębsza, cieplejsza wersja Paradoxe z wanilią i ambrą. Oryginał w AromaShop.',
      'Prada Paradoxe Intense — глибша, тепліша версія Paradoxe з ваніллю та амброю. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Paradoxe z większą dawką wanilii i wieczorowej ambry.',
      'Paradoxe з більшою дозою ванілі та вечірньої амбри.'
    ),
    story: editorial(
      'Paradoxe Intense',
      'Prada',
      'od kwiatowo-nerolowego światła, ale szybko przesuwa akcent na <strong>ciepłą wanilię i ambrę</strong>.',
      'з квітково-неролієвого світла, але швидко зміщує акцент на <strong>теплу ваніль і амбру</strong>.',
      'Ten sam paradoks, głębsze brzmienie.',
      'Той самий парадокс, глибше звучання.'
    ),
    facts: [
      bi('🔁 <strong>Flanker.</strong> Intensywniejsza interpretacja Paradoxe.', '🔁 <strong>Фланкер.</strong> Інтенсивніша інтерпретація Paradoxe.'),
      factOrig('Paradoxe Intense'),
    ],
    fragrance: {
      families: ['floral', 'oriental'],
      accords: ['vanilla', 'amber', 'white-floral', 'musky', 'woody'],
      notes: {
        top: ['pear', 'bergamot', 'orange-blossom'],
        heart: ['jasmine', 'neroli'],
        base: ['vanilla', 'amber', 'white-musk', 'sandalwood'],
      },
    },
    character: { sweetness: 4, freshness: 2, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['date', 'evening', 'special'],
    },
    similar: [E.paradoxe, E.goddess, E.grandSoir],
    tags: ['paradoxe', 'intense', 'vanilla'],
  }),

  make({
    id: 'narciso-rodriguez-pure-musc-for-her-edp-100',
    brandId: 'narciso-rodriguez',
    name: 'Pure Musc For Her',
    collection: 'luxury',
    gender: 'women',
    concentration: 'EDP',
    year: 2019,
    country: 'United States',
    moods: ['musk', 'clean', 'skin', 'floral'],
    featured: true,
    description: bi(
      'Narciso Rodriguez Pure Musc For Her — czyste, miękkie piżmo z kwiatem pomarańczy. Oryginał w AromaShop.',
      'Narciso Rodriguez Pure Musc For Her — чистий м’який мускус із квіткою апельсина. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Czyste skórne piżmo — miękkie, intymne i nowoczesne.',
      'Чистий шкірний мускус — м’який, інтимний і сучасний.'
    ),
    story: editorial(
      'Pure Musc',
      'Narciso Rodriguez',
      'od <strong>białego piżma</strong> wspartego delikatnym kwiatem pomarańczy — blisko skóry, bez ciężkiej słodyczy.',
      'з <strong>білого мускусу</strong> з ніжною квіткою апельсина — близько до шкіри, без важкої солодкості.',
      'Piżmo w najczystszej współczesnej formie.',
      'Мускус у найчистішій сучасній формі.'
    ),
    facts: [
      bi('🤍 <strong>Musc.</strong> Minimalistyczna kompozycja z linii For Her.', '🤍 <strong>Musc.</strong> Мінімалістична композиція з лінії For Her.'),
      factOrig('Pure Musc For Her'),
    ],
    fragrance: {
      families: ['floral', 'woody'],
      accords: ['musky', 'powdery', 'white-floral', 'woody'],
      notes: {
        top: ['orange-blossom'],
        heart: ['white-musk'],
        base: ['cashmeran', 'woody-notes'],
      },
    },
    character: { sweetness: 2, freshness: 3, warmth: 3, intensity: 3 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual', 'date'],
    },
    similar: [E.forHer, E.blanche, E.lsm],
    tags: ['musk', 'clean', 'skin'],
  }),

  make({
    id: 'jo-malone-lime-basil-mandarin-cologne-100',
    brandId: 'jo-malone',
    name: 'Lime Basil & Mandarin',
    collection: 'luxury',
    gender: 'unisex',
    concentration: 'EDC',
    year: 1999,
    country: 'United Kingdom',
    moods: ['citrus', 'fresh', 'clean'],
    featured: true,
    bestseller: true,
    description: bi(
      'Jo Malone London Lime Basil & Mandarin Cologne — świeży cytrusowo-ziołowy klasyk. Oryginał w AromaShop.',
      'Jo Malone London Lime Basil & Mandarin Cologne — свіжий цитрусово-трав’яний класик. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Limonka, bazylia i mandarynka w czystym brytyjskim stylu.',
      'Лайм, базилік і мандарин у чистому британському стилі.'
    ),
    story: editorial(
      'Lime Basil & Mandarin',
      'Jo Malone London',
      'od <strong>energetycznej limonki i mandarynki</strong>, a bazylia dodaje zielonej struktury. Baza jest czysta i biało-drzewna.',
      'з <strong>енергійного лайма та мандарина</strong>, а базилік додає зеленої структури. База чиста й біло-деревна.',
      'Klasyczna świeżość Jo Malone.',
      'Класична свіжість Jo Malone.'
    ),
    facts: [
      bi('🍋 <strong>Signature.</strong> Jedna z najbardziej rozpoznawalnych kompozycji Jo Malone.', '🍋 <strong>Signature.</strong> Одна з найбільш упізнаваних композицій Jo Malone.'),
      factOrig('Lime Basil & Mandarin'),
    ],
    fragrance: {
      families: ['citrus', 'aromatic', 'fresh'],
      accords: ['citrus', 'aromatic', 'green', 'fresh-spicy'],
      notes: {
        top: ['lime', 'mandarin', 'bergamot'],
        heart: ['basil', 'aromatic-notes'],
        base: ['white-musk', 'woody-notes', 'patchouli'],
      },
    },
    character: { sweetness: 1, freshness: 5, warmth: 1, intensity: 3 },
    wearing: {
      seasons: ['spring', 'summer'],
      timeOfDay: ['day'],
      occasions: ['daily', 'office', 'casual'],
    },
    similar: [E.gypsy, E.philosykos, E.chance],
    tags: ['citrus', 'green', 'summer', 'core'],
  }),

  make({
    id: 'montblanc-explorer-edp-100',
    brandId: 'montblanc',
    name: 'Explorer',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2019,
    country: 'Germany',
    moods: ['woody', 'fresh', 'citrus'],
    featured: true,
    bestseller: true,
    description: bi(
      'Montblanc Explorer Eau de Parfum — świeżo-drzewny zapach z bergamotką, wetiwerem i paczulą. Oryginał w AromaShop.',
      'Montblanc Explorer Eau de Parfum — свіжо-деревний аромат із бергамотом, ветивером і пачулі. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Nowoczesny męski klasyk: cytrusy, wetiwer i suchy charakter przygody.',
      'Сучасний чоловічий класик: цитруси, ветивер і сухий характер пригоди.'
    ),
    story: editorial(
      'Explorer',
      'Montblanc',
      'od <strong>bergamotki i różowego pieprzu</strong>, a następnie przechodzi w wetiwer, paczulę i kakao — świeżo, nowocześnie i zdecydowanie.',
      'з <strong>бергамоту та рожевого перцю</strong>, а далі — ветивер, пачулі й какао — свіжо, сучасно й впевнено.',
      'Przystępny luksus o wyraźnym męskim charakterze.',
      'Доступна розкіш із виразним чоловічим характером.'
    ),
    facts: [
      bi('🧭 <strong>Explorer.</strong> Współczesny bestseller Montblanc w segmencie accessible modern.', '🧭 <strong>Explorer.</strong> Сучасний бестселер Montblanc у сегменті accessible modern.'),
      factOrig('Explorer'),
    ],
    fragrance: {
      families: ['woody', 'aromatic', 'citrus'],
      accords: ['woody', 'citrus', 'aromatic', 'earthy', 'fresh-spicy'],
      notes: {
        top: ['bergamot', 'pink-pepper', 'sage'],
        heart: ['vetiver', 'leather'],
        base: ['patchouli', 'cacao', 'ambroxan', 'woody-notes'],
      },
    },
    character: { sweetness: 2, freshness: 4, warmth: 3, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual', 'date'],
    },
    similar: [E.sauvage, E.aventus],
    tags: ['woody', 'fresh', 'men', 'core'],
  }),

  make({
    id: 'giorgio-armani-stronger-with-you-intensely-edp-100',
    brandId: 'giorgio-armani',
    name: 'Stronger With You Intensely',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2019,
    country: 'Italy',
    moods: ['warm-vanilla', 'sweet', 'spicy', 'evening'],
    featured: true,
    bestseller: true,
    description: bi(
      'Giorgio Armani Stronger With You Intensely — słodko-korzenny męski zapach z wanilią, kasztanem i toffi. Oryginał w AromaShop.',
      'Giorgio Armani Stronger With You Intensely — солодко-пряний чоловічий аромат із ваніллю, каштаном і тоффі. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Ciepły, słodki i zmysłowy męski gourmand na chłodniejsze miesiące.',
      'Теплий, солодкий і чуттєвий чоловічий gourmand на прохолодні місяці.'
    ),
    story: editorial(
      'Stronger With You Intensely',
      'Giorgio Armani',
      'od korzennej słodyczy i <strong>wanilii</strong>, budując ciepły, otulający charakter z nutami toffi i drzewnymi akordami.',
      'з пряної солодкості та <strong>ванілі</strong>, будуючи теплий обволікаючий характер із нотами тоффі та деревними акордами.',
      'Męska słodycz bez infantylności.',
      'Чоловіча солодкість без інфантильності.'
    ),
    facts: [
      bi('🍬 <strong>Intensely.</strong> Jedna z najpopularniejszych słodkich kompozycji Armani.', '🍬 <strong>Intensely.</strong> Одна з найпопулярніших солодких композицій Armani.'),
      factOrig('Stronger With You Intensely'),
    ],
    fragrance: {
      families: ['oriental', 'gourmand', 'spicy'],
      accords: ['vanilla', 'sweet', 'warm-spicy', 'woody', 'amber'],
      notes: {
        top: ['pink-pepper', 'juniper-berries', 'sage'],
        heart: ['lavender', 'sage', 'cinnamon'],
        base: ['vanilla', 'tonka-bean', 'amber', 'woody-notes', 'caramel'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['date', 'evening', 'party', 'casual'],
    },
    similar: [E.tobaccoVanille, E.blackOpium, 'azzaro-the-most-wanted-edp-intense-100'],
    tags: ['sweet', 'vanilla', 'men', 'winter'],
  }),

  make({
    id: 'ysl-y-edp-100',
    brandId: 'ysl',
    name: 'Y',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2018,
    country: 'France',
    moods: ['fresh', 'woody', 'aromatic'],
    featured: true,
    description: bi(
      'Yves Saint Laurent Y Eau de Parfum — świeżo-aromatyczny męski zapach z jabłkiem, szałwią i ambroxanem. Oryginał w AromaShop.',
      'Yves Saint Laurent Y Eau de Parfum — свіжо-ароматичний чоловічий аромат із яблуком, шавлією та амброксаном. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Nowoczesna męska świeżość YSL: jabłko, zioła i czyste drewno.',
      'Сучасна чоловіча свіжість YSL: яблуко, трави й чисте дерево.'
    ),
    story: editorial(
      'Y',
      'Yves Saint Laurent',
      'od <strong>świeżego jabłka i bergamotki</strong>, a serce budują szałwia i geranium. Baza jest ambroksanowa i drzewna.',
      'з <strong>свіжого яблука та бергамоту</strong>, а серце будують шавлія й герань. База амброксанова й деревна.',
      'Męski, miejski i zdecydowany.',
      'Чоловічий, міський і впевнений.'
    ),
    facts: [
      bi('𝗬 <strong>Y EDP.</strong> Współczesny filar męskiej linii YSL.', '𝗬 <strong>Y EDP.</strong> Сучасний стовп чоловічої лінії YSL.'),
      factOrig('Y'),
    ],
    fragrance: {
      families: ['aromatic', 'fresh', 'woody'],
      accords: ['aromatic', 'fresh-spicy', 'woody', 'citrus', 'green'],
      notes: {
        top: ['apple', 'bergamot', 'ginger'],
        heart: ['sage', 'geranium', 'juniper-berries'],
        base: ['ambroxan', 'cedar', 'tonka-bean', 'vetiver'],
      },
    },
    character: { sweetness: 2, freshness: 4, warmth: 2, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual', 'date'],
    },
    similar: [E.sauvage, 'montblanc-explorer-edp-100', 'chanel-bleu-de-chanel-edp-100'],
    tags: ['fresh', 'aromatic', 'men', 'core'],
  }),

  make({
    id: 'valentino-uomo-born-in-roma-intense-edp-100',
    brandId: 'valentino',
    name: 'Uomo Born in Roma Intense',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2021,
    country: 'Italy',
    moods: ['woody', 'spicy', 'warm-vanilla', 'evening'],
    featured: true,
    description: bi(
      'Valentino Uomo Born in Roma Intense — korzenno-drzewny męski zapach z wanilią i wetiwerem. Oryginał w AromaShop.',
      'Valentino Uomo Born in Roma Intense — пряно-деревний чоловічий аромат із ваніллю та ветивером. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Intensywny, nowoczesny męski Valentino — ciepło, przyprawy, wetiwer.',
      'Інтенсивний сучасний чоловічий Valentino — тепло, спеції, ветивер.'
    ),
    story: editorial(
      'Uomo Born in Roma Intense',
      'Valentino',
      'od korzennej świeżości i <strong>wetiweru</strong>, przechodząc w cieplejszą, waniliowo-drzewną bazę.',
      'з пряної свіжості та <strong>ветиверу</strong>, переходячи в теплішу ванільно-деревну базу.',
      'Miejska męskość Rzymu w intensywniejszym tonie.',
      'Міська мужність Риму в інтенсивнішому тоні.'
    ),
    facts: [
      bi('🗡️ <strong>Intense.</strong> Wyrazistszy flanker Uomo Born in Roma.', '🗡️ <strong>Intense.</strong> Виразніший фланкер Uomo Born in Roma.'),
      factOrig('Uomo Born in Roma Intense'),
    ],
    fragrance: {
      families: ['woody', 'aromatic', 'spicy'],
      accords: ['woody', 'warm-spicy', 'aromatic', 'vanilla'],
      notes: {
        top: ['lavender', 'mineral-notes'],
        heart: ['sage', 'vetiver'],
        base: ['vanilla', 'woody-notes', 'tonka-bean'],
      },
    },
    character: { sweetness: 3, freshness: 2, warmth: 4, intensity: 4 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'evening', 'office'],
    },
    similar: ['ysl-y-edp-100', E.sauvage, 'montblanc-explorer-edp-100'],
    tags: ['woody', 'men', 'intense'],
  }),

  make({
    id: 'azzaro-the-most-wanted-edp-intense-100',
    brandId: 'azzaro',
    name: 'The Most Wanted EDP Intense',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2021,
    country: 'France',
    moods: ['sweet', 'spicy', 'warm-vanilla', 'evening'],
    featured: true,
    bestseller: true,
    description: bi(
      'Azzaro The Most Wanted Eau de Parfum Intense — słodko-korzenny męski zapach z toffi, kardamonem i ambra. Oryginał w AromaShop.',
      'Azzaro The Most Wanted Eau de Parfum Intense — солодко-пряний чоловічий аромат із тоффі, кардамоном та амброю. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Uzależniająca męska słodycz: toffi, kardamon, ciepło.',
      'Залежна чоловіча солодкість: тоффі, кардамон, тепло.'
    ),
    story: editorial(
      'The Most Wanted Intense',
      'Azzaro',
      'od <strong>kardamonu i toffi</strong> — słodko, korzennie i bardzo współcześnie. Baza jest ambrowa i otulająca.',
      'з <strong>кардамону та тоффі</strong> — солодко, пряно й дуже сучасно. База амброва й обволікаюча.',
      'Głośny, ciepły i zapamiętywalny.',
      'Гучний, теплий і той, що запам’ятовується.'
    ),
    facts: [
      bi('🔥 <strong>Wanted Intense.</strong> Popularny słodki profil w męskim segmencie designer.', '🔥 <strong>Wanted Intense.</strong> Популярний солодкий профіль у чоловічому designer-сегменті.'),
      factOrig('The Most Wanted EDP Intense'),
    ],
    fragrance: {
      families: ['oriental', 'gourmand', 'spicy'],
      accords: ['sweet', 'warm-spicy', 'vanilla', 'amber', 'woody'],
      notes: {
        top: ['cardamom', 'ginger'],
        heart: ['caramel', 'lavender'],
        base: ['amber', 'tonka-bean', 'woody-notes'],
      },
    },
    character: { sweetness: 5, freshness: 1, warmth: 5, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['date', 'party', 'evening'],
    },
    similar: ['giorgio-armani-stronger-with-you-intensely-edp-100', E.tobaccoVanille],
    tags: ['sweet', 'men', 'winter', 'core'],
  }),

  make({
    id: 'giorgio-armani-acqua-di-gio-profondo-edp-125',
    brandId: 'giorgio-armani',
    name: 'Acqua di Giò Profondo',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2020,
    country: 'Italy',
    ml: 125,
    moods: ['aquatic', 'fresh', 'citrus'],
    featured: true,
    bestseller: true,
    description: bi(
      'Giorgio Armani Acqua di Giò Profondo — wodno-mineralny męski zapach z nutami morskimi i aromatycznymi. Oryginał w AromaShop.',
      'Giorgio Armani Acqua di Giò Profondo — водно-мінеральний чоловічий аромат із морськими та ароматичними нотами. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Głębsza, mineralna interpretacja Acqua di Giò — ocean i świeżość.',
      'Глибша мінеральна інтерпретація Acqua di Giò — океан і свіжість.'
    ),
    story: editorial(
      'Acqua di Giò Profondo',
      'Giorgio Armani',
      'od <strong>morskich i mineralnych nut</strong>, wspartych cytrusami i aromatycznymi ziołami. Baza jest czysto-drzewna i wodna.',
      'з <strong>морських і мінеральних нот</strong> із цитрусами та ароматичними травами. База чисто-деревна й водна.',
      'Śródziemnomorski chłód w głębszym wydaniu.',
      'Середземноморська прохолода в глибшому звучанні.'
    ),
    facts: [
      bi('🌊 <strong>Profondo.</strong> Współczesny wodny filar linii Acqua di Giò.', '🌊 <strong>Profondo.</strong> Сучасний водний стовп лінії Acqua di Giò.'),
      factOrig('Acqua di Giò Profondo'),
    ],
    fragrance: {
      families: ['aquatic', 'aromatic', 'fresh'],
      accords: ['aquatic', 'aromatic', 'fresh-spicy', 'mineral', 'woody'],
      notes: {
        top: ['sea-notes', 'bergamot', 'green-notes'],
        heart: ['lavender', 'aromatic-notes', 'cypress'],
        base: ['mineral-notes', 'patchouli', 'amber', 'musk'],
      },
    },
    character: { sweetness: 1, freshness: 5, warmth: 1, intensity: 3 },
    wearing: {
      seasons: ['spring', 'summer'],
      timeOfDay: ['day'],
      occasions: ['daily', 'casual', 'office'],
    },
    similar: ['giorgio-armani-acqua-di-gio-edp-100', 'versace-man-eau-fraiche-edt-100', E.sauvage],
    tags: ['aquatic', 'summer', 'men', 'core'],
  }),

  make({
    id: 'versace-man-eau-fraiche-edt-100',
    brandId: 'versace',
    name: 'Man Eau Fraîche',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDT',
    year: 2006,
    country: 'Italy',
    moods: ['fresh', 'citrus', 'aquatic'],
    featured: false,
    description: bi(
      'Versace Man Eau Fraîche Eau de Toilette — lekki, cytrusowo-wodny męski zapach. Oryginał w AromaShop.',
      'Versace Man Eau Fraîche Eau de Toilette — легкий цитрусово-водний чоловічий аромат. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Lekka śródziemnomorska świeżość na ciepło.',
      'Легка середземноморська свіжість на спеку.'
    ),
    story: editorial(
      'Man Eau Fraîche',
      'Versace',
      'od <strong>cytrusów i nut wodnych</strong>, z lekką drzewną bazą — powietrznie i bez ciężaru.',
      'з <strong>цитрусів і водних нот</strong> із легкою деревною базою — повітряно й без важкості.',
      'Klasyczna letnia świeżość Versace.',
      'Класична літня свіжість Versace.'
    ),
    facts: [
      bi('☀️ <strong>Eau Fraîche.</strong> Lekki profil na ciepłe miesiące.', '☀️ <strong>Eau Fraîche.</strong> Легкий профіль на теплі місяці.'),
      factOrig('Man Eau Fraîche'),
    ],
    fragrance: {
      families: ['citrus', 'aquatic', 'aromatic'],
      accords: ['citrus', 'aquatic', 'aromatic', 'woody'],
      notes: {
        top: ['lemon', 'bergamot', 'rosewood'],
        heart: ['aromatic-notes', 'sage', 'cedar'],
        base: ['musk', 'amber', 'woody-notes'],
      },
    },
    character: { sweetness: 1, freshness: 5, warmth: 1, intensity: 2 },
    wearing: {
      seasons: ['spring', 'summer'],
      timeOfDay: ['day'],
      occasions: ['daily', 'casual'],
    },
    similar: ['giorgio-armani-acqua-di-gio-profondo-edp-125', 'giorgio-armani-acqua-di-gio-edp-100'],
    tags: ['fresh', 'summer', 'men', 'seasonal'],
  }),

  make({
    id: 'chanel-bleu-de-chanel-edp-100',
    brandId: 'chanel',
    name: 'Bleu de Chanel',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2014,
    country: 'France',
    moods: ['woody', 'fresh', 'aromatic', 'luxury'],
    featured: true,
    bestseller: true,
    description: bi(
      'Chanel Bleu de Chanel Eau de Parfum — elegancki świeżo-drzewny męski klasyk. Oryginał w AromaShop.',
      'Chanel Bleu de Chanel Eau de Parfum — елегантний свіжо-деревний чоловічий класик. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Ponadczasowa męska elegancja Chanel: cytrusy, zioła, suche drewno.',
      'Позачасова чоловіча елегантність Chanel: цитруси, трави, сухе дерево.'
    ),
    story: editorial(
      'Bleu de Chanel',
      'Chanel',
      'od <strong>cytrusów i aromatycznych ziół</strong>, a baza buduje suche, szlachetne drewno i współczesny ambroksanowy charakter.',
      'з <strong>цитрусів і ароматичних трав</strong>, а база будує сухе шляхетне дерево та сучасний амброксановий характер.',
      'Męski luksus bez ostentacji.',
      'Чоловіча розкіш без демонстративності.'
    ),
    facts: [
      bi('🔵 <strong>Bleu EDP.</strong> Jeden z najważniejszych współczesnych męskich zapachów Chanel.', '🔵 <strong>Bleu EDP.</strong> Один із найважливіших сучасних чоловічих ароматів Chanel.'),
      factOrig('Bleu de Chanel'),
    ],
    fragrance: {
      families: ['woody', 'aromatic', 'fresh'],
      accords: ['woody', 'citrus', 'aromatic', 'fresh-spicy', 'smoky'],
      notes: {
        top: ['grapefruit', 'lemon', 'mint', 'pink-pepper'],
        heart: ['ginger', 'nutmeg', 'jasmine'],
        base: ['incense', 'cedar', 'sandalwood', 'labdanum', 'white-musk'],
      },
    },
    character: { sweetness: 1, freshness: 4, warmth: 3, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'date', 'special', 'evening'],
    },
    similar: [E.sauvage, 'ysl-y-edp-100', 'montblanc-explorer-edp-100'],
    tags: ['woody', 'classic', 'men', 'core'],
  }),

  make({
    id: 'giorgio-armani-acqua-di-gio-edp-100',
    brandId: 'giorgio-armani',
    name: 'Acqua di Giò',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2013,
    country: 'Italy',
    moods: ['aquatic', 'fresh', 'citrus'],
    featured: true,
    description: bi(
      'Giorgio Armani Acqua di Giò Eau de Parfum — klasyczna wodno-cytrusowa świeżość. Oryginał w AromaShop.',
      'Giorgio Armani Acqua di Giò Eau de Parfum — класична водно-цитрусова свіжість. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Ikoniczna morska świeżość Armani w wersji EDP.',
      'Іконічна морська свіжість Armani у версії EDP.'
    ),
    story: editorial(
      'Acqua di Giò',
      'Giorgio Armani',
      'od <strong>cytrusów i nut morskich</strong>, z aromatycznym sercem i czystą, lekką bazą.',
      'з <strong>цитрусів і морських нот</strong> з ароматичним серцем і чистою легкою базою.',
      'Ponadczasowy letni klasyk.',
      'Позачасовий літній класик.'
    ),
    facts: [
      bi('🌊 <strong>Acqua di Giò EDP.</strong> Klasyczna linia w bardziej skoncentrowanym wydaniu.', '🌊 <strong>Acqua di Giò EDP.</strong> Класична лінія в більш концентрованому звучанні.'),
      factOrig('Acqua di Giò'),
    ],
    fragrance: {
      families: ['aquatic', 'citrus', 'aromatic'],
      accords: ['aquatic', 'citrus', 'aromatic', 'fresh-spicy'],
      notes: {
        top: ['bergamot', 'lemon', 'neroli'],
        heart: ['sea-notes', 'jasmine', 'aromatic-notes'],
        base: ['cedar', 'white-musk', 'patchouli'],
      },
    },
    character: { sweetness: 1, freshness: 5, warmth: 1, intensity: 3 },
    wearing: {
      seasons: ['spring', 'summer'],
      timeOfDay: ['day'],
      occasions: ['daily', 'casual', 'office'],
    },
    similar: ['giorgio-armani-acqua-di-gio-profondo-edp-125', 'versace-man-eau-fraiche-edt-100'],
    tags: ['aquatic', 'classic', 'summer', 'men'],
  }),

  make({
    id: 'burberry-hero-edp-100',
    brandId: 'burberry',
    name: 'Hero',
    collection: 'luxury',
    gender: 'men',
    concentration: 'EDP',
    year: 2021,
    country: 'United Kingdom',
    moods: ['woody', 'fresh', 'spicy'],
    featured: true,
    description: bi(
      'Burberry Hero Eau de Parfum — drzewny męski zapach z cedrem i przyprawami. Oryginał w AromaShop.',
      'Burberry Hero Eau de Parfum — деревний чоловічий аромат із кедром і спеціями. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Cedr w centrum: nowoczesny, suchy i brytyjsko-elegancki.',
      'Кедр у центрі: сучасний, сухий і британсько-елегантний.'
    ),
    story: editorial(
      'Hero',
      'Burberry',
      'od korzennej świeżości i przechodzi w <strong>potrójny akord cedru</strong> — sucho, nowocześnie i zdecydowanie.',
      'з пряної свіжості й переходить у <strong>потрійний акорд кедра</strong> — сухо, сучасно й впевнено.',
      'Drzewny charakter bez ciężkiej orientalności.',
      'Деревний характер без важкої орієнтальності.'
    ),
    facts: [
      bi('🌲 <strong>Hero.</strong> Cedrowy filar współczesnej męskiej linii Burberry.', '🌲 <strong>Hero.</strong> Кедровий стовп сучасної чоловічої лінії Burberry.'),
      factOrig('Hero'),
    ],
    fragrance: {
      families: ['woody', 'aromatic'],
      accords: ['woody', 'aromatic', 'fresh-spicy', 'warm-spicy'],
      notes: {
        top: ['bergamot', 'black-pepper', 'juniper-berries'],
        heart: ['cedar', 'cedarwood', 'virginia-cedar'],
        base: ['cedar', 'benzoin', 'ambroxan'],
      },
    },
    character: { sweetness: 1, freshness: 3, warmth: 3, intensity: 4 },
    wearing: {
      seasons: ['spring', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'date', 'casual'],
    },
    similar: ['chanel-bleu-de-chanel-edp-100', E.oudWood, 'montblanc-explorer-edp-100'],
    tags: ['woody', 'cedar', 'men'],
  }),

  make({
    id: 'glossier-you-edp-050',
    brandId: 'glossier',
    name: 'You',
    collection: 'luxury',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2017,
    country: 'United States',
    ml: 50,
    moods: ['skin', 'musk', 'clean', 'fresh'],
    featured: true,
    description: bi(
      'Glossier You Eau de Parfum — miękki skórny zapach z pieprzem, irysem i ambroxanem. Oryginał w AromaShop.',
      'Glossier You Eau de Parfum — м’який шкірний аромат із перцем, ірисом та амброксаном. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Zapach „Twojej skóry, ale lepszej” — miękki, intymny, współczesny.',
      'Аромат «твоєї шкіри, але кращої» — м’який, інтимний, сучасний.'
    ),
    story: editorial(
      'You',
      'Glossier',
      'od <strong>różowego pieprzu</strong>, a następnie staje się irysowo-ambroksanowy — bliski skóry i trudny do opisania wprost.',
      'з <strong>рожевого перцю</strong>, а далі стає ірисово-амброксановим — близький до шкіри й важкий для буквального опису.',
      'Molekularna miękkość zamiast głośnego statement.',
      'Молекулярна м’якість замість гучного statement.'
    ),
    facts: [
      bi('🤍 <strong>Skin scent.</strong> Kultowy miękki profil Glossier.', '🤍 <strong>Skin scent.</strong> Культовий м’який профіль Glossier.'),
      factOrig('You'),
    ],
    fragrance: {
      families: ['woody', 'floral'],
      accords: ['musky', 'powdery', 'warm-spicy', 'woody', 'molecular'],
      notes: {
        top: ['pink-pepper'],
        heart: ['iris'],
        base: ['ambroxan'],
      },
    },
    character: { sweetness: 2, freshness: 3, warmth: 3, intensity: 2 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'office', 'casual', 'date'],
    },
    similar: [E.lsm, E.forHer, 'juliette-has-a-gun-not-a-perfume-edp-100', 'le-labo-another-13-edp-100'],
    tags: ['skin', 'molecular', 'discovery', 'clean'],
  }),
];

export const newNichePerfumes = [
  make({
    id: 'diptyque-fleur-de-peau-edp-075',
    brandId: 'diptyque',
    name: 'Fleur de Peau',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2018,
    country: 'France',
    ml: 75,
    moods: ['musk', 'skin', 'floral', 'clean'],
    featured: true,
    description: bi(
      'Diptyque Fleur de Peau Eau de Parfum — piżmowo-irysowy zapach o skórnym charakterze. Oryginał w AromaShop.',
      'Diptyque Fleur de Peau Eau de Parfum — мускусно-ірисовий аромат зі шкірним характером. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Kwiat skóry: irys, piżmo i miękka zmysłowość.',
      'Квітка шкіри: ірис, мускус і м’яка чуттєвість.'
    ),
    story: editorial(
      'Fleur de Peau',
      'Diptyque',
      'od <strong>irysa i piżma</strong> — pudrowo, skórnie i nowocześnie, bez ciężkiej orientalności.',
      'з <strong>ірису та мускусу</strong> — пудрово, шкірно й сучасно, без важкої орієнтальності.',
      'Jedna z najbardziej „skórnych” kompozycji Diptyque.',
      'Одна з найбільш «шкірних» композицій Diptyque.'
    ),
    facts: [
      bi('🤍 <strong>Fleur de Peau.</strong> Piżmowo-irysowa kompozycja o intymnym charakterze.', '🤍 <strong>Fleur de Peau.</strong> Мускусно-ірисова композиція з інтимним характером.'),
      factOrig('Fleur de Peau'),
    ],
    fragrance: {
      families: ['floral', 'woody'],
      accords: ['musky', 'powdery', 'floral', 'woody'],
      notes: {
        top: ['pink-pepper'],
        heart: ['iris', 'rose'],
        base: ['white-musk', 'ambrette', 'woody-notes'],
      },
    },
    character: { sweetness: 2, freshness: 2, warmth: 3, intensity: 3 },
    wearing: {
      seasons: ['spring', 'autumn', 'winter'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'office', 'special'],
    },
    similar: [E.blanche, E.lsm, 'glossier-you-edp-050', E.philosykos],
    tags: ['musk', 'iris', 'skin', 'discovery'],
  }),

  make({
    id: 'parfums-de-marly-layton-edp-125',
    brandId: 'parfums-de-marly',
    name: 'Layton',
    collection: 'niche',
    gender: 'unisex',
    concentration: 'EDP',
    year: 2016,
    country: 'France',
    ml: 125,
    moods: ['woody', 'spicy', 'sweet', 'warm-vanilla'],
    featured: true,
    bestseller: true,
    description: bi(
      'Parfums de Marly Layton — jabłkowo-korzenny niszowy zapach z wanilią i drzewami. Oryginał w AromaShop.',
      'Parfums de Marly Layton — яблучно-пряний нішевий аромат із ваніллю та деревами. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Soczyste jabłko, przyprawy i luksusowa słodycz PdM.',
      'Соковите яблуко, спеції та люксова солодкість PdM.'
    ),
    story: editorial(
      'Layton',
      'Parfums de Marly',
      'od <strong>jabłka i bergamotki</strong>, a następnie rozkwita geranium, lawendą i wanilią w bogatej drzewnej bazie.',
      'з <strong>яблука та бергамоту</strong>, а далі розквітає геранню, лавандою й ваніллю в багатій деревній базі.',
      'Jeden z najbardziej rozpoznawalnych współczesnych PdM.',
      'Один із найбільш упізнаваних сучасних PdM.'
    ),
    facts: [
      bi('🐎 <strong>Layton.</strong> Filowy niszowy bestseller Parfums de Marly.', '🐎 <strong>Layton.</strong> Ключовий нішевий бестселер Parfums de Marly.'),
      factOrig('Layton'),
    ],
    fragrance: {
      families: ['oriental', 'woody', 'aromatic'],
      accords: ['vanilla', 'woody', 'warm-spicy', 'aromatic', 'sweet'],
      notes: {
        top: ['apple', 'bergamot', 'lavender'],
        heart: ['geranium', 'violet', 'jasmine'],
        base: ['vanilla', 'cardamom', 'sandalwood', 'pepper', 'guaiac-wood'],
      },
    },
    character: { sweetness: 4, freshness: 2, warmth: 4, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter', 'spring'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'evening', 'special'],
    },
    similar: [E.aventus, E.baccarat, 'parfums-de-marly-delina-edp-075'],
    tags: ['pdm', 'woody', 'sweet', 'core'],
  }),

  make({
    id: 'parfums-de-marly-delina-edp-075',
    brandId: 'parfums-de-marly',
    name: 'Delina',
    collection: 'niche',
    gender: 'women',
    concentration: 'EDP',
    year: 2017,
    country: 'France',
    ml: 75,
    moods: ['floral', 'sweet', 'modern-feminine'],
    featured: true,
    bestseller: true,
    description: bi(
      'Parfums de Marly Delina — różano-owocowy niszowy zapach z maliną, piwonią i wanilią. Oryginał w AromaShop.',
      'Parfums de Marly Delina — трояндово-фруктовий нішевий аромат із малиною, півонією та ваніллю. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Nowoczesna róża PdM: owocowa, kremowa i bardzo charakterystyczna.',
      'Сучасна троянда PdM: фруктова, кремова й дуже характерна.'
    ),
    story: editorial(
      'Delina',
      'Parfums de Marly',
      'od <strong>owocowej świeżości i róży</strong> — z piwonią w sercu oraz waniliowo-piżmową bazą.',
      'з <strong>фруктової свіжості та троянди</strong> — з півонією в серці та ванільно-мускусною базою.',
      'Kobieca ikona współczesnego niche.',
      'Жіноча ікона сучасного niche.'
    ),
    facts: [
      bi('🌹 <strong>Delina.</strong> Jedna z najbardziej rozpoznawalnych róż niszowych dekady.', '🌹 <strong>Delina.</strong> Одна з найбільш упізнаваних нішевих троянд десятиліття.'),
      factOrig('Delina'),
    ],
    fragrance: {
      families: ['floral', 'fruity'],
      accords: ['rose', 'fruity', 'floral', 'sweet', 'musky'],
      notes: {
        top: ['raspberry', 'pear', 'bergamot'],
        heart: ['rose', 'peony', 'nutmeg'],
        base: ['vanilla', 'cashmeran', 'musk', 'cedar'],
      },
    },
    character: { sweetness: 4, freshness: 3, warmth: 3, intensity: 4 },
    wearing: {
      seasons: ['spring', 'summer', 'autumn'],
      timeOfDay: ['day', 'evening'],
      occasions: ['daily', 'date', 'special', 'evening'],
    },
    similar: [E.chance, E.libre, 'parfums-de-marly-delina-exclusif-edp-075'],
    tags: ['rose', 'fruity', 'women', 'core'],
  }),

  make({
    id: 'parfums-de-marly-delina-exclusif-edp-075',
    brandId: 'parfums-de-marly',
    name: 'Delina Exclusif',
    collection: 'niche',
    gender: 'women',
    concentration: 'EDP',
    year: 2018,
    country: 'France',
    ml: 75,
    moods: ['floral', 'gourmand', 'sweet', 'evening'],
    featured: true,
    description: bi(
      'Parfums de Marly Delina Exclusif — głębsza, bardziej gourmandowa interpretacja Deliny. Oryginał w AromaShop.',
      'Parfums de Marly Delina Exclusif — глибша, більш гурманська інтерпретація Delina. Оригінал в AromaShop.'
    ),
    shortDescription: bi(
      'Delina w wersji bogatszej: więcej wanilii, więcej głębi, więcej wieczoru.',
      'Delina в багатшій версії: більше ванілі, більше глибини, більше вечора.'
    ),
    story: editorial(
      'Delina Exclusif',
      'Parfums de Marly',
      'od owocowo-różowego charakteru Deliny, ale z wyraźniejszym <strong>waniliowo-gourmandowym</strong> ciężarem.',
      'з фруктово-трояндового характеру Delina, але з виразнішою <strong>ванільно-гурманською</strong> глибиною.',
      'Dla tych, którzy chcą Deliny ciemniejszej i bogatszej.',
      'Для тих, хто хоче темнішої й багатшої Delina.'
    ),
    facts: [
      bi('🌹 <strong>Exclusif.</strong> Bogatszy flanker Deliny.', '🌹 <strong>Exclusif.</strong> Багатший фланкер Delina.'),
      factOrig('Delina Exclusif'),
    ],
    fragrance: {
      families: ['floral', 'gourmand', 'oriental'],
      accords: ['rose', 'vanilla', 'sweet', 'fruity', 'woody'],
      notes: {
        top: ['raspberry', 'pear', 'bergamot'],
        heart: ['rose', 'incense', 'vetiver'],
        base: ['vanilla', 'oud', 'sandalwood', 'white-musk'],
      },
    },
    character: { sweetness: 5, freshness: 2, warmth: 4, intensity: 5 },
    wearing: {
      seasons: ['autumn', 'winter'],
      timeOfDay: ['evening', 'night'],
      occasions: ['date', 'evening', 'special'],
    },
    similar: ['parfums-de-marly-delina-edp-075', E.vanilla28, E.grandSoir],
    tags: ['rose', 'gourmand', 'exclusif'],
  }),
];

// Remaining niche continued in master-new-perfumes-part2.mjs
export { bi, make, editorial, factOrig, E, d };
