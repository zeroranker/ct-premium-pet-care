"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES, ENERGY_LEVELS } from "@/lib/constants";
import { useAudio } from "@/lib/audio-context";
import { ArrowRight } from "lucide-react";
import { ServiceId } from "@/lib/types";
import Link from "next/link";

export default function ServicesPage() {
  const [energy, setEnergy] = useState(3);
  const { play } = useAudio();

  const handleSliderChange = (value: number) => {
    setEnergy(value);
    play("pop");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative z-10 px-6 md:px-12 py-32 pt-40"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-eyebrow mb-4">Customize Your Plan</p>
            <h2 className="text-display text-4xl text-white md:text-6xl">Tailored Tiers</h2>
          </div>
          <p className="max-w-md text-slate-400 font-light leading-relaxed">
            Adjust the energy slider to find the perfect match. Our pricing adapts to your dog&apos;s exact needs.
          </p>
        </div>

        {/* Custom Energy Slider - Refined */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-10 mb-16">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-slate-500">Couch Potato</span>
            <span className="text-lg font-medium text-teal-glow">{ENERGY_LEVELS[energy - 1].label}</span>
            <span className="text-xs uppercase tracking-widest text-slate-500">Marathon Runner</span>
          </div>
          
          <input
            type="range"
            min="1"
            max="5"
            value={energy}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="energy-slider w-full"
            style={{
              background: `linear-gradient(to right, #2dd4bf 0%, #2dd4bf ${(energy - 1) * 25}%, #333333 ${(energy - 1) * 25}%, #333333 100%)`
            }}
          />
          
          <div className="mt-4 flex justify-between px-1">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button 
                key={lvl} 
                onClick={() => handleSliderChange(lvl)} 
                className={`h-2 w-2 rounded-full transition-colors ${energy === lvl ? "bg-teal-glow" : "bg-zinc-700 hover:bg-zinc-500"}`}
                aria-label={`Set energy to ${lvl}`}
              />
            ))}
          </div>
        </div>

        {/* Service Cards - Matching Home Page Aesthetic */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const isRecommended = service.recommendedEnergyLevels.includes(energy);
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                onMouseEnter={() => play("pop")}
                className={`group relative flex flex-col justify-between p-8 min-h-[420px] rounded-2xl transition-all duration-300 shadow-xl shadow-black/50 ${
                  isRecommended 
                    ? "bg-zinc-900 border border-teal-glow/40 hover:border-teal-glow" 
                    : "bg-zinc-900/80 border border-white/10 hover:border-white/20"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-8 rounded-full bg-teal-glow px-3 py-1 text-xs font-bold text-midnight">
                    Best Match
                  </div>
                )}
                <div>
                  {Icon && <Icon className="h-6 w-6 text-slate-500 group-hover:text-teal-glow transition-colors mb-10" strokeWidth={1} />}
                  <h3 className="text-2xl font-medium text-white">{service.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-widest text-slate-600">{service.duration}</p>
                  <p className="mt-4 text-sm text-slate-500 font-light leading-relaxed flex-grow">{service.description}</p>
                </div>
                
                <div className="mt-12">
                  <p className="text-3xl font-light text-white mb-6">
                    {service.price === "Custom" ? "Custom" : `$${service.price}`}
                  </p>
                  <Link 
                    href={`/book?service=${service.id}&energy=${energy}`}
                    onClick={() => play("whoosh")}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
                      isRecommended ? "bg-teal-glow text-midnight hover:bg-teal-glow/90" : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    Book This <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}