"use client";

import React, { useEffect, useRef, useState } from "react";

interface MomentCard {
  id: number;
  label: string;
  frontCaption: string;
  img: string;
  backTitle: string;
  backQuote: string;
}

const MOMENTS: MomentCard[] = [
  {
    id: 1,
    label: "MOMENT I",
    frontCaption: "Where it all quietly began",
    img: "/images/moments/moment-1.jpg",
    backTitle: "The First Hello",
    backQuote:
      "“Neither of us knew that one simple conversation would quietly rearrange our entire lives. You smiled, and somehow the whole room slowed down.”",
  },
  {
    id: 2,
    label: "MOMENT II",
    frontCaption: "Where endless conversations began",
    img: "/images/moments/moment-2.jpg",
    backTitle: "Two Cups of Chai",
    backQuote:
      "“Simple evenings, warm cups of chai, and conversations that made hours feel like minutes—where shy smiles turned into lifelong trust.”",
  },
  {
    id: 3,
    label: "MOMENT III",
    frontCaption: "Footprints by the evening sea",
    img: "/images/moments/moment-3.jpg",
    backTitle: "By the Evening Sea",
    backQuote:
      "“Salt in the air, golden waves at our feet, and nowhere else we needed to be—just your hand in mine as the sunset painted the shore.”",
  },
  {
    id: 4,
    label: "MOMENT IV",
    frontCaption: "Chasing mist and waterfalls",
    img: "/images/moments/moment-4.jpg",
    backTitle: "Trails & Waterfalls",
    backQuote:
      "“Through misty trails, steep climbs, and the roar of rushing waterfalls, we found that the best view in every adventure is simply standing side by side.”",
  },
  {
    id: 5,
    label: "MOMENT V",
    frontCaption: "Our favorite little shelter",
    img: "/images/moments/moment-5.jpg",
    backTitle: "Under One Umbrella",
    backQuote:
      "“The rain kept falling, the world kept rushing, and there we stood—sheltered under one umbrella with the easiest smiles, needing nothing more than each other.”",
  },
  {
    id: 6,
    label: "MOMENT VI",
    frontCaption: "Two silhouettes, one painted sky",
    img: "/images/moments/moment-6.jpg",
    backTitle: "In the Golden Glow",
    backQuote:
      "“Some moments don’t need a single word—just two silhouettes against a glowing sky, quietly knowing we had already found our forever.”",
  },
  {
    id: 7,
    label: "MOMENT VII",
    frontCaption: "Blessed in timeless tradition",
    img: "/images/moments/moment-7.jpg",
    backTitle: "The Sacred Jal Ceremony",
    backQuote:
      "“Surrounded by our families’ warmth and sacred blessings, this timeless ceremony marked the graceful beginning of our forever together.”",
  },
];

export default function Page5Moments() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIds, setFlippedIds] = useState<Record<number, boolean>>({});

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
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleToggleFlip = (id: number) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const center = track.scrollLeft + track.offsetWidth / 2;
    const slots = track.querySelectorAll<HTMLElement>(".p5-polaroid-slot");
    let closest = 0;
    let minDistance = Infinity;

    slots.forEach((slot, idx) => {
      const slotCenter = slot.offsetLeft + slot.offsetWidth / 2;
      const dist = Math.abs(center - slotCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closest = idx;
      }
    });

    setActiveIndex(closest);
  };

  const scrollToCard = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slot = track.querySelectorAll<HTMLElement>(".p5-polaroid-slot")[idx];
    slot?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`page5-moments ${isVisible ? "is-visible" : ""}`}
    >
      <div className="p5-header p5-stagger p5-d1">
        <p className="p5-eyebrow">SYMBOLIC KEEPSAKES</p>
        <h2 className="p5-heading">Our Moments</h2>

        <div className="p5-ornament">
          <span className="orn-bar" />
          <span className="orn-diamond" />
          <span className="orn-bar" />
        </div>

        <div className="p5-pill">
          SWIPE POLAROIDS &bull; TAP ANY PHOTO TO FLIP
        </div>
      </div>

      {/* Horizontal Snap Polaroid Carousel */}
      <div
        ref={trackRef}
        className="p5-carousel p5-stagger p5-d2"
        onScroll={handleTrackScroll}
      >
        {MOMENTS.map((m) => {
          const isFlipped = !!flippedIds[m.id];
          return (
            <div key={m.id} className="p5-polaroid-slot">
              <div
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                className={`p5-polaroid-card ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => handleToggleFlip(m.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggleFlip(m.id);
                  }
                }}
              >
                <div className="p5-washi-tape" aria-hidden="true" />

                {/* FRONT FACE */}
                <div className="p5-face p5-front">
                  <div className="p5-photo-square">
                    <img
                      src={m.img}
                      alt=""
                      aria-hidden="true"
                      className="p5-photo-blur-fill"
                    />
                    <img
                      src={m.img}
                      alt={m.frontCaption}
                      className="p5-photo-uncropped"
                    />
                  </div>

                  <div className="p5-front-caption">
                    <span className="p5-moment-label">{m.label}</span>
                    <h3 className="p5-moment-title">{m.frontCaption}</h3>
                    <span className="p5-flip-hint">TAP TO FLIP &#8635;</span>
                  </div>
                </div>

                {/* BACK FACE (Lined Stationery Style) */}
                <div className="p5-face p5-back">
                  <div className="p5-back-content">
                    <h3 className="p5-back-script-title">{m.backTitle}</h3>
                    <p className="p5-back-quote">{m.backQuote}</p>
                  </div>
                  <span className="p5-back-flip-hint">TAP TO RETURN &#8634;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 7-Dot Progress Indicator */}
      <div className="p5-dots p5-stagger p5-d2" aria-label="Moments navigation">
        {MOMENTS.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            aria-label={`View moment ${idx + 1}`}
            className={`p5-dot ${activeIndex === idx ? "active" : ""}`}
            onClick={() => scrollToCard(idx)}
          />
        ))}
      </div>
    </section>
  );
}