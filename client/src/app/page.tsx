import React from 'react';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import ArchitectureFlow from '../components/ArchitectureFlow';
import TechUniverse from '../components/TechUniverse';
import SelectedBuilds from '../components/SelectedBuilds';
import BackendStatusCard from '../components/BackendStatusCard';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020907] text-gray-100 relative">
      {/* Fixed Left Docked Sidebar */}
      <Sidebar />

      {/* Main Content Viewport Offset for Desktop */}
      <main className="lg:pl-72 flex-1 w-full min-w-0 flex flex-col">
        <Hero />
        <ArchitectureFlow />
        <TechUniverse />
        <SelectedBuilds />
        <BackendStatusCard />
        <Footer />
      </main>
    </div>
  );
}
