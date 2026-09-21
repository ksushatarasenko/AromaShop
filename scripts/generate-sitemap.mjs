import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const SITE_URL = 'https://aroma.shop.pl';

const PL = {
  perfumes: 'perfumy',
  women: 'perfumy-damskie',
  men: 'perfumy-meskie',
  unisex: 'perfumy-unisex',
  luxury: 'luksusowe',
  niche: 'niszowe',
  perfume: 'aromat',
  notes: 'nuty',
  find: 'dobierz-aromat',
  journal: 'dziennik',
  about: 'o-nas',
  authenticity: 'autentycznosc',
};

const UK = {
  perfumes: 'parfumy',
  women: 'zhinochi',
  men: 'cholovichi',
  unisex: 'unisex',
  luxury: 'liuksovi',
  niche: 'nishevi',
  perfume: 'aromat',
  notes: 'noty',
  find: 'pidbir-aromatu',
  journal: 'zhurnal',
  about: 'pro-nas',
  authenticity: 'avtentichnist',
};

function readJson(relativePath) {
  const filePath = path.join(ROOT, relativePath);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found: ${relativePath}`);
    return [];
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function url(pathname) {
  return `${SITE_URL}${pathname}`;
}

function addUrl(urls, pathname, priority = '0.7') {
  urls.push({
    loc: url(pathname),
    priority,
  });
}

// --------------------------------------------------
// DATA
// --------------------------------------------------

const luxury = readJson('src/data/perfumes/luxury.json');
const niche = readJson('src/data/perfumes/niche.json');
const notes = readJson('src/data/notes.json');
const articles = readJson('src/data/articles.json');

const perfumes = [...luxury, ...niche].filter(
  (perfume) => perfume.visible !== false
);

// --------------------------------------------------
// URLS
// --------------------------------------------------

const urls = [];

// HOME
addUrl(urls, '/pl', '1.0');
addUrl(urls, '/uk', '0.9');

// POLISH CATALOG
[
  PL.perfumes,
  PL.women,
  PL.men,
  PL.unisex,
  PL.luxury,
  PL.niche,
  PL.find,
  PL.journal,
  PL.about,
  PL.authenticity,
].forEach((segment) => {
  addUrl(urls, `/pl/${segment}`, '0.8');
});

// UKRAINIAN CATALOG
[
  UK.perfumes,
  UK.women,
  UK.men,
  UK.unisex,
  UK.luxury,
  UK.niche,
  UK.find,
  UK.journal,
  UK.about,
  UK.authenticity,
].forEach((segment) => {
  addUrl(urls, `/uk/${segment}`, '0.7');
});

// --------------------------------------------------
// PERFUMES
// --------------------------------------------------

for (const perfume of perfumes) {
  if (!perfume.id) continue;

  addUrl(
    urls,
    `/pl/${PL.perfume}/${encodeURIComponent(perfume.id)}`,
    '0.9'
  );

  addUrl(
    urls,
    `/uk/${UK.perfume}/${encodeURIComponent(perfume.id)}`,
    '0.8'
  );
}

// --------------------------------------------------
// NOTES
// --------------------------------------------------

for (const note of notes) {
  if (!note?.id) continue;

  const plSlug = note.slug?.pl;
  const ukSlug = note.slug?.uk;

  if (plSlug) {
    addUrl(
      urls,
      `/pl/${PL.note}/${encodeURIComponent(plSlug)}`,
      '0.6'
    );
  }

  if (ukSlug) {
    addUrl(
      urls,
      `/uk/${UK.note}/${encodeURIComponent(ukSlug)}`,
      '0.6'
    );
  }
}

// --------------------------------------------------
// JOURNAL ARTICLES
// --------------------------------------------------

for (const article of articles) {
  if (!article?.slug) continue;

  addUrl(
    urls,
    `/pl/${PL.journal}/${encodeURIComponent(article.slug)}`,
    '0.7'
  );

  addUrl(
    urls,
    `/uk/${UK.journal}/${encodeURIComponent(article.slug)}`,
    '0.6'
  );
}

// --------------------------------------------------
// REMOVE DUPLICATES
// --------------------------------------------------

const uniqueUrls = Array.from(
  new Map(urls.map((item) => [item.loc, item])).values()
);

// --------------------------------------------------
// XML
// --------------------------------------------------

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${uniqueUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.join(PUBLIC_DIR, 'sitemap.xml');

fs.writeFileSync(outputPath, xml, 'utf8');

console.log('');
console.log('✅ Sitemap generated successfully!');
console.log(`📄 ${outputPath}`);
console.log(`🔗 ${SITE_URL}/sitemap.xml`);
console.log(`📊 URLs: ${uniqueUrls.length}`);
console.log('');
