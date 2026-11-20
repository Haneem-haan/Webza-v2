"use client";

import Image from "next/image";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TwitterXIcon,
} from "@/components/ui/Icons";
import styles from "./AboutPage.module.scss";

export interface Founder {
  id: string;
  name: string;
  designation: string;
  role: string;
  bio: string;
  focusTags: string[];
  photoUrl?: string; // Easily replace with your photo: e.g. "/team/haneem.jpg" or Cloudinary URL
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

export const founders: Founder[] = [
  {
    id: "haneem",
    name: "Haneem",
    designation: "Co-Founder",
    role: "Full-Stack Engineering, Tech & AI Solutions",
    bio: "Architect of Webza's technical infrastructure. Haneem is obsessed with clean systems, sub-second load times, and production-grade reliability. He bridges complex engineering with fluid micro-interactions, leveraging modern full-stack stacks and AI solutions to build platforms that scale effortlessly.",
    focusTags: [
      "Full-Stack Architecture",
      "Next.js / React",
      "AI Solutions",
      "Performance & Systems",
    ],
    // photoUrl: "/images/team/haneem.jpg", // Add your photo here when ready
    socials: {
      linkedin: "https://www.linkedin.com/in/haneem",
      github: "https://github.com",
      twitter: "https://x.com",
      email: "mailto:haneem@webza.in",
    },
  },
  {
    id: "fazih",
    name: "Fazih",
    designation: "Co-Founder",
    role: "Creative Direction, Brand Strategy & UI/UX",
    bio: "Curator of Webza's aesthetic poise. Fazih leads brand design, user interfaces, and visual systems. With a sharp eye for minimalist balance, tactile typography, and emotional resonance, he crafts brand identities that capture immediate attention and command market authority.",
    focusTags: [
      "Creative Direction",
      "Brand Strategy",
      "UI/UX Architecture",
      "Design Systems",
    ],
    // photoUrl: "/images/team/fazih.jpg", // Add your photo here when ready
    socials: {
      linkedin: "https://www.linkedin.com/in/fazih",
      twitter: "https://x.com",
      email: "mailto:fazih@webza.in",
    },
  },
  {
    id: "sarin",
    name: "Sarin",
    designation: "Co-Founder",
    role: "Product Strategy, Client Partnerships & Growth",
    bio: "The strategist connecting creative vision with commercial momentum. Sarin oversees client partnerships, product roadmaps, and delivery execution. Passionate about real-world value, he ensures every project meets measurable business goals while exceeding client expectations.",
    focusTags: [
      "Product Strategy",
      "Client Partnerships",
      "Product Roadmaps",
      "Growth & Operations",
    ],
    // photoUrl: "/images/team/sarin.jpg", // Add your photo here when ready
    socials: {
      linkedin: "https://www.linkedin.com/in/sarin",
      twitter: "https://x.com",
      email: "mailto:sarin@webza.in",
    },
  },
];

export default function FoundersSection() {
  return (
    <section
      className={styles.foundersSection}
      id="founders"
      aria-labelledby="founders-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>
            <span className={styles.eyebrowDot} />
            <span>LEADERSHIP &amp; VISION</span>
          </div>

          <h2 id="founders-heading" className={styles.sectionHeadingMedium}>
            Meet the Minds Behind Webza
            <span className={styles.accentDot}>.</span>
          </h2>

          <p className={styles.sectionSubtitle}>
            The trio uniting engineering precision, creative direction, and
            strategic product delivery to bring ideas to life.
          </p>
        </div>

        <div className={styles.foundersGrid}>
          {founders.map((founder) => (
            <article key={founder.id} className={styles.founderCard}>
              {/* Portrait Showcase */}
              <div className={styles.portraitWrap}>
                {founder.photoUrl ? (
                  <div className={styles.portraitPlaceholder}>
                    <Image
                      src={founder.photoUrl}
                      alt={`${founder.name} — ${founder.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover"
                    />
                    <span className={styles.portraitBadge}>
                      {founder.designation}
                    </span>
                  </div>
                ) : (
                  <div
                    className={styles.portraitPlaceholder}
                    aria-label={`Portrait placeholder for ${founder.name}`}
                  >
                    <div className={styles.portraitPattern} />
                    <span className={styles.portraitMonogram}>
                      {founder.name.charAt(0)}
                    </span>
                    <span className={styles.portraitBadge}>
                      {founder.designation}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio & Details */}
              <div className={styles.founderBody}>
                <div className={styles.founderHeader}>
                  <h3 className={styles.founderName}>{founder.name}</h3>
                  <p className={styles.founderRole}>{founder.role}</p>
                </div>

                <p className={styles.founderBio}>{founder.bio}</p>

                {/* Focus Badges */}
                <div className={styles.founderFocusTags}>
                  {founder.focusTags.map((tag) => (
                    <span key={tag} className={styles.focusTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Connect */}
                <div className={styles.founderSocials}>
                  {founder.socials.linkedin && (
                    <a
                      href={founder.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label={`${founder.name} on LinkedIn`}
                      title="LinkedIn"
                    >
                      <LinkedinIcon size={14} />
                    </a>
                  )}

                  {founder.socials.github && (
                    <a
                      href={founder.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label={`${founder.name} on GitHub`}
                      title="GitHub"
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}

                  {founder.socials.twitter && (
                    <a
                      href={founder.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label={`${founder.name} on X`}
                      title="X (Twitter)"
                    >
                      <TwitterXIcon size={13} />
                    </a>
                  )}

                  {founder.socials.email && (
                    <a
                      href={founder.socials.email}
                      className={styles.socialBtn}
                      aria-label={`Email ${founder.name}`}
                      title="Email"
                    >
                      <MailIcon size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
