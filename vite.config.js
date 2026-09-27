import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/contact' || req.url === '/api/newsletter') {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const parsed = JSON.parse(body || '{}');
                  req.body = parsed;
                  const handlerMod = req.url === '/api/contact'
                    ? await import('./api/contact.js')
                    : await import('./api/newsletter.js');
                  await handlerMod.default(req, res);
                } catch (e) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
              return;
            }
          }
          next();
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
