import fs from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');
const SITEMAP_PATH = path.resolve('public/sitemap.xml');
const INDEX_PATH = path.join(DIST_DIR, 'index.html');

const sitemap = await fs.readFile(SITEMAP_PATH, 'utf8');
const indexHtml = await fs.readFile(INDEX_PATH);

const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1].trim());

for (const url of urls) {
  const pathname = new URL(url).pathname;
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

  // Главная страница уже существует как dist/index.html
  if (!cleanPath) continue;

  const targetDir = path.join(DIST_DIR, cleanPath);
  const targetFile = path.join(targetDir, 'index.html');

  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(targetFile, indexHtml);

  console.log(`Created: ${targetFile}`);
}

console.log(`Prepared ${urls.length} routes for GitHub Pages.`);
