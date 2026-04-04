import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GridMarker from "./GridMarker";
import Cursor from "./Cursor";

const PROJECT_DATA = {
  "school-org-graphics": {
    title: "School & Org Graphics",
    category: "Visual Design",
    year: "2024–2026",
    tags: ["Posters", "Pubmats", "Social Media"],
    role: "Graphic Designer",
    summary:
      "A collection of promotional materials, event posters, and visual identities designed for various school organizations and campus events.",
    challenge:
      "Balancing the specific branding requirements of different student organizations while ensuring each piece grabs attention in a fast-paced campus environment.",
    approach:
      "Focused on clear hierarchy, vibrant color palettes, and highly readable typography to ensure information is quickly digested by the student body.",
    outcome:
      "Successfully increased event engagement and established consistent, recognizable visual identities for multiple campus orgs.",
    heroImage: "/imgs/1.png",
    images: [
      "/imgs/school/1.png",
      "/imgs/school/2.png",
      "/imgs/school/3.png",
      "/imgs/school/4.png",
    ],
    link: null,
  },
  "esports-mlbb-graphics": {
    title: "Esports & MLBB Graphics",
    category: "Esports Design",
    year: "2024–2026",
    tags: ["Overlays", "Tournament", "Socials"],
    role: "Broadcast & Visual Designer",
    summary:
      "High-energy broadcast graphics, stream overlays, and tournament branding specifically tailored for Mobile Legends: Bang Bang events.",
    challenge:
      "Esports graphics require a hyper-dynamic look that feels exciting but doesn't clutter the screen or distract from the actual gameplay during live broadcasts.",
    approach:
      "Utilized aggressive typography, glowing accents, and metallic textures typical of gaming aesthetics, while keeping the data zones (scores, player cams, timers) rigorously clean and legible.",
    outcome:
      "Delivered professional-grade tournament assets that elevated the production value of the streams and enhanced the viewer experience.",
    heroImage: "/imgs/2.jpg",
    images: [
      "/imgs/esports/7.png",
      "/imgs/esports/2.png",
      "/imgs/esports/3.png",
      "/imgs/esports/1.jpg",
      "/imgs/esports/4.jpg",
      "/imgs/esports/5.jpg",
      "/imgs/esports/8.png",
      "/imgs/esports/9.png",
      "/imgs/esports/10.png",
      "/imgs/esports/11.png",
    ],
    link: null,
  },
  "personal-graphics": {
    title: "Personal Explorations",
    category: "Graphic Design",
    year: "Ongoing",
    tags: ["Typography", "Illustration", "Layout"],
    role: "Designer",
    summary:
      "A curated collection of personal design studies, typographic experiments, and creative explorations outside of client or academic work.",
    challenge:
      "Finding time to experiment with new techniques, software tools, and visual styles without the constraints of a specific brief.",
    approach:
      "Treated each piece as a playground to test out new grid systems, color blending techniques, and vector illustrations.",
    outcome:
      "A growing library of visual assets that continually pushes my technical skills and defines my personal aesthetic as a designer.",
    heroImage: "/imgs/3.png",
    images: [
      "/imgs/personal/1.png",
      "/imgs/personal/2.png",
      "/imgs/personal/3.png",
      "/imgs/personal/4.png",
      "/imgs/personal/5.png",
      "/imgs/personal/6.png",
      "/imgs/personal/7.png",
      "/imgs/personal/8.png",
      "/imgs/personal/9.png",
      "/imgs/personal/11.png",
    ],
    link: null,
  },
  "dss-confessions": {
    title: "DSSConfessions",
    category: "Full-Stack Web",
    year: "2026",
    tags: ["React", "Node.js", "Supabase", "Tailwind"],
    role: "Full-Stack Developer",
    summary:
      "A web-based community confession platform built for the student body — anonymous submissions, moderation tools, and a public feed.",
    challenge:
      "Building anonymous submission infrastructure that prevents abuse without requiring accounts, while keeping the feed feel authentic and community-driven.",
    approach:
      "Supabase handles auth and real-time DB. Submissions are fully anonymous on the client — no user ID attached. A lightweight moderation queue lets admins approve or reject before anything hits the public feed.",
    outcome:
      "Deployed and actively used by the student community. Moderation workflow keeps the feed clean without killing the organic feel.",
    heroImage: "/imgs/dssc/1.png",
    images: [
      "/imgs/dssc/2.png",
      "/imgs/dssc/3.png",
      "/imgs/dssc/4.png",
      "/imgs/dssc/5.png",
    ],
    link: "https://dssconfessions.vercel.app/",
  },
  "android-expense-tracker": {
    title: "Android Expense Tracker",
    category: "Mobile App",
    year: "2023",
    tags: ["Kotlin", "Android", "Room DB"],
    role: "Android Developer",
    summary:
      "Native Android app — category breakdowns, monthly charts, and CSV export.",
    challenge:
      "Most expense apps are either too simple or too complex. The goal was the sweet spot: meaningful insight without configuration overhead.",
    approach:
      "Kotlin with Room for local persistence. No backend — everything stays on device. Monthly bar charts with MPAndroidChart. Category system is user-defined.",
    outcome:
      "Fully functional app. CSV export opens directly in Google Sheets. Plans to publish to Play Store pending design polish.",
    heroImage: null,
    images: [],
    link: null,
  },
  snuzz: {
    title: "Snuzz",
    category: "Mobile App / Machine Learning",
    year: "2026",
    tags: ["Kotlin", "Android", "ML"],
    role: "Lead Developer",
    summary:
      "An undergraduate capstone Android application utilizing machine learning for data collection and analysis.",
    challenge:
      "Handling sensitive user datasets for the ML model required strict ethical compliance alongside optimizing the app for hardware performance.",
    approach:
      "Developed natively in Kotlin. Prioritized user transparency by designing a strict 3-paragraph consent form that explicitly outlines what happens to the collected dataset after the study concludes.",
    outcome:
      "In active development. Architecture and foundational ML pipelines established.",
    heroImage: null,
    images: [],
    link: null,
  },
};

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const container = useRef();
  const project = PROJECT_DATA[slug];

  useGSAP(
    () => {
      gsap.from(".page-reveal", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
      });
    },
    { scope: container },
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="font-mono text-sm text-neutral-400 mb-4">
            404 — Project not found
          </p>
          <button
            onClick={() => navigate("/")}
            className="font-bold uppercase tracking-widest text-sm underline hover:text-neutral-500 transition-colors"
          >
            Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Cursor />
      <main
        ref={container}
        className="min-h-screen bg-white px-4 md:px-6 pt-20 md:pt-24 pb-16 md:pb-24"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="page-reveal font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors mb-12 flex items-center gap-2"
          >
            ← Back
          </button>

          {/* ── Header Grid ── */}
          <div className="page-reveal bento-container grid grid-cols-12 border-t-2 border-l-2 border-black relative">
            <GridMarker className="-top-[8px] -left-[8px]" />
            <GridMarker className="-bottom-[8px] -right-[8px]" />

            {/* Title */}
            <div className="col-span-12 md:col-span-8 border-r-2 border-b-2 border-black p-5 md:p-12">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">
                {project.category} — {project.year}
              </p>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.9] tracking-tighter text-black">
                {project.title}
              </h1>
            </div>

            {/* Meta */}
            <div className="col-span-12 md:col-span-4 border-r-2 border-b-2 border-black p-8 flex flex-col justify-between gap-8">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3">
                  Role
                </p>
                <p className="font-bold uppercase tracking-wider text-sm">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3">
                  Stack / Tools
                </p>
                <div className="flex flex-wrap gap-2">
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
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold uppercase tracking-widest text-xs underline hover:text-neutral-500 transition-colors"
                >
                  View Live ↗
                </a>
              )}
            </div>

            {/* ── Hero Image ── */}
            <div
              className="col-span-12 border-r-2 border-b-2 border-black overflow-hidden group"
              style={{ lineHeight: 0 }}
            >
              {project.heroImage ? (
                <img
                  src={project.heroImage}
                  alt={`${project.title} showcase`}
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <div
                  className="w-full h-48 bg-neutral-100 flex items-center justify-center"
                  style={{ lineHeight: "normal" }}
                >
                  <p className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                    [ Hero Image Placeholder ]
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Content ── */}
          <div className="page-reveal grid grid-cols-12 border-l-2 border-black">
            <div className="col-span-12 border-r-2 border-b-2 border-black p-8 md:p-12 bg-black text-white">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4">
                Summary
              </p>
              <p className="font-mono text-[clamp(1rem,2vw,1.2rem)] leading-[1.7]">
                {project.summary}
              </p>
            </div>

            <div className="col-span-12 md:col-span-6 border-r-2 border-b-2 border-black p-8 md:p-10 hover:bg-neutral-50 transition-colors duration-300">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">
                The Challenge
              </p>
              <p className="font-mono text-sm leading-[1.8] text-neutral-700">
                {project.challenge}
              </p>
            </div>

            <div className="col-span-12 md:col-span-6 border-r-2 border-b-2 border-black p-8 md:p-10 hover:bg-neutral-50 transition-colors duration-300">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">
                The Approach
              </p>
              <p className="font-mono text-sm leading-[1.8] text-neutral-700">
                {project.approach}
              </p>
            </div>
          </div>

          {/* ── Gallery ── */}
          {project.images.length > 0 && (
            <div className="page-reveal grid grid-cols-12 border-l-2 border-black">
              {project.images.map((src, i) => {
                const isAccent = i % 3 === 0;
                return (
                  <div
                    key={i}
                    className={`${
                      isAccent ? "col-span-12" : "col-span-12 md:col-span-6"
                    } border-r-2 border-b-2 border-black overflow-hidden group cursor-crosshair`}
                    style={{ lineHeight: 0 }}
                  >
                    <img
                      src={src}
                      alt={`${project.title} — image ${i + 1}`}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Outcome ── */}
          <div className="page-reveal grid grid-cols-12 border-l-2 border-black">
            <div className="col-span-12 border-r-2 border-b-2 border-black p-8 md:p-12 hover:bg-neutral-50 transition-colors duration-300">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">
                Outcome
              </p>
              <p className="font-mono text-[clamp(1rem,2vw,1.1rem)] leading-[1.7] text-black">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* ── Footer Nav ── */}
          <div className="page-reveal mt-16 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors flex items-center gap-2"
            >
              ← All Projects
            </button>
            <p className="font-display text-xs uppercase tracking-widest text-neutral-300">
              {project.category}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
