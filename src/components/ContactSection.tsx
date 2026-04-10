"use client";

import { useState, useCallback } from "react";
import { Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "515 175 405",
    href: "tel:+48515175405",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Wierzbięcice 18, Górna Wilda\nPoznań",
    href: "https://maps.google.com/maps?q=Wierzbięcice+18,+Poznań",
  },
  {
    icon: Clock,
    label: "Godziny otwarcia",
    value: "Pn–Pt: 9:00–20:00\nSob: 9:00–17:00",
    href: null,
  },
];

type FormState = {
  name: string;
  phone: string;
  service: string;
  message: string;
};

function FloatingField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none text-xs uppercase tracking-widest"
        style={{
          top: active ? "8px" : "50%",
          transform: active ? "translateY(0) scale(0.85)" : "translateY(-50%) scale(1)",
          transformOrigin: "left",
          color: focused ? "#C9A84C" : "#9A8F7E",
          transition: "top 0.25s ease, transform 0.25s ease, color 0.25s ease",
          fontSize: active ? "9px" : "11px",
        }}
      >
        {label}
        {required && <span className="text-[#C9A84C] ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        className="w-full bg-[#0F0F0F] text-foreground text-sm px-4 pt-7 pb-2.5 border-0 border-b-2 outline-none transition-colors duration-200 placeholder:text-[#3A3A3A]"
        style={{
          borderColor: focused ? "#C9A84C" : "#2A2420",
          borderBottomWidth: "2px",
          borderStyle: "solid",
          background: focused ? "#121212" : "#0F0F0F",
          transition: "border-color 0.25s ease, background 0.25s ease",
        }}
      />
      {/* Animated underline glow */}
      <div
        className="absolute bottom-0 left-0 h-[2px] gold-gradient"
        style={{
          width: focused ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

function FloatingSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none uppercase tracking-widest"
        style={{
          top: active ? "8px" : "50%",
          transform: active ? "translateY(0) scale(0.85)" : "translateY(-50%) scale(1)",
          transformOrigin: "left",
          color: focused ? "#C9A84C" : "#9A8F7E",
          transition: "top 0.25s ease, transform 0.25s ease, color 0.25s ease",
          fontSize: active ? "9px" : "11px",
        }}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-[#0F0F0F] text-foreground text-sm px-4 pt-7 pb-2.5 outline-none appearance-none cursor-pointer border-0 border-b-2"
        style={{
          borderColor: focused ? "#C9A84C" : "#2A2420",
          background: focused ? "#121212" : "#0F0F0F",
          transition: "border-color 0.25s ease, background 0.25s ease",
        }}
      >
        <option value="" disabled hidden />
        <option value="stryzenie-damskie">Strzyżenie damskie</option>
        <option value="stryzenie-meskie">Strzyżenie męskie</option>
        <option value="koloryzacja">Koloryzacja</option>
        <option value="balayage">Balayage &amp; Ombre</option>
        <option value="keratyna">Keratynowe prostowanie</option>
        <option value="pielegnacja">Zabiegi pielęgnacyjne</option>
      </select>
      <div
        className="absolute bottom-0 left-0 h-[2px] gold-gradient"
        style={{
          width: focused ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="absolute left-4 pointer-events-none uppercase tracking-widest"
        style={{
          top: active ? "8px" : "20px",
          transform: active ? "scale(0.85)" : "scale(1)",
          transformOrigin: "left",
          color: focused ? "#C9A84C" : "#9A8F7E",
          transition: "top 0.25s ease, transform 0.25s ease, color 0.25s ease",
          fontSize: active ? "9px" : "11px",
        }}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        className="w-full bg-[#0F0F0F] text-foreground text-sm px-4 pt-7 pb-3 outline-none resize-none border-0 border-b-2 placeholder:text-[#3A3A3A]"
        style={{
          borderColor: focused ? "#C9A84C" : "#2A2420",
          background: focused ? "#121212" : "#0F0F0F",
          transition: "border-color 0.25s ease, background 0.25s ease",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-[2px] gold-gradient"
        style={{
          width: focused ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal(0.05);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 1200);
    },
    []
  );

  const set = (field: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  return (
    <section
      id="kontakt"
      className="section-padding bg-[#060606] relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">

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
            Zarezerwuj termin
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-semibold text-foreground mb-4">
            Skontaktuj się
          </h2>
          <p className="text-[#9A8F7E] text-sm tracking-wide max-w-md mx-auto">
            Zarezerwuj wizytę telefonicznie lub przez formularz. Odpiszemy w ciągu 24 godzin.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: Info + Map ─────────────────────────────────── */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            <div className="space-y-8 mb-12">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-5 group"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                      transition: `opacity 0.7s ease ${0.2 + i * 0.1}s, transform 0.7s ease ${0.2 + i * 0.1}s`,
                    }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-[#C9A84C]/20 flex-shrink-0 group-hover:border-[#C9A84C]/60 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-foreground text-sm hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground text-sm whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map */}
            <div
              className="relative overflow-hidden border border-[#2A2420] aspect-video group cursor-pointer"
              onClick={() => window.open("https://maps.google.com", "_blank")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Lokalizacja salonu Akademia Frycka"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div
                  className="w-10 h-10 border border-[#C9A84C]/50 flex items-center justify-center"
                  style={{ animation: "pulseGold 2.5s ease-in-out infinite" }}
                >
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <p className="text-foreground text-xs tracking-wide text-center px-4">
                  Wierzbięcice 18, Górna Wilda, Poznań
                </p>
                <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase mt-1">
                  Otwórz w Mapach →
                </p>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/30 transition-colors duration-300 pointer-events-none" />
            </div>
          </div>

          {/* ── Right: Form ──────────────────────────────────────── */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
            }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full text-center py-16"
                style={{ animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                <div className="relative mb-6">
                  <CheckCircle className="w-16 h-16 text-[#C9A84C]" />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ animation: "pulseGold 2s ease-in-out infinite" }}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-foreground mb-3">
                  Dziękujemy!
                </h3>
                <p className="text-[#9A8F7E] text-sm leading-relaxed max-w-xs">
                  Twoja wiadomość dotarła do nas. Skontaktujemy się w ciągu 24 godzin.
                </p>
                <div className="mt-8 h-px w-12 gold-gradient opacity-40" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-1">
                <FloatingField
                  id="name"
                  label="Imię i nazwisko"
                  value={form.name}
                  onChange={set("name")}
                  required
                  placeholder="Anna Kowalska"
                />
                <FloatingField
                  id="phone"
                  label="Telefon"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  required
                  placeholder="+48 123 456 789"
                />
                <FloatingSelect
                  id="service"
                  label="Usługa"
                  value={form.service}
                  onChange={set("service")}
                />
                <FloatingTextarea
                  id="message"
                  label="Wiadomość"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Preferowany termin lub dodatkowe informacje..."
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full relative flex items-center justify-center gap-2.5 text-black text-xs tracking-widest uppercase font-semibold py-4 cursor-pointer overflow-hidden disabled:opacity-70"
                  >
                    <span className="absolute inset-0 gold-gradient" />
                    {/* Shimmer on hover */}
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                        backgroundSize: "200% 100%",
                        animation: submitting ? "shimmer 1s linear infinite" : "none",
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2.5">
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                          </svg>
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Wyślij zapytanie
                        </>
                      )}
                    </span>
                  </button>
                </div>

                <p className="text-[#3A3A3A] text-xs text-center pt-2">
                  * Pola wymagane. Twoje dane są bezpieczne.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
