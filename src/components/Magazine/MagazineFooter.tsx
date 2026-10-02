"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube, Mail, ArrowUp } from "lucide-react";

export function MagazineFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mag-section-black relative py-20 px-4 sm:px-8 lg:px-16 border-t mag-border-light font-mono text-xs text-stone-400 space-y-16">
      {/* Top Identity Grid */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-12 border-b mag-border-light">
        <div className="space-y-4 max-w-lg">
          <Link href="/" className="inline-block">
            <span className="font-display-editorial text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Techy.Shruti
            </span>
          </Link>
          <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">
            An independent internet publication &amp; engineering journal exploring distributed systems, artificial intelligence, and the hidden mechanics of modern technology.
          </p>
        </div>

        {/* Navigation Categories */}
        <div className="flex flex-wrap gap-8 sm:gap-12 uppercase font-bold text-stone-200 tracking-wider">
          <Link href="/blog" className="hover:text-white transition">STORIES</Link>
          <Link href="/about" className="hover:text-white transition">IDEAS</Link>
          <Link href="/projects" className="hover:text-white transition">SYSTEMS</Link>
          <Link href="/blog?category=internet" className="hover:text-white transition">INTERNET</Link>
        </div>
      </div>

      {/* Middle Links & Social Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <Github className="w-4 h-4" />
            <span>GITHUB</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <Twitter className="w-4 h-4" />
            <span>X / TWITTER</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <Linkedin className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>
          <a
            href="mailto:contact@techyshruti.dev"
            className="hover:text-white transition flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL</span>
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-white transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Copyright */}
      <div className="pt-8 border-t mag-border-light flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-stone-500">
        <div>© 2026 TECHY.SHRUTI PUBLICATION. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:underline">PRIVACY POLICY</Link>
          <Link href="/terms" className="hover:underline">TERMS OF SERVICE</Link>
          <Link href="/sitemap.xml" className="hover:underline">SITEMAP</Link>
        </div>
      </div>
    </footer>
  );
}
