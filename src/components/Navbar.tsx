"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code, Sparkles, Send, FileText, Terminal } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills & Tech", href: "#skills" },
    { name: "Milestones", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* FLOATING TOP NAVIGATION BAR */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`pointer-events-auto flex items-center justify-between gap-6 px-5 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#141A29]/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl"
              : "bg-slate-900/60 border border-slate-700/40 backdrop-blur-md shadow-lg"
          }`}
        >
          {/* Brand Pill */}
          <a
            href="#"
            className="flex items-center gap-2 group font-display font-extrabold text-lg text-white"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF92A5] to-purple-600 flex items-center justify-center text-[#0E131F] font-black text-sm shadow-md group-hover:scale-110 transition-transform">
              TS
            </div>
            <span className="tracking-tight hidden sm:inline-block">
              Techy<span className="text-[#FF92A5]">Shruti</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 px-3 py-1 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-full bg-white text-[#0E131F] font-bold text-xs shadow-md hover:bg-[#FF92A5] hover:text-[#0E131F] transition-all hidden sm:flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              Get in Touch
            </a>

            {/* Mobile Menu Trigger Pill (=) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-white hover:border-[#FF92A5] hover:text-[#FF92A5] transition-all md:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-[#0E131F]/95 flex flex-col items-center justify-center p-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#FF92A5] to-purple-600 flex items-center justify-center text-[#0E131F] font-black text-2xl shadow-2xl mb-2">
                TS
              </div>
              <h3 className="text-xl font-bold font-display text-white">Techy Shruti</h3>
              <p className="text-xs text-slate-400 -mt-4">Full Stack Engineer &amp; AI Creator</p>

              <div className="w-full h-px bg-slate-800 my-2" />

              <div className="flex flex-col gap-3 w-full">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 font-semibold text-sm hover:border-[#FF92A5] hover:text-[#FF92A5] transition-all"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl bg-[#FF92A5] text-[#0E131F] font-bold text-sm shadow-xl flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                Let&apos;s Connect
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
