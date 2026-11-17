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
  - Hero video autoplay with muted, looping, inline playback.
  - Web font optimization via `next/font/google` (`Epilogue`), serving self-hosted `.woff2` subsets with zero external CDN round-trips.
- **Dynamic Portfolio**: Authenticated administrators upload, edit, publish, and remove projects from a MySQL-backed portfolio; images are stored in Cloudinary.
- **Administrator Access**: Better Auth email/password sign-in with public sign-up disabled and support for multiple administrators.
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
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Database**: MySQL via `mysql2`
- **Image storage**: [Cloudinary](https://cloudinary.com/)

---

## 📂 Project Structure

```
webza/
├── public/
│   ├── images/         # Compressed WebP/JPEG/PNG assets
│   └── videos/         # Hero video showcase
├── database/
│   └── projects.sql    # Portfolio projects table
├── src/
│   ├── app/            # App Router pages, layout, robots, and sitemap
│   │   ├── privacy-policy/
│   │   ├── terms/
│   │   ├── admin/      # Administrator project dashboard
│   │   ├── api/        # Authentication and portfolio APIs
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/     # Modular React components
│   │   ├── Admin/
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

### 2. Configure Portfolio Services

Copy `.env.example` to `.env.local`, then set the MySQL, Better Auth, and Cloudinary values. Generate a unique authentication secret with:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
```

For local development, set `BETTER_AUTH_URL` to `http://localhost:3000`. Apply `database/projects.sql` to the selected MySQL database, then create the Better Auth tables and the first administrator:

```bash
npx auth@latest migrate
npx auth@latest create-admin --email admin@example.com --name "Webza Admin" --role admin
```

The CLI prompts for the initial admin password. Sign in at `/admin`; existing administrators can create additional admin accounts there. Public account registration is disabled.

On Hostinger, add these environment variables in the Node.js app settings before running the migration commands. Apply `database/projects.sql` to the same MySQL database, and keep Cloudinary credentials and the Better Auth secret private.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### 4. Production Build & Linting
```bash
# Run ESLint checks
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```
