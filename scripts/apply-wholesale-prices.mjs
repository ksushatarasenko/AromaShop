/**
 * Match AromaShop catalog ↔ wholesale Excel and apply retail prices.
 *
 * Rules: USD×3.80; bottle ×1.10; decant ×1.15 + 7 PLN
 * Do NOT overwrite existing non-null bottle prices (curated).
 *
 * Run: node scripts/apply-wholesale-prices.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import {
  PRICE_LIST_DATE,
  USD_TO_PLN,
  wholesalePln,
  retailBottlePrice,
  wholesaleCostPerMl,
  decantPricePerMlFromWholesale,
  decantRetailPrice,
  parseVolume,
  selectBestProcurement,
} from '../src/utils/wholesalePricing.js';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const EXCEL =
  '/Users/marinatarasenko/Downloads/Прайс-лист № 1 (Украина) — парфюмерия.xlsx';

const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const write = (p, data) =>
  fs.writeFileSync(path.join(root, p), `${JSON.stringify(data, null, 2)}\n`);

/* -------------------------------------------------------------------------- */
/* Matchers: each perfume id → filter function on (name, volume)              */
/* -------------------------------------------------------------------------- */

const CONC = {
  edt: (n) => /туалетная вода/i.test(n),
  edp: (n) => /парфюмированная вода|парфюмерная вода/i.test(n),
  extrait: (n) => /extrait|духи/i.test(n) && !/парфюмированная вода/i.test(n),
  cologne: (n) => /одеколон|cologne/i.test(n),
  parfumAsDukhi: (n) => /духи/i.test(n),
};

function nameIs(n, re) {
  return re.test(n);
}

function exclude(n, re) {
  return !re.test(n);
}

