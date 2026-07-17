"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/lib/audio-context";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", target: "/" },
  { label: "Services", target: "/services" },
  { label: "Coverage", target: "/coverage" },
  { label: "Book Now", target: "/book" },
  { label: "Policies", target: "/policies" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { play } = useAudio();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("body-scroll-lock");
    } else {
      document.body.classList.remove("body-scroll-lock");
    }
    return () => document.body.classList.remove("body-scroll-lock");
  }, [mobileOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="glass-pill flex items-center justify-between gap-1 rounded-full p-2 pl-6 shadow-2xl w-full max-w-2xl">
          <Link href="/" onMouseEnter={() => play("pop")} className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">CT <span className="text-teal-glow">Premium</span></span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.target;
              return (
                <Link 
                  key={link.target} 
                  href={link.target}
                  onMouseEnter={() => play("pop")}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors hover:text-teal-glow md:text-sm ${
                    isActive ? "text-teal-glow" : "text-slate-400"
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active-pill" 
                      className="absolute inset-0 rounded-full bg-teal-glow/10 border border-teal-glow/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-white"
            onClick={() => { setMobileOpen(true); play("pop"); }}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-lg font-bold text-white">CT <span className="text-teal-glow">Premium</span></span>
              <button 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
                onClick={() => { setMobileOpen(false); play("pop"); }}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.target}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link 
                    href={link.target}
                    onClick={() => { setMobileOpen(false); play("whoosh"); }}
                    className={`text-4xl font-light ${pathname === link.target ? "text-teal-glow" : "text-white"}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}