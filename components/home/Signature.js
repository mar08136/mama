import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal, WordReveal, ImageReveal } from '../motion';
import FoodImage from '../ui/FoodImage';
import menu from '../../public/data/menu.json';
import { formatPrice } from '../../lib/menu';

export default function Signature() {
  const dishes = menu.items.filter((i) => i.signature && i.available !== false);
  return (
    <section id="signature" className="section section--dark signature" aria-labelledby="signature-title">
      <div className="container">
        <header className="section__head">
          <Reveal as="p" className="eyebrow eyebrow--gold">Signature dish</Reveal>
          <WordReveal id="signature-title" text="The flavor we are known for." className="display display--light" />
        </header>

        <div className="signature__grid">
          {dishes.map((d) => {
            const price = formatPrice(d.price, menu.meta.currency);
            return (
              <Reveal key={d.id} className="sigcard">
                <Link href={`/menu?dish=${d.id}`} className="sigcard__link" aria-label={`View ${d.name} on the menu`}>
                  <ImageReveal className="sigcard__media">
                    <div className="img-frame sigcard__frame">
                      <FoodImage image={{ ...d.image, label: 'Quanta Firfir photograph' }} sizes="(min-width: 900px) 55vw, 100vw" />
                    </div>
                  </ImageReveal>
                  <div className="sigcard__body">
                    <p className="amharic sigcard__am" lang="am">{d.nameAm}</p>
                    <h3 className="sigcard__name">{d.name}</h3>
                    <p>{d.description}</p>
                    <p className="sigcard__price">{price || 'Price to be confirmed'}</p>
                    <span className="textlink">
                      See it on the menu <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}

          <Reveal className="sigcta" delay={0.15}>
            <p className="eyebrow eyebrow--gold">The full menu</p>
            <h3>Browse every dish, category by category.</h3>
            <p>More dishes will appear as Mama&rsquo;s Kitchen confirms its menu and prices.</p>
            <Link href="/menu" className="btn btn--gold">
              View the Complete Menu <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
