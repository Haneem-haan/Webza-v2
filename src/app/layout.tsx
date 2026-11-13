import type { Metadata, Viewport } from "next";
import { Epilogue } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "../styles/globals.scss";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-epilogue",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://webza.in"),
  title: {
    default: "Webza — Digital Creative Studio",
    template: "%s | Webza",
  },
  description:
    "Webza creates digital experiences, brands, and technology for ambitious businesses. Full-service web development, UI/UX design, and brand identity.",
  keywords: [
    "digital studio",
    "web development",
    "creative agency",
    "UI/UX design",
    "brand identity",
    "Next.js agency",
    "ecommerce",
    "modern websites",
  ],
  authors: [{ name: "Webza Studio", url: "https://webza.in" }],
  creator: "Webza",
  publisher: "Webza",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Webza — Digital Creative Studio",
    description:
      "Webza creates digital experiences, brands, and technology for ambitious businesses.",
    url: "https://webza.in",
    siteName: "Webza",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webza — Digital Creative Studio",
    description:
      "Webza creates digital experiences, brands, and technology for ambitious businesses.",
  },
  alternates: {
    canonical: "https://webza.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Webza",
  description:
    "Digital creative studio specializing in web development, brand identity, and UI/UX design.",
  url: "https://webza.in",
  telephone: "+91 98765 43210",
  email: "hello@webza.in",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  sameAs: [
    "https://instagram.com",
    "https://behance.net",
    "https://linkedin.com",
    "https://dribbble.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${epilogue.variable} ${epilogue.className}`}>
        <a href="#main-content" className="skipToContent">
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
