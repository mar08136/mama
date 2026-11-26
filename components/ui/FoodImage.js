import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

/**
 * Renders a real photo when `image.src` is set, otherwise a clearly labeled
 * placeholder. The parent must be `position: relative` with a size
 * (or use the `.img-frame` class).
 */
export default function FoodImage({ image, sizes = '100vw', priority = false, className = '' }) {
  const { src, alt, label } = image || {};

  if (!src) {
    return (
      <div
        className={`ph ${className}`}
        role="img"
        aria-label={`${alt || 'Photograph'} (placeholder – photo coming soon)`}
      >
        <div className="ph__body">
          <ImageIcon size={28} strokeWidth={1.25} aria-hidden="true" />
          <span className="ph__label">{label || 'Photo placeholder'}</span>
          <small className="ph__hint">Placeholder – replace with Mama&rsquo;s Kitchen&rsquo;s own photo</small>
        </div>
      </div>
    );
  }

  const remote = /^https?:\/\//i.test(src);
  return (
    <Image
      className={`ph-img ${className}`}
      src={src}
      alt={alt || ''}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={remote}
      style={{ objectFit: 'cover' }}
    />
  );
}
