import { Star, ArrowUpRight } from 'lucide-react';
import { Reveal, WordReveal } from '../motion';
import { SITE } from '../../data/site';
import { BRANCHES, mapsSearchUrl } from '../../data/branches';

export default function Reviews() {
  const { value, count, source, branch } = SITE.rating;
  const main = BRANCHES.find((b) => b.featured);
  const fill = `${(value / 5) * 100}%`;
  const href = SITE.googleReviewUrl || mapsSearchUrl(main.mapsQuery);
  const label = SITE.googleReviewUrl ? 'Write a Google review' : 'See reviews on Google Maps';

  return (
    <section id="reviews" className="section section--dark reviews" aria-labelledby="rev-title">
      <div className="container reviews__inner">
        <Reveal as="p" className="eyebrow eyebrow--gold">Guest rating</Reveal>
        <WordReveal id="rev-title" text="What guests say on Google." className="display display--light" />

        <Reveal className="rating" delay={0.1}>
          <p className="rating__num" aria-label={`${value} out of 5`}>
            {value.toFixed(1)}
            <span>/ 5</span>
          </p>
          <div className="stars" aria-hidden="true">
            <div className="stars__base">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={26} strokeWidth={1.5} />
              ))}
            </div>
            <div className="stars__fill" style={{ width: fill }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={26} strokeWidth={1.5} fill="currentColor" />
              ))}
            </div>
          </div>
          <p className="rating__meta">
            from {count} {source} reviews &middot; {branch} branch
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="note note--light">
            This is the {source} rating for the {branch} branch only. We don&rsquo;t reproduce individual reviews here &ndash;
            read them in full on Google.
          </p>
          <a className="btn btn--gold" href={href} target="_blank" rel="noopener noreferrer">
            {label} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
