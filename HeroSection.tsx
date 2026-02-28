import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onExplore: () => void;
}

export default function HeroSection({ onExplore }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Tesla%20Model%20X%20electric%20SUV%20with%20falcon%20wing%20doors%20fully%20open%20on%20a%20dramatic%20empty%20highway%20at%20dusk%2C%20cinematic%20wide%20angle%20shot%2C%20deep%20blue%20and%20orange%20sky%20gradient%2C%20sleek%20black%20luxury%20electric%20vehicle%20centered%20on%20road%2C%20moody%20atmospheric%20lighting%20with%20lens%20flare%2C%20ultra%20realistic%20automotive%20photography&width=1400&height=900&seq=hero-bg-modelx-v2&orientation=landscape"
          alt="Tesla Model X"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-gray-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/60" />
      </div>

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-24 flex flex-col justify-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          <span className="text-xs font-bold tracking-widest text-red-400 uppercase">Illustration of Interdependence</span>
        </div>

        {/* Title */}
        <div
          className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '150ms' }}
        >
          <h1 className="text-7xl font-black text-white leading-none tracking-tight mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}>
            TESLA
          </h1>
          <h2 className="text-7xl font-black leading-none tracking-tight mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em', color: '#e5e7eb' }}>
            MODEL X
          </h2>
          <p className="text-base text-gray-400 font-medium tracking-widest uppercase mb-4" style={{ letterSpacing: '0.15em' }}>
            by Naina Kaniganti
          </p>
          <div className="w-24 h-1 bg-red-500 mb-6 rounded-full" />
          <p className="text-xl text-gray-300 font-light max-w-lg leading-relaxed">
            A global product builtt across <strong className="text-white font-semibold">10+ countries</strong>, involving hundreds of businesses and thousands of workers, all interdependent.
          </p>
        </div>

        {/* Stats row - REMOVED */}

        {/* CTA */}
        <div
          className={`flex gap-4 mt-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '450ms' }}
        >
          <button
            onClick={onExplore}
            className="flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white/50 text-white font-semibold rounded-full text-sm transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-down-line text-base" />
            </div>
            Scroll to Discover
          </button>
        </div>

        {/* Sector pills */}
        <div
          className={`flex gap-3 mt-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { label: 'Primary Sector', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
            { label: 'Secondary Sector', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
            { label: 'Tertiary Sector', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
            { label: 'Disruption Analysis', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
          ].map((p) => (
            <span key={p.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${p.color}`}>
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-arrow-down-s-line text-gray-500 text-xl" />
        </div>
      </div>
    </section>
  );
}
