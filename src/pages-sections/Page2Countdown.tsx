"use client";

import React, { useEffect, useRef, useState } from "react";

// Target Wedding Ceremony: 13 December 2026, 09:00 AM IST
const WEDDING_TARGET = new Date("2026-12-13T09:00:00+05:30").getTime();

// Internal Journey Anchor: 12 July 2019 (displays only "Since 2019" publicly)
const JOURNEY_START = new Date("2019-07-12T00:00:00+05:30").getTime();

export default function Page2Countdown() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });

  const [daysTogether, setDaysTogether] = useState("2,693");

  // Trigger staggered sky-fade animation when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Live 1-second timer & journey day counter
  useEffect(() => {
    const updateTimers = () => {
      const now = Date.now();
      const diff = WEDDING_TARGET - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          mins: String(m).padStart(2, "0"),
          secs: String(s).padStart(2, "0"),
        });
      }

      const elapsedDays = Math.floor(
        (now - JOURNEY_START) / (1000 * 60 * 60 * 24)
      );
      setDaysTogether(elapsedDays.toLocaleString("en-IN"));
    };

    updateTimers();
    const timerId = setInterval(updateTimers, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`page2-countdown ${isVisible ? "is-visible" : ""}`}
    >
      {/* Subtle sunlit sky glow behind text only (terrace & lake stay 100% crisp) */}
      <div className="page2-sky-glow" />

      <div className="page2-sky-stage">
        {/* Countdown Block */}
        <p className="cd-eyebrow p2-stagger p2-d1">
          Counting Down to the Sacred Vows
        </p>
        <h2 className="cd-heading p2-stagger p2-d2">13 December 2026</h2>

        {/* Preset 03: High-Contrast Royal Numbers Directly on Sky */}
        <div className="cd-royal-grid p2-stagger p2-d3">
          <div className="cd-royal-unit">
            <span className="cd-royal-num">{timeLeft.days}</span>
            <span className="cd-royal-lbl">Days</span>
          </div>
          <div className="cd-royal-unit">
            <span className="cd-royal-num">{timeLeft.hours}</span>
            <span className="cd-royal-lbl">Hours</span>
          </div>
          <div className="cd-royal-unit">
            <span className="cd-royal-num">{timeLeft.mins}</span>
            <span className="cd-royal-lbl">Mins</span>
          </div>
          <div className="cd-royal-unit">
            <span className="cd-royal-num">{timeLeft.secs}</span>
            <span className="cd-royal-lbl">Secs</span>
          </div>
        </div>

        {/* Hairline Gold Divider */}
        <div className="p2-gold-hairline p2-stagger p2-d4" />

        {/* Journey Block ("Since 2019" only — no exact date exposed) */}
        <h3 className="journey-heading p2-stagger p2-d4">
          Our Journey Together
        </h3>
        <p className="journey-since p2-stagger p2-d4">Since 2019</p>

        <div className="journey-counter-row p2-stagger p2-d5">
          <span className="journey-big-num">{daysTogether}</span>
          <span className="journey-unit-lbl">Days &amp; Counting</span>
        </div>

        <p className="journey-caption p2-stagger p2-d5">
          Seven years of growing side by side — now stepping into forever.
        </p>
      </div>
    </section>
  );
}