import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Missing files under /assets/* must 404 (not SPA index.html),
 * so <img onError> can fall through jpg/png/webp candidates cleanly.
 */
function assetsStrict404() {
  return {
    name: 'aromashop-assets-404',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split('?')[0] || '';
        if (!raw.startsWith('/assets/')) return next();

        const filePath = path.join(server.config.root, 'public', raw);
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          return next();
        }

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');
      });
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), assetsStrict404()],
});
