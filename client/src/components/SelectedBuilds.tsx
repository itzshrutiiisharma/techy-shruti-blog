'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  Activity,
  Sparkles,
  Server,
  Code2,
  Terminal,
  Cpu,
  Search,
  CheckCircle2,
  BarChart3,
  GitBranch,
} from 'lucide-react';
import { fetchProjects, ProjectItem } from '../lib/api';
import { GithubIcon } from './Header';
import { useThemeAccent } from './ThemeAccentContext';
import { playCyberClick, playSuccessChime } from './SoundEffects';
import confetti from 'canvas-confetti';

interface ExtendedProjectItem extends ProjectItem {
  architectureAscii?: string;
  codePreview?: string;
  benchmarkStats?: { label: string; value: string; desc: string }[];
}

const fallbackProjects: ExtendedProjectItem[] = [
  {
    id: 'dist-project-tracker',
    title: 'Distributed Project Tracker',
    category: 'Distributed Systems',
    description:
      'Real-time microservices aggregation platform with live trace monitoring, token bucket rate limiters, and Kafka event streaming.',
    tags: ['Next.js 14', 'Node.js', 'Redis 7', 'Apache Kafka', 'TypeScript', 'Docker'],
    metrics: [
      { label: 'Throughput', value: '45k+ RPS' },
      { label: 'Latency P99', value: '<12ms' },
    ],
    featured: true,
    status: 'active',
    githubUrl: 'https://github.com/TechyShruti/project-tracker',
    demoUrl: 'https://tracker.techyshruti.dev',
    architectureAscii: `[Edge Next.js SSR] 
        │ (gRPC stream)
        ▼
[Express API Gateway] ──► [Redis Cluster Token Bucket]
        │
        ▼
[Kafka Event Bus] ──► [Distributed Worker Pool] ──► [PostgreSQL]`,
    codePreview: `// Distributed Event Publisher
export async function emitProjectTelemetry(event: TelemetryPayload) {
  const partitionKey = hashClusterNode(event.nodeId);
  await kafkaProducer.send({
    topic: 'system.events.v1',
    messages: [{ key: partitionKey, value: JSON.stringify(event) }],
  });
}`,
    benchmarkStats: [
      { label: 'Concurrent Conns', value: '120,000', desc: 'Sustained WebSocket connections' },
      { label: 'Failover Window', value: '< 200ms', desc: 'Raft consensus leader re-election' },
      { label: 'GC Pause Time', value: '< 1.4ms', desc: 'V8 heap memory optimized' },
    ],
  },
  {
    id: 'vector-search-engine',
    title: 'Zero-Allocation Vector Engine',
    category: 'Core Infrastructure',
    description:
      'High-throughput vector indexing and similarity search engine engineered with SIMD AVX2 acceleration and zero GC overhead principles.',
    tags: ['Rust', 'C++ WASM', 'Node.js FFI', 'SIMD', 'TypeScript'],
    metrics: [
      { label: 'Throughput', value: '1.2M QPS' },
      { label: 'Memory Reduc.', value: '-60%' },
    ],
    featured: true,
    status: 'active',
    githubUrl: 'https://github.com/TechyShruti/vector-engine',
    architectureAscii: `[Node.js FFI Client]
        │ (Direct Buffer Pointer)
        ▼
[Rust Native Vector Core] ──► [SIMD AVX-512 Dot Product]
        │
        ▼
[HNSW Graph Index In-Memory Pool]`,
    codePreview: `// Zero-Allocation SIMD Dot Product
#[inline(always)]
pub unsafe fn dot_product_avx2(a: &[f32], b: &[f32]) -> f32 {
    let mut sum = _mm256_setzero_ps();
    for i in (0..a.len()).step_by(8) {
        let va = _mm256_loadu_ps(a.as_ptr().add(i));
        let vb = _mm256_loadu_ps(b.as_ptr().add(i));
        sum = _mm256_fmadd_ps(va, vb, sum);
    }
    hsum_avx(sum)
}`,
    benchmarkStats: [
      { label: 'Cosine Similarity', value: '0.42µs', desc: '1536-dim embedding vector' },
      { label: 'Memory Footprint', value: '4.8 GB', desc: '10M vectors indexed in RAM' },
      { label: 'Recall @ 10', value: '99.4%', desc: 'HNSW graph accuracy' },
    ],
  },
  {
    id: 'multi-agent-orchestrator',
    title: 'Multi-Agent LLM Orchestrator',
    category: 'AI / Machine Learning',
    description:
      'Memory pool allocator and latency-bounded reasoning graph engine coordinating collaborative AI agents with streaming token pipelines.',
    tags: ['Python', 'TypeScript', 'Node.js', 'Gemini API', 'Vector DB', 'SSE'],
    metrics: [
      { label: 'Parallel Agents', value: '50+' },
      { label: 'P99 Latency', value: '240ms' },
    ],
    featured: true,
    status: 'active',
    githubUrl: 'https://github.com/TechyShruti/agent-orchestrator',
    architectureAscii: `[User Request] ──► [Graph Dispatcher Agent]
                         │ (Structured JSON Stream)
         ┌───────────────┴───────────────┐
         ▼                               ▼
[Research Sub-Agent]            [Verification Sub-Agent]
         │ (Gemini 1.5 Flash)            │ (Tool Calling)
         └───────────────┬───────────────┘
                         ▼
             [Synthesizer Consensus]`,
    codePreview: `// Multi-Agent Graph Node Execution
export async function executeAgentGraph(prompt: string) {
  const context = await ragRetriever.query(prompt);
  const stream = await geminiClient.models.generateContentStream({
    model: 'gemini-1.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });
  return createResponseStream(stream);
}`,
    benchmarkStats: [
      { label: 'Token Stream TTFT', value: '180ms', desc: 'Time to first token chunk' },
      { label: 'Context Windows', value: '1.0M Tokens', desc: 'Full codebase context ingestion' },
      { label: 'Tool Call Accuracy', value: '98.7%', desc: 'Zod structured schema enforcement' },
    ],
  },
];

