"use client";

import React, { useEffect, useRef, useState } from "react";

// Production encrypted payload locked with "12072019"
const ENCRYPTED_LETTER =
  "WcfQCX1zTPX5OkGKvvOLAJtCTL0TXQmiMSTJLfJX8I58l7h+P3gjT4G0ky/42PqFYXARQjfy4pJB6cTgV5BqHvWyUEdkGHC0johJnBwxNjZVlVch3CocXBfWy0HXS/kMLRWMg9HIWSUjixJWw+V7tCDHvDOTnGYWUI/4uWmk5pFfA5Q+dBQpFaP6jHwGtj7R9+cLt+xqPQ1HQgkbmkp/GzM3cvMIGEfVjrIXHW3P0oM0Z7MNZZgDXr4KCsbGzOk/Ckn0lHw5rLfqhv+LKo+Ry07gYNqEqswtJHXUP9LzwyzjgiWRUuR2lqur/gKzwVkBJ+hlacfx7cPAPd3v8Dyowo6tfzUpGuUPSM07FZCjXoRr5ZxOd8iP0NhnwXWBpJbgI65EWxvaZcowvDQDPSOGowFsVkt8kAoWKMfA8Oe5V/KrHoiWs+EEz5sdqBjCEXrGCf5+WwiwvZsUGT09saI2QALYBmuYY6wLtEsf0qCRvyV5R0mmRTQPyqrvk9KWR39FWJK+GWVAUhdZFGGL079hg61E5ECg3OByNTm6XUoy5/POcLoGQgo7hXOR+hM6ZsevbUBbohtDHpmH3ApP0O7zyvGLffojpclYaXSEszKBIPiw6NFVDBPTfprXsOmzxmEjcJlA5KWmIkuPS7sq2YXrGn6A0gDVB+SgGoNMSYrgv7+SInhcOU3G1D2OQULdiJ2OJFfnOKm3HmRo75HMQsAp5Jv0ORRy+ZkkoB20Rcj0+C386L3G8GVTTKzLVJqkpETksR8XIOWSEn96Iq6gXhZo2kzxdkUihfuEm50Pdwf2d7EcliJ4HKVu07VbIKnaRUXp/HwjQa/UXOpQPo/EbO10zONZRdYjNO6cmLaWmWp2B6sxradqv8IgonkMRg4Ta1UDKoCOwdVorAWvqz1QUz7WF/+WWeX5ex+WpUJ0b1uCkqZKcHlXmTlrkopXgA42wehZ1CRHJ6QRdyFFQv9tO5tyUd7t4k3o9ZIsqXdGiVcwxFFIKJrXCTAmpKKfK5K+KOW1OOSDUvpDLMin/3tQKOh+sh99ccuf4Tv9hqpKKMkNqbQ9xwA+XiwO0lnQlWLOydK8OAsOQuhlWgho7Kv3Y91yiT7eBokOz1ANHVR6JxLms6TB/9fq4wZ35o+Ojx/N+3JYY3w3QnEPDjqnx1iCPhGAcfDYyvQ1eqgkHtE57DjgYKE19Gs97ILz/UQAm5Vk/y/C5BQvNyaf8OPfj9DFED7ZfoaGGP5w7g+p09GQQw0zjbdGpvXQQBLfGXn4Np+gG0322meZ+HstPmZ9KaGL2hfAQJw/5w6Ta4ftyumnyC0bOhD8LkMySn9ppvzJSib0qTI6bIDn0XJu1pvYBvJy+6r1ly+wUl9X/juyQIJ4RAmrFOzFbCOAGOg4x020IeAc8JXQc6orom0c2cfccyTFljlukcDLhyU/pIWAhas6lY31XREtslCvYPf19p2eDOlT4Ko5eBHVaOtfbYlc5sYkIVGGsGpcBgNHCH1ZRWsIAKWE0HcOt2FciA1PSFqV38WRGwb+oqkVWaosrs84JqMvsHx7n3uX9QQSZ6Yixc33Q9NuLn9cd7iAV582H7N+ihb6l7H57VJKxQX4hSHOAfgeeTXHHfcJ6N7p1YAltFSsAv5KBlxo6q6c8iO606SAzIa+";

