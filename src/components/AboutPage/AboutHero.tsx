"use client";

import Link from "next/link";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { ArrowUpRight } from "@/components/ui/Icons";
import styles from "./AboutPage.module.scss";

export default function AboutHero() {
  const openContactModal = useContactModal();

  return (
    <section className={styles.heroSection} aria-labelledby="about-hero-title">
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.sectionEyebrow}>
            <span className={styles.eyebrowDot} />
            <span>A GLIMPSE INTO WEBZA • EST. 2024</span>
          </div>

          <h1 id="about-hero-title" className={styles.heroTitle}>
            A Better Glimpse at the Webza Way of Crafting
            <span className={styles.accentDot}>.</span>
          </h1>

          <p className={styles.heroLead}>
            We are a creative engineering and brand studio. We build at the
            intersection of high-performance web engineering, strategic UI/UX
            architecture, and iconic digital identities for companies determined
            to stand out.
          </p>

          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.primaryCtaBtn}
              onClick={openContactModal}
            >
              <span>Plan a Project</span>
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </button>

            <Link href="/work" className={styles.secondaryCtaBtn}>
              <span>Explore Selected Work</span>
              <ArrowUpRight size={13} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className={styles.heroBannerFrame}>
          <div className={styles.heroBannerGlow} aria-hidden="true" />
          <div className={styles.bannerGrid}>
            <p className={styles.bannerQuote}>
              We don&apos;t just build websites. We engineer{" "}
              <span>digital authority</span> that turns casual visitors into
              lifelong advocates.
            </p>

            <div className={styles.bannerHighlights}>
              <div className={styles.highlightItem}>
                <span className={styles.highlightNumber}>01</span>
                <span className={styles.highlightText}>
                  <strong>Bespoke Engineering:</strong> Zero generic templates;
                  100% custom-tailored architecture.
                </span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightNumber}>02</span>
                <span className={styles.highlightText}>
                  <strong>Obsessive Craft:</strong> Kinetic micro-interactions,
                  sub-second speed, and tactile feel.
                </span>
              </div>
              <div className={styles.highlightItem}>
                <span className={styles.highlightNumber}>03</span>
                <span className={styles.highlightText}>
                  <strong>End-to-End Delivery:</strong> From conceptual brand
                  identity to live production deployment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
