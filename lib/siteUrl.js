// Hosts that are usually temporary/preview addresses – allowed, but flagged.
const TEMP_HOST = /\.(vercel\.app|netlify\.app|pages\.dev|onrender\.com|github\.io|ngrok(-free)?\.(app|io|dev)|trycloudflare\.com)$/i;

/** True for localhost, *.local and private / loopback / link-local IP addresses. */
export function isLocalHost(hostname) {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (h === 'localhost' || /\.(localhost|local|internal)$/.test(h)) return true;

  if (h.includes(':')) {
    // IPv6: loopback, unspecified, unique-local (fc00::/7), link-local (fe80::/10)
    return h === '::1' || h === '::' || /^f[cd][0-9a-f]{2}:/.test(h) || /^fe[89ab][0-9a-f]:/.test(h);
  }

  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  return false;
}

/**
 * Decide whether a URL is safe to encode into the QR code.
 * Returns { ok, reason, origin, menuUrl, warning }.
 */
export function resolveSiteUrl(raw) {
  const value = (raw || '').trim();
  if (!value) return { ok: false, reason: 'missing' };

  let url;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return { ok: false, reason: 'invalid' };
  }
  if (isLocalHost(url.hostname)) return { ok: false, reason: 'local' };
  if (url.protocol !== 'https:') return { ok: false, reason: 'insecure' };

  return {
    ok: true,
    origin: url.origin,
    menuUrl: `${url.origin}/menu`,
    warning: TEMP_HOST.test(url.hostname) ? 'temporary' : null,
  };
}
