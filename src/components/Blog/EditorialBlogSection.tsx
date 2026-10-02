"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/siteData";
import { ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export function EditorialBlogSection() {
  return (
    <section id="blog" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto w-full select-none">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFA0B6]/10 border border-[#FFA0B6]/30 text-[#FFA0B6] font-poppins font-bold text-xs uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Writings &amp; Thoughts
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-poppins text-white tracking-tight">
            Latest <span className="text-[#FFA0B6]">Writings</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Essays on AI architectures, scaling challenges, creative engineering, and lessons from building in public.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FFA0B6] text-[#1A2035] font-poppins font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all self-start md:self-auto"
        >
          View All Essays
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* EDITORIAL BLOG GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ y: -8 }}
            className="p-8 rounded-[36px] bg-[#1F2740]/90 border-2 border-slate-700/60 hover:border-[#FFA0B6]/50 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all group cursor-pointer"
          >
            <div>
              {/* Category & Date */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFA0B6] bg-[#FFA0B6]/10 px-3.5 py-1 rounded-full border border-[#FFA0B6]/20">
                  {post.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black font-poppins text-white group-hover:text-[#FFA0B6] transition-colors leading-snug mb-4">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {post.excerpt}
              </p>
            </div>

            {/* Read Link */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{post.date}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-[#FFA0B6] group-hover:translate-x-1 transition-transform"
              >
                Read Essay
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
