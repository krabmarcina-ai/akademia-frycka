import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akademia Frycka | Salon Fryzjerski Poznań",
  description:
    "Akademia Frycka — ekskluzywny salon fryzjerski na Górnej Wildzie w Poznaniu. Strzyżenie, koloryzacja, balayage, keratynowe prostowanie i zabiegi pielęgnacyjne. Umów wizytę: 515 175 405.",
  keywords:
    "salon fryzjerski Poznań, fryzjer Poznań, balayage Poznań, koloryzacja Poznań, keratyna Poznań, strzyżenie Poznań, Górna Wilda, Wierzbięcice, akademia frycka",
  openGraph: {
    title: "Akademia Frycka | Salon Fryzjerski Poznań",
    description:
      "Ekskluzywny salon fryzjerski na Górnej Wildzie w Poznaniu. Strzyżenie, koloryzacja, balayage i zabiegi pielęgnacyjne w najwyższym standardzie.",
    locale: "pl_PL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://akademiafrycka.pl",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: 'Akademia "Frycka"',
  description:
    "Ekskluzywny salon fryzjerski na Górnej Wildzie w Poznaniu. Strzyżenie, koloryzacja, balayage, keratynowe prostowanie i zabiegi pielęgnacyjne.",
  url: "https://akademiafrycka.pl",
  telephone: "+48515175405",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wierzbięcice 18",
    addressLocality: "Poznań",
    addressRegion: "Górna Wilda",
    postalCode: "61-569",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.3961,
    longitude: 16.9374,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/Frycki/",
    "https://www.instagram.com/akademiafrycka/",
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${cormorant.variable} ${montserrat.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-full">{children}</body>
    </html>
  );
}
