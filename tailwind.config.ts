import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#8B5CF6',
          pink:   '#EC4899',
          hot:    '#F43F5E',
          cyan:   '#06B6D4',
          amber:  '#F59E0B',
          emerald:'#10B981',
        },
        dark: {
          base:    '#08090E',
          surface: '#0E1018',
          card:    '#12151F',
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)",    "Inter",          "system-ui",  "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk",  "system-ui",  "sans-serif"],
        mono:    ["var(--font-mono)",    "JetBrains Mono", "monospace"],
        serif:   ["var(--font-serif)",   "Newsreader",     "Georgia",    "serif"],
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.1)',
        'glow-pink':   '0 0 40px rgba(244,  63,  94, 0.25)',
        'glow-cyan':   '0 0 30px rgba(  6, 182, 212, 0.25)',
        'card-dark':   '0 4px 24px rgba(0, 0, 0, 0.6)',
        'card-hover':  '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.1)',
      },
      backgroundImage: {
        'vivid-gradient':     'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F43F5E 100%)',
        'vivid-gradient-rev': 'linear-gradient(135deg, #F43F5E 0%, #EC4899 50%, #8B5CF6 100%)',
        'grid-dark':          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'hero-radial':        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 100%)',
        'pink-radial':        'radial-gradient(circle at 80% 50%, rgba(244,63,94,0.12) 0%, transparent 60%)',
      },
      animation: {
        'fade-in':         'fadeIn 0.5s ease forwards',
        'slide-up':        'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee-left':    'marqueeLeft 40s linear infinite',
        'marquee-right':   'marqueeRight 40s linear infinite',
        'glow-pulse':      'glowPulse 4s ease-in-out infinite',
        'float':           'floatUp 5s ease-in-out infinite',
        'float-delayed':   'floatUp 5s ease-in-out infinite 1.5s',
        'beam':            'beamSlide 4s ease-in-out infinite',
        'beam-delayed':    'beamSlide 4s ease-in-out infinite 2s',
        'orbit':           'orbit 20s linear infinite',
        'orbit-slow':      'orbit 35s linear infinite',
        'orbit-reverse':   'orbitReverse 28s linear infinite',
        'shimmer':         'shimmer 2s infinite linear',
        'count-up':        'countUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'cursor-blink':    'cursorBlink 1s step-end infinite',
        'ping-slow':       'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        marqueeLeft:     { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeRight:    { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } },
        glowPulse:       { '0%,100%': { opacity: '0.4', transform: 'scale(1)' }, '50%': { opacity: '0.7', transform: 'scale(1.06)' } },
        floatUp:         { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
        beamSlide:       { '0%': { opacity: '0', transform: 'translateX(-100%) skewX(-10deg)' }, '30%': { opacity: '1' }, '100%': { opacity: '0', transform: 'translateX(200%) skewX(-10deg)' } },
        orbit:           { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        orbitReverse:    { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        shimmer:         { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
        countUp:         { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        cursorBlink:     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
};
export default config;
