"use client";

import React, { useEffect, useRef, useState } from "react";

interface Ceremony {
  id: string;
  day: "11" | "12" | "13";
  time: string;
  venue: string;
  title: string;
  desc: string;
  attireLabel: string;
  swatches: string[];
  img: string;
  fallbackImg: string;
}

const CHAPTERS: Record<"11" | "12" | "13", string> = {
  "11": "Chapter I · The Prelude — Dhoraji",
  "12": "Chapter II · Togetherness & Joy — Dhoraji",
  "13": "Chapter III · The Sacred Union — Porbandar",
};

const CEREMONIES: Ceremony[] = [
  {
    id: "sanji",
    day: "11",
    time: "07:00 PM · 11 Dec",
    venue: "At Our Residence, Dhoraji",
    title: "Sanji na Geet",
    desc: "An intimate twilight evening of traditional Gujarati folk songs, laughter, and heartfelt blessings sung by the women of our family as we welcome the wedding spirit home.",
    attireLabel: "Warm Festive Pastels",
    swatches: ["#C79A8B", "#D5BB82", "#7D3C4A"],
    img: "/images/wedding/sanji.jpg",
    fallbackImg:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "sagai",
    day: "12",
    time: "10:00 AM · 12 Dec",
    venue: "Leua Patel Samaj, Vibhag 3, Dhoraji",
    title: "Sagai / Engagement Ceremony",
    desc: "A cherished morning as Dheli and her family arrive in Dhoraji to formally unite both families in love, rings, and lifelong promises.",
    attireLabel: "Ivory, Blush & Gold",
    swatches: ["#F4EFE6", "#D9A79C", "#B6985B"],
    img: "/images/wedding/ring.jpg",
    fallbackImg:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "feast",
    day: "12",
    time: "12:30 PM · 12 Dec",
    venue: "Leua Patel Samaj, Vibhag 3, Dhoraji",
    title: "Grand Wedding Feast",
    desc: "A joyous community lunch celebrating with our loved ones and honored guests arriving from Dheli’s side, before she returns home to prepare for the wedding day.",
    attireLabel: "Traditional Festive",
    swatches: ["#B6985B", "#24342B", "#C97B5A"],
    img: "/images/wedding/feast.jpg",
    fallbackImg:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "haldi",
    day: "12",
    time: "03:00 PM · 12 Dec",
    venue: "Leua Patel Samaj, Vibhag 3, Dhoraji",
    title: "Mandap Muhurat & Haldi",
    desc: "Under the golden afternoon sun, we invoke divine blessings at the sacred Mandap, followed by vibrant turmeric, marigold petals, and playful family traditions.",
    attireLabel: "Marigold & Sunshine",
    swatches: ["#E5A93B", "#F3D27A", "#FAF7F2"],
    img: "/images/wedding/mandap.jpg",
    fallbackImg:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "garba",
    day: "12",
    time: "08:00 PM · 12 Dec",
    venue: "Leua Patel Samaj, Vibhag 3, Dhoraji",
    title: "Garba Night",
    desc: "When winter dusk settles over Dhoraji, the courtyard comes alive with soulful music, rhythmic claps, and joyful Garba under the stars.",
    attireLabel: "Jewel Tones & Mirrorwork",
    swatches: ["#24342B", "#8E3B46", "#D5BB82"],
    img: "/images/wedding/garba.jpg",
    fallbackImg:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "hastmelap",
    day: "13",
    time: "09:00 AM · 13 Dec",
    venue: "Ranavav to Arya Samaj, Porbandar",
    title: "Jaan Prasthan & Hast Melap",
    desc: "Our procession journeys toward Ranavav and onward to the serene precincts of Arya Samaj, Porbandar, where Rubin & Dr. Dheli take their seven sacred vows amidst Vedic chants.",
    attireLabel: "Heritage Red, Ivory & Sage",
    swatches: ["#9E2A2B", "#FAF7F2", "#24342B"],
    img: "/images/wedding/marriage.jpg",
    fallbackImg:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function Page6Itinerary() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState<Record<string, boolean>>({});

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
      { threshold: 0.14 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const current = CEREMONIES[activeIdx];
  const dayNodes = CEREMONIES.map((item, idx) => ({
    ...item,
    globalIdx: idx,
  })).filter((item) => item.day === current.day);

  const switchToIndex = (targetIdx: number) => {
    if (targetIdx === activeIdx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIdx(targetIdx);
      setIsTransitioning(false);
    }, 160);
  };

  const handleSelectDay = (day: "11" | "12" | "13") => {
    const firstIdx = CEREMONIES.findIndex((c) => c.day === day);
    if (firstIdx !== -1) switchToIndex(firstIdx);
  };

  const getImgSrc = (c: Ceremony) =>
    fallbackUsed[c.id] ? c.fallbackImg : c.img;

  const markFallback = (id: string) => {
    setFallbackUsed((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
      className={`page6-itinerary ${isVisible ? "is-visible" : ""}`}
    >
      {/* Ambient mist over page6-bg.webp for clean editorial contrast */}
      <div className="p6-ambient-mist" />

      <div className="p6-stage">
        <header className="p6-header p6-stagger p6-d1">
          <p className="p6-eyebrow">THREE DAYS OF BLESSINGS &amp; JOY</p>
          <h2 className="p6-heading">The Celebrations</h2>
        </header>

        {/* Organic Watercolor Brush Date Switcher: 11 | 12 | 13 */}
        <div
          className="p6-brush-switcher p6-stagger p6-d2"
          role="tablist"
          aria-label="Wedding Dates"
        >
          {(["11", "12", "13"] as const).map((day, idx) => {
            const isActive = current.day === day;
            return (
              <React.Fragment key={day}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`p6-brush-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectDay(day)}
                >
                  <span className="p6-d-num">{day}</span>
                  <span className="p6-d-mon">Dec</span>
                </button>
                {idx < 2 && <span className="p6-date-sep" aria-hidden="true" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Chapter Banner */}
        <div className="p6-chapter-banner p6-stagger p6-d2">
          {CHAPTERS[current.day]}
        </div>

        {/* Featured Arched Ceremony Stage */}
        <article
          className={`p6-ceremony-stage p6-stagger p6-d2 ${
            isTransitioning ? "is-transitioning" : ""
          }`}
        >
          <div className="p6-arch-window">
            <img
              src={getImgSrc(current)}
              alt={current.title}
              className="p6-arch-img"
              onError={() => markFallback(current.id)}
            />
            <div className="p6-arch-gradient" />
            <div className="p6-floating-pill">{current.time}</div>
          </div>

          <div className="p6-stage-body">
            <div className="p6-venue-line">{current.venue}</div>
            <h3 className="p6-stage-title">{current.title}</h3>
            <p className="p6-stage-desc">{current.desc}</p>

            <div className="p6-attire-row">
              <span className="p6-attire-lbl">{current.attireLabel}</span>
              <span className="p6-attire-swatches">
                {current.swatches.map((hex) => (
                  <span
                    key={hex}
                    className="p6-swatch-dot"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </span>
            </div>

            <div className="p6-nav-row">
              <button
                type="button"
                className="p6-nav-btn"
                onClick={() =>
                  switchToIndex(
                    (activeIdx - 1 + CEREMONIES.length) % CEREMONIES.length
                  )
                }
              >
                &larr; Prev
              </button>
              <span className="p6-counter">
                {activeIdx + 1} of {CEREMONIES.length}
              </span>
              <button
                type="button"
                className="p6-nav-btn"
                onClick={() =>
                  switchToIndex((activeIdx + 1) % CEREMONIES.length)
                }
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </article>

        {/* Staggered Gold-Threaded Circular Thumbnail Path */}
        <div className="p6-path-wrap p6-stagger p6-d2">
          <div className="p6-path-list">
            {dayNodes.map((node, localIdx) => {
              const isSelected = node.id === current.id;
              const alignClass =
                localIdx % 2 === 0 ? "align-right" : "align-left";
              return (
                <button
                  key={node.id}
                  type="button"
                  className={`p6-path-node ${alignClass} ${
                    isSelected ? "active" : ""
                  }`}
                  onClick={() => switchToIndex(node.globalIdx)}
                >
                  <span className="p6-thumb-ring">
                    <img
                      src={getImgSrc(node)}
                      alt={node.title}
                      onError={() => markFallback(node.id)}
                    />
                  </span>
                  <span className="p6-node-meta">
                    <div className="p6-node-time">
                      {node.time.split("·")[0].trim()}
                    </div>
                    <div className="p6-node-name">{node.title}</div>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}