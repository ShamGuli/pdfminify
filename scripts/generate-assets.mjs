/**
 * Generate brand assets for pdfminify.com
 * Run: node scripts/generate-assets.mjs
 */
import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const PRIMARY = '#E53E3E';
const DARK = '#1a202c';

// ── OG Image (1200x630) ──────────────────────────────────────────────
function createOG() {
  const w = 1200, h = 630;
  const c = createCanvas(w, h);
  const ctx = c.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#1a1a2e');
  grad.addColorStop(1, '#16213e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Decorative circles
  ctx.beginPath();
  ctx.arc(100, 530, 200, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(229, 62, 62, 0.08)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1100, 100, 250, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(229, 62, 62, 0.06)';
  ctx.fill();

  // PDF icon box
  ctx.fillStyle = PRIMARY;
  ctx.beginPath();
  ctx.roundRect(80, 80, 90, 90, 18);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('PDF', 92, 137);

  // Brand name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px sans-serif';
  ctx.fillText('PDF Minify', 190, 138);

  // Main headline
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px sans-serif';
  ctx.fillText('Compress PDF Files Online', 80, 280);
  ctx.fillStyle = PRIMARY;
  ctx.font = 'bold 56px sans-serif';
  ctx.fillText('Free & Instant', 80, 350);

  // Description
  ctx.fillStyle = '#94a3b8';
  ctx.font = '26px sans-serif';
  ctx.fillText('Reduce PDF size up to 80% without losing quality.', 80, 420);
  ctx.fillText('100% browser-side. No upload to server.', 80, 458);

  // Feature pills
  const pills = ['No Upload', 'No Signup', 'Free Forever', '50MB Max'];
  let px = 80;
  pills.forEach(text => {
    const tw = ctx.measureText(text).width + 36;
    ctx.fillStyle = 'rgba(229, 62, 62, 0.15)';
    ctx.beginPath();
    ctx.roundRect(px, 500, tw, 40, 20);
    ctx.fill();
    ctx.fillStyle = '#fc8181';
    ctx.font = '18px sans-serif';
    ctx.fillText(text, px + 18, 526);
    px += tw + 16;
  });

  // URL
  ctx.fillStyle = '#64748b';
  ctx.font = '22px sans-serif';
  ctx.fillText('pdfminify.com', 1000, 590);

  writeFileSync(join(PUBLIC, 'og.png'), c.toBuffer('image/png'));
  console.log('Created og.png (1200x630)');
}

// ── Apple Touch Icon (180x180) ────────────────────────────────────────
function createAppleIcon() {
  const s = 180;
  const c = createCanvas(s, s);
  const ctx = c.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, s, s);
  grad.addColorStop(0, '#E53E3E');
  grad.addColorStop(1, '#C53030');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(0, 0, s, s, 36);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 60px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PDF', s / 2, s / 2 - 10);
  ctx.font = '22px sans-serif';
  ctx.fillText('minify', s / 2, s / 2 + 30);

  writeFileSync(join(PUBLIC, 'apple-touch-icon.png'), c.toBuffer('image/png'));
  console.log('Created apple-touch-icon.png (180x180)');
}

// ── Favicon ICO (48x48 PNG) ──────────────────────────────────────────
function createFaviconICO() {
  const s = 48;
  const c = createCanvas(s, s);
  const ctx = c.getContext('2d');

  ctx.fillStyle = PRIMARY;
  ctx.beginPath();
  ctx.roundRect(0, 0, s, s, 10);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PDF', s / 2, s / 2);

  writeFileSync(join(PUBLIC, 'favicon.ico'), c.toBuffer('image/png'));
  console.log('Created favicon.ico (48x48)');
}

createOG();
createAppleIcon();
createFaviconICO();
console.log('All assets generated!');
