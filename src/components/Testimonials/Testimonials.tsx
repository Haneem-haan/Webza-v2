"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.scss";

const testimonials = [
  {
    quote:
      "Webza completely transformed our brand and website. The team is professional, creative and super easy to work with.",
    name: "Anandhu Krishnan",
    role: "Founder, Zenvia",
    initials: "AK",
  },
  {
    quote:
      "Our new website not only looks amazing but also performs incredibly well. Highly recommend Webza!",
    name: "Sreeraj Nair",
    role: "Marketing Head, NuroCars",
    initials: "SN",
  },
  {
    quote:
      "The entire process was smooth, thoughtful and focused on what our brand actually needed. Webza delivered beyond expectations.",
    name: "Maya Thomas",
    role: "Founder, MIO Skincare",
    initials: "MT",
  },
  {
    quote:
      "From strategy to execution, Webza helped us create a digital experience that feels genuinely different.",
    name: "Arjun Menon",
    role: "Co-founder, Snapvibe",
    initials: "AM",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const next = () => {
    setActiveIndex((current) =>
      current >= testimonials.length - 1 ? 0 : current + 1
    );
  };

  const previous = () => {
    setActiveIndex((current) =>
      current <= 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`${styles.testimonials} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.container}>
        {/* SECTION LABEL */}
        <div className={styles.sectionLabel}>
          <span />
          WHAT OUR CLIENTS SAY
        </div>

        {/* HEADER */}
        <div className={styles.header}>
          <h2 id="testimonials-title">
            Brands we&apos;ve helped
            <br />
            <span>move forward.</span>
          </h2>

          <div className={styles.controls}>
            <button
              type="button"
              onClick={previous}
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{
              transform: `translateX(-${activeIndex * (isMobile ? 100 : 50)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <article
                className={styles.card}
                key={`${testimonial.name}-${index}`}
              >
                <div className={styles.quoteMark} aria-hidden="true">
                  &ldquo;
                </div>

                <p className={styles.quote}>{testimonial.quote}</p>

                <div className={styles.client}>
                  <div className={styles.avatar}>
                    {testimonial.initials}
                  </div>

                  <div className={styles.clientInfo}>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* PROGRESS */}
        <div className={styles.progress}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === activeIndex ? styles.progressActive : ""
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
