'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Server,
  Cpu,
  Database,
  Network,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useThemeAccent } from './ThemeAccentContext';
import { playCyberClick } from './SoundEffects';

interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'data' | 'ai-cloud';
  icon: React.ElementType;
  proficiency: number;
  badge: string;
  description: string;
  useCase: string;
}

const ALL_SKILLS: SkillItem[] = [
  // Backend
  {
    name: 'Node.js & Express Cluster',
    category: 'backend',
    icon: Server,
    proficiency: 98,
    badge: 'Core Specialty',
    description: 'High-throughput asynchronous event loop, worker thread pools, and zero-allocation controllers.',
    useCase: 'Powers low-latency distributed APIs handling 45k+ RPS.',
  },
  {
    name: 'TypeScript (Strict ES2022)',
    category: 'backend',
    icon: Terminal,
    proficiency: 96,
    badge: 'Production Standard',
    description: 'Strict typing, AST transformations, custom generic utility types, and Zod validation engines.',
    useCase: 'Zero runtime type degradation and airtight error boundaries.',
  },
  {
    name: 'gRPC & Protocol Buffers',
    category: 'backend',
    icon: Network,
    proficiency: 90,
    badge: 'High Performance',
    description: 'Binary serialization, bidirectional streaming, and microservice mesh RPC communication.',
    useCase: 'Sub-millisecond inter-service telemetry transmission.',
  },
  // Frontend
  {
    name: 'Next.js 14 App Router & SSR',
    category: 'frontend',
    icon: Layout,
    proficiency: 95,
    badge: 'Production Ready',
    description: 'Server components, Streaming Suspense, Edge middleware, and route handlers.',
    useCase: 'Instant First Contentful Paint (<200ms) with global edge caching.',
  },
  {
    name: 'Tailwind CSS & Framer Motion',
    category: 'frontend',
    icon: Sparkles,
    proficiency: 94,
    badge: 'UI Excellence',
    description: 'Custom design tokens, fluid 60fps animations, 3D perspective transforms, and dark cyber themes.',
    useCase: 'Awwwards-grade developer interfaces and interactive tooling.',
  },
  // Data
  {
    name: 'Redis 7 & Apache Kafka',
    category: 'data',
    icon: Zap,
    proficiency: 92,
    badge: 'Real-Time Bus',
    description: 'Distributed pub/sub channels, partitioned event logs, and sub-millisecond memory caching.',
    useCase: 'Decoupled event-driven architectures and distributed rate limiting.',
  },
  {
    name: 'PostgreSQL & ClickHouse',
    category: 'data',
    icon: Database,
    proficiency: 91,
    badge: 'Persistence & Analytics',
    description: 'ACID transactions, partitioned time-series columnar queries, and Prisma/Kysely query engines.',
    useCase: 'Scalable OLTP storage combined with sub-second analytical reporting.',
  },
  // AI & Cloud
  {
    name: 'Gemini API & LLM Agents',
    category: 'ai-cloud',
    icon: Cpu,
    proficiency: 93,
    badge: 'GenAI & RAG',
    description: 'Multimodal processing, function calling orchestrators, streaming token pipes, and vector embeddings.',
    useCase: 'Autonomous AI coding assistants and semantic search engines.',
  },
  {
    name: 'Docker, Kubernetes & Cloud Run',
    category: 'ai-cloud',
    icon: Layers,
    proficiency: 89,
    badge: 'Container & Mesh',
    description: 'Multi-stage scratch builds, automated autoscaling, zero-downtime blue/green rollouts.',
    useCase: 'Resilient cloud infrastructure with self-healing containers.',
  },
];

export default function TechUniverse() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { config, soundEnabled } = useThemeAccent();

  const filterTabs = [
    { id: 'all', label: 'All Stack' },
    { id: 'backend', label: 'Backend Core' },
    { id: 'frontend', label: 'Frontend Edge' },
    { id: 'data', label: 'Data & Event Bus' },
    { id: 'ai-cloud', label: 'AI & Cloud Infrastructure' },
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="stack" className="py-24 border-b border-[#1f293d] bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span style={{ color: config.primary }}>// 03. ARCHITECTURAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              ENGINEERING <span style={{ color: config.primary }}>TOOLSET</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 font-mono mt-4 md:mt-0 max-w-md">
            Production-tested stack engineered for ultra-low latency, zero-allocation memory, and horizontal scale.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                  playCyberClick(soundEnabled);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                  isActive
                    ? 'text-black font-bold shadow-lg scale-105'
                    : 'bg-[#121620] text-gray-400 hover:text-white border-[#1f293d] hover:border-gray-500'
                }`}
                style={{
                  backgroundColor: isActive ? config.primary : undefined,
                  borderColor: isActive ? config.primary : undefined,
                  boxShadow: isActive ? `0 0 15px ${config.glow}` : undefined,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid with Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#121620]/80 backdrop-blur-md border border-[#1f293d] rounded-2xl p-6 flex flex-col justify-between hover:border-gray-500 transition-all duration-300 shadow-xl group relative overflow-hidden"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = config.border;
                    e.currentTarget.style.boxShadow = `0 10px 30px -10px ${config.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1f293d';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-[#090a0f] border border-[#1f293d] text-gray-300 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" style={{ color: config.primary }} />
                      </div>
                      <span
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: config.bgSubtle,
                          color: config.primary,
                          borderColor: config.border,
                        }}
                      >
                        {skill.badge}
                      </span>
                    </div>

                    <h3 className="font-mono font-bold text-base text-white mb-2 group-hover:text-gray-100">
                      {skill.name}
                    </h3>

                    <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">
                      {skill.description}
                    </p>
                  </div>

                  <div>
                    {/* Use Case */}
                    <div className="p-2.5 rounded-lg bg-[#090a0f]/80 border border-[#1f293d]/80 text-[11px] font-mono text-gray-300 mb-4">
                      <span className="text-gray-500 mr-1">// IMPACT:</span>
                      {skill.useCase}
                    </div>

                    {/* Proficiency Gauge Bar */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                        <span>MASTERY RATING</span>
                        <span style={{ color: config.primary }} className="font-bold">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[#090a0f] rounded-full overflow-hidden border border-[#1f293d]">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${skill.proficiency}%`,
                            backgroundColor: config.primary,
                            boxShadow: `0 0 8px ${config.glow}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
