"use client";

import React, { createContext, useContext, useRef, useCallback, ReactNode, useEffect } from "react";

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
      ref.current.currentTime = 0;
      ref.current.volume = type === "pop" ? 0.3 : 0.6;
      ref.current.play().catch((e) => console.warn(`Audio playback failed (${type}):`, e));
    }
  }, []);

  // Mobile Audio Unlock: Browsers block audio until a user interacts.
  // This listens for the first touch/click and unlocks all audio elements.
  useEffect(() => {
    const unlock = () => {
      [popRef, whooshRef, barkRef].forEach(ref => {
        if (ref.current) {
          ref.current.muted = true;
          ref.current.play().then(() => {
            ref.current!.pause();
            ref.current!.currentTime = 0;
            ref.current!.muted = false;
          }).catch(() => {});
        }
      });
      // Remove listeners after first unlock attempt
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };

    document.addEventListener("touchstart", unlock);
    document.addEventListener("click", unlock);

    return () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ play }}>
      {children}
      <audio ref={popRef} src="/sfx-pop.mp3" preload="auto" />
      <audio ref={whooshRef} src="/sfx-whoosh.mp3" preload="auto" />
      <audio ref={barkRef} src="/sfx-bark.mp3" preload="auto" />
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