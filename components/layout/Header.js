'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../ui/Logo';
import { NAV } from '../../data/site';

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  if (href === '/menu') return pathname.startsWith('/menu');
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || !isHome || open;

  return (
    <header className={`header ${solid ? 'header--solid' : ''}`}>
      <div className="container header__inner">
        <Link href="/" className="header__logo" aria-label="Mama's Kitchen – home">
          <Logo size="sm" tone="light" />
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`navlink ${isActive(pathname, item.href) ? 'is-active' : ''}`}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/menu" className="btn btn--gold btn--sm header__cta">
          View Menu
        </Link>

        <button
          type="button"
          className={`burger ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)} className={isActive(pathname, item.href) ? 'is-active' : ''}>
                    <span className="mobile-nav__n">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mobile-nav__foot">Megenagna &middot; Bole Medhanialem &middot; Addis Ababa</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