/** Explicit matchers — prefer exact product/version */
const MATCHERS = {
  'ysl-black-opium-edp-090': (n) =>
    /Yves Saint Laurent Black Opium\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Extreme|Intense|Glitter|Neon|Illicit|Over Red|Nuit Blanche|Le Parfum|туалетная|EDT/i),

  'ysl-libre-edp-090': (n) =>
    /Yves Saint Laurent Libre\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /L['’]Eau|Flowers|Absolu|Intense|Le Parfum|EDT|туалетная|Floral|Cellar/i),

  'tom-ford-oud-wood-edp-050': (n) =>
    /Tom Ford Oud Wood\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /духи|Parfum|Intense|Oud Wood Absolu/i),

  'dior-sauvage-edp-100': (n) =>
    /Christian Dior Sauvage\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Elixir|Parfum|Extreme|Absolu|Very Cool|туалетная|EDT|\+|refill|300/i),

  'chanel-chance-eau-tendre-edt-100': (n) =>
    /Chanel Chance Eau Tendre\b/i.test(n) &&
    CONC.edt(n) &&
    exclude(n, /Eau de Parfum|парфюмированная|EDP/i),

  'creed-aventus-edp-100': (n) =>
    /Creed Aventus\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Absolu|Cologne|for Her|Fir|Millesime/i),

  'byredo-gypsy-water-edp-100': (n) =>
    /Byredo Gypsy Water\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /\+|La Selection|Nomade/i),

  'le-labo-santal-33-edp-100': (n) =>
    /Le Labo Santal 33\b/i.test(n) && CONC.edp(n) && exclude(n, /\*/),

  'diptyque-philosykos-edt-100': (n) =>
    /Diptyque Philosykos\b/i.test(n) && CONC.edt(n),

  'initio-oud-for-greatness-edp-090': (n) =>
    /Initio Oud for Greatness\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Neo/i),

  // Catalog concentration is Extrait (name), not EDP
  'mfk-baccarat-rouge-540-edp-070': (n) =>
    /Maison Francis Kurkdjian Baccarat Rouge 540 Extrait/i.test(n) &&
    /духи|Extrait/i.test(n) &&
    exclude(n, /\*|набор/i),

  'maison-margiela-replica-lazy-sunday-morning-edt-100': (n) =>
    /Maison Martin Margiela Replica Lazy Sunday Morning|Maison Margiela Replica Lazy Sunday Morning/i.test(
      n
    ) && CONC.edt(n),

  'clean-warm-cotton-edp-060': null, // not in list (Cool Cotton ≠ Warm Cotton)

  'tom-ford-tobacco-vanille-edp-100': (n) =>
    /Tom Ford Tobacco Vanille\b/i.test(n) && CONC.edp(n) && exclude(n, /Dramming|\*/),

  'narciso-rodriguez-for-her-edp-100': (n) =>
    /Narciso Rodriguez For Her\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(
      n,
      /Pure Musc|Forever|Absolu|Fleur Musc|Musc Noir|All Of Me|Intense|In Color|Musc Collection|Musc Nude|EDT|туалетная/i
    ),

  'kayali-vanilla-28-edp-100': null,

  'prada-paradoxe-edp-090': (n) =>
    /Prada Paradoxe\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Intense|Virtual|Absolu/i),

  'burberry-goddess-edp-100': (n) =>
    /Burberry Goddess\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Intense|духи|Parfum/i),

  'byredo-blanche-edp-100': (n) =>
    /Byredo Blanche\b/i.test(n) && CONC.edp(n) && exclude(n, /\+|Selection|Nomade/i),

  'mfk-grand-soir-edp-070': (n) =>
    /Maison Francis Kurkdjian Grand Soir\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /\*|набор|Baccarat/i),

  'tom-ford-lost-cherry-edp-050': (n) =>
    /Tom Ford Lost Cherry\b/i.test(n) && CONC.edp(n) && exclude(n, /Dramming|,|Rose Prick|\*/),

  'valentino-donna-born-in-roma-intense-edp-100': (n) =>
    /Valentino Donna Born in Roma Intense\b/i.test(n) && CONC.edp(n),

  'prada-paradoxe-intense-edp-090': (n) =>
    /Prada Paradoxe Intense\b/i.test(n) && CONC.edp(n),

  'narciso-rodriguez-pure-musc-for-her-edp-100': (n) =>
    /Narciso Rodriguez Pure Musc\b/i.test(n) && CONC.edp(n),

  'jo-malone-lime-basil-mandarin-cologne-100': (n) =>
    /Jo Malone Lime Basil & Mandarin\b/i.test(n) && CONC.cologne(n),

  'montblanc-explorer-edp-100': (n) =>
    /Mont Blanc Explorer\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Platinum|Ultra|Extreme|Legacy/i),

  'giorgio-armani-stronger-with-you-intensely-edp-100': (n) =>
    /Giorgio Armani Emporio Armani Stronger With You Intensely|Giorgio Armani Stronger With You Intensely|Emporio Armani Stronger With You Intensely/i.test(
      n
    ) && CONC.edp(n),

  'ysl-y-edp-100': (n) =>
    /Yves Saint Laurent Y Eau de Parfum\b/i.test(n) && CONC.edp(n),

  'valentino-uomo-born-in-roma-intense-edp-100': (n) =>
    /Valentino Uomo Born in Roma Intense\b/i.test(n) && CONC.edp(n),

  'azzaro-the-most-wanted-edp-intense-100': (n) =>
    /Azzaro The Most Wanted.*Intense|Azzaro Wanted.*Eau de Parfum Intense|Azzaro The Most Wanted Eau de Parfum Intense/i.test(
      n
    ),

  'giorgio-armani-acqua-di-gio-profondo-edp-125': (n) =>
    /Giorgio Armani Acqua di Gi[oò] Profondo\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /духи|Lights|туалетная/i),

  'versace-man-eau-fraiche-edt-100': (n) =>
    /Versace Man Eau Fra[iî]che\b/i.test(n) && CONC.edt(n),

  'chanel-bleu-de-chanel-edp-100': (n) =>
    /Chanel Bleu [Dd]e Chanel\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Parfum|духи|All-Over|L['’]Exclusif|туалетная|EDT/i),

  // Catalog EDP — only Pour Homme Eau de Parfum rows (often 200 ml)
  'giorgio-armani-acqua-di-gio-edp-100': (n) =>
    /Giorgio Armani Acqua di Gi[oò] Pour Homme Eau de Parfum\b/i.test(n) && CONC.edp(n),

  'burberry-hero-edp-100': (n) =>
    /Burberry Hero\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Parfum|духи|Intense|Goddess/i),

  'glossier-you-edp-050': null,

  'diptyque-fleur-de-peau-edp-075': (n) =>
    /Diptyque Fleur de Peau\b/i.test(n) && CONC.edp(n),

  'parfums-de-marly-layton-edp-125': (n) =>
    /Parfums de Marly Layton\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Exclusif|\*/),

  'parfums-de-marly-delina-edp-075': (n) =>
    /Parfums de Marly Delina\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Exclusif|La Ros[eé]e|\*/),

  'parfums-de-marly-delina-exclusif-edp-075': (n) =>
    /Parfums de Marly Delina Exclusif\b/i.test(n) && CONC.edp(n) && exclude(n, /духи/),

  'xerjoff-naxos-edp-100': (n) =>
    /Xerjoff (XJ 1861 )?Naxos\b/i.test(n) && CONC.edp(n) && exclude(n, /\+|Alexandria/),

  'bdk-gris-charnel-edp-100': (n) =>
    /BDK.*Gris Charnel|Maison BDK Gris Charnel|Gris Charnel\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Extrait|духи/),

  'kilian-angels-share-edp-050': (n) =>
    /Kilian.*Angels['’]? Share|By Kilian Angels['’]? Share/i.test(n) &&
    CONC.edp(n),

  'juliette-has-a-gun-not-a-perfume-edp-100': (n) =>
    /Juliette Has A Gun Not A Perfume\b/i.test(n) &&
    exclude(n, /Superdose|Another/i),

  'escentric-molecules-molecule-01-edt-100': (n) =>
    /Escentric Molecules Molecule 01\b/i.test(n) &&
    CONC.edt(n) &&
    exclude(n, /\+|Limited|Iris|Patchouli|Mandarin|Ginger|Guaiac/i),

  'mancera-cedrat-boise-edp-120': (n) =>
    /Mancera Cedrat Boise\b/i.test(n) && CONC.edp(n) && exclude(n, /Intense/),

  'mancera-instant-crush-edp-120': (n) =>
    /Mancera Instant Crush\b/i.test(n) && CONC.edp(n),

  'mancera-red-tobacco-edp-120': (n) =>
    /Mancera Red Tobacco\b/i.test(n) && CONC.edp(n),

  'mancera-roses-vanille-edp-120': (n) =>
    /Mancera Roses Vanille\b/i.test(n) && CONC.edp(n),

  'mancera-amore-caffe-edp-120': (n) =>
    /Mancera Amore Caff[eèé]\b/i.test(n) && CONC.edp(n),

  'mancera-intense-cedrat-boise-edp-120': (n) =>
    /Mancera Intense Cedrat Boise\b/i.test(n) && CONC.edp(n),

  'montale-arabians-tonka-edp-100': (n) =>
    /Montale Arabians Tonka\b/i.test(n) && CONC.edp(n),

  'montale-intense-cafe-edp-100': (n) =>
    /Montale Intense Caf[eé]\b/i.test(n) && CONC.edp(n),

  'montale-roses-musk-edp-100': (n) =>
    /Montale Roses Musk\b/i.test(n) && CONC.edp(n),

  'montale-black-aoud-edp-100': (n) =>
    /Montale Black Aoud\b/i.test(n) && CONC.edp(n),

  'montale-vanilla-cake-edp-100': (n) =>
    /Montale Vanilla Cake\b/i.test(n) && CONC.edp(n),

  'montale-aoud-lemon-mint-edp-100': (n) =>
    /Montale Aoud Lemon Mint\b/i.test(n) && CONC.edp(n),

  'nishane-hacivat-extrait-100': (n) =>
    /Nishane Hacivat\b/i.test(n) &&
    /духи|Extrait/i.test(n) &&
    exclude(n, /Hacivat X\b|Hacivat Oud/i),

  'nishane-ani-extrait-100': (n) =>
    /Nishane Ani\b/i.test(n) && /духи|Extrait/i.test(n),

  'nishane-hundred-silent-ways-extrait-100': (n) =>
    /Nishane Hundred Silent Ways\b/i.test(n) && /духи|Extrait/i.test(n),

  'tiziana-terenzi-kirke-extrait-100': (n) =>
    /Tiziana Terenzi Kirke\b/i.test(n) && exclude(n, /\*/),

  'mfk-gentle-fluidity-gold-edp-070': (n) =>
    /Maison Francis Kurkdjian Gentle Fluidity Gold\b/i.test(n) &&
    CONC.edp(n) &&
    exclude(n, /Silver|\*/),

  'initio-side-effect-edp-090': (n) =>
    /Initio Side Effect\b/i.test(n) && CONC.edp(n),

  'memo-paris-african-leather-edp-075': (n) =>
    /Memo (Paris )?African Leather\b/i.test(n) && CONC.edp(n),

  'nasomatto-black-afgano-extrait-030': (n) =>
    /Nasomatto Black Afgano\b/i.test(n),

  'xerjoff-erba-pura-edp-100': (n) =>
    /Xerjoff Erba Pura\b/i.test(n) && CONC.edp(n) && exclude(n, /\+/),

  'maison-crivelli-hibiscus-mahajad-extrait-050': (n) =>
    /Maison Crivelli Hibiscus Mahaj[aá]d\b/i.test(n),

  'essential-parfums-bois-imperial-edp-100': (n) =>
    /Essential Parfums Bois Imp[eé]rial\b/i.test(n) && CONC.edp(n),

  'marc-antoine-barrois-ganymede-edp-100': (n) =>
    /Marc[- ]Antoine Barrois Ganym[eè]de\b/i.test(n) && CONC.edp(n),

  'le-labo-another-13-edp-100': (n) =>
    /Le Labo Another 13\b/i.test(n) && CONC.edp(n),
};

