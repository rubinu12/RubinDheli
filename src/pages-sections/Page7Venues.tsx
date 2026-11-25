"use client";

import React, { useEffect, useRef, useState } from "react";

const VENUE_FALLBACKS = {
  dhoraji:
    "https://images.unsplash.com/photo-1561587327-c43f46958e07?auto=format&fit=crop&w=600&q=80",
  porbandar:
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80",
};

export default function Page7Venues() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [dhorajiImg, setDhorajiImg] = useState("/images/venue-dhoraji.jpg");
  const [porbandarImg, setPorbandarImg] = useState(
    "/images/venue-porbandar.jpg"
  );

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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`p7-venue-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="p7-scallop-top" aria-hidden="true" />

      <div className="p7-stagger p7-d1">
        <p className="p7-eyebrow-light">WHERE WE GATHER</p>
        <h2 className="p7-heading-light">The Venues</h2>
        <div className="p7-gold-rule">
          <span className="orn-bar" />
          <span className="orn-diamond" />
          <span className="orn-bar" />
        </div>
      </div>

      <div className="p7-venue-stack">
        {/* Venue 1: Dhoraji */}
        <article className="p7-venue-card p7-stagger p7-d2">
          <div className="p7-arch-frame">
            <img
              src={dhorajiImg}
              alt="Festive floral vignette for Dhoraji venue"
              onError={() => setDhorajiImg(VENUE_FALLBACKS.dhoraji)}
            />
          </div>
          <div className="p7-venue-tag">Dhoraji Festivities &bull; 12 Dec</div>
          <h3 className="p7-venue-name">Leua Patel Samaj, Vibhag 3</h3>
          <p className="p7-venue-address">
            Dhoraji, Gujarat
            <br />
            Sagai, Grand Wedding Feast, Mandap Muhurat, Haldi &amp; Garba Night
          </p>
          <a
            href="https://maps.app.goo.gl/Z1vkQWDB5hLHX22FA?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="p7-btn-light"
          >
            View in Map
          </a>
        </article>

        {/* Venue 2: Porbandar */}
        <article className="p7-venue-card p7-stagger p7-d3">
          <div className="p7-arch-frame">
            <img
              src={porbandarImg}
              alt="Sacred floral vignette for Porbandar venue"
              onError={() => setPorbandarImg(VENUE_FALLBACKS.porbandar)}
            />
          </div>
          <div className="p7-venue-tag">Wedding Ceremony &bull; 13 Dec</div>
          <h3 className="p7-venue-name">Arya Samaj, Porbandar</h3>
          <p className="p7-venue-address">
            Porbandar, Gujarat
            <br />
            Jaan Prasthan (from Ranavav) &amp; Sacred Hast Melap Ceremony
          </p>
          <a
            href="https://maps.app.goo.gl/ENfFqUSa2pLiosT6A?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
            className="p7-btn-light"
          >
            View in Map
          </a>
        </article>
      </div>
    </section>
  );
}