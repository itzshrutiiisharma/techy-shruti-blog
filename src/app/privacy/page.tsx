import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen text-[#292524] space-y-8 bg-[#FAF8F5]">
      <div className="border-b border-[#121110] pb-6">
        <div className="font-mono text-[10px] uppercase font-bold text-[#E63B19] tracking-widest mb-1">
          GOVERNANCE // COMPLIANCE
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121110]">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-[#78716C] mt-2">LAST REVISED: SEPTEMBER 2026 // EDITION 14</p>
      </div>

      <div className="space-y-8 font-sans text-sm sm:text-base leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#121110]">1. Information We Collect</h2>
          <p className="text-[#57534E]">
            Shruti Blogs is built with privacy-first engineering principles. We only collect information necessary to provide reading bookmarks, newsletter dispatches, and technical comment moderation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#121110]">2. Analytics & Telemetry</h2>
          <p className="text-[#57534E]">
            Our telemetry tracks aggregate pageviews, referrers, and device types to improve essay discoverability. We never sell reader data or syndicate to third-party ad networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#121110]">3. Storage & Session Security</h2>
          <p className="text-[#57534E]">
            We use secure HTTP-only cookies and local storage tokens exclusively for verified editorial authentication and session persistence.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#121110]">4. Editorial Contacts</h2>
          <p className="text-[#57534E]">
            For data requests or inquiries, please contact our team at <span className="font-mono text-[#E63B19] font-bold">editorial@shrutiblogs.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
