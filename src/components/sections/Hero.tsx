"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { useAudio } from "@/lib/audio-context";

export default function Hero() {
  const { play } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic text reveal
      gsap.from(".char", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.05,
        ease: "expo.out",
        duration: 1.5,
        delay: 0.3,
      });

      // UI elements fade in
      gsap.from(".hero-ui", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        duration: 1,
        delay: 1.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleHover = () => play("pop");
  
  const handleClick = () => {
    play("whoosh");
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper to split text into chars for GSAP
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
        {char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      
      {/* Floating Glass UI - Top Rating */}
      <motion.div 
        className="hero-ui glass-pill absolute top-32 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full px-5 py-2.5 md:top-40"
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-glow text-amber-glow" />
          ))}
        </div>
        <span className="text-sm font-medium text-slate-300">Rated #1 in CT</span>
      </motion.div>

      {/* Main Cinematic Title */}
      <div className="z-10 flex flex-col items-center text-center">
        <h1 className="text-cinematic text-[16vw] text-white md:text-[12vw] lg:text-[10rem]">
          {splitText("Luxury")}
        </h1>
        <h1 className="text-cinematic -mt-4 text-[16vw] text-teal-glow text-glow md:text-[12vw] lg:text-[10rem] md:-mt-8">
          {splitText("Pet Care")}
        </h1>
      </div>

      {/* Subtitle & CTA */}
      <div className="hero-ui z-10 mt-12 flex max-w-xl flex-col items-center">
        <p className="text-balance text-lg text-slate-400 md:text-xl">
          Cinematic walks, premium sitting, and absolute peace of mind for Connecticut&apos;s most discerning pet parents.
        </p>

        <button
          onMouseEnter={handleHover}
          onClick={handleClick}
          className="btn-glow mt-10 rounded-full bg-teal-glow px-10 py-4 text-lg font-bold text-midnight"
        >
          Explore Services
        </button>
      </div>

      {/* Floating Glass UI - Bottom Location Card */}
      <motion.div 
        className="hero-ui absolute bottom-32 left-6 z-20 hidden md:block"
      >
        <div className="glass-card rounded-2xl p-5 max-w-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-glow/10">
              <MapPin className="h-5 w-5 text-teal-glow" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Statewide Coverage</p>
              <p className="text-xs text-slate-400">Fairfield to Windham</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="hero-ui absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}