'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, Compass } from 'lucide-react';
import { useThemeAccent } from './ThemeAccentContext';
import { playCyberClick } from './SoundEffects';

interface SectionColor {
  id: string;
  name: string;
  color: string;
  glow: string;
}

const SECTIONS_CONFIG: SectionColor[] = [
  { id: 'hero', name: 'Overview', color: '#00ff66', glow: 'rgba(0, 255, 102, 0.5)' },
  { id: 'flow', name: 'Architecture', color: '#00d2ff', glow: 'rgba(0, 210, 255, 0.5)' },
  { id: 'stack', name: 'Tech Radar', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)' },
  { id: 'builds', name: 'Builds', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' },
  { id: 'backend', name: 'Live API', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.5)' },
  { id: 'contact', name: 'Contact', color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.5)' },
];

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionColor>(SECTIONS_CONFIG[0]);
  const [isVisible, setIsVisible] = useState(false);
  const { soundEnabled } = useThemeAccent();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
      setIsVisible(latest > 0.03);

      for (const section of SECTIONS_CONFIG) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    playCyberClick(soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Laser Progress Bar - Starts from sidebar offset on desktop */}
      <div className="fixed top-0 lg:left-72 left-0 right-0 h-[3.5px] bg-[#0c0e14]/60 z-50 pointer-events-none">
        <motion.div
          className="h-full origin-left transition-colors duration-500"
          style={{
            scaleX,
            backgroundColor: activeSection.color,
            boxShadow: `0 0 14px ${activeSection.glow}, 0 0 28px ${activeSection.glow}`,
          }}
        />
      </div>

      {/* Floating Scroll HUD & Back to Top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.2 }}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto ${
          !isVisible ? 'pointer-events-none' : ''
        }`}
      >
        {/* Active Section Chromatic HUD Pill */}
        <div
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c0e14]/90 backdrop-blur-md border border-[#1f293d] shadow-2xl text-[11px] font-mono transition-colors duration-500"
          style={{
            borderColor: activeSection.color,
            boxShadow: `0 0 20px ${activeSection.glow}`,
          }}
        >
          <Compass className="w-3.5 h-3.5" style={{ color: activeSection.color }} />
          <span className="text-gray-400">ZONE:</span>
          <span className="font-bold text-white">{activeSection.name}</span>
          <span className="text-gray-600">|</span>
          <span style={{ color: activeSection.color }} className="font-extrabold">
            {percent}%
          </span>
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-3 rounded-xl bg-[#0c0e14]/90 backdrop-blur-md border border-[#1f293d] text-gray-300 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 group"
          style={{
            borderColor: activeSection.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 20px ${activeSection.glow}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <ArrowUp
            className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
            style={{ color: activeSection.color }}
          />
        </button>
      </motion.div>
    </>
  );
}
