"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useScrollY } from "@/lib/hooks";

const navLinks = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Galeria", href: "#galeria" },
  { label: "O nas", href: "#o-nas" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 40;

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, padding 0.4s ease, border-color 0.4s ease",
        background: scrolled ? "rgba(10,10,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(42,36,32,0.8)" : "1px solid transparent",
        paddingTop: scrolled ? "0.75rem" : "1.5rem",
        paddingBottom: scrolled ? "0.75rem" : "1.5rem",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-widest uppercase cursor-pointer select-none"
        >
          <span className="gold-text">Akademia</span>
          <span className="text-foreground ml-2">Frycka</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-xs tracking-widest uppercase text-[#9A8F7E] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A84C] group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#kontakt"
          className="hidden md:inline-flex items-center px-6 py-2.5 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 cursor-pointer relative overflow-hidden group"
        >
          <span className="relative z-10">Umów wizytę</span>
          <span className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-0 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ mixBlendMode: "multiply" }} />
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground cursor-pointer p-1 hover:text-[#C9A84C] transition-colors duration-200"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
        >
          <span
            style={{
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}
            className="block"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </span>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
          background: "rgba(8,8,8,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(42,36,32,0.8)" : "1px solid transparent",
        }}
      >
        <ul className="flex flex-col gap-0 px-6 py-6">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3.5 text-sm tracking-widest uppercase text-[#9A8F7E] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer border-b border-[#1A1A1A]"
                style={{
                  transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-12px)",
                  transition: "color 0.2s ease, opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                {link.label}
                <span className="text-[#C9A84C] opacity-40">→</span>
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#kontakt"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center px-6 py-2.5 gold-gradient text-black text-xs tracking-widest uppercase font-semibold cursor-pointer"
            >
              Umów wizytę
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
