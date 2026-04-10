"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollY } from "@/lib/hooks";

// Particle data — generated once
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 4}px`,
  duration: `${8 + Math.random() * 16}s`,
  delay: `${Math.random() * 10}s`,
  drift: `${(Math.random() - 0.5) * 80}px`,
}));

const LINES = [
  "Akademia",
  "Frycka",
];

export default function HeroSection() {
  const scrollY = useScrollY();
  const [mounted, setMounted] = useState(false);
  const [lineVisible, setLineVisible] = useState<boolean[]>([false, false]);

  useEffect(() => {
    setMounted(true);
    // Stagger the two headline lines
    const timers = LINES.map((_, i) =>
      setTimeout(() => setLineVisible((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      }), 300 + i * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const parallaxY = scrollY * 0.35;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ── Background Image with Parallax ─────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80')",
          transform: `translateY(${parallaxY}px) scale(1.1)`,
        }}
        role="img"
        aria-label="Wnętrze salonu fryzjerskiego Akademia Frycka"
      />

      {/* ── Gradient Overlay ───────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />

      {/* ── Animated Orbs ──────────────────────────────────────── */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-orb"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "0s",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none animate-orb"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "3s",
        }}
      />

      {/* ── Floating Particles ─────────────────────────────────── */}
      {mounted && PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: 0,
            width: p.size,
            height: p.size,
            "--duration": p.duration,
            "--delay": p.delay,
            "--drift": p.drift,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Top Gold Line ──────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] gold-gradient"
        style={{
          opacity: 0.5,
          transformOrigin: "left",
          animation: "drawLine 1.2s cubic-bezier(0.22,1,0.36,1) 0.2s both",
        }}
      />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Overline */}
        <p
          className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-8"
          style={{
            opacity: 0,
            animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s forwards",
          }}
        >
          Salon Fryzjerski · Poznań
        </p>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-cormorant)] leading-none tracking-tight mb-8 select-none">
          <span
            className="block text-5xl md:text-8xl lg:text-[9rem] font-semibold text-foreground"
            style={{
              opacity: lineVisible[0] ? 1 : 0,
              transform: lineVisible[0] ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            Akademia
          </span>
          <span
            className="block text-5xl md:text-8xl lg:text-[9rem] font-semibold italic animate-shimmer-text"
            style={{
              opacity: lineVisible[1] ? 1 : 0,
              transform: lineVisible[1] ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            Frycka
          </span>
        </h1>

        {/* Divider */}
        <div
          className="flex items-center justify-center gap-4 mb-8"
          style={{
            opacity: 0,
            animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.9s forwards",
          }}
        >
          <div className="h-px w-20 bg-[#C9A84C] opacity-50" />
          <div className="w-1 h-1 bg-[#C9A84C] rotate-45" />
          <p className="text-[#9A8F7E] text-xs tracking-[0.3em] uppercase">
            Sztuka pięknych włosów
          </p>
          <div className="w-1 h-1 bg-[#C9A84C] rotate-45" />
          <div className="h-px w-20 bg-[#C9A84C] opacity-50" />
        </div>

        {/* Body */}
        <p
          className="text-[#9A8F7E] text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-12"
          style={{
            opacity: 0,
            animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 1.1s forwards",
          }}
        >
          Oddajemy się pasji do fryzjerstwa od lat. Każda wizyta to wyjątkowe
          doświadczenie — indywidualne podejście, premium produkty i efekty,
          które mówią same za siebie.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity: 0,
            animation: "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 1.3s forwards",
          }}
        >
          <a
            href="#kontakt"
            className="group relative inline-flex items-center px-10 py-4 text-black text-xs tracking-widest uppercase font-semibold cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 gold-gradient" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{ background: "radial-gradient(circle at center, white 0%, transparent 70%)" }} />
            <span className="relative z-10">Umów wizytę</span>
          </a>
          <a
            href="#uslugi"
            className="group inline-flex items-center px-10 py-4 border border-[#C9A84C]/50 text-[#C9A84C] text-xs tracking-widest uppercase hover:border-[#C9A84C] transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-[#C9A84C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out opacity-10" />
            <span className="relative z-10">Nasze usługi</span>
          </a>
        </div>
      </div>

      {/* ── Scroll Indicator ───────────────────────────────────── */}
      <a
        href="#uslugi"
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-[#9A8F7E] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer group animate-scroll-pulse"
        aria-label="Przewiń w dół"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Odkryj</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C] to-transparent group-hover:h-12 transition-all duration-300" />
      </a>

      {/* ── Decorative corner lines ────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] gold-gradient opacity-20" />
    </section>
  );
}
