"use client";

import { BookingData } from "@/lib/types";

interface StepProps {
  data: BookingData;
  updateData: (data: Partial<BookingData>) => void;
}

export default function Step4ClientDetails({ data, updateData }: StepProps) {
  return (
    <div>
      <p className="text-eyebrow mb-2">Step 4</p>
      <h2 className="text-display text-3xl text-white mb-8">Client Details</h2>
      
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
      </div>
    </div>
  );
}