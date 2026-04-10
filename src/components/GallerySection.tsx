"use client";

import { useState, useCallback } from "react";
import { X, ZoomIn } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    alt: "Stylizacja włosów — efekt końcowy",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
    alt: "Precyzyjne strzyżenie",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1629397685944-f5a4ae05e4fa?w=800&q=80",
    alt: "Koloryzacja włosów",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80",
    alt: "Praca fryzjera w salonie",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1620332372374-f108c53d2e03?w=800&q=80",
    alt: "Balayage — efekt",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1580618864182-5c9f5d5d9f7a?w=800&q=80",
    alt: "Wnętrze salonu",
    tall: true,
  },
];

function Lightbox({
  image,
  onClose,
}: {
  image: { src: string; alt: string };
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ animation: "fadeIn 0.3s ease both" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 border border-[#2A2420] flex items-center justify-center text-[#9A8F7E] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all duration-200 cursor-pointer"
        aria-label="Zamknij podgląd"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Image */}
      <div
        className="relative max-w-4xl max-h-[85vh] mx-6"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Gold frame */}
        <div className="absolute -inset-1 border border-[#C9A84C]/30 pointer-events-none" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src.replace("w=800", "w=1200")}
          alt={image.alt}
          className="max-w-full max-h-[85vh] object-contain"
        />
        <p className="absolute bottom-4 left-0 right-0 text-center text-[#9A8F7E] text-xs tracking-widest uppercase">
          {image.alt}
        </p>
      </div>
    </div>
  );
}

function GalleryImage({
  image,
  index,
  parentVisible,
  onClick,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  parentVisible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${image.tall ? "row-span-2" : ""}`}
      style={{
        opacity: parentVisible ? 1 : 0,
        clipPath: parentVisible ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)",
        transition: `opacity 0.6s ease ${index * 0.1}s, clip-path 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
        aspectRatio: image.tall ? undefined : "1 / 1",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Otwórz zdjęcie: ${image.alt}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        style={{
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background: hovered
            ? "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(10,10,10,0.75))"
            : "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.2))",
          transition: "background 0.4s ease",
        }}
      >
        {/* Icon */}
        <div
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1) translateY(0)" : "scale(0.8) translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="w-12 h-12 border border-[#C9A84C] flex items-center justify-center mb-2">
            <ZoomIn className="w-5 h-5 text-[#C9A84C]" />
          </div>
        </div>

        {/* Label */}
        <p
          className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase px-4 text-center"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
          }}
        >
          {image.alt}
        </p>
      </div>

      {/* Gold corner accent */}
      <div
        className="absolute top-0 left-0 w-8 h-px gold-gradient"
        style={{
          opacity: hovered ? 0.8 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        className="absolute top-0 left-0 w-px h-8 gold-gradient"
        style={{
          opacity: hovered ? 0.8 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-8 h-px gold-gradient"
        style={{
          opacity: hovered ? 0.8 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-px h-8 gold-gradient"
        style={{
          opacity: hovered ? 0.8 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}

export default function GallerySection() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [lightboxImage, setLightboxImage] = useState<(typeof galleryImages)[0] | null>(null);

  const openLightbox = useCallback((img: (typeof galleryImages)[0]) => {
    setLightboxImage(img);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section
      id="galeria"
      className="section-padding bg-[#080808]"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-4">
            Nasze prace
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-semibold text-foreground mb-4">
            Galeria
          </h2>
          <p className="text-[#9A8F7E] text-sm tracking-wide max-w-md mx-auto">
            Każde zdjęcie to historia — wyjątkowy efekt stworzony z pasją i precyzją.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5" style={{ gridAutoRows: "220px" }}>
          {galleryImages.map((img, i) => (
            <GalleryImage
              key={i}
              image={img}
              index={i}
              parentVisible={isVisible}
              onClick={() => openLightbox(img)}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <div
          className="text-center mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          <p className="text-[#9A8F7E] text-xs tracking-wide mb-3">
            Więcej inspiracji na naszym Instagramie
          </p>
          <a
            href="https://www.instagram.com/akademiafrycka/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-[#C9A84C] text-xs tracking-widest uppercase cursor-pointer"
          >
            <span className="relative">
              @akademiafrycka
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
            </span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={closeLightbox} />
      )}
    </section>
  );
}
