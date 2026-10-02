"use client";

import { motion } from "framer-motion";
import { Layout, Server, Sparkles, Terminal, Wrench, Shield, Database, Cloud } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: { name: string; level: string; color: string }[];
  highlight: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & Creative UI",
    icon: <Layout className="w-5 h-5 text-pink-400" />,
    description: "Pixel-perfect, accessible, and reactive user experiences engineered for speed and aesthetic delight.",
    skills: [
      { name: "Next.js 15 (App Router)", level: "Expert", color: "bg-white/10 text-white" },
      { name: "React 18 / 19", level: "Expert", color: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
      { name: "TypeScript", level: "Advanced", color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
      { name: "Tailwind CSS", level: "Expert", color: "bg-teal-500/10 text-teal-300 border-teal-500/20" },
      { name: "Framer Motion", level: "Advanced", color: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20" },
      { name: "State Management (Zustand/Redux)", level: "Advanced", color: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
    ],
    highlight: "60 FPS Fluid Interactions",
  },
  {
    title: "Backend & Systems",
    icon: <Server className="w-5 h-5 text-sky-400" />,
    description: "Robust, scalable API architectures, microservices, and high-concurrency event pipelines.",
    skills: [
      { name: "Node.js & Express", level: "Expert", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
      { name: "PostgreSQL & Prisma", level: "Advanced", color: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" },
      { name: "Redis Caching", level: "Advanced", color: "bg-rose-500/10 text-rose-300 border-rose-500/20" },
      { name: "REST & GraphQL APIs", level: "Expert", color: "bg-pink-500/10 text-pink-300 border-pink-500/20" },
      { name: "WebSockets & WebRTC", level: "Intermediate", color: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
      { name: "Microservice Architecture", level: "Advanced", color: "bg-sky-500/10 text-sky-300 border-sky-500/20" },
    ],
    highlight: "Sub-50ms API Latency",
  },
  {
    title: "AI & Intelligent Agents",
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    description: "Integrating frontier LLMs, autonomous agentic loops, RAG pipelines, and multimodal inference.",
    skills: [
      { name: "Google Gemini 2.0 API", level: "Expert", color: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
      { name: "Function Calling & Tools", level: "Expert", color: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
      { name: "RAG & Vector Search", level: "Advanced", color: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" },
      { name: "Prompt Engineering & Evaluation", level: "Expert", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
      { name: "Agentic Reasoning Loops", level: "Advanced", color: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20" },
    ],
    highlight: "Autonomous Agentic Workflows",
  },
  {
    title: "DevOps & Cloud Ecosystem",
    icon: <Cloud className="w-5 h-5 text-emerald-400" />,
    description: "Automated CI/CD pipelines, containerized deployments, and cloud infrastructure.",
    skills: [
      { name: "Docker & Containerization", level: "Advanced", color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
      { name: "AWS & Vercel Edge", level: "Advanced", color: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
      { name: "Git & GitHub Actions", level: "Expert", color: "bg-slate-500/10 text-slate-300 border-slate-500/20" },
      { name: "Linux Administration", level: "Advanced", color: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20" },
      { name: "Jest & Vitest Testing", level: "Intermediate", color: "bg-rose-500/10 text-rose-300 border-rose-500/20" },
    ],
    highlight: "Zero Downtime Deployments",
  },
];

export function SkillsBento() {
  return (
    <section id="skills" className="relative py-28 px-4 max-w-7xl mx-auto w-full">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF92A5]/10 border border-[#FF92A5]/30 text-[#FF92A5] text-xs font-semibold uppercase tracking-wider mb-3">
          <Terminal className="w-3.5 h-3.5" />
          Technical Arsenal
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
          Skills &amp; <span className="text-[#FF92A5]">Ecosystem</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          From full-stack web platforms to autonomous AI agents — the modern tech stack powering production apps.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-[#141A29]/90 border border-slate-800 hover:border-slate-700 shadow-xl backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">{cat.title}</h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
                  {cat.highlight}
                </span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-xs font-mono px-3 py-1.5 rounded-xl border flex items-center gap-2 ${skill.color}`}
                  >
                    <span>{skill.name}</span>
                    <span className="text-[9px] uppercase tracking-wider opacity-60 font-sans">
                      &bull; {skill.level}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
