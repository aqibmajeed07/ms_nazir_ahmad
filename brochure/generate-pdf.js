import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('=== MASTER LOOP V5 DUAL PDF RENDERER ===');

  const args = process.argv.slice(2);
  let mode = 'print';
  for (const arg of args) {
    if (arg.startsWith('--mode=')) {
      mode = arg.split('=')[1];
    }
  }

  console.log(`Rendering PDF in Mode: [${mode.toUpperCase()}]`);

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const htmlPath = path.join(__dirname, 'index.html');
  const fileUrl = `file://${htmlPath.replace(/\\/g, '/')}`;

  console.log(`Loading HTML from: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Ensure output directories exist
  const outputDir = path.join(__dirname, '..', 'output');
  const previewsDir = path.join(outputDir, 'page-previews');
  const distDir = path.join(__dirname, 'dist');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir, { recursive: true });
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  const pdfFileName = mode === 'print' ? 'final-profile.pdf' : 'final-profile-web.pdf';
  const targetPdfPath = path.join(outputDir, pdfFileName);

  console.log('Generating multi-page PDF...');
  await page.pdf({
    path: targetPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true
  });

  console.log(`✅ Output PDF generated: ${targetPdfPath}`);

  // Copy to brochure/dist for convenience
  const distPdfPath = path.join(distDir, 'Contractor-Company-Profile.pdf');
  fs.copyFileSync(targetPdfPath, distPdfPath);
  console.log(`✅ Dist copy updated: ${distPdfPath}`);

  // Generate PNG previews for each page
  const pageElements = await page.$$('.page');
  console.log(`Found ${pageElements.length} pages in DOM. Rendering PNG previews...`);

  for (let i = 0; i < pageElements.length; i++) {
    const pageNum = (i + 1).toString().padStart(2, '0');
    const previewPath = path.join(previewsDir, `page-${pageNum}.png`);
    await pageElements[i].screenshot({ path: previewPath });
    console.log(`   📸 Rendered page preview: output/page-previews/page-${pageNum}.png`);
  }

  await browser.close();
  console.log('🎉 MASTER LOOP V5 PDF COMPILATION & PREVIEWS COMPLETE!');
}

generatePDF().catch(err => {
  console.error('❌ PDF Generation Error:', err);
  process.exit(1);
});
