'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Code2,
  Database,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Cpu,
  Server,
  Zap,
} from 'lucide-react';
import InteractiveTerminal from './InteractiveTerminal';
import { useThemeAccent } from './ThemeAccentContext';
import { playCyberClick } from './SoundEffects';

export default function Hero() {
  const { config, soundEnabled } = useThemeAccent();
  const [typedTitleIndex, setTypedTitleIndex] = useState(0);

  const specializations = [
    'DISTRIBUTED SYSTEMS ARCHITECT',
    'ZERO-ALLOCATION ENGINES',
    'AI AGENT & VECTOR PIPELINES',
    'HIGH-THROUGHPUT FULL-STACK',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedTitleIndex((prev) => (prev + 1) % specializations.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-10 sm:pt-16 pb-24 overflow-hidden border-b border-[#1f293d] cyber-grid-pattern"
    >
      {/* Aurora Ambient Glow Behind Hero */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-25 transition-colors duration-700"
        style={{ backgroundColor: config.primary }}
      />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15 bg-[#00e5ff]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Operational Hologram Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121620]/90 backdrop-blur-md border border-[#1f293d] font-mono text-xs text-gray-300 mb-8 shadow-xl"
        >
          <span className="flex h-2 w-2 relative">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: config.primary }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: config.primary }}
            />
          </span>
          <span style={{ color: config.primary }} className="font-semibold tracking-wider">
            TECHYSHRUTI COMMAND
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">{specializations[typedTitleIndex]}</span>
        </motion.div>

        {/* Main Grid: Left Headline & Right Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
              ARCHITECTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                DISTRIBUTED
              </span>{' '}
              <br />
              <span
                style={{
                  color: config.primary,
                  textShadow: `0 0 25px ${config.glow}`,
                }}
                className="transition-colors duration-500"
              >
                FUTURE ENGINES.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl font-sans">
              Building zero-allocation high-throughput backend microservices, resilient event streaming pipelines, low-latency AI agent graph orchestrators, and next-generation full-stack architectures.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#builds"
                onClick={() => playCyberClick(soundEnabled)}
                className="px-6 py-3.5 rounded-xl font-mono font-bold text-xs text-black transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95 shadow-xl"
                style={{
                  backgroundColor: config.primary,
                  boxShadow: `0 0 25px ${config.glow}`,
                }}
              >
                EXPLORE 3D BUILDS
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#flow"
                onClick={() => playCyberClick(soundEnabled)}
                className="px-6 py-3.5 rounded-xl bg-[#121620]/90 backdrop-blur-md border border-[#1f293d] hover:border-gray-400 text-white font-mono text-xs transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95 shadow-lg"
              >
                SYSTEM ARCHITECTURE
                <Zap className="w-4 h-4" style={{ color: config.primary }} />
              </a>

              <a
                href="#backend"
                onClick={() => playCyberClick(soundEnabled)}
                className="px-5 py-3.5 rounded-xl bg-[#0d1017] border border-[#1f293d] hover:border-[#00e5ff] text-gray-300 hover:text-white font-mono text-xs transition-all flex items-center gap-2"
              >
                API SANDBOX
                <Code2 className="w-4 h-4 text-[#00e5ff]" />
              </a>
            </div>

            {/* Micro Live Metrics Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#1f293d]/80">
              <div className="bg-[#0e1118]/80 backdrop-blur-md p-3 rounded-lg border border-[#1f293d]">
                <div className="font-mono text-xl font-extrabold" style={{ color: config.primary }}>
                  45k+
                </div>
                <div className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                  Req / Sec
                </div>
              </div>
              <div className="bg-[#0e1118]/80 backdrop-blur-md p-3 rounded-lg border border-[#1f293d]">
                <div className="font-mono text-xl font-extrabold text-[#00e5ff]">
                  &lt;12ms
                </div>
                <div className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                  P95 Latency
                </div>
              </div>
              <div className="bg-[#0e1118]/80 backdrop-blur-md p-3 rounded-lg border border-[#1f293d]">
                <div className="font-mono text-xl font-extrabold text-[#ffd60a]">
                  99.99%
                </div>
                <div className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                  Uptime SLA
                </div>
              </div>
              <div className="bg-[#0e1118]/80 backdrop-blur-md p-3 rounded-lg border border-[#1f293d]">
                <div className="font-mono text-xl font-extrabold text-[#a855f7]">
                  40+
                </div>
                <div className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                  Services
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Column: Live Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <InteractiveTerminal />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
