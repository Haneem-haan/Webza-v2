import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Webza Digital Creative Studio.",
};

export default function PrivacyPolicy() {
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
        Privacy Policy
      </h1>
      <p style={{ color: "rgba(245, 245, 245, 0.7)", lineHeight: 1.7, marginBottom: "20px" }}>
        Last updated: November 2026
      </p>
      <section style={{ lineHeight: 1.8, color: "rgba(245, 245, 245, 0.85)" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 500, margin: "28px 0 12px", color: "#f5f5f5" }}>
          1. Information We Collect
        </h2>
        <p>
          Webza collects information that you provide directly to us when contacting us about projects, including your name, email address, company details, and project requirements.
        </p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 500, margin: "28px 0 12px", color: "#f5f5f5" }}>
          2. How We Use Information
        </h2>
        <p>
          We use the information we collect to communicate with you, respond to inquiries, deliver digital services, and optimize client experiences.
        </p>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 500, margin: "28px 0 12px", color: "#f5f5f5" }}>
          3. Contact Us
        </h2>
        <p>
          If you have questions about this Privacy Policy, please email us at hello@webza.in.
        </p>
      </section>
    </div>
  );
}
