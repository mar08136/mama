'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, Search, X, QrCode } from 'lucide-react';
import DishCard from './DishCard';
import DishModal from './DishModal';
import { WordReveal, EASE } from '../motion';
import { normalize } from '../../lib/menu';

// The menu is loaded fresh from this file every visit, so editing the JSON updates
// the live menu with no code rebuild. Override with NEXT_PUBLIC_MENU_DATA_URL.
const DATA_URL = process.env.NEXT_PUBLIC_MENU_DATA_URL || '/data/menu.json';

export default function MenuExperience({ initialData }) {
  const [data, setData] = useState(initialData);
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const toolbarRef = useRef(null);

  // refresh from the editable JSON file
  useEffect(() => {
    setMounted(true);
    const url = `${DATA_URL}${DATA_URL.includes('?') ? '&' : '?'}t=${Date.now()}`;
    fetch(url, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j && Array.isArray(j.items) && Array.isArray(j.categories)) setData(j);
      })
      .catch(() => {});
  }, []);

  // deep link: /menu?dish=quanta-firfir opens that dish
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('dish');
    if (!id) return;
    const found = data.items.find((i) => i.id === id);
    if (found) setActive(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = toolbarRef.current;
      if (el) setShowTop(el.getBoundingClientRect().top < -40 && window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currency = data.meta?.currency || 'ETB';
  const items = useMemo(() => data.items.filter((i) => i.available !== false), [data]);
  const catName = useMemo(() => Object.fromEntries(data.categories.map((c) => [c.id, c.name])), [data]);
  const hasSignature = items.some((i) => i.signature);

  const chips = useMemo(() => {
    const list = [{ id: 'all', name: 'All', count: items.length }];
    if (hasSignature) list.push({ id: 'signature', name: 'Signature', count: items.filter((i) => i.signature).length });
    data.categories.forEach((c) => list.push({ id: c.id, name: c.name, count: items.filter((i) => i.category === c.id).length, pending: c.confirmed === false }));
    return list;
  }, [data, items, hasSignature]);

  const q = normalize(query.trim());
  const visible = useMemo(() => {
    if (q) return items.filter((i) => normalize([i.name, i.nameAm, i.description, ...(i.tags || [])].join(' ')).includes(q));
    if (cat === 'all') return items;
    if (cat === 'signature') return items.filter((i) => i.signature);
    return items.filter((i) => i.category === cat);
  }, [items, cat, q]);

  const activeChip = chips.find((c) => c.id === cat);
  const pendingCats = chips.filter((c) => c.pending && c.count === 0);

  function openDish(item) {
    setActive(item);
  }
  function closeDish() {
    setActive(null);
    if (window.location.search.includes('dish=')) window.history.replaceState(null, '', window.location.pathname);
  }
  function toToolbar() {
    toolbarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <section className="menuhero" aria-labelledby="menu-title">
        <div className="container menuhero__inner">
          <motion.p className="eyebrow eyebrow--gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            The Menu
          </motion.p>
          <WordReveal as="h1" id="menu-title" className="display display--light menuhero__title" text="A table full of flavor." />
          <motion.p className="menuhero__lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }}>
            Browse by category, search for a dish, and tap any plate to see it up close. No app. No sign-up.
          </motion.p>
        </div>
      </section>

      <div className="menutools" ref={toolbarRef}>
        <div className="container menutools__inner">
          <label className="search">
            <Search size={18} aria-hidden="true" />
            <span className="visually-hidden">Search dishes</span>
            <input
              type="search"
              inputMode="search"
              placeholder="Search dishes, e.g. firfir"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button type="button" className="search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </label>
          <div className="chips" role="tablist" aria-label="Menu categories">
            {chips.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={!q && cat === c.id}
                className={`chip ${!q && cat === c.id ? 'is-active' : ''}`}
                onClick={() => {
                  setCat(c.id);
                  setQuery('');
                }}
              >
                {c.name}
                <span className="chip__n">{c.pending && c.count === 0 ? '·' : c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="menubody" aria-live="polite">
        <div className="container">
          {data.meta?.status !== 'complete' && data.meta?.statusNote && (
            <p className="banner" role="note">
              <strong>Menu in progress.</strong> {data.meta.statusNote}
            </p>
          )}

          <p className="menubody__count">
            {q
              ? `${visible.length} result${visible.length === 1 ? '' : 's'} for “${query.trim()}”`
              : activeChip
                ? `${activeChip.name} · ${visible.length} ${visible.length === 1 ? 'dish' : 'dishes'}`
                : ''}
          </p>

          <AnimatePresence mode="wait">
            <motion.div key={`${q}|${cat}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {visible.length > 0 ? (
                <ul className="dishgrid">
                  {visible.map((item, i) => (
                    <DishCard key={item.id} item={item} index={i} currency={currency} categoryName={catName[item.category] || 'Menu'} onOpen={openDish} />
                  ))}
                </ul>
              ) : (
                <div className="empty">
                  {q ? (
                    <>
                      <h2>No dishes match &ldquo;{query.trim()}&rdquo;</h2>
                      <p>Try another word, or clear the search to see everything.</p>
                      <button type="button" className="btn btn--outline" onClick={() => setQuery('')}>Clear search</button>
                    </>
                  ) : (
                    <>
                      <h2>{activeChip?.name}</h2>
                      <p>This part of the menu is still being confirmed with Mama&rsquo;s Kitchen. Dishes and prices will appear here once they are verified.</p>
                      <button type="button" className="btn btn--outline" onClick={() => setCat('all')}>See available dishes</button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {!q && cat === 'all' && pendingCats.length > 0 && (
            <div className="pending">
              <h2>Still to be confirmed</h2>
              <p>These categories are ready and waiting for the restaurant&rsquo;s confirmed dishes and prices:</p>
              <ul>
                {pendingCats.map((c) => (
                  <li key={c.id}>
                    <button type="button" onClick={() => setCat(c.id)}>{c.name}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="menubody__foot">
            <QrCode size={16} aria-hidden="true" /> Prices are in Ethiopian birr (ETB) and shown only when confirmed.{' '}
            <Link href="/#locations">Find a branch</Link>
          </p>
        </div>
      </section>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            className="totop"
            onClick={toToolbar}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronUp size={18} aria-hidden="true" /> Categories
          </motion.button>
        )}
      </AnimatePresence>

      <DishModal mounted={mounted} item={active} currency={currency} categoryName={active ? catName[active.category] || 'Menu' : ''} onClose={closeDish} />
    </>
  );
}
