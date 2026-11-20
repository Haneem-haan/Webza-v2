import styles from "./AboutPage.module.scss";

export default function AboutManifesto() {
  return (
    <section className={styles.manifestoSection} aria-label="Our Manifesto">
      <div className={styles.container}>
        <div className={styles.manifestoGrid}>
          <div>
            <div className={styles.sectionEyebrow}>
              <span className={styles.eyebrowDot} />
              <span>THE MANIFESTO</span>
            </div>
            <h2 className={styles.manifestoTitle}>
              We craft digital platforms that speak, convert, and endure
              <span className={styles.accentDot}>.</span>
            </h2>
          </div>

          <div className={styles.manifestoRight}>
            <p className={styles.manifestoLeadParagraph}>
              Webza was founded on an unapologetic belief:{" "}
              <strong>
                the digital world is drowning in generic, lifeless templates.
              </strong>{" "}
              Forward-thinking companies with exceptional products deserve web
              platforms that truly reflect their ambition.
            </p>

            <p className={styles.manifestoBodyParagraph}>
              We treat web experiences as living architectures. When visual
              poise, seamless typography, kinetic micro-interactions, and
              ultra-fast engineering harmonize, digital interfaces cease being
              mere software — they become unforgettable brand journeys.
            </p>

            <p className={styles.manifestoBodyParagraph}>
              From early-stage disruptors to category leaders, we collaborate
              closely with founders who understand that design isn&apos;t just how
              something looks; it&apos;s how deeply it connects, how swiftly it
              functions, and how reliably it drives business growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
