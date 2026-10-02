import React from "react";
import { prisma } from "@/lib/prisma";
import { MagazineIntro } from "@/components/Magazine/MagazineIntro";
import { CurrentIssue } from "@/components/Magazine/CurrentIssue";
import { EditorialStories } from "@/components/Magazine/EditorialStories";
import { InteractiveExplore } from "@/components/Magazine/InteractiveExplore";
import { HowThingsWork } from "@/components/Magazine/HowThingsWork";
import { TechButHuman } from "@/components/Magazine/TechButHuman";
import { SystemDesignLab } from "@/components/Magazine/SystemDesignLab";
import { AISystems2026 } from "@/components/Magazine/AISystems2026";
import { CuriosityWall } from "@/components/Magazine/CuriosityWall";
import { AboutShruti } from "@/components/Magazine/AboutShruti";
import { StayCurious } from "@/components/Magazine/StayCurious";
import { MagazineFooter } from "@/components/Magazine/MagazineFooter";
import { PageAnimations } from "@/components/UI/PageAnimations";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let allPosts: any[] = [];
  let featuredPost: any = null;
  let categories: any[] = [];

  try {
    allPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: true, category: true, tags: { include: { tag: true } } },
    });

    featuredPost = await prisma.post.findFirst({
      where: { status: "PUBLISHED", isFeatured: true },
      orderBy: { publishedAt: "desc" },
      include: { author: true, category: true, tags: { include: { tag: true } } },
    });

    categories = await prisma.category.findMany({
      orderBy: { postCount: "desc" },
      take: 7,
    });
  } catch (error) {
    console.warn("[HomePage] Database not accessible during render:", error);
  }

  const coverPost = featuredPost || (allPosts.length > 0 ? allPosts[0] : null);

  const formatPost = (p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    featuredImage: p.featuredImage,
    readingTime: p.readingTime || 5,
    publishedAt: p.publishedAt,
    category: p.category ? { name: p.category.name, slug: p.category.slug } : null,
    author: p.author ? { displayName: p.author.displayName, slug: p.author.slug } : null,
  });

  const formattedAll = allPosts.map(formatPost);
  const formattedCover = coverPost ? formatPost(coverPost) : null;

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-stone-900 selection:bg-stone-950 selection:text-stone-100">
      <PageAnimations />

      {/* SECTION 01 — INTRO (Warm Ivory) */}
      <MagazineIntro totalPosts={formattedAll.length} />

      {/* SECTION 02 — THE CURRENT ISSUE (Pale Lavender) */}
      <CurrentIssue post={formattedCover} />

      {/* SECTION 03 — STORIES (Pure White) */}
      <EditorialStories posts={formattedAll} />

      {/* SECTION 04 — EXPLORE (Soft Peach) */}
      <InteractiveExplore categories={categories} />

      {/* SECTION 05 — HOW THINGS WORK (Pale Blue) */}
      <HowThingsWork />

      {/* SECTION 06 — TECH, BUT HUMAN (Soft Sage) */}
      <TechButHuman />

      {/* SECTION 07 — SYSTEM DESIGN LAB (Deep Black) */}
      <SystemDesignLab />

      {/* SECTION 08 — AI / 2026 (Very Pale Lavender) */}
      <AISystems2026 />

      {/* SECTION 09 — CURIOSITY WALL (Cream) */}
      <CuriosityWall />

      {/* SECTION 10 — ABOUT SHRUTI (Muted Green) */}
      <AboutShruti />

      {/* SECTION 11 — STAY CURIOUS (Warm Peach) */}
      <StayCurious />

      {/* SECTION 12 — BLACK FOOTER (Minimal Black) */}
      <MagazineFooter />
    </div>
  );
}
