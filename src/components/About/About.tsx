"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./About.module.scss";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  tag: string;
}

const stats: StatItem[] = [
  {
    target: 50,
    suffix: "+",
    label: "Projects",
    sublabel: "Completed",
    tag: "Work",
  },
  {
    target: 20,
    suffix: "+",
    label: "Happy",
    sublabel: "Clients",
    tag: "Trust",
  },
  {
    target: 5,
    suffix: "+",
    label: "Years",
    sublabel: "Experience",
    tag: "Growth",
  },
];

function CountUp({
  target,
  suffix = "+",
  start,
}: {
  target: number;
  suffix?: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      requestAnimationFrame(() => {
        setCount(target);
      });
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1800; // 1.8s smooth ease-out count-up
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth cubic ease-out curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [start, target]);

  return (
    <strong className={styles.statValue}>
      {count}
      <span className={styles.accentPlus}>{suffix}</span>
    </strong>
  );
}

export default function About() {
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
        threshold: 0.15,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.about} ${isVisible ? styles.isVisible : ""}`}
      id="about"
      aria-labelledby="about-title"
    >
      {/* Ambient Depth Glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section label */}
        <div className={`${styles.sectionLabel} ${styles.reveal}`}>
          <span className={styles.pulseDot} />
          ABOUT WEBZA
        </div>

        <div className={styles.content}>
          {/* Main statement */}
          <div className={`${styles.headingWrap} ${styles.reveal}`}>
            <h2 id="about-title">
              We&apos;re a team of{" "}
              <span className={styles.highlightWord}>creatives</span>,{" "}
              <span className={styles.highlightWord}>designers</span> and{" "}
              <span className={styles.highlightWord}>developers</span> who love
              building meaningful digital experiences.
            </h2>

            <Link href="#process" className={styles.aboutLink}>
              <span>More About Us</span>
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className={`${styles.rightColumn} ${styles.reveal}`}>
            <p className={styles.description}>
              Webza was born from the idea that great design and smart technology
              can transform brands. We partner with businesses to create digital
              products, websites and brands that connect, engage and grow.
            </p>

            <div className={styles.stats}>
              {stats.map((stat, idx) => (
                <div
                  className={styles.statCard}
                  key={stat.label}
                  style={
                    {
                      "--card-index": idx,
                    } as React.CSSProperties
                  }
                  tabIndex={0}
                  role="article"
                  aria-label={`${stat.target}${stat.suffix} ${stat.label} ${stat.sublabel}`}
                >
                  <span className={styles.statCorner} aria-hidden="true" />
                  <span className={styles.statTag}>{stat.tag}</span>

                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    start={isVisible}
                  />

                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <small className={styles.statSublabel}>
                      {stat.sublabel}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
