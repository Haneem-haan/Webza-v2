"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.scss";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      requestAnimationFrame(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

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
            <Link
              href="#contact"
              className={`${styles.button} ${styles.primary}`}
            >
              <span>Start a Project</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>

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
            ref={videoRef}
            className={styles.video}
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Webza showcase animation"
          />

          {/* Accessible Play/Pause Toggle */}
          <button
            type="button"
            className={styles.videoToggle}
            onClick={toggleVideo}
            aria-label={
              isPlaying ? "Pause background video" : "Play background video"
            }
          >
            <span>{isPlaying ? "⏸" : "▶"}</span>
            <span className={styles.videoToggleText}>
              {isPlaying ? "Pause" : "Play"}
            </span>
          </button>
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
