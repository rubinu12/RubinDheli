"use client";

import React from "react";

interface Page0CoverProps {
  isOpening: boolean;
  isDone: boolean;
  onOpen: () => void;
}

export default function Page0Cover({ isOpening, isDone, onOpen }: Page0CoverProps) {
  return (
    <div
      className={`envelope-overlay ${isOpening ? "is-opening" : ""} ${
        isDone ? "is-done" : ""
      }`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label="Tap to open wedding invitation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen();
      }}
    >
      <div className="envelope-stage">
        {/* Lower Envelope Pocket (Full seamless artwork + crisp side fold creases) */}
        <div className="envelope-pocket">
          <div className="env-flap env-body-base" />
          <div className="env-flap-left-wrap">
            <div className="env-flap env-flap-left" />
          </div>
          <div className="env-flap-right-wrap">
            <div className="env-flap env-flap-right" />
          </div>
        </div>

        {/* Cast Shadow Under the Top Flap (Visible as top flap lifts in 3D) */}
        <div className="flap-cast-shadow" />

        {/* Top Flap with Softly Rounded Tip & 3D Depth */}
        <div className="env-flap-top-wrap">
          <div className="env-flap env-flap-top" />
        </div>

        {/* Hand-Pressed Peacock Turquoise Wax Seal */}
        <div className="turquoise-seal">
          <div className="turquoise-seal-inner">
            <span className="seal-monogram">R &amp; D</span>
            <span className="seal-sub">11•12•13</span>
          </div>
        </div>

        {/* Bottom Tap Cue */}
        <div className="tap-cue">Tap Seal to Open</div>
      </div>
    </div>
  );
}