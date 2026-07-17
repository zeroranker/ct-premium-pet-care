"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingWizard from "@/components/sections/BookingWizard";
import { ServiceId } from "@/lib/types";

function BookContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") as ServiceId | null;
  const energyParam = parseInt(searchParams.get("energy") || "3", 10);

  return (
    <BookingWizard preselectedService={serviceParam} preselectedEnergy={energyParam} />
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-slate-400">Loading wizard...</div>}>
      <BookContent />
    </Suspense>
  );
}