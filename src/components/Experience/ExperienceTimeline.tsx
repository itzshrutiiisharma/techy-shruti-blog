"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Sparkles, Calendar } from "lucide-react";

interface Milestone {
  role: string;
  organization: string;
  period: string;
  type: "work" | "achievement" | "education";
  description: string;
  achievements: string[];
}

const milestones: Milestone[] = [
  {
    role: "Senior Full Stack & AI Engineer",
    organization: "NextGen Cloud Labs",
    period: "2024 — Present",
    type: "work",
    description: "Architecting high-scale Next.js web applications, generative AI agent workflows, and distributed microservices.",
    achievements: [
      "Led design of multimodal AI pipeline decreasing generation latency by 45%",
      "Engineered full-stack telemetry dashboards serving 100k+ active users",
      "Mentored junior engineers and conducted weekly engineering tech talks",
    ],
  },
  {
    role: "Tech Content Creator & Educator",
    organization: "TechyShruti Community",
    period: "2023 — Present",
    type: "achievement",
    description: "Creating in-depth tech tutorials, architecture breakdowns, full-stack courses, and open-source boilerplates.",
    achievements: [
      "Empowered over 100k+ aspiring software engineers across YouTube & GitHub",
      "Published production-ready starter templates with 1k+ GitHub stars",
      "Keynote speaker at regional developer conferences and AI hackathons",
    ],
  },
  {
    role: "Full Stack Developer",
    organization: "Apex Digital Solutions",
    period: "2022 — 2024",
    type: "work",
    description: "Developed end-to-end responsive web applications with React, Node.js, and cloud deployment pipelines.",
    achievements: [
      "Migrated monolithic app to modular Next.js architecture improving SEO by 60%",
      "Implemented automated CI/CD reducing deployment cycle time from 1hr to 8mins",
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative py-28 px-4 max-w-5xl mx-auto w-full">
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF92A5]/10 border border-[#FF92A5]/30 text-[#FF92A5] text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-3.5 h-3.5" />
          The Trajectory
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
          Journey &amp; <span className="text-[#FF92A5]">Milestones</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Key chapters of building scalable code, building community, and exploring the frontier of technology.
        </p>
      </div>

      {/* TIMELINE LIST */}
      <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12">
        {milestones.map((item, idx) => (
          <motion.div
            key={item.role + item.period}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative pl-8 group"
          >
            {/* Timeline Dot with Pulse */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-[#FF92A5] flex items-center justify-center text-[#FF92A5] shadow-[0_0_15px_rgba(255,146,165,0.4)] group-hover:scale-110 transition-transform">
              {item.type === "work" && <Briefcase className="w-3.5 h-3.5" />}
              {item.type === "achievement" && <Sparkles className="w-3.5 h-3.5" />}
              {item.type === "education" && <GraduationCap className="w-3.5 h-3.5" />}
            </div>

            {/* Content Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#141A29]/80 border border-slate-800 hover:border-slate-700 shadow-xl backdrop-blur-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-bold font-display text-white group-hover:text-[#FF92A5] transition-colors">
                  {item.role}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF92A5] bg-[#FF92A5]/10 px-3 py-1 rounded-full border border-[#FF92A5]/20 self-start sm:self-auto">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-400 mb-4">{item.organization}</p>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              <ul className="space-y-2">
                {item.achievements.map((ach) => (
                  <li key={ach} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF92A5] mt-1.5 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
