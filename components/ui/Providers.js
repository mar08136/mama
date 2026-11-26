'use client';

import { MotionConfig } from 'framer-motion';

// reducedMotion="user" → framer-motion honours the OS "reduce motion" setting.
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
