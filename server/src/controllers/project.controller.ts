import { Request, Response } from 'express';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
  status: 'active' | 'archived' | 'experimental';
  githubUrl?: string;
  demoUrl?: string;
}

const mockProjects: Project[] = [
  {
    id: 'dist-project-tracker',
    title: 'Distributed Project Tracker',
    category: 'Distributed Systems',
    description:
      'Real-time microservices aggregation platform with live trace monitoring and event streaming architecture.',
    tags: ['Next.js', 'Node.js', 'Redis', 'Kafka', 'TypeScript'],
    metrics: [
      { label: 'RPS', value: '45k+' },
      { label: 'Latency', value: '<12ms' },
    ],
    featured: true,
    status: 'active',
    githubUrl: 'https://github.com/TechyShruti/project-tracker',
    demoUrl: 'https://tracker.techyshruti.dev',
  },
  {
    id: 'vector-search-engine',
    title: 'Zero-Allocation Vector Engine',
    category: 'Core Infrastructure',
    description:
      'High-throughput vector indexing and similarity search engine built with zero GC overhead principles.',
    tags: ['Rust', 'C++', 'Node.js', 'WASM'],
    metrics: [
      { label: 'Throughput', value: '1.2M QPS' },
      { label: 'Memory', value: '-60%' },
    ],
    featured: true,
    status: 'active',
  },
  {
    id: 'multi-agent-orchestrator',
    title: 'Multi-Agent LLM Orchestrator',
    category: 'AI / Machine Learning',
    description:
      'Memory pool allocator and latency-bounded orchestration system for multi-agent reasoning graphs.',
    tags: ['Python', 'TypeScript', 'Node.js', 'Gemini API'],
    metrics: [
      { label: 'Agents', value: '50+' },
      { label: 'P99 Latency', value: '240ms' },
    ],
    featured: true,
    status: 'experimental',
  },
];

export const getProjects = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    count: mockProjects.length,
    data: mockProjects,
  });
};

export const getProjectById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    res.status(404).json({
      success: false,
      message: `Project with ID '${id}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: project,
  });
};
