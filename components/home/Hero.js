'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import FoodImage from '../ui/FoodImage';
import Logo from '../ui/Logo';
import { WordReveal, EASE } from '../motion';
import { IMAGES } from '../../data/images';

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="hero__bg" style={reduce ? undefined : { y }}>
        <FoodImage image={IMAGES.hero} priority sizes="100vw" />
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.div className="hero__logo" {...fade(2.0)}>
          <Logo size="lg" tone="dark" note priority />
        </motion.div>
        <WordReveal as="h1" id="hero-title" className="hero__title" text="Where Every Meal Feels Like Home." delay={2.1} />
        <motion.p className="hero__lead" {...fade(2.6)}>
          Discover the warmth of Ethiopian hospitality, the richness of our flavors, and the joy of sharing a meal together.
        </motion.p>
        <motion.div className="hero__actions" {...fade(2.8)}>
          <Link href="/menu" className="btn btn--gold">
            Explore Our Menu <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/#locations" className="btn btn--ghost">
            <MapPin size={18} aria-hidden="true" /> Find a Branch
          </Link>
        </motion.div>
      </div>
      <a href="#story" className="hero__cue" aria-label="Scroll to our story">
        <span />
      </a>
    </section>
  );
}
