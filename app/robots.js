import { resolveSiteUrl } from '../lib/siteUrl';

export default function robots() {
  const site = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/table-card'] },
    ...(site.ok ? { sitemap: `${site.origin}/sitemap.xml` } : {}),
  };
}
