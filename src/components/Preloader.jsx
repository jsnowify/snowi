import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function Preloader({ onComplete }) {
  const overlayRef = useRef();
  const nameRef = useRef();
  const counterRef = useRef();
  const taglineRef = useRef();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const name = nameRef.current;
      const counter = counterRef.current;
      const tagline = taglineRef.current;

      // Select grid elements
      const gridY = overlay.querySelectorAll(".grid-line-y");
      const gridX = overlay.querySelectorAll(".grid-line-x");
      const corners = overlay.querySelectorAll(".corner-marker");

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onComplete?.();
        },
      });

      // Initial Grid States - Added opacity control for a smoother fade-in while scaling
      gsap.set(gridY, { scaleY: 0, opacity: 0 });
      gsap.set(gridX, { scaleX: 0, opacity: 0 });
      gsap.set(corners, { opacity: 0, scale: 0 });

      // Phase 1: Enter & Scramble
      tl.set(overlay, { yPercent: 0 })
        // --- UX Grid Enter Animation ---
        // Staggered the drawing of the lines so they cascade rather than popping in at once
        .to(
          gridY,
          {
            scaleY: 1,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.inOut",
          },
          0,
        )
        .to(
          gridX,
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.inOut",
          },
          0.2,
        )
        .to(
          corners,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          0.5,
        )
        // -------------------------------
        .to(
          name,
          {
            duration: 1.1,
            scrambleText: {
              text: "Snowi Wu",
              chars: "upperCase",
              speed: 0.5,
            },
            ease: "none",
            delay: 0.2,
          },
          0,
        )
        .to(name, {
          duration: 1.0,
          scrambleText: {
            text: "Joshua Cambronero",
            chars: "upperCase",
            speed: 0.6,
          },
          ease: "none",
          delay: 0.3,
        })
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

      // Phase 2: Counter
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

      // Phase 3: Exit
      tl.to([name, tagline, counter], {
        opacity: 0,
        y: -16,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        delay: 0.3,
      })
        // --- UX Grid Exit Animation ---
        .to(
          corners,
          {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
          },
          "-=0.4",
        )
        .to(
          gridX,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "expo.inOut",
          },
          "-=0.3",
        )
        .to(
          gridY,
          {
            scaleY: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "expo.inOut",
          },
          "-=0.4",
        )
        // ------------------------------
        .to(
          overlay,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.1",
        );
    },
    { dependencies: [onComplete] },
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-all"
    >
      {/* Upgraded Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Vertical Rule of Thirds Lines */}
        {[25, 50, 75].map((pos, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-center grid-line-y"
            style={{ left: `${pos}%` }}
          />
        ))}
        {/* Horizontal Rule of Thirds Lines */}
        {[25, 50, 75].map((pos, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center grid-line-x"
            style={{ top: `${pos}%` }}
          />
        ))}
      </div>

      {/* Corner Markers */}
      {[
        "-top-0 -left-0",
        "-top-0 -right-0",
        "-bottom-0 -left-0",
        "-bottom-0 -right-0",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-8 h-8 border-white/30 origin-center corner-marker`}
          style={{
            borderTopWidth: i < 2 ? "1px" : 0,
            borderBottomWidth: i >= 2 ? "1px" : 0,
            borderLeftWidth: i % 2 === 0 ? "1px" : 0,
            borderRightWidth: i % 2 === 1 ? "1px" : 0,
          }}
        />
      ))}

      <div className="text-center px-8 relative z-10">
        <p className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase text-white/30 mb-6">
          2026
        </p>
        <h1
          ref={nameRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.85] tracking-tighter text-white drop-shadow-md"
        >
          &nbsp;
        </h1>
        <p
          ref={taglineRef}
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mt-5"
        >
          Designer & Developer
        </p>
      </div>

      <div className="absolute bottom-8 right-8">
        <span
          ref={counterRef}
          className="font-mono text-[11px] tracking-widest text-white/40"
        >
          000
        </span>
      </div>

      <div className="absolute bottom-8 left-8">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
          Loading
        </span>
      </div>
    </div>
  );
}
