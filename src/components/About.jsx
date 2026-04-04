import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import GridMarker from "./GridMarker";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const facts = [
  { idx: "01", label: "Role", value: "Designer & Developer" },
  { idx: "02", label: "Specialty", value: "Front-end + Android" },
  { idx: "03", label: "Education", value: "BS Information Technology" },
  { idx: "04", label: "Availability", value: "Freelance & Full-time" },
];

function FactCell({ f, isLast }) {
  const textRef = useRef();
  const tweenRef = useRef(null);

  const scramble = () => {
    if (tweenRef.current) tweenRef.current.kill();
    tweenRef.current = gsap.to(textRef.current, {
      duration: 0.8,
      scrambleText: { text: f.value, chars: "01", speed: 0.5, delimiter: "" },
      ease: "none",
    });
  };

  const restore = () => {
    if (tweenRef.current) tweenRef.current.kill();
    if (textRef.current) textRef.current.textContent = f.value;
  };

  useEffect(() => {
    if (textRef.current) textRef.current.textContent = f.value;
    return () => tweenRef.current?.kill();
  }, [f.value]);

  return (
    <div
      onMouseEnter={scramble}
      onMouseLeave={restore}
      onClick={scramble}
      className={`px-5 py-4 md:p-6 flex-1 flex flex-col justify-center cursor-crosshair hover:bg-neutral-50 transition-colors duration-300 ${
        !isLast ? "border-b-2 border-black" : ""
      }`}
    >
      <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-1">
        {f.idx} / {f.label}
      </p>
      <p
        ref={textRef}
        className="text-xs md:text-sm font-bold uppercase tracking-wider text-black font-mono"
      />
    </div>
  );
}

function ScrambleInlineName() {
  const textRef = useRef();
  const tweenRef = useRef(null);
  const activeRef = useRef(false);
  const ALIAS = "Snowi Wu";
  const REAL = "Joshua Cambronero";

  const to = (target, speed = 0.6) => {
    if (tweenRef.current) tweenRef.current.kill();
    tweenRef.current = gsap.to(textRef.current, {
      duration: 0.9,
      scrambleText: { text: target, chars: "upperCase", speed, delimiter: "" },
      ease: "none",
    });
  };

  const handleEnter = () => {
    activeRef.current = true;
    to(REAL, 0.6);
  };
  const handleLeave = () => {
    activeRef.current = false;
    to(ALIAS, 0.8);
  };
  const handleTap = () => {
    activeRef.current = !activeRef.current;
    to(activeRef.current ? REAL : ALIAS, 0.7);
  };

  useEffect(() => {
    if (textRef.current) textRef.current.textContent = ALIAS;
    return () => tweenRef.current?.kill();
  }, []);

  return (
    <span
      ref={textRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleTap}
      className="font-bold cursor-crosshair underline decoration-dotted underline-offset-4 decoration-neutral-400 hover:decoration-black transition-all duration-200"
    />
  );
}

export default function About() {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        scrollTrigger: { trigger: container.current, start: "top 75%" },
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
      });
      gsap.from(".philosophy-phrase", {
        scrollTrigger: { trigger: ".philosophy-strip", start: "top 85%" },
        opacity: 0,
        x: -24,
        duration: 0.7,
        stagger: 0.12,
        ease: "expo.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      id="about"
      ref={container}
      className="px-4 md:px-6 pt-8 pb-16 md:pb-24 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="about-reveal flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
            Section 01
          </span>
          <div className="flex-1 h-[2px] bg-black" />
          <span className="font-display text-sm font-bold uppercase tracking-widest">
            About
          </span>
        </div>

        <div className="bento-container grid grid-cols-12 border-t-2 border-l-2 border-black relative">
          <GridMarker className="-top-[8px] -left-[8px]" />
          <GridMarker className="-bottom-[8px] -right-[8px]" />

          {/* Bio */}
          <div className="about-reveal col-span-12 md:col-span-8 border-r-2 border-b-2 border-black p-6 md:p-12 hover:bg-neutral-50 transition-colors duration-300">
            <p className="font-mono text-[clamp(0.9rem,2vw,1.25rem)] leading-[1.6] text-black mb-5">
              I'm <ScrambleInlineName />, a designer who codes and an engineer
              who designs. Operating out of the Davao Region, I build native
              Android apps and React platforms that refuse to be boring.
            </p>
            <p className="font-mono text-sm md:text-base leading-[1.7] text-neutral-600">
              I obsess over the things most people scroll right past — the snap
              of a transition, the exact weight of a border, and the logic
              powering it all under the hood. If it doesn't look sharp and run
              flawlessly, I don't ship it.
            </p>
          </div>

          {/* Facts */}
          <div className="about-reveal col-span-12 md:col-span-4 border-r-2 border-b-2 border-black flex flex-col">
            {facts.map((f, i) => (
              <FactCell key={f.idx} f={f} isLast={i === facts.length - 1} />
            ))}
          </div>

          {/* Philosophy strip */}
          <div className="philosophy-strip about-reveal col-span-12 border-r-2 border-b-2 border-black bg-black text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-around gap-5 md:gap-8">
            {[
              "Design with intent.",
              "Build with precision.",
              "Ship what matters.",
            ].map((phrase, i) => (
              <div
                key={i}
                className="philosophy-phrase flex items-center gap-3 md:gap-4 cursor-default"
              >
                <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                  0{i + 1}
                </span>
                <span className="font-display text-lg md:text-2xl font-bold uppercase tracking-tight">
                  {phrase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
