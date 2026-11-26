import Link from 'next/link';
import Logo from '../ui/Logo';
import { NAV, SITE } from '../../data/site';
import { BRANCHES } from '../../data/branches';

export default function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, hours } = SITE.contact;
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo size="md" tone="light" />
          <p>{SITE.tagline}</p>
          <p className="footer__small">{SITE.category} &middot; {SITE.priceRange}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer__h">Explore</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/table-card">Printable table card</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="footer__h">Branches</h2>
          <ul>
            {BRANCHES.map((b) => (
              <li key={b.id}>
                <Link href="/#locations">{b.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__h">Contact</h2>
          <ul className="footer__contact">
            <li>{phone ? <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a> : <span className="todo">Phone &ndash; to be added</span>}</li>
            <li>{email ? <a href={`mailto:${email}`}>{email}</a> : <span className="todo">Email &ndash; to be added</span>}</li>
            <li>{hours ? hours : <span className="todo">Opening hours &ndash; to be added</span>}</li>
          </ul>
          <ul className="footer__social" aria-label="Social media">
            {SITE.social.map((s) => (
              <li key={s.label}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ) : (
                  <span className="todo" title="Social link to be added">{s.label} (soon)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__bar">
        <p>&copy; {year} Mama&rsquo;s Kitchen. All rights reserved.</p>
        <p>Addis Ababa, Ethiopia</p>
      </div>
    </footer>
  );
}