function transformWithPassword(
  inputBytes: Uint8Array,
  password: string
): Uint8Array {
  let s0 = 0x9e3779b9;
  let s1 = 0x85ebca6b;
  let s2 = 0xc2b2ae35;
  let s3 = 0x27d4eb2f;

  for (let round = 0; round < 5000; round++) {
    for (let i = 0; i < password.length; i++) {
      const c = password.charCodeAt(i) + round;
      s0 = Math.imul(s0 ^ c, 0x85ebca6b) >>> 0;
      s1 = Math.imul(s1 ^ (c << 3), 0xc2b2ae35) >>> 0;
      s2 = Math.imul(s2 ^ (c >> 1), 0x27d4eb2f) >>> 0;
      s3 = (s3 + s0 + s1 + s2) >>> 0;
    }
  }

  const out = new Uint8Array(inputBytes.length);
  for (let i = 0; i < inputBytes.length; i++) {
    let t = s3;
    s3 = s2;
    s2 = s1;
    s1 = s0;
    t ^= t << 11;
    t ^= t >>> 8;
    s0 = (t ^ s0 ^ (s0 >>> 19)) >>> 0;
    out[i] = inputBytes[i] ^ (s0 & 0xff);
  }
  return out;
}

function decryptMessage(base64Cipher: string, password: string): string {
  const binary = atob(base64Cipher.trim());
  const cipherBytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    cipherBytes[i] = binary.charCodeAt(i);
  }
  const plainBytes = transformWithPassword(cipherBytes, password);
  const decoded = new TextDecoder().decode(plainBytes);

  if (!decoded.startsWith("RD_SEAL_OK::")) {
    throw new Error("Wrong password");
  }
  return decoded.slice("RD_SEAL_OK::".length);
}

export default function Page4Letter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [digits, setDigits] = useState<string[]>(Array(8).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [isShaking, setIsShaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [unlockedLetter, setUnlockedLetter] = useState<string | null>(null);
  const [isUnfolded, setIsUnfolded] = useState(false);

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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    setErrorMsg("");

    if (clean && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }

    if (clean && next.every((d) => d !== "")) {
      unlockWithCode(next.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 8);
    if (!pasted) return;

    const next = Array(8).fill("");
    pasted.split("").forEach((ch, idx) => {
      next[idx] = ch;
    });
    setDigits(next);

    if (pasted.length === 8) {
      unlockWithCode(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const unlockWithCode = (codeStr: string) => {
    setErrorMsg("");

    try {
      const plainText = decryptMessage(ENCRYPTED_LETTER, codeStr);
      setUnlockedLetter(plainText);
      setTimeout(() => setIsUnfolded(true), 100);
    } catch {
      setIsShaking(true);
      setErrorMsg("That date doesn't unlock this seal. Try again, Dheli.");
      setTimeout(() => {
        setIsShaking(false);
        setDigits(Array(8).fill(""));
        inputRefs.current[0]?.focus();
      }, 650);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`page4-letter ${isVisible ? "is-visible" : ""}`}
    >
      {/* Subtle Gaussian mist shifted right to keep the left bougainvillea crisp */}
      <div className="page4-sky-mist" />

      <div className="page4-right-stage">
        <header className="p4-header p4-stagger p4-d1">
          <p className="p4-eyebrow">For Your Eyes Only</p>
          <h2 className="p4-heading">A Quiet Letter to Dheli</h2>
          <div className="p4-ornament">
            <span className="orn-bar" />
            <span className="orn-diamond" />
            <span className="orn-bar" />
          </div>
        </header>

        {!unlockedLetter ? (
          <div
            className={`letter-vault p4-stagger p4-d2 ${
              isShaking ? "is-shaking" : ""
            }`}
          >
            <div className="vault-seal-badge" aria-hidden="true">
              <span>R &amp; D</span>
            </div>

            <p className="vault-prompt">
              This note is sealed with a memory only you know.
            </p>
            <p className="vault-hint">
              Enter the date you first saw me at the camp{" "}
              <span>(DD • MM • YYYY)</span>
            </p>

            <div className="pin-row" onPaste={handlePaste}>
              {digits.map((digit, idx) => (
                <React.Fragment key={idx}>
                  <input
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    aria-label={`Digit ${idx + 1}`}
                    className="pin-box"
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                  />
                  {(idx === 1 || idx === 3) && (
                    <span className="pin-sep">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {errorMsg && <p className="vault-error">{errorMsg}</p>}

            <button
              type="button"
              className="vault-unlock-btn"
              disabled={digits.some((d) => !d)}
              onClick={() => unlockWithCode(digits.join(""))}
            >
              Unseal My Letter
            </button>
          </div>
        ) : (
          <article
            className={`sky-letter-body ${isUnfolded ? "is-unfolded" : ""}`}
          >
            {unlockedLetter.split("\n\n").map((para, i, arr) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "letter-salutation"
                    : i === arr.length - 1
                    ? "letter-signoff"
                    : "letter-body-para"
                }
              >
                {para}
              </p>
            ))}
          </article>
        )}
      </div>
    </section>
  );
}