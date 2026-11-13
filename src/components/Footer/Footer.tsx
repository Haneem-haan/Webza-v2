"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Web Design & Development",
  "Brand Identity",
  "UI/UX Design",
  "Digital Marketing",
  "Creative & Content",
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(footer);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className={`${styles.footer} ${isVisible ? styles.isVisible : ""}`}
      id="contact"
    >
      <div className={styles.grid} />

      <div className={styles.container}>
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}
        <div className={styles.main}>
          {/* BRAND */}
          <div className={`${styles.brand} ${styles.revealItem}`}>
            <Link href="#home" className={styles.logo} aria-label="Webza Home">
              webza<span>.</span>
            </Link>

            <p>
              We build digital experiences that help brands grow, stand out and
              succeed online.
            </p>

            <div className={styles.socials}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Webza on Instagram"
              >
                ◎
              </a>

              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Webza on Behance"
              >
                Be
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Webza on LinkedIn"
              >
                in
              </a>

              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Webza on Dribbble"
              >
                ◉
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className={`${styles.column} ${styles.revealItem}`}>
            <h3>Links</h3>

            <nav aria-label="Footer navigation">
              {links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* SERVICES */}
          <div className={`${styles.column} ${styles.revealItem}`}>
            <h3>Services</h3>

            <nav aria-label="Footer services">
              {services.map((service) => (
                <a key={service} href="#services">
                  {service}
                </a>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div
            className={`${styles.column} ${styles.contact} ${styles.revealItem}`}
          >
            <h3>Contact</h3>

            <a href="mailto:hello@webza.in">hello@webza.in</a>

            <a href="tel:+919876543210">+91 98765 43210</a>

            <p>Kozhikode, Kerala, India</p>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Webza. All rights reserved.
          </p>

          <div className={styles.legal}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>

          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
