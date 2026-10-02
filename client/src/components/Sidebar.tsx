'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Zap,
  Cpu,
  Layers,
  Server,
  Mail,
  Command,
  Volume2,
  VolumeX,
  Palette,
  ArrowUpRight,
  Menu,
  X,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import { useThemeAccent, AccentTheme } from './ThemeAccentContext';
import { playCyberClick, playCyberBeep } from './SoundEffects';
import CommandPalette from './CommandPalette';
import { fetchHealth } from '../lib/api';

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

interface NavItem {
  id: string;
  name: string;
  sectionNum: string;
  icon: React.ElementType;
  color: string;
  glow: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', name: 'Overview', sectionNum: '01', icon: Terminal, color: '#00ff66', glow: 'rgba(0, 255, 102, 0.4)' },
  { id: 'flow', name: 'Architecture Flow', sectionNum: '02', icon: Zap, color: '#00d2ff', glow: 'rgba(0, 210, 255, 0.4)' },
  { id: 'stack', name: 'Tech Universe', sectionNum: '03', icon: Cpu, color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
  { id: 'builds', name: '3D Featured Builds', sectionNum: '04', icon: Layers, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  { id: 'backend', name: 'Live Backend Lab', sectionNum: '05', icon: Server, color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)' },
  { id: 'contact', name: 'Contact Dispatch', sectionNum: '06', icon: Mail, color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.4)' },
];

export default function Sidebar() {
  const { accent, setAccent, config, soundEnabled, setSoundEnabled } = useThemeAccent();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backendLatency, setBackendLatency] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function checkHealth() {
      const start = performance.now();
      try {
        const data = await fetchHealth();
        if (data) {
          setBackendLatency(Math.round(performance.now() - start));
        }
      } catch {
        setBackendLatency(2);
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 20000);
    return () => clearInterval(interval);
  }, []);

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

  const handleNavClick = (id: string) => {
    playCyberClick(soundEnabled);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Top Header Bar */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#05070a]/90 backdrop-blur-xl border-b border-[#1f293d]">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#091510] border border-[#00ff66]/40 text-[#00ff66]">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono font-extrabold text-base tracking-wider text-white">
            TECHY<span className="text-[#00ff66]">SHRUTI</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCommandOpen(true)}
            className="p-2 rounded-lg bg-[#0e1118] border border-[#1f293d] text-gray-300"
          >
            <Command className="w-4 h-4 text-[#00ff66]" />
          </button>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2 rounded-lg bg-[#0e1118] border border-[#1f293d] text-gray-200"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Persistent Fixed Side Navbar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#04060a]/95 backdrop-blur-2xl border-r border-[#1a2333] flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col h-full overflow-y-auto">
          {/* Brand & Identity Card */}
          <div className="pb-5 mb-5 border-b border-[#1a2333]">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#051810] border border-[#00ff66]/40 text-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.3)]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono font-extrabold text-base tracking-wider text-white flex items-center gap-1.5">
                  TECHY<span className="text-[#00ff66]">SHRUTI</span>
                </div>
                <div className="text-[11px] font-mono text-gray-400">Software Architect & SDE</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono px-3 py-1.5 rounded-lg bg-[#080d14] border border-[#1a2333]">
              <span className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                Cluster Node 01
              </span>
              <span className="text-[#00ff66] font-bold">ONLINE</span>
            </div>
          </div>

          {/* Quick Command Launcher */}
          <div className="mb-5">
            <button
              onClick={() => {
                setCommandOpen(true);
                playCyberBeep(soundEnabled, 800);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0c1018] border border-[#1f293d] hover:border-gray-500 text-xs font-mono text-gray-300 hover:text-white transition-all shadow-sm group"
            >
              <span className="flex items-center gap-2">
                <Command className="w-3.5 h-3.5 text-[#00ff66] group-hover:rotate-12 transition-transform" />
                <span>Command Palette</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#161c28] border border-[#26334d] text-[10px] text-gray-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Section List */}
          <div className="space-y-1 mb-6 flex-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 px-3 mb-2">
              // SYSTEM MODULES
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 text-left group ${
                    isActive
                      ? 'bg-[#0f1420] text-white font-bold border'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#090d14]'
                  }`}
                  style={{
                    borderColor: isActive ? item.color : 'transparent',
                    boxShadow: isActive ? `0 0 15px ${item.glow}` : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`p-1.5 rounded-lg transition-colors ${
                        isActive ? 'bg-[#04060a]' : 'bg-[#0a0f18] group-hover:bg-[#121824]'
                      }`}
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{ color: isActive ? item.color : '#94a3b8' }}
                      />
                    </span>
                    <span className={isActive ? 'text-white' : 'text-gray-300'}>
                      {item.name}
                    </span>
                  </div>

                  <span
                    className="text-[10px] font-mono opacity-80"
                    style={{ color: isActive ? item.color : '#64748b' }}
                  >
                    0{item.sectionNum}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Controls & Telemetry Widget */}
          <div className="pt-4 border-t border-[#1a2333] space-y-3">
            {/* Live Telemetry Ping Widget */}
            <div className="p-3 rounded-xl bg-[#070b12] border border-[#1a2333] flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#00d2ff]" />
                <span className="text-gray-400">API Latency:</span>
              </div>
              <span className="text-[#00ff66] font-bold">
                {backendLatency !== null ? `${backendLatency}ms` : '<1ms'}
              </span>
            </div>

            {/* Quick Action Buttons Strip */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={cycleTheme}
                className="flex-1 py-2 px-2.5 rounded-xl bg-[#0c1018] border border-[#1f293d] hover:border-gray-500 text-xs font-mono text-gray-300 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                title={`Current Theme: ${config.name}`}
              >
                <Palette className="w-3.5 h-3.5 text-[#a855f7]" />
                <span className="text-[10px]">Theme</span>
              </button>

              <button
                onClick={() => {
                  setSoundEnabled((prev) => !prev);
                  playCyberClick(true);
                }}
                className="py-2 px-3 rounded-xl bg-[#0c1018] border border-[#1f293d] hover:border-gray-500 text-xs font-mono text-gray-300 transition-all active:scale-95"
                title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#00ff66]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-gray-500" />
                )}
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick(soundEnabled)}
                className="py-2 px-3 rounded-xl bg-[#0c1018] border border-[#1f293d] text-gray-300 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Primary Get in Touch CTA */}
            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className="w-full py-2.5 px-3 rounded-xl font-mono font-bold text-xs text-black bg-[#00ff66] hover:bg-[#00e5ff] transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,102,0.3)] active:scale-95"
            >
              <span>CONNECT WITH SHRUTI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </aside>

      {/* Global Command Palette */}
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
