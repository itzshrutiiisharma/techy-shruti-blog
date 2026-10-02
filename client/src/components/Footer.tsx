'use client';

import React, { useState } from 'react';
import { Terminal, Mail, ArrowUpRight, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { GithubIcon } from './Header';
import { useThemeAccent } from './ThemeAccentContext';
import { playCyberClick, playSuccessChime } from './SoundEffects';

export default function Footer() {
  const { config, soundEnabled } = useThemeAccent();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@techyshruti.dev');
    setCopied(true);
    playSuccessChime(soundEnabled);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="bg-[#040508] border-t border-[#1f293d] pt-20 pb-12 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-1/4 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ backgroundColor: config.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Call To Action Box */}
        <div
          className="bg-[#0e1118]/90 backdrop-blur-md border border-[#1f293d] rounded-3xl p-8 sm:p-14 mb-16 relative overflow-hidden transition-all shadow-2xl"
          style={{
            borderColor: config.border,
            boxShadow: `0 20px 40px -15px ${config.glow}`,
          }}
        >
          <div className="max-w-3xl">
            <span
              className="font-mono text-xs uppercase tracking-widest block mb-3 font-semibold"
              style={{ color: config.primary }}
            >
              // INITIATE ENGINEERING COLLABORATION
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              READY TO BUILD SOMETHING <br />
              <span style={{ color: config.primary }}>EXTRAORDINARY?</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed mb-8">
              Whether you are architecting a distributed microservices infrastructure, designing zero-allocation vector search engines, or deploying autonomous AI agent pipelines — let&apos;s build the future together.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:contact@techyshruti.dev"
                onClick={() => playCyberClick(soundEnabled)}
                className="px-6 py-3.5 rounded-xl font-mono font-bold text-xs text-black transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:scale-95 shadow-xl"
                style={{
                  backgroundColor: config.primary,
                  boxShadow: `0 0 20px ${config.glow}`,
                }}
              >
                <Mail className="w-4 h-4" />
                INITIATE DIRECT CONTACT
              </a>

              <button
                onClick={copyEmail}
                className="px-5 py-3.5 rounded-xl bg-[#121620] border border-[#1f293d] hover:border-gray-400 text-gray-200 font-mono text-xs transition-all flex items-center gap-2 active:scale-95 shadow-md"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>COPIED (contact@techyshruti.dev)</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL ADDRESS</span>
                  </>
                )}
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick(soundEnabled)}
                className="px-5 py-3.5 rounded-xl bg-[#090a0f] border border-[#1f293d] hover:border-gray-400 text-gray-300 hover:text-white font-mono text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB PROFILE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1f293d]/60">
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#121620] border"
              style={{
                borderColor: config.border,
                color: config.primary,
              }}
            >
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-mono font-extrabold text-sm tracking-wider text-white">
              TECHY<span style={{ color: config.primary }}>SHRUTI</span>
            </span>
            <span className="text-xs font-mono text-gray-500">
              © {new Date().getFullYear()} • Distributed Systems Cluster
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono text-gray-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TWITTER / X
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
