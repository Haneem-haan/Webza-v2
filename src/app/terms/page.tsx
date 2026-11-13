import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Webza Digital Creative Studio.",
};

export default function TermsAndConditions() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "120px 24px 80px",
        color: "#f5f5f5",
        fontFamily: "var(--font-epilogue), sans-serif",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "#ffd21f",
          marginBottom: "32px",
          textDecoration: "none",
          fontSize: "0.9rem",
        }}
      >
        ← Back to Home
      </Link>
      <h1
        style={{
          fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
          fontWeight: 300,
          marginBottom: "24px",
          letterSpacing: "-0.03em",
        }}
      >
        Terms &amp; Conditions
      </h1>
      <p style={{ color: "rgba(245, 245, 245, 0.7)", lineHeight: 1.7, marginBottom: "20px" }}>
        Last updated: November 2026
      </p>
      <section style={{ lineHeight: 1.8, color: "rgba(245, 245, 245, 0.85)" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 500, margin: "28px 0 12px", color: "#f5f5f5" }}>
          1. Agreement to Terms
        </h2>
        <p>
          By accessing or using our services, you agree to be bound by these Terms and Conditions.
        </p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 500, margin: "28px 0 12px", color: "#f5f5f5" }}>
          2. Intellectual Property
        </h2>
        <p>
          All creative designs, trademarks, and code created by Webza remain the intellectual property of their respective owners in accordance with individual project contracts.
        </p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 500, margin: "28px 0 12px", color: "#f5f5f5" }}>
          3. Governing Law
        </h2>
        <p>
          These terms are governed by the laws of India.
        </p>
      </section>
    </div>
  );
}