// Interactive 3D Tilt Card Component
function Project3DCard({ project }: { project: ExtendedProjectItem }) {
  const { config, soundEnabled } = useThemeAccent();
  const [activeTab, setActiveTab] = useState<'overview' | 'arch' | 'metrics' | 'code'>('overview');
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -7);
    setRotateY(((x - centerX) / centerX) * 7);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleDemoLaunch = () => {
    playSuccessChime(soundEnabled);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00ff66', '#00e5ff', '#a855f7', '#ffd60a'],
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 h-full"
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        className="h-full bg-[#11141d]/90 backdrop-blur-md border border-[#1f293d] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-colors group relative overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = config.border;
          e.currentTarget.style.boxShadow = `0 15px 40px -15px ${config.glow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#1f293d';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[11px] font-mono px-3 py-1 rounded-full border"
              style={{
                backgroundColor: config.bgSubtle,
                color: config.primary,
                borderColor: config.border,
              }}
            >
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: config.primary }}
              />
              {project.status.toUpperCase()}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mb-3 group-hover:text-gray-100 transition-colors">
            {project.title}
          </h3>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 mb-5 p-1 bg-[#090b10] rounded-xl border border-[#1f293d] text-[11px] font-mono">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'arch', label: 'Topology' },
              { id: 'metrics', label: 'Benchmarks' },
              { id: 'code', label: 'Source' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id as typeof activeTab);
                  playCyberClick(soundEnabled);
                }}
                className={`flex-1 py-1 px-2 rounded-lg transition-all text-center ${
                  activeTab === t.id
                    ? 'bg-[#182030] text-white font-bold border border-[#1f293d]'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                style={{
                  color: activeTab === t.id ? config.primary : undefined,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[140px] mb-6">
            {activeTab === 'overview' && (
              <div>
                <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                  {project.description}
                </p>
                {/* Metrics Pill Grid */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 bg-[#090b10] p-3 rounded-xl border border-[#1f293d]">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[10px] font-mono text-gray-500 uppercase">{m.label}</div>
                        <div className="font-mono font-bold text-sm" style={{ color: config.primary }}>
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'arch' && (
              <div className="bg-[#090b10] rounded-xl p-3 border border-[#1f293d] font-mono text-[10px] text-gray-300 overflow-x-auto leading-relaxed whitespace-pre">
                {project.architectureAscii || 'No architecture diagram configured'}
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-2">
                {(project.benchmarkStats || []).map((b, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#090b10] border border-[#1f293d]"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-white">{b.label}</div>
                      <div className="text-[10px] text-gray-500">{b.desc}</div>
                    </div>
                    <div className="font-mono text-xs font-bold" style={{ color: config.primary }}>
                      {b.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'code' && (
              <div className="bg-[#090b10] rounded-xl p-3 border border-[#1f293d] font-mono text-[10px] text-gray-300 overflow-x-auto leading-relaxed">
                <pre>{project.codePreview || '// Code snippet ready in repository'}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions & Stack Pills */}
        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#182030] text-gray-300 border border-[#1f293d]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#1f293d]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick(soundEnabled)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> Source
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDemoLaunch}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold transition-all ml-auto hover:scale-105 active:scale-95"
                style={{ color: config.primary }}
              >
                Live Demo <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SelectedBuilds() {
  const [projects, setProjects] = useState<ExtendedProjectItem[]>(fallbackProjects);
  const [source, setSource] = useState<'API' | 'FALLBACK'>('FALLBACK');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { config, soundEnabled } = useThemeAccent();

  useEffect(() => {
    async function load() {
      const data = await fetchProjects();
      if (data && data.length > 0) {
        // Merge with extended fields if available
        const merged = data.map((d) => {
          const matched = fallbackProjects.find((f) => f.id === d.id);
          return {
            ...d,
            architectureAscii: matched?.architectureAscii || fallbackProjects[0].architectureAscii,
            codePreview: matched?.codePreview || fallbackProjects[0].codePreview,
            benchmarkStats: matched?.benchmarkStats || fallbackProjects[0].benchmarkStats,
          };
        });
        setProjects(merged);
        setSource('API');
      }
    }
    load();
  }, []);

  const allTags = ['All', 'Distributed Systems', 'Core Infrastructure', 'AI / Machine Learning'];

  const filteredProjects = projects.filter((p) => {
    const matchesTag = selectedTag === 'All' || p.category === selectedTag;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesQuery;
  });

  return (
    <section id="builds" className="py-24 border-b border-[#1f293d] bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span style={{ color: config.primary }}>// 04. 3D FEATURED BUILDS & RESEARCH</span>
              <span className="px-2 py-0.5 rounded bg-[#121620] border border-[#1f293d] text-[10px] text-gray-400">
                Source: {source}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              PRODUCTION <span style={{ color: config.primary }}>ENGINEERING</span> BUILDS
            </h2>
          </div>
          <p className="text-sm text-gray-400 font-mono mt-4 md:mt-0 max-w-md">
            Production-grade systems, SIMD compute engines, and distributed developer platforms with 3D interactive tabs.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {allTags.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    playCyberClick(soundEnabled);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                    isActive
                      ? 'text-black font-bold shadow-md'
                      : 'bg-[#121620] text-gray-400 hover:text-white border-[#1f293d]'
                  }`}
                  style={{
                    backgroundColor: isActive ? config.primary : undefined,
                    borderColor: isActive ? config.primary : undefined,
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search builds or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#121620] border border-[#1f293d] text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <Project3DCard key={proj.id} project={proj} />
          ))}
        </div>

      </div>
    </section>
  );
}
