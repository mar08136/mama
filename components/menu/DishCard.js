'use client';

import { motion } from 'framer-motion';
import FoodImage from '../ui/FoodImage';
import { formatPrice } from '../../lib/menu';
import { EASE } from '../motion';

export default function DishCard({ item, categoryName, currency, onOpen, index = 0 }) {
  const price = formatPrice(item.price, currency);
  const featured = !!item.signature;
  return (
    <motion.li
      layout
      className={`dish ${featured ? 'dish--featured' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.4), ease: EASE }}
    >
      <button type="button" className="dish__btn" onClick={() => onOpen(item)} aria-label={`${item.name}${item.nameAm ? `, ${item.nameAm}` : ''} – view details`}>
        <span className="dish__media img-frame">
          <FoodImage image={item.image && { ...item.image, label: item.image.src ? undefined : `${item.name} photograph` }} sizes="(min-width: 1000px) 40vw, (min-width: 640px) 50vw, 100vw" />
          {featured && <span className="dish__flag">Signature</span>}
        </span>
        <span className="dish__body">
          <span className="dish__cat">{categoryName}</span>
          {item.nameAm && <span className="amharic dish__am" lang="am">{item.nameAm}</span>}
          <span className="dish__name">{item.name}</span>
          <span className="dish__desc">{item.description}</span>
          <span className="dish__foot">
            <span className={`dish__price ${price ? '' : 'is-tbc'}`}>{price || 'Price to be confirmed'}</span>
            <span className="dish__more">Details</span>
          </span>
        </span>
      </button>
    </motion.li>
  );
}
