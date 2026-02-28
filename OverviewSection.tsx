
import { useScrollReveal } from '../../../hooks/useScrollReveal';

export default function OverviewSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: gridRef, visible: gridVisible } = useScrollReveal({ threshold: 0.05 });
  const { ref: boxRef, visible: boxVisible } = useScrollReveal({ threshold: 0.1 });

  const countries = [
    { flag: '🇨🇱', name: 'Chile', role: 'Lithium Mining' },
    { flag: '🇦🇺', name: 'Australia', role: 'Lithium & Rare Earths' },
    { flag: '🇨🇩', name: 'DR Congo', role: 'Cobalt Mining' },
    { flag: '🇮🇩', name: 'Indonesia', role: 'Nickel Mining' },
    { flag: '🇨🇦', name: 'Canada', role: 'Aluminum Smelting' },
    { flag: '🇨🇳', name: 'China', role: 'Rare Earth Processing' },
    { flag: '🇩🇪', name: 'Germany', role: 'Steel & Coatings' },
    { flag: '🇯🇵', name: 'Japan', role: 'Batteries & Glass' },
    { flag: '🇮🇹', name: 'Italy', role: 'Giga Press Machines' },
    { flag: '🇺🇸', name: 'USA', role: 'Assembly & Software' },
    { flag: '🇫🇷', name: 'France', role: 'Tires (Michelin)' },
    { flag: '🇮🇱', name: 'Israel', role: 'Vision Systems' },
  ];

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden" id="overview">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span
            className={`text-xs font-bold tracking-widest text-gray-400 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 inline-block transition-all duration-700 ${
              headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Global Interdependence
          </span>
          <h2
            className={`text-5xl font-black text-white mt-3 mb-4 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            One Car.<br />
            <span className="text-gray-400">Twelve Countries.</span>
          </h2>
          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            At first glance, Tesla appears to be a purely American company designed in
            California, assembled in Fremont. But look closer, and the Tesla Model X is
            the product of a deeply interconnected global supply chain. No single country
            has all the resources, skills, or technology needed to build it alone.
          </p>
        </div>

        {/* Country grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-20">
          {countries.map((c, i) => (
            <div
              key={c.name}
              className={`bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 cursor-default ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 60}ms`, transitionDuration: '600ms' }}
            >
              <div className="text-3xl mb-2">{c.flag}</div>
              <div className="text-white font-bold text-sm">{c.name}</div>
              <div className="text-gray-500 text-xs mt-0.5 leading-tight">{c.role}</div>
            </div>
          ))}
        </div>

        {/* What is interdependence */}
        <div
          ref={boxRef}
          className={`mt-16 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 transition-all duration-800 ease-out ${
            boxVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div>
              <h3
                className={`text-white font-black text-2xl mb-3 transition-all duration-700 ${
                  boxVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                What is Interdependence?
              </h3>
              <p
                className={`text-gray-300 text-base leading-relaxed mb-4 transition-all duration-700 ${
                  boxVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '250ms' }}
              >
                <strong className="text-white">Interdependence</strong> means that countries,
                businesses, and people rely on each other to produce goods and services. No
                single country has all the resources, skills, or technology needed to build a
                complex modern product alone.
              </p>
              <p
                className={`text-gray-400 text-sm leading-relaxed transition-all duration-700 ${
                  boxVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '380ms' }}
              >
                The Tesla Model X requires lithium from Chile, cobalt from the DRC, rare earth
                metals from China, aluminum from Canada, and is assembled in California. Every
                step involves a different country or business and if any one stops, the
                entire chain is affected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
