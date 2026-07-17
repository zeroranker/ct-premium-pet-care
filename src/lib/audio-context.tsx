"use client";

import React, { createContext, useContext, useRef, useCallback, ReactNode } from "react";

type AudioType = "pop" | "whoosh" | "bark";

interface AudioContextType {
  play: (type: AudioType) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const popRef = useRef<HTMLAudioElement | null>(null);
  const whooshRef = useRef<HTMLAudioElement | null>(null);
  const barkRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((type: AudioType) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ref = type === "pop" ? popRef : type === "whoosh" ? whooshRef : barkRef;
    if (ref.current) {
      // Resetting currentTime and playing synchronously inside the event handler
      // is the most reliable way to trigger audio on iOS.
      ref.current.currentTime = 0;
      ref.current.volume = type === "pop" ? 0.3 : 0.6;
      const playPromise = ref.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          // Auto-play was prevented. This is expected on the very first load
          // before the user has interacted. Once they tap a button, it will work.
          console.warn(`Audio playback failed (${type}):`, e);
        });
      }
    }
  }, []);

  return (
    <AudioContext.Provider value={{ play }}>
      {children}
      {/* Added playsInline to satisfy iOS audio requirements */}
      <audio ref={popRef} src="/sfx-pop.mp3" preload="auto" playsInline />
      <audio ref={whooshRef} src="/sfx-whoosh.mp3" preload="auto" playsInline />
      <audio ref={barkRef} src="/sfx-bark.mp3" preload="auto" playsInline />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}