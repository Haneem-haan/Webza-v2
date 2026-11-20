import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import ContactModalProvider from "@/components/layout/ContactModalProvider";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";
import AboutHero from "@/components/AboutPage/AboutHero";
import AboutManifesto from "@/components/AboutPage/AboutManifesto";
import AboutPhilosophy from "@/components/AboutPage/AboutPhilosophy";
import FoundersSection from "@/components/AboutPage/FoundersSection";
import AboutDualCTA from "@/components/AboutPage/AboutDualCTA";
import styles from "@/components/AboutPage/AboutPage.module.scss";

export const metadata: Metadata = {
  title: "About Us — The Webza Way of Crafting",
  description:
    "Discover Webza's creative philosophy, technical vision, and meet the three co-founders behind our high-performance digital experiences and brand solutions.",
  alternates: {
    canonical: "https://webza.in/about",
  },
  openGraph: {
    title: "About Us — The Webza Way of Crafting | Webza",
    description:
      "Discover Webza's creative philosophy, technical vision, and meet the three co-founders behind our high-performance digital experiences and brand solutions.",
    url: "https://webza.in/about",
  },
};

export default function AboutPage() {
  return (
    <ContactModalProvider>
      <Navbar />
      <main id="main-content" className={styles.aboutPage}>
        <AboutHero />
        <AboutManifesto />
        <AboutPhilosophy />
        <FoundersSection />
        <AboutDualCTA />
        <CTA />
        <Footer />
      </main>
    </ContactModalProvider>
  );
}
