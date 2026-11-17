import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import ContactModalProvider from "@/components/layout/ContactModalProvider";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";
import WorkGallery from "@/components/Work/WorkGallery";
import styles from "./work.module.scss";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Explore selected branding, web design, development, and digital experiences by Webza.",
  alternates: {
    canonical: "https://webza.in/work",
  },
  openGraph: {
    title: "Selected Work | Webza",
    description:
      "Explore selected branding, web design, development, and digital experiences by Webza.",
    url: "https://webza.in/work",
  },
};

export default function WorkPage() {
  return (
    <ContactModalProvider>
      <Navbar />
      <main id="main-content">
        <section className={styles.workPage} aria-labelledby="work-page-title">
          <div className={styles.container}>
            <div className={styles.intro}>
              <span className={styles.eyebrow}>
                <span aria-hidden="true" />
                A FEW THINGS WE&apos;VE MADE
              </span>
              <h1 id="work-page-title">
                Selected work<span>.</span>
              </h1>
              <p>
                A collection of brands and digital experiences shaped with
                curiosity, clarity, and care.
              </p>
            </div>
            <WorkGallery />
          </div>
        </section>
        <CTA />
        <Footer />
      </main>
    </ContactModalProvider>
  );
}
