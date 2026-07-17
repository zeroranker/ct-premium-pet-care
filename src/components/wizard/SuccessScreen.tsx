"use client";

import { motion } from "framer-motion";
import { PawPrint, PartyPopper } from "lucide-react";

export default function SuccessScreen() {
  // Generate random paw prints for the floating animation
  const paws = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden py-12 text-center"
    >
      {/* Floating Paw Prints (z-0) - strictly behind content */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            className="absolute bottom-0 text-teal-glow/30"
            style={{ left: `${paw.x}%` }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: "-100vh", opacity: [0, 1, 0] }}
            transition={{
              duration: paw.duration,
              delay: paw.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <PawPrint className="h-8 w-8" />
          </motion.div>
        ))}
      </div>

      {/* Main Content (z-10) - strictly in front of paws */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        className="z-10 flex h-24 w-24 items-center justify-center rounded-full bg-teal-glow/20"
      >
        <PartyPopper className="h-12 w-12 text-teal-glow" />
      </motion.div>

      <h3 className="z-10 mt-8 text-3xl font-bold text-white md:text-4xl">Request Received!</h3>
      <p className="z-10 mt-4 max-w-md text-slate-400">
        We&apos;ve sent your details to our team. Keep an eye on your phone—we&apos;ll reach out shortly to confirm your schedule and match you with the perfect walker.
      </p>
    </motion.div>
  );
}