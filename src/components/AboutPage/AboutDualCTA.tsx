"use client";

import Link from "next/link";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { ArrowUpRight } from "@/components/ui/Icons";
import styles from "./AboutPage.module.scss";

export default function AboutDualCTA() {
  const openContactModal = useContactModal();

  return (
    <section className={styles.dualCtaSection} aria-label="Next steps">
      <div className={styles.container}>
        <div className={styles.dualCtaGrid}>
          {/* Pathway A */}
          <div className={styles.dualCard}>
            <div>
              <div className={styles.sectionEyebrow}>
                <span className={styles.eyebrowDot} />
                <span>PARTNERS IN CREATIVITY</span>
              </div>
              <h3 className={styles.dualCardTitle}>
                Have an ambitious idea you want to materialize?
              </h3>
              <p className={styles.dualCardDesc}>
                Whether you are launching a new venture, revamping an established
                platform, or building complex web applications, we are ready to
                bring it to life.
              </p>
            </div>

            <div className={styles.dualCardBtnWrap}>
              <button
                type="button"
                className={styles.primaryCtaBtn}
                onClick={openContactModal}
              >
                <span>Plan a Project</span>
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* Pathway B */}
          <div className={styles.dualCard}>
            <div>
              <div className={styles.sectionEyebrow}>
                <span className={styles.eyebrowDot} />
                <span>INSPECT OUR CRAFT</span>
              </div>
              <h3 className={styles.dualCardTitle}>
                Explore how we craft digital experiences.
              </h3>
              <p className={styles.dualCardDesc}>
                Dive into our selected portfolio of branding, web platforms, and
                creative case studies built for forward-thinking brands.
              </p>
            </div>

            <div className={styles.dualCardBtnWrap}>
              <Link href="/work" className={styles.secondaryCtaBtn}>
                <span>View All Projects</span>
                <ArrowUpRight size={13} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
