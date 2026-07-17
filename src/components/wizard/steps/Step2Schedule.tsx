"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { BookingData } from "@/lib/types";
import { useAudio } from "@/lib/audio-context";
import { getNextAvailableDays, getAvailableSlots } from "@/lib/availability";
import { Check } from "lucide-react";

interface StepProps {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
}

export default function Step2Schedule({ data, updateData }: StepProps) {
  const { play } = useAudio();
  const scrollRef = useRef<HTMLDivElement>(null);
  const availableDays = getNextAvailableDays(30);
  const slots = data.date ? getAvailableSlots(new Date(data.date)) : [];

  // Click and Drag Scroll Logic
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (scrollRef.current) {
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };
  const handleMouseLeave = () => { isDown.current = false; };
  const handleMouseUp = () => { isDown.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleSelectDate = (date: Date) => {
    play("pop");
    updateData({ date: date.toISOString(), time: null });
  };

  const handleSelectTime = (time: string) => {
    play("pop");
    updateData({ time });
  };

  return (
    <div>
      <p className="text-eyebrow mb-2">Step 2</p>
      <h2 className="text-display text-3xl text-white mb-2">Select Date & Time</h2>
      <p className="text-sm text-slate-500 font-light mb-8">Sat/Sun/Mon: 9AM-6PM | Tue-Fri: 11AM-3PM</p>
      
      <div className="mt-8">
        <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">Select Date (Drag to scroll)</h3>
        <div className="relative">
          <div 
            ref={scrollRef} 
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="date-wheel flex cursor-grab gap-3 overflow-x-auto py-4 active:cursor-grabbing"
          >
            {availableDays.map((day) => {
              const isoDate = day.toISOString();
              const isSelected = data.date === isoDate;
              return (
                <motion.button
                  key={isoDate}
                  onClick={() => handleSelectDate(day)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`date-snap-item flex w-20 flex-shrink-0 flex-col items-center rounded-xl border p-3 transition-colors ${
                    isSelected ? "border-teal-glow bg-teal-glow/10" : "border-white/10 bg-zinc-900/50 hover:border-white/30"
                  }`}
                >
                  <span className="text-xs uppercase text-slate-500">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className={`mt-1 text-xl font-bold ${isSelected ? "text-teal-glow" : "text-white"}`}>
                    {day.getDate()}
                  </span>
                  <span className="text-xs text-slate-500">
                    {day.toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </motion.button>
              );
            })}
          </div>
          {/* Edge Fade Indicators for Wheel */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
        </div>
      </div>

      {data.date && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-10">
          <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">Select Time</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {slots.map((time) => {
              const isSelected = data.time === time;
              return (
                <motion.button
                  key={time}
                  onClick={() => handleSelectTime(time)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                    isSelected ? "border-teal-glow bg-teal-glow/10 text-white" : "border-white/10 bg-zinc-900/50 text-slate-400 hover:border-white/30"
                  }`}
                >
                  {isSelected && <Check className="absolute top-1 right-1 h-3 w-3 text-teal-glow" />}
                  {time}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}