"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAudio } from "@/lib/audio-context";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import PoliciesSection from "@/components/sections/PoliciesSection";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Home() {
  const { play } = useAudio();

  const scrollToNext = () => {
    play("whoosh");
    document.getElementById("services-overview")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <div className="grain-overlay" />

      {/* SECTION 1: HERO - Pure CSS stability to prevent mobile address bar glitching */}
      <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 md:px-12 pb-16 pt-32">
        
        {/* Removed motion.div and JS parallax. Pure CSS scale prevents mobile jank. */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="/hero-bg.png" alt="Hero" className="h-full w-full scale-110 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/90" />
          <div className="absolute inset-0 shadow-[inset_0_0_200px_50px_rgba(0,0,0,0.8)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div 
            className="mb-12 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-eyebrow mb-4 text-teal-glow">Connecticut&apos;s Premier Service</p>
            
            <h1 className="text-display text-5xl text-white md:text-7xl lg:text-8xl flex flex-wrap gap-x-4">
              <span className="text-mask">
                <motion.span 
                  className="flex"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                >
                  Luxury
                </motion.span>
              </span>
              <span className="text-mask">
                <motion.span 
                  className="flex text-glow text-teal-glow"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.75 }}
                >
                  Pet Care
                </motion.span>
              </span>
            </h1>
            <motion.p 
              className="mt-8 text-lg text-slate-400 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              We don&apos;t just walk dogs. We curate experiences. Absolute peace of mind for discerning pet parents.
            </motion.p>
          </motion.div>

          {/* Mobile-Optimized Layout: Stacks vertically, left-aligned */}
          <motion.div 
            className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between border-t border-white/10 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          >
            <MagneticButton>
              <Link 
                href="/services" 
                onMouseEnter={() => play("pop")}
                className="btn-primary group flex w-fit items-center gap-4 rounded-full py-5 px-8 text-sm font-medium tracking-wide"
              >
                Explore Services 
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            
            <div className="flex gap-12">
              <div>
                <p className="text-3xl font-light text-white">8</p>
                <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">Counties Served</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">4</p>
                <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">Service Tiers</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-slate-600 hover:text-teal-glow transition-colors z-20 md:block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="h-5 w-5 rotate-90" />
        </motion.button>
      </section>

      {/* SECTION 2: SERVICES OVERVIEW */}
      <section id="services-overview" className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 md:px-12 py-32">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-24 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-eyebrow mb-4">What We Do</p>
              <h2 className="text-display text-4xl text-white md:text-6xl">Tailored Service Tiers</h2>
            </div>
            <p className="max-w-md text-slate-400 font-light leading-relaxed">
              Transparent pricing designed to match your dog&apos;s exact energy level. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  className="group flex flex-col justify-between p-8 md:p-10 bg-zinc-900/80 border border-white/10 rounded-2xl transition-all duration-300 hover:border-teal-glow/40 hover:bg-zinc-900 shadow-xl shadow-black/50"
                >
                  <div>
                    {Icon && <Icon className="h-6 w-6 text-slate-500 group-hover:text-teal-glow transition-colors mb-8 md:mb-12" strokeWidth={1} />}
                    <h3 className="text-2xl font-medium text-white">{service.name}</h3>
                    <p className="mt-3 text-sm text-slate-500 font-light leading-relaxed">{service.description}</p>
                  </div>
                  <div className="mt-8 md:mt-12 flex items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-600">{service.duration}</p>
                      <p className="mt-2 text-3xl font-light text-white">
                        {service.price === "Custom" ? "Custom" : `$${service.price}`}
                      </p>
                    </div>
                    <Link 
                      href="/services" 
                      onMouseEnter={() => play("pop")}
                      className="text-slate-600 group-hover:text-white transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: POLICIES */}
      <PoliciesSection />

    </div>
  );
}