"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookingData, ServiceId } from "@/lib/types";
import { useAudio } from "@/lib/audio-context";
import { useToast } from "@/components/ui/Toast";
import { submitBookingToFormspree } from "@/lib/formspree";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";

import TreatJar from "@/components/wizard/TreatJar";
import SuccessScreen from "@/components/wizard/SuccessScreen";
import Step1Service from "@/components/wizard/steps/Step1Service";
import Step2Schedule from "@/components/wizard/steps/Step2Schedule";
import Step3DogDetails from "@/components/wizard/steps/Step3DogDetails";
import Step4ClientDetails from "@/components/wizard/steps/Step4ClientDetails";
import MaskedHeading from "@/components/ui/MaskedHeading";

const laborIllusionSteps = [
  "Matching you with walker...",
  "Checking availability...",
  "Confirming...",
];

interface BookingWizardProps {
  preselectedService: ServiceId | null;
  preselectedEnergy: number;
}

export default function BookingWizard({ preselectedService, preselectedEnergy }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    serviceId: preselectedService,
    date: null,
    time: null,
    dogName: "",
    dogSize: null,
    dogEnergy: preselectedEnergy,
    notes: "",
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  
  const { play } = useAudio();
  const { showToast } = useToast();

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint || !endpoint.includes("formspree.io") || endpoint.includes("your-id-here")) {
      setIsConfigured(false);
    }
  }, []);

  // Preselected service from Services page
  useEffect(() => {
    if (preselectedService) {
      setData((prev) => ({ ...prev, serviceId: preselectedService, dogEnergy: preselectedEnergy }));
      setStep(2);
    }
  }, [preselectedService, preselectedEnergy]);

  // State Persistence: Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedData = localStorage.getItem("ct-premium-booking");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData(parsed);
        // Determine step based on filled data
        if (parsed.clientName) setStep(4);
        else if (parsed.dogName) setStep(4); // Stay on 4 if dog details just finished
        else if (parsed.date) setStep(3);
        else if (parsed.serviceId) setStep(2);
      } catch (e) {
        console.error("Failed to parse saved booking data", e);
      }
    }
  }, []);

  // State Persistence: Save to localStorage whenever data changes
  useEffect(() => {
    if (typeof window === "undefined" || isSuccess) return;
    localStorage.setItem("ct-premium-booking", JSON.stringify(data));
  }, [data, isSuccess]);

  const updateData = (newData: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const isStepValid = () => {
    if (step === 1) return !!data.serviceId;
    if (step === 2) return !!data.date && !!data.time;
    if (step === 3) return !!data.dogName.trim() && !!data.dogSize;
    if (step === 4) return !!data.clientName.trim() && !!data.clientPhone.trim() && !!data.clientEmail.trim();
    return false;
  };

  const handleNext = () => {
    play("whoosh");
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    play("whoosh");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!isConfigured) {
      showToast("Formspree is not configured. See warning below.", "error");
      return;
    }

    setIsSubmitting(true);
    
    for (let i = 0; i < laborIllusionSteps.length; i++) {
      setSubmitProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
    }

    const result = await submitBookingToFormspree(data);

    if (result.success) {
      play("bark");
      showToast("Request Received!", "success");
      setIsSuccess(true);
      // Clear state on success
      if (typeof window !== "undefined") {
        localStorage.removeItem("ct-premium-booking");
      }
    } else {
      showToast(result.message, "error");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book" className="relative z-10 px-6 md:px-12 py-32 pt-40">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.5 }}
            className="text-eyebrow mb-4"
          >
            Secure Your Spot
          </motion.p>
          <MaskedHeading className="text-display text-4xl text-white md:text-6xl justify-center">Book Your Adventure</MaskedHeading>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-zinc-900/80 border border-white/10 shadow-xl shadow-black/50 p-6 md:p-12">
          {!isSubmitting && !isSuccess && (
            <div className="mb-8 md:mb-10 flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Step {step} of 4</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div 
                      key={s} 
                      className={`h-1 w-12 rounded-full transition-colors ${s <= step ? "bg-teal-glow" : "bg-zinc-700"}`}
                    />
                  ))}
                </div>
              </div>
              <TreatJar count={step - 1} />
            </div>
          )}

          {isSuccess ? (
            <SuccessScreen />
          ) : isSubmitting ? (
            <div className="flex min-h-[60vh] md:min-h-[500px] flex-col items-center justify-center text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-10 w-10 rounded-full border-2 border-zinc-700 border-t-teal-glow"
              />
              <motion.p 
                key={submitProgress}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-lg font-light text-white"
              >
                {laborIllusionSteps[submitProgress]}
              </motion.p>
              <div className="mt-6 h-px w-48 overflow-hidden bg-zinc-800">
                <motion.div 
                  className="h-full bg-teal-glow"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((submitProgress + 1) / laborIllusionSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ) : (
            <div className="min-h-[60vh] md:min-h-[400px]">
              {!isConfigured && step === 4 && (
                <div className="mb-8 flex items-start gap-4 rounded-xl border border-amber-glow/20 bg-amber-glow/5 p-6 text-amber-glow">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div className="text-sm font-light">
                    <p className="font-medium mb-1">Configuration Required</p>
                    <p className="text-amber-glow/80 leading-relaxed">
                      You cannot submit this form because <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_FORMSPREE_ENDPOINT</code> is missing or invalid. 
                      Please sign up at Formspree, paste your endpoint URL in <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">.env.local</code>, and restart the server.
                    </p>
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {step === 1 && <Step1Service data={data} updateData={updateData} />}
                  {step === 2 && <Step2Schedule data={data} updateData={updateData} />}
                  {step === 3 && <Step3DogDetails data={data} updateData={updateData} />}
                  {step === 4 && <Step4ClientDetails data={data} updateData={updateData} />}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {!isSubmitting && !isSuccess && (
            <div className="mt-12 flex flex-col-reverse gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm text-slate-500 transition-colors hover:text-white disabled:opacity-20 disabled:hover:text-slate-500 md:w-auto"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-zinc-900 transition-all hover:bg-teal-glow disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 md:w-auto md:py-3.5"
                >
                  Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isConfigured || !isStepValid()}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-teal-glow px-8 py-4 text-sm font-medium text-zinc-900 transition-all hover:bg-teal-glow/90 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500 md:w-auto md:py-3.5"
                >
                  Submit Request <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}