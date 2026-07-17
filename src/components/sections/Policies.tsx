"use client";

import { CreditCard, Clock, ShieldAlert } from "lucide-react";
import { PAYMENT_METHODS } from "@/lib/constants";

export default function Policies() {
  return (
    <section id="policies" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">Clear & Fair Policies</h2>
          <p className="mt-4 text-slate-400">Transparency you can trust.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Payments */}
          <div className="glass-card rounded-2xl p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-glow/10 text-teal-glow">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Accepted Payments</h3>
            </div>
            <p className="text-slate-400">We offer flexible payment options for your convenience:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {PAYMENT_METHODS.map((method) => (
                <span key={method} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Cancellation */}
          <div className="glass-card rounded-2xl p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-glow/10 text-amber-glow">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Cancellation Policy</h3>
            </div>
            <p className="text-slate-400">
              We understand life happens. However, to fairly compensate our walkers for their reserved time:
            </p>
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-glow/20 bg-amber-glow/5 p-4">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-amber-glow" />
              <div>
                <p className="font-semibold text-white">Strict 24-Hour Notice</p>
                <p className="mt-1 text-sm text-slate-400">
                  Cancellations made less than 24 hours before the scheduled appointment will incur a <span className="font-bold text-amber-glow">$15 fee</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}