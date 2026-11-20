import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar/Navbar";
import ContactModalProvider from "@/components/layout/ContactModalProvider";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { getPublishedProjectBySlug } from "@/lib/projects";
import styles from "./project.module.scss";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublishedProjectBySlug(slug);

  if (!data) {
    return {
      title: "Project Not Found | Webza",
    };
  }

  const { project } = data;

  return {
    title: `${project.title} — Case Study`,
    description:
      project.description ||
      `Explore the ${project.title} design and development case study by Webza.`,
    alternates: {
      canonical: `https://webza.in/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | Webza`,
      description:
        project.description ||
        `Explore the ${project.title} design and development case study by Webza.`,
      url: `https://webza.in/work/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study`,
        },
      ],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPublishedProjectBySlug(slug);

  if (!data) {
    notFound();
  }

  const { project, nextProject } = data;
  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  return (
    <ContactModalProvider>
      <Navbar />
      <main id="main-content" className={styles.caseStudyPage}>
        {/* Top Hero Section */}
        <section className={styles.heroSection} aria-labelledby="project-title">
          <div className={styles.container}>
            {/* Top Navigation */}
            <div className={styles.topNav}>
              <Link href="/work" className={styles.backLink}>
                <ArrowLeft size={15} strokeWidth={2} />
                <span>All Projects</span>
              </Link>
              <div className={styles.heroBadge}>
                <span className={styles.badgeDot} />
                <span>{project.category}</span>
                {project.year && (
                  <>
                    <span className={styles.badgeSeparator}>/</span>
                    <span>{project.year}</span>
                  </>
                )}
              </div>
            </div>

            {/* Title & Headline */}
            <div className={styles.titleWrap}>
              <h1 id="project-title" className={styles.title}>
                {project.title}
                <span className={styles.accentDot}>.</span>
              </h1>
              {project.description && (
                <p className={styles.leadDescription}>{project.description}</p>
              )}
            </div>

            {/* External Live Link button if available */}
            {project.liveUrl && (
              <div className={styles.heroActions}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveSiteButton}
                >
                  <span>Visit Live Project</span>
                  <span className={styles.buttonIcon}>
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </span>
                </a>
              </div>
            )}

            {/* High-Resolution Hero Visual */}
            <div className={styles.coverFrame}>
              <div className={styles.coverGlow} />
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={`${project.title} cover showcase`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1320px"
                  className={styles.coverImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Client & Company Metadata Overview */}
        <section
          className={styles.metadataSection}
          aria-label="Project details"
        >
          <div className={styles.container}>
            <div className={styles.metadataGrid}>
              <div className={styles.metaCard}>
                <span className={styles.metaLabel}>01 / CLIENT</span>
                <p className={styles.metaValue}>
                  {project.client || project.title}
                </p>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaLabel}>02 / INDUSTRY</span>
                <p className={styles.metaValue}>
                  {project.industry || project.category}
                </p>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaLabel}>
                  03 / SERVICES &amp; SCOPE
                </span>
                <div className={styles.servicesList}>
                  {project.services && project.services.length > 0 ? (
                    project.services.map((service) => (
                      <span key={service} className={styles.servicePill}>
                        {service}
                      </span>
                    ))
                  ) : (
                    <span className={styles.servicePill}>
                      {project.category}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.metaCard}>
                <span className={styles.metaLabel}>04 / TIMELINE</span>
                <p className={styles.metaValue}>{project.year || "2026"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative & Deliverables Section */}
        <section className={styles.storySection} aria-label="Project overview">
          <div className={styles.container}>
            <div className={styles.storyGrid}>
              <div className={styles.storyColumnLeft}>
                <span className={styles.sectionEyebrow}>
                  <span className={styles.eyebrowDot} />
                  THE WORK &amp; APPROACH
                </span>
                <h2 className={styles.storyHeading}>
                  Architecting a distinct identity that commands attention.
                </h2>
              </div>

              <div className={styles.storyColumnRight}>
                <p className={styles.storyParagraph}>
                  {project.description ||
                    `Webza partnered with ${project.client || project.title} to define, design, and engineer a digital presence engineered for scalability, premium brand recall, and seamless user conversion.`}
                </p>

                {project.deliverables && project.deliverables.length > 0 && (
                  <div className={styles.deliverablesBlock}>
                    <h3 className={styles.deliverablesTitle}>
                      Delivered Assets &amp; Outcomes
                    </h3>
                    <ul className={styles.deliverablesList}>
                      {project.deliverables.map((item, idx) => (
                        <li key={idx} className={styles.deliverableItem}>
                          <span className={styles.checkIcon}>
                            <ArrowUpRight size={13} strokeWidth={2.4} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Creatives & Visual Showcase */}
        <section
          className={styles.gallerySection}
          aria-labelledby="showcase-heading"
        >
          <div className={styles.container}>
            <div className={styles.galleryHeader}>
              <span className={styles.sectionEyebrow}>
                <span className={styles.eyebrowDot} />
                CREATIVES &amp; VISUALS
              </span>
              <h2 id="showcase-heading" className={styles.galleryTitle}>
                Crafted in detail<span>.</span>
              </h2>
            </div>

            <div className={styles.galleryGrid}>
              {galleryImages.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`${styles.galleryItem} ${
                    index === 0 && galleryImages.length > 1
                      ? styles.featuredItem
                      : ""
                  }`}
                >
                  <div className={styles.galleryImageWrap}>
                    <Image
                      src={imgUrl}
                      alt={`${project.title} creative asset ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                      className={styles.galleryImage}
                      loading="lazy"
                    />
                    <div className={styles.galleryOverlay}>
                      <span className={styles.imageIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Navigation & Next Project Banner */}
        <section
          className={styles.bottomNavSection}
          aria-label="Next project navigation"
        >
          <div className={styles.container}>
            <div className={styles.bottomNavCard}>
              <div className={styles.bottomNavLeft}>
                <span className={styles.nextEyebrow}>READY FOR MORE?</span>
                <h3 className={styles.bottomNavHeading}>
                  Explore more of our selected digital creations.
                </h3>
                <div className={styles.bottomNavLinks}>
                  <Link href="/work" className={styles.allWorkButton}>
                    <ArrowLeft size={14} strokeWidth={2} />
                    <span>Back to all works</span>
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveSiteLink}
                    >
                      <span>Visit Live Website</span>
                      <ArrowUpRight size={13} strokeWidth={2} />
                    </a>
                  )}
                </div>
              </div>

              {nextProject && (
                <div className={styles.bottomNavRight}>
                  <Link
                    href={`/work/${nextProject.slug}`}
                    className={styles.nextProjectCard}
                  >
                    <div className={styles.nextThumbWrap}>
                      <Image
                        src={nextProject.image}
                        alt={nextProject.title}
                        fill
                        sizes="160px"
                        className={styles.nextThumb}
                      />
                    </div>
                    <div className={styles.nextContent}>
                      <span className={styles.nextLabel}>
                        NEXT CASE STUDY
                        <ArrowRight size={13} strokeWidth={2} />
                      </span>
                      <h4 className={styles.nextTitle}>{nextProject.title}</h4>
                      <p className={styles.nextCategory}>
                        {nextProject.category}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <CTA />
        <Footer />
      </main>
    </ContactModalProvider>
  );
}
