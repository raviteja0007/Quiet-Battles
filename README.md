# QUIET BATTLES™ — Premium Fashion E-Commerce Platform

> **"NOT EVERY BATTLE MAKES A SOUND."**  
> **WEAR YOUR BATTLES.**

A cinematic, editorial e-commerce platform and content management system built for **QUIET BATTLES™**, an avant-garde luxury streetwear label merging emotional storytelling, architectural minimalism, and physical resilience.

---

## 🏛️ Project Architecture

```
quiet-battles/
├── client/                     # Frontend Application
│   ├── src/
│   │   ├── admin/             # CMS Console (Dashboard, Series, Chapters, Products, Media, Orders, Login)
│   │   ├── components/        # Reusable UI (NavBar with scroll listener, Footer, Modals)
│   │   ├── context/           # Global Contexts (AuthContext, CartContext with localStorage)
│   │   ├── layouts/           # MainLayout (Public) & AdminLayout (RBAC Protected)
│   │   ├── pages/             # Routes: Home, Archive, Series [slug], Chapter [slug], Product [slug], Cart, Checkout, About, Contact
│   │   ├── services/          # Axios API Interceptors & Endpoints
│   │   ├── index.css          # Tailwind Custom Colors, Typography & Scrollbars
│   │   └── App.tsx            # React Router Architecture (16 routes)
│   ├── public/
│   ├── tailwind.config.cjs    # Brand Palette (#0B0B0B, #151515, #F5F2EC, #A5A5A5, #B49A75)
│   ├── vite.config.ts         # Vite Bundler + API Proxy
│   └── vercel.json            # Vercel Deployment Configuration
│
├── server/                     # Backend API & Database
│   ├── src/
│   │   ├── db/                # Drizzle ORM Schema, Neon PostgreSQL connector & Local Store Fallback
│   │   ├── middleware/        # JWT Authentication & RBAC Admin Authorization
│   │   ├── routes/            # REST APIs (Auth, Series, Chapters, Products, Orders, Media, Stats)
│   │   ├── services/          # DataService with Full CRUD & Seed Data
│   │   ├── app.ts             # Express Bootstrap & Middleware
│   │   └── test-api.ts        # Automated End-to-End Test Suite
│   ├── data/                  # Persistent Archival Store
│   ├── render.yaml            # Render Deployment Spec
│   └── tsconfig.json
│
├── .env.example
├── package.json
└── README.md
```

---

## ⚡ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router v6, Lucide React, Axios |
| **Backend** | Node.js, Express.js, TypeScript, REST APIs, Multer, Zod |
| **Database** | PostgreSQL (Neon Database) + Drizzle ORM with Local Persistent Fallback |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs password hashing, Role-Based Access Control |
| **Media Management** | Cloudinary URL registration and multi-image gallery management |
| **Deployment** | Vercel (Frontend), Render (Backend), Neon (Database) |

---

## 🎨 Brand Identity & Design System

- **Primary Background:** `#0B0B0B` (Deep Abyssal Black)
- **Secondary Background:** `#151515` (Architectural Matte Charcoal)
- **Card Background:** `#121212`
- **Primary Typography:** `#F5F2EC` (Warm Alabaster)
- **Secondary Typography:** `#A5A5A5` (Refined Ash)
- **Accent:** `#B49A75` (Dull Kintsugi Gold)
- **Borders:** `#292929`
- **Typography:** Serif (`Cormorant Garamond`) for emotional headlines; Sans-Serif (`Plus Jakarta Sans`) with wide letter spacing (`tracking-[0.25em]`) for metadata and navigation.

---

## 🗺️ Complete Route Manifest (All 16 Required Routes)

