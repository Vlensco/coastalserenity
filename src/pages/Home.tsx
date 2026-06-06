/**
 * COASTAL SERENITY — Home Page
 * Design: Coastal Minimalism × Cinematic Luxury
 * Typography: Cormorant Garamond (display) + Jost (body)
 * Colors: Deep ocean indigo → warm amber sunset → soft ivory
 * Layout: Full-bleed GSAP snap-scroll, 5 cinematic sections
 * Animation: Slow breath-like GSAP entrance per section
 */

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

// ── Asset URLs ──────────────────────────────────────────
const ASSETS = {
  heroSunset:    "/beach_assets/hero_sunset.jpg",
  oceanWaves:    "/beach_assets/ocean_waves.jpg",
  natureChill:   "/beach_assets/nature_chill.jpg",
  oceanHorizon:  "/beach_assets/ocean_horizon.jpg",
  beachPalms:    "/beach_assets/beach_palms.jpg",
  ambientAudio:  "/grand_escape.mp3",
};

// ── Section data ────────────────────────────────────────
const SECTIONS = [
  {
    id: "hero",
    bg: ASSETS.heroSunset,
    overlay: "overlay-dark",
    label: "01 — Arrival",
    title: "Where the\nSea Breathes",
    subtitle: "Let the rhythm of the waves carry you into stillness.",
    align: "center",
    textPos: "bottom-center",
  },
  {
    id: "waves",
    bg: ASSETS.oceanWaves,
    overlay: "overlay-left",
    label: "02 — The Shore",
    title: "Every Wave\nTells a Story",
    subtitle: "Crystal waters, warm sand, the endless conversation between land and sea.",
    align: "left",
    textPos: "left",
  },
  {
    id: "nature",
    bg: ASSETS.natureChill,
    overlay: "overlay-right",
    label: "03 — The Cove",
    title: "Hidden in\nNature's Embrace",
    subtitle: "Where jungle meets lagoon in a timeless, golden hour reverie.",
    align: "right",
    textPos: "right",
  },
  {
    id: "horizon",
    bg: ASSETS.oceanHorizon,
    overlay: "overlay-dark",
    label: "04 — Twilight",
    title: "The Moon\nKnows Your Name",
    subtitle: "In the quiet between day and night, the ocean holds its breath.",
    align: "center",
    textPos: "center",
  },
  {
    id: "palms",
    bg: ASSETS.beachPalms,
    overlay: "overlay-dark",
    label: "05 — Surrender",
    title: "Let Go.\nBe Here.",
    subtitle: "A hammock, a horizon, and all the time in the world.",
    align: "center",
    textPos: "bottom-center",
  },
];

// ── Navigation Dots Items (including footer) ─────────────
const NAV_ITEMS = [
  ...SECTIONS,
  {
    id: "footer",
    label: "06 — Stillness",
  }
];

// ── Wave SVG Component ──────────────────────────────────
function WaveDecoration() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 3 }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full wave-svg"
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
          fill="oklch(0.08 0.02 240 / 60%)"
        />
      </svg>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full wave-svg-2"
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="oklch(0.08 0.02 240 / 35%)"
        />
      </svg>
    </div>
  );
}

