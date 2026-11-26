import { Cormorant_Garamond, DM_Sans, Noto_Sans_Ethiopic } from 'next/font/google';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/home.css';
import '../styles/menu.css';
import '../styles/qr.css';
import Providers from '../components/ui/Providers';
import Loader from '../components/layout/Loader';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { SITE } from '../data/site';
import { resolveSiteUrl } from '../lib/siteUrl';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const amharic = Noto_Sans_Ethiopic({ subsets: ['ethiopic'], variable: '--font-amharic', display: 'swap' });

const site = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const title = "Mama's Kitchen – Ethiopian Restaurant in Addis Ababa";

export const metadata = {
  metadataBase: site.ok ? new URL(site.origin) : undefined,
  title: { default: title, template: "%s | Mama's Kitchen" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['Mama’s Kitchen', 'Ethiopian restaurant', 'Addis Ababa', 'Megenagna', 'Bole Medhanialem', 'Quanta Firfir', 'Ethiopian food'],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title,
    description: SITE.description,
    locale: 'en_ET',
  },
  twitter: { card: 'summary_large_image', title, description: SITE.description },
  alternates: { canonical: '/' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f1315',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: SITE.name,
  servesCuisine: ['Ethiopian', 'International'],
  priceRange: 'ETB 1,000–4,000',
  areaServed: 'Addis Ababa, Ethiopia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${amharic.variable}`}>
      <body>
        <Providers>
          <a className="skip-link" href="#main">Skip to content</a>
          <Loader />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
