"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/components/layout/ContactModalProvider";
import { ArrowUpRight } from "@/components/ui/Icons";
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
  const pathname = usePathname();
  const openContactModal = useContactModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const openContactFromNavbar = useCallback(() => {
    closeMobileMenu();
    openContactModal();
  }, [closeMobileMenu, openContactModal]);

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
      setActiveSection(
        pathname === "/work"
          ? "#work"
          : pathname === "/about"
            ? "#about"
            : "#home"
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <header
        className={`${styles.header} ${
          isMobileMenuOpen ? styles.menuOpen : ""
        }`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link
            href={pathname === "/" ? "#home" : "/#home"}
            className={styles.logo}
            aria-label="Webza Home"
          >
            webza<span>.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navigation} aria-label="Main navigation">
            {navigation.map((item) => {
              const href =
                item.href === "#about"
                  ? "/about"
                  : item.href === "#work"
                    ? "/work"
                    : pathname === "/"
                      ? item.href
                      : `/${item.href}`;
              const isActive =
                (pathname === "/about" && item.href === "#about") ||
                (pathname === "/work" && item.href === "#work") ||
                (pathname === "/" && activeSection === item.href);

              return (
                <Link
                  key={item.label}
                  href={href}
                  className={`${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Desktop CTA */}
            <button
              type="button"
              className={styles.talkButton}
              onClick={openContactFromNavbar}
            >
              Let&apos;s Talk
              <span className={styles.talkArrow} aria-hidden="true">
                <ArrowUpRight size={13} strokeWidth={2} />
              </span>
            </button>

            {/* Desktop Circle / Quick Drawer */}
            <button
              type="button"
              className={styles.circleButton}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-label={
                isMobileMenuOpen ? "Close quick menu" : "Open quick menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="navigation-drawer"
            >
              <span />
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="navigation-drawer"
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
        onClose={closeMobileMenu}
      />
    </>
  );
}
