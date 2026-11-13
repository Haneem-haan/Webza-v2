"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./About.module.scss";

const stats = [
  {
    number: "50+",
    label: "Projects",
    sublabel: "Completed",
  },
  {
    number: "20+",
    label: "Happy",
    sublabel: "Clients",
  },
  {
    number: "5+",
    label: "Years",
    sublabel: "Experience",
  },
];

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
      <div className={styles.container}>
        {/* Section label */}
        <div className={`${styles.sectionLabel} ${styles.reveal}`}>
          <span />
          ABOUT WEBZA
        </div>

        <div className={styles.content}>
          {/* Main statement */}
          <div className={`${styles.headingWrap} ${styles.reveal}`}>
            <h2 id="about-title">
              We&apos;re a team of creatives, designers and developers who love
              building meaningful digital experiences.
            </h2>

            <Link href="#process" className={styles.aboutLink}>
              More About Us
              <span aria-hidden="true">→</span>
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
              {stats.map((stat) => (
                <div className={styles.stat} key={stat.number}>
                  <strong>{stat.number}</strong>

                  <div>
                    <span>{stat.label}</span>
                    <small>{stat.sublabel}</small>
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
