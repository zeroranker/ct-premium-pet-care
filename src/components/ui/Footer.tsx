"use client";

import Link from "next/link";
import { useAudio } from "@/lib/audio-context";

const FOOTER_LINKS = [
  {
    title: "Services",
    links: [
      { label: "Quick Paws", target: "/services" },
      { label: "Standard Stroll", target: "/services" },
      { label: "Adventure Trek", target: "/services" },
      { label: "Premium Sitting", target: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Coverage Area", target: "/coverage" },
      { label: "Book Now", target: "/book" },
      { label: "Policies", target: "/policies" },
      { label: "Privacy Policy", target: "/privacy" },
    ],
  },
];

export default function Footer() {
  const { play } = useAudio();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#080808]">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" onMouseEnter={() => play("pop")} className="flex items-center gap-2">
              <span className="text-2xl font-medium text-white">CT <span className="text-teal-glow">Premium</span></span>
            </Link>
            <p className="mt-6 max-w-xs text-sm text-slate-500 font-light leading-relaxed">
              Connecticut&apos;s premier dog walking and pet sitting service. Curated experiences for discerning pet parents.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <p className="text-eyebrow mb-6">{section.title}</p>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.target} 
                        onMouseEnter={() => play("pop")}
                        className="link-underline text-sm text-slate-400 font-light hover:text-teal-glow transition-colors w-fit"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-center">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} CT Premium Pet Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}