'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';

export function NewsletterBox({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.data?.message || 'You are subscribed to The Letter.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error?.message || 'Subscription failed. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (compact) {
    return (
      <div className="p-6 bg-[#F4EFE6] border border-[#E6E1D8] text-[#121110]">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest mb-1">
          04 // THE DISPATCH
        </div>
        <h4 className="font-serif text-lg font-bold mb-2 text-[#121110]">
          The Letter.
        </h4>
        <p className="text-xs font-sans text-[#57534E] mb-4 leading-relaxed">
          Architectural breakdowns, systems trade-offs, and essays. Published fortnightly.
        </p>

        {status === 'success' ? (
          <div className="p-3 bg-[#FAF8F5] border border-[#121110] text-[#121110] text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0 text-[#E63B19]" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E6E1D8] text-xs font-mono text-[#121110] placeholder-[#A8A29E] focus:outline-none focus:border-[#121110]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2 px-3 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] text-xs font-mono font-bold flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <span>{status === 'loading' ? 'TRANSMITTING...' : 'SUBSCRIBE FREE →'}</span>
            </button>
            {status === 'error' && (
              <p className="font-mono text-[10px] text-[#E63B19] mt-1">{message}</p>
            )}
          </form>
        )}
      </div>
    );
  }

  return (
    <section
      id="newsletter-subscribe"
      className="relative my-20 sm:my-28 border-y border-[#121110] bg-[#FAF8F5] py-16 sm:py-24 text-[#121110]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Title / Editorial Statement */}
          <div className="md:col-span-6 space-y-4">
            <div className="font-mono text-[11px] uppercase font-bold text-[#E63B19] tracking-widest flex items-center gap-2">
              <span>05 // THE LETTER</span>
              <span className="w-12 h-[1px] bg-[#E63B19]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110] leading-tight">
              A few good ideas.
              <br />
              <span className="italic font-normal">Occasionally.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#57534E] leading-relaxed max-w-sm">
              In-depth essays on distributed systems, modern AI infrastructure, and software architecture delivered directly to your inbox. No spam. Ever.
            </p>
          </div>

          {/* Right Input Form */}
          <div className="md:col-span-6 bg-[#F4EFE6] p-6 sm:p-8 border border-[#E6E1D8]">
            {status === 'success' ? (
              <div className="p-6 bg-[#FAF8F5] border border-[#121110] text-[#121110] space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#E63B19]">
                  <CheckCircle className="w-4 h-4" />
                  <span>SUBSCRIPTION CONFIRMED</span>
                </div>
                <p className="font-serif text-lg font-bold">{message}</p>
                <p className="font-mono text-xs text-[#78716C]">You will receive our next architectural dispatch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="font-mono text-[10px] text-[#78716C] uppercase tracking-wider">
                  ENTER YOUR WORK EMAIL ADDRESS
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="architect@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#E6E1D8] text-xs sm:text-sm font-mono text-[#121110] placeholder-[#A8A29E] focus:outline-none focus:border-[#121110]"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                  >
                    <span>{status === 'loading' ? 'SUBMITTING...' : 'SUBSCRIBE'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-[#E63B19]">{message}</p>
                )}

                <div className="flex items-center gap-2 text-[10px] font-mono text-[#78716C] pt-2 border-t border-[#E6E1D8]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#121110]" />
                  <span>Curated by Shruti Sharma. Unsubscribe with 1-click anytime.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
