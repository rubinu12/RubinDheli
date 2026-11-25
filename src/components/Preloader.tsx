"use client";

import React, { useEffect, useState } from "react";

// Update these paths to match your exact files in /public/images/
const CRITICAL_IMAGES = [
  "/images/page1-bg.webp",
  "/images/page2-bg.webp",
];

const BACKGROUND_IMAGES = [
  "/images/page3-bg.webp",
  "/images/page4-bg.webp",
  "/images/page5-bg.webp",
  "/images/page6-bg.webp",
  "/images/moments/moment-1.jpg",
  "/images/moments/moment-2.jpg",
  "/images/moments/moment-3.jpg",
  "/images/moments/moment-4.jpg",
  "/images/moments/moment-5.jpg",
  "/images/moments/moment-6.jpg",
  "/images/moments/moment-7.jpg",
  "/images/wedding/ring.jpg",
  "/images/wedding/mandap.jpg",
  "/images/wedding/garba.jpg",
  "/images/wedding/marriage.jpg",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let loaded = 0;
    let finished = false;
    const total = CRITICAL_IMAGES.length;

    const finishLoading = () => {
      if (finished) return;
      finished = true;
      setProgress(100);

      // Silently preload remaining pages into browser memory
      BACKGROUND_IMAGES.forEach((src) => {
        const bgImg = new Image();
        bgImg.src = src;
      });

      setTimeout(() => setIsDone(true), 350);
      setTimeout(() => setIsRemoved(true), 950);
    };

    if (total === 0) {
      finishLoading();
      return;
    }

    // Safety timeout: never trap a guest on slow mobile data
    const safetyTimer = setTimeout(finishLoading, 4500);

    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      const onStep = () => {
        loaded += 1;
        setProgress(Math.round((loaded / total) * 100));
        if (loaded >= total) {
          clearTimeout(safetyTimer);
          finishLoading();
        }
      };
      img.onload = onStep;
      img.onerror = onStep;
      img.src = src;
    });

    return () => clearTimeout(safetyTimer);
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`rd-preloader ${isDone ? "is-done" : ""}`}
      aria-live="polite"
      aria-label="Loading wedding invitation"
    >
      <div className="rd-preloader-inner">
        <div className="rd-preloader-monogram">R &amp; D</div>
        <p className="rd-preloader-sub">Preparing Your Invitation</p>

        <div className="rd-progress-track">
          <div
            className="rd-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="rd-progress-pct">{progress}%</span>
      </div>
    </div>
  );
}