'use client';

import { useMemo } from 'react';
import { qrPath, logoBox, QUIET, DARK, LIGHT } from '../../lib/qr';

/** On-screen QR code (SVG). Includes the quiet zone, so it can sit on any background. */
export default function QrView({ matrix, logoSrc = null, label = 'QR code linking to the Mama’s Kitchen menu' }) {
  const d = useMemo(() => qrPath(matrix), [matrix]);
  const { n, side, pad, start } = logoBox(matrix.size);
  return (
    <svg className="qrview" viewBox={`0 0 ${n} ${n}`} role="img" aria-label={label} shapeRendering="crispEdges">
      <rect width={n} height={n} fill={LIGHT} />
      <path d={d} fill={DARK} />
      {logoSrc && (
        <>
          <rect x={start - pad} y={start - pad} width={side + pad * 2} height={side + pad * 2} fill={LIGHT} />
          <image href={logoSrc} x={start} y={start} width={side} height={side} preserveAspectRatio="xMidYMid meet" />
        </>
      )}
    </svg>
  );
}

export { QUIET };
