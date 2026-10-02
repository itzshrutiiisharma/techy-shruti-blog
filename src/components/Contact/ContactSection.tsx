"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, Sparkles, Github, Youtube, Linkedin, Twitter, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const email = "contact@techyshruti.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FF92A5", "#38BDF8", "#FBBF24", "#34D399"],
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 max-w-6xl mx-auto w-full">
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF92A5]/10 border border-[#FF92A5]/30 text-[#FF92A5] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
          Let&apos;s Build Something <span className="text-[#FF92A5]">Extraordinary</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Have an exciting project, AI collaboration, or speaking opportunity? Let&apos;s connect!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* LEFT COLUMN: QUICK REACH OUT & SOCIALS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Email Quick Copy Card */}
          <div className="p-7 rounded-3xl bg-[#141A29] border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FF92A5]/10 border border-[#FF92A5]/20 flex items-center justify-center text-[#FF92A5]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Direct Email</p>
                <p className="text-sm font-bold text-white">{email}</p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#FF92A5] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Hub Card */}
          <div className="p-7 rounded-3xl bg-[#141A29] border border-slate-800 shadow-xl backdrop-blur-md">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Connect Across Platforms
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500 text-slate-300 hover:text-rose-400 text-xs font-medium flex items-center gap-2.5 transition-all"
              >
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>YouTube</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-2.5 transition-all"
              >
                <Github className="w-4 h-4 text-white" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-sky-400 text-xs font-medium flex items-center gap-2.5 transition-all"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-sky-400 text-slate-300 hover:text-sky-300 text-xs font-medium flex items-center gap-2.5 transition-all"
              >
                <Twitter className="w-4 h-4 text-sky-400" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE CONTACT FORM */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 rounded-3xl bg-[#141A29] border border-slate-800 shadow-2xl backdrop-blur-md flex flex-col justify-between"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white">Message Sent!</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  Thank you for reaching out! Shruti will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#FF92A5] focus:outline-none text-slate-100 text-sm placeholder:text-slate-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#FF92A5] focus:outline-none text-slate-100 text-sm placeholder:text-slate-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, idea, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-[#FF92A5] focus:outline-none text-slate-100 text-sm placeholder:text-slate-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#FF92A5] hover:bg-[#ff7a92] text-[#0E131F] font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(255,146,165,0.35)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-28 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Techy Shruti. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Engineered with <span className="text-[#FF92A5]">&hearts;</span> Next.js &amp; Framer Motion
        </p>
      </footer>
    </section>
  );
}
