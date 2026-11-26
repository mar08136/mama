'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, Printer, Smartphone } from 'lucide-react';
import { Reveal, WordReveal } from '../motion';
import QrView from '../qr/QrView';
import { useQr, blockedMessage } from '../../lib/useQr';
import { downloadBlob, imageToDataUrl, qrPngBlob, qrSvgString } from '../../lib/qr';
import { SITE } from '../../data/site';

export default function QrSection() {
  const qr = useQr();
  const [busy, setBusy] = useState(false);
  const ready = qr.status === 'ready';

  async function savePng() {
    setBusy(true);
    try {
      downloadBlob(await qrPngBlob(qr.matrix, { targetPx: 2400, logoImg: qr.logoImg }), 'mamas-kitchen-menu-qr.png');
    } finally {
      setBusy(false);
    }
  }
  function saveSvg() {
    const logo = qr.logoImg ? imageToDataUrl(qr.logoImg) : null;
    downloadBlob(new Blob([qrSvgString(qr.matrix, { logoDataUrl: logo })], { type: 'image/svg+xml' }), 'mamas-kitchen-menu-qr.svg');
  }

  return (
    <section id="qr" className="section section--sand qrsection" aria-labelledby="qr-title">
      <div className="container qrsection__grid">
        <div>
          <Reveal as="p" className="eyebrow"><Smartphone size={16} aria-hidden="true" /> Digital menu</Reveal>
          <WordReveal id="qr-title" text="Your Table. Your Menu. Your Next Favorite Dish." className="display" />
          <Reveal delay={0.1}>
            <p className="lead">Scan the code to explore our menu and discover something delicious.</p>
            <p className="note">No app, no account, no sign-up &ndash; the menu simply opens in your phone&rsquo;s browser.</p>
            <div className="qrsection__actions">
              <Link href="/menu" className="btn btn--dark">Open the menu</Link>
              <Link href="/table-card" className="btn btn--outline"><Printer size={18} aria-hidden="true" /> Printable table card</Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="qrbox" delay={0.15}>
          {ready ? (
            <>
              <div className="qrbox__code">
                <QrView matrix={qr.matrix} logoSrc={qr.logoImg ? SITE.logo.src : null} />
              </div>
              <p className="qrbox__url">{qr.displayUrl}</p>
              {qr.warning === 'temporary' && (
                <p className="alert" role="alert">
                  This address looks like a temporary preview domain. Set <code>NEXT_PUBLIC_SITE_URL</code> to your final
                  domain before printing.
                </p>
              )}
              <div className="qrbox__buttons">
                <button type="button" className="btn btn--gold btn--sm" onClick={savePng} disabled={busy}>
                  <Download size={16} aria-hidden="true" /> PNG
                </button>
                <button type="button" className="btn btn--outline btn--sm" onClick={saveSvg}>
                  <Download size={16} aria-hidden="true" /> SVG
                </button>
              </div>
            </>
          ) : (
            <div className="qrbox__pending">
              <p className="eyebrow">{qr.status === 'loading' ? 'Preparing QR code…' : 'QR code not generated yet'}</p>
              {qr.status === 'blocked' && <p>{blockedMessage(qr.reason)}</p>}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
