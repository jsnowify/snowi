export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-black px-6 py-8 bg-white">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
        <span className="font-display text-sm font-bold uppercase tracking-widest">
          Snowi Wu
        </span>
        <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
          © {year} · Davao Region, PH · React + GSAP + Tailwind
        </span>
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
