
import { useState, useRef, useEffect } from 'react';

interface Resource {
  type: 'natural' | 'human' | 'capital';
  label: string;
}

interface Step {
  step: number;
  title: string;
  location: string;
  flag: string;
  sector: 'primary' | 'secondary' | 'tertiary';
  description: string;
  resources: Resource[];
  businesses: string[];
  image: string;
}

interface SectorSectionProps {
  sector: 'primary' | 'secondary' | 'tertiary';
  steps: Step[];
  onSelectStep: (step: Step) => void;
}

/* -------------------------------------------------------------------------- */
/*  Meta information for each sector                                           */
/* -------------------------------------------------------------------------- */
const sectorMeta = {
  primary: {
    label: 'Primary Sector',
    sublabel: 'Raw Material Extraction',
    icon: 'ri-plant-line',
    accent: '#059669',
    bg: 'from-emerald-950 to-emerald-900',
    cardBorder: 'border-emerald-700/40',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    tag: 'bg-emerald-500',
    desc: 'The first stage of production, extracting raw materials directly from the earth across multiple continents. These natural resources form the foundation of every Tesla Model X.',
    number: 'text-emerald-800',
  },
  secondary: {
    label: 'Secondary Sector',
    sublabel: 'Manufacturing & Assembly',
    icon: 'ri-tools-line',
    accent: '#d97706',
    bg: 'from-amber-950 to-amber-900',
    cardBorder: 'border-amber-700/40',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    tag: 'bg-amber-500',
    desc: 'Raw materials are transformed into finished components and assembled into the final vehicle. This stage involves factories, robots, and skilled workers across the USA.',
    number: 'text-amber-800',
  },
  tertiary: {
    label: 'Tertiary Sector',
    sublabel: 'Services & Distribution',
    icon: 'ri-service-line',
    accent: '#e11d48',
    bg: 'from-rose-950 to-rose-900',
    cardBorder: 'border-rose-700/40',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    tag: 'bg-rose-500',
    desc: 'The final stage — delivering the product to consumers through software, sales, and global service networks. This sector is driven entirely by human expertise.',
    number: 'text-rose-800',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Configuration for resource “pills”                                         */
/* -------------------------------------------------------------------------- */
const resourceConfig = {
  natural: {
    bg: 'bg-emerald-900/60',
    text: 'text-emerald-300',
    icon: 'ri-leaf-line',
    label: 'Natural',
  },
  human: {
    bg: 'bg-sky-900/60',
    text: 'text-sky-300',
    icon: 'ri-user-line',
    label: 'Human',
  },
  capital: {
    bg: 'bg-violet-900/60',
    text: 'text-violet-300',
    icon: 'ri-tools-line',
    label: 'Capital',
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Step card component                                                       */
/* -------------------------------------------------------------------------- */
function StepCard({
  step,
  index,
  accent,
  cardBorder,
  badge,
  tag,
  onSelect,
}: {
  step: Step;
  index: number;
  accent: string;
  cardBorder: string;
  badge: string;
  tag: string;
  onSelect: (s: Step) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Observe visibility for entry animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex items-center gap-8 transition-all duration-700 ${
        visible
          ? 'opacity-100 translate-x-0'
          : isEven
          ? 'opacity-0 -translate-x-12'
          : 'opacity-0 translate-x-12'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Step number */}
      <div className="flex-shrink-0 w-14 text-right hidden md:block">
        <span className="text-5xl font-black opacity-20 text-white">
          {String(step.step).padStart(2, '0')}
        </span>
      </div>

      {/* Card container */}
      <div
        className={`flex-1 group bg-white/5 hover:bg-white/10 border ${cardBorder} rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl`}
        onClick={() => onSelect(step)}
        role="button"
        aria-pressed="false"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden relative">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${tag}`}>
                Step {step.step}
              </span>
            </div>
          </div>

          {/* Textual content */}
          <div className="flex-1 p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{step.title}</h3>
                <p className="text-gray-400 text-sm mt-0.5">
                  {step.flag} {step.location}
                </p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors flex-shrink-0">
                <i className="ri-arrow-right-line text-white text-sm" />
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-3">
              {step.description}
            </p>

            {/* Resource pills */}
            <div className="flex flex-wrap gap-1.5">
              {step.resources.slice(0, 3).map((r, i) => {
                const rc = resourceConfig[r.type];
                // Defensive fallback – should never happen, but protects against malformed data
                if (!rc) return null;
                return (
                  <span
                    key={i}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${rc.bg} ${rc.text}`}
                  >
                    <i className={`${rc.icon} text-xs`} />
                    {rc.label}
                  </span>
                );
              })}
            </div>

            {/* Business tags */}
            <div className="mt-3 flex flex-wrap gap-1">
              {step.businesses.slice(0, 3).map((b, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10"
                >
                  {b}
                </span>
              ))}
              {step.businesses.length > 3 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                  +{step.businesses.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main sector section component                                             */
/* -------------------------------------------------------------------------- */
export default function SectorSection({
  sector,
  steps,
  onSelectStep,
}: SectorSectionProps) {
  // Type‑safety when accessing the meta object
  const meta = sectorMeta[sector as keyof typeof sectorMeta];

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Header reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative py-20 bg-gradient-to-b ${meta.bg}`} id={`sector-${sector}`}>
      {/* Subtle grid background – kept as a plain style object to avoid JSX parsing issues */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={ref}
          className={`flex items-start gap-6 mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span
              className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${meta.badge} mb-2 inline-block`}
            >
              {meta.sublabel}
            </span>
            <h2 className="text-4xl font-black text-white mt-1">{meta.label}</h2>
            <p className="text-gray-400 text-base mt-2 max-w-xl leading-relaxed">{meta.desc}</p>
          </div>
        </div>

        {/* Steps list */}
        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <StepCard
              key={step.step}
              step={step}
              index={i}
              accent={meta.accent}
              cardBorder={meta.cardBorder}
              badge={meta.badge}
              tag={meta.tag}
              onSelect={onSelectStep}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
