import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { Reveal, WordReveal } from '../motion';
import { SITE } from '../../data/site';
import { BRANCHES, mapsSearchUrl } from '../../data/branches';

function Row({ icon: Icon, label, children }) {
  return (
    <li className="contact__row">
      <span className="contact__icon"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
      <div>
        <h3>{label}</h3>
        <p>{children}</p>
      </div>
    </li>
  );
}

export default function Contact() {
  const { phone, email, hours } = SITE.contact;
  const main = BRANCHES.find((b) => b.featured);
  return (
    <section id="contact" className="section section--charcoal contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div>
          <Reveal as="p" className="eyebrow eyebrow--gold">Contact</Reveal>
          <WordReveal id="contact-title" text="We would love to host you." className="display display--light" />
          <Reveal delay={0.1}>
            <p className="lead lead--light">
              Reach out or simply stop by. Contact details marked &ldquo;to be added&rdquo; will be filled in as soon as
              they are confirmed.
            </p>
          </Reveal>
        </div>

        <Reveal as="ul" className="contact__list" delay={0.1}>
          <Row icon={MapPin} label="Main branch &ndash; Megenagna">
            <a href={mapsSearchUrl(main.mapsQuery)} target="_blank" rel="noopener noreferrer">{main.address}</a>
          </Row>
          <Row icon={Phone} label="Phone">
            {phone ? <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a> : <span className="todo">To be added</span>}
          </Row>
          <Row icon={Mail} label="Email">
            {email ? <a href={`mailto:${email}`}>{email}</a> : <span className="todo">To be added</span>}
          </Row>
          <Row icon={Clock} label="Opening hours">
            {hours || <span className="todo">To be added</span>}
          </Row>
        </Reveal>
      </div>
    </section>
  );
}
