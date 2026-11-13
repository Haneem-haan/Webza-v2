"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import MobileMenu from "./MobileMenu";

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = navigation.map((item) => item.href.replace("#", ""));
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sectionIds[i]}`);
          return;
        }
      }
      setActiveSection("#home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="#home" className={styles.logo} aria-label="Webza Home">
            webza<span>.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navigation} aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${
                  activeSection === item.href ? styles.active : ""
                }`}
                aria-current={activeSection === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Desktop CTA */}
            <Link href="#contact" className={styles.talkButton}>
              Let&apos;s Talk
              <span aria-hidden="true">↗</span>
            </Link>

            {/* Desktop Circle / Quick Drawer */}
            <button
              type="button"
              className={styles.circleButton}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open quick menu"
            >
              <span />
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Side Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
