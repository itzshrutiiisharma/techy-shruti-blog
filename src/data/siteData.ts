export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Technology" | "AI / ML" | "Web Development" | "Career" | "Learning" | "Personal";
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  featured?: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  outcome: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  stats: string;
  featured?: boolean;
}

export const navigationLinks = [
  { id: "01", name: "Projects", href: "#projects", path: "/projects" },
  { id: "02", name: "Watch & Learn", href: "#watch-listen", path: "/#watch-listen" },
  { id: "03", name: "Blog & Writings", href: "#blog", path: "/blog" },
  { id: "04", name: "About", href: "#about", path: "/about" },
  { id: "05", name: "Contact", href: "#contact", path: "/contact" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-autonomous-ai-agents-with-gemini",
    title: "Building Autonomous Agentic Loops with Gemini 2.0 & Next.js",
    category: "AI / ML",
    date: "Sep 2026",
    readTime: "6 min read",
    excerpt:
      "A deep technical dive into orchestrating multi-agent systems with tool use, structured reasoning, and real-time streaming UI.",
    featured: true,
    content: [
      "Autonomous agent architectures have evolved past simple sequential chains into dynamic, state-aware reflection loops.",
      "In this breakdown, we examine how function calling combined with WebSocket streaming in Next.js 15 delivers deterministic, low-latency reasoning engines.",
      "Key architecture rules: Decouple planning from execution, implement aggressive token caching, and always maintain telemetry bounds.",
    ],
  },
  {
    id: "2",
    slug: "architecting-for-scale-high-concurrency-nodejs",
    title: "The Zero-Downtime Microservice: Handling 50k Req/s with Node & Kafka",
    category: "Web Development",
    date: "Aug 2026",
    readTime: "8 min read",
    excerpt:
      "Lessons learned from architecting distributed event-driven systems with horizontal scaling, Redis caching tiers, and PostgreSQL sharding.",
    featured: true,
    content: [
      "Concurrency in Node.js event loops requires deliberate memory management and non-blocking I/O isolation.",
      "By decoupling write-heavy operations into Kafka partitions and using Redis as an atomic read-cache, we achieved sustained sub-30ms response times under heavy spikes.",
    ],
  },
  {
    id: "3",
    slug: "from-student-to-creative-engineer",
    title: "The Art of Creative Engineering: Why Aesthetics & Performance Must Coexist",
    category: "Career",
    date: "Jul 2026",
    readTime: "5 min read",
    excerpt:
      "Why the best software engineers think like art directors. Exploring the intersection of design systems, 60fps animations, and backend engineering.",
    featured: false,
    content: [
      "Engineering is not just about making code work; it is about crafting digital artifacts that resonate emotionally with humans.",
      "When we merge rigorous systems engineering with thoughtful motion and typography, we elevate everyday software into memorable experiences.",
    ],
  },
];

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    id: "1",
    slug: "neuroforge-ai-engine",
    title: "NeuroForge — Autonomous Multi-Agent Orchestrator",
    category: "Generative AI & Distributed Systems",
    description:
      "An enterprise-grade autonomous agent platform that executes complex research, code refactoring, and data pipelines autonomously.",
    problem:
      "Traditional LLM applications suffer from hallucination loops, lack of execution safety, and poor visibility into multi-step agent reasoning.",
    solution:
      "Built a stateful graph-based agent runtime with self-correcting validation layers, Sandboxed Docker code execution, and real-time token telemetry in Next.js 15.",
    keyFeatures: [
      "Multi-agent collaborative planning & voting",
      "Dynamic tool calling with schema validation",
      "Real-time token and cost telemetry stream",
      "Interactive time-travel debugging timeline",
    ],
    outcome: "Reduced manual data synthesis time by 82% with 99.4% task completion reliability.",
    techStack: ["Next.js 15", "TypeScript", "Gemini 2.0 API", "Redis", "Docker", "TailwindCSS"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    stats: "82% Time Saved",
    featured: true,
  },
  {
    id: "2",
    slug: "omnistream-realtime-studio",
    title: "OmniStream — Low-Latency Interactive Media Studio",
    category: "WebRTC & Creative Computing",
    description:
      "A real-time broadcast and collaborative media streaming hub featuring live AI captioning, dynamic scene compositing, and spatial audio.",
    problem:
      "Live creators need seamless multi-guest broadcasting without expensive hardware switchers or high latency delays.",
    solution:
      "Engineered an in-browser WebRTC SFU pipeline with WebGL canvas compositing, automated cloud recording, and zero-latency chat overlays.",
    keyFeatures: [
      "Ultra-low latency (<50ms) WebRTC mesh routing",
      "AI-driven automated noise cancellation & live subtitles",
      "Modular canvas scene builder with custom stickers",
      "Cross-platform responsive streaming studio",
    ],
    outcome: "Streamed 500+ hours of live collaborative tech talks with zero frame drops.",
    techStack: ["React 18", "WebRTC", "Socket.io", "Framer Motion", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    stats: "<50ms Latency",
    featured: true,
  },
  {
    id: "3",
    slug: "hyperscale-cloud-gateway",
    title: "HyperScale — High-Throughput Event Mesh Gateway",
    category: "Backend & Cloud Architecture",
    description:
      "Distributed microservices hub managing 50k+ requests per second with Kafka partitioning, Redis caching, and resilient fallback circuit breakers.",
    problem:
      "High-traffic transactional spikes caused database bottlenecks and cascaded microservice timeouts.",
    solution:
      "Implemented an asynchronous event-driven queue buffer with automated rate limiting, cache stampede protection, and PostgreSQL connection pooling.",
    keyFeatures: [
      "Event-driven Kafka cluster integration",
      "Distributed Redis lock & token bucket rate limiter",
      "Prometheus & Grafana live metrics telemetry",
      "Automated horizontal pod autoscaling in Kubernetes",
    ],
    outcome: "Achieved 99.999% uptime with 50,000 requests/sec throughput during peak traffic.",
    techStack: ["Node.js", "Express", "PostgreSQL", "Kafka", "Redis", "Docker", "Kubernetes"],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    stats: "50k req/s",
    featured: true,
  },
];
