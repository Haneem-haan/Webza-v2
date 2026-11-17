"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { usePublishedProjects } from "./usePublishedProjects";
import styles from "./WorkGallery.module.scss";

export default function WorkGallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { projects, isLoading, error } = usePublishedProjects();
  const filters = useMemo(
    () => ["All", ...new Set(projects.flatMap((project) => project.categories))],
    [projects]
  );
  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) =>
            project.categories.includes(activeFilter)
          ),
    [activeFilter, projects]
  );

  return (
    <div className={styles.gallery} id="work">
      <div className={styles.toolbar}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filter projects"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter ? styles.filterActive : styles.filter
              }
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className={styles.count}>
          <span>{String(visibleProjects.length).padStart(2, "0")}</span>{" "}
          PROJECTS
        </p>
      </div>

      <div className={styles.grid} aria-live="polite">
        {visibleProjects.map((project, index) => (
          <article className={styles.project} key={project.id}>
            <div className={styles.imageWrap}>
              <Image
                src={project.image}
                alt={`${project.title} project`}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 45vw"
                className={styles.image}
                priority={index < 2}
              />
              <span className={styles.projectNumber}>
                {String(projects.indexOf(project) + 1).padStart(2, "0")}
              </span>
            </div>
            <div className={styles.projectDetails}>
              <div className={styles.projectCopy}>
                <h2>{project.title}</h2>
                <p className={styles.projectCategory}>{project.category}</p>
                {project.description && (
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
        {visibleProjects.length === 0 && (
          <p className={styles.projectStatus} aria-live="polite">
            {isLoading
              ? "Loading selected work..."
              : error ?? "No projects are published in this category yet."}
          </p>
        )}
      </div>
    </div>
  );
}
