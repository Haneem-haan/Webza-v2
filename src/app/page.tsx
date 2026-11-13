import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/home/Hero/Hero";
import Services from "@/components/Services/Services";
import Work from "@/components/Work/Work";
import About from "@/components/About/About";
import Process from "@/components/Process/Process";
import Testimonials from "@/components/Testimonials/Testimonials";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <Hero />
      <Services />
      <Work />

      {/* ABOUT + PROCESS */}
      <div className="aboutProcess">
        <About />
        <Process />
      </div>
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
