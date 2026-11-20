"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import styles from "./Work.module.scss";
import { usePublishedProjects } from "./usePublishedProjects";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { projects, isLoading, error } = usePublishedProjects();

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

  const moveSlider = (direction: "next" | "prev") => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>(`.${styles.projectCard}`);
    if (!card) return;

    const gap = 14;
    const amount = card.offsetWidth + gap;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.work} ${isVisible ? styles.isVisible : ""}`}
      id="work"
      aria-labelledby="work-title"
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headingGroup}>
          <div className={styles.sectionLabel}>
            <span />
            SELECTED WORK
          </div>

          <h2 id="work-title">
            Crafting digital experiences
            <br />
            that make an impact.
          </h2>
        </div>

        <Link href="/work" className={styles.viewAll}>
          View All Work
          <span className={styles.viewAllArrow} aria-hidden="true">
            <ArrowUpRight size={14} strokeWidth={2} />
          </span>
        </Link>
      </div>

      {/* Projects */}
      <div className={styles.projectsWrapper}>
        {projects.length > 0 ? (
          <>
            <div ref={trackRef} className={styles.projects}>
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className={styles.projectCard}
                  style={
                    {
                      "--delay": `${index * 100}ms`,
                    } as React.CSSProperties
                  }
                >
                  <Link href="/work" className={styles.projectLink}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.category}`}
                        width={600}
                        height={700}
                        className={styles.projectImage}
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 360px"
                        loading="lazy"
                      />

                      <div className={styles.overlay} />

                      <div className={styles.projectInfo}>
                        <h3>{project.title}</h3>
                        <p>{project.category}</p>
                      </div>

                      <span className={styles.projectArrow} aria-hidden="true">
                        <ArrowUpRight size={15} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {projects.length > 1 && (
              <div className={styles.controls}>
                <button
                  type="button"
                  onClick={() => moveSlider("prev")}
                  aria-label="Previous project"
                >
                  <ArrowLeft size={16} strokeWidth={2} />
                </button>

                <button
                  type="button"
                  onClick={() => moveSlider("next")}
                  aria-label="Next project"
                >
                  <ArrowRight size={16} strokeWidth={2} />
                </button>
              </div>
            )}
          </>
        ) : (
          <p className={styles.projectStatus} aria-live="polite">
            {isLoading
              ? "Loading selected work..."
              : error ?? "New work is coming soon."}
          </p>
        )}
      </div>
    </section>
  );
}
