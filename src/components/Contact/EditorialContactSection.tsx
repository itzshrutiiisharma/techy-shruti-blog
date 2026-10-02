"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, Sparkles, Github, Youtube, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

export function EditorialContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const email = "contact@shrutisharma.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#FFA0B6", "#38BDF8", "#FBBF24", "#34D399"],
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto w-full select-none">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFA0B6]/10 border border-[#FFA0B6]/30 text-[#FFA0B6] font-poppins font-bold text-xs uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-poppins text-white tracking-tight">
          Let&apos;s Build <span className="text-[#FFA0B6]">Together</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Open for engineering leadership roles, AI research collaborations, tech talks, and advisory opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT COLUMN: QUICK REACH OUT & SOCIALS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Direct Email Card */}
          <div className="p-8 rounded-[32px] bg-[#1F2740] border-2 border-slate-700/60 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFA0B6]/10 border border-[#FFA0B6]/30 flex items-center justify-center text-[#FFA0B6]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Direct Channel</p>
                <p className="text-sm sm:text-base font-bold text-white">{email}</p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-[#FFA0B6] text-[#1A2035] font-poppins font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#1A2035]" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Hub */}
          <div className="p-8 rounded-[32px] bg-[#1F2740] border-2 border-slate-700/60 shadow-xl backdrop-blur-md">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Follow &amp; Connect
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500 text-slate-300 hover:text-rose-400 text-xs font-bold flex items-center gap-2.5 transition-all"
              >
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>YouTube</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-white text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2.5 transition-all"
              >
                <Github className="w-4 h-4 text-white" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-slate-300 hover:text-sky-400 text-xs font-bold flex items-center gap-2.5 transition-all"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-400 text-slate-300 hover:text-sky-300 text-xs font-bold flex items-center gap-2.5 transition-all"
              >
                <Twitter className="w-4 h-4 text-sky-400" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-[36px] bg-[#1F2740] border-2 border-slate-700/60 shadow-2xl backdrop-blur-md flex flex-col justify-between"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-xl">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-black font-poppins text-white">Message Delivered!</h3>
                <p className="text-sm text-slate-300 max-w-sm">
                  Thank you for reaching out! Shruti will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 focus:border-[#FFA0B6] focus:outline-none text-slate-100 text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 focus:border-[#FFA0B6] focus:outline-none text-slate-100 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, idea, or role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 focus:border-[#FFA0B6] focus:outline-none text-slate-100 text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#FFA0B6] hover:bg-[#ff8da8] text-[#1A2035] font-poppins font-black text-sm tracking-wide shadow-[0_10px_30px_rgba(255,160,182,0.4)] hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
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
      <footer className="mt-28 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <p>&copy; {new Date().getFullYear()} Shruti Sharma. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Crafted with Next.js, Framer Motion &amp; Editorial Aesthetics
        </p>
      </footer>
    </section>
  );
}
