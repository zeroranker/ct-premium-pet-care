"use client";

import React, { createContext, useContext, useRef, useCallback, ReactNode, useEffect, useState } from "react";

type AudioType = "pop" | "whoosh" | "bark";

interface AudioContextType {
  play: (type: AudioType) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const popRef = useRef<HTMLAudioElement | null>(null);
  const whooshRef = useRef<HTMLAudioElement | null>(null);
  const barkRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Load mute preference from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedMute = localStorage.getItem("ct-premium-muted");
    if (savedMute === "true") {
      setIsMuted(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("ct-premium-muted", newMuted.toString());
      }
      return newMuted;
    });
  }, []);

  const play = useCallback((type: AudioType) => {
    // If muted, do nothing
    if (isMuted) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Haptic Feedback for Mobile (still allow vibration even if audio is muted? 
    // Actually, if they mute, let's mute haptics too for true "silent mode")
    if (!isMuted && typeof navigator !== "undefined" && "vibrate" in navigator) {
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
  }, [isMuted]);

  // DEFINTIVE iOS UNLOCK
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

    document.addEventListener("touchstart", unlock, { once: true });
    document.addEventListener("click", unlock, { once: true });

    return () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ play, isMuted, toggleMute }}>
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