/* -------------------------------------------------------------------------- */
/* Load Excel                                                                 */
/* -------------------------------------------------------------------------- */

const wb = XLSX.readFile(EXCEL);
const sheet = wb.Sheets[wb.SheetNames[0]];
const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

const excelRows = [];
for (let i = 7; i < raw.length; i++) {
  const row = raw[i];
  const article = row?.[0];
  const name = row?.[1];
  const volume = row?.[2];
  const usd = row?.[3];
  if (!name || usd == null || typeof usd !== 'number') continue;
  // skip brand headers
  if (!volume) continue;
  const parsed = parseVolume(volume);
  excelRows.push({
    article: String(article),
    name: String(name),
    volume: String(volume),
    usd,
    ...parsed,
  });
}

console.log('Excel product rows:', excelRows.length);

const luxury = read('src/data/perfumes/luxury.json');
const niche = read('src/data/perfumes/niche.json');
const all = [...luxury, ...niche];

const audit = [];
const unmatched = [];
const ambiguous = [];
const testerOnly = [];
const curatedPreserved = [];
const updated = [];
const flags = [];

function hasCuratedPrice(perfume) {
  return (perfume.sizes || []).some((s) => s.price != null && !Number.isNaN(Number(s.price)));
}

function matchRows(perfumeId) {
  const matcher = MATCHERS[perfumeId];
  if (matcher === null) return { status: 'unmatched', rows: [] };
  if (!matcher) return { status: 'no-matcher', rows: [] };
  const rows = excelRows.filter((r) => matcher(r.name));
  return { status: rows.length ? 'matched' : 'unmatched', rows };
}

