
import { useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
}

const events: TimelineEvent[] = [
  {
    year: 'Months 1–3',
    title: 'Raw Material Extraction',
    description: 'Lithium brine is pumped into evaporation ponds in Chile. Cobalt is mined in the DRC. Rare earth elements are extracted in Inner Mongolia, China.',
    icon: 'ri-mountain-line',
    color: 'text-emerald-300',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
  },
  {
    year: 'Months 3–5',
    title: 'Material Processing & Refining',
    description: 'Raw lithium is refined into battery-grade lithium carbonate. Rare earths are chemically separated. Aluminum is smelted using hydroelectric power in Canada.',
    icon: 'ri-flask-line',
    color: 'text-teal-300',
    bg: 'bg-teal-500/15',
    border: 'border-teal-500/30',
  },
  {
    year: 'Months 5–7',
    title: 'Component Manufacturing',
    description: 'Panasonic & CATL produce battery cells in gigafactories. IDRA in Italy builds Giga Press machines. Bosch and Hitachi manufacture motor components.',
    icon: 'ri-settings-3-line',
    color: 'text-amber-300',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
  },
  {
    year: 'Month 7',
    title: 'Body Stamping & Painting',
    description: 'Aluminum sheets are stamped into body panels at Fremont. The Giga Press casts the underbody as a single piece. BASF coatings are applied in the paint shop.',
    icon: 'ri-car-washing-line',
    color: 'text-orange-300',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/30',
  },
  {
    year: 'Month 8',
    title: 'Final Assembly',
    description: 'Battery pack, dual motors, Falcon Wing doors, AGC glass, Michelin tires, and Aptiv wiring harnesses are all installed at the Fremont factory.',
    icon: 'ri-tools-line',
    color: 'text-rose-300',
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/30',
  },
  {
    year: 'Month 8–9',
    title: 'Software & Quality Testing',
    description: 'Tesla engineers flash the vehicle OS, calibrate Autopilot cameras, and run thousands of automated quality checks before the car leaves the factory.',
    icon: 'ri-code-s-slash-line',
    color: 'text-violet-300',
    bg: 'bg-violet-500/15',
    border: 'border-violet-500/30',
  },
  {
    year: 'Month 9+',
    title: 'Delivery to Customer',
    description: 'The finished Model X is transported to a Tesla delivery center or shipped directly to the customer. OTA software updates continue for the life of the vehicle.',
    icon: 'ri-truck-line',
    color: 'text-sky-300',
    bg: 'bg-sky-500/15',
    border: 'border-sky-500/30',
  },
];

export default function SupplyChainTimeline() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden" id="timeline">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 inline-block">
            Supply Chain Timeline
          </span>
          <h2 className="text-4xl font-black text-white mt-3 mb-3">
            ⏱ From Mine to Driveway
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            The journey of a Tesla Model X spans 9+ months and crosses a dozen countries before reaching its owner.
          </p>
        </div>

        {/* Scroll controls */}
        <div className={`flex justify-end gap-2 mb-4 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={() => scroll('left')} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-arrow-left-s-line text-lg" />
          </button>
          <button onClick={() => scroll('right')} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-arrow-right-s-line text-lg" />
          </button>
        </div>

        {/* Timeline scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-0 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-72 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Connector line */}
              <div className="flex items-center mb-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 cursor-pointer transition-all duration-200 ${
                    active === i ? `${event.bg} border-white scale-125` : 'bg-gray-800 border-white/30 hover:border-white/60'
                  }`}
                  onClick={() => setActive(active === i ? null : i)}
                />
                {i < events.length - 1 && (
                  <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-white/10 mx-1" />
                )}
              </div>

              {/* Card */}
              <div
                className={`mr-4 border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${event.bg} ${event.border} ${
                  active === i ? 'ring-1 ring-white/30 shadow-xl' : ''
                }`}
                onClick={() => setActive(active === i ? null : i)}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-xl ${event.bg} border ${event.border} mb-3`}>
                  <i className={`${event.icon} text-lg ${event.color}`} />
                </div>
                <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${event.color}`}>{event.year}</div>
                <h3 className="text-white font-bold text-sm mb-2 leading-tight">{event.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className={`text-center text-gray-600 text-xs mt-2 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          ← Scroll horizontally to explore the full timeline →
        </div>
      </div>
    </section>
  );
}
