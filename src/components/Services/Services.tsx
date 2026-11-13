"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Services.module.scss";

const brands = [
  "Pichkaari",
  "flowbase",
  "VISION UI",
  "Layer",
  "Sitemark",
  "NEXTYPE",
];

const bentoServices = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    description:
      "Fast, responsive websites that deliver results and create meaningful digital experiences.",
    cardKey: "card01",
  },
  {
    number: "02",
    title: "DIGITAL MARKETING STRATEGIES",
    description:
      "Data-driven marketing strategies that help ambitious brands reach the right audience and grow.",
    cardKey: "card02",
  },
  {
    number: "03",
    title: "CREATIVE DESIGN SERVICE",
    description:
      "Visual identities and creative experiences designed to make your brand stand out.",
    cardKey: "card03",
  },
  {
    number: "04",
    title: "E-COMMERCE",
    description:
      "Conversion-focused digital storefronts designed for modern brands.",
    cardKey: "card04",
  },
];

export default function Services() {
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
        threshold: 0.12,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`${styles.services} ${isVisible ? styles.isVisible : ""}`}
      aria-labelledby="services-title"
    >
      {/* =====================================================
          TRUSTED BRANDS
      ===================================================== */}
      <div className={styles.brands}>
        <div className={styles.brandsHeader}>
          <span>
            <i />
            TRUSTED BY AMBITIOUS BRANDS
          </span>
        </div>

        <div className={styles.brandMarquee}>
          <div className={styles.brandTrack}>
            <div className={styles.brandSet}>
              {brands.map((brand, index) => (
                <div className={styles.brand} key={`brand-${index}`}>
                  {brand}
                </div>
              ))}
            </div>

            <div className={styles.brandSet} aria-hidden="true">
              {brands.map((brand, index) => (
                <div className={styles.brand} key={`brand-copy-${index}`}>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          WHAT WE DO
      ===================================================== */}
      <div className={styles.whatWeDo}>
        <div className={styles.intro}>
          <div className={styles.introHeading}>
            <div className={`${styles.sectionLabel} ${styles.revealItem}`}>
              <span />
              WHAT WE DO
            </div>

            <h2 id="services-title" className={styles.revealHeading}>
              End-to-end digital
              <br />
              solutions for modern brands.
            </h2>
          </div>

          <div className={`${styles.introCopy} ${styles.revealCopy}`}>
            <p>
              We combine strategy, creativity and technology to build digital
              experiences that drive results.
            </p>

            <Link href="#work" className={styles.exploreLink}>
              Explore Services
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* =====================================================
            SERVICES BENTO
        ===================================================== */}
        <div className={styles.bentoGrid}>
          {bentoServices.map((service) => (
            <article
              key={service.number}
              className={`${styles.bentoCard} ${
                styles[service.cardKey as keyof typeof styles]
              }`}
            >
              <div className={styles.cardNumber}>{service.number}</div>

              <div className={styles.bentoContent}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}

          {/* 05 — 3D VISUAL */}
          <article className={`${styles.bentoCard} ${styles.card05}`}>
            <div className={styles.cardNumber}>05</div>

            <div className={styles.visualImage}>
              <Image
                src="/images/butterfly.png"
                alt="Webza digital visual artifact"
                width={900}
                height={900}
                className={styles.butterfly}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                loading="lazy"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
