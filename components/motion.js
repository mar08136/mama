'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

/** Fade + rise on scroll-in. Disabled automatically for reduced-motion users. */
export function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Headline that reveals word by word. */
export function WordReveal({ text, as = 'h2', className, delay = 0, id }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.h2;
  const words = text.split(' ');
  return (
    <Tag
      id={id}
      className={className}
      aria-label={text}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="word" aria-hidden="true">
          <motion.span
            className="word__inner"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}

/** Image mask reveal on scroll-in. */
export function ImageReveal({ children, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Gentle vertical parallax for large photography (children should overscan, see .parallax CSS). */
export function Parallax({ children, offset = 36, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return (
    <div ref={ref} className={`parallax ${className || ''}`}>
      <motion.div className="parallax__inner" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
