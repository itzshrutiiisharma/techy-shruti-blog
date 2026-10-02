import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeAccentProvider } from '../components/ThemeAccentContext';
import ParticleCanvas from '../components/ParticleCanvas';
import ScrollProgress from '../components/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'TechyShruti — Distributed Systems & High-Throughput Architect',
  description:
    'A futuristic full-stack engineering portfolio featuring distributed systems, zero-allocation engines, multi-agent AI orchestrators, and real-time telemetry by Shruti.',
  keywords: [
    'Software Architect',
    'Fullstack Engineer',
    'Distributed Systems',
    'Next.js 14',
    'Node.js',
    'TypeScript',
    'Zero-Allocation',
    'AI Agents',
    'TechyShruti',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#06070b] text-gray-100 min-h-screen antialiased selection:bg-[#00ff66] selection:text-black relative`}
      >
        <ThemeAccentProvider>
          <ParticleCanvas />
          <ScrollProgress />
          {children}
        </ThemeAccentProvider>
      </body>
    </html>
  );
}
