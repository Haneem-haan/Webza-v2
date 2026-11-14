import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/home/Hero/Hero";
import Services from "@/components/Services/Services";
import Work from "@/components/Work/Work";
import CheckGridSection from "@/components/layout/CheckGridSection";
import About from "@/components/About/About";
import Process from "@/components/Process/Process";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";
import ContactModalProvider from "@/components/layout/ContactModalProvider";

export default function Home() {
  return (
    <ContactModalProvider>
      <main id="main-content">
        <Navbar />
        <Hero />
        <Services />
        <Work />

        {/* UNIFIED CHECK GRID: ABOUT + PROCESS */}
        <CheckGridSection>
          <About />
          <Process />
        </CheckGridSection>

        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </ContactModalProvider>
  );
}
