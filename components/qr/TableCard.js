'use client';

import { useRef, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import Logo from '../ui/Logo';
import QrView from './QrView';
import { useQr, blockedMessage } from '../../lib/useQr';
import { downloadBlob, imageToDataUrl, loadImage, qrPngBlob, qrSvgString, tableCardPngBlob } from '../../lib/qr';
import { SITE } from '../../data/site';

export default function TableCard() {
  const qr = useQr();
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const ready = qr.status === 'ready';

  async function savePng() {
    setBusy(true);
    try {
      if (document.fonts?.ready) await document.fonts.ready;
      let logoImg = null;
      if (SITE.logo.src) {
        try {
          logoImg = await loadImage(SITE.logo.src);
        } catch {
          logoImg = null;
        }
      }
      const fonts = {
        display: headingRef.current ? getComputedStyle(headingRef.current).fontFamily : undefined,
        body: bodyRef.current ? getComputedStyle(bodyRef.current).fontFamily : undefined,
      };
      const blob = await tableCardPngBlob(qr.matrix, { displayUrl: qr.displayUrl, fonts, logoImg, qrLogoImg: qr.logoImg });
      downloadBlob(blob, 'mamas-kitchen-table-card.png');
    } finally {
      setBusy(false);
    }
  }

  async function saveQrOnly() {
    downloadBlob(await qrPngBlob(qr.matrix, { targetPx: 2400, logoImg: qr.logoImg }), 'mamas-kitchen-menu-qr.png');
  }
  function saveSvg() {
    const logo = qr.logoImg ? imageToDataUrl(qr.logoImg) : null;
    downloadBlob(new Blob([qrSvgString(qr.matrix, { logoDataUrl: logo })], { type: 'image/svg+xml' }), 'mamas-kitchen-menu-qr.svg');
  }

  return (
    <section className="tablecard-page">
      <div className="container">
        <header className="tablecard-page__head no-print">
          <p className="eyebrow">For the restaurant</p>
          <h1 className="display">Printable table card</h1>
          <p className="lead">
            A print-ready A5 card with the menu QR code. Download it as a high-resolution PNG (about 1800 &times; 2550 px,
            suitable for A5 at 300&nbsp;dpi), or print it / save it as a PDF from your browser.
          </p>
          {ready && qr.warning === 'temporary' && (
            <p className="alert" role="alert">
              This address looks like a temporary preview domain. Set <code>NEXT_PUBLIC_SITE_URL</code> to your final domain
              before printing.
            </p>
          )}
          <div className="tablecard-page__actions">
            <button type="button" className="btn btn--gold" disabled={!ready || busy} onClick={savePng}>
              <Download size={18} aria-hidden="true" /> {busy ? 'Preparing…' : 'Download PNG'}
            </button>
            <button type="button" className="btn btn--dark" disabled={!ready} onClick={() => window.print()}>
              <Printer size={18} aria-hidden="true" /> Print / Save as PDF
            </button>
            <button type="button" className="btn btn--outline" disabled={!ready} onClick={saveQrOnly}>
              QR only (PNG)
            </button>
            <button type="button" className="btn btn--outline" disabled={!ready} onClick={saveSvg}>
              QR only (SVG)
            </button>
          </div>
          <p className="note">
            In the print dialog choose paper size A5, margins &ldquo;None&rdquo; and turn on &ldquo;Background graphics&rdquo;.
          </p>
        </header>

        <div className="tcard-wrap">
          <div className="tcard" id="table-card">
            <div className="tcard__frame">
              <div className="tcard__logo">
                <Logo size="lg" tone="dark" note />
              </div>
              <div className="tcard__rule" aria-hidden="true" />
              <h2 className="tcard__title" ref={headingRef}>
                Scan to Explore
                <br />
                Our Menu
              </h2>
              <div className="tcard__qr">
                {ready ? (
                  <QrView matrix={qr.matrix} logoSrc={qr.logoImg ? SITE.logo.src : null} />
                ) : (
                  <div className="tcard__pending">
                    <p>{qr.status === 'loading' ? 'Preparing QR code…' : blockedMessage(qr.reason)}</p>
                  </div>
                )}
              </div>
              <p className="tcard__welcome">
                Welcome. Take a seat, take your time &ndash; your next favorite dish is one scan away.
              </p>
              <p className="tcard__url" ref={bodyRef}>{ready ? qr.displayUrl : ''}</p>
              <p className="tcard__brand">Ethiopian &amp; International &middot; Addis Ababa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
