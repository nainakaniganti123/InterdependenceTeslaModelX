import { useEffect, useRef } from 'react';

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

interface StepModalProps {
  step: Step | null;
  onClose: () => void;
}

/**
 * Configuration for each sector. All keys are guaranteed to exist
 * because `step.sector` is a union type that matches the object shape.
 */
const sectorConfig = {
  primary: {
    label: 'Primary Sector',
    color: '#059669',
    badge: 'bg-emerald-100 text-emerald-800',
    border: 'border-emerald-200',
    light: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  secondary: {
    label: 'Secondary Sector',
    color: '#d97706',
    badge: 'bg-amber-100 text-amber-800',
    border: 'border-amber-200',
    light: 'bg-amber-50',
    text: 'text-amber-700',
  },
  tertiary: {
    label: 'Tertiary Sector',
    color: '#e11d48',
    badge: 'bg-rose-100 text-rose-800',
    border: 'border-rose-200',
    light: 'bg-rose-50',
    text: 'text-rose-700',
  },
} as const;

/**
 * Configuration for each resource type.
 * Adding a fallback entry helps avoid runtime crashes if a new type is introduced.
 */
const resourceConfig = {
  natural: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    icon: 'ri-leaf-line',
    label: 'Natural',
  },
  human: {
    bg: 'bg-sky-100',
    text: 'text-sky-800',
    icon: 'ri-user-line',
    label: 'Human',
  },
  capital: {
    bg: 'bg-violet-100',
    text: 'text-violet-800',
    icon: 'ri-tools-line',
    label: 'Capital',
  },
} as const;

export default function StepModal({ step, onClose }: StepModalProps) {
  const open = step !== null;
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll while the modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!step) return null;

  // Typescript can infer the correct config thanks to the `as const` above
  const cfg = sectorConfig[step.sector];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col transition-transform duration-400 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionDuration: '380ms' }}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <i className="ri-close-line text-lg" />
        </button>

        {/* Hero image */}
        <div className="w-full h-64 flex-shrink-0 relative overflow-hidden">
          <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.badge} mb-2 inline-block`}
            >
              {cfg.label} · Step {step.step}
            </span>
            <h2 className="text-white font-black text-2xl leading-tight">{step.title}</h2>
            <p className="text-white/70 text-sm mt-1">
              {step.flag} {step.location}
            </p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex flex-col gap-6">
            {/* Description */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Description
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
            </section>

            {/* Resources */}
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Resources Involved
              </h3>
              <div className="flex flex-col gap-2">
                {step.resources.map((r, i) => {
                  const rc = resourceConfig[r.type] ?? {
                    bg: 'bg-gray-200',
                    text: 'text-gray-800',
                    icon: 'ri-question-line',
                    label: 'Unknown',
                  };
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${rc.bg}`}
                    >
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/60 flex-shrink-0">
                        <i className={`${rc.icon} text-sm ${rc.text}`} />
                      </div>
                      <div>
                        <span className={`text-xs font-bold ${rc.text}`}>
                          {rc.label} Resource
                        </span>
                        <p className={`text-xs ${rc.text} opacity-80`}>{r.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Businesses */}
            <section className={`p-4 rounded-2xl ${cfg.light} border ${cfg.border}`}>
              <h3
                className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${cfg.text}`}
              >
                <i className="ri-building-2-line" />
                Businesses Involved
              </h3>
              <div className="flex flex-wrap gap-2">
                {step.businesses.map((b, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-full bg-white border ${cfg.border} ${cfg.text} font-semibold shadow-sm`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
