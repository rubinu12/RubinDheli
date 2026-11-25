"use client";

import React, { useEffect, useRef, useState } from "react";

interface Page8ClosingProps {
  onReplayEnvelope: () => void;
}

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vRot: number;
  alpha: number;
  color: string;
  isMote: boolean;
}

const WHATSAPP_NUMBER = "918128503996";
const WHATSAPP_MESSAGE =
  "Warmest congratulations Rubin & Dr. Dheli! Received your beautiful wedding invitation. Wishing you both a lifetime of love, joy, and togetherness.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export default function Page8Closing({ onReplayEnvelope }: Page8ClosingProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animIdRef = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [hasBlessed, setHasBlessed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

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

  useEffect(() => {
    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, []);

  const triggerPetalShower = () => {
    setHasBlessed(true);
    showToast("Thank you for showering your blessings on us.");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Warm marigold, saffron, blush rose, and antique gold palette
    const petalColors = ["#E5A93B", "#D98A36", "#F0C869", "#D99B8C", "#E8C684"];

    for (let i = 0; i < 48; i++) {
      const isMote = i % 4 === 0;
      petalsRef.current.push({
        x: Math.random() * width,
        y: -20 - Math.random() * 140,
        vx: (Math.random() - 0.5) * 1.4,
        vy: 1.4 + Math.random() * 2.1,
        size: isMote ? 2 + Math.random() * 2.4 : 6 + Math.random() * 7,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.06,
        alpha: 0.92,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        isMote,
      });
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      for (let i = 0; i < petalsRef.current.length; i++) {
        const p = petalsRef.current[i];
        if (p.alpha <= 0 || p.y > height + 40) continue;
        alive = true;

        p.x += p.vx + Math.sin(p.y * 0.02) * 0.55;
        p.y += p.vy;
        p.rot += p.vRot;
        if (p.y > height * 0.72) {
          p.alpha -= 0.018;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.isMote) {
          ctx.shadowColor = "#F0C869";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft organic marigold / rose petal silhouette
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.56, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (alive) {
        animIdRef.current = requestAnimationFrame(step);
      } else {
        petalsRef.current = [];
        ctx.clearRect(0, 0, width, height);
        animIdRef.current = null;
      }
    };

    if (animIdRef.current === null) {
      animIdRef.current = requestAnimationFrame(step);
    }
  };

  const handleSaveTheDate = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Root & Rise//Rubin & Dr. Dheli Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:rubin-dheli-2026@rootandrise",
      "DTSTAMP:20261125T090000Z",
      "DTSTART:20261211T133000Z",
      "DTEND:20261213T103000Z",
      "SUMMARY:Wedding of Rubin & Dr. Dheli",
      "DESCRIPTION:11 Dec: Sanji na Geet (Dhoraji) | 12 Dec: Sagai, Grand Wedding Feast, Mandap Muhurat, Haldi & Garba Night (Leua Patel Samaj, Vibhag 3, Dhoraji) | 13 Dec: Jaan Prasthan & Hast Melap (Arya Samaj, Porbandar).",
      "LOCATION:Dhoraji & Porbandar, Gujarat, India",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    try {
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Rubin-and-Dr-Dheli-Wedding-2026.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Wedding dates saved to your calendar.");
    } catch {
      showToast("Saved for 11, 12 & 13 December 2026.");
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`page8-closing ${isVisible ? "is-visible" : ""}`}
    >
      {/* Fixed petal canvas for celebratory blessing shower */}
      <canvas ref={canvasRef} className="p8-petal-canvas" aria-hidden="true" />

      {/* Soft parchment mist over page6-bg.webp */}
      <div className="p8-ambient-mist" />

      <div className="p8-stage">
        {/* Main Blessing Card */}
        <div className="p8-blessing-card p8-stagger p8-d1">
          <p className="p8-eyebrow">WITH WARMTH &amp; GRATITUDE</p>
          <h2 className="p8-heading">Your Presence Is Our Greatest Gift</h2>

          <div className="p8-ornament">
            <span className="orn-bar" />
            <span className="orn-diamond" />
            <span className="orn-bar" />
          </div>

          <p className="p8-note">
            As we begin our forever together, your love, prayers, and warm
            presence mean more to us than words can express.
          </p>

          <div className="p8-actions">
            <button
              type="button"
              className="p8-btn-solid"
              onClick={triggerPetalShower}
            >
              {hasBlessed ? "Shower More Blessings ❀" : "Send Your Blessings ❀"}
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p8-btn-whatsapp"
            >
              Wish Us on WhatsApp
            </a>

            <button
              type="button"
              className="p8-btn-outline"
              onClick={handleSaveTheDate}
            >
              Save the Date
            </button>
          </div>
        </div>

        {/* Archival Closing & Signature */}
        <footer className="p8-footer p8-stagger p8-d2">
          <div className="p8-footer-gu">
            સૌભાગ્યવતી ભવ &bull; સ્નેહભર્યા આશીર્વાદ
          </div>
          <div className="p8-footer-script">Rubin &amp; Dheli</div>
          <p className="p8-footer-dates">
            11 &bull; 12 &bull; 13 DECEMBER 2026 &nbsp;|&nbsp; DHORAJI &amp;
            PORBANDAR
          </p>

          <button
            type="button"
            className="p8-replay-btn"
            onClick={onReplayEnvelope}
          >
            &#8634; Replay Envelope Opening
          </button>

          <div className="p8-signature-credit">
            HandCrafted by <strong>Rubin</strong> .{" "}
            <strong>Root &amp; Rise</strong>
          </div>
        </footer>
      </div>

      {toast && (
        <div className="p8-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </section>
  );
}