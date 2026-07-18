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

    // Haptic Feedback for Mobile
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(type === "bark" ? 30 : 10);
    }

    const ref = type === "pop" ? popRef : type === "whoosh" ? whooshRef : barkRef;
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.volume = type === "pop" ? 0.3 : 0.6;
      const playPromise = ref.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.warn(`Audio playback failed (${type}):`, e);
        });
      }
    }
  }, []);

  // DEFINTIVE iOS UNLOCK: Silently play and pause all tracks on the first tap/click.
  // This registers the audio elements as "user-initiated" for the entire session.
  useEffect(() => {
    const unlock = () => {
      const refs = [popRef, whooshRef, barkRef];
      refs.forEach(ref => {
        if (ref.current) {
          ref.current.muted = true;
          ref.current.play().then(() => {
            ref.current!.pause();
            ref.current!.currentTime = 0;
            ref.current!.muted = false;
          }).catch(() => {});
        }
      });
    };

    // Use both touchstart and click to catch all initial interactions
    document.addEventListener("touchstart", unlock, { once: true });
    document.addEventListener("click", unlock, { once: true });

    return () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ play }}>
      {children}
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