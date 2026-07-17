"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES, ENERGY_LEVELS } from "@/lib/constants";
import { useAudio } from "@/lib/audio-context";
import { Sofa, Dog, Footprints, Rocket, ArrowRight } from "lucide-react";
import { ServiceId } from "@/lib/types";

const EnergyIcons = [Sofa, Dog, Footprints, Rocket];

interface ServicesProps {
  onSelectService: (id: ServiceId, energy: number) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [energy, setEnergy] = useState(3);
  const { play } = useAudio();

  const handleSliderChange = (value: number) => {
    setEnergy(value);
    play("pop");
  };

  const handleBookClick = (id: ServiceId) => {
    play("whoosh");
    onSelectService(id, energy);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">Tailored Service Tiers</h2>
          <p className="mt-4 text-slate-400">Adjust the energy slider to find the perfect match, then jump straight to booking.</p>
        </div>

        {/* Energy Slider */}
        <div className="glass-card mb-16 rounded-2xl p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-lg font-medium text-slate-300">Couch Potato</span>
            <span className="text-lg font-medium text-teal-glow">{ENERGY_LEVELS[energy - 1].label}</span>
            <span className="text-lg font-medium text-slate-300">Marathon Runner</span>
          </div>
          
          <input
            type="range"
            min="1"
            max="5"
            value={energy}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="h-2 w-full appearance-none rounded-full bg-slate-700 accent-teal-glow"
            style={{
              background: `linear-gradient(to right, #2dd4bf 0%, #2dd4bf ${(energy - 1) * 25}%, #334155 ${(energy - 1) * 25}%, #334155 100%)`
            }}
          />
          
          <div className="mt-4 flex justify-center">
            <motion.div
              key={energy}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-glow/20 text-teal-glow"
            >
              {React.createElement(EnergyIcons[Math.floor((energy - 1) / 1.5)] || Dog, { className: "h-8 w-8" })}
            </motion.div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, idx) => {
            const isRecommended = service.recommendedEnergyLevels.includes(energy);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => play("pop")}
                className={`glass-card relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
                  isRecommended ? "border-teal-glow/50 shadow-[0_0_30px_-5px_rgba(45,212,191,0.3)]" : "border-white/10"
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-glow px-3 py-1 text-xs font-bold text-midnight">
                    Best Match
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{service.duration}</p>
                <p className="mt-4 flex-grow text-slate-300">{service.description}</p>
                <div className="mt-6 text-2xl font-bold text-amber-glow">
                  {service.price === "Custom" ? "Custom" : `$${service.price}`}
                </div>
                
                <button 
                  onClick={() => handleBookClick(service.id)}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                    isRecommended ? "bg-teal-glow text-midnight hover:bg-teal-glow/90" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Book This <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";