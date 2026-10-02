'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { useTheme, ThemeType } from '@/contexts/ThemeContext';
import {
  Search,
  Bookmark,
  User as UserIcon,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Sparkles,
  Palette,
} from 'lucide-react';
import { SearchModal } from './SearchModal';

export function Header() {
  const pathname = usePathname();
  const { user, logout, isStaff } = useAuth();
  const { openModal } = useAuthModal();
  const { theme, setTheme } = useTheme();

  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.target.closest('#user-menu-btn') && !e.target.closest('#user-dropdown')) {
        setUserDropdownOpen(false);
      }
      if (!e.target.closest('#theme-menu-btn') && !e.target.closest('#theme-dropdown')) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Keyboard shortcut Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Explore', href: '/blog' },
    { label: 'AI & ML', href: '/category/ai-machine-learning' },
    { label: 'Architecture', href: '/category/software-architecture' },
    { label: 'Distributed Systems', href: '/category/cloud-distributed-systems' },
    { label: 'About', href: '/about' },
  ];

  const themes: { id: ThemeType; label: string; color: string }[] = [
    { id: 'obsidian', label: 'Obsidian Dark', color: '#6366F1' },
    { id: 'violet', label: 'Midnight Violet', color: '#A855F7' },
    { id: 'emerald', label: 'Cyber Emerald', color: '#10B981' },
    { id: 'light', label: 'Contrast Light', color: '#3B82F6' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-base)]/85 backdrop-blur-xl border-b border-[var(--border-color)] shadow-glass py-3'
            : 'bg-transparent border-b border-[var(--border-color)]/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group transition-opacity duration-300 opacity-100"
            >
              <span className="font-display-editorial text-2xl font-black text-stone-900 dark:text-white tracking-tight group-hover:opacity-80 transition-opacity">
                Techy.Shruti
              </span>
              <span className="hidden sm:inline font-mono text-[9px] font-bold text-stone-500 tracking-widest uppercase border-l mag-border-dark pl-2">
                MAGAZINE
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-[var(--bg-card)]/70 border border-[var(--border-color)] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[var(--accent-primary)] text-white shadow-glow-indigo'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Theme Selector, Auth, CMS */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-medium transition"
                title="Search articles (⌘K / Ctrl+K)"
              >
                <Search className="w-4 h-4 text-[var(--text-muted)]" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[var(--bg-base)] rounded border border-[var(--border-color)] text-[var(--text-muted)]">
                  ⌘K
                </kbd>
              </button>

              {/* Dynamic Theme Switcher Dropdown */}
              <div className="relative">
                <button
                  id="theme-menu-btn"
                  onClick={() => setThemeDropdownOpen((prev) => !prev)}
                  className="p-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition flex items-center gap-1.5"
                  title="Switch Theme"
                >
                  <Palette className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span className="hidden lg:inline text-xs font-semibold uppercase">
                    {theme}
                  </span>
                </button>

                {themeDropdownOpen && (
                  <div
                    id="theme-dropdown"
                    className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-glass p-2 z-50 animate-fadeIn"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      SELECT THEME
                    </div>
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          theme === t.id
                            ? 'bg-[var(--badge-bg)] text-[var(--accent-primary)] border border-[var(--badge-border)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: t.color }}
                          />
                          <span>{t.label}</span>
                        </div>
                        {theme === t.id && <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Account / Auth Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    id="user-menu-btn"
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] text-[var(--text-primary)] text-xs transition"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-[var(--accent-primary)]/50"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white text-[11px] font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden sm:inline font-medium">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      id="user-dropdown"
                      className="absolute right-0 mt-2 w-56 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-glass p-2 z-50 text-xs animate-fadeIn"
                    >
                      <div className="px-3 py-2 border-b border-[var(--border-color)] mb-1">
                        <div className="font-bold text-[var(--text-primary)]">{user.name}</div>
                        <div className="text-[11px] text-[var(--text-muted)] truncate">{user.email}</div>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold bg-[var(--badge-bg)] text-[var(--accent-primary)] rounded-full border border-[var(--badge-border)]">
                          {user.role}
                        </span>
                      </div>

                      {isStaff && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-[var(--accent-primary)] hover:bg-[var(--bg-card-hover)] rounded-xl transition font-bold"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Admin CMS</span>
                        </Link>
                      )}

                      <Link
                        href="/account/bookmarks"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-xl transition font-medium"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>Saved Articles</span>
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition text-left mt-1 border-t border-[var(--border-color)] font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-semibold transition"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Direct Admin or Subscribe CTA */}
              {isStaff ? (
                <Link
                  href="/admin"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-xs shadow-glow-indigo transition hover:scale-103"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>CMS Portal</span>
                </Link>
              ) : (
                <a
                  href="#newsletter-subscribe"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-white font-bold text-xs shadow-glow-indigo transition"
                >
                  <span>Subscribe</span>
                </a>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  pathname === link.href
                    ? 'text-white bg-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Live Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
