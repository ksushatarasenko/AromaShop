import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * GitHub Pages has no server-side SPA fallback.
 * 1) Copy index.html into each sitemap path → real 200 for known SEO URLs.
 * 2) Also write dist/404.html = index.html → deep links / refresh still
 *    load the React app (URL stays the same; GH Pages serves 404.html).
 */
const DIST_DIR = path.resolve('dist');
const SITEMAP_PATH = path.resolve('public/sitemap.xml');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');
const NOT_FOUND_PATH = path.join(DIST_DIR, '404.html');

const sitemap = await fs.readFile(SITEMAP_PATH, 'utf8');
const indexHtml = await fs.readFile(INDEX_PATH);

const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1].trim());

for (const url of urls) {
  const pathname = new URL(url).pathname;
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

  // Homepage already exists as dist/index.html
  if (!cleanPath) continue;

  const targetDir = path.join(DIST_DIR, cleanPath);
  const targetFile = path.join(targetDir, 'index.html');

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(targetFile, indexHtml);

  console.log(`Created: ${targetFile}`);
}

// SPA fallback for any path not listed in the sitemap (new products, refresh, shares)
await fs.writeFile(NOT_FOUND_PATH, indexHtml);
console.log(`Created: ${NOT_FOUND_PATH}`);

console.log(`Prepared ${urls.length} sitemap routes + 404.html for GitHub Pages.`);
