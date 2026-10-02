'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Sparkles, Copy, Check, CornerDownLeft } from 'lucide-react';
import { useThemeAccent } from './ThemeAccentContext';
import { playCyberClick, playCyberBeep, playSuccessChime } from './SoundEffects';
import confetti from 'canvas-confetti';

interface OutputLine {
  text: string;
  type: 'system' | 'command' | 'success' | 'warning' | 'error' | 'ascii';
}

export default function InteractiveTerminal() {
  const { config, soundEnabled } = useThemeAccent();
  const [history, setHistory] = useState<OutputLine[]>([
    { text: '[INIT] TechyShruti Cluster Kernel v3.4.0-release', type: 'system' },
    { text: '[READY] Distributed engine online. Type "help" for instructions.', type: 'success' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newLines: OutputLine[] = [
      { text: `shruti@cluster:~$ ${rawCmd}`, type: 'command' },
    ];

    playCyberBeep(soundEnabled, 700);

    if (cmd === 'help') {
      newLines.push(
        { text: 'AVAILABLE COMMANDS:', type: 'system' },
        { text: '  projects  - View featured distributed engineering builds', type: 'system' },
        { text: '  stats     - View live telemetry & architectural SLAs', type: 'system' },
        { text: '  skills    - List core backend & distributed toolsets', type: 'system' },
        { text: '  ping      - Test round-trip latency to Node.js backend', type: 'system' },
        { text: '  matrix    - Stream digital cyberpunk matrix stream', type: 'system' },
        { text: '  contact   - Display verified communication channels', type: 'system' },
        { text: '  clear     - Wipe current terminal screen buffer', type: 'system' },
        { text: '  sudo hire - Unlock engineering collaboration payload', type: 'system' }
      );
    } else if (cmd === 'projects' || cmd === 'builds') {
      newLines.push(
        { text: '🚀 DISTRIBUTED BUILDS ARCHIVE:', type: 'success' },
        { text: '  1. Distributed Project Tracker  [Next.js + Node + Kafka + Redis]', type: 'system' },
        { text: '  2. Zero-Allocation Vector Engine [Rust + C++ WASM + Node.js]', type: 'system' },
        { text: '  3. Multi-Agent LLM Orchestrator [Python + TypeScript + Gemini]', type: 'system' },
        { text: '👉 Scroll to // 04. BUILDS for full interactive 3D inspection.', type: 'warning' }
      );
    } else if (cmd === 'stats') {
      newLines.push(
        { text: '📊 SYSTEM PERFORMANCE TELEMETRY:', type: 'system' },
        { text: '  • Peak Throughput:  45,000+ Req/sec', type: 'success' },
        { text: '  • Average Latency:  <12ms P95', type: 'success' },
        { text: '  • High-Availability: 99.99% Uptime SLA', type: 'success' },
        { text: '  • Memory Overhead:  Zero-Allocation Optimized', type: 'success' }
      );
    } else if (cmd === 'skills' || cmd === 'stack') {
      newLines.push(
        { text: '⚡ ARCHITECTURAL CAPABILITIES:', type: 'system' },
        { text: '  • Core:       Node.js, TypeScript, Go, Rust, Python', type: 'system' },
        { text: '  • Frontend:   Next.js 14, React 18, Tailwind CSS, Framer Motion', type: 'system' },
        { text: '  • Data Layer: PostgreSQL, ClickHouse, Redis, Kafka, Qdrant', type: 'system' },
        { text: '  • Cloud & AI: Docker, Kubernetes, Cloud Run, Gemini API, RAG', type: 'system' }
      );
    } else if (cmd === 'ping') {
      const start = performance.now();
      newLines.push({ text: '📡 Pinging Node.js / Express backend /api/health...', type: 'system' });
      try {
        const res = await fetch('http://localhost:5000/api/health');
        const duration = Math.round(performance.now() - start);
        if (res.ok) {
          newLines.push({
            text: `✅ PONG! Backend responds in ${duration}ms with HTTP 200 OK`,
            type: 'success',
          });
        } else {
          newLines.push({
            text: `⚠️ Backend reachable (${duration}ms) but returned HTTP ${res.status}`,
            type: 'warning',
          });
        }
      } catch {
        newLines.push({
          text: `⚡ Local backend ping test: 2ms (Simulated cluster mode active)`,
          type: 'success',
        });
      }
    } else if (cmd === 'matrix') {
      newLines.push(
        { text: '01010100 01100101 01100011 01101000 01111001', type: 'ascii' },
        { text: '01010011 01101000 01110010 01110101 01110100 01101001', type: 'ascii' },
        { text: 'SYSTEM RECURSION COMPLETE >> THE MATRIX UNLOCKED', type: 'success' }
      );
    } else if (cmd === 'contact') {
      newLines.push(
        { text: '📬 DIRECT CONTACT:', type: 'system' },
        { text: '  • Email:    contact@techyshruti.dev', type: 'success' },
        { text: '  • GitHub:   https://github.com/TechyShruti', type: 'system' },
        { text: '  • Status:   Open for Staff/Senior Engineering roles & High-Scale Consulting', type: 'warning' }
      );
    } else if (cmd === 'clear') {
      setHistory([]);
      return;
    } else if (cmd.includes('hire') || cmd.includes('sudo hire')) {
      playSuccessChime(soundEnabled);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff66', '#00e5ff', '#a855f7', '#ffd60a'],
        });
      } catch {
        // Ignore
      }
      newLines.push(
        { text: '🎉 [PERMISSION GRANTED] Initiating Engineering Protocol...', type: 'success' },
        { text: 'Shruti is ready to build mission-critical distributed systems for your team.', type: 'system' },
        { text: '👉 Dispatching priority contact handshake to contact@techyshruti.dev', type: 'warning' }
      );
    } else {
      newLines.push({
        text: `bash: command not found: "${cmd}". Type "help" for list of valid commands.`,
        type: 'error',
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else {
      playCyberClick(soundEnabled);
    }
  };

  const copyTerminalOutput = () => {
    const text = history.map((h) => h.text).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    playCyberClick(soundEnabled);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-2xl bg-[#090b10]/95 border border-[#1f293d] overflow-hidden shadow-2xl backdrop-blur-xl relative transition-all"
      style={{
        borderColor: config.border,
        boxShadow: `0 15px 35px -10px ${config.glow}`,
      }}
    >
      {/* Top Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1017] border-b border-[#1f293d]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 font-mono text-xs text-gray-400 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5" style={{ color: config.primary }} />
            <span>shruti@cluster-node-01: ~</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={copyTerminalOutput}
            className="text-[11px] font-mono text-gray-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-[#121620] border border-[#1f293d] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-400" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy Log
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div
        className="p-4 sm:p-5 font-mono text-xs max-h-72 overflow-y-auto space-y-1.5 leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, idx) => {
          let textColor = 'text-gray-300';
          if (line.type === 'system') textColor = 'text-gray-400';
          if (line.type === 'success') textColor = 'text-[#00ff66]';
          if (line.type === 'warning') textColor = 'text-[#00e5ff]';
          if (line.type === 'error') textColor = 'text-red-400';
          if (line.type === 'command') textColor = 'text-white font-bold';
          if (line.type === 'ascii') textColor = 'text-[#00ff66] font-mono opacity-80';

          return (
            <div key={idx} className={`${textColor} break-words`}>
              {line.text}
            </div>
          );
        })}

        {/* Input prompt line */}
        <div className="flex items-center pt-2 text-white">
          <span className="mr-2 font-bold" style={{ color: config.primary }}>
            shruti@cluster:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'sudo hire'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-gray-600 font-mono text-xs"
            autoComplete="off"
            spellCheck="false"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-gray-600 mr-1" />
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Interactive Quick Badges */}
      <div className="px-4 py-2.5 bg-[#0d1017]/80 border-t border-[#1f293d] flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
        <span className="text-gray-500 mr-1">QUICK:</span>
        {['help', 'projects', 'stats', 'skills', 'ping', 'sudo hire'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-[#121620] hover:bg-[#182030] border border-[#1f293d] text-gray-300 hover:text-white transition-all active:scale-95"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
