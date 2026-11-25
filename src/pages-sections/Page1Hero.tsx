"use client";

import React, { useEffect, useState } from "react";

interface Page1HeroProps {
  isRevealed: boolean;
}

const BRIDE_NAME = "Dr. Dheli";
const GROOM_NAME = "Rubin";

const DHORAJI_MAP_URL = "https://maps.app.goo.gl/Z1vkQWDB5hLHX22FA?g_st=aw";
const PORBANDAR_MAP_URL = "https://maps.app.goo.gl/ENfFqUSa2pLiosT6A?g_st=aw";

export default function Page1Hero({ isRevealed }: Page1HeroProps) {
  const [brideText, setBrideText] = useState("");
  const [groomText, setGroomText] = useState("");
  const [showAmp, setShowAmp] = useState(false);
  const [activeCursor, setActiveCursor] = useState<"bride" | "groom" | "none">(
    "none"
  );
  const [showBottomCopy, setShowBottomCopy] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);

  useEffect(() => {
    if (!isRevealed) {
      setIsLocOpen(false);
      return;
    }

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms);
        timeouts.push(id);
      });

    async function runTypewriterSequence() {
      // Wait for envelope pocket to finish sliding down & heading to settle
      await wait(1650);
      if (cancelled) return;

      // 1. Type "Dr. Dheli"
      setActiveCursor("bride");
      for (let i = 1; i <= BRIDE_NAME.length; i++) {
        if (cancelled) return;
        setBrideText(BRIDE_NAME.slice(0, i));
        await wait(115);
      }

      // 2. Bloom "&"
      await wait(180);
      if (cancelled) return;
      setActiveCursor("none");
      setShowAmp(true);

      // 3. Type "Rubin"
      await wait(320);
      if (cancelled) return;
      setActiveCursor("groom");
      for (let i = 1; i <= GROOM_NAME.length; i++) {
        if (cancelled) return;
        setGroomText(GROOM_NAME.slice(0, i));
        await wait(125);
      }

      // 4. Gently fade cursor & reveal invitation line + dates + location button
      await wait(300);
      if (cancelled) return;
      setActiveCursor("none");
      setShowBottomCopy(true);
    }

    runTypewriterSequence();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [isRevealed]);

  return (
    <section className={`page1-hero ${isRevealed ? "is-revealed" : ""}`}>
      {/* Soft radial sunlit glow so text embeds directly on the sunset sky */}
      <div className="page1-sky-glow" />

      <div className="page1-center-stage">
        {/* Heading */}
        <p className="hero-heading">Two Souls Tying the Knot</p>

        {/* Oversized Calligraphic Typewriter Names */}
        <h1 className="hero-names" aria-label="Dr. Dheli & Rubin">
          <span className="name-line">
            {brideText}
            {activeCursor === "bride" && (
              <span className="ink-cursor" aria-hidden="true" />
            )}
          </span>

          <span className={`hero-amp ${showAmp ? "is-visible" : ""}`}>
            &amp;
          </span>

          <span className="name-line">
            {groomText}
            {activeCursor === "groom" && (
              <span className="ink-cursor" aria-hidden="true" />
            )}
          </span>
        </h1>

        {/* Invitation Copy, Dates & Large Expandable Location Trigger */}
        <div className={`hero-footer-copy ${showBottomCopy ? "is-visible" : ""}`}>
          <p className="hero-invite-line">
            Warmly invite you to witness the beginning of our forever
          </p>

          <div className="hero-dates">11 • 12 • 13 December 2026</div>
          <div className="hero-location">Dhoraji &amp; Porbandar • Gujarat</div>

          {/* Page-1-Only Large Circular Location Trigger */}
          <div className="hero-loc-wrap">
            <button
              type="button"
              className={`hero-loc-circle ${isLocOpen ? "is-open" : ""}`}
              onClick={() => setIsLocOpen((prev) => !prev)}
              aria-expanded={isLocOpen}
              aria-label="Tap to view Dhoraji and Porbandar venue locations"
            >
              <span className="hero-loc-icon" aria-hidden="true">
                {isLocOpen ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 12 3.5 6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                )}
              </span>
              <span className="hero-loc-btn-label">
                {isLocOpen ? "Close" : "Venues"}
              </span>
            </button>

            <p className="hero-loc-caption">
              {isLocOpen
                ? "Select a venue to open Google Maps"
                : "Tap above to see venue locations directly"}
            </p>

            {/* Expands into Two Venue Buttons */}
            <div
              className={`hero-loc-options ${isLocOpen ? "is-open" : ""}`}
              aria-hidden={!isLocOpen}
            >
              <a
                href={DHORAJI_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-venue-pill"
                tabIndex={isLocOpen ? 0 : -1}
              >
                <span className="hero-venue-city">Dhoraji</span>
                <span className="hero-venue-sub">12 Dec • Leua Patel Samaj</span>
              </a>

              <a
                href={PORBANDAR_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-venue-pill"
                tabIndex={isLocOpen ? 0 : -1}
              >
                <span className="hero-venue-city">Porbandar</span>
                <span className="hero-venue-sub">13 Dec • Arya Samaj</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`hero-scroll-cue ${showBottomCopy ? "is-visible" : ""}`}>
        ↓ Scroll to Explore ↓
      </div>
    </section>
  );
}