"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Process.module.scss";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "We learn about your business, goals and audience.",
  },
  {
    number: "02",
    title: "Strategize",
    description: "We plan the right strategy to achieve your goals.",
  },
  {
    number: "03",
    title: "Design",
    description: "We create meaningful designs that connect and engage.",
  },
  {
    number: "04",
    title: "Develop",
    description: "We build fast, scalable and high-performance solutions.",
  },
  {
    number: "05",
    title: "Launch",
    description: "We test, optimize and launch your project successfully.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  /*
   * Start the animation ONLY when the Process section
   * actually enters the viewport.
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animation should run only once.
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /*
   * Sequential activation:
   *
   * 01 → 02 → 03 → 04 → 05
   *
   * Starts only after the section enters the viewport.
   */
  useEffect(() => {
    if (!isVisible) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, index) => {
      const timer = setTimeout(() => {
        setActiveStep(index + 1);
      }, 300 + index * 700);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`${styles.process} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="process-title"
    >
      <div className={styles.container}>
        {/* =====================================================
            LABEL
        ===================================================== */}

        <div className={styles.sectionLabel}>
          <span />
          OUR PROCESS
        </div>

        {/* =====================================================
            HEADING
        ===================================================== */}

        <h2 id="process-title" className={styles.heading}>
          A simple, proven process
          <br />
          that delivers results.
        </h2>

        {/* =====================================================
            PROCESS TIMELINE
        ===================================================== */}

        <div className={styles.timeline}>
          {steps.map((step, index) => {
            const stepNumber = index + 1;

            const isActive = activeStep >= stepNumber;

            const lineActive =
              activeStep >= stepNumber + 1;

            return (
              <div
                key={step.number}
                className={`${styles.step} ${
                  isActive ? styles.stepActive : ""
                }`}
              >
                {/* Timeline dot + connector */}
                <div className={styles.timelineTop}>
                  <div className={styles.dot}>
                    <span />
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`${styles.connector} ${
                        lineActive
                          ? styles.connectorActive
                          : ""
                      }`}
                    >
                      <span />
                    </div>
                  )}
                </div>

                {/* Step content */}
                <div className={styles.stepContent}>
                  <div className={styles.number}>
                    {step.number}
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}