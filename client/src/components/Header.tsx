'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  ArrowUpRight,
  Command,
  Volume2,
  VolumeX,
  Palette,
  Sparkles,
} from 'lucide-react';
import { useThemeAccent, ACCENT_CONFIGS, AccentTheme } from './ThemeAccentContext';
import { playCyberClick, playCyberBeep } from './SoundEffects';
import CommandPalette from './CommandPalette';

export function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Header() {
  const { accent, setAccent, config, soundEnabled, setSoundEnabled } = useThemeAccent();
  const [commandOpen, setCommandOpen] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cycleTheme = () => {
    const themes: AccentTheme[] = ['emerald', 'cyan', 'purple', 'gold'];
    const nextIdx = (themes.indexOf(accent) + 1) % themes.length;
    setAccent(themes[nextIdx]);
    playCyberBeep(soundEnabled, 750);
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#06070b]/80 border-b border-[#1f293d]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#121620] border transition-all"
              style={{
                borderColor: config.border,
                color: config.primary,
                boxShadow: `0 0 10px ${config.glow}`,
              }}
            >
              <Terminal className="w-4 h-4" />
            </div>
            <a
              href="#hero"
              onClick={() => playCyberClick(soundEnabled)}
              className="font-mono font-extrabold text-lg tracking-wider text-white hover:opacity-90 transition-opacity"
            >
              TECHY<span style={{ color: config.primary }}>SHRUTI</span>
            </a>
            <span
              className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium border"
              style={{
                backgroundColor: config.bgSubtle,
                color: config.primary,
                borderColor: config.border,
              }}
            >
              <span
                className="w-1.5 h-1.5 mr-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: config.primary }}
              />
              v3.4.0-cluster
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 font-mono text-xs uppercase tracking-widest text-gray-400">
            <a
              href="#hero"
              onClick={() => playCyberClick(soundEnabled)}
              className="hover:text-white transition-colors"
            >
              Overview
            </a>
            <a
              href="#flow"
              onClick={() => playCyberClick(soundEnabled)}
              className="hover:text-white transition-colors"
            >
              Architecture
            </a>
            <a
              href="#stack"
              onClick={() => playCyberClick(soundEnabled)}
              className="hover:text-white transition-colors"
            >
              Stack
            </a>
            <a
              href="#builds"
              onClick={() => playCyberClick(soundEnabled)}
              className="hover:text-white transition-colors"
            >
              Builds
            </a>
            <a
              href="#backend"
              onClick={() => playCyberClick(soundEnabled)}
              className="hover:text-white transition-colors"
            >
              Live API
            </a>
            <a
              href="#contact"
              onClick={() => playCyberClick(soundEnabled)}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center space-x-2.5">
            {/* Quick Command Launcher Button */}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121620] border border-[#1f293d] hover:border-gray-400 text-xs font-mono text-gray-300 transition-all shadow-sm group"
              title="Open Command Palette (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5" style={{ color: config.primary }} />
              <span className="hidden sm:inline">Cmd+K</span>
            </button>

            {/* Theme Accent Cycler */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-xl bg-[#121620] border border-[#1f293d] hover:border-gray-400 text-gray-300 transition-all active:scale-95"
              title={`Switch Theme (Current: ${config.name})`}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: config.primary }} />
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={() => {
                setSoundEnabled((prev) => !prev);
                playCyberClick(true);
              }}
              className="p-2 rounded-xl bg-[#121620] border border-[#1f293d] hover:border-gray-400 text-gray-300 transition-all active:scale-95"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5" style={{ color: config.primary }} />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-gray-500" />
              )}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberClick(soundEnabled)}
              className="p-2 rounded-xl bg-[#121620] border border-[#1f293d] text-gray-300 hover:text-white hover:border-gray-400 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Contact Primary Action */}
            <a
              href="#contact"
              onClick={() => playCyberClick(soundEnabled)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono font-bold text-xs text-black transition-all transform active:scale-95 shadow-lg"
              style={{
                backgroundColor: config.primary,
                boxShadow: `0 0 15px ${config.glow}`,
              }}
            >
              GET IN TOUCH
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
