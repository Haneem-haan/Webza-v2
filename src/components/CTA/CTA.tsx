"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./CTA.module.scss";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.cta} ${isVisible ? styles.isVisible : ""}`}
      aria-label="Call to action"
    >
      <div className={styles.card}>
        {/* Background image */}
        <div className={styles.background} />

        {/* Dark overlay */}
        <div className={styles.overlay} />

        <div className={styles.content}>
          {/* LEFT */}
          <div className={styles.headingWrap}>
            <span className={styles.label}>
              <span className={styles.dot} />
              LET&apos;S WORK TOGETHER
            </span>

            <h2>
              Have a project
              <br />
              <span>in mind?</span>
            </h2>
          </div>

          {/* RIGHT */}
          <div className={styles.action}>
            <p>
              Let&apos;s create something
              <br />
              amazing together.
            </p>

            <Link href="#contact" className={styles.button}>
              <span>Start a Project</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
