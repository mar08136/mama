'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../ui/Logo';

// The intro plays once per browser session and is skipped on the menu and
// table-card pages, so a guest who scans the QR code sees the menu immediately.
const SKIP_ON = ['/menu', '/table-card'];

export default function Loader() {
  const pathname = usePathname();
  const [show, setShow] = useState(!SKIP_ON.some((p) => pathname.startsWith(p)));

  useEffect(() => {
    if (!show) return undefined;
    let seen = false;
    try {
      seen = sessionStorage.getItem('mk-intro') === '1';
      sessionStorage.setItem('mk-intro', '1');
    } catch {
      /* storage unavailable – just play the intro */
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setShow(false), seen ? 0 : reduce ? 350 : 1900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <noscript>
        <style>{'.loader{display:none!important}'}</style>
      </noscript>
      <AnimatePresence>
        {show && (
          <motion.div
            className="loader"
            role="status"
            aria-label="Loading Mama's Kitchen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          >
            <motion.div
              className="loader__logo"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo size="lg" tone="dark" priority />
            </motion.div>
            <div className="loader__bar" aria-hidden="true">
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
