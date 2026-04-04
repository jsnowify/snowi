import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  useEffect(() => {
    if (isTouchDevice) return;

    let mouseX = -100,
      mouseY = -100;
    let ringX = -100,
      ringY = -100;
    let currentScale = 1,
      targetScale = 1;
    let rafId;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    const tick = () => {
      if (dot.current && ring.current) {
        currentScale += (targetScale - currentScale) * 0.15;
        dot.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.current.style.transform = `translate(${ringX}px, ${ringY}px) scale(${currentScale})`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const grow = (e) => {
      if (
        e.target.closest(
          "a, button, [data-cursor], .cursor-pointer, .cursor-crosshair",
        )
      ) {
        targetScale = 2.2;
        if (dot.current) dot.current.style.opacity = "0";
      }
    };

    const shrink = (e) => {
      if (
        e.target.closest(
          "a, button, [data-cursor], .cursor-pointer, .cursor-crosshair",
        )
      ) {
        targetScale = 1;
        if (dot.current) dot.current.style.opacity = "1";
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget) {
        if (dot.current) dot.current.style.opacity = "0";
        if (ring.current) ring.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", grow);
    document.addEventListener("mouseout", shrink);
    document.addEventListener("mouseout", handleMouseOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", grow);
      document.removeEventListener("mouseout", shrink);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* data-cursor-dot / data-cursor-ring let CursorFollower suppress these
          while a project preview is being shown */}
      <div
        ref={dot}
        data-cursor-dot
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "white",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 0.2s",
          opacity: 0,
        }}
      />
      <div
        ref={ring}
        data-cursor-ring
        style={{
          position: "fixed",
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid white",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 0.2s",
          opacity: 0,
        }}
      />
    </>
  );
}
