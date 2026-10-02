"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles, Layers, Cpu, Globe, Rocket, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  githubUrl: string;
  liveUrl: string;
  stats: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "NeuroForge — Autonomous AI Workflow Engine",
    category: "AI & Full Stack Architecture",
    description:
      "Enterprise-grade multi-agent autonomous system built with Next.js 15, Gemini 2.0 Flash, vector embeddings, and real-time streaming telemetry.",
    tags: ["Next.js 15", "TypeScript", "Gemini API", "TailwindCSS", "Redis", "WebSockets"],
    gradient: "from-purple-900/60 via-slate-900 to-[#141A29]",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stats: "10x Faster Workflows",
    featured: true,
  },
  {
    title: "HyperScale — High-Throughput Microservice Hub",
    category: "Backend & Cloud Infrastructure",
    description:
      "Distributed event-driven backend handling 50k+ requests/sec with Node.js, Express, Kafka, Dockerized Kubernetes, and PostgreSQL sharding.",
    tags: ["Node.js", "Express", "PostgreSQL", "Kafka", "Docker", "Kubernetes"],
    gradient: "from-sky-900/60 via-slate-900 to-[#141A29]",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stats: "99.99% Uptime",
    featured: true,
  },
  {
    title: "OmniStream — Realtime Multi-Participant Studio",
    category: "WebRTC & Interactive Media",
    description:
      "Ultra-low latency audio/video broadcasting suite featuring live AI captions, dynamic screen layouts, and canvas drawing overlays.",
    tags: ["React 18", "WebRTC", "Framer Motion", "Socket.io", "Tailwind CSS"],
    gradient: "from-rose-900/60 via-slate-900 to-[#141A29]",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stats: "<50ms Latency",
  },
  {
    title: "CryptoVortex — Predictive DeFi Analytics",
    category: "Fintech & Data Visualization",
    description:
      "Modern Web3 market intelligence dashboard featuring real-time candle charts, automated liquidity risk scoring, and multi-wallet tracking.",
    tags: ["Next.js", "TypeScript", "Ethers.js", "Chart.js", "Tailwind"],
    gradient: "from-emerald-900/60 via-slate-900 to-[#141A29]",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stats: "$2.4M Volume Tracked",
  },
];

export function ProjectShowcase() {
  return (
    <section id="projects" className="relative py-28 px-4 max-w-7xl mx-auto w-full">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF92A5]/10 border border-[#FF92A5]/30 text-[#FF92A5] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
            Featured <span className="text-[#FF92A5]">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            A selection of production-grade full-stack architectures, generative AI platforms, and high-performance web applications.
          </p>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-[#FF92A5] text-slate-200 text-xs font-semibold shadow-lg hover:scale-105 transition-all self-start md:self-auto"
        >
          <Github className="w-4 h-4" />
          View All Repositories
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FF92A5]" />
        </a>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
            className={`relative rounded-3xl p-7 md:p-8 bg-gradient-to-br ${project.gradient} border border-slate-700/60 hover:border-[#FF92A5]/50 shadow-2xl backdrop-blur-xl transition-all group flex flex-col justify-between overflow-hidden`}
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#FF92A5] bg-[#FF92A5]/10 px-3 py-1 rounded-full border border-[#FF92A5]/20">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {project.stats}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#FF92A5] transition-colors mb-3">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Bottom Tech Tags & Links */}
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF92A5] group-hover:translate-x-1 transition-transform"
                >
                  Explore Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Ambient Background Corner Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#FF92A5]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF92A5]/20 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
