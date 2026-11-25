"use client";

import React, { useEffect, useRef } from "react";

export default function Page3Story() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateScrollProgress = () => {
      const root = sectionRef.current;
      if (!root) return;

      const vh = window.innerHeight;
      const blocks = root.querySelectorAll<HTMLElement>(".p3-scroll-block");

      blocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        // Starts revealing when block enters bottom 92% of screen,
        // finishes smoothly by the time it reaches 48% of screen height
        const start = vh * 0.92;
        const end = vh * 0.48;
        const raw = (start - rect.top) / (start - end);
        const progress = Math.min(1, Math.max(0, raw));

        // Smooth cubic ease-out curve
        const eased = 1 - Math.pow(1 - progress, 3);

        block.style.opacity = String(eased);
        block.style.transform = `translateY(${(1 - eased) * 4.5}dvh)`;
        block.style.filter = `blur(${(1 - eased) * 0.55}dvh)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    // Listen to both window and document.body scroll (since body.unlocked scrolls)
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial calculation
    updateScrollProgress();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="page3-story">
      {/* Ultra-feathered Gaussian watercolor mist */}
      <div className="page3-invisible-mist" />

      <div className="page3-mist-stage">
        {/* Step 1: Eyebrow & Heading */}
        <div className="p3-scroll-block">
          <p className="story-eyebrow">Two Worlds, One Heart</p>
          <h2 className="story-heading">Our Story</h2>
          <div className="story-ornament">
            <span className="orn-bar" />
            <span className="orn-diamond" />
            <span className="orn-bar" />
          </div>
        </div>

        {/* Step 2: First Paragraph */}
        <p className="story-paragraph p3-scroll-block">
          Some of the most beautiful stories begin quietly—with a single glance,
          warm conversations, and a gentle understanding that turns two
          different journeys into one shared home.
        </p>

        {/* Step 3: Second Paragraph */}
        <p className="story-paragraph p3-scroll-block">
          Through seven years of laughter, quiet prayers, and cheering for each
          other’s dreams, we found our forever. Now, with our families’
          blessings, we are ready for our greatest chapter yet.
        </p>

        {/* Step 4: Calligraphic Signature */}
        <div className="story-signature p3-scroll-block">
          Dr. Dheli &amp; Rubin
        </div>
      </div>
    </section>
  );
}