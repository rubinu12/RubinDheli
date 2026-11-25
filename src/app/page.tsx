"use client";

import React, { useState, useEffect, useRef } from "react";
import Preloader from "@/components/Preloader";
import Page0Cover from "@/pages-sections/Page0Cover";
import Page1Hero from "@/pages-sections/Page1Hero";
import Page2Countdown from "@/pages-sections/Page2Countdown";
import Page3Story from "@/pages-sections/Page3Story";
import Page4Letter from "@/pages-sections/Page4Letter";
import Page5Moments from "@/pages-sections/Page5Moments";
import Page6Itinerary from "@/pages-sections/Page6Itinerary";
import Page7Venues from "@/pages-sections/Page7Venues";
import Page8Closing from "@/pages-sections/Page8Closing";

export default function HomePage() {
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Music state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const fadeInMusic = (targetVol = 0.32, durationMs = 2000) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    audio.volume = 0.02;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMusicPlaying(true);
          const steps = 20;
          const inc = targetVol / steps;
          fadeTimerRef.current = setInterval(() => {
            if (!audioRef.current) return;
            if (audioRef.current.volume + inc < targetVol) {
              audioRef.current.volume = Math.min(
                targetVol,
                audioRef.current.volume + inc
              );
            } else {
              audioRef.current.volume = targetVol;
              if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
            }
          }, durationMs / steps);
        })
        .catch(() => {
          setIsMusicPlaying(false);
        });
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      fadeInMusic(0.32, 700);
    }
  };

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Start music immediately on seal tap
    fadeInMusic(0.32, 2200);

    setTimeout(() => {
      setIsRevealed(true);
      document.body.classList.add("unlocked");
    }, 1050);

    setTimeout(() => {
      setIsDone(true);
    }, 3250);
  };

  const handleReplayEnvelope = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      document.body.classList.remove("unlocked");
      setIsDone(false);
      setIsRevealed(false);
      setIsOpening(false);
    }, 450);
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("unlocked");
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    };
  }, []);

  return (
    <main className="phone-shell">
      <Preloader />

      {/* Background Romantic Music */}
      <audio ref={audioRef} loop preload="auto">
        <source
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112191.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Top-Right Floating Music Toggle */}
      <div className={`floating-music-wrap ${isRevealed ? "is-visible" : ""}`}>
        <button
          type="button"
          className={`floating-music-btn ${isMusicPlaying ? "is-playing" : ""}`}
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? "Mute wedding music" : "Play wedding music"}
        >
          <span className="music-pulse-dot" aria-hidden="true" />
          <span>{isMusicPlaying ? "♪ ON" : "♪ OFF"}</span>
        </button>
      </div>

      {/* All 9 Pages */}
      <Page0Cover
        isOpening={isOpening}
        isDone={isDone}
        onOpen={handleOpenEnvelope}
      />
      <Page1Hero isRevealed={isRevealed} />
      <Page2Countdown />
      <Page3Story />
      <Page4Letter />
      <Page5Moments />
      <Page6Itinerary />
      <Page7Venues />
      <Page8Closing onReplayEnvelope={handleReplayEnvelope} />
    </main>
  );
}