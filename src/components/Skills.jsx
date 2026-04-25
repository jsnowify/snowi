import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GridMarker from "./GridMarker";

gsap.registerPlugin(ScrollTrigger);

const designSkills = [
  { name: "Figma", note: "UI/UX, Prototyping" },
  { name: "Adobe Illustrator", note: "Vector, Branding" },
  { name: "Canva", note: "Social, Print" },
  { name: "Affinity Suite", note: "Photo, Publisher, Designer" },
];

const devSkills = [
  { name: "React", note: "Hooks, Context, Vite" },
  { name: "Tailwind CSS", note: "Utility-first CSS" },
  { name: "GSAP", note: "ScrollTrigger, Timelines" },
  { name: "JavaScript", note: "ES6+, Async/Await, DOM", highlight: true },
  { name: "TypeScript", note: "Typed JS" },
  { name: "Kotlin / Android", note: "Native, Jetpack" },
  { name: "Java", note: "OOP, Backend basics" },
  { name: "Python", note: "Scripting, Automation" },
  { name: "Node.js", note: "Express, REST APIs" },
  { name: "MySQL", note: "Schema design, Queries" },
  { name: "Supabase", note: "Schema design, Queries" },
  { name: "MongoDB", note: "Schema design, Queries" },
  { name: "Git", note: "GitHub, Version control" },
];

function SkillRow({ name, note, highlight }) {
  return (
    <div
      className={`flex items-baseline justify-between py-3 md:py-3.5 border-b border-neutral-100 last:border-0 group cursor-default transition-all duration-300 ${
        highlight ? "bg-black -mx-2 px-2 md:-mx-4 md:px-4 my-1" : ""
      }`}
    >
      <span
        className={`font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-colors ${
          highlight ? "text-white" : "text-black group-hover:text-neutral-500"
        }`}
      >
        {name}{" "}
        {highlight && <span className="ml-2 text-[10px] animate-pulse">●</span>}
      </span>
      <span
        className={`font-mono text-[9px] tracking-wider uppercase ml-2 shrink-0 ${
          highlight ? "text-neutral-400" : "text-neutral-400"
        }`}
      >
        {note}
      </span>
    </div>
  );
}

export default function Skills() {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".skills-reveal", {
        scrollTrigger: { trigger: container.current, start: "top 75%" },
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      id="skills"
      ref={container}
      className="px-4 md:px-6 pt-8 pb-16 md:pb-24 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="skills-reveal flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
            Section 03
          </span>
          <div className="flex-1 h-[2px] bg-black" />
          <span className="font-display text-sm font-bold uppercase tracking-widest">
            Skills
          </span>
        </div>

        <div className="bento-container grid grid-cols-12 border-t-2 border-l-2 border-black relative">
          <GridMarker className="-top-[8px] -left-[8px]" />
          <GridMarker className="-bottom-[8px] -right-[8px]" />

          {/* Intro Card */}
          <div className="col-span-12 md:col-span-4 border-r-2 border-b-2 border-black bg-black text-white">
            <div className="skills-reveal p-6 md:p-8 flex flex-row md:flex-col items-center md:items-start justify-between h-full gap-4">
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                07 / Capabilities
              </p>
              <div>
                <h2 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-2 md:mb-4">
                  What I Work With
                </h2>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed hidden md:block">
                  A stack built for modern performance. Javascript serves as the
                  core engine for every project I ship.
                </p>
              </div>
            </div>
          </div>

          {/* Design Column */}
          <div className="col-span-12 md:col-span-4 border-r-2 border-b-2 border-black hover:bg-neutral-50 transition-colors">
            <div className="skills-reveal p-5 md:p-8 h-full">
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-4">
                Design Tools
              </p>
              {designSkills.map((s) => (
                <SkillRow key={s.name} {...s} />
              ))}
            </div>
          </div>

          {/* Dev Column */}
          <div className="col-span-12 md:col-span-4 border-r-2 border-b-2 border-black hover:bg-neutral-50 transition-colors">
            <div className="skills-reveal p-5 md:p-8 h-full">
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-4">
                Dev Stack
              </p>
              {devSkills.map((s) => (
                <SkillRow key={s.name} {...s} highlight={s.highlight} />
              ))}
            </div>
          </div>

          {/* Tag Cloud with Highlight */}
          <div className="col-span-12 border-r-2 border-b-2 border-black hover:bg-neutral-50 transition-colors">
            <div className="skills-reveal p-4 md:p-6 flex flex-wrap gap-2">
              {[...designSkills, ...devSkills].map((s) => (
                <span
                  key={s.name}
                  className={`font-mono text-[9px] font-bold tracking-widest uppercase px-2 md:px-3 py-1 md:py-1.5 border transition-all cursor-crosshair ${
                    s.highlight
                      ? "bg-black text-white border-black"
                      : "border-neutral-200 text-neutral-500 hover:border-black hover:text-black"
                  }`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
