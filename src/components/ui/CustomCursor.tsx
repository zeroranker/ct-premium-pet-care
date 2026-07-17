"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Dot (instant tracking)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring (smooth, lagged tracking)
  const ringX = useSpring(-100, { damping: 30, stiffness: 700, mass: 0.5 });
  const ringY = useSpring(-100, { damping: 30, stiffness: 700, mass: 0.5 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("button, a, input, select, textarea, [role='button'], label");
      setIsPointer(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block">
      {/* Outer Ring */}
      <motion.div
        className="absolute rounded-full border border-teal-glow/50"
        style={{
          translateX: ringX,
          translateY: ringY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          opacity: isPointer ? 1 : 0.6,
          backgroundColor: isPointer ? "rgba(45, 212, 191, 0.1)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="absolute rounded-full bg-teal-glow"
        style={{
          translateX: dotX,
          translateY: dotY,
          x: "-50%",
          y: "-50%",
          boxShadow: "0 0 10px rgba(45, 212, 191, 0.8)",
        }}
        animate={{
          width: isPointer ? 0 : 6,
          height: isPointer ? 0 : 6,
          opacity: isPointer ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
      />
    </div>
  );
}