"use client";

import { motion } from "framer-motion";

interface MaskedHeadingProps {
  children: string;
  className?: string;
}

export default function MaskedHeading({ children, className }: MaskedHeadingProps) {
  const words = children.split(" ");
  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <span key={i} className="text-mask mr-[0.25em] inline-block align-bottom">
          <motion.span 
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}