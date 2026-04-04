import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

function ScrambleFooterName() {
  const ref = useRef();
  const tween = useRef(null);
  const ALIAS = "Snowi Wu";
  const REAL = "Joshua Cambronero";

  const to = (target) => {
    if (tween.current) tween.current.kill();
    tween.current = gsap.to(ref.current, {
      duration: 0.6,
      scrambleText: {
        text: target,
        chars: "upperCase",
        speed: 0.6,
        delimiter: "",
      },
      ease: "none",
    });
  };

  useEffect(() => {
    if (ref.current) ref.current.textContent = ALIAS;
    return () => tween.current?.kill();
  }, []);

  return (
    <button
      onMouseEnter={() => to(REAL)}
      onMouseLeave={() => to(ALIAS)}
      className="font-display text-sm font-bold uppercase tracking-widest cursor-crosshair text-left"
    >
      <span ref={ref} />
    </button>
  );
}

export default function Footer() {
  const [time, setTime] = useState("");
  const year = new Date().getFullYear();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const pht = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(pht);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t-2 border-black px-6 py-8 bg-white">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Scramble Name */}
        <ScrambleFooterName />

        {/* Center: Metadata & Real-time Clock */}
        <div className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
          © {year} · Davao Region, PH ·{" "}
          <span className="text-black font-bold">{time} PHT</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-black hover:text-neutral-500 transition-colors cursor-pointer"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
