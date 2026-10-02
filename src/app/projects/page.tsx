import { SiteHeader } from "@/components/Navigation/SiteHeader";
import { CaseStudiesSection } from "@/components/Projects/CaseStudiesSection";
import { EditorialContactSection } from "@/components/Contact/EditorialContactSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#1A2035] text-slate-100 selection:bg-[#FFA0B6] selection:text-[#1A2035] overflow-x-hidden pt-32">
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#FFA0B6] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <CaseStudiesSection />
      <EditorialContactSection />
    </main>
  );
}
