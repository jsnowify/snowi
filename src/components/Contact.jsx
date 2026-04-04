import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GridMarker from "./GridMarker";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "GitHub", handle: "jsnowify", href: "https://github.com/jsnowify" },
  {
    label: "LinkedIn",
    handle: "joshua-cambronero",
    href: "https://www.linkedin.com/in/joshua-cambronero/",
  },
  {
    label: "TikTok",
    handle: "snowi.aero",
    href: "https://www.tiktok.com/@snowi.aero",
  },
  {
    label: "Email",
    handle: "joshuacambronero.personal",
    href: "mailto:joshuacambronero.personal@gmail.com",
  },
];

export default function Contact() {
  const container = useRef();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        scrollTrigger: { trigger: container.current, start: "top 75%" },
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
      });
    },
    { scope: container },
  );

  const FORMSPREE_ID = "xwvwrjnb";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b-2 border-black py-3 font-mono text-sm placeholder:text-neutral-300 focus:outline-none focus:border-neutral-600 transition-colors cursor-text";

  return (
    <section
      id="contact"
      ref={container}
      className="px-4 md:px-6 py-16 md:py-24 bg-neutral-50"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="contact-reveal flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
            Section 04
          </span>
          <div className="flex-1 h-[2px] bg-black" />
          <span className="font-display text-sm font-bold uppercase tracking-widest">
            Contact
          </span>
        </div>

        <div className="bento-container grid grid-cols-12 border-t-2 border-l-2 border-black relative">
          <GridMarker className="-top-[8px] -left-[8px]" />
          <GridMarker className="-bottom-[8px] -right-[8px]" />

          {/* Black info box */}
          <div className="col-span-12 md:col-span-5 border-r-2 border-b-2 border-black bg-black text-white">
            <div className="contact-reveal p-6 md:p-10 flex flex-col justify-between h-full gap-6 md:gap-0">
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                08 / Get in touch
              </p>
              <div>
                <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight mb-4 md:mb-6">
                  Let's Work
                  <br />
                  Together.
                </h2>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Open for freelance projects, full-time roles, and
                  collaborations. Whether it's a brand identity, a web app, or
                  something in between — let's talk.
                </p>
              </div>
              <a
                href="mailto:joshuacambronero.personal@gmail.com"
                className="font-mono text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer w-fit break-all"
              >
                joshuacambronero.personal@gmail.com ↗
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-12 md:col-span-7 border-r-2 border-b-2 border-black hover:bg-white transition-colors duration-300">
            <div className="contact-reveal p-6 md:p-10 h-full">
              {sent ? (
                <div className="h-full flex items-center justify-center text-center min-h-[200px] md:min-h-[250px]">
                  <div>
                    <p className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mb-3">
                      Message Sent ✓
                    </p>
                    <p className="font-mono text-xs text-neutral-500">
                      I'll get back to you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 md:gap-8 h-full justify-center"
                >
                  <div>
                    <label className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 block mb-2">
                      Name
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 block mb-2">
                      Message
                    </label>
                    <textarea
                      className={`${inputClass} resize-none h-24 md:h-28`}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      required
                    />
                  </div>
                  {error && (
                    <p className="font-mono text-xs text-red-500 -mt-2 md:-mt-4">
                      Something went wrong — please try again or email me
                      directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="self-start font-mono text-xs font-bold uppercase tracking-widest px-6 md:px-8 py-3 md:py-4 bg-black text-white hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Socials — 2-col on mobile, 4-col on desktop */}
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                s.href.startsWith("mailto") ? undefined : "noopener noreferrer"
              }
              className="col-span-6 md:col-span-3 border-r-2 border-b-2 border-black group hover:bg-black hover:text-white transition-all duration-200 cursor-pointer block"
            >
              <div className="contact-reveal p-4 md:p-6 h-full flex flex-col justify-center">
                <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-neutral-400 group-hover:text-neutral-500 mb-1.5 md:mb-2 transition-colors">
                  {s.label}
                </p>
                <p className="font-mono text-[10px] md:text-xs font-bold text-black group-hover:text-white tracking-wide transition-colors truncate">
                  {s.handle}{" "}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
