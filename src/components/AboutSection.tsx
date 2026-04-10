"use client";

import { useRef, useEffect, useState } from "react";
import { Award, Clock, Heart, Users } from "lucide-react";
import { useScrollReveal, useCountUp, useScrollY } from "@/lib/hooks";

const stats = [
  { icon: Clock, value: 10, suffix: "+", label: "Lat doświadczenia" },
  { icon: Users, value: 2000, suffix: "+", label: "Zadowolonych klientów" },
  { icon: Award, value: 15, suffix: "+", label: "Nagród branżowych" },
  { icon: Heart, value: 100, suffix: "%", label: "Zaangażowania" },
];

function StatItem({
  stat,
  trigger,
  delay,
}: {
  stat: (typeof stats)[0];
  trigger: boolean;
  delay: number;
}) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 1600, trigger);

  return (
    <div
      className="flex items-start gap-3"
      style={{
        opacity: trigger ? 1 : 0,
        transform: trigger ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      <div className="mt-0.5">
        <Icon className="w-4 h-4 text-[#C9A84C]" />
      </div>
      <div>
        <p className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-foreground leading-none">
          {count}
          {stat.suffix}
        </p>
        <p className="text-[#9A8F7E] text-xs tracking-wide mt-0.5">{stat.label}</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
  const imgRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollY();

  // Subtle image parallax
  const [imgOffset, setImgOffset] = useState(0);
  useEffect(() => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    setImgOffset((center - viewportCenter) * 0.06);
  }, [scrollY]);

  return (
    <section
      id="o-nas"
      className="section-padding bg-[#0A0A0A] relative overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Image column ─────────────────────────────────────── */}
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div ref={imgRef} className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
                alt="Fryzjer podczas pracy w Akademia Frycka"
                className="w-full aspect-[4/5] object-cover will-change-transform"
                style={{ transform: `translateY(${imgOffset}px)` }}
              />
              {/* Gold shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 1s ease 0.3s",
                }}
              />
            </div>

            {/* Decorative corner frames */}
            <div className="absolute top-3 left-3 w-10 h-10 border-t border-l border-[#C9A84C]/40 pointer-events-none"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.5s",
              }}
            />
            <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-[#C9A84C]/40 pointer-events-none"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.6s",
              }}
            />
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b border-l border-[#C9A84C]/40 pointer-events-none"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.7s",
              }}
            />
            <div className="absolute bottom-3 right-3 w-10 h-10 border-b border-r border-[#C9A84C]/40 pointer-events-none"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease 0.8s",
              }}
            />

            {/* Stats card floating */}
            <div
              className="absolute -bottom-5 -left-5 bg-[#111111] border border-[#2A2420] p-5 hidden md:block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s",
              }}
            >
              <p className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold animate-shimmer-text">
                10+
              </p>
              <p className="text-[#9A8F7E] text-xs tracking-widest uppercase mt-1">
                Lat pasji
              </p>
            </div>
          </div>

          {/* ── Content column ───────────────────────────────────── */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}
          >
            <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4">
              Nasza historia
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Fryzjerstwo to{" "}
              <span className="italic animate-shimmer-text">nasza pasja</span>
            </h2>

            {/* Animated gold line */}
            <div
              className="h-px gold-gradient mb-8 origin-left"
              style={{
                width: isVisible ? "64px" : "0px",
                transition: "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s",
                opacity: 0.6,
              }}
            />

            <p className="text-[#9A8F7E] text-sm leading-relaxed mb-5">
              Akademia Frycka to miejsce na Górnej Wildzie w Poznaniu, gdzie fryzjerstwo spotyka się ze sztuką.
              Tworzymy fryzury, które nie tylko podkreślają urodę,
              ale stają się częścią tożsamości każdego klienta.
            </p>
            <p className="text-[#9A8F7E] text-sm leading-relaxed mb-10">
              Nasz zespół tworzą pasjonaci z wieloletnim doświadczeniem, stale
              rozwijający swoje umiejętności na prestiżowych szkoleniach w kraju
              i za granicą. Pracujemy wyłącznie na produktach najwyższej jakości,
              bo Twoje włosy zasługują na to, co najlepsze.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.map((stat, i) => (
                <StatItem
                  key={i}
                  stat={stat}
                  trigger={isVisible}
                  delay={0.3 + i * 0.1}
                />
              ))}
            </div>

            <a
              href="#kontakt"
              className="group relative inline-flex items-center gap-3 px-10 py-4 text-black text-xs tracking-widest uppercase font-semibold cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 gold-gradient" />
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 30% 50%, white, transparent)" }}
              />
              <span className="relative z-10">Poznaj nas bliżej</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
