import { LucideIcon } from "lucide-react";

export type ServiceId = "20min" | "30min" | "1hour" | "sitting";
export type DogSize = "small" | "medium" | "large" | "giant";

export interface Service {
  id: ServiceId;
  name: string;
  duration: string;
  price: number | "Custom";
  description: string;
  recommendedEnergyLevels: number[]; // 1-5
  icon: LucideIcon; // Added this property
}

export interface BookingData {
  serviceId: ServiceId | null;
  date: string | null; // ISO string
  time: string | null;
  dogName: string;
  dogSize: DogSize | null;
  dogEnergy: number; // 1 to 5
  notes: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
}

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}