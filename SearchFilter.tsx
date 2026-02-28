
import { useState, useMemo } from 'react';
import { steps } from '../../mocks/mindMapData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const allCountries = Array.from(new Set(steps.map(s => s.location.split(',')[0].trim())));
const allSectors = ['primary', 'secondary', 'tertiary'] as const;

const sectorColors = {
  primary: { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  secondary: { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', dot: 'bg-amber-400' },
  tertiary: { badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30', dot: 'bg-rose-400' },
};

export default function SearchFilter() {
  const [query, setQuery] = useState('');
  const [activeSector, setActiveSector] = useState<string>('all');
  const { ref, visible } = useScrollReveal({ threshold: 0.1 });

  const filtered = useMemo(() => {
    return steps.filter(s => {
      const matchesSector = activeSector === 'all' || s.sector === activeSector;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.businesses.some(b => b.toLowerCase().includes(q)) ||
        s.resources.some(r => r.label.toLowerCase().includes(q));
      return matchesSector && matchesQuery;
    });
  }, [query, activeSector]);

  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden" id="search">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 inline-block">
            Explore & Filter
          </span>
          <h2 className="text-4xl font-black text-white mt-3 mb-3">
            🔍 Search the Supply Chain
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Search by country, resource, company, or keyword. Filter by sector to explore specific parts of the chain.
          </p>
        </div>

        {/* Search bar */}
        <div className={`relative mb-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '150ms' }}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
            <i className="ri-search-line text-gray-400 text-base" />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by country, resource, company..."
            className="w-full bg-white/5 border border-white/15 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-base" />
            </button>
          )}
        </div>

        {/* Sector filters */}
        <div className={`flex gap-2 mb-8 flex-wrap transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '250ms' }}>
          {['all', ...allSectors].map(s => (
            <button
              key={s}
              onClick={() => setActiveSector(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeSector === s
                  ? 'bg-white text-gray-900 border-white'
                  : 'bg-white/5 text-gray-400 border-white/15 hover:border-white/30 hover:text-white'
              }`}
            >
              {s === 'all' ? 'All Sectors' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-gray-500 text-xs mb-4 font-medium">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
        </div>

        {/* Results grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <i className="ri-search-line text-4xl" />
            </div>
            <p className="text-sm">No results found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((step, i) => {
              const sc = sectorColors[step.sector];
              return (
                <div
                  key={step.step}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/8 hover:border-white/20 hover:scale-[1.01] transition-all duration-300"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex gap-0">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-white font-bold text-sm leading-tight">{step.title}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${sc.badge}`}>
                          {step.sector}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mb-2">{step.flag} {step.location.split(',')[0]}</p>
                      <div className="flex flex-wrap gap-1">
                        {step.businesses.slice(0, 2).map((b, j) => (
                          <span key={j} className="text-xs px-1.5 py-0.5 rounded-full bg-white/8 text-gray-400 border border-white/10">
                            {b.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
