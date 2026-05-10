import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin);

const links = ["About", "Projects", "Skills", "Contact"];

function ScrambleNavItem({ text, onClick, onClose }) {
  const ref = useRef();
  const tween = useRef(null);

  const scramble = () => {
    if (tween.current) tween.current.kill();
    tween.current = gsap.to(ref.current, {
      duration: 0.55,
      scrambleText: { text, chars: "upperCase", speed: 0.7, delimiter: "" },
      ease: "none",
    });
  };

  useEffect(() => {
    if (ref.current) ref.current.textContent = text;
    return () => tween.current?.kill();
  }, [text]);

  return (
    <button
      onClick={() => {
        onClick();
        onClose?.();
      }}
      onMouseEnter={scramble}
      className="font-mono text-xs font-bold tracking-widest uppercase relative group cursor-pointer"
    >
      <span ref={ref} />
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
    </button>
  );
}

function ScrambleLogo({ onClick }) {
  const ref = useRef();
  const tween = useRef(null);
  const activeRef = useRef(false);
  const ALIAS = "JC";
  const REAL = "S";

  const to = (target, speed = 0.6) => {
    if (tween.current) tween.current.kill();
    tween.current = gsap.to(ref.current, {
      duration: 0.6,
      scrambleText: { text: target, chars: "upperCase", speed, delimiter: "" },
      ease: "none",
    });
  };

  useEffect(() => {
    if (ref.current) ref.current.textContent = ALIAS;
    return () => tween.current?.kill();
  }, []);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        activeRef.current = true;
        to(REAL, 0.6);
      }}
      onMouseLeave={() => {
        activeRef.current = false;
        to(ALIAS, 0.8);
      }}
      className="font-display text-sm font-bold tracking-widest uppercase hover:opacity-80 transition-opacity cursor-pointer"
    >
      <span ref={ref} />
    </button>
  );
}

export default function Nav() {
  const nav = useRef();
  const mobileMenuRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        nav.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.5 },
      );
    },
    { scope: nav },
  );

  useEffect(() => {
    setScrolled(window.scrollY > 40);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" },
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  // Close menu on scroll
  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const borderClass =
    scrolled || menuOpen
      ? "border-b-2 border-black bg-white/95 backdrop-blur-sm"
      : "";

  return (
    <nav
      ref={nav}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${borderClass}`}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-8 py-5">
        <ScrambleLogo
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <ScrambleNavItem text={link} onClick={() => scrollTo(link)} />
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-[10px] font-bold uppercase tracking-widest cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden border-t-2 border-black bg-white/95 backdrop-blur-sm overflow-hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-5">
          {links.map((link) => (
            <li key={link}>
              <ScrambleNavItem
                text={link}
                onClick={() => scrollTo(link)}
                onClose={() => setMenuOpen(false)}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
