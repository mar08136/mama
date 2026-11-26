'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Reveal, WordReveal, EASE } from '../motion';
import { BRANCHES, mapsSearchUrl } from '../../data/branches';

export default function Branches() {
  const [activeId, setActiveId] = useState('megenagna');
  const active = BRANCHES.find((b) => b.id === activeId) || BRANCHES[0];

  return (
    <section id="locations" className="section section--cream branches" aria-labelledby="loc-title">
      <div className="container">
        <header className="section__head">
          <Reveal as="p" className="eyebrow">Locations</Reveal>
          <WordReveal id="loc-title" text="Find your nearest Mama's Kitchen." className="display" />
        </header>

        <div className="branches__grid">
          <div className="branches__list" role="tablist" aria-label="Branches" aria-orientation="vertical">
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                id={`tab-${b.id}`}
                aria-selected={b.id === activeId}
                aria-controls="branch-panel"
                className={`branchtab ${b.id === activeId ? 'is-active' : ''}`}
                onClick={() => setActiveId(b.id)}
              >
                <span className="branchtab__name">{b.name}</span>
                {b.featured && <span className="badge">Main branch</span>}
              </button>
            ))}
          </div>

          <div id="branch-panel" role="tabpanel" aria-labelledby={`tab-${activeId}`} className="branchpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className={`branchcard ${active.featured ? 'branchcard--featured' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {active.featured && <p className="eyebrow eyebrow--gold">Featured branch</p>}
                <h3>{active.name}</h3>
                <p className="branchcard__area">
                  <MapPin size={18} aria-hidden="true" /> {active.area}
                </p>
                {active.address ? (
                  <p className="branchcard__addr">{active.address}</p>
                ) : (
                  <p className="todo">Exact address to be confirmed</p>
                )}
                <div className="branchcard__actions">
                  {active.mapsVerified ? (
                    <a className="btn btn--gold" href={mapsSearchUrl(active.mapsQuery)} target="_blank" rel="noopener noreferrer">
                      <Navigation size={18} aria-hidden="true" /> Get directions
                    </a>
                  ) : (
                    <a className="btn btn--outline" href={mapsSearchUrl(active.mapsQuery)} target="_blank" rel="noopener noreferrer">
                      <Search size={18} aria-hidden="true" /> Search on Google Maps
                    </a>
                  )}
                </div>
                {!active.mapsVerified && (
                  <p className="note">A verified map pin for this branch will be added once the address is confirmed.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
