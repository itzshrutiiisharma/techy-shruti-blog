export interface HealthResponse {
  status: string;
  service: string;
  uptime: number;
  timestamp: string;
  environment: string;
  system?: {
    platform: string;
    nodeVersion: string;
    memoryUsage: Record<string, number>;
  };
}

export interface ProjectItem {
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

export interface ProjectsResponse {
  success: boolean;
  count: number;
  data: ProjectItem[];
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchHealth(): Promise<HealthResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend currently offline or unreachable:', err);
    return null;
  }
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data: ProjectsResponse = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Could not fetch projects from backend:', err);
    return [];
  }
}