function buildOptions(rows) {
  return rows.map((r) => ({
    article: r.article,
    name: r.name,
    volume: r.volume,
    usd: r.usd,
    ml: r.ml,
    tester: r.tester,
    multipack: r.multipack,
    wholesalePln: wholesalePln(r.usd),
    costPerMl: r.ml ? wholesaleCostPerMl(r.usd, r.ml) : null,
  }));
}

for (const perfume of all) {
  const { status, rows } = matchRows(perfume.id);
  const entry = {
    id: perfume.id,
    brandId: perfume.brandId,
    name: perfume.name,
    concentration: perfume.concentration,
    curated: hasCuratedPrice(perfume),
    status,
  };

  if (status === 'no-matcher') {
    unmatched.push({ ...entry, reason: 'no matcher defined' });
    audit.push({ ...entry, action: 'skip-no-matcher' });
    continue;
  }

  if (status === 'unmatched' || !rows.length) {
    unmatched.push({ ...entry, reason: 'not found in Excel' });
    audit.push({ ...entry, action: 'unmatched' });
    continue;
  }

  const options = buildOptions(rows);
  const originals = options.filter((o) => !o.tester && !o.multipack && o.ml >= 25);
  const testers = options.filter((o) => o.tester && !o.multipack && o.ml >= 25);

  if (!originals.length && testers.length) {
    testerOnly.push({
      ...entry,
      testers: testers.map((t) => ({
        article: t.article,
        ml: t.ml,
        usd: t.usd,
        pln: t.wholesalePln,
        plnPerMl: t.costPerMl,
      })),
      note: 'TESTER AVAILABLE — REQUIRES BUSINESS DECISION',
    });
    audit.push({ ...entry, action: 'tester-only', testers });
    continue;
  }

  if (!originals.length) {
    unmatched.push({ ...entry, reason: 'no usable original bottle size' });
    audit.push({ ...entry, action: 'no-original-size', options });
    continue;
  }

  // Allow 200ml for ADG EDP exception
  let selected = selectBestProcurement(options);
  if (!selected && perfume.id === 'giorgio-armani-acqua-di-gio-edp-100') {
    const large = originals
      .filter((o) => o.ml >= 25 && o.ml <= 200)
      .map((o) => ({
        ...o,
        wholesalePln: wholesalePln(o.usd),
        costPerMl: wholesaleCostPerMl(o.usd, o.ml),
        retail: retailBottlePrice(o.usd),
      }))
      .sort((a, b) => a.costPerMl - b.costPerMl);
    selected = large[0] || null;
  }

  if (!selected) {
    unmatched.push({ ...entry, reason: 'could not select size' });
    audit.push({ ...entry, action: 'no-selection', options });
    continue;
  }

  // Flag if multiple distinct product name stems (ambiguity risk)
  const nameStems = new Set(originals.map((o) => o.name.replace(/\s+объем.*/i, '').trim()));
  if (nameStems.size > 3) {
    ambiguous.push({
      ...entry,
      note: 'Many distinct Excel name variants matched — review',
      names: [...nameStems].slice(0, 8),
    });
  }

  const decants = [1, 5, 10, 15, 20].map((ml) => ({
    ml,
    price: decantRetailPrice(selected.usd, selected.ml, ml),
  }));

  const calculated = {
    selectedArticle: selected.article,
    selectedName: selected.name,
    selectedVolume: selected.volume,
    selectedMl: selected.ml,
    wholesaleUsd: selected.usd,
    wholesalePln: selected.wholesalePln,
    costPerMl: Math.round(selected.costPerMl * 100) / 100,
    retailBottle: selected.retail,
    decantPricePerMl: decantPricePerMlFromWholesale(selected.usd, selected.ml),
    decants,
    originalOptions: originals
      .filter((o) => o.ml >= 25 && o.ml <= 200)
      .map((o) => ({
        article: o.article,
        ml: o.ml,
        usd: o.usd,
        pln: wholesalePln(o.usd),
        plnPerMl: Math.round(wholesaleCostPerMl(o.usd, o.ml) * 100) / 100,
        tester: false,
      })),
    testerOptions: testers
      .filter((o) => o.ml >= 25 && o.ml <= 200)
      .map((o) => ({
        article: o.article,
        ml: o.ml,
        usd: o.usd,
        pln: wholesalePln(o.usd),
        plnPerMl: Math.round(wholesaleCostPerMl(o.usd, o.ml) * 100) / 100,
        note: 'TESTER — not used for retail original',
      })),
  };

  // Unusual flags
  if (calculated.retailBottle > 900) {
    flags.push({ id: perfume.id, flag: 'very-high-retail', retail: calculated.retailBottle });
  }
  if (calculated.retailBottle < 80) {
    flags.push({ id: perfume.id, flag: 'very-low-retail', retail: calculated.retailBottle });
  }
  if (calculated.costPerMl > 20) {
    flags.push({ id: perfume.id, flag: 'high-cost-per-ml', cpm: calculated.costPerMl });
  }
  if (testers.length && originals.length) {
    const tBest = [...testers].sort(
      (a, b) => (a.costPerMl || 99) - (b.costPerMl || 99)
    )[0];
    if (tBest?.costPerMl && tBest.costPerMl < calculated.costPerMl * 0.75) {
      flags.push({
        id: perfume.id,
        flag: 'tester-much-cheaper',
        originalCpm: calculated.costPerMl,
        testerCpm: Math.round(tBest.costPerMl * 100) / 100,
        testerMl: tBest.ml,
      });
    }
  }

  if (hasCuratedPrice(perfume)) {
    const existing = perfume.sizes.map((s) => ({ ml: s.ml, price: s.price }));
    curatedPreserved.push({
      id: perfume.id,
      name: perfume.name,
      existing,
      calculatedRetail: calculated.retailBottle,
      calculatedSize: calculated.selectedMl,
      calculatedUsd: calculated.wholesaleUsd,
      differenceNote: 'Existing curated prices NOT overwritten',
    });
    audit.push({
      ...entry,
      action: 'preserved-curated',
      calculated,
      existing,
    });
    continue;
  }

  // Apply: all verified original sizes in 25–125 (or selected up to 200) with retail
  const sizePool = originals
    .filter((o) => o.ml >= 25 && (o.ml <= 125 || o.ml === selected.ml))
    .reduce((acc, o) => {
      if (!acc.some((x) => x.ml === o.ml)) acc.push(o);
      else {
        // keep cheaper usd for same ml
        const i = acc.findIndex((x) => x.ml === o.ml);
        if (o.usd < acc[i].usd) acc[i] = o;
      }
      return acc;
    }, [])
    .sort((a, b) => a.ml - b.ml);

  perfume.sizes = sizePool.map((o) => ({
    ml: o.ml,
    price: retailBottlePrice(o.usd),
    stock: true,
  }));

  // Ensure selected size present
  if (!perfume.sizes.some((s) => s.ml === selected.ml)) {
    perfume.sizes.push({
      ml: selected.ml,
      price: retailBottlePrice(selected.usd),
      stock: true,
    });
    perfume.sizes.sort((a, b) => a.ml - b.ml);
  }

  if (!perfume.decant) {
    perfume.decant = {
      enabled: true,
      sizes: [1, 5, 10, 15, 20],
      pricePerMl: null,
    };
  }
  perfume.decant.enabled = true;
  perfume.decant.sizes = [1, 5, 10, 15, 20];
  perfume.decant.pricePerMl = calculated.decantPricePerMl;

  updated.push({
    id: perfume.id,
    name: perfume.name,
    selectedMl: calculated.selectedMl,
    usd: calculated.wholesaleUsd,
    pln: calculated.wholesalePln,
    cpm: calculated.costPerMl,
    retail: calculated.retailBottle,
    decants: calculated.decants,
    article: calculated.selectedArticle,
  });

  audit.push({
    ...entry,
    action: 'updated',
    calculated,
  });
}

