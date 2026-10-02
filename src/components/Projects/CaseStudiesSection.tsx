"use client";

import { motion } from "framer-motion";
import { projectCaseStudies } from "@/data/siteData";
import { ArrowUpRight, Github, ExternalLink, Sparkles, Layers, Cpu } from "lucide-react";
import Link from "next/link";

export function CaseStudiesSection() {
  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto w-full select-none">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFA0B6]/10 border border-[#FFA0B6]/30 text-[#FFA0B6] font-poppins font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Case Studies
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-poppins text-white tracking-tight">
            Featured <span className="text-[#FFA0B6]">Engineering</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            In-depth architectural breakdowns of production AI systems, distributed microservices, and creative web platforms.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FFA0B6] text-[#1A2035] font-poppins font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all self-start md:self-auto"
        >
          View All Case Studies
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* CASE STUDIES EDITORIAL LIST */}
      <div className="space-y-12">
        {projectCaseStudies.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="p-8 sm:p-12 rounded-[40px] bg-[#1F2740]/90 border-2 border-slate-700/60 hover:border-[#FFA0B6]/50 shadow-2xl backdrop-blur-xl transition-all group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FFA0B6] bg-[#FFA0B6]/10 px-3.5 py-1 rounded-full border border-[#FFA0B6]/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                    {project.stats}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-poppins text-white group-hover:text-[#FFA0B6] transition-colors leading-tight mb-4">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Problem & Solution Callout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#141A29]/90 border border-slate-700/50 mb-6">
                  <div>
                    <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider font-bold block mb-1">
                      Problem
                    </span>
                    <p className="text-xs text-slate-300 leading-normal">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold block mb-1">
                      Solution
                    </span>
                    <p className="text-xs text-slate-300 leading-normal">{project.solution}</p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#FFA0B6] hover:bg-white text-[#1A2035] font-poppins font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live System
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-poppins font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              </div>
            </div>

            {/* Right Visual Clay Card (5 Cols) */}
            <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-full min-h-[260px] rounded-3xl bg-gradient-to-tr from-[#121726] to-[#252E48] border-2 border-slate-600/50 p-6 flex flex-col justify-between overflow-hidden shadow-inner group-hover:border-[#FFA0B6]/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-[#FFA0B6]">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400">Architecture Spec</span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#FFA0B6] uppercase tracking-wider font-bold">Key Milestones</span>
                {project.keyFeatures.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFA0B6]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                🚀 Outcome: {project.outcome}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
