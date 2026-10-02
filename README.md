# SHRUTI BLOGS — Enterprise Commercial Blogging & Content Management Platform

> **Shruti Blogs** is a production-grade commercial editorial publication and content management platform built with **Next.js 14 (App Router)**, **Prisma ORM**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

### A. Public Editorial Publication
- **Editorial Homepage**: Hero article showcase, Trending stories algorithm, Track/Category Explorer, Latest essays stream, and newsletter dispatch.
- **Deep-Dive Article Reader**: High-contrast typography, reading time estimations, author bio spotlight, interactive table of contents, like and bookmark controls, and related articles grid.
- **Real Multi-Entity Search**: Live instant search modal across articles, categories, tags, and authors with keyboard shortcut (Cmd+K).
- **Threaded Community Discussions**: Nested reader comments with XSS sanitization and role badges.
- **Reader Hub**: Bookmarks and reading list with one-click removal.
- **Dynamic SEO & Syndication**: Automatic JSON-LD `BlogPosting` schema, OpenGraph & Twitter preview cards, dynamic XML sitemap (`/sitemap.xml`), robots directive (`/robots.txt`), and RSS 2.0 feed (`/feed.xml`).

### B. SaaS-Grade Admin CMS (`/admin`)
- **Dashboard Overview**: Real-time database metrics (Total Posts, Published, Drafts, Scheduled, Pageviews, Comments, Subscribers) and daily pageviews velocity chart.
- **Post Management**: Post catalogue with status filters (Published, Draft, Scheduled, Archived), markdown & WYSIWYG split editor, auto-slug generator, cover image uploader, and Google & Social SERP previews.
- **Category & Tag Taxonomy**: Full CRUD management with slug validation and article association counts.
- **Comment Moderation Hub**: Tabbed moderation queues (Pending, Approved, Rejected, Spam) with one-click status transitions.
- **Media Asset Library**: Image management with direct URL registration and CDN clipboard copying.
- **User & Role Administration**: Role-based access control (`SUPER_ADMIN`, `ADMIN`, `EDITOR`, `AUTHOR`, `MODERATOR`, `READER`) and account suspension controls.
- **Traffic & Performance Analytics**: In-depth analytics with device distribution and inbound referral channel tracking.
- **Security Audit Logs**: Chronological immutable log of all staff operations with actor, entity, IP, and timestamp.
- **Platform Settings**: Branding, contact emails, and community moderation policies.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` (already pre-configured for local development):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="shruti-blogs-super-secret-jwt-token-key-2026-production"
JWT_EXPIRES_IN="7d"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Shruti Blogs"
```

### 3. Setup Database & Seed
```bash
npx prisma generate
npx prisma db push
npx tsx src/lib/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public publication, or [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin CMS.

---

## 🔑 Demo Staff & Reader Accounts

| Account | Email | Password | Role |
|---|---|---|---|
| **Super Admin** | `admin@shrutiblogs.com` | `Admin@123456` | `SUPER_ADMIN` |
| **Editor** | `editor@shrutiblogs.com` | `Editor@123456` | `EDITOR` |
| **Author** | `author@shrutiblogs.com` | `Author@123456` | `AUTHOR` |
| **Reader** | `reader@shrutiblogs.com` | `Reader@123456` | `READER` |

---

## 📦 Project Structure

```
├── prisma/
│   └── schema.prisma         # Complete relational schema (User, Post, Category, Comment, etc.)
├── src/
│   ├── app/
│   │   ├── (public)/         # Editorial routes (/, /blog, /category, /author, /search, etc.)
│   │   ├── admin/            # Admin CMS (/admin, /admin/posts, /admin/analytics, etc.)
│   │   ├── api/              # Modular API endpoints (/api/auth, /api/posts, /api/media, etc.)
│   │   ├── sitemap.ts        # Dynamic Next.js sitemap
│   │   ├── robots.ts         # Robots directive
│   │   └── feed.xml/         # RSS 2.0 XML route
│   ├── components/
│   │   ├── Admin/            # Admin CMS UI components
│   │   └── Public/           # Editorial publication UI components
│   ├── contexts/             # AuthContext and AuthModalContext
│   └── lib/                  # Prisma client, Auth utilities, Audit logger, and Zod schemas
└── docs/                     # System architecture and design documentation
```

---

## 🛡️ Security & Quality Standards
- **Server-Side Authorization**: API routes and Admin views verify token claims and role permissions server-side.
- **XSS Sanitization**: User comments sanitized with `sanitize-html`.
- **Database Indexing**: Composite indexes on slugs, publication timestamps, and status fields.
- **Type Safety**: End-to-end TypeScript with Zod runtime payload validation.
