"use client";

import { motion } from "framer-motion";
import { CreditCard, Clock, ShieldAlert } from "lucide-react";
import { PAYMENT_METHODS } from "@/lib/constants";

export default function PoliciesSection() {
  return (
    <section id="policies" className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 md:px-12 py-32">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <p className="text-eyebrow mb-4">The Fine Print</p>
            <h2 className="text-display text-4xl text-white md:text-6xl">Clear & Fair Policies</h2>
          </div>
          <p className="max-w-md text-slate-400 font-light leading-relaxed">
            Transparency you can trust. We keep our rules simple so you can focus on your pet.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Payments Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-zinc-900/80 border border-white/10 rounded-2xl p-10 shadow-xl shadow-black/50 flex flex-col min-h-[300px]"
          >
            <div className="mb-10">
              <CreditCard className="h-6 w-6 text-slate-500 mb-6" strokeWidth={1} />
              <h3 className="text-2xl font-medium text-white">Accepted Payments</h3>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-slate-500 font-light mb-6">We offer flexible payment options for your convenience:</p>
              <div className="flex flex-wrap gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <span key={method} className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cancellation Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="bg-zinc-900/80 border border-white/10 rounded-2xl p-10 shadow-xl shadow-black/50 flex flex-col min-h-[300px]"
          >
            <div className="mb-10">
              <ShieldAlert className="h-6 w-6 text-slate-500 mb-6" strokeWidth={1} />
              <h3 className="text-2xl font-medium text-white">Cancellation Policy</h3>
            </div>
            <div className="mt-auto">
              <p className="text-sm text-slate-500 font-light mb-6">
                We understand life happens. However, to fairly compensate our walkers for their reserved time:
              </p>
              <div className="flex items-start gap-4 rounded-xl border border-amber-glow/20 bg-amber-glow/5 p-5">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-amber-glow" />
                <div>
                  <p className="font-medium text-white text-sm">Strict 24-Hour Notice</p>
                  <p className="mt-1 text-xs text-slate-400 font-light leading-relaxed">
                    Cancellations made less than 24 hours before the scheduled appointment will incur a <span className="font-bold text-amber-glow">$15 fee</span>.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}