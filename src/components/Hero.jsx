import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import GridMarker from "./GridMarker";

gsap.registerPlugin(ScrambleTextPlugin);

const roles = [
  { id: "01", label: "Engineer", title: "Software\nEngineer" },
  { id: "02", label: "Design", title: "Graphic\nDesigner" },
  { id: "03", label: "Experience", title: "UI & UX\nDesigner" },
];

function setLayerContent(layer, role) {
  if (!layer) return;
  layer.querySelector("[data-label]").textContent =
    `${role.id} / ${role.label}`;
  layer.querySelector("[data-title]").textContent = role.title;
}

function ScrambleName({ lines, className, active }) {
  const refs = useRef([]);
  const tweenRef = useRef(null);
  const prevActive = useRef(active);

  useEffect(() => {
    if (active === prevActive.current) return;
    prevActive.current = active;
    if (tweenRef.current) tweenRef.current.kill();
    const tls = refs.current.map((el, i) =>
      gsap.to(el, {
        duration: active ? 0.9 : 0.7,
        scrambleText: {
          text: lines[i],
          chars: "upperCase",
          speed: active ? 0.6 : 0.8,
          delimiter: "",
        },
        ease: "none",
        delay: i * 0.05,
      }),
    );
    tweenRef.current = tls[0];
  }, [active, lines]);

  return (
    <span className={`${className} absolute`} style={{ display: "block" }}>
      {lines.map((line, i) => (
        <span
          key={i}
          ref={(el) => (refs.current[i] = el)}
          style={{ display: "block" }}
        >
          {line}
        </span>
      ))}
    </span>
  );
}

