'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const lines = content.split('\n');
    const extracted: Heading[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{2,4})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');

        extracted.push({ id, text, level });
      }
    });

    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="p-6 bg-[#FAF8F5] border border-[#E6E1D8] text-xs font-mono">
      <div className="font-bold text-[#121110] uppercase tracking-widest text-[10px] mb-4 pb-2 border-b border-[#E6E1D8] flex items-center justify-between">
        <span>CONTENTS INDEX</span>
        <span className="text-[#E63B19]">{headings.length} SECTIONS</span>
      </div>
      <nav className="space-y-2.5">
        {headings.map((h, i) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={i}
              href={`#${h.id}`}
              style={{ paddingLeft: `${(h.level - 2) * 8}px` }}
              className={`block transition-colors line-clamp-1 ${
                isActive
                  ? 'text-[#E63B19] font-bold'
                  : 'text-[#78716C] hover:text-[#121110]'
              }`}
            >
              <span className="text-[10px] mr-1.5 opacity-60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{h.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
