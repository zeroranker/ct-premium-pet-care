"use client";

import { motion } from "framer-motion";

// In Next.js App Router, template.tsx acts as a wrapper that re-mounts on navigation.
// This gives us a perfect, seamless page transition without complex AnimatePresence routing.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}