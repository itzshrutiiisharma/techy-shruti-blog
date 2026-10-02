'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Terminal,
  Layers,
  Cpu,
  Server,
  Mail,
  Volume2,
  VolumeX,
  Palette,
  ExternalLink,
  Zap,
  Check,
} from 'lucide-react';
import { useThemeAccent, ACCENT_CONFIGS, AccentTheme } from './ThemeAccentContext';
import { playCyberClick, playCyberBeep } from './SoundEffects';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Theme' | 'Actions';
  icon: React.ElementType;
  action: () => void;
  badge?: string;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { accent, setAccent, config, soundEnabled, setSoundEnabled } = useThemeAccent();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
      playCyberBeep(soundEnabled, 880);
    }
  }, [isOpen, soundEnabled]);

  const scrollTo = (id: string) => {
    onClose();
    playCyberClick(soundEnabled);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-overview',
      title: 'Navigate to Overview & Hero',
      category: 'Navigation',
      icon: Terminal,
      action: () => scrollTo('hero'),
    },
    {
      id: 'nav-architecture',
      title: 'Explore Architecture Data Pipeline',
      category: 'Navigation',
      icon: Zap,
      action: () => scrollTo('flow'),
      badge: 'Interactive Flow',
    },
    {
      id: 'nav-tech',
      title: 'View Architectural Tech Universe',
      category: 'Navigation',
      icon: Cpu,
      action: () => scrollTo('stack'),
    },
    {
      id: 'nav-builds',
      title: 'Explore Selected Builds & 3D Cards',
      category: 'Navigation',
      icon: Layers,
      action: () => scrollTo('builds'),
      badge: '3D Showcase',
    },
    {
      id: 'nav-backend',
      title: 'Open Live Backend API Sandbox',
      category: 'Navigation',
      icon: Server,
      action: () => scrollTo('backend'),
      badge: 'Live Ping',
    },
    {
      id: 'nav-contact',
      title: 'Contact Shruti & System Credentials',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollTo('contact'),
    },
    // Theme Accents
    {
      id: 'theme-emerald',
      title: 'Theme Accent: Matrix Emerald',
      category: 'Theme',
      icon: Palette,
      action: () => {
        setAccent('emerald');
        playCyberBeep(soundEnabled, 650);
      },
      badge: accent === 'emerald' ? 'Active' : undefined,
    },
    {
      id: 'theme-cyan',
      title: 'Theme Accent: Cyber Cyan',
      category: 'Theme',
      icon: Palette,
      action: () => {
        setAccent('cyan');
        playCyberBeep(soundEnabled, 750);
      },
      badge: accent === 'cyan' ? 'Active' : undefined,
    },
    {
      id: 'theme-purple',
      title: 'Theme Accent: Electric Violet',
      category: 'Theme',
      icon: Palette,
      action: () => {
        setAccent('purple');
        playCyberBeep(soundEnabled, 850);
      },
      badge: accent === 'purple' ? 'Active' : undefined,
    },
    {
      id: 'theme-gold',
      title: 'Theme Accent: Solar Amber',
      category: 'Theme',
      icon: Palette,
      action: () => {
        setAccent('gold');
        playCyberBeep(soundEnabled, 950);
      },
      badge: accent === 'gold' ? 'Active' : undefined,
    },
    // Actions
    {
      id: 'act-sound',
      title: soundEnabled ? 'Mute Cyber Audio Effects' : 'Enable Cyber Audio Effects',
      category: 'Actions',
      icon: soundEnabled ? VolumeX : Volume2,
      action: () => {
        setSoundEnabled((prev) => !prev);
        playCyberClick(true);
      },
      badge: soundEnabled ? 'Sound ON' : 'Muted',
    },
    {
      id: 'act-github',
      title: 'Open GitHub Repository Profile',
      category: 'Actions',
      icon: ExternalLink,
      action: () => {
        onClose();
        window.open('https://github.com', '_blank');
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
        playCyberClick(soundEnabled);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
        playCyberClick(soundEnabled);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, soundEnabled]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-[#0e1118]/95 border border-[#1f293d] rounded-2xl shadow-2xl overflow-hidden z-10"
            style={{
              borderColor: config.border,
              boxShadow: `0 0 35px ${config.glow}`,
            }}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#1f293d] bg-[#090a0f]/60">
              <Search className="w-5 h-5 mr-3" style={{ color: config.primary }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or jump to section... (e.g. builds, api, theme)"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent font-mono text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-[#121620] border border-[#1f293d] rounded">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#1f293d]/30">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-gray-500">
                  No matching cyber commands found for &ldquo;{search}&rdquo;
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors font-mono text-xs ${
                        isSelected
                          ? 'bg-[#182030] text-white border border-[#1f293d]'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                      style={{
                        borderColor: isSelected ? config.border : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-md ${
                            isSelected ? 'bg-[#090a0f]' : 'bg-[#121620]'
                          }`}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: isSelected ? config.primary : '#94a3b8' }}
                          />
                        </div>
                        <div>
                          <div className={isSelected ? 'text-white font-medium' : 'text-gray-300'}>
                            {item.title}
                          </div>
                          <div className="text-[10px] text-gray-500">{item.category}</div>
                        </div>
                      </div>

                      {item.badge && (
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono"
                          style={{
                            backgroundColor: config.bgSubtle,
                            color: config.primary,
                            border: `1px solid ${config.border}`,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Bar */}
            <div className="px-4 py-2 bg-[#090a0f]/80 border-t border-[#1f293d] flex items-center justify-between text-[11px] font-mono text-gray-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-[#121620] border border-[#1f293d] rounded text-[10px]">
                    ↑
                  </kbd>{' '}
                  <kbd className="px-1.5 py-0.5 bg-[#121620] border border-[#1f293d] rounded text-[10px]">
                    ↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-[#121620] border border-[#1f293d] rounded text-[10px]">
                    ↵
                  </kbd>{' '}
                  Select
                </span>
              </div>
              <span style={{ color: config.primary }}>TechyShruti Command v3.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