function RoleCard({ slotIndex }) {
  const frontRef = useRef();
  const backRef = useRef();
  const idxRef = useRef(slotIndex % roles.length);

  useEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back) return;
    setLayerContent(front, roles[idxRef.current]);
    setLayerContent(back, roles[(idxRef.current + 1) % roles.length]);
    gsap.set(back, { opacity: 0, y: 28, skewY: 3 });

    const INTERVAL = 3.6;
    const INITIAL_DELAY = 3 + slotIndex * 0.22;
    let timeout;

    const cycle = () => {
      const activeFront = frontRef.current;
      const activeBack = backRef.current;
      const tl = gsap.timeline({
        onComplete: () => {
          idxRef.current = (idxRef.current + 1) % roles.length;
          setLayerContent(
            activeFront,
            roles[(idxRef.current + 1) % roles.length],
          );
          gsap.set(activeFront, { opacity: 0, y: 28, skewY: 3 });
          frontRef.current = activeBack;
          backRef.current = activeFront;
          timeout = setTimeout(cycle, INTERVAL * 1000);
        },
      });
      tl.to(activeFront, {
        opacity: 0,
        y: -22,
        skewY: -2.5,
        duration: 0.6,
        ease: "power3.inOut",
      }).to(
        activeBack,
        { opacity: 1, y: 0, skewY: 0, duration: 0.85, ease: "expo.out" },
        "-=0.42",
      );
    };

    timeout = setTimeout(cycle, INITIAL_DELAY * 1000);
    return () => clearTimeout(timeout);
  }, [slotIndex]);

  const layerClass =
    "absolute inset-0 p-6 md:p-10 flex flex-col justify-between will-change-transform";

  return (
    <div className="bento-cell col-span-12 md:col-span-4 border-r-2 border-b-2 border-black bg-white hover:bg-neutral-50 transition-colors duration-500 min-h-[160px] md:min-h-[220px] relative overflow-hidden">
      <div ref={frontRef} className={layerClass}>
        <p
          data-label
          className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400"
        />
        <h2
          data-title
          className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-black mt-4 whitespace-pre-line leading-[0.9]"
        />
      </div>
      <div ref={backRef} className={layerClass}>
        <p
          data-label
          className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400"
        />
        <h2
          data-title
          className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-black mt-4 whitespace-pre-line leading-[0.9]"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const container = useRef();
  const [isRevealed, setIsRevealed] = useState(false);
  const [readyToAnimate, setReadyToAnimate] = useState(false);

  useEffect(() => {
    const go = () =>
      document.fonts.ready.then(() =>
        setTimeout(() => setReadyToAnimate(true), 100),
      );
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go);
  }, []);

  useGSAP(
    () => {
      if (!readyToAnimate) return;
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".bento-cell", { opacity: 0, y: 32, duration: 1, stagger: 0.07 })
        .from(
          ".hero-name-wrapper",
          { y: 80, opacity: 0, duration: 1.2, skewY: 4 },
          "-=0.8",
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 },
          "-=0.6",
        );
    },
    { scope: container, dependencies: [readyToAnimate] },
  );

  const sharedNameClass =
    "font-display text-[clamp(3.5rem,10vw,12rem)] uppercase leading-[0.85] tracking-tighter transition-all duration-700";

  return (
    <section
      id="hero"
      ref={container}
      className={`flex items-start justify-center bg-white bg-grid px-4 md:px-6 pt-24 md:pt-28 pb-8 md:pb-12 transition-opacity duration-700 ${
        readyToAnimate ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-[1400px]">
        <div className="bento-container grid grid-cols-12 border-t-2 border-l-2 border-black w-full relative">
          <GridMarker className="-top-[8px] -left-[8px]" />
          <GridMarker className="-bottom-[8px] -right-[8px]" />

          {/* NAME BOX */}
          <div
            className="bento-cell col-span-12 md:col-span-8 border-r-2 border-b-2 border-black bg-black px-6 py-12 md:px-16 md:py-24 flex items-center overflow-hidden cursor-crosshair relative"
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
            onClick={() => setIsRevealed((v) => !v)}
          >
            <div className="hero-name-wrapper relative w-full h-[clamp(7rem,14vw,14rem)] flex items-center">
              <ScrambleName
                lines={["Snowi", "Wu"]}
                active={!isRevealed}
                className={`text-white ${isRevealed ? "-translate-y-12 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"} ${sharedNameClass}`}
              />
              <ScrambleName
                lines={["Joshua", "Cambronero"]}
                active={isRevealed}
                className={`text-neutral-400 ${isRevealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"} ${sharedNameClass}`}
              />
            </div>
          </div>

          {/* STATUS, LOCATION & DOCUMENTS SIDEBAR */}
          <div className="bento-cell col-span-12 md:col-span-4 border-r-2 border-b-2 border-black bg-white p-6 md:p-12 flex flex-col justify-between gap-8">
            <div className="hero-sub">
              <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 mb-3 uppercase">
                Status
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest text-black">
                  Open for Work
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 tracking-widest uppercase">
                snowi.void
              </p>
            </div>

            {/* DOCUMENTS LINKS SECTION */}
            <div className="hero-sub border-y border-neutral-100 py-6">
              <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 mb-4 uppercase">
                Documents
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="/docs/Joshua_Cambronero_Resume.pdf"
                  target="_blank"
                  className="text-xs font-bold uppercase tracking-widest text-black hover:text-neutral-500 transition-colors flex items-center justify-between"
                >
                  Resume <span>↗</span>
                </a>
                <a
                  href="/docs/Joshua_Cambronero_CV.pdf"
                  target="_blank"
                  className="text-xs font-bold uppercase tracking-widest text-black hover:text-neutral-500 transition-colors flex items-center justify-between"
                >
                  Curriculum Vitae <span>↗</span>
                </a>
              </div>
            </div>

            <div className="hero-sub">
              <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 mb-3 uppercase">
                Location
              </p>
              <p className="text-sm font-bold uppercase tracking-wider leading-relaxed text-black">
                Davao Region, PH
              </p>
              <p className="text-[10px] text-neutral-400 tracking-widest uppercase mt-2">
                UTC+8
              </p>
            </div>
          </div>

          {/* ROLE CARDS RETURNED TO ORIGINAL SPOTS */}
          <RoleCard slotIndex={0} />
          <RoleCard slotIndex={1} />
          <RoleCard slotIndex={2} />
        </div>
      </div>
    </section>
  );
}
