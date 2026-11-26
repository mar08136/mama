'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import FoodImage from '../ui/FoodImage';
import { formatPrice } from '../../lib/menu';
import { EASE } from '../motion';

function Panel({ item, categoryName, currency, onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const price = formatPrice(item.price, currency);
  const dietary = Array.isArray(item.dietary) ? item.dietary : [];

  useEffect(() => {
    const previous = document.activeElement;
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      if (previous && previous.focus) previous.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.article
        ref={panelRef}
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <button ref={closeRef} type="button" className="modal__close" onClick={onClose} aria-label="Close dish details">
          <X size={22} aria-hidden="true" />
        </button>

        <div className="modal__media img-frame">
          <FoodImage image={item.image && { ...item.image, label: item.image.src ? undefined : `${item.name} photograph` }} sizes="(min-width: 800px) 50vw, 100vw" priority />
          {item.image && !item.image.src && <span className="modal__tag">Placeholder photo</span>}
        </div>

        <div className="modal__body">
          <p className="eyebrow eyebrow--terracotta">{categoryName}{item.signature ? ' · Signature' : ''}</p>
          {item.nameAm && <p className="amharic modal__am" lang="am">{item.nameAm}</p>}
          <h2 id="dish-modal-title" className="modal__title">{item.name}</h2>
          <p className="modal__desc">{item.description}</p>

          <dl className="modal__meta">
            <div>
              <dt>Price</dt>
              <dd>{price || <span className="todo">To be confirmed</span>}</dd>
            </div>
            <div>
              <dt>Dietary</dt>
              <dd>{dietary.length ? dietary.join(' · ') : <span className="todo">Not yet confirmed</span>}</dd>
            </div>
          </dl>

          {item.note && <p className="note">{item.note}</p>}
          {item.image?.credit && <p className="note">Photo: {item.image.credit}</p>}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function DishModal({ item, categoryName, currency, onClose, mounted }) {
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{item && <Panel key={item.id} item={item} categoryName={categoryName} currency={currency} onClose={onClose} />}</AnimatePresence>,
    document.body,
  );
}
