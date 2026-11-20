import styles from "./AboutPage.module.scss";

interface Pillar {
  number: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "User Psyche & Empathy",
    description:
      "We design for real people, not for our own egos. Putting ourselves in the user's shoes allows us to decode friction, anticipate desire, and craft effortless digital paths.",
  },
  {
    number: "02",
    title: "Form Meets Function",
    description:
      "We never sacrifice performance for decoration. Striking aesthetics must be reinforced with rock-solid code, sub-second latency, and intuitive utility.",
  },
  {
    number: "03",
    title: "The Search for Meaning",
    description:
      "In a crowded world of noise and cookie-cutter designs, our north star is meaning. We distill brands to their sharpest truth so they stand out and endure.",
  },
  {
    number: "04",
    title: "Digital Storytelling",
    description:
      "Design is modern narrative. From typography hierarchy to fluid page transitions, we tell stories that build emotional resonance and long-term brand equity.",
  },
  {
    number: "05",
    title: "Symphony of Tech & Art",
    description:
      "Like an orchestral symphony where each instrument elevates the next, our engineering, AI solutions, and creative design work as one synchronized powerhouse.",
  },
  {
    number: "06",
    title: "Curiosity & High Standards",
    description:
      "We maintain an obsessive pursuit of perfection paired with relentless curiosity. We believe building should be inspiring, energetic, and intellectually rewarding.",
  },
];

export default function AboutPhilosophy() {
  return (
    <section
      className={styles.philosophySection}
      aria-labelledby="philosophy-heading"
    >
      <div className={styles.container}>
        <div className={styles.sectionHeaderCenter}>
          <div className={styles.sectionEyebrow}>
            <span className={styles.eyebrowDot} />
            <span>OUR CORE PILLARS</span>
          </div>

          <h2 id="philosophy-heading" className={styles.sectionHeadingMedium}>
            The Philosophy Behind Every Pixel
            <span className={styles.accentDot}>.</span>
          </h2>

          <p className={styles.sectionSubtitle}>
            Inspired by a disciplined pursuit of craftsmanship, here is how we
            think, build, and collaborate.
          </p>
        </div>

        <div className={styles.philosophyGrid}>
          {pillars.map((pillar) => (
            <div key={pillar.number} className={styles.philosophyCard}>
              <div className={styles.cardTopRow}>
                <span className={styles.cardPillarNum}>{pillar.number}</span>
                <span className={styles.cardPillarIcon}>✦</span>
              </div>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.cardDescription}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
