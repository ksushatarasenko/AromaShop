/**
 * Merge Master Assortment missing perfumes into luxury.json / niche.json.
 * Also adds brands, notes, accords, moods as needed.
 *
 * Run: node scripts/run-master-assortment.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { newLuxuryPerfumes } from './master-new-perfumes.mjs';
import { newNichePerfumes } from './master-new-perfumes.mjs';
import { newNichePerfumesPart2 } from './master-new-perfumes-part2.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`);

const luxury = read('src/data/perfumes/luxury.json');
const niche = read('src/data/perfumes/niche.json');
const brands = read('src/data/brands.json');
const taxonomy = read('src/data/taxonomy.json');
const notes = read('src/data/notes.json');

const existing = [...luxury, ...niche];
const existingIds = new Set(existing.map((p) => p.id));
const brandIds = new Set(brands.map((b) => b.id));
const noteIds = new Set(notes.map((n) => n.id));
const accordIds = new Set(taxonomy.accords.map((a) => a.id));
const moodIds = new Set(taxonomy.moods.map((m) => m.id));

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function bi(pl, uk) {
  return { pl, uk };
}

const NOTE_LABELS = {
  cherry: ['Wiśnia', 'Вишня'],
  'black-cherry': ['Czarna wiśnia', 'Чорна вишня'],
  lime: ['Limonka', 'Лайм'],
  basil: ['Bazylia', 'Базилік'],
  hibiscus: ['Hibiskus', 'Гібіскус'],
  cognac: ['Koniak', 'Коньяк'],
  praline: ['Pralina', 'Праліне'],
  caramel: ['Karmel', 'Карамель'],
  hazelnut: ['Orzech laskowy', 'Лісовий горіх'],
  'sea-notes': ['Nuty morskie', 'Морські ноти'],
  'mineral-notes': ['Nuty mineralne', 'Мінеральні ноти'],
  sage: ['Szałwia', 'Шавлія'],
  mint: ['Mięta', 'М’ята'],
  raspberry: ['Malina', 'Малина'],
  'red-berries': ['Czerwone jagody', 'Червоні ягоди'],
  magnolia: ['Magnolia', 'Магнолія'],
  freesia: ['Frezja', 'Фрезія'],
  orchid: ['Orchidea', 'Орхідея'],
  cypress: ['Cyprys', 'Кипарис'],
  oak: ['Dąb', 'Дуб'],
  cetalox: ['Cetalox', 'Cetalox'],
  'apple-blossom': ['Kwiat jabłoni', 'Цвіт яблуні'],
  'water-notes': ['Nuty wodne', 'Водні ноти'],
  'aromatic-notes': ['Nuty aromatyczne', 'Ароматичні ноти'],
  'white-flowers': ['Białe kwiaty', 'Білі квіти'],
  'spicy-notes': ['Nuty korzenne', 'Пряні ноти'],
  resins: ['Żywice', 'Смоли'],
  honey: ['Miód', 'Мед'],
  almond: ['Migdał', 'Мигдаль'],
  tonka: ['Tonka', 'Тонка'],
  rum: ['Rum', 'Ром'],
  milk: ['Mleko', 'Молоко'],
  sugar: ['Cukier', 'Цукор'],
  passionfruit: ['Marakuja', 'Маракуя'],
  heliotrope: ['Heliotrop', 'Геліотроп'],
  coriander: ['Kolendra', 'Коріандр'],
  osmanthus: ['Osmanthus', 'Османтус'],
  immortelle: ['Immortelle', 'Безсмертник'],
  suede: ['Zamsz', 'Замша'],
  'timut-pepper': ['Pieprz timut', 'Перець тимут'],
  petigrain: ['Petitgrain', 'Петитгрейн'],
  'thai-basil': ['Bazylia tajska', 'Тайський базилік'],
  gaiac: ['Gwajak', 'Гваяк'],
  'black-tea': ['Czarna herbata', 'Чорний чай'],
  'herbal-notes': ['Nuty ziołowe', 'Трав’яні ноти'],
  'fruity-notes': ['Nuty owocowe', 'Фруктові ноти'],
  'aquatic-notes': ['Nuty wodne', 'Водні ноти'],
  maize: ['Kukurydza', 'Кукурудза'],
  agarwood: ['Agarwood / Oud', 'Агарвуд / Уд'],
  clearwood: ['Clearwood', 'Clearwood'],
  'sicilian-orange': ['Pomarańcza sycylijska', 'Сицилійський апельсин'],
  floral: ['Akord kwiatowy', 'Квітковий акорд'],
  peppery: ['Pieprzność', 'Перцевість'],
  'bourbon-vetiver': ['Wetiwer bourbon', 'Ветивер bourbon'],
};

const NOTE_REMAP = {
  agarwood: 'oud',
  clearwood: 'woody-notes',
  'bourbon-vetiver': 'vetiver',
  'sicilian-orange': 'orange',
  peppery: 'black-pepper',
  floral: 'white-flowers',
  maize: 'woody-notes',
  gaiac: 'guaiac-wood',
  tonka: 'tonka-bean',
};

function addNote(id) {
  if (noteIds.has(id)) return;
  const labels = NOTE_LABELS[id] || [
    id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    id.replace(/-/g, ' '),
  ];
  const [pl, uk] = labels;
  notes.push({
    id,
    name: bi(pl, uk),
    slug: { pl: slugify(pl), uk: slugify(uk) },
    image: `${id}.jpg`,
    category: 'other',
    description: bi(
      `${pl} buduje charakter kompozycji i wspiera sąsiadujące nuty.`,
      `${uk} формує характер композиції та підтримує сусідні ноти.`
    ),
    shortDescription: bi(
      `${pl} buduje charakter kompozycji i wspiera sąsiadujące nuty.`,
      `${uk} формує характер композиції та підтримує сусідні ноти.`
    ),
    origin: bi(
      'Składnik stosowany we współczesnej perfumerii.',
      'Інгредієнт, що використовується в сучасній парфумерії.'
    ),
    extraction: bi(
      'Pozyskiwany naturalnie lub laboratoryjnie w zależności od materiału.',
      'Отримують натурально або лабораторно залежно від матеріалу.'
    ),
    effect: bi(
      `${pl} dodaje kompozycji charakteru i głębi.`,
      `${uk} додає композиції характеру й глибини.`
    ),
    characteristics: {
      pl: ['Charakterystyczny', 'Perfumeryjny'],
      uk: ['Характерний', 'Парфумерний'],
    },
    pairsWith: {
      pl: ['Wanilia', 'Piżmo', 'Drewno'],
      uk: ['Ваніль', 'Мускус', 'Дерево'],
    },
  });
  noteIds.add(id);
}

function remapNotesInPerfume(p) {
  const mapList = (list = []) =>
    list.map((id) => {
      const mapped = NOTE_REMAP[id] || id;
      addNote(mapped);
      return mapped;
    });
  if (p.fragrance?.notes) {
    p.fragrance.notes.top = mapList(p.fragrance.notes.top);
    p.fragrance.notes.heart = mapList(p.fragrance.notes.heart);
    p.fragrance.notes.base = mapList(p.fragrance.notes.base);
  }
  return p;
}

const newBrands = [
  ['valentino', 'Valentino', 'luxury', 'Italy', 'https://www.valentino.com', 'Valentino tworzy współczesne luksusowe zapachy o włoskiej elegancji.', 'Valentino створює сучасні люксові аромати з італійською елегантністю.'],
  ['jo-malone', 'Jo Malone London', 'luxury', 'United Kingdom', 'https://www.jomalone.com', 'Jo Malone London oferuje wyraziste, warstwowe kolonie i EDP o czystym brytyjskim stylu.', 'Jo Malone London пропонує виразні шаруваті одеколони та EDP у чистому британському стилі.'],
  ['montblanc', 'Montblanc', 'luxury', 'Germany', 'https://www.montblanc.com', 'Montblanc łączy dziedzictwo rzemiosła z nowoczesnymi zapachami męskimi.', 'Montblanc поєднує спадщину ремесла із сучасними чоловічими ароматами.'],
  ['giorgio-armani', 'Giorgio Armani', 'luxury', 'Italy', 'https://www.armani.com', 'Giorgio Armani tworzy eleganckie, współczesne zapachy o włoskiej precyzji.', 'Giorgio Armani створює елегантні сучасні аромати з італійською точністю.'],
  ['azzaro', 'Azzaro', 'luxury', 'France', 'https://www.azzaro.com', 'Azzaro oferuje odważne, zmysłowe zapachy męskie.', 'Azzaro пропонує сміливі чуттєві чоловічі аромати.'],
  ['versace', 'Versace', 'luxury', 'Italy', 'https://www.versace.com', 'Versace tworzy świeże i wyraziste zapachy inspirowane śródziemnomorskim luksusem.', 'Versace створює свіжі й виразні аромати, натхненні середземноморською розкішшю.'],
  ['parfums-de-marly', 'Parfums de Marly', 'niche', 'France', 'https://www.parfums-de-marly.com', 'Parfums de Marly tworzy niszowe zapachy inspirowane francuską tradycją królewską.', 'Parfums de Marly створює нішеві аромати, натхненні французькою королівською традицією.'],
  ['xerjoff', 'Xerjoff', 'niche', 'Italy', 'https://www.xerjoff.com', 'Xerjoff to włoski dom niszowy znany z bogatych, wyrafinowanych kompozycji.', 'Xerjoff — італійський нішевий дім, відомий багатими витонченими композиціями.'],
  ['bdk', 'BDK Parfums', 'niche', 'France', 'https://www.bdkparfums.com', 'BDK Parfums tworzy współczesne paryskie zapachy o wyrafinowanym charakterze.', 'BDK Parfums створює сучасні паризькі аромати з витонченим характером.'],
  ['kilian', 'Kilian Paris', 'niche', 'France', 'https://www.bykilian.com', 'Kilian Paris tworzy luksusowe niszowe kompozycje o narracyjnym podejściu.', 'Kilian Paris створює люксові нішеві композиції з наративним підходом.'],
  ['juliette-has-a-gun', 'Juliette Has A Gun', 'niche', 'France', 'https://www.juliettehasagun.com', 'Juliette Has A Gun łączy minimalizm z nowoczesną, często piżmową wrażliwością.', 'Juliette Has A Gun поєднує мінімалізм із сучасною, часто мускусною чутливістю.'],
  ['escentric-molecules', 'Escentric Molecules', 'niche', 'Germany', 'https://www.escentric.com', 'Escentric Molecules bada pojedyncze molekuły zapachowe i ich wpływ na percepcję.', 'Escentric Molecules досліджує окремі парфумерні молекули та їхній вплив на сприйняття.'],
  ['mancera', 'Mancera', 'niche', 'France', 'https://www.mancera-parfums.com', 'Mancera tworzy niszowe, często wyraziste i długotrwałe kompozycje.', 'Mancera створює нішеві, часто виразні й стійкі композиції.'],
  ['montale', 'Montale', 'niche', 'France', 'https://www.montaleparfums.com', 'Montale jest znany z intensywnych niszowych zapachów, w tym oudów i gourmandów.', 'Montale відомий інтенсивними нішевими ароматами, зокрема удами та гурманськими.'],
  ['nishane', 'Nishane', 'niche', 'Turkey', 'https://www.nishane.com', 'Nishane to stambulski dom niszowy tworzący bogate extrait.', 'Nishane — стамбульський нішевий дім, що створює багаті extrait.'],
  ['tiziana-terenzi', 'Tiziana Terenzi', 'niche', 'Italy', 'https://www.tizianaterenzi.com', 'Tiziana Terenzi tworzy narracyjne niszowe zapachy inspirowane podróżą i emocją.', 'Tiziana Terenzi створює наративні нішеві аромати, натхненні подорожжю та емоцією.'],
  ['memo-paris', 'Memo Paris', 'niche', 'France', 'https://www.memoparis.com', 'Memo Paris tworzy podróżnicze niszowe zapachy łączące skórę i orientalne akordy.', 'Memo Paris створює мандрівні нішеві аромати, що поєднують шкіру та східні акорди.'],
  ['nasomatto', 'Nasomatto', 'niche', 'Netherlands', 'https://www.nasomatto.com', 'Nasomatto tworzy intensywne, eksperymentalne extrait o mocnej osobowości.', 'Nasomatto створює інтенсивні експериментальні extrait із сильною особистістю.'],
  ['maison-crivelli', 'Maison Crivelli', 'niche', 'France', 'https://www.maisoncrivelli.com', 'Maison Crivelli tworzy współczesne niszowe zapachy o kontrastowych akordach.', 'Maison Crivelli створює сучасні нішеві аромати з контрастними акордами.'],
  ['essential-parfums', 'Essential Parfums', 'niche', 'France', 'https://www.essentialparfums.com', 'Essential Parfums oferuje przejrzyste, współczesne niszowe kompozycje.', 'Essential Parfums пропонує прозорі сучасні нішеві композиції.'],
  ['marc-antoine-barrois', 'Marc-Antoine Barrois', 'niche', 'France', 'https://www.marcantoinebarrois.com', 'Marc-Antoine Barrois tworzy wyrafinowane niszowe zapachy z Quentinem Bisch.', 'Marc-Antoine Barrois створює витончені нішеві аромати з Quentin Bisch.'],
  ['glossier', 'Glossier', 'luxury', 'United States', 'https://www.glossier.com', 'Glossier to współczesna marka beauty znana z miękkiego skórnego zapachu You.', 'Glossier — сучасний beauty-бренд, відомий м’яким шкірним ароматом You.'],
];

const addedBrands = [];
for (const [id, name, type, country, website, pl, uk] of newBrands) {
  if (brandIds.has(id)) continue;
  brands.push({
    id,
    name,
    slug: id,
    type,
    country,
    logo: `${id}.png`,
    description: bi(pl, uk),
    website,
  });
  brandIds.add(id);
  addedBrands.push(id);
}

const newAccords = [
  ['tobacco', 'Tytoniowy', 'Тютюновий'],
  ['cherry', 'Wiśniowy', 'Вишневий'],
  ['aquatic', 'Wodny', 'Водний'],
  ['boozy', 'Alkoholowy', 'Алкогольний'],
  ['mineral', 'Mineralny', 'Мінеральний'],
  ['molecular', 'Molekularny', 'Молекулярний'],
];
const addedAccords = [];
for (const [id, pl, uk] of newAccords) {
  if (accordIds.has(id)) continue;
  taxonomy.accords.push({ id, pl, uk });
  accordIds.add(id);
  addedAccords.push(id);
}

const newMoods = [
  ['spicy', 'Korzenne', 'Пряні', 'Kompozycje z wyraźnym udziałem przypraw.', 'Композиції з виразною часткою спецій.'],
  ['skin', 'Skórne', 'Шкірні', 'Zapachy bliskie skóry — miękkie i intymne.', 'Аромати близькі до шкіри — м’які й інтимні.'],
  ['citrus', 'Cytrusowe', 'Цитрусові', 'Świetliste kompozycje zbudowane wokół cytrusów.', 'Світлі композиції навколо цитрусів.'],
  ['aquatic', 'Wodne / morskie', 'Водні / морські', 'Świeże, wodne i mineralne zapachy.', 'Свіжі водні й мінеральні аромати.'],
  ['leather', 'Skórzane', 'Шкіряні', 'Kompozycje z akordem skóry.', 'Композиції зі шкіряним акордом.'],
  ['oud', 'Oud', 'Уд', 'Głębokie kompozycje z udziałem oud.', 'Глибокі композиції з удом.'],
  ['tobacco', 'Tytoniowe', 'Тютюнові', 'Ciepłe, dymne zapachy z akordem tytoniu.', 'Теплі димні аромати з тютюновим акордом.'],
  ['coffee', 'Kawowe', 'Кавові', 'Kompozycje zbudowane wokół kawy.', 'Композиції навколо кави.'],
  ['cherry', 'Wiśniowe', 'Вишневі', 'Owocowe, często ciemne profile z wiśnią.', 'Фруктові, часто темні профілі з вишнею.'],
  ['aromatic', 'Aromatyczne', 'Ароматичні', 'Zielono-ziołowe, aromatyczne kompozycje.', 'Зелено-трав’яні ароматичні композиції.'],
  ['mineral', 'Mineralne', 'Мінеральні', 'Chłodne, kamienne, współczesne profile.', 'Холодні кам’яні сучасні профілі.'],
];
const addedMoods = [];
for (const [id, pl, uk, dpl, duk] of newMoods) {
  if (moodIds.has(id)) continue;
  taxonomy.moods.push({
    id,
    pl,
    uk,
    description: bi(dpl, duk),
  });
  moodIds.add(id);
  addedMoods.push(id);
}

const candidates = [
  ...newLuxuryPerfumes,
  ...newNichePerfumes,
  ...newNichePerfumesPart2,
].map(remapNotesInPerfume);

const skipped = [];
const added = [];

for (const perfume of candidates) {
  if (existingIds.has(perfume.id)) {
    skipped.push({ id: perfume.id, reason: 'id-exists' });
    continue;
  }
  // brand+name+concentration soft check
  const dup = existing.find(
    (p) =>
      p.brandId === perfume.brandId &&
      p.name.toLowerCase() === perfume.name.toLowerCase() &&
      p.concentration === perfume.concentration
  );
  if (dup) {
    skipped.push({ id: perfume.id, reason: `name-match:${dup.id}` });
    continue;
  }
  if (!brandIds.has(perfume.brandId)) {
    throw new Error(`Missing brandId: ${perfume.brandId} for ${perfume.id}`);
  }
  // validate moods/accords/families exist
  for (const m of perfume.moods || []) {
    if (!moodIds.has(m)) throw new Error(`Unknown mood ${m} on ${perfume.id}`);
  }
  for (const a of perfume.fragrance?.accords || []) {
    if (!accordIds.has(a)) throw new Error(`Unknown accord ${a} on ${perfume.id}`);
  }
  for (const f of perfume.fragrance?.families || []) {
    if (!taxonomy.families.some((x) => x.id === f)) {
      throw new Error(`Unknown family ${f} on ${perfume.id}`);
    }
  }

  if (perfume.collection === 'luxury') luxury.push(perfume);
  else niche.push(perfume);

  existingIds.add(perfume.id);
  existing.push(perfume);
  added.push(perfume.id);
}

// Validate similar refs
const allIds = new Set([...luxury, ...niche].map((p) => p.id));
const brokenSimilar = [];
for (const p of [...luxury, ...niche]) {
  for (const sid of p.similar || []) {
    if (!allIds.has(sid)) brokenSimilar.push(`${p.id} -> ${sid}`);
  }
}

write('src/data/brands.json', brands);
write('src/data/taxonomy.json', taxonomy);
write('src/data/notes.json', notes);
write('src/data/perfumes/luxury.json', luxury);
write('src/data/perfumes/niche.json', niche);

const report = {
  existingBefore: existing.length - added.length,
  requestedUnique: candidates.length,
  added: added.length,
  skipped: skipped.length,
  addedIds: added,
  skippedItems: skipped,
  addedBrands,
  addedAccords,
  addedMoods,
  notesCount: notes.length,
  brokenSimilar,
  luxuryCount: luxury.length,
  nicheCount: niche.length,
  total: luxury.length + niche.length,
};

write('scripts/master-assortment-report.json', report);
console.log(JSON.stringify(report, null, 2));
