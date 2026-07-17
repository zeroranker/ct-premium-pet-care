"use client";

import { motion } from "framer-motion";
import { BookingData, DogSize } from "@/lib/types";
import { useAudio } from "@/lib/audio-context";

interface StepProps {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
}

const SIZES: { id: DogSize; label: string }[] = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
  { id: "giant", label: "Giant" },
];

export default function Step3DogDetails({ data, updateData }: StepProps) {
  const { play } = useAudio();

  const handleSizeSelect = (size: DogSize) => {
    play("pop");
    updateData({ dogSize: size });
  };

  return (
    <div>
      <p className="text-eyebrow mb-2">Step 3</p>
      <h2 className="text-display text-3xl text-white mb-8">Dog Details</h2>
      
      <div className="space-y-8">
        <div className="input-group">
          <input
            id="dogName"
            type="text"
            required
            placeholder=" "
            value={data.dogName}
            onChange={(e) => updateData({ dogName: e.target.value })}
            className="input-field"
          />
          <label htmlFor="dogName" className="input-label">Dog&apos;s Name</label>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Size</p>
          <div className="grid grid-cols-4 gap-3">
            {SIZES.map((size) => (
              <motion.button
                key={size.id}
                onClick={() => handleSizeSelect(size.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-xl border py-4 text-sm font-medium transition-all ${
                  data.dogSize === size.id ? "bg-teal-glow/10 border-teal-glow text-white" : "bg-zinc-900/50 border-white/10 text-slate-400 hover:border-white/30"
                }`}
              >
                {size.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <textarea
            id="notes"
            placeholder=" "
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            className="input-field"
          />
          <label htmlFor="notes" className="input-label">Special Notes (Optional)</label>
        </div>
      </div>
    </div>
  );
}