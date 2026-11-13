# Webza — Digital Creative Studio

A high-performance, design-forward website for **Webza**, a digital creative studio specializing in web design, development, and brand identity.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **SCSS Modules**, and **GSAP**.

---

## 🚀 Features & Architecture

- **Next.js 16 App Router**: Server and client component optimization with static generation and full TypeScript safety.
- **Lenis Smooth Inertia Scrolling**: Smooth scroll experience with native inertia and anchor link auto-offsetting, automatically disabled when `prefers-reduced-motion` is active.
- **Micro-Interactions & GSAP**: Coordinated slideout navigation drawer with staggered link reveals and focus management.
- **Optimized Media Delivery**:
  - WebP/AVIF automated resizing via `next/image` with responsive `sizes` attributes.
  - Video loading optimization with `preload="metadata"` and accessible play/pause controls (WCAG 2.2.2).
  - Web font optimization via `next/font/google` (`Epilogue`), serving self-hosted `.woff2` subsets with zero external CDN round-trips.
- **Responsive & Accessible (A11y)**:
  - Skip to main content link for keyboard navigation.
  - ARIA attributes, semantic headings, and accessible button/link labels.
  - Device-responsive carousels (dynamic multi-card desktop and full-card mobile sliding).
- **SEO Ready**:
  - Full OpenGraph and Twitter card metadata.
  - Automated `robots.txt` and `sitemap.xml` routes.
  - Schema.org (`ProfessionalService`) JSON-LD structured data.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: SCSS Modules (`sass`) with centralized design tokens & typography scale
- **Animation**: [GSAP](https://greensock.com/gsap/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)

---

## 📂 Project Structure

```
webza/
├── public/
│   ├── images/         # Compressed WebP/JPEG/PNG assets
│   └── videos/         # Hero video showcase
├── src/
│   ├── app/            # App Router pages, layout, robots, and sitemap
│   │   ├── privacy-policy/
│   │   ├── terms/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/     # Modular React components
│   │   ├── About/
│   │   ├── CTA/
│   │   ├── Footer/
│   │   ├── home/Hero/
│   │   ├── layout/Navbar/
│   │   ├── layout/SmoothScroll.tsx
│   │   ├── Process/
│   │   ├── Services/
│   │   ├── Testimonials/
│   │   └── Work/
│   └── styles/         # Global styles, variables, mixins, and typography
└── package.json
```

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### 3. Production Build & Linting
```bash
# Run ESLint checks
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```
