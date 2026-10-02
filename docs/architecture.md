# SHRUTI BLOGS — Architecture & System Design Documentation

## 1. System Architecture Overview

**Shruti Blogs** is built on a full-stack Next.js App Router architecture powered by Prisma ORM and TypeScript. It unifies a high-end public editorial publication with a full-featured SaaS-grade content management system (Admin CMS).

```
                      SHRUTI BLOGS PLATFORM
                                │
        ┌───────────────────────┴───────────────────────┐
        │                                               │
   PUBLIC WEB                                       ADMIN CMS
   - Editorial Homepage (Hero/Trending)             - Real-time Analytics & Views Chart
   - Deep-Dive Article Reader                       - Markdown/WYSIWYG Post Editor
   - Category & Tag Taxonomy                        - Category & Tag CRUD
   - Multi-Entity Search Modal                      - Comment Moderation Hub
   - Threaded Discussions & Likes                   - Media Asset Library
   - Reader Bookmarks Hub                           - User & Role Authorization Guard
   - Newsletter Dispatch Subscription               - Security Audit Logs
        │                                               │
        └───────────────────────┬───────────────────────┘
                                │
                        MODULAR API LAYER
   /api/auth       /api/posts       /api/categories  /api/tags
   /api/comments   /api/bookmarks   /api/newsletter  /api/media
   /api/analytics  /api/search      /api/settings    /api/audit
                                │
                    PRISMA ORM DATA ACCESS LAYER
                                │
                    RELATIONAL DATABASE (SQLite / PG)
```

---

## 2. Entity Model & Relations

- **User**: Authentication, roles (`SUPER_ADMIN`, `ADMIN`, `EDITOR`, `AUTHOR`, `MODERATOR`, `READER`), status (`ACTIVE`, `SUSPENDED`).
- **AuthorProfile**: Linked 1-to-1 with User. Display name, bio, avatar, verified byline, social links JSON.
- **Category**: Slug routing, description, cover illustration, and dynamic published post count cache.
- **Tag**: Many-to-many relationship with `Post` via `PostTag`.
- **Post**: Comprehensive publication record: title, slug, excerpt, content, featuredImage, readingTime, viewCount, likeCount, bookmarkCount, commentCount, SEO title/description, status (`DRAFT`, `SCHEDULED`, `PUBLISHED`, `ARCHIVED`), visibility.
- **Comment**: Threaded discussions with parent/replies relation, status (`PENDING`, `APPROVED`, `REJECTED`, `SPAM`), XSS sanitization.
- **Bookmark**: Unique compound key `[userId, postId]` for persistent reader saving.
- **NewsletterSubscriber**: Email collection with active/unsubscribed state.
- **Media**: Uploaded/registered asset records with URLs, mime types, file sizes, and alt text.
- **AnalyticsEvent**: Pageviews, post views, search queries, devices, referrers, and browsers with timestamp indexing.
- **AuditLog**: Administrative action history recording actor, entity, entity ID, metadata JSON, IP, and timestamp.
- **SiteSetting**: Key-value JSON storage for platform settings, SEO defaults, and moderation policy.

---

## 3. Role & Permission Hierarchy

| Role | Hierarchy Level | Capabilities |
|---|---|---|
| **SUPER_ADMIN** | 100 | Complete system control, user role management, system settings. |
| **ADMIN** | 80 | Full content, users, media, analytics, settings, and audit log access. |
| **EDITOR** | 60 | Manage all posts, categories, tags, comments, and newsletter lists. |
| **AUTHOR** | 40 | Create, draft, edit own posts, upload media, update author profile. |
| **MODERATOR** | 30 | Approve, reject, spam, or delete reader comments. |
| **READER** | 10 | Read public articles, save bookmarks, post comments. |

---

## 4. Default Seed Credentials (Development)

- **Admin Account**: `admin@shrutiblogs.com` / `Admin@123456` (Role: `SUPER_ADMIN`)
- **Editor Account**: `editor@shrutiblogs.com` / `Editor@123456` (Role: `EDITOR`)
- **Author Account**: `author@shrutiblogs.com` / `Author@123456` (Role: `AUTHOR`)
- **Reader Account**: `reader@shrutiblogs.com` / `Reader@123456` (Role: `READER`)
