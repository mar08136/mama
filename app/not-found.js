import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="section section--dark notfound">
      <div className="container">
        <p className="eyebrow eyebrow--gold">404</p>
        <h1 className="display display--light">This page isn&rsquo;t on the menu.</h1>
        <p className="lead lead--light">Let&rsquo;s get you back to the table.</p>
        <Link href="/" className="btn btn--gold">Back to home</Link>
      </div>
    </section>
  );
}
