"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CT_COUNTIES } from "@/lib/constants";
import { useAudio } from "@/lib/audio-context";
import { MapPin } from "lucide-react";

export default function ServiceArea() {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const { play } = useAudio();

  return (
    <section id="service-area" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white md:text-5xl">Serving All of Connecticut</h2>
        <p className="mt-4 text-slate-400">Hover over the map to see our coverage areas.</p>

        <div className="glass-card mt-12 rounded-3xl p-8 md:p-16">
          <svg
            viewBox="0 0 400 300"
            className="mx-auto h-auto w-full max-w-md"
            onMouseLeave={() => setHoveredCounty(null)}
          >
            {/* Simplified CT Outline */}
            <path
              d="M40,70 L110,60 L130,60 L210,70 L260,120 L330,160 L320,220 L240,210 L200,190 L130,200 L60,210 Z"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            
            {CT_COUNTIES.map((county) => (
              <motion.path
                key={county.name}
                d={county.d}
                fill={hoveredCounty === county.name ? "rgba(45, 212, 191, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                stroke="rgba(45, 212, 191, 0.3)"
                strokeWidth="1.5"
                onMouseEnter={() => {
                  setHoveredCounty(county.name);
                  play("pop");
                }}
                className="cursor-none transition-all duration-200"
                whileHover={{ scale: 1.02 }}
              />
            ))}
          </svg>

          <div className="mt-8 flex h-8 items-center justify-center gap-2 text-lg font-medium text-teal-glow">
            <MapPin className="h-5 w-5" />
            {hoveredCounty ? `${hoveredCounty} County` : "Statewide Coverage"}
          </div>
        </div>
      </div>
    </section>
  );
}