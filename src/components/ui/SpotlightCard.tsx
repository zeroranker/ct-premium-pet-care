"use client";

import { useRef, useState, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden ${className}`}
    >
      {/* Mouse Tracking Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.08), transparent 70%)`
        }}
      />
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}