import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090a0f',
        foreground: '#ededed',
        cyber: {
          green: '#00ff66',
          cyan: '#00e5ff',
          yellow: '#ffe600',
          purple: '#a855f7',
          dark: '#0e1118',
          card: '#121620',
          border: '#1f293d',
          accent: '#182030',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': "radial-gradient(circle, rgba(0, 255, 102, 0.08) 1px, transparent 1px)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
