'use client';

import React from 'react';
import Link from 'next/link';
import { Rss, Twitter, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#E6E1D8] text-[#121110] text-xs font-mono">
      {/* Upper Masthead Banner */}
      <div className="border-b border-[#E6E1D8] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-[10px] text-[#78716C] uppercase tracking-widest mb-3">
                COLOPHON // INDEPENDENT PUBLICATION
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#121110]">
                SHRUTI BLOGS
              </h2>
            </div>
            <p className="max-w-md text-[#57534E] text-xs font-sans leading-relaxed">
              An independent digital archive and journal exploring distributed systems, artificial intelligence architectures, and the craft of high-performance engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Main Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Editorial Tracks */}
          <div className="space-y-4">
            <div className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest border-b border-[#E6E1D8] pb-2">
              01 / EDITORIAL TRACKS
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link href="/category/ai-machine-learning" className="hover:text-[#E63B19] transition flex items-center justify-between group">
                  <span>AI & Machine Learning</span>
                  <span className="text-[10px] text-[#78716C] group-hover:text-[#E63B19]">01</span>
                </Link>
              </li>
              <li>
                <Link href="/category/software-architecture" className="hover:text-[#E63B19] transition flex items-center justify-between group">
                  <span>Software Architecture</span>
                  <span className="text-[10px] text-[#78716C] group-hover:text-[#E63B19]">02</span>
                </Link>
              </li>
              <li>
                <Link href="/category/cloud-distributed-systems" className="hover:text-[#E63B19] transition flex items-center justify-between group">
                  <span>Distributed Systems</span>
                  <span className="text-[10px] text-[#78716C] group-hover:text-[#E63B19]">03</span>
                </Link>
              </li>
              <li>
                <Link href="/category/product-engineering" className="hover:text-[#E63B19] transition flex items-center justify-between group">
                  <span>Product Engineering</span>
                  <span className="text-[10px] text-[#78716C] group-hover:text-[#E63B19]">04</span>
                </Link>
              </li>
              <li>
                <Link href="/category/tech-leadership-culture" className="hover:text-[#E63B19] transition flex items-center justify-between group">
                  <span>Leadership & Culture</span>
                  <span className="text-[10px] text-[#78716C] group-hover:text-[#E63B19]">05</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Index & Platform */}
          <div className="space-y-4">
            <div className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest border-b border-[#E6E1D8] pb-2">
              02 / ARCHIVE & DIRECTORY
            </div>
            <ul className="space-y-2.5">
              <li>
                <Link href="/blog" className="hover:text-[#E63B19] transition flex items-center gap-1">
                  <span>Complete Article Index</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/author/shruti-sharma" className="hover:text-[#E63B19] transition flex items-center gap-1">
                  <span>Author: Shruti Sharma</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E63B19] transition flex items-center gap-1">
                  <span>Editorial Manifesto</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#E63B19] transition flex items-center gap-1">
                  <span>Search Archive (CMD+K)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#E63B19] hover:underline transition flex items-center gap-1 font-bold">
                  <span>Staff Workstation (CMS)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & RSS */}
          <div className="space-y-4">
            <div className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest border-b border-[#E6E1D8] pb-2">
              03 / SYNDICATION & LINKS
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://twitter.com/shrutisharma"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 border border-[#E6E1D8] hover:border-[#121110] hover:text-[#E63B19] transition flex items-center gap-1.5"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>X / TWITTER</span>
              </a>
              <a
                href="https://github.com/shrutisharma"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 border border-[#E6E1D8] hover:border-[#121110] hover:text-[#E63B19] transition flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 border border-[#E6E1D8] hover:border-[#121110] hover:text-[#E63B19] transition flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
              </a>
              <Link
                href="/feed.xml"
                className="px-3 py-1.5 border border-[#E6E1D8] hover:border-[#E63B19] text-[#E63B19] transition flex items-center gap-1.5"
              >
                <Rss className="w-3.5 h-3.5" />
                <span>RSS 2.0</span>
              </Link>
            </div>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-4">
            <div className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest border-b border-[#E6E1D8] pb-2">
              04 / GOVERNANCE
            </div>
            <ul className="space-y-2.5 text-[#57534E]">
              <li>
                <Link href="/privacy" className="hover:text-[#121110] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#121110] transition">
                  Terms of Publication
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#121110] transition">
                  Editorial Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-12 pt-8 border-t border-[#E6E1D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#78716C]">
          <div>
            © {new Date().getFullYear()} SHRUTI BLOGS. ALL RIGHTS RESERVED. PRINT & DIGITAL ARCHIVE.
          </div>
          <div className="font-mono">
            TYPESET IN NEWSREADER & PLUS JAKARTA SANS // NEXT.JS + PRISMA
          </div>
        </div>
      </div>
    </footer>
  );
}
