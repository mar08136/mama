'use client';

import { motion } from 'framer-motion';

// Re-mounts on every navigation → a soft cross-fade between pages.
// (Opacity only: a transform here would break position:fixed descendants.)
export default function Template({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
