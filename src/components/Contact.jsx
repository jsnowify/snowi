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
      className="px-4 md:px-6 py-16 md:py-24 bg-neutral-50 overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header Label */}
        <div className="contact-reveal flex items-center gap-4 mb-8 md:mb-12">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
            Section 04
          </span>
          <div className="flex-1 h-[2px] bg-black" />
          <span className="font-display text-sm font-bold uppercase tracking-widest">
            Contact
          </span>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 border-t-2 border-l-2 border-black relative bg-white">
          <GridMarker className="-top-[8px] -left-[8px]" />
          <GridMarker className="-bottom-[8px] -right-[8px]" />

          {/* Black Info Box */}
          <div className="col-span-12 md:col-span-5 border-r-2 border-b-2 border-black bg-black text-white">
            <div className="contact-reveal p-8 md:p-12 flex flex-col justify-between h-full gap-10">
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-500">
                08 / Status: Available
              </p>
              <div>
                <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.9] mb-6">
                  Let's Build <br />
                  Something.
                </h2>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed max-w-xs">
                  Currently open for <b>freelance projects, part-time roles</b>,
                  and creative collaborations. If you have an idea that needs a
                  technical edge — let's talk.
                </p>
              </div>
              <a
                href="mailto:joshuacambronero.personal@gmail.com"
                className="font-mono text-[10px] md:text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer w-fit break-all underline underline-offset-4"
              >
                joshuacambronero.personal@gmail.com ↗
              </a>
            </div>
          </div>

          {/* Contact Form Cell */}
          <div className="col-span-12 md:col-span-7 border-r-2 border-b-2 border-black transition-colors duration-300">
            <div className="contact-reveal p-8 md:p-12 h-full">
              {sent ? (
                <div className="h-full flex items-center justify-center text-center py-12">
                  <div>
                    <p className="font-display text-3xl font-bold uppercase tracking-tight mb-3">
                      Message Sent
                    </p>
                    <p className="font-mono text-xs text-neutral-500">
                      I'll check my inbox and get back to you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8 h-full justify-center"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 block mb-2">
                        Name
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Goddess Snowi"
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
                        placeholder="goddesssnowi@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold tracking-[0.18em] uppercase text-neutral-400 block mb-2">
                      Message
                    </label>
                    <textarea
                      className={`${inputClass} resize-none h-32`}
                      placeholder="Briefly describe your project or inquiry..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      required
                    />
                  </div>
                  {error && (
                    <p className="font-mono text-xs text-red-500 -mt-4">
                      Error sending message. Please try again later.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="self-start font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest px-10 py-4 bg-black text-white hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit Inquiry →"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Social Grid Items */}
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="col-span-6 md:col-span-3 border-r-2 border-b-2 border-black group hover:bg-black hover:text-white transition-all duration-300 cursor-pointer block"
            >
              <div className="contact-reveal p-6 md:p-8 h-full flex flex-col justify-center">
                <p className="text-[9px] font-bold tracking-[0.16em] uppercase text-neutral-400 group-hover:text-neutral-500 mb-2 transition-colors">
                  {s.label}
                </p>
                <p className="font-mono text-[10px] md:text-xs font-bold text-black group-hover:text-white tracking-wide transition-colors truncate">
                  {s.handle}{" "}
                  <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
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
