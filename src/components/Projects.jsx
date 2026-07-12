import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import GridMarker from "./GridMarker";

gsap.registerPlugin(ScrollTrigger);

const gdProjects = [
  {
    id: "gd1",
    slug: "school-org-graphics",
    title: "School & Org Graphics",
    category: "Visual Design",
    tags: ["Posters", "Pubmats", "Social Media"],
    desc: "Promotional materials and visual identities created for various campus organizations.",
    bg: "bg-blue-900",
    preview: "poster",
    mainImage: "/imgs/1.png",
    colSpan: "md:col-span-4",
  },
  {
    id: "gd2",
    slug: "esports-mlbb-graphics",
    title: "Esports & MLBB",
    category: "Esports Design",
    tags: ["Overlays", "Tournament", "Socials"],
    desc: "High-energy broadcast graphics, overlays, and tournament branding for Mobile Legends.",
    bg: "bg-purple-900",
    preview: "brand",
    mainImage: "/imgs/2.jpg",
    colSpan: "md:col-span-4",
  },
  {
    id: "gd3",
    slug: "personal-graphics",
    title: "Personal Explorations",
    category: "Graphic Design",
    tags: ["Typography", "Illustration", "Layout"],
    desc: "A curated collection of personal design studies, typography, and creative experiments.",
    bg: "bg-orange-900",
    preview: "editorial",
    mainImage: "/imgs/3.png",
    colSpan: "md:col-span-4",
  },
];

const sysProjects = [
  {
    id: "sys1",
    slug: "dss-confessions",
    title: "DSSConfessions",
    category: "Full-Stack Web",
    tags: ["React", "Node.js", "Supabase", "Tailwind"],
    desc: "A web-based community confession platform built for the student body.",
    bg: "bg-neutral-100",
    preview: "system",
    mainImage: "/imgs/dssc/1.png",
    colSpan: "md:col-span-7",
  },
  {
    id: "sys2",
    slug: "snuzz",
    title: "Snuzz",
    category: "Mobile App / ML",
    tags: ["Kotlin", "Android", "Machine Learning"],
    desc: "An undergraduate capstone Android application utilizing machine learning for data collection.",
    bg: "bg-neutral-200",
    preview: "mobile",
    mainImage: "/imgs/snuzz/1.png",
    colSpan: "md:col-span-5",
  },
];

// Computed once at module load instead of on every render of every card.
const isTouchDevice =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

function ProjectPreview({ type, project }) {
  if (project.mainImage) {
    return (
      <img
        src={project.mainImage}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
      />
    );
  }
  switch (type) {
    case "brand":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/30" />
          <div className="w-24 h-px bg-white/20 absolute" />
        </div>
      );
    case "editorial":
      return (
        <div className="w-full h-full p-4 flex flex-col justify-end gap-1">
          {[70, 90, 55, 80].map((w, i) => (
            <div
              key={i}
              className="h-px bg-[#3d2c1e]/30"
              style={{ width: `${w}%` }}
            />
          ))}
          <span className="font-display text-[3rem] font-bold text-[#3d2c1e]/20 leading-none mt-1">
            Aa
          </span>
        </div>
      );
    case "poster":
      return (
        <div className="w-full h-full flex items-center justify-center gap-4">
          {["#7F77DD", "#1D9E75", "#D85A30"].map((c, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
      );
    default:
      return <div className="w-full h-full bg-neutral-200/50" />;
  }
}

function CursorFollower({ project, visible }) {
  const followerRef = useRef();
  const xTo = useRef();
  const yTo = useRef();

  useEffect(() => {
    if (!followerRef.current) return;
    xTo.current = gsap.quickTo(followerRef.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(followerRef.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    gsap.to(followerRef.current, {
      opacity: visible ? 1 : 0,
      scale: visible ? 1 : 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
    const dot = document.querySelector("[data-cursor-dot]");
    const ring = document.querySelector("[data-cursor-ring]");
    if (visible) {
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
    }
  }, [visible]);

  useEffect(() => {
    const onMove = (e) => {
      const rect = followerRef.current?.parentElement?.getBoundingClientRect();
      if (!rect) return;
      xTo.current?.(e.clientX - rect.left);
      yTo.current?.(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={followerRef}
      className="pointer-events-none absolute z-50 opacity-0 scale-90 will-change-transform hidden md:block"
      style={{ top: 0, left: 0, transform: "translate(-50%, -50%)" }}
    >
      <div className="w-48 h-32 border-2 border-black overflow-hidden shadow-2xl bg-white">
        <ProjectPreview type={project.preview} project={project} />
      </div>
      <p className="text-[9px] font-bold uppercase tracking-widest text-black mt-2 text-center bg-white/80 py-1">
        View Case Study ↗
      </p>
    </div>
  );
}

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`col-span-12 ${project.colSpan} border-r-2 border-b-2 border-black group ${
        isTouchDevice ? "cursor-pointer" : "cursor-none"
      } hover:bg-white transition-colors duration-300 relative overflow-hidden`}
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      {!isTouchDevice && <CursorFollower project={project} visible={hovered} />}

      <div className="proj-reveal h-full flex flex-col">
        <div
          className={`relative w-full h-48 md:h-64 ${project.bg} overflow-hidden border-b-2 border-black/5`}
        >
          <ProjectPreview type={project.preview} project={project} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
          <span className="md:hidden absolute top-3 right-3 text-white/60 text-sm font-bold">
            ↗
          </span>
        </div>

        <div className="p-5 md:p-8">
          <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-neutral-400 mb-1 md:mb-2">
            {project.category}
          </p>
          <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-tight text-black mb-2 md:mb-3 group-hover:text-neutral-600 transition-colors">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-neutral-500 leading-relaxed mb-4 md:mb-6">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 border border-neutral-200 text-neutral-500"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".proj-reveal", {
        scrollTrigger: { trigger: container.current, start: "top 75%" },
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
      });
    },
    { scope: container },
  );

  return (
    <section
      id="projects"
      ref={container}
      className="px-4 md:px-6 pt-8 pb-16 md:pb-24 bg-neutral-50"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="proj-reveal flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
            Section 02
          </span>
          <div className="flex-1 h-[2px] bg-black" />
          <span className="font-display text-sm font-bold uppercase tracking-widest">
            Selected Works
          </span>
        </div>

        <p className="proj-reveal text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 md:mb-6">
          05 / Visual Design
        </p>
        <div className="grid grid-cols-12 border-t-2 border-l-2 border-black mb-12 md:mb-20 relative">
          <GridMarker className="-top-[8px] -left-[8px]" />
          <GridMarker className="-bottom-[8px] -right-[8px]" />
          {gdProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <p className="proj-reveal text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 md:mb-6">
          06 / Engineering
        </p>
        <div className="grid grid-cols-12 border-t-2 border-l-2 border-black relative">
          <GridMarker className="-top-[8px] -left-[8px]" />
          <GridMarker className="-bottom-[8px] -right-[8px]" />
          {sysProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
          <div className="col-span-12 border-r-2 border-b-2 border-black group hover:bg-black transition-colors duration-500 py-14 md:py-20 flex items-center justify-center">
            <div className="text-center">
              <p className="font-display text-5xl md:text-6xl font-bold text-neutral-200 group-hover:text-white transition-colors">
                +
              </p>
              <p className="font-mono text-[10px] text-neutral-400 group-hover:text-neutral-500 mt-3 md:mt-4 tracking-[0.3em] uppercase">
                Coming Soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
