"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CT_COUNTIES } from "@/lib/constants";
import { useAudio } from "@/lib/audio-context";
import { MapPin } from "lucide-react";

export default function CoveragePage() {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const { play } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative z-10 px-6 md:px-12 py-32 pt-40"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-eyebrow mb-4">Where We Go</p>
            <h2 className="text-display text-4xl text-white md:text-6xl">Statewide Coverage</h2>
          </div>
          <p className="max-w-md text-slate-400 font-light leading-relaxed">
            We proudly serve all 8 counties across Connecticut. Hover over the map or the list to see our exact coverage zones.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Interactive Map */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-8 shadow-xl shadow-black/50">
            <svg
              viewBox="0 0 400 300"
              className="mx-auto h-auto w-full max-w-md"
              onMouseLeave={() => setHoveredCounty(null)}
            >
              <path
                d="M40,70 L110,60 L130,60 L210,70 L260,120 L330,160 L320,220 L240,210 L200,190 L130,200 L60,210 Z"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
              />
              
              {CT_COUNTIES.map((county) => (
                <motion.path
                  key={county.name}
                  d={county.d}
                  fill={hoveredCounty === county.name ? "rgba(45, 212, 191, 0.4)" : "rgba(255, 255, 255, 0.03)"}
                  stroke={hoveredCounty === county.name ? "rgba(45, 212, 191, 0.8)" : "rgba(255, 255, 255, 0.1)"}
                  strokeWidth="1.5"
                  onMouseEnter={() => {
                    setHoveredCounty(county.name);
                    play("pop");
                  }}
                  className="cursor-pointer transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                />
              ))}
            </svg>
          </div>

          {/* Synced County List */}
          <div className="grid grid-cols-2 gap-4">
            {CT_COUNTIES.map((county, i) => (
              <motion.div
                key={county.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => {
                  setHoveredCounty(county.name);
                  play("pop");
                }}
                onMouseLeave={() => setHoveredCounty(null)}
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                  hoveredCounty === county.name ? "bg-zinc-900 border-teal-glow" : "bg-zinc-900/50 border-white/10 hover:border-white/30"
                }`}
              >
                <MapPin className={`h-4 w-4 transition-colors ${hoveredCounty === county.name ? "text-teal-glow" : "text-slate-600"}`} strokeWidth={1.5} />
                <span className={`text-sm font-medium transition-colors ${hoveredCounty === county.name ? "text-white" : "text-slate-400"}`}>
                  {county.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}