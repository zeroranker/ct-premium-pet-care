"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export default function TreatJar({ count }: { count: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative flex h-32 w-20 flex-col-reverse overflow-hidden rounded-b-xl rounded-t-lg border-2 border-white/20 bg-white/5 backdrop-blur-md">
        <div className="absolute top-0 h-4 w-full bg-white/20" />
        <AnimatePresence>
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -50, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex items-center justify-center"
            >
              <Cookie className="h-8 w-8 fill-amber-glow text-amber-600" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <span className="text-xs font-medium text-slate-400">{count} / 4 Treats</span>
    </div>
  );
}