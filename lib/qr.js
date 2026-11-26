// QR helpers. Uses the `qrcode` package for the actual encoding (Reed-Solomon,
// masking, etc.) and renders the resulting module matrix ourselves, so the same
// matrix drives the on-screen SVG, the SVG download and the high-res PNG.

export const QUIET = 4; // quiet zone, in modules (the QR spec minimum)
export const DARK = '#1a1210';
export const LIGHT = '#ffffff';

export async function buildQr(text) {
  const mod = await import('qrcode');
  const QRCode = mod.default || mod;
  // 'H' = highest error correction (~30%), leaves room for an optional centre logo.
  const qr = QRCode.create(text, { errorCorrectionLevel: 'H' });
  const size = qr.modules.size;
  const rows = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) row.push(!!qr.modules.get(r, c));
    rows.push(row);
  }
  return { size, rows };
}

/** One SVG path made of merged horizontal runs (compact + crisp). */
export function qrPath({ rows }) {
  let d = '';
  rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      if (row[c]) {
        const start = c;
        while (c < row.length && row[c]) c++;
        d += `M${start + QUIET} ${r + QUIET}h${c - start}v1h-${c - start}z`;
      } else c++;
    }
  });
  return d;
}

// Centre-logo geometry: a square covering ~18% of the code width (~3% of area).
export function logoBox(size) {
  const n = size + QUIET * 2;
  const side = Math.round(size * 0.18);
  const pad = 1;
  const start = (n - side) / 2;
  return { n, side, pad, start };
}

export function qrSvgString(matrix, { logoDataUrl = null } = {}) {
  const { n, side, pad, start } = logoBox(matrix.size);
  const logo = logoDataUrl
    ? `<rect x="${start - pad}" y="${start - pad}" width="${side + pad * 2}" height="${side + pad * 2}" fill="${LIGHT}"/>` +
      `<image href="${logoDataUrl}" x="${start}" y="${start}" width="${side}" height="${side}" preserveAspectRatio="xMidYMid meet"/>`
    : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" width="1024" height="1024" shape-rendering="crispEdges">` +
    `<rect width="${n}" height="${n}" fill="${LIGHT}"/>` +
    `<path d="${qrPath(matrix)}" fill="${DARK}"/>${logo}</svg>`
  );
}

function drawModules(ctx, matrix, x0, y0, mod) {
  ctx.fillStyle = DARK;
  matrix.rows.forEach((row, r) =>
    row.forEach((on, c) => {
      if (on) ctx.fillRect(x0 + c * mod, y0 + r * mod, mod, mod);
    }),
  );
}

function drawLogo(ctx, matrix, logoImg, x0, y0, mod) {
  if (!logoImg) return;
  const { side, pad, start } = logoBox(matrix.size);
  const qz = QUIET;
  const px = x0 + (start - qz) * mod;
  const py = y0 + (start - qz) * mod;
  ctx.fillStyle = LIGHT;
  ctx.fillRect(px - pad * mod, py - pad * mod, (side + pad * 2) * mod, (side + pad * 2) * mod);
  const box = side * mod;
  const ratio = Math.min(box / logoImg.width, box / logoImg.height);
  const w = logoImg.width * ratio;
  const h = logoImg.height * ratio;
  ctx.drawImage(logoImg, px + (box - w) / 2, py + (box - h) / 2, w, h);
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG export failed'))), 'image/png'),
  );
}

/** High-resolution PNG of just the QR code (integer pixels per module, ≥ targetPx wide). */
export async function qrPngBlob(matrix, { targetPx = 2400, logoImg = null } = {}) {
  const n = matrix.size + QUIET * 2;
  const mod = Math.max(8, Math.ceil(targetPx / n));
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = n * mod;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawModules(ctx, matrix, QUIET * mod, QUIET * mod, mod);
  drawLogo(ctx, matrix, logoImg, QUIET * mod, QUIET * mod, mod);
  return canvasToBlob(canvas);
}

function wrapLines(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/** Print-ready table card (1800 × 2550 px ≈ A5 at ~300 dpi). */
export async function tableCardPngBlob(matrix, { displayUrl, fonts, logoImg = null, qrLogoImg = null }) {
  const W = 1800;
  const H = 2550;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const display = fonts?.display || 'Georgia, serif';
  const body = fonts?.body || 'Arial, sans-serif';

  // background + frame
  ctx.fillStyle = '#fffaf8';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#de1e2d';
  ctx.lineWidth = 6;
  ctx.strokeRect(70, 70, W - 140, H - 140);
  ctx.lineWidth = 2;
  ctx.strokeRect(100, 100, W - 200, H - 200);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // logo (or wordmark placeholder)
  if (logoImg) {
    const maxW = 760;
    const maxH = 280;
    const r = Math.min(maxW / logoImg.width, maxH / logoImg.height);
    const w = logoImg.width * r;
    const h = logoImg.height * r;
    ctx.drawImage(logoImg, (W - w) / 2, 230 + (maxH - h) / 2, w, h);
  } else {
    ctx.fillStyle = '#1f1315';
    ctx.font = `600 150px ${display}`;
    ctx.fillText('Mama’s Kitchen', W / 2, 380);
    ctx.fillStyle = '#c0152a';
    ctx.font = `500 34px ${body}`;
    ctx.fillText('LOGO PLACEHOLDER', W / 2, 440);
  }

  ctx.fillStyle = '#de1e2d';
  ctx.fillRect(W / 2 - 90, 520, 180, 4);

  ctx.fillStyle = '#1f1315';
  ctx.font = `600 118px ${display}`;
  ctx.fillText('Scan to Explore', W / 2, 690);
  ctx.fillText('Our Menu', W / 2, 820);

  // QR panel
  const n = matrix.size + QUIET * 2;
  const mod = Math.floor(1120 / n);
  const qrPx = n * mod;
  const panelPad = 50;
  const px = (W - qrPx) / 2;
  const py = 930;
  ctx.fillStyle = LIGHT;
  ctx.shadowColor = 'rgba(31, 19, 21,0.18)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 12;
  ctx.fillRect(px - panelPad, py - panelPad, qrPx + panelPad * 2, qrPx + panelPad * 2);
  ctx.shadowColor = 'transparent';
  drawModules(ctx, matrix, px, py, mod);
  drawLogo(ctx, matrix, qrLogoImg, px, py, mod);

  // welcome text
  const textTop = py + qrPx + panelPad + 150;
  ctx.fillStyle = '#3a2c2d';
  ctx.font = `italic 500 64px ${display}`;
  const lines = wrapLines(ctx, 'Welcome. Take a seat, take your time – your next favorite dish is one scan away.', 1250);
  lines.forEach((l, i) => ctx.fillText(l, W / 2, textTop + i * 88));

  // url + footer
  const urlY = H - 250;
  ctx.fillStyle = '#6f6263';
  ctx.font = `500 40px ${body}`;
  ctx.fillText(displayUrl, W / 2, urlY);
  ctx.fillStyle = '#c0152a';
  ctx.font = `600 34px ${body}`;
  ctx.fillText('ETHIOPIAN & INTERNATIONAL  ·  ADDIS ABABA', W / 2, urlY + 70);

  return canvasToBlob(canvas);
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** Inline an already-loaded image as a data URL so a downloaded SVG is self-contained. */
export function imageToDataUrl(img) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth || img.width;
  c.height = img.naturalHeight || img.height;
  c.getContext('2d').drawImage(img, 0, 0);
  return c.toDataURL('image/png');
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = src;
  });
}
