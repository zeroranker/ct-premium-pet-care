"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { BookingData, ServiceId } from "@/lib/types";
import { useAudio } from "@/lib/audio-context";
import { Check } from "lucide-react";

interface StepProps {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
}

export default function Step1Service({ data, updateData }: StepProps) {
  const { play } = useAudio();

  const handleSelect = (id: ServiceId) => {
    play("pop");
    updateData({ serviceId: id });
  };

  return (
    <div>
      <p className="text-eyebrow mb-2">Step 1</p>
      <h2 className="text-display text-3xl text-white mb-8">Select Your Service</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {SERVICES.map((service) => {
          const isSelected = data.serviceId === service.id;
          const Icon = service.icon;
          return (
            <motion.button
              key={service.id}
              onClick={() => handleSelect(service.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col p-6 text-left rounded-xl border transition-all duration-300 ${
                isSelected ? "bg-zinc-900 border-teal-glow" : "bg-zinc-900/50 border-white/10 hover:border-white/30"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-teal-glow">
                  <Check className="h-4 w-4 text-midnight" strokeWidth={3} />
                </div>
              )}
              <div className="flex items-center gap-4 mb-4">
                {Icon && <Icon className={`h-5 w-5 transition-colors ${isSelected ? "text-teal-glow" : "text-slate-600"}`} strokeWidth={1.5} />}
                <h3 className="text-xl font-medium text-white">{service.name}</h3>
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-600 mb-4">{service.duration}</p>
              <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow">{service.description}</p>
              <div className="mt-6 text-2xl font-light text-white">
                {service.price === "Custom" ? "Custom Quote" : `$${service.price}`}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}