"use client";

import { useRef, useEffect } from "react";
import styles from "./CheckGridSection.module.scss";

export default function CheckGridSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastClientX = -1;
    let lastClientY = -1;

    const updateSpotlight = (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isInside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInside) {
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        el.style.setProperty("--mouse-x", `${x}px`);
        el.style.setProperty("--mouse-y", `${y}px`);
        el.style.setProperty("--spotlight-opacity", "0.38");
      } else {
        el.style.setProperty("--spotlight-opacity", "0");
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      updateSpotlight(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (lastClientX >= 0 && lastClientY >= 0) {
        updateSpotlight(lastClientX, lastClientY);
      }
    };

    const handlePointerLeaveDoc = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        const el = containerRef.current;
        if (el) el.style.setProperty("--spotlight-opacity", "0");
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("pointerout", handlePointerLeaveDoc, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerout", handlePointerLeaveDoc);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.checkGridSection}>
      {/* Continuous Base Check Grid across whole section */}
      <div className={styles.baseGrid} aria-hidden="true" />

      {/* Interactive Golden Check Grid Overlay */}
      <div className={styles.goldenGridOverlay} aria-hidden="true" />

      {/* Content Canvas (About + Process) */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
