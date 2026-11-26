'use client';

import { useEffect, useState } from 'react';
import { resolveSiteUrl } from './siteUrl';
import { buildQr, loadImage } from './qr';
import { SITE } from '../data/site';

/**
 * Works out the production menu URL and builds the QR matrix for it.
 *  1. NEXT_PUBLIC_SITE_URL, if set
 *  2. otherwise the address the site is currently served from (so a deployed
 *     site "just works") – but never localhost / local network addresses.
 * status: 'loading' | 'ready' | 'blocked'
 */
export function useQr() {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let resolved = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
      let source = 'env';
      if (!resolved.ok && resolved.reason === 'missing') {
        resolved = resolveSiteUrl(window.location.origin);
        source = 'current-origin';
      }
      if (!resolved.ok) {
        if (!cancelled) setState({ status: 'blocked', reason: resolved.reason, source });
        return;
      }
      try {
        const matrix = await buildQr(resolved.menuUrl);
        let logoImg = null;
        if (SITE.qrLogoInCenter && SITE.logo.src) {
          try {
            logoImg = await loadImage(SITE.logo.src);
          } catch {
            logoImg = null; // never block the QR code on the logo
          }
        }
        if (!cancelled)
          setState({
            status: 'ready',
            menuUrl: resolved.menuUrl,
            displayUrl: resolved.menuUrl.replace(/^https?:\/\//, ''),
            warning: resolved.warning,
            source,
            matrix,
            logoImg,
          });
      } catch {
        if (!cancelled) setState({ status: 'blocked', reason: 'error', source });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function blockedMessage(reason) {
  switch (reason) {
    case 'local':
      return 'The QR code appears automatically once the website is published at its real address. It will never encode localhost or a local network address.';
    case 'insecure':
      return 'The site address must use https:// before a QR code can be generated.';
    case 'invalid':
      return 'NEXT_PUBLIC_SITE_URL is not a valid web address. Check the value and rebuild.';
    case 'error':
      return 'The QR code could not be generated. Please reload the page.';
    default:
      return 'Set NEXT_PUBLIC_SITE_URL to the published website address to generate the QR code.';
  }
}