// ── Floating Particles ──────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {particles.map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            borderRadius: "50%",
            background: `oklch(0.88 0.06 75 / ${0.2 + (i % 5) * 0.1})`,
            left: `${5 + (i * 8.3) % 90}%`,
            bottom: `${10 + (i * 7.1) % 30}%`,
            animation: `float-particle ${6 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Section Content ─────────────────────────────────────
function SectionContent({
  section,
  isActive,
  sectionRef,
}: {
  section: typeof SECTIONS[0];
  isActive: boolean;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isActive) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(ruleRef.current,   { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.7, delay: 0.1 })
      .fromTo(labelRef.current,  { opacity: 0, y: 12 },     { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(titleRef.current,  { opacity: 0, y: 30 },     { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 },   { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");
    return () => { tl.kill(); };
  }, [isActive]);

  const isLeft   = section.textPos === "left";
  const isRight  = section.textPos === "right";
  const isCenter = section.textPos === "center";
  const isBottomCenter = section.textPos === "bottom-center";

  const posClass = isLeft
    ? "left-6 md:left-20 bottom-20 md:bottom-24 w-[90vw] max-w-[calc(100vw-3rem)] md:max-w-lg"
    : isRight
    ? "right-6 md:right-20 bottom-20 md:bottom-24 w-[90vw] max-w-[calc(100vw-3rem)] md:max-w-lg text-right"
    : isCenter
    ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90vw] md:max-w-2xl"
    : "left-1/2 -translate-x-1/2 bottom-16 md:bottom-20 text-center w-[90vw] md:max-w-2xl";

  const ruleClass = isRight
    ? "ml-auto"
    : isCenter || isBottomCenter
    ? "mx-auto"
    : "";

  return (
    <div
      ref={contentRef}
      className={`absolute z-10 px-4 ${posClass}`}
      style={{ pointerEvents: "none" }}
    >
      <span
        ref={ruleRef}
        className={`thin-rule mb-4 block origin-left ${ruleClass}`}
        style={{ transformOrigin: isRight ? "right" : isCenter || isBottomCenter ? "center" : "left" }}
      />
      <span
        ref={labelRef}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "oklch(0.78 0.14 55)",
          display: "block",
          marginBottom: "0.75rem",
          opacity: 0,
        }}
      >
        {section.label}
      </span>
      <h2
        ref={titleRef}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(2rem, 5vw, 5.5rem)",
          lineHeight: 1.1,
          color: "oklch(0.96 0.01 60)",
          whiteSpace: "pre-line",
          marginBottom: "1.25rem",
          opacity: 0,
          textShadow: "0 2px 30px oklch(0 0 0 / 40%)",
        }}
      >
        {section.title}
      </h2>
      <p
        ref={subtitleRef}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
          lineHeight: 1.7,
          color: "oklch(0.85 0.02 60 / 85%)",
          maxWidth: "38ch",
          margin: isRight ? "0 0 0 auto" : isCenter || isBottomCenter ? "0 auto" : "0",
          opacity: 0,
        }}
      >
        {section.subtitle}
      </p>
    </div>
  );
}

// ── Coastal Serenity Custom SVG Logo ─────────────────────
function CoastalSerenityLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 2px 8px oklch(0.78 0.14 55 / 30%))" }}>
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.78 0.14 55)" />
            <stop offset="100%" stopColor="oklch(0.45 0.12 210)" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="50" cy="48" r="32" stroke="url(#logoGradient)" strokeWidth="1" opacity="0.25" strokeDasharray="3 3" />
        <circle cx="50" cy="48" r="26" fill="url(#logoGradient)" opacity="0.08" filter="url(#logoGlow)" />
        <circle cx="50" cy="48" r="20" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.4" />
        <path d="M25,58 C38,43 45,73 58,58 C71,43 78,53 85,48" stroke="url(#logoGradient)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M18,66 C30,51 38,81 50,66 C62,51 68,61 75,56" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <circle cx="50" cy="30" r="4" fill="oklch(0.78 0.14 55)" />
      </svg>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "1.4rem",
          color: "oklch(0.96 0.01 60)",
          letterSpacing: "0.05em",
          background: "linear-gradient(to right, oklch(0.96 0.01 60), oklch(0.78 0.14 55))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Coastal Serenity
      </span>
    </div>
  );
}

// ── Main Home Component ─────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const isScrollingRef = useRef(false);
  const [showContact, setShowContact] = useState(false);
  const contactCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showContact && contactCardRef.current) {
      gsap.fromTo(contactCardRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [showContact]);

  // ── Parallax on each section bg ──────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, i) => {
        if (!section) return;
        const bg = section.querySelector(".section-bg") as HTMLElement;
        if (!bg) return;
        ScrollTrigger.create({
          trigger: section,
          scroller: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            gsap.set(bg, {
              y: self.progress * 60 - 30,
              scale: 1.08,
            });
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Scroll to section ─────────────────────────────────
  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container || isScrollingRef.current) return;
    isScrollingRef.current = true;
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
    }
    setTimeout(() => { isScrollingRef.current = false; }, 900);
  }, []);

  // ── Track active section via IntersectionObserver ─────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setCurrentSection(idx);
          }
        });
      },
      { root: container, threshold: 0.55 }
    );
    sectionRefs.current.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── Keyboard navigation ───────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        scrollToSection(Math.min(currentSection + 1, NAV_ITEMS.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        scrollToSection(Math.max(currentSection - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSection, scrollToSection]);

  // ── Audio setup ───────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0;
    const onCanPlay = () => setAudioReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);
    return () => audio.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!soundOn) {
      audio.play().catch(() => {});
      gsap.to(audio, { volume: 0.55, duration: 2, ease: "power2.out" });
      setSoundOn(true);
    } else {
      gsap.to(audio, {
        volume: 0,
        duration: 1.5,
        ease: "power2.in",
        onComplete: () => audio.pause(),
      });
      setSoundOn(false);
    }
  }, [soundOn]);

  // ── Hero entrance animation ───────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo(
      ".hero-brand",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    ).fromTo(
      ".hero-main-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
      "-=0.6"
    ).fromTo(
      ".hero-tagline",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    ).fromTo(
      ".hero-scroll-hint",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.3"
    );
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", background: "oklch(0.08 0.02 240)" }}>
      {/* ── Audio ─────────────────────────────────────── */}
      <audio ref={audioRef} src={ASSETS.ambientAudio} preload="auto" />

      {/* ── Top Brand Bar ─────────────────────────────── */}
      <header className="hero-brand">
        <div style={{ pointerEvents: "auto" }}>
          <CoastalSerenityLogo />
        </div>
        <nav
          style={{
            display: "flex",
            gap: "2rem",
            pointerEvents: "auto",
            alignItems: "center",
          }}
        >
          {["Shore", "Cove", "Twilight", "Surrender"].map((label, i) => (
            <button
              key={label}
              onClick={() => scrollToSection(i + 1)}
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: currentSection === i + 1
                  ? "oklch(0.78 0.14 55)"
                  : "oklch(0.85 0.01 60 / 70%)",
                background: "none",
                border: "none",
                padding: "0.25rem 0",
                transition: "color 0.3s ease",
                display: "none",
              }}
              className="md:block"
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── Sound Toggle ──────────────────────────────── */}
      <button
        onClick={toggleSound}
        className={`sound-toggle-btn ${soundOn ? "sound-active" : ""}`}
        aria-label={soundOn ? "Mute ocean sounds" : "Play ocean sounds"}
        title={soundOn ? "Mute ocean sounds" : "Play ocean sounds"}
      >
        {soundOn ? (
          <SoundOnIcon />
        ) : (
          <SoundOffIcon />
        )}
      </button>

      {/* ── Side Nav Dots ─────────────────────────────── */}
      <nav className="side-nav-dots">
        {NAV_ITEMS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(i)}
            className={`nav-dot ${currentSection === i ? "active" : ""}`}
            title={s.label}
            style={{ border: "none", padding: 0 }}
          />
        ))}
      </nav>

      {/* ── Snap Scroll Container ─────────────────────── */}
      <div ref={containerRef} className="snap-container">
        {SECTIONS.map((section, i) => {
          const sRef = (el: HTMLDivElement | null) => {
            sectionRefs.current[i] = el;
          };
          return (
            <section
              key={section.id}
              ref={sRef}
              className="snap-section"
              id={section.id}
            >
              {/* Background image with parallax */}
              <div
                className="section-bg"
                style={{
                  backgroundImage: `url(${section.bg})`,
                  transform: "scale(1.08)",
                }}
              />

              {/* Overlay */}
              <div className={section.overlay} />

              {/* Particles */}
              <Particles />

              {/* Wave decoration on bottom */}
              <WaveDecoration />

              {/* Section content — hidden on hero (i===0) */}
              {i !== 0 && (
                <SectionContent
                  section={section}
                  isActive={currentSection === i}
                  sectionRef={{ current: sectionRefs.current[i] }}
                />
              )}

              {/* Hero-specific extras */}
              {i === 0 && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      zIndex: 10,
                      pointerEvents: "none",
                    }}
                  >
                    <p
                      className="shimmer-text hero-main-title"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "clamp(2.5rem, 8vw, 8.5rem)",
                        lineHeight: 1,
                        marginBottom: "1rem",
                        opacity: 0,
                      }}
                    >
                      Coastal
                      <br />
                      Serenity
                    </p>
                    <p
                      className="hero-tagline"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 200,
                        fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "oklch(0.88 0.06 75 / 80%)",
                        opacity: 0,
                      }}
                    >
                      A Journey Through Light &amp; Water
                    </p>
                  </div>

                  {/* Scroll hint */}
                  <div
                    className="hero-scroll-hint scroll-indicator"
                    style={{
                      position: "absolute",
                      bottom: "3.5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "pointer",
                      pointerEvents: "auto",
                    }}
                    onClick={() => scrollToSection(1)}
                  >
                    <span
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 300,
                        fontSize: "0.65rem",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "oklch(0.88 0.06 75 / 70%)",
                      }}
                    >
                      Scroll
                    </span>
                    <ChevronDownIcon />
                  </div>
                </>
              )}

              {/* Section number */}
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "2rem",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "5rem",
                  color: "oklch(1 0 0 / 6%)",
                  lineHeight: 1,
                  zIndex: 2,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </section>
          );
        })}

        {/* ── Footer Section ──────────────────────────── */}
        <footer
          ref={(el) => { sectionRefs.current[5] = el; }}
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "oklch(0.06 0.03 230)",
            position: "relative",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          {/* Subtle wave top */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "80px", display: "block" }}>
              <path
                d="M0,40 C180,0 360,80 540,40 C720,0 900,80 1080,40 C1260,0 1380,60 1440,40 L1440,0 L0,0 Z"
                fill="oklch(0.08 0.02 240)"
              />
            </svg>
          </div>

          <div style={{ textAlign: "center", zIndex: 1, minHeight: "350px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "oklch(0.96 0.01 60)",
                marginBottom: "1rem",
              }}
            >
              Capture your stillness.
            </p>
            <span className="thin-rule" style={{ margin: "0 auto 1.5rem", display: "block" }} />
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 200,
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "oklch(0.65 0.02 60)",
                marginBottom: "3.5rem",
                maxWidth: "60ch",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: "1.6",
              }}
            >
              Your journey, preserved in light &amp; motion.
              <br />
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "oklch(0.78 0.14 55 / 80%)", display: "inline-block", marginTop: "0.5rem" }}>
                Flickstudio is ready to tell your story.
              </span>
            </p>

            {!showContact ? (
              <button
                onClick={() => setShowContact(true)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "oklch(0.78 0.14 55)",
                  background: "none",
                  border: "1px solid oklch(0.78 0.14 55 / 40%)",
                  padding: "0.75rem 2.5rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = "oklch(0.78 0.14 55 / 10%)";
                  (e.target as HTMLButtonElement).style.borderColor = "oklch(0.78 0.14 55 / 80%)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = "none";
                  (e.target as HTMLButtonElement).style.borderColor = "oklch(0.78 0.14 55 / 40%)";
                }}
              >
                Connect with Flickstudio
              </button>
            ) : (
              <div
                ref={contactCardRef}
                style={{
                  background: "oklch(0.12 0.02 240 / 40%)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  backdropFilter: "blur(16px)",
                  padding: "2rem",
                  borderRadius: "8px",
                  maxWidth: "400px",
                  margin: "0 auto",
                  boxShadow: "0 20px 40px oklch(0 0 0 / 30%)",
                }}
              >
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  color: "oklch(0.96 0.01 60)",
                  marginBottom: "1.5rem"
                }}>
                  Let's capture your journey.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                  <a
                    href="mailto:its.flickstudio@gmail.com"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.9rem",
                      color: "oklch(0.85 0.02 60)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "oklch(0.78 0.14 55)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "oklch(0.85 0.02 60)"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    its.flickstudio@gmail.com
                  </a>
                  <a
                    href="tel:0895364777800"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.9rem",
                      color: "oklch(0.85 0.02 60)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "oklch(0.78 0.14 55)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "oklch(0.85 0.02 60)"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    0895364777800
                  </a>
                </div>
                <button
                  onClick={() => setShowContact(false)}
                  style={{
                    marginTop: "1.5rem",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "oklch(0.65 0.02 60 / 60%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "oklch(0.65 0.02 60)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "oklch(0.65 0.02 60 / 60%)"}
                >
                  Close Contact Details
                </button>
              </div>
            )}
          </div>

          <p
            style={{
              position: "absolute",
              bottom: "2rem",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "oklch(0.45 0.01 60)",
            }}
          >
            © 2026 Coastal Serenity — All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
}

// ── Icons ───────────────────────────────────────────────
function SoundOnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="oklch(0.78 0.14 55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="oklch(0.65 0.02 60)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.88 0.06 75 / 70%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
