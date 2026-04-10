"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Scissors, Palette, Sparkles, Leaf, Wind, Star } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks";

const services = [
  {
    icon: Scissors,
    title: "Strzyżenie damskie",
    description:
      "Precyzyjne cięcia dopasowane do kształtu twarzy, struktury włosów i Twojego stylu życia. Od klasyki po nowoczesne formy.",
    price: "od 120 zł",
    tag: "Bestseller",
  },
  {
    icon: Scissors,
    title: "Strzyżenie męskie",
    description:
      "Klasyczne i współczesne fryzury męskie. Fade, undercut, taper — każdy detal opracowany z dbałością o precyzję.",
    price: "od 70 zł",
    tag: null,
  },
  {
    icon: Palette,
    title: "Koloryzacja",
    description:
      "Pełna koloryzacja, odrosty, refleksy. Pracujemy na markowych produktach, które pielęgnują włosy podczas koloryzacji.",
    price: "od 180 zł",
    tag: null,
  },
  {
    icon: Sparkles,
    title: "Balayage & Ombre",
    description:
      "Naturalne przejścia barw ręcznie malowane przez naszych specjalistów. Efekt świeżości przez długie miesiące.",
    price: "od 280 zł",
    tag: "Polecamy",
  },
  {
    icon: Wind,
    title: "Keratynowe prostowanie",
    description:
      "Wygładzenie i regeneracja włosów metodą brazylijską. Efekt gładkości i blasku utrzymujący się do 6 miesięcy.",
    price: "od 350 zł",
    tag: null,
  },
  {
    icon: Leaf,
    title: "Zabiegi pielęgnacyjne",
    description:
      "Maseczki, olaplex, nawilżanie i regeneracja. Twoje włosy zasługują na profesjonalną kurację.",
    price: "od 80 zł",
    tag: null,
  },
];

function ServiceCard({
  service,
  index,
  parentVisible,
}: {
  service: (typeof services)[0];
  index: number;
  parentVisible: boolean;
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(12px)`,
      transition: "transform 0.1s ease",
    });
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    setTiltStyle({
      transform: "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setHovered(true)}
      className="relative bg-[#0A0A0A] border border-[#2A2420] p-8 cursor-default group will-change-transform"
      style={{
        ...tiltStyle,
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible
          ? (tiltStyle.transform as string) ?? "none"
          : "translateY(40px)",
        transition: parentVisible
          ? `opacity 0.7s ease ${index * 0.1}s, ${tiltStyle.transition ?? "transform 0.7s ease"} ${!tiltStyle.transform?.includes("perspective") ? `${index * 0.1}s` : "0s"}`
          : `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      {/* Gold hover border effect */}
      <div
        className="absolute inset-0 border border-[#C9A84C] pointer-events-none"
        style={{
          opacity: hovered ? 0.5 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Gold bottom line animation */}
      <div
        className="absolute bottom-0 left-0 h-[2px] gold-gradient"
        style={{
          width: hovered ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Tag */}
      {service.tag && (
        <div className="absolute top-5 right-5">
          <span className="text-[9px] tracking-[0.2em] uppercase text-black gold-gradient px-2 py-0.5">
            {service.tag}
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className="mb-6 inline-flex items-center justify-center w-12 h-12 border border-[#C9A84C]/20 relative"
        style={{
          borderColor: hovered ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.2)",
          transition: "border-color 0.3s ease",
        }}
      >
        <Icon
          className="w-5 h-5 text-[#C9A84C]"
          style={{
            transform: hovered ? "scale(1.2) rotate(-5deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-foreground mb-3">
        {service.title}
      </h3>
      <p className="text-[#9A8F7E] text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      <div className="flex items-center justify-between">
        <p className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium">
          {service.price}
        </p>
        <span
          className="text-[#C9A84C] text-xs tracking-widest"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="uslugi"
      className="section-padding bg-[#0A0A0A]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4">
            Co oferujemy
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-semibold text-foreground mb-6">
            Nasze usługi
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-px bg-[#C9A84C] opacity-40"
              style={{
                width: isVisible ? "48px" : "0px",
                transition: "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s",
              }}
            />
            <Star className="w-3 h-3 text-[#C9A84C]" />
            <div
              className="h-px bg-[#C9A84C] opacity-40"
              style={{
                width: isVisible ? "48px" : "0px",
                transition: "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s",
              }}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1A1410]">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              parentVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s",
          }}
        >
          <a
            href="#kontakt"
            className="group relative inline-flex items-center px-10 py-4 border border-[#C9A84C]/50 text-[#C9A84C] text-xs tracking-widest uppercase cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Umów się na wizytę
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
