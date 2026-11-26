import { Users, Infinity as InfinityIcon, Wine, Flame } from 'lucide-react';
import { Reveal, WordReveal, Parallax, ImageReveal } from '../motion';
import FoodImage from '../ui/FoodImage';
import { IMAGES } from '../../data/images';

const FEATURES = [
  {
    icon: Users,
    title: 'Group-friendly dining',
    text: 'Family gatherings, celebrations and get-togethers with friends are right at home around our tables.',
  },
  {
    icon: InfinityIcon,
    title: 'All-you-can-eat dining',
    text: 'All-you-can-eat dining is part of the Mama’s Kitchen experience. Ask your branch for current details.',
  },
  {
    icon: Wine,
    title: 'Happy-hour food',
    text: 'Happy-hour food for a relaxed evening with company. Ask your branch for current details.',
  },
  {
    icon: Flame,
    title: 'Fireplace',
    text: 'A fireplace adds warmth to the room – the kind of atmosphere that makes you want to stay a little longer.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section section--sand experience" aria-labelledby="exp-title">
      <div className="container">
        <header className="section__head section__head--center">
          <Reveal as="p" className="eyebrow">The dining experience</Reveal>
          <WordReveal id="exp-title" text="Come hungry. Stay a while." className="display" />
        </header>

        <div className="experience__grid">
          <ImageReveal className="experience__media">
            <Parallax offset={30} className="img-frame">
              <FoodImage image={IMAGES.experience} sizes="(min-width: 900px) 40vw, 100vw" />
            </Parallax>
          </ImageReveal>

          <ul className="experience__list">
            {FEATURES.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="feature">
                <span className="feature__icon">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <p className="note note--center">Features can vary by branch &ndash; please confirm with your branch before visiting.</p>
      </div>
    </section>
  );
}
