# M/S Nazir Ahmad Mir — Official Corporate Website

A production-ready website for **M/S Nazir Ahmad Mir**, an established government-registered **A Class Contractor** based at **Approach Road, Railway Budgam, Jammu & Kashmir** with **18+ Years of Experience** and **15+ Projects Completed**.

Built with React 19, Vite, Three.js, Resend Serverless API functions, and semantic CSS design tokens supporting Light and Dark modes.

---

## 🏗️ Architecture & Features

- **Static Frontend + Serverless Architecture:** Pure frontend SPA (React + Vite) with zero database overhead. Vercel serverless functions (`api/contact.js` and `api/newsletter.js`) handle email delivery securely.
- **Single Source of Truth:** Centralized configuration at `src/config/company.js`.
- **Three.js 3D Architectural Model:** Procedural 3D construction building with OrbitControls, touch rotation, zoom, auto-rotation, and theme synchronization (Light daylight vs. Dark illuminated night mode). Code-split via `React.lazy()`.
- **Selected Works Multi-Image Slideshow:** 2–3 high-resolution site photographs per project with automatic 3.5s crossfade, pause on hover, manual slide controls, counter badges, and full-screen **Lightbox** modal view.
- **Our Working Approach:** 5-step transparent contractor workflow (Requirement Review, Practical Planning, Execution, Quality & Safety, Handover).
- **Secure Email System (Resend):**
  - Customer contact inquiry sends an instant notification to the engineering desk (`nmir2242@gmail.com`) and a professional confirmation email to the customer.
  - Honeypot spam trap (`_gotcha`) and input sanitization.
  - Secret `RESEND_API_KEY` is kept server-side only in Vercel functions, never leaked to the client bundle.
- **Newsletter System:** Elegant email subscription form near the footer for regional project and tender updates.
- **Floating WhatsApp & Quick-Call:** Accessible bottom-right floating action with prefilled inquiry message (`wa.me/917006080901`) and mobile quick-call action.
- **Authentic J&K Photography:** Uses real photography from site operations in Jammu & Kashmir.
- **Light & Dark Themes:** Fully persistent theme switch with CSS custom properties and system preference detection.
- **Responsive & Accessible:** Fluid from 320px mobile screens to 1920px wide desktop displays, respecting `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 8
- **3D Graphics:** Three.js + OrbitControls (code-split)
- **Email Delivery:** Resend API via Vercel Serverless Functions
- **Icons:** Lucide React
- **Typography:** Google Fonts (`Outfit` for headings, `Inter` for body)
- **Styling:** Semantic CSS Design Tokens (`src/styles/theme.css` and `src/styles/globals.css`)
- **Hosting Target:** Vercel (or any static/serverless host)

---

## 📁 Project Structure

```
├── api/                     # Vercel Serverless Functions
│   ├── contact.js           # Secure inquiry handler + dual Resend emails
│   └── newsletter.js        # Newsletter subscription handler
│
├── public/                  # Static assets served at root
│   ├── favicon.svg          # Brand monogram favicon
│   ├── robots.txt           # Search engine directives
│   ├── site.webmanifest     # Web app manifest
│   └── images/              # High-resolution Kashmir construction photography
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button/
│   │   ├── ContactForm/
│   │   ├── FloatingWhatsApp/
│   │   ├── Footer/
│   │   ├── InteractiveBuilding3D/ # Three.js Canvas with OrbitControls
│   │   ├── Lightbox/        # Full-screen project image modal
│   │   ├── Logo/
│   │   ├── Navbar/
│   │   ├── Newsletter/
│   │   ├── ProjectCard/     # Multi-image slideshow card
│   │   ├── SectionHeading/
│   │   ├── ServiceCard/
│   │   └── ThemeToggle/
│   │
│   ├── config/
│   │   └── company.js       # Central company details & contact info
│   │
│   ├── data/
│   │   ├── projects.js      # Verified project showcase (2-3 images each)
│   │   └── services.js      # Core contracting services data
│   │
│   ├── hooks/
│   │   └── useTheme.js      # Persistent theme state management
│   │
│   ├── sections/            # Page sections
│   │   ├── About/
│   │   ├── Approach/        # 5-step contractor workflow
│   │   ├── Contact/
│   │   ├── CTA/
│   │   ├── Design/          # 3D interactive model & 2D drafting
│   │   ├── Hero/
│   │   ├── Projects/        # Selected works with filter tabs
│   │   ├── Services/
│   │   └── WhyUs/
│   │
│   ├── styles/
│   │   ├── globals.css      # Base resets and utility classes
│   │   └── theme.css        # Semantic light & dark theme tokens
│   │
│   ├── App.jsx              # Main application layout
│   └── main.jsx             # React entry point
│
├── index.html               # HTML entry point with SEO metadata
├── vite.config.js           # Vite configuration with local API middleware
└── package.json
```

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`. The local dev server includes middleware to test `/api/contact` and `/api/newsletter` directly.

### 3. Build for Production
```bash
npm run build
```
Production assets are generated in `dist/`.

---

## 🌐 Deploying to Vercel

The website is optimized for one-click deployment to Vercel:

1. Push your repository to **GitHub**.
2. Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import the GitHub repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Add the following **Environment Variables** in the Vercel dashboard (**Settings > Environment Variables**):
   - `RESEND_API_KEY`: Your secret API key from [resend.com](https://resend.com)
   - `CONTACT_EMAIL`: `nmir2242@gmail.com`
   - `FROM_EMAIL`: `onboarding@resend.dev` (or your verified custom sender domain)
6. Click **Deploy**. Vercel will deploy both the static frontend (`dist/`) and the serverless functions (`api/`).

---

## ⚙️ How to Update Company & Contact Details

All company information is centralized in:
`src/config/company.js`

```javascript
export const companyConfig = {
  companyName: "M/S Nazir Ahmad Mir",
  phone: "+91 7006080901",
  secondaryPhones: ["+91 9622735483", "+91 7006690591"],
  email: "nmir2242@gmail.com",
  whatsapp: "+917006080901",
  address: {
    line1: "Approach Road, Railway Budgam",
    region: "Jammu & Kashmir",
    full: "Approach Road, Railway Budgam, Jammu & Kashmir"
  },
  contractorClass: "A Class Contractor",
  experienceYears: "18+",
  projectCount: "15+"
};
```

---

## 📄 License
© 2026 M/S Nazir Ahmad Mir. All rights reserved.
