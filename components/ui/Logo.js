import Image from 'next/image';
import { SITE } from '../../data/site';

/**
 * The brand logo. Until a real logo is set in data/site.js this renders a
 * clearly marked wordmark placeholder – it is NOT the real Mama's Kitchen logo.
 */
export default function Logo({ size = 'md', tone = 'light', note = false, priority = false }) {
  const { src, width, height, alt } = SITE.logo;
  if (src) {
    return (
      <Image
        className={`logo-img logo-img--${size}`}
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
      />
    );
  }
  return (
    <span className={`logo-ph logo-ph--${size} logo-ph--${tone}`} role="img" aria-label="Mama's Kitchen (logo placeholder)">
      <span className="logo-ph__name">Mama&rsquo;s</span>
      <span className="logo-ph__sub">Kitchen</span>
      {note && <em className="logo-ph__note">Logo placeholder</em>}
    </span>
  );
}
