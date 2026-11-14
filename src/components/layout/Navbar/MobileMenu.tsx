"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useContactModal } from "@/components/layout/ContactModalProvider";
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
  const openContactModal = useContactModal();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="navigation-drawer"
      className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
      onClick={onClose}
      aria-hidden={!isOpen}
      inert={!isOpen}
      role="dialog"
      aria-modal={isOpen}
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
            ref={closeButtonRef}
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
        <nav className={styles.navigation} aria-label="Mobile navigation">
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

          <button
            type="button"
            className={styles.cta}
            onClick={() => {
              onClose();
              openContactModal();
            }}
          >
            Let&apos;s Talk
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
