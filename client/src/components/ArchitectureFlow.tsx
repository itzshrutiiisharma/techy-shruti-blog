'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Shield,
  Server,
  Activity,
  Database,
  Cpu,
  ArrowRight,
  Zap,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { useThemeAccent } from './ThemeAccentContext';
import { playCyberClick } from './SoundEffects';

interface PipelineNode {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  tech: string[];
  latency: string;
  throughput: string;
  details: string;
  codeSnippet: string;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: 'edge',
    name: '01. Global Edge Ingestion',
    role: 'Global Routing & TLS Termination',
    icon: Globe,
    tech: ['Next.js 14 App Router', 'Edge Middleware', 'HTTP/3 Quic', 'Vercel / Cloudflare'],
    latency: '< 4ms',
    throughput: '100k+ RPS',
    details:
      'Anycast edge routing with localized geo-distributed SSR and static asset cache orchestration to minimize initial TCP handshakes.',
    codeSnippet: `// Edge Middleware Route Dispatcher
export async function middleware(req: NextRequest) {
  const telemetry = extractGeoTelemetry(req);
  const authHeader = req.headers.get('authorization');
  return NextResponse.next({ headers: { 'x-edge-pop': telemetry.pop } });
}`,
  },
  {
    id: 'gateway',
    name: '02. API Gateway & Defense',
    role: 'Rate Limiting & Zod Validation',
    icon: Shield,
    tech: ['Zod Schema Engine', 'Helmet Security', 'Token Bucket Limiter', 'CORS Policies'],
    latency: '< 1ms',
    throughput: '85k RPS',
    details:
      'Strict input schema validation, payload sanitization, structured error transformations, and adaptive DDoS throttling.',
    codeSnippet: `// Strict Zod Payload Validation
export const validatePayload = <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) throw new ValidationError(result.error);
    req.body = result.data;
    next();
  };`,
  },
  {
    id: 'core',
    name: '03. Distributed Express Core',
    role: 'Business Logic & Async Orchestration',
    icon: Server,
    tech: ['Node.js ES2022', 'Express Cluster', 'Worker Threads', 'gRPC Services'],
    latency: '< 6ms',
    throughput: '45k RPS',
    details:
      'Zero-allocation memory pool patterns, non-blocking asynchronous event loops, and strict TypeScript controller layer.',
    codeSnippet: `// Microservices Async Controller
export const handleTelemetryStream = async (req: Request, res: Response) => {
  const telemetry = await TelemetryService.aggregateNodes();
  res.status(200).json({ status: 'ok', data: telemetry });
};`,
  },
  {
    id: 'event-bus',
    name: '04. Event Stream & Cache',
    role: 'Real-Time Pub/Sub & In-Memory Cache',
    icon: Activity,
    tech: ['Redis 7 Cluster', 'Apache Kafka', 'Event Sourcing', 'BullMQ Jobs'],
    latency: '< 0.8ms',
    throughput: '1.2M QPS',
    details:
      'Sub-millisecond write-through caching layer and horizontal event partition bus for asynchronous message distribution.',
    codeSnippet: `// Distributed Redis Pub/Sub Pipe
await redis.xadd('stream:telemetry', '*', 
  'clusterId', 'eu-west-1', 
  'latency', 11.4
);`,
  },
  {
    id: 'storage',
    name: '05. High-Scale Storage & Vector DB',
    role: 'Persistent OLTP, OLAP & Vector Search',
    icon: Database,
    tech: ['PostgreSQL & Prisma', 'ClickHouse Analytics', 'Qdrant Vector DB', 'Gemini RAG'],
    latency: '< 15ms',
    throughput: '50k QPS',
    details:
      'Multi-model persistence combining ACID relational transactions, columnar analytics, and high-dimensional semantic vector indexing.',
    codeSnippet: `// High-Dimensional Vector Similarity Query
const matches = await qdrant.search('engineering_docs', {
  vector: embeddingVector,
  limit: 5,
  score_threshold: 0.88,
});`,
  },
];