write('src/data/perfumes/luxury.json', luxury);
write('src/data/perfumes/niche.json', niche);

const report = {
  source: EXCEL,
  sourceDate: PRICE_LIST_DATE,
  exchangeRate: USD_TO_PLN,
  rules: {
    bottleMarkup: '+10%',
    decantMarkup: '+15%',
    decantBottleFeePln: 7,
  },
  totals: {
    checked: all.length,
    matchedUpdated: updated.length,
    curatedPreserved: curatedPreserved.length,
    unmatched: unmatched.length,
    testerOnly: testerOnly.length,
    ambiguous: ambiguous.length,
    flags: flags.length,
  },
  updated,
  curatedPreserved,
  unmatched,
  testerOnly,
  ambiguous,
  flags,
  audit,
};

write('scripts/wholesale-price-audit.json', report);

// Markdown summary table
const lines = [
  `# AromaShop Wholesale Price Audit`,
  ``,
  `Source: Прайс-лист № 1 (Украина) — парфюмерия.xlsx`,
  `Date: ${PRICE_LIST_DATE}`,
  `Rate: 1 USD = ${USD_TO_PLN} PLN`,
  `Bottle: ×1.10 | Decant: ×1.15 + 7 PLN`,
  ``,
  `## Summary`,
  ``,
  `- Checked: **${all.length}**`,
  `- Prices updated (were null): **${updated.length}**`,
  `- Curated preserved (not overwritten): **${curatedPreserved.length}**`,
  `- Unmatched / no reliable price: **${unmatched.length}**`,
  `- Tester-only (needs decision): **${testerOnly.length}**`,
  `- Ambiguous / review: **${ambiguous.length}**`,
  ``,
  `## Updated products`,
  ``,
  `| Perfume | Size | Wholesale $ | Wholesale PLN | PLN/ml | Retail | 1 ml | 5 ml | 10 ml | 15 ml | 20 ml |`,
  `|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|`,
];

