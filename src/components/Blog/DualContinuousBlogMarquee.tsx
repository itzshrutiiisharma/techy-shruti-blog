"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import {
  Clock,
  ArrowUpRight,
  Activity,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { StaggerReveal, RevealItem } from "@/components/UI/PageAnimations";

export interface ContinuousBlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  readingTime?: number | string;
  featuredImage?: string | null;
  publishedAt?: Date | string | null;
  category?: { name: string; slug?: string } | null;
  author?: { displayName: string; avatar?: string | null } | null;
}

interface Props { posts: ContinuousBlogItem[]; }

/* Category color map */
const catMap: Record<string, string> = {
  "AI / ML":              "tag-purple",
  "AI & Tools":           "tag-purple",
  "AI & Smart Tools":     "tag-purple",
  "Web Dev":              "tag-cyan",
  "Web Architecture":     "tag-cyan",
  "Web Dev & Frameworks": "tag-cyan",
  "Hardware":             "tag-amber",
  "Tech Setup & Gadgets": "tag-amber",
  "Productivity":         "tag-emerald",
  "Python":               "tag-cyan",
  "Python / Backend":     "tag-cyan",
  "Coding & Tutorials":   "tag-cyan",
  "Career":               "tag-pink",
  "Tech Career & Creator":"tag-pink",
};

function getCatClass(name: string) {
  return catMap[name] ?? "tag-purple";
}

