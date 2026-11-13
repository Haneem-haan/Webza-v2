"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./MobileMenu.module.scss";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const links = linksRef.current;

    if (!overlay || !panel || !links) return;

    const menuLinks = links.querySelectorAll("a");

    timelineRef.current?.kill();

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power3.out",
      },
    });

    tl.set(overlay, {
      display: "block",
    });

    tl.to(
      overlay,
      {
        opacity: 1,
        duration: 0.35,
      },
      0
    );

    tl.to(
      panel,
      {
        x: "0%",
        duration: 0.65,
      },
      0
    );

    tl.fromTo(
      menuLinks,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
      },
      0.25
    );

    timelineRef.current = tl;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.play();
    } else {
      document.body.style.overflow = "";

      tl.reverse().then(() => {
        gsap.set(overlay, {
          display: "none",
        });
      });
    }

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={onClose}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation drawer"
    >
      <aside
        ref={panelRef}
        className={styles.panel}
        onClick={(event) => event.stopPropagation()}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className={styles.panelHeader}>
          <span className={styles.menuLabel}>MENU</span>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <span />
            <span />
          </button>
        </div>

        {/* Navigation */}
        <nav
          ref={linksRef}
          className={styles.navigation}
          aria-label="Mobile navigation"
        >
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${
                index === 0 ? styles.active : ""
              }`}
              onClick={onClose}
            >
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.label}>{item.label}</span>

              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className={styles.footer}>
          <p>Have a project in mind?</p>

          <Link href="#contact" className={styles.cta} onClick={onClose}>
            Let&apos;s Talk
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
