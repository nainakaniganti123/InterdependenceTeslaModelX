import { useState, useRef, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SectorSection from './components/SectorSection';
import DisruptionSection from './components/DisruptionSection';
import OverviewSection from './components/OverviewSection';
import FlowConnector from './components/FlowConnector';
import StepModal from './components/StepModal';
import ProgressBar from '../../components/feature/ProgressBar';
import WorldMap from '../../components/feature/WorldMap';
import { steps } from '../../mocks/mindMapData';

interface Step {
  step: number;
  title: string;
  location: string;
  flag: string;
  sector: 'primary' | 'secondary' | 'tertiary';
  description: string;
  resources: { type: 'natural' | 'human' | 'capital'; label: string }[];
  businesses: string[];
  image: string;
}

export default function Home() {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const primarySteps = steps.filter((s) => s.sector === 'primary');
  const secondarySteps = steps.filter((s) => s.sector === 'secondary');
  const tertiarySteps = steps.filter((s) => s.sector === 'tertiary');

  const scrollToMain = () => {
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      {/* Reading progress bar */}
      <ProgressBar />

      {/* Sticky nav */}
      <nav className="fixed top-0.5 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-car-line text-white text-base" />
            </div>
            <span className="text-white font-black text-sm tracking-wide">TESLA MODEL X</span>
            <span className="text-gray-500 text-xs ml-1 hidden sm:inline">· Interdependence</span>
          </div>
          <div className="flex items-center gap-1">
            {[
              { label: 'Overview', href: '#overview', color: 'text-gray-400 hover:text-white' },
              { label: 'Map', href: '#world-map', color: 'text-teal-400 hover:text-teal-300' },
              { label: 'Primary', href: '#sector-primary', color: 'text-emerald-400 hover:text-emerald-300' },
              { label: 'Secondary', href: '#sector-secondary', color: 'text-amber-400 hover:text-amber-300' },
              { label: 'Tertiary', href: '#sector-tertiary', color: 'text-rose-400 hover:text-rose-300' },
              { label: 'Disruption', href: '#disruption', color: 'text-red-400 hover:text-red-300' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${item.color}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection onExplore={scrollToMain} />

      {/* Overview */}
      <div ref={mainRef}>
        <OverviewSection />
      </div>

      {/* Interactive World Map */}
      <WorldMap />

      {/* Primary Sector */}
      <FlowConnector
        fromSector="Overview"
        toSector="Primary Sector"
        fromColor="#374151"
        toColor="#059669"
        label="Step 1 — Raw Material Extraction"
      />
      <SectorSection
        sector="primary"
        steps={primarySteps}
        onSelectStep={(s) => setSelectedStep(s as Step)}
      />

      {/* Primary → Secondary connector */}
      <FlowConnector
        fromSector="Primary"
        toSector="Secondary"
        fromColor="#059669"
        toColor="#d97706"
        label="Raw materials shipped to factories"
      />

      {/* Secondary Sector */}
      <SectorSection
        sector="secondary"
        steps={secondarySteps}
        onSelectStep={(s) => setSelectedStep(s as Step)}
      />

      {/* Secondary → Tertiary connector */}
      <FlowConnector
        fromSector="Secondary"
        toSector="Tertiary"
        fromColor="#d97706"
        toColor="#e11d48"
        label="Finished vehicle enters service chain"
      />

      {/* Tertiary Sector */}
      <SectorSection
        sector="tertiary"
        steps={tertiarySteps}
        onSelectStep={(s) => setSelectedStep(s as Step)}
      />

      {/* Tertiary → Disruption connector */}
      <FlowConnector
        fromSector="Tertiary"
        toSector="Disruption"
        fromColor="#e11d48"
        toColor="#ef4444"
        label="What happens when the chain breaks?"
      />

      {/* Disruption */}
      <DisruptionSection />

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">Tesla Model X · Global Supply Chain · by Naina Kaniganti</p>
        </div>
      </footer>

      {/* Step detail modal */}
      <StepModal step={selectedStep} onClose={() => setSelectedStep(null)} />

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer whitespace-nowrap ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <i className="ri-arrow-up-line text-base" />
      </button>
    </div>
  );
}