export default function ArchitectureFlow() {
  const [selectedNode, setSelectedNode] = useState<PipelineNode>(PIPELINE_NODES[0]);
  const { config, soundEnabled } = useThemeAccent();

  return (
    <section id="flow" className="py-24 border-b border-[#1f293d] bg-[#07090e] relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: config.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span style={{ color: config.primary }}>// 02. SYSTEM DESIGN & ARCHITECTURE</span>
              <span className="px-2 py-0.5 rounded bg-[#121620] border border-[#1f293d] text-[10px] text-gray-400">
                End-to-End Pipeline
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              HOW I ARCHITECT <span style={{ color: config.primary }}>HIGH-THROUGHPUT</span> SYSTEMS
            </h2>
          </div>
          <p className="text-sm text-gray-400 font-mono mt-4 md:mt-0 max-w-md">
            Click on any pipeline stage to inspect data flow latency, technology stack, and architectural source snippets.
          </p>
        </div>

        {/* Pipeline Stepper Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          {PIPELINE_NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = selectedNode.id === node.id;
            return (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedNode(node);
                  playCyberClick(soundEnabled);
                }}
                className={`cursor-pointer rounded-xl p-4 border transition-all relative overflow-hidden backdrop-blur-md ${
                  isSelected
                    ? 'bg-[#121620] shadow-xl'
                    : 'bg-[#0a0d14]/80 border-[#1f293d] hover:border-gray-600'
                }`}
                style={{
                  borderColor: isSelected ? config.primary : undefined,
                  boxShadow: isSelected ? `0 0 20px ${config.glow}` : undefined,
                }}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: config.primary }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className="p-2 rounded-lg bg-[#07090e] border border-[#1f293d]"
                    style={{
                      color: isSelected ? config.primary : '#94a3b8',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 font-semibold">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <div className="font-mono font-bold text-xs text-white mb-1">
                  {node.name.replace(/^\d+\.\s*/, '')}
                </div>
                <div className="text-[11px] text-gray-400 line-clamp-1">{node.role}</div>

                <div className="mt-3 pt-2.5 border-t border-[#1f293d]/50 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-gray-500">Latency:</span>
                  <span style={{ color: config.primary }} className="font-bold">
                    {node.latency}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Node Deep Dive Inspector */}
        <div
          className="bg-[#0c0f17] border border-[#1f293d] rounded-2xl p-6 sm:p-8 shadow-2xl transition-all"
          style={{
            borderColor: config.border,
            boxShadow: `0 15px 35px -10px ${config.glow}`,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Metadata & Tech breakdown */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3"
                  style={{
                    backgroundColor: config.bgSubtle,
                    color: config.primary,
                    border: `1px solid ${config.border}`,
                  }}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>DEEP DIVE INSPECTOR</span>
                </div>
                <h3 className="text-2xl font-bold font-mono text-white mb-2">
                  {selectedNode.name}
                </h3>
                <p className="text-xs font-mono text-gray-400 mb-4">{selectedNode.role}</p>
                <p className="text-sm text-gray-300 font-sans leading-relaxed">
                  {selectedNode.details}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#07090e] p-3 rounded-lg border border-[#1f293d]">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Target Latency</div>
                  <div className="text-lg font-mono font-bold" style={{ color: config.primary }}>
                    {selectedNode.latency}
                  </div>
                </div>
                <div className="bg-[#07090e] p-3 rounded-lg border border-[#1f293d]">
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Tested Throughput</div>
                  <div className="text-lg font-mono font-bold text-[#00e5ff]">
                    {selectedNode.throughput}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                  Technology Stack:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-[#121620] text-gray-300 border border-[#1f293d]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Architectural Code Blueprint */}
            <div className="lg:col-span-7 bg-[#07090e] rounded-xl border border-[#1f293d] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#090c12] border-b border-[#1f293d] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <Terminal className="w-3.5 h-3.5" style={{ color: config.primary }} />
                  <span>architecture-blueprint.ts</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">TypeScript ES2022</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs font-mono text-gray-200 overflow-x-auto leading-relaxed">
                <code>{selectedNode.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
