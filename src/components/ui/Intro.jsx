import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Intro = () => {
  const container = useRef();

  useGSAP(
    () => {
      // A timeline makes it easy to chain animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".title-header", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        skewY: 7, // Adds a nice organic "reveal" feel
      }).from(
        ".intro",
        {
          opacity: 0,
          y: 20,
          duration: 1,
        },
        "-=0.7",
      ); // Starts while the header is still moving
    },
    { scope: container },
  );

  return (
    <div ref={container} className="overflow-hidden px-10">
      <h1 className="title-header text-7xl md:text-9xl mb-4">Snowi Wu</h1>
      <p className="intro max-w-xl text-lg md:text-xl leading-relaxed">
        I bridge the gap between creative vision and technical execution. I
        specialize in blending{" "}
        <span className="text-blue-500 font-bold">Graphic Design</span> with
        robust <span className="text-blue-500 font-bold">Programming</span>.
        Whether I'm building responsive front-end interfaces or developing
        native Android apps, I don't just write code that works—I design
        experiences that matter.
      </p>
    </div>
  );
};

export default Intro;