for (const u of updated) {
  const d = Object.fromEntries(u.decants.map((x) => [x.ml, x.price]));
  lines.push(
    `| ${u.name} | ${u.selectedMl} | ${u.usd} | ${u.pln} | ${u.cpm} | ${u.retail} | ${d[1]} | ${d[5]} | ${d[10]} | ${d[15]} | ${d[20]} |`
  );
}

lines.push(``, `## Curated preserved (comparison only)`, ``);
for (const c of curatedPreserved) {
  lines.push(
    `- **${c.name}** (\`${c.id}\`): existing ${c.existing.map((s) => `${s.ml}ml=${s.price}`).join(', ')} · calculated ${c.calculatedSize}ml → ${c.calculatedRetail} PLN ($${c.calculatedUsd})`
  );
}

lines.push(``, `## Unmatched`, ``);
for (const u of unmatched) {
  lines.push(`- **${u.name}** (\`${u.id}\`) — ${u.reason}`);
}

lines.push(``, `## Tester-only`, ``);
for (const t of testerOnly) {
  lines.push(`- **${t.name}** (\`${t.id}\`) — ${t.note}`);
}

lines.push(``, `## Flags`, ``);
for (const f of flags) {
  lines.push(`- \`${f.id}\`: ${f.flag} ${JSON.stringify(f)}`);
}

fs.writeFileSync(path.join(root, 'WHOLESALE_PRICE_AUDIT.md'), `${lines.join('\n')}\n`);

console.log(JSON.stringify(report.totals, null, 2));
console.log('Updated:', updated.length);
console.log('Unmatched:', unmatched.map((u) => u.id).join(', '));
