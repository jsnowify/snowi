import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { loadState } from "./loadState"; // Import the memory state

// Components
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Initialize state: if hasPlayed is false, show preloader
  const [loading, setLoading] = useState(!loadState.hasPlayed);

  const handleComplete = () => {
    setLoading(false);
    // Update the memory variable so it won't trigger on internal navigation
    loadState.hasPlayed = true;
  };

  return (
    <div className="bg-white text-black min-h-screen font-mono">
      {/* If you refresh, 'loadState.hasPlayed' resets to false.
          If you click 'Back' from ProjectPage, 'loadState.hasPlayed' is already true.
      */}
      {loading && <Preloader onComplete={handleComplete} />}

      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
