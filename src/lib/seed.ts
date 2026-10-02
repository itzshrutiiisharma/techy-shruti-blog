import { prisma } from './prisma';
import { hashPassword } from './auth';
import { slugify, calculateReadingTime } from './slugify';

export async function runSeed() {
  console.log('[Seed] Starting database seeding for Techy.Shruti Blogs...');

  // 1. Clean existing database
  await prisma.auditLog.deleteMany();
  await prisma.analyticsEvent.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.postTag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.authorProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.siteSetting.deleteMany();

  // 2. Create Users
  const adminPassword = await hashPassword('Admin@123456');
  const editorPassword = await hashPassword('Editor@123456');
  const authorPassword = await hashPassword('Author@123456');
  const readerPassword = await hashPassword('Reader@123456');

  const shrutiUser = await prisma.user.create({
    data: {
      name: 'Techy Shruti',
      email: 'techyshruti@gmail.com',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    },
  });

  const editorUser = await prisma.user.create({
    data: {
      name: 'Vikram Malhotra',
      email: 'editor@techyshruti.dev',
      passwordHash: editorPassword,
      role: 'EDITOR',
      status: 'ACTIVE',
      emailVerified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    },
  });

  const aaravUser = await prisma.user.create({
    data: {
      name: 'Aarav Patel',
      email: 'aarav@techyshruti.dev',
      passwordHash: authorPassword,
      role: 'AUTHOR',
      status: 'ACTIVE',
      emailVerified: true,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    },
  });

  const readerUser = await prisma.user.create({
    data: {
      name: 'Rohan Sharma',
      email: 'rohan.dev@gmail.com',
      passwordHash: readerPassword,
      role: 'READER',
      status: 'ACTIVE',
      emailVerified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    },
  });

  // 3. Create Author Profiles
  const shrutiProfile = await prisma.authorProfile.create({
    data: {
      userId: shrutiUser.id,
      displayName: 'Techy Shruti',
      slug: 'techy-shruti',
      bio: 'Software Developer, AI Enthusiast & Tech Creator. Writing detailed gadget reviews, Next.js tutorials, AI coding tool guides, and developer productivity hacks.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      socialLinks: JSON.stringify({
        twitter: 'https://twitter.com/techyshruti',
        youtube: 'https://youtube.com/@techyshruti',
        instagram: 'https://instagram.com/techyshruti',
        github: 'https://github.com/techyshruti',
        linkedin: 'https://linkedin.com/in/techyshruti',
      }),
      website: 'https://techyshruti.dev',
      isActive: true,
    },
  });

  const aaravProfile = await prisma.authorProfile.create({
    data: {
      userId: aaravUser.id,
      displayName: 'Aarav Patel',
      slug: 'aarav-patel',
      bio: 'Hardware Specialist & Senior Systems Engineer. Reviewing M4 Apple Silicon setups, mechanical keyboards, and developer workstation ergonomics.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      socialLinks: JSON.stringify({
        twitter: 'https://twitter.com/aaravtech',
        github: 'https://github.com/aaravpatel',
      }),
      website: 'https://aarav.tech',
      isActive: true,
    },
  });

  // 4. Create Categories
  const categoriesData = [
    {
      name: 'AI & Smart Tools',
      slug: 'ai-smart-tools',
      description: 'Exploring LLMs, AI coding agents, Cursor AI, DeepSeek R1, ChatGPT 5, and developer productivity tools.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Web Dev & Frameworks',
      slug: 'web-dev-frameworks',
      description: 'Next.js 15, React 19, TypeScript, Tailwind CSS, and modern full-stack web application development.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tech Setup & Gadgets',
      slug: 'tech-setup-gadgets',
      description: 'Honest reviews of developer laptops, M4 MacBooks, mechanical keyboards, 4K monitors, and studio setups.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Coding & Tutorials',
      slug: 'coding-tutorials',
      description: 'Step-by-step programming guides, Python tricks, JavaScript secrets, API integrations, and code optimization.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    },
    {
      name: 'Tech Career & Creator',
      slug: 'tech-career-creator',
      description: 'How to land remote dev jobs, building in public, creator gear, freelancing, and growing your tech career.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categories.push(created);
  }

  // 5. Create Tags
  const tagNames = [
    'Cursor AI', 'Next.js 15', 'React 19', 'MacBook M4', 'AI Tools',
    'JavaScript', 'Python', 'Web Dev', 'Developer Setup', 'Tech Career'
  ];

  const tags: Record<string, any> = {};
  for (const name of tagNames) {
    const tag = await prisma.tag.create({
      data: {
        name,
        slug: slugify(name),
      },
    });
    tags[name] = tag;
  }

  // 6. Create Articles (Techy Shruti Content)
  const articlesData = [
    {
      title: 'Cursor AI vs VS Code in 2026: Why Every Web Developer is Switching',
      slug: 'cursor-ai-vs-vs-code-2026-why-web-developers-are-switching',
      excerpt: 'Is Cursor AI really replacing traditional IDEs? A deep dive into AI rules, auto-imports, multi-file code editing, and real-world productivity benchmark tests by Techy Shruti.',
      content: `## The AI-Powered Editor Shift

Over the past year, the developer experience has fundamentally shifted. Traditional code editors with basic autocomplete are rapidly being replaced by context-aware AI pairing tools like **Cursor AI**.

In this article, we put Cursor AI side-by-side with Microsoft VS Code to see if the hype is justified for everyday web development.

\`\`\`typescript
// Example of Cursor AI Agent Rule (.cursorrules)
export const cursorRules = {
  projectStyle: "Next.js 15 App Router with Tailwind CSS",
  typescriptStrict: true,
  componentConvention: "Functional components with named exports",
  rules: [
    "Always specify precise types for component props",
    "Never import unused icons from lucide-react",
    "Prefer Server Components unless state hooks are required"
  ]
};
\`\`\`

### 1. Multi-File Editing (Composer Mode)
The single biggest feature that makes Cursor AI feel like magic is **Composer**. Unlike traditional Copilot inline completions, Composer can understand your entire project workspace, modify multiple files simultaneously, and run shell verification commands automatically.

### 2. Deep Context Indexing (.cursorrules)
By providing custom project rules, Cursor understands your code conventions, styling tokens, and API contracts. It never suggests deprecated patterns or out-of-date syntax.

### 3. Productivity Benchmark Results
- **Refactoring Time**: Reduced by **64%**
- **Boilerplate Creation**: Reduced by **85%**
- **Bug Diagnoses**: Solved in 2-3 prompt iterations

> *"Cursor AI doesn't write code for you—it acts as a senior pair programmer that instantly handles the mechanical implementation so you can focus on architecture and user experience."*`,
      featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      authorId: shrutiProfile.id,
      categoryId: categories[0].id, // AI & Smart Tools
      tags: ['Cursor AI', 'AI Tools', 'Web Dev', 'Next.js 15'],
      status: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      viewCount: 6840,
      likeCount: 520,
      bookmarkCount: 310,
      seoTitle: 'Cursor AI vs VS Code in 2026: The Ultimate Developer Benchmark | Techy Shruti',
      seoDescription: 'Discover why web developers are switching to Cursor AI. In-depth analysis of Composer mode, context indexing, and coding speed.',
    },
    {
      title: 'M4 Pro MacBook Pro Review: The Ultimate Coding Beast for Developers',
      slug: 'm4-pro-macbook-pro-review-ultimate-coding-beast-for-developers',
      excerpt: 'Testing the M4 Pro chip with Next.js production builds, Docker containers, local LLM quantization, and battery endurance under heavy coding workloads.',
      content: `## The New Gold Standard for Mobile Workstations

Apple's M4 Pro silicon brings incredible memory bandwidth and CPU performance efficiency. As someone who constantly compiles Next.js projects while running Docker databases and local AI models, I spent 3 weeks testing the 16-inch M4 Pro.

### Hardware Specifications Tested
- **Processor**: M4 Pro (14-Core CPU, 20-Core GPU)
- **Unified Memory**: 36GB Unified RAM (273 GB/s bandwidth)
- **Display**: Liquid Retina XDR with Nanotexture Glass Option
- **Storage**: 1TB PCIe Gen 4 SSD

\`\`\`bash
# Real-World Next.js Build Benchmark (Large Enterprise App)
M1 Max (32GB): 48.2 seconds
M2 Pro (16GB): 41.5 seconds
M3 Pro (18GB): 35.8 seconds
M4 Pro (36GB): 19.4 seconds  # 🚀 45% Faster than M3 Pro!
\`\`\`

### Key Highlights for Developers
1. **Fan Noise**: Extremely silent even during heavy parallel TypeScript type-checking runs.
2. **Nanotexture Display**: Game changer for coding near window light or outdoor coffee shops.
3. **Battery Life**: Easily delivers 14+ hours of active code editing and browser preview testing.

### Verdict
If you are upgrading from an Intel Mac or base M1/M2 model, the M4 Pro delivers a generational jump that directly saves hours of waiting on builds and container startups.`,
      featuredImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80',
      authorId: aaravProfile.id,
      categoryId: categories[2].id, // Tech Setup & Gadgets
      tags: ['MacBook M4', 'Developer Setup', 'Tech Career'],
      status: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      viewCount: 5410,
      likeCount: 410,
      bookmarkCount: 215,
      seoTitle: 'M4 Pro MacBook Pro Developer Review: Worth Upgrading for Coders? | Techy Shruti',
      seoDescription: 'Honest review of M4 Pro MacBook Pro for software developers, Next.js builds, Docker, and battery life.',
    },
    {
      title: 'Mastering Next.js 15 App Router: Server Actions, React 19 & Dynamic Caching',
      slug: 'mastering-nextjs-15-app-router-server-actions-react-19-dynamic-caching',
      excerpt: 'Everything you need to know about Next.js 15 changes, async request APIs, React Compiler integration, and production deployment patterns.',
      content: `## Next.js 15 is Here!

Next.js 15 introduces key refinements to caching defaults, async request APIs (like \`cookies()\`, \`headers()\`, and \`params\`), and native support for **React 19**.

In this guide, we walk step-by-step through modern full-stack web architecture.

\`\`\`tsx
// Modern Next.js 15 Page Component with Async Params
import { Suspense } from 'react';
import { getPostBySlug } from '@/lib/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-4 text-neutral-600">{post.excerpt}</p>
    </article>
  );
}
\`\`\`

### 1. Un-cached by Default Fetch Calls
In Next.js 15, \`fetch\` requests are no longer cached by default. This makes dynamic data fetching intuitive and prevents stale user data issues in production.

### 2. React 19 Compiler Compatibility
The React Compiler automatically memoizes component outputs, reducing the need for manual \`useMemo\` and \`useCallback\` calls across your codebase.

### 3. Server Actions Best Practices
- Always validate inputs using **Zod** schemas inside Server Actions.
- Return structured status objects rather than throwing unhandled errors to the UI.`,
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
      authorId: shrutiProfile.id,
      categoryId: categories[1].id, // Web Dev & Frameworks
      tags: ['Next.js 15', 'React 19', 'JavaScript', 'Web Dev'],
      status: 'PUBLISHED',
      isFeatured: false,
      isTrending: true,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      viewCount: 4920,
      likeCount: 385,
      bookmarkCount: 190,
      seoTitle: 'Mastering Next.js 15 App Router: Server Actions & React 19 | Techy Shruti',
      seoDescription: 'Complete guide to Next.js 15 App Router, React 19 compiler features, dynamic caching, and async params.',
    },
    {
      title: 'Top 7 AI Tools Every Software Engineer Should Use in 2026',
      slug: 'top-7-ai-tools-every-software-engineer-should-use-2026',
      excerpt: 'From AI terminal assistants and automated code reviewers to prompt-driven UI generators—here are the must-have AI applications for modern coders.',
      content: `## Boosting Developer Velocity with AI

AI tools have evolved far beyond basic chat prompts. Today, developers use dedicated AI extensions and terminal assistants to automate routine workflows.

Here are 7 essential AI tools curated by Techy Shruti:

### 1. Cursor AI (Code Editor)
The leading AI-first IDE with multi-file code editing, terminal error auto-fixing, and workspace context rules.

### 2. Warp Terminal (AI Command Line)
An insanely fast Rust-based terminal with built-in AI command search. Type \`# how to check open ports in windows\` and get instantaneous shell syntax.

### 3. v0 by Vercel (Generative UI)
Create responsive Tailwind CSS and React component prototypes in seconds using natural language prompts.

### 4. DeepSeek R1 & Claude 3.7 Sonnet (Reasoning Models)
Unbeatable models for debugging complex algorithms, database query optimization, and architectural RFC reviews.

### 5. Superhuman AI (Inbox Productivity)
Draft concise technical emails and summarize long bug report threads effortlessly.

### 6. Raycast AI (Mac Launcher & Workflow Automation)
Quick search, snippet generator, and AI assistant available via a single keyboard shortcut.

### 7. CodeRabbit (Automated PR Reviewer)
An AI bot that reviews GitHub Pull Requests, detects potential security vulnerabilities, and highlights performance edge cases.`,
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80',
      authorId: shrutiProfile.id,
      categoryId: categories[0].id, // AI & Smart Tools
      tags: ['AI Tools', 'Cursor AI', 'Python', 'Developer Setup'],
      status: 'PUBLISHED',
      isFeatured: false,
      isTrending: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      viewCount: 4210,
      likeCount: 340,
      bookmarkCount: 180,
      seoTitle: 'Top 7 AI Tools for Software Engineers in 2026 | Techy Shruti',
      seoDescription: 'Explore the top AI tools for coders including Cursor AI, Warp Terminal, v0 by Vercel, and CodeRabbit.',
    },
    {
      title: 'Full-Stack Web Developer Roadmap 2026: Zero to Hired',
      slug: 'full-stack-web-developer-roadmap-2026-zero-to-hired',
      excerpt: 'Techy Shruti’s complete step-by-step roadmap to learning modern HTML/CSS, TypeScript, Next.js, databases, and building portfolio projects that land interviews.',
      content: `## Your Complete 2026 Web Development Learning Guide

Whether you are starting from scratch or transitioning from another field, breaking into web development in 2026 requires mastering modern full-stack skills.

### Phase 1: Core Fundamentals (Weeks 1-4)
- **HTML5 & Modern CSS**: Flexbox, CSS Grid, Responsive Design, CSS Variables.
- **JavaScript (ES6+)**: Async/Await, Array Methods, Closures, DOM Manipulation, Modules.

### Phase 2: TypeScript & Modern Frontend (Weeks 5-8)
- **TypeScript**: Interface vs Type, Generics, Utility Types, Strict Type Checking.
- **React 19**: Components, Props, Hooks (\`useState\`, \`useEffect\`, \`useContext\`), Tailwind CSS.

### Phase 3: Modern Full-Stack Framework (Weeks 9-12)
- **Next.js 15 App Router**: Server Components, Client Components, Dynamic Routing, Server Actions.
- **Databases & ORM**: PostgreSQL, Prisma ORM, Supabase, Neon Database.

### Phase 4: Production Deployment & AI Integration (Weeks 13-16)
- **Authentication**: NextAuth.js / Clerk Auth.
- **AI Tool Integration**: Vercel AI SDK, OpenAI API, Gemini API.
- **Hosting & CI/CD**: Vercel, GitHub Actions.

> *"Focus on building 2-3 high-quality full-stack projects that solve actual problems rather than copying generic tutorial apps."*`,
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      authorId: shrutiProfile.id,
      categoryId: categories[4].id, // Tech Career & Creator
      tags: ['Tech Career', 'Web Dev', 'JavaScript', 'Next.js 15'],
      status: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      viewCount: 3890,
      likeCount: 310,
      bookmarkCount: 165,
      seoTitle: 'Full-Stack Web Developer Roadmap 2026: Zero to Hired | Techy Shruti',
      seoDescription: 'Step-by-step roadmap for learning full-stack web development with React, Next.js 15, TypeScript, and AI tools.',
    },
    {
      title: 'Building My Aesthetic Minimalist Desk Setup for Maximum Focus & Coding',
      slug: 'building-my-aesthetic-minimalist-desk-setup-for-maximum-focus',
      excerpt: 'A tour of Techy Shruti’s studio desk setup—wooden riser, 4K Ultrawide monitor, custom mechanical keyboard, monitor light bar, and cable management hacks.',
      content: `## Designing a Workspace for Deep Work

Your physical environment has a massive impact on your coding efficiency, mood, and long-term posture ergonomics. Today, I am giving a detailed tour of my developer workspace setup!

### Desk & Ergonomics
- **Standing Desk**: Ergonomic Dual-Motor Sit-Stand Desk Frame with Walnut Wood Top.
- **Monitor Riser**: Custom Solid Oak Monitor Stand with Under-Desk Keyboard Shelf.
- **Ergonomic Chair**: Herman Miller Aeron (Size B) with Mesh Lumbar Support.

### Gear & Peripherals
- **Primary Display**: Dell UltraSharp 34" 4K Curved USB-C Hub Monitor.
- **Laptop**: Apple M4 Pro MacBook Pro (Space Black).
- **Keyboard**: Keychron Q1 Pro Wireless Custom Mechanical Keyboard (Banana Tactile Switches).
- **Mouse**: Logitech MX Master 3S for Mac (Quiet Click).
- **Lighting**: BenQ ScreenBar Halo Monitor Light & LIFX Ambient LED Strips.

### Cable Management Hacks
1. Mount a power strip directly to the underside of the desk frame.
2. Use braided cable sleeves and magnetic zip-tie mounts to conceal monitor and laptop cables behind desk legs.
3. Keep desk surface clutter down to 3 items max: Laptop, Monitor, and Plant.`,
      featuredImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&auto=format&fit=crop&q=80',
      authorId: shrutiProfile.id,
      categoryId: categories[2].id, // Tech Setup & Gadgets
      tags: ['Developer Setup', 'MacBook M4', 'Tech Career'],
      status: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      viewCount: 3120,
      likeCount: 260,
      bookmarkCount: 140,
      seoTitle: 'Aesthetic Minimalist Desk Setup for Coders & Creators | Techy Shruti',
      seoDescription: 'Explore Techy Shruti’s minimalist developer desk setup, Keychron keyboard, Dell 4K Ultrawide monitor, and cable management secrets.',
    },
    {
      title: '10 Python Tricks You Didn’t Know Existed (With Code Examples)',
      slug: '10-python-tricks-you-didnt-know-existed-with-code-examples',
      excerpt: 'Boost your Python code quality with walrus operators, dataclasses, structural pattern matching, f-string secrets, and built-in profiling techniques.',
      content: `## Level Up Your Python Skills

Python is known for clean readability, but even experienced developers overlook built-in language capabilities that make code shorter, faster, and more robust.

Here are 5 highlight tricks from our top 10 list:

\`\`\`python
# 1. The Walrus Operator (:=) for Assignment Expressions
if (n := len(user_list)) > 10:
    print(f"Warning: Processing large queue of {n} users")

# 2. Structural Pattern Matching (Python 3.10+)
def process_command(command):
    match command.split():
        case ["git", "commit", "-m", msg]:
            print(f"Committing with message: {msg}")
        case ["git", "push", origin, branch]:
            print(f"Pushing to {origin}/{branch}")
        case _:
            print("Unknown command format")

# 3. Custom F-String Formatting
from datetime import datetime
now = datetime.now()
print(f"Current Time: {now:%Y-%m-%d %H:%M:%S}")

# 4. Built-in Dataclass Slots for Memory Optimization
from dataclasses import dataclass

@dataclass(slots=True)
class UserPoint:
    x: float
    y: float
\`\`\`

### Why Modern Python Matters in AI Era
Python continues to dominate AI development, PyTorch, and backend APIs. Writing clean Python lowers memory footprints and speeds up execution loops.`,
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      authorId: shrutiProfile.id,
      categoryId: categories[3].id, // Coding & Tutorials
      tags: ['Python', 'JavaScript', 'AI Tools'],
      status: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
      viewCount: 2980,
      likeCount: 230,
      bookmarkCount: 110,
      seoTitle: '10 Python Tricks You Didn’t Know Existed | Techy Shruti',
      seoDescription: 'Master Python walrus operators, pattern matching, f-strings, and dataclass slots with practical code snippets.',
    },
    {
      title: 'How I Built & Scaled Techy.Shruti to 100k+ Tech Community Members',
      slug: 'how-i-built-and-scaled-techy-shruti-to-100k-tech-community-members',
      excerpt: 'Behind the scenes of tech blogging, balancing software engineering with content creation, monetization, equipment, and overcoming burnout.',
      content: `## The Story Behind Techy.Shruti

When I published my first tech article 3 years ago, I didn't expect it to grow into a vibrant community of over 100,000 developers, students, and technology enthusiasts across the globe.

### Lessons Learned Building a Tech Publication
1. **Consistency Over Perfection**: Publishing helpful 800-word guides weekly beats spending months polishing a single article that never sees the light of day.
2. **Focus on Real Problems**: Readers don't just want feature lists—they want honest reviews, real code benchmarks, and solutions to real bugs.
3. **Build in Public**: Share your learning journey, mistakes, setup upgrades, and project failures openly.

### My Content Creation Stack
- **Writing & Drafts**: Notion + Obsidian Markdown.
- **Recording & Audio**: Sony A7IV Camera + Shure SM7B Microphone.
- **Editing & Code Demos**: Screen Studio + DaVinci Resolve.
- **Blog Platform**: Next.js 15 + Prisma + Tailwind CSS (Techy.Shruti Blogs).

> *"The best time to share your technical knowledge was yesterday; the second best time is today."*`,
      featuredImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80',
      authorId: shrutiProfile.id,
      categoryId: categories[4].id, // Tech Career & Creator
      tags: ['Tech Career', 'Developer Setup', 'Web Dev'],
      status: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      viewCount: 4580,
      likeCount: 490,
      bookmarkCount: 280,
      seoTitle: 'How I Built & Scaled Techy.Shruti Tech Community | Techy Shruti',
      seoDescription: 'Behind the scenes of Techy Shruti blog, tech creation tools, balancing coding with content, and community growth tips.',
    },
  ];

  const createdPosts = [];
  for (const art of articlesData) {
    const readingTime = calculateReadingTime(art.content);
    const post = await prisma.post.create({
      data: {
        title: art.title,
        slug: art.slug,
        excerpt: art.excerpt,
        content: art.content,
        featuredImage: art.featuredImage,
        authorId: art.authorId,
        categoryId: art.categoryId,
        status: art.status,
        visibility: 'PUBLIC',
        publishedAt: art.publishedAt,
        readingTime,
        viewCount: art.viewCount,
        likeCount: art.likeCount,
        bookmarkCount: art.bookmarkCount,
        isFeatured: art.isFeatured,
        isTrending: art.isTrending,
        seoTitle: art.seoTitle,
        seoDescription: art.seoDescription,
      },
    });

    // Link Tags
    for (const tagName of art.tags) {
      const tag = tags[tagName];
      if (tag) {
        await prisma.postTag.create({
          data: {
            postId: post.id,
            tagId: tag.id,
          },
        });
      }
    }

    createdPosts.push(post);
  }

  // Update Category post counts
  for (const cat of categories) {
    const count = await prisma.post.count({
      where: { categoryId: cat.id, status: 'PUBLISHED' },
    });
    await prisma.category.update({
      where: { id: cat.id },
      data: { postCount: count },
    });
  }

  // 7. Create Comments
  const firstPost = createdPosts[0];
  const comment1 = await prisma.comment.create({
    data: {
      postId: firstPost.id,
      userId: readerUser.id,
      authorName: 'Rohan Sharma',
      authorEmail: 'rohan.dev@gmail.com',
      content: 'Cursor AI Composer mode has literally doubled my coding output! Thanks for sharing your .cursorrules configuration template, Shruti!',
      status: 'APPROVED',
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    },
  });

  await prisma.comment.create({
    data: {
      postId: firstPost.id,
      userId: shrutiUser.id,
      parentId: comment1.id,
      authorName: 'Techy Shruti',
      authorEmail: 'techyshruti@gmail.com',
      content: 'Glad it helped Rohan! Setting up project rules early makes a huge difference in keeping AI generated code clean and typed.',
      status: 'APPROVED',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
  });

  await prisma.comment.create({
    data: {
      postId: createdPosts[1].id,
      authorName: 'Ananya Verma',
      authorEmail: 'ananya.v@tech.io',
      content: 'Great M4 Pro review! Was contemplating between 18GB vs 36GB RAM, definitely getting 36GB after seeing your Next.js build benchmarks.',
      status: 'APPROVED',
      createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    },
  });

  // 8. Create Bookmarks
  await prisma.bookmark.create({
    data: {
      userId: readerUser.id,
      postId: createdPosts[0].id,
    },
  });
  await prisma.bookmark.create({
    data: {
      userId: readerUser.id,
      postId: createdPosts[1].id,
    },
  });

  // 9. Create Newsletter Subscribers
  const subscribers = [
    'alex.chen@techcorp.io',
    'sarah.j@startuphub.co',
    'dev.marcus@cloudscale.net',
    'elena.rostova@ai-research.org',
    'rohit.k@systemsdesign.in',
  ];

  for (const email of subscribers) {
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        status: 'ACTIVE',
        subscribedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      },
    });
  }

  // 10. Create Site Settings for Techy.Shruti
  const settingsData = [
    { key: 'site_name', value: JSON.stringify('Techy.Shruti Blogs') },
    { key: 'site_tagline', value: JSON.stringify('Tech Gadgets, AI Tools, Web Dev & Coding Insights by Shruti') },
    { key: 'site_description', value: JSON.stringify('Official tech publication by Techy Shruti. Discover in-depth developer laptop reviews, Next.js 15 tutorials, Cursor AI guides, and tech career roadmaps.') },
    { key: 'contact_email', value: JSON.stringify('techyshruti@gmail.com') },
    { key: 'social_links', value: JSON.stringify({ twitter: 'https://twitter.com/techyshruti', youtube: 'https://youtube.com/@techyshruti', instagram: 'https://instagram.com/techyshruti', github: 'https://github.com/techyshruti' }) },
    { key: 'comments_enabled', value: JSON.stringify(true) },
    { key: 'comments_moderation_mode', value: JSON.stringify('AUTO_APPROVE') },
    { key: 'default_seo_title', value: JSON.stringify('Techy.Shruti Blogs — Modern Tech, AI Tools & Web Development') },
    { key: 'default_seo_description', value: JSON.stringify('Official tech blog by Techy Shruti. Explore articles on Cursor AI, Next.js 15, M4 MacBook Pro reviews, and full-stack coding tutorials.') },
  ];

  for (const s of settingsData) {
    await prisma.siteSetting.create({ data: s });
  }

  // 11. Create Historical Analytics Events
  const sources = ['direct', 'youtube', 'google', 'twitter', 'linkedin', 'github'];
  const devices = ['desktop', 'mobile', 'tablet'];
  const browsers = ['chrome', 'safari', 'firefox', 'edge'];

  for (let i = 30; i >= 0; i--) {
    const dayDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const viewsCount = Math.floor(120 + Math.random() * 180);
    for (let j = 0; j < viewsCount; j++) {
      const randomPost = createdPosts[Math.floor(Math.random() * createdPosts.length)];
      if (randomPost) {
        await prisma.analyticsEvent.create({
          data: {
            type: 'PAGE_VIEW',
            path: `/blog/${randomPost.slug}`,
            postId: randomPost.id,
            visitorId: `visitor_${Math.floor(Math.random() * 1000)}`,
            sessionId: `session_${Math.floor(Math.random() * 5000)}`,
            source: sources[Math.floor(Math.random() * sources.length)],
            device: devices[Math.floor(Math.random() * devices.length)],
            browser: browsers[Math.floor(Math.random() * browsers.length)],
            createdAt: dayDate,
          },
        });
      }
    }
  }

  // 12. Create Initial Audit Logs
  await prisma.auditLog.create({
    data: {
      actorId: shrutiUser.id,
      actorEmail: shrutiUser.email,
      action: 'SYSTEM_INITIALIZED',
      entity: 'System',
      metadata: JSON.stringify({ message: 'Techy.Shruti Blogs platform initialized with tech content.' }),
      ipAddress: '127.0.0.1',
    },
  });

  console.log('[Seed] Database seeded successfully with Techy.Shruti content!');
}

if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('seed')) {
  runSeed()
    .then(() => {
      console.log('[Seed] Done!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed Error]', err);
      process.exit(1);
    });
}
