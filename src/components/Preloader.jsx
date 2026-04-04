import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

// ─── Preloader ────────────────────────────────────────────────────────────────
// Matches the portfolio's brutalist aesthetic:
//   - Black full-screen overlay
//   - Name scrambles in via ScrambleTextPlugin (consistent with Hero)
//   - Counter ticks 0 → 100
//   - Sharp vertical wipe reveals the site beneath
//
// Props:
//   onComplete — called after the exit animation finishes so App can unmount this
export default function Preloader({ onComplete }) {
  const overlayRef = useRef();
  const nameRef = useRef();
  const counterRef = useRef();
  const taglineRef = useRef();

  useEffect(() => {
    const overlay = overlayRef.current;
    const name = nameRef.current;
    const counter = counterRef.current;
    const tagline = taglineRef.current;

    // Lock body scroll while loading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete?.();
      },
    });

    // ── Phase 1: Enter — name scrambles in ──
    tl.set(overlay, { yPercent: 0 })

      // Scramble the alias first
      .to(name, {
        duration: 1.1,
        scrambleText: {
          text: "Snowi Wu",
          chars: "upperCase",
          speed: 0.5,
          delimiter: "",
        },
        ease: "none",
        delay: 0.2,
      })

      // Short pause, then scramble to real name
      .to(name, {
        duration: 1.0,
        scrambleText: {
          text: "Joshua Cambronero",
          chars: "upperCase",
          speed: 0.6,
          delimiter: "",
        },
        ease: "none",
        delay: 0.3,
      })

      // Tagline fades in
      .from(
        tagline,
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: "expo.out",
        },
        "-=0.3",
      );

    // ── Phase 2: Counter ticks 0 → 100 ──
    tl.to(
      counter,
      {
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate() {
          const p = Math.round(this.progress() * 100);
          if (counter) counter.textContent = `${String(p).padStart(3, "0")}`;
        },
      },
      "<",
    );

    // ── Phase 3: Exit — sharp upward wipe ──
    tl.to([name, tagline, counter], {
      opacity: 0,
      y: -16,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      delay: 0.3,
    }).to(
      overlay,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
      },
      "-=0.1",
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-all"
    >
      {/* Grid lines — echo the bento grid aesthetic */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5" />
      </div>

      {/* Corner markers — same GridMarker language */}
      {[
        "-top-0 -left-0",
        "-top-0 -right-0",
        "-bottom-0 -left-0",
        "-bottom-0 -right-0",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-8 h-8 border-white/20`}
          style={{
            borderTopWidth: i < 2 ? "1px" : 0,
            borderBottomWidth: i >= 2 ? "1px" : 0,
            borderLeftWidth: i % 2 === 0 ? "1px" : 0,
            borderRightWidth: i % 2 === 1 ? "1px" : 0,
          }}
        />
      ))}

      {/* Main content */}
      <div className="text-center px-8 relative z-10">
        {/* Label */}
        <p className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase text-white/30 mb-6">
          2026
        </p>

        {/* Name — scrambles alias → real */}
        <h1
          ref={nameRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.85] tracking-tighter text-white"
        >
          &nbsp;
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mt-5"
        >
          Designer & Developer
        </p>
      </div>

      {/* Counter — bottom right */}
      <div className="absolute bottom-8 right-8">
        <span
          ref={counterRef}
          className="font-mono text-[11px] tracking-widest text-white/30"
        >
          000
        </span>
      </div>

      {/* Bottom left label */}
      <div className="absolute bottom-8 left-8">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
          Loading
        </span>
      </div>
    </div>
  );
}
