import { Service } from "./types";
import { Zap, Watch, Footprints, Home } from "lucide-react"; // Added icons

export const SERVICES: Service[] = [
  {
    id: "20min",
    name: "Quick Paws",
    duration: "20 Minutes",
    price: 15,
    description: "A brisk walk for potty breaks and stretching legs.",
    recommendedEnergyLevels: [1, 2],
    icon: Zap, // Added
  },
  {
    id: "30min",
    name: "Standard Stroll",
    duration: "30 Minutes",
    price: 20,
    description: "Perfect for moderate exercise and mental stimulation.",
    recommendedEnergyLevels: [2, 3],
    icon: Watch, // Added
  },
  {
    id: "1hour",
    name: "Adventure Trek",
    duration: "1 Hour",
    price: "Custom",
    description: "Long-form walking for high-energy breeds.",
    recommendedEnergyLevels: [4, 5],
    icon: Footprints, // Added
  },
  {
    id: "sitting",
    name: "Premium Sitting",
    duration: "Custom",
    price: "Custom",
    description: "In-home care and companionship while you're away.",
    recommendedEnergyLevels: [1, 2, 3, 4, 5],
    icon: Home, // Added
  },
];

export const ENERGY_LEVELS = [
  { level: 1, label: "Couch Potato", icon: "🛋️" },
  { level: 2, label: "Chill Companion", icon: "🐾" },
  { level: 3, label: "Moderate Mover", icon: "🐕" },
  { level: 4, label: "Active Pup", icon: "🏃" },
  { level: 5, label: "Marathon Runner", icon: "🚀" },
];

export const CT_COUNTIES = [
  { name: "Fairfield", d: "M50,150 L120,140 L130,200 L60,210 Z" },
  { name: "New Haven", d: "M120,140 L200,130 L210,190 L130,200 Z" },
  { name: "Middlesex", d: "M200,130 L250,150 L240,210 L210,190 Z" },
  { name: "New London", d: "M250,150 L330,160 L320,220 L240,210 Z" },
  { name: "Litchfield", d: "M50,150 L120,140 L110,60 L40,70 Z" },
  { name: "Hartford", d: "M120,140 L200,130 L210,70 L130,60 Z" },
  { name: "Tolland", d: "M200,130 L260,120 L270,180 L210,70 Z" },
  { name: "Windham", d: "M260,120 L330,160 L320,220 L270,180 Z" },
];

export const PAYMENT_METHODS = ["Cash", "CashApp", "Zelle"];