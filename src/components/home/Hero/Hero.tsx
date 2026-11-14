"use client";

import { useContactModal } from "@/components/layout/ContactModalProvider";
import Link from "next/link";
import styles from "./Hero.module.scss";

export default function Hero() {
  const openContactModal = useContactModal();

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        {/* ================================
            LEFT CONTENT
        ================================= */}
        <div className={styles.content}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            <span>DIGITAL CREATIVE STUDIO</span>
            <span className={styles.dot} />
          </div>

          {/* Heading */}
          <h1 id="hero-title" className={styles.title}>
            We build
            <br />
            digital experiences
            <br />
            that move brands
            <br />
            forward<span className={styles.accent}>.</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Web design, development and branding for
            <br className={styles.desktopBreak} />
            ambitious brands that want to stand out.
          </p>

          {/* CTA */}
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.primary}`}
              onClick={openContactModal}
            >
              <span>Start a Project</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </button>

            <Link
              href="#work"
              className={`${styles.button} ${styles.secondary}`}
            >
              <span>View Our Work</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* ================================
            HERO VIDEO
        ================================= */}
        <div className={styles.visual}>
          <video
            className={styles.video}
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Webza showcase animation"
          />
        </div>

        {/* ================================
            SCROLL INDICATOR
        ================================= */}
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollText}>
            SCROLL
            <br />
            DOWN
          </span>

          <span className={styles.scrollLine}>
            <span className={styles.scrollDot} />
          </span>
        </div>
      </div>
    </section>
  );
}