/* ─────────────────────────────────────────────────
   VELOCITY MARQUEE — speed increases during scroll
───────────────────────────────────────────────── */
function VelocityScrollRow({
  items,
  direction = 1,
}: {
  items: ContinuousBlogItem[];
  direction?: 1 | -1;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const dirRef = useRef<number>(direction);

  // base speed 2.5 units/s
  useAnimationFrame((_t, delta) => {
    let move = dirRef.current * 2.5 * (delta / 1000);
    if (velocityFactor.get() < 0) dirRef.current = -direction;
    else if (velocityFactor.get() > 0) dirRef.current = direction;
    move += dirRef.current * move * velocityFactor.get();
    baseX.set(baseX.get() + move);
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden cursor-default" data-lenis-prevent>
      <motion.div
        className="flex gap-5 items-stretch py-1.5 will-change-transform"
        style={{ x }}
      >
        {row.map((post, i) => (
          <BlogCard key={`${post.id}-${i}`} post={post} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   BLOG CARD — hover scale + glow
───────────────────────────────────────────────── */
function BlogCard({ post }: { post: ContinuousBlogItem }) {
  const readTime = typeof post.readingTime === "number"
    ? `${post.readingTime} min` : post.readingTime ?? "5 min";
  const catName  = post.category?.name ?? "Engineering";
  const catClass = getCatClass(catName);
  const img      = post.featuredImage ?? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
      className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col"
    >
      <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
        {/* Image */}
        <div className="relative h-40 overflow-hidden bg-[var(--bg-surface)] flex-shrink-0">
          <motion.img
            src={img}
            alt={post.title}
            className="w-full h-full object-cover brightness-90"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-90" />
          <div className="absolute top-3 left-3">
            <span className={`${catClass} px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-sm`}>
              {catName}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col justify-between p-4 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-[11px] font-mono text-[var(--text-muted)]">
              <Clock className="w-3 h-3" />
              <span>{readTime}</span>
              <span>·</span>
              <span className="truncate max-w-[110px] text-[var(--text-secondary)]">
                {post.author?.displayName ?? "Techy Shruti"}
              </span>
            </div>
            <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] line-clamp-2 leading-snug group-hover:text-gradient transition-all">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-[11px] font-sans text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)]">Read Analysis</span>
            <motion.div
              className="w-6 h-6 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-brand-purple"
              whileHover={{ backgroundColor: "rgba(139,92,246,1)", color: "#fff", borderColor: "rgba(139,92,246,1)" }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────── */
const FALLBACK: ContinuousBlogItem[] = [
  { id:"1", slug:"cursor-ai-vs-vscode", title:"Cursor AI vs VS Code in 2026: Why Every Dev is Switching", excerpt:"Deep comparison of agentic workflows, multi-file edits, and AI autocomplete ergonomics.", readingTime:6, category:{name:"AI / ML"}, author:{displayName:"Techy Shruti"}, featuredImage:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80" },
  { id:"2", slug:"mastering-nextjs-15",  title:"Mastering Next.js 15 App Router: Server Actions & Dynamic Caching", excerpt:"Blueprint for handling 100k req/min with React 19 server components.", readingTime:8, category:{name:"Web Dev"}, author:{displayName:"Techy Shruti"}, featuredImage:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80" },
  { id:"3", slug:"m4-pro-review", title:"M4 Pro MacBook Pro: The Ultimate Coding Beast for Developers", excerpt:"Real-world benchmark: Docker compile times, local LLMs, battery endurance.", readingTime:5, category:{name:"Hardware"}, author:{displayName:"Techy Shruti"}, featuredImage:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80" },
  { id:"4", slug:"top-7-ai-tools", title:"Top 7 AI Tools Every Software Engineer Should Use in 2026", excerpt:"The exact agentic stack used by top teams to 10x their productivity.", readingTime:7, category:{name:"Productivity"}, author:{displayName:"Techy Shruti"}, featuredImage:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" },
  { id:"5", slug:"fullstack-roadmap-2026", title:"Full-Stack Web Developer Roadmap 2026: Zero to Hired", excerpt:"Step-by-step mastery plan for modern full-stack, distributed databases, and DevOps.", readingTime:10, category:{name:"Career"}, author:{displayName:"Techy Shruti"}, featuredImage:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80" },
  { id:"6", slug:"python-tricks", title:"10 Python Tricks You Didn't Know Existed (With Code Examples)", excerpt:"Memory optimizations, walrus operators, and async generators for engineers.", readingTime:5, category:{name:"Python"}, author:{displayName:"Techy Shruti"}, featuredImage:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80" },
];

export function DualContinuousBlogMarquee({ posts }: Props) {
  const src = posts?.length > 0 ? posts : FALLBACK;
  const mid  = Math.ceil(src.length / 2);
  const t1   = src.slice(0, mid).length > 0 ? src.slice(0, mid) : src;
  const t2   = src.slice(mid).length   > 0 ? src.slice(mid)     : src;

  /* Parallax on the whole section */
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const smoothHeaderY = useSpring(headerY, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={sectionRef}
      id="continuous-blogs"
      className="relative overflow-hidden border-y border-[var(--border-color)]"
      style={{ background: "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-surface) 50%, var(--bg-base) 100%)" }}
    >
      {/* Ambient blob */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.05),transparent_70%)] pointer-events-none blur-3xl" />

      {/* ─── HEADER ─── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10"
        style={{ y: smoothHeaderY }}
      >
        <StaggerReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <RevealItem>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.15em]">
                <Activity className="w-3.5 h-3.5 text-brand-pink" />
                <span className="text-brand-pink">LIVE</span>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-brand-pink"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <span className="text-[var(--text-muted)]">Dual Editorial Stream</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em]">
                <span className="text-[var(--text-primary)]">Continuous</span>{" "}
                <span className="text-gradient">Blog Streams</span>
              </h2>

              <p className="font-sans text-sm text-[var(--text-secondary)] max-w-lg">
                Track 1 scrolls{" "}
                <span className="text-brand-purple font-medium">left →</span>{" "}
                · Track 2 scrolls{" "}
                <span className="text-brand-pink font-medium">← right</span>.
                {" "}Velocity increases as you scroll.
              </p>
            </div>
          </RevealItem>

          <RevealItem direction="left">
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[11px] font-mono text-[var(--text-muted)]">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
                <span>{src.length} articles live</span>
              </div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-purple-500/40 hover:bg-[var(--bg-card-hover)] transition-colors"
                >
                  <span>All Essays</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </Link>
              </motion.div>
            </div>
          </RevealItem>
        </StaggerReveal>
      </motion.div>

      {/* ─── VELOCITY MARQUEE ROWS ─── */}
      <div className="relative w-full space-y-5 pb-14 marquee-mask">
        {/* Gradient masks on sides */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />

        <VelocityScrollRow items={t1} direction={1}  />
        <VelocityScrollRow items={t2} direction={-1} />
      </div>
    </section>
  );
}