### Public Storefront
1. `/` — **Homepage**: Full-screen cinematic hero, brand manifesto, Series 01 spotlight, 3 philosophy blocks (Resilience, Identity, Silent Strength), key garment feature, dynamic footer.
2. `/archive` — **The Archive**: Archival collection master overview.
3. `/archive/series-01` — **Series 01**: The Gentle Armor™ landing page featuring five chronological chapter movements.
4. `/archive/series-01/chapter-01` — **Chapter 01 (The First Scar)**: Immersive narrative essay, editorial photography, quote highlight, product connection, next chapter pagination.
5. `/product/gentle-armor` — **Product Detail Page**: Multi-angle gallery, interactive size selector (XS-XXL), quantity controls, Add to Cart, material specifications, fabric & care, related chapter.
6. `/cart` — **Shopping Bag**: Real-time quantity adjustment, item removal, persistent localStorage, subtotal recalculation.
7. `/checkout` — **Demonstration Checkout**: Customer acquisition details, shipping information, order creation, order summary, instant order ID confirmation.
8. `/about` — **Brand Story**: Atelier manifesto, Genesis & Discipline, craftsmanship pillars.
9. `/contact` — **Atelier Inquiries**: Studio addresses (Tokyo, New York, Paris), client communication form.

### Admin CMS Console (Protected via JWT & Role Authorization)
10. `/admin/login` — **Admin Authentication**: Secure login console with evaluation credentials.
11. `/admin/dashboard` — **Overview**: Live KPIs (Total Series, Chapters, Products, Orders, Revenue), and recent order activity feed.
12. `/admin/series` — **Series Management**: Create, edit, delete series, upload cover images, toggle publication status.
13. `/admin/chapters` — **Chapter Management**: Write essays, assign to series, reorder chapters, set cover images, publish/draft.
14. `/admin/products` — **Product Management**: Full catalog CRUD, pricing, stock inventory, size availability, multiple image URLs.
15. `/admin/media` — **Media Asset Console**: Register Cloudinary URLs or images, copy asset URLs, deletion.
16. `/admin/orders` — **Order Management**: Inspect order items, customer details, and update status (`pending`, `completed`, `cancelled`).

---

## 🔑 Evaluation Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Studio Admin** | `admin@quietbattles.com` | `Password123!` | Full CMS Read/Write/Delete |
| **Customer** | `customer@quietbattles.com` | `Password123!` | Storefront & Ordering |

---

## 🚀 Quick Start (Running Locally)

### 1. Prerequisites
- Node.js 18+ (tested with v20/v22)
- npm 9+

### 2. Installation
From the root `quiet-battles/` directory:

```bash
# Terminal 1 — Start the Backend Server (Port 4000)
cd server
npm run dev

# Terminal 2 — Start the Frontend Application (Port 5173)
cd client
npm run dev
```

- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API Health:** [http://localhost:4000/api/health](http://localhost:4000/api/health)
- **Admin CMS URL:** [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🧪 Verification & Automated Testing

To run the automated backend REST integration tests:

```bash
cd server
npx ts-node src/test-api.ts
```

All 7 test suites pass including:
- Health probe (`/api/health`)
- JWT authentication (`/api/auth/login`)
- Series retrieval (`/api/series`)
- Chapter extraction (`/api/chapters`)
- Product catalog (`/api/products`)
- End-to-end checkout purchase (`/api/orders`)
- Admin metrics retrieval (`/api/stats`)

---

## ☁️ Cloud Deployment Guide

### Deploying Frontend to Vercel
1. Push repository to GitHub.
2. In Vercel, import the `quiet-battles/client` root directory.
3. Framework Preset: **Vite**.
4. Environment Variables:
   - `VITE_API_BASE_URL` = URL of your deployed Render backend.
5. Deploy. The included `client/vercel.json` ensures full SPA client-side routing.

### Deploying Backend to Render
1. In Render, select **New Web Service**.
2. Point to the `quiet-battles/server` directory.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start`
5. Environment Variables:
   - `JWT_SECRET` = `<your-secure-random-string>`
   - `DATABASE_URL` = `<your-neon-postgres-connection-string>`
   - `CLOUDINARY_CLOUD_NAME` = `<your-cloud-name>`
   - `CLOUDINARY_API_KEY` = `<your-api-key>`
   - `CLOUDINARY_API_SECRET` = `<your-api-secret>`
   *(Note: If `DATABASE_URL` is omitted, the server operates reliably in persistent local store mode).*

---

## 📄 License

MIT © 2026 QUIET BATTLES™ ENTERPRISE. All Rights Reserved.
