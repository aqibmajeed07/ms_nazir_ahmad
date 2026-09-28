import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.join(__dirname, 'public', 'images', 'certificates');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const docs = [
  {
    pdf: path.join(__dirname, 'public', 'documents', 'GST-Registration-Certificate.pdf'),
    output: path.join(outDir, 'preview-gst.png'),
    sanitize: false
  },
  {
    pdf: path.join(__dirname, 'public', 'documents', 'Udyam-Registration-Certificate.pdf'),
    output: path.join(outDir, 'preview-udyam.png'),
    sanitize: true
  },
  {
    pdf: path.join(__dirname, 'public', 'documents', 'ESIC-Registration-Certificate.pdf'),
    output: path.join(outDir, 'preview-esic.png'),
    sanitize: false
  },
  {
    pdf: path.join(__dirname, 'public', 'documents', 'company-brochure.pdf'),
    output: path.join(outDir, 'preview-brochure.png'),
    sanitize: false
  }
];

async function generateAllPreviews() {
  console.log('Launching browser to render certificate previews...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });

  const pdfjsCode = fs.readFileSync(path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.min.mjs'), 'utf8');
  const workerCode = fs.readFileSync(path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs'), 'utf8');

  for (const doc of docs) {
    if (!fs.existsSync(doc.pdf)) {
      console.log('Skipping missing file:', doc.pdf);
      continue;
    }

    console.log('Processing:', path.basename(doc.pdf));
    const pdfBytes = fs.readFileSync(doc.pdf);
    const base64 = pdfBytes.toString('base64');

    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; }
          body { background: #0b1523; display: flex; justify-content: center; align-items: flex-start; padding: 10px; }
          canvas { box-shadow: 0 8px 30px rgba(0,0,0,0.6); border-radius: 4px; background: #fff; }
        </style>
      </head>
      <body>
        <canvas id="c"></canvas>
        <script type="module">
          ${pdfjsCode}
          
          const workerBlob = new Blob([${JSON.stringify(workerCode)}], { type: 'application/javascript' });
          pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(workerBlob);
          
          const raw = atob("${base64}");
          const arr = new Uint8Array(raw.length);
          for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
          
          try {
            const pdf = await pdfjsLib.getDocument({ data: arr }).promise;
            const p = await pdf.getPage(1);
            const vp = p.getViewport({ scale: 1.5 });
            const c = document.getElementById('c');
            c.width = vp.width;
            c.height = vp.height;
            const ctx = c.getContext('2d');
            await p.render({ canvasContext: ctx, viewport: vp }).promise;

            ${doc.sanitize ? `
            // Sanitize personal email from Udyam certificate
            const textContent = await p.getTextContent();
            for (const item of textContent.items) {
              if (item.str && (item.str.includes('@') || item.str.includes('AASHU'))) {
                const tx = pdfjsLib.Util.transform(vp.transform, item.transform);
                ctx.fillStyle = '#FFFFFF';
                // Cover the box
                ctx.fillRect(tx[4] - 2, tx[5] - 12, item.width * 1.5 + 20, 16);
                ctx.fillStyle = '#000000';
                ctx.font = 'bold 11px Arial, sans-serif';
                ctx.fillText('nmir2242@gmail.com', tx[4], tx[5]);
              }
            }
            ` : ''}

            window._done = true;
          } catch(e) {
            window._err = e.message;
          }
        </script>
      </body>
      </html>
    `);

    try {
      await page.waitForFunction(() => window._done || window._err, { timeout: 15000 });
      const done = await page.evaluate(() => window._done);
      if (done) {
        const c = page.locator('#c');
        await c.screenshot({ path: doc.output });
        console.log('✅ Generated:', path.basename(doc.output));
      } else {
        const err = await page.evaluate(() => window._err);
        console.error('Error in page:', err);
      }
    } catch (e) {
      console.error('Timeout for', path.basename(doc.pdf), e.message);
    }
  }

  await browser.close();
  console.log('All previews generated with sanitization!');
}

generateAllPreviews().catch(console.error);
