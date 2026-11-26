import { resolveSiteUrl } from '../lib/siteUrl';

export default function sitemap() {
  const site = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (!site.ok) return [];
  return [
    { url: site.origin, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.origin}/menu`, changeFrequency: 'weekly', priority: 0.9 },
  ];
}
