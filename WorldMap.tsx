
import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface MapNode {
  id: string;
  country: string;
  flag: string;
  role: string;
  detail: string;
  x: number;
  y: number;
  sector: 'primary' | 'secondary' | 'tertiary';
}

const nodes: MapNode[] = [
  { id: 'chile', country: 'Chile', flag: '🇨🇱', role: 'Lithium Mining', detail: 'Atacama Desert brine extraction — 30% of world supply', x: 22, y: 72, sector: 'primary' },
  { id: 'drc', country: 'DR Congo', flag: '🇨🇩', role: 'Cobalt Mining', detail: '70%+ of global cobalt reserves mined here', x: 52, y: 62, sector: 'primary' },
  { id: 'indonesia', country: 'Indonesia', flag: '🇮🇩', role: 'Nickel Mining', detail: 'Largest nickel producer — critical for battery chemistry', x: 76, y: 60, sector: 'primary' },
  { id: 'australia', country: 'Australia', flag: '🇦🇺', role: 'Lithium & Rare Earths', detail: 'Hard-rock spodumene lithium & rare earth minerals', x: 80, y: 75, sector: 'primary' },
  { id: 'canada', country: 'Canada', flag: '🇨🇦', role: 'Aluminum Smelting', detail: 'Hydro-powered aluminum smelting — clean & cheap', x: 18, y: 28, sector: 'primary' },
  { id: 'china', country: 'China', flag: '🇨🇳', role: 'Rare Earth Processing', detail: '85%+ of global rare earth processing capacity', x: 74, y: 38, sector: 'primary' },
  { id: 'germany', country: 'Germany', flag: '🇩🇪', role: 'Steel & Coatings', detail: 'High-grade steel & BASF paint coatings', x: 50, y: 28, sector: 'secondary' },
  { id: 'japan', country: 'Japan', flag: '🇯🇵', role: 'Batteries & Glass', detail: 'Panasonic battery cells & AGC automotive glass', x: 82, y: 34, sector: 'secondary' },
  { id: 'italy', country: 'Italy', flag: '🇮🇹', role: 'Giga Press Machines', detail: 'IDRA Group manufactures the revolutionary Giga Press', x: 51, y: 32, sector: 'secondary' },
  { id: 'usa', country: 'USA', flag: '🇺🇸', role: 'Assembly & Software', detail: 'Fremont factory assembly + Palo Alto software HQ', x: 14, y: 38, sector: 'secondary' },
  { id: 'france', country: 'France', flag: '🇫🇷', role: 'Tires (Michelin)', detail: 'Michelin supplies all-season performance tires', x: 48, y: 30, sector: 'tertiary' },
  { id: 'israel', country: 'Israel', flag: '🇮🇱', role: 'Vision Systems', detail: 'Mobileye provides camera-based vision AI systems', x: 57, y: 38, sector: 'tertiary' },
];

const sectorColor = {
  primary: { dot: 'bg-emerald-400', ring: 'ring-emerald-400/40', text: 'text-emerald-300', label: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  secondary: { dot: 'bg-amber-400', ring: 'ring-amber-400/40', text: 'text-amber-300', label: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  tertiary: { dot: 'bg-rose-400', ring: 'ring-rose-400/40', text: 'text-rose-300', label: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
};

// SVG connection lines from each node to USA (assembly hub)
const usaX = 14;
const usaY = 38;

export default function WorldMap() {
  const [hovered, setHovered] = useState<MapNode | null>(null);
  const { ref, visible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden" id="world-map">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 inline-block">
            Interactive Supply Chain Map
          </span>
          <h2 className="text-4xl font-black text-white mt-3 mb-3">
            &nbsp;Global Supply Network
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Hover over any country to see its role. Every node connects back to the Fremont assembly plant in the USA.
          </p>
        </div>

        {/* Legend */}
        <div className={`flex justify-center gap-4 mb-8 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          {(['primary', 'secondary', 'tertiary'] as const).map(s => (
            <span key={s} className={`text-xs font-semibold px-3 py-1 rounded-full border ${sectorColor[s].label}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)} Sector
            </span>
          ))}
        </div>

        {/* Map container */}
        <div
          className={`relative w-full rounded-3xl overflow-hidden border border-white/10 transition-all duration-900 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ transitionDelay: '300ms', background: 'linear-gradient(135deg, #0d1117 0%, #0a1628 50%, #0d1117 100%)', paddingBottom: '52%' }}
        >
          {/* World map image */}
          <img
            src="https://readdy.ai/api/search-image?query=minimalist%20dark%20world%20map%20flat%20design%2C%20dark%20navy%20blue%20background%20with%20subtle%20continent%20outlines%20in%20slightly%20lighter%20dark%20blue%2C%20no%20labels%20no%20text%2C%20clean%20modern%20cartographic%20style%2C%20muted%20tones%2C%20elegant%20simple%20geography%20visualization&width=1200&height=620&seq=world-map-dark-v3&orientation=landscape"
            alt="World map"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          />

          {/* SVG lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 52" preserveAspectRatio="none">
            {nodes.filter(n => n.id !== 'usa').map(n => (
              <line
                key={n.id}
                x1={`${n.x}`}
                y1={`${n.y * 0.52}`}
                x2={`${usaX}`}
                y2={`${usaY * 0.52}`}
                stroke={n.sector === 'primary' ? '#10b981' : n.sector === 'secondary' ? '#f59e0b' : '#f43f5e'}
                strokeWidth="0.15"
                strokeDasharray="0.6 0.4"
                opacity={hovered ? (hovered.id === n.id ? 0.9 : 0.15) : 0.35}
                className="transition-opacity duration-300"
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const sc = sectorColor[node.sector];
            const isHovered = hovered?.id === node.id;
            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${node.x}%`, top: `${node.y * 0.52}%` }}
                onMouseEnter={() => setHovered(node)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulse ring */}
                <div className={`absolute inset-0 rounded-full ${sc.dot} opacity-30 animate-ping`} style={{ width: 20, height: 20, top: -4, left: -4 }} />
                {/* Dot */}
                <div className={`w-3 h-3 rounded-full ${sc.dot} ring-2 ${sc.ring} shadow-lg transition-transform duration-200 ${isHovered ? 'scale-150' : 'scale-100'}`} />
                {/* Label */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap transition-all duration-200 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
                  <div className="bg-gray-900/95 border border-white/20 rounded-xl px-3 py-2 shadow-2xl min-w-[160px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base">{node.flag}</span>
                      <span className="text-white font-bold text-xs">{node.country}</span>
                    </div>
                    <div className={`text-xs font-semibold ${sc.text} mb-0.5`}>{node.role}</div>
                    <div className="text-gray-400 text-xs leading-tight">{node.detail}</div>
                  </div>
                  <div className="w-2 h-2 bg-gray-900/95 border-r border-b border-white/20 rotate-45 mx-auto -mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom info */}
        <div className={`mt-6 text-center text-gray-500 text-xs transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          Hover over any glowing dot to explore that country's contribution
        </div>
      </div>
    </section>
  );
}
