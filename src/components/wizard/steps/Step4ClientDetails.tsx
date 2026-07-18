"use client";

import { BookingData } from "@/lib/types";
import { SERVICES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Dog, PawPrint } from "lucide-react";

interface StepProps {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
}

export default function Step4ClientDetails({ data, updateData }: StepProps) {
  const selectedService = SERVICES.find((s) => s.id === data.serviceId);
  const formattedDate = data.date ? formatDate(new Date(data.date)) : null;

  return (
    <div>
      <p className="text-eyebrow mb-2">Step 4</p>
      <h2 className="text-display text-3xl text-white mb-8">Client Details</h2>

      {/* Booking Summary Card - CRITICAL UX ADDITION */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-zinc-950/50 p-6">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Booking Summary</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <PawPrint className="h-4 w-4 text-teal-glow" strokeWidth={1.5} />
            <span>{selectedService?.name || "Not selected"}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Dog className="h-4 w-4 text-teal-glow" strokeWidth={1.5} />
            <span>{data.dogName || "No name provided"}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="h-4 w-4 text-teal-glow" strokeWidth={1.5} />
            <span>{formattedDate || "No date selected"}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="h-4 w-4 text-teal-glow" strokeWidth={1.5} />
            <span>{data.time || "No time selected"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="input-group">
          <input
            id="clientName"
            type="text"
            required
            placeholder=" "
            value={data.clientName}
            onChange={(e) => updateData({ clientName: e.target.value })}
            className="input-field"
          />
          <label htmlFor="clientName" className="input-label">Full Name</label>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="input-group">
            <input
              id="clientPhone"
              type="tel"
              required
              placeholder=" "
              value={data.clientPhone}
              onChange={(e) => updateData({ clientPhone: e.target.value })}
              className="input-field"
            />
            <label htmlFor="clientPhone" className="input-label">Phone Number</label>
          </div>
          <div className="input-group">
            <input
              id="clientEmail"
              type="email"
              required
              placeholder=" "
              value={data.clientEmail}
              onChange={(e) => updateData({ clientEmail: e.target.value })}
              className="input-field"
            />
            <label htmlFor="clientEmail" className="input-label">Email Address</label>
          </div>
        </div>

        <p className="text-xs text-slate-600 font-light leading-relaxed">
          By submitting this request, you agree to our Cancellation Policy and acknowledge that your contact information will be used solely to confirm and manage your booking.
        </p>
      </div>
    </div>
  );
}