import { Reveal, WordReveal, ImageReveal, Parallax } from '../motion';
import FoodImage from '../ui/FoodImage';
import { IMAGES } from '../../data/images';
import { SITE } from '../../data/site';

export default function Story() {
  return (
    <section id="story" className="section section--cream story" aria-labelledby="story-title">
      <div className="container story__grid">
        <div className="story__media">
          <ImageReveal className="story__main">
            <Parallax offset={28} className="img-frame">
              <FoodImage image={IMAGES.story} sizes="(min-width: 900px) 45vw, 100vw" />
            </Parallax>
          </ImageReveal>
          {IMAGES.storySmall.src && (
            <Reveal className="story__small" delay={0.2}>
              <div className="img-frame">
                <FoodImage image={IMAGES.storySmall} sizes="(min-width: 900px) 20vw, 50vw" />
              </div>
            </Reveal>
          )}
        </div>

        <div className="story__text">
          <Reveal as="p" className="eyebrow">Our story</Reveal>
          <WordReveal id="story-title" text="A table is meant to be shared." className="display" />
          <Reveal delay={0.1}>
            <p className="lead">
              In Ethiopia, a meal is never just about the food. It is the shared platter at the center of the table, the
              injera torn and passed by hand, and the unhurried time spent with the people you love.
            </p>
            <p>
              Mama&rsquo;s Kitchen is built around that spirit of hospitality. Come as a family, a group of friends or a
              table of colleagues &ndash; and leave feeling like you were welcomed home.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="facts">
              <div>
                <dt>Cuisine</dt>
                <dd>Ethiopian &amp; international</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>Branches across Addis Ababa</dd>
              </div>
              <div>
                <dt>Typical spend</dt>
                <dd>{SITE.priceRange}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
