"use client";

import { Share2, Globe, Phone, Mail } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks";

const footerLinks = [
  {
    title: "Usługi",
    links: [
      { label: "Strzyżenie damskie", href: "#uslugi" },
      { label: "Strzyżenie męskie", href: "#uslugi" },
      { label: "Koloryzacja", href: "#uslugi" },
      { label: "Balayage & Ombre", href: "#uslugi" },
      { label: "Zabiegi pielęgnacyjne", href: "#uslugi" },
    ],
  },
  {
    title: "Salon",
    links: [
      { label: "O nas", href: "#o-nas" },
      { label: "Galeria", href: "#galeria" },
      { label: "Rezerwacja", href: "#kontakt" },
      { label: "Cennik", href: "#uslugi" },
    ],
  },
];

const socials = [
  { Icon: Share2, href: "https://www.instagram.com/akademiafrycka/", label: "Instagram" },
  { Icon: Globe, href: "https://www.facebook.com/Frycki/", label: "Facebook" },
  { Icon: Phone, href: "tel:+48515175405", label: "Telefon" },
  { Icon: Mail, href: "mailto:kontakt@akademiafrycka.pl", label: "Email" },
];

// Marquee text items
const marqueeItems = [
  "Strzyżenie",
  "·",
  "Koloryzacja",
  "·",
  "Balayage",
  "·",
  "Keratyna",
  "·",
  "Pielęgnacja",
  "·",
  "Akademia Frycka",
  "·",
];

export default function Footer() {
  const { ref, isVisible } = useScrollReveal(0.05);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#050505] border-t border-[#1A1410] relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Marquee band */}
      <div
        className="border-b border-[#1A1410] py-4 overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #0A0A0A, #0F0D0A, #0A0A0A)",
        }}
      >
        <div
          className="flex gap-8 whitespace-nowrap animate-marquee"
          aria-hidden="true"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`text-xs tracking-[0.3em] uppercase ${
                item === "·" ? "text-[#C9A84C]" : "text-[#3A3530]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-widest uppercase mb-4">
              <span className="animate-shimmer-text">Akademia</span>
              <span className="text-foreground ml-2">Frycka</span>
            </div>
            <p className="text-[#9A8F7E] text-sm leading-relaxed max-w-xs mb-3">
              Ekskluzywny salon fryzjerski na Górnej Wildzie w Poznaniu.
            </p>
            <p className="text-[#9A8F7E] text-sm leading-relaxed max-w-xs mb-6">
              Tworzymy fryzury, które mówią o Tobie więcej niż tysiąc słów.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-[#2A2420] flex items-center justify-center text-[#9A8F7E] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                  <span className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col, ci) => (
            <div
              key={col.title}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s ease ${0.1 + ci * 0.1}s, transform 0.7s ease ${0.1 + ci * 0.1}s`,
              }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-5">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative text-[#9A8F7E] text-sm hover:text-foreground transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span
                        className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs"
                      >
                        —
                      </span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="relative h-px mb-6">
          <div className="absolute inset-0 bg-[#2A2420]" />
          <div
            className="absolute left-0 top-0 h-full gold-gradient"
            style={{
              width: isVisible ? "100%" : "0%",
              transition: "width 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s",
              opacity: 0.3,
            }}
          />
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <p className="text-[#3A3530] text-xs tracking-wide">
            © {currentYear} Akademia Frycka. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-[#3A3530] text-xs">
            Wierzbięcice 18, Górna Wilda, Poznań
          </p>
        </div>
      </div>

      {/* Bottom gold line */}
      <div
        className="h-[2px] gold-gradient"
        style={{ opacity: 0.15 }}
      />
    </footer>
  );
}
