import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Newsreader } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthModalProvider } from '@/contexts/AuthModalContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Public/Header';
import { Footer } from '@/components/Public/Footer';
import { AuthModal } from '@/components/Public/AuthModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const serif = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'SHRUTI BLOGS — AI, Distributed Systems & Modern Architecture',
    template: '%s | Shruti Blogs',
  },
  description:
    'High-velocity engineering breakdowns, distributed systems, and AI agent architectures by Shruti Sharma.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'SHRUTI BLOGS — AI, Distributed Systems & Modern Architecture',
    description:
      'In-depth architectural breakdowns, distributed consensus, and AI engineering blueprints.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Shruti Blogs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable} ${serif.variable} font-sans bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-[#E11D48] selection:text-white min-h-screen flex flex-col transition-colors duration-200`}
      >
        <ThemeProvider>
          <AuthProvider>
            <AuthModalProvider>
              {/* Floating Minimalist Header */}
              <Header />

              {/* Main Content */}
              <main className="flex-1">{children}</main>

              {/* Footer */}
              <Footer />

              {/* Universal Auth Dialog */}
              <AuthModal />
            </AuthModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
