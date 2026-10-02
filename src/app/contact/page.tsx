'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen space-y-12 bg-[#FAF8F5] text-[#121110]">
      <div className="border-b border-[#121110] pb-8 space-y-3">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest flex items-center gap-2">
          <span>01 // EDITORIAL CORRESPONDENCE</span>
          <span className="w-12 h-[1px] bg-[#E63B19]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
          Editorial Desk & Inquiries
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#57534E] max-w-xl">
          Have an architectural question, guest submission proposal, or technical critique? Every note is read by our editorial team.
        </p>
      </div>

      <div className="p-8 sm:p-10 border border-[#E6E1D8] bg-[#F4EFE6]">
        {submitted ? (
          <div className="p-8 text-center space-y-3 border border-[#121110] bg-[#FAF8F5]">
            <CheckCircle className="w-8 h-8 text-[#E63B19] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#121110]">Dispatch Received</h3>
            <p className="font-mono text-xs text-[#57534E]">
              Thank you for writing. Our editorial team will review your message and reply via email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] font-bold text-[#78716C] uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Shruti Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-[#E6E1D8] text-xs font-mono text-[#121110] placeholder-[#A8A29E] focus:outline-none focus:border-[#121110]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-[#78716C] uppercase tracking-wider mb-1">
                  Your Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="architect@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-[#E6E1D8] text-xs font-mono text-[#121110] placeholder-[#A8A29E] focus:outline-none focus:border-[#121110]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] font-bold text-[#78716C] uppercase tracking-wider mb-1">
                Your Note / Proposal *
              </label>
              <textarea
                rows={5}
                required
                placeholder="Describe your inquiry, architecture breakdown proposal, or correction in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-[#FAF8F5] border border-[#E6E1D8] text-xs font-mono text-[#121110] placeholder-[#A8A29E] focus:outline-none focus:border-[#121110] leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#121110] hover:bg-[#E63B19] text-[#FAF8F5] font-mono text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <span>TRANSMIT DISPATCH</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
