
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

interface Consequence {
  icon: string;
  color: string;
  bg: string;
  border: string;
  title: string;
  text: string;
}

interface ImpactData {
  title: string;
  subtitle: string;
  disrupted: string;
  consequences: Consequence[];
  takeaway: string;
}

interface SectorSummaryItem {
  id: string;
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
  iconBg: string;
  steps: string;
  description: string;
}

interface MindNode {
  id: string;
  type: string;
  label: string;
  sublabel?: string;
  color: string;
  data?: unknown;
}

interface DetailPanelProps {
  node: MindNode | null;
  open: boolean;
  onClose: () => void;
  steps: Step[];
  impactData: ImpactData;
  sectorSummary: SectorSummaryItem[];
}

const resourceConfig = {
  natural: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: 'ri-leaf-line', label: 'Natural' },
  human: { bg: 'bg-sky-100', text: 'text-sky-800', icon: 'ri-user-line', label: 'Human' },
  capital: { bg: 'bg-violet-100', text: 'text-violet-800', icon: 'ri-tools-line', label: 'Capital' },
};

const sectorColors: Record<string, { badge: string; border: string; light: string; text: string }> = {
  primary: { badge: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-300', light: 'bg-emerald-50', text: 'text-emerald-700' },
  secondary: { badge: 'bg-amber-100 text-amber-800', border: 'border-amber-300', light: 'bg-amber-50', text: 'text-amber-700' },
  tertiary: { badge: 'bg-rose-100 text-rose-800', border: 'border-rose-300', light: 'bg-rose-50', text: 'text-rose-700' },
};

function StepDetail({ step }: { step: Step }) {
  const cfg = sectorColors[step.sector];
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Image */}
      <div className="w-full h-52 flex-shrink-0 overflow-hidden relative">
        <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-1 ${cfg.badge}`}>
            {step.sector.charAt(0).toUpperCase() + step.sector.slice(1)} Sector · Step {step.step}
          </div>
          <h2 className="text-white font-extrabold text-xl leading-tight">{step.title}</h2>
          <p className="text-white/80 text-sm mt-0.5">{step.flag} {step.location}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5">
        {/* Description */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Resources Involved</h3>
          <div className="flex flex-wrap gap-2">
            {step.resources.map((r, i) => {
              const rc = resourceConfig[r.type];
              return (
                <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${rc.bg} ${rc.text}`}>
                  <i className={`${rc.icon} text-xs`}></i>
                  <span className="font-bold">{rc.label}:</span> {r.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Businesses */}
        <div className={`p-4 rounded-xl ${cfg.light} border ${cfg.border}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1 ${cfg.text}`}>
            <i className="ri-building-line"></i> Businesses Involved
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {step.businesses.map((b, i) => (
              <span key={i} className={`text-xs px-2.5 py-1 rounded-full bg-white border ${cfg.border} ${cfg.text} font-medium`}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactDetail({ data }: { data: ImpactData }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-700 to-violet-900 p-6 text-white flex-shrink-0">
        <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full mb-3">
          <i className="ri-alert-line text-2xl text-white"></i>
        </div>
        <h2 className="text-xl font-extrabold leading-tight">{data.title}</h2>
        <p className="text-white/75 text-sm mt-2 leading-relaxed">{data.subtitle}</p>
        <div className="mt-3 inline-block px-3 py-1.5 bg-white/20 border border-white/30 rounded-full text-xs font-bold">
          ⚠ Disrupted: {data.disrupted}
        </div>
      </div>

      {/* Consequences */}
      <div className="p-5 flex flex-col gap-3">
        {data.consequences.map((c, i) => (
          <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-4 flex gap-3`}>
            <div className={`w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm flex-shrink-0 ${c.color}`}>
              <i className={`${c.icon} text-lg`}></i>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h4>
              <p className="text-xs text-gray-700 leading-relaxed">{c.text}</p>
            </div>
          </div>
        ))}

        {/* Takeaway */}
        <div className="mt-2 bg-gray-900 rounded-xl p-5 text-white">
          <div className="flex items-start gap-3">
            <i className="ri-lightbulb-line text-xl text-yellow-400 flex-shrink-0 mt-0.5"></i>
            <div>
              <h4 className="font-bold text-sm mb-1">Key Takeaway: Interdependence Creates Vulnerability</h4>
              <p className="text-gray-300 text-xs leading-relaxed">{data.takeaway}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntroDetail({ steps, sectorSummary }: { steps: Step[]; sectorSummary: SectorSummaryItem[] }) {
  const primaryCount = steps.filter((s) => s.sector === 'primary').length;
  const secondaryCount = steps.filter((s) => s.sector === 'secondary').length;
  const tertiaryCount = steps.filter((s) => s.sector === 'tertiary').length;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Hero */}
      <div className="w-full h-44 flex-shrink-0 overflow-hidden relative">
        <img
          src="https://readdy.ai/api/search-image?query=Tesla%20Model%20X%20electric%20SUV%20with%20falcon%20wing%20doors%20open%20on%20a%20dramatic%20mountain%20road%20at%20sunset%2C%20sleek%20black%20luxury%20electric%20vehicle%20with%20distinctive%20gull-wing%20doors%20raised%2C%20cinematic%20wide%20angle%20shot%20with%20golden%20hour%20lighting%20and%20scenic%20landscape%20background&width=800&height=350&seq=hero-tesla-modelx-panel&orientation=landscape"
          alt="Tesla Model X"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-center">
          <h2 className="text-white font-extrabold text-2xl drop-shadow">Tesla Model X</h2>
          <p className="text-white/80 text-xs mt-1">A global product built across 10+ countries</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">What is Interdependence?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>Interdependence</strong> means that countries, businesses, and people rely on each other to produce goods and services. No single country has all the resources, skills, or technology needed to build a complex modern product alone.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            The Tesla Model X requires lithium from Chile, cobalt from the DRC, rare earth metals from China, aluminum from Canada, and is assembled in California. Every step involves a different country or business — and if any one stops, the entire chain is affected.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-center">
            <div className="text-2xl font-extrabold text-emerald-700">{primaryCount}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-0.5">Primary Steps</div>
            <div className="text-xs text-gray-500">Raw materials</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-center">
            <div className="text-2xl font-extrabold text-amber-700">{secondaryCount}</div>
            <div className="text-xs text-amber-600 font-semibold mt-0.5">Secondary Steps</div>
            <div className="text-xs text-gray-500">Manufacturing</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-3 border border-rose-200 text-center">
            <div className="text-2xl font-extrabold text-rose-700">{tertiaryCount}</div>
            <div className="text-xs text-rose-600 font-semibold mt-0.5">Tertiary Steps</div>
            <div className="text-xs text-gray-500">Services</div>
          </div>
        </div>

        {/* Sector summaries */}
        <div className="flex flex-col gap-3">
          {sectorSummary.map((s) => (
            <div key={s.id} className={`rounded-xl border ${s.border} ${s.bg} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 flex items-center justify-center rounded-full ${s.iconBg}`}>
                  <i className={`${s.icon} text-sm text-white`}></i>
                </div>
                <span className={`font-bold text-sm ${s.color}`}>{s.label}</span>
                <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-white border ${s.border} ${s.color}`}>{s.steps}</span>
              </div>
              <p className={`text-xs leading-relaxed ${s.color}`}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectorDetail({ node, steps, sectorSummary }: { node: MindNode; steps: Step[]; sectorSummary: SectorSummaryItem[] }) {
  const sectorId = node.id as 'primary' | 'secondary' | 'tertiary';
  const summary = sectorSummary.find((s) => s.id === sectorId);
  const sectorSteps = steps.filter((s) => s.sector === sectorId);

  if (!summary) return null;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div
        className="p-6 flex-shrink-0"
        style={{ background: sectorId === 'primary' ? '#059669' : sectorId === 'secondary' ? '#d97706' : '#e11d48' }}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full mb-3">
          <i className={`${summary.icon} text-2xl text-white`}></i>
        </div>
        <h2 className="text-xl font-extrabold text-white">{summary.label}</h2>
        <p className="text-white/80 text-sm mt-1">{summary.steps} · {sectorSteps.length} processes</p>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <p className="text-gray-700 text-sm leading-relaxed">{summary.description}</p>

        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Steps in this Sector</h3>
        {sectorSteps.map((step) => (
          <div key={step.step} className={`rounded-xl border ${sectorColors[sectorId].border} overflow-hidden`}>
            <div className="w-full h-28 overflow-hidden relative">
              <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sectorColors[sectorId].badge}`}>Step {step.step}</span>
                <p className="text-white font-bold text-sm mt-0.5">{step.title}</p>
                <p className="text-white/75 text-xs">{step.flag} {step.location.split(',')[0]}</p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DetailPanel({ node, open, onClose, steps, impactData, sectorSummary }: DetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const renderContent = () => {
    if (!node) return null;
    if (node.type === 'step') {
      const stepData = node.data as Step;
      return <StepDetail step={stepData} />;
    }
    if (node.type === 'impact') {
      return <ImpactDetail data={impactData} />;
    }
    if (node.type === 'intro') {
      return <IntroDetail steps={steps} sectorSummary={sectorSummary} />;
    }
    if (node.type === 'sector') {
      return <SectorDetail node={node} steps={steps} sectorSummary={sectorSummary} />;
    }
    if (node.type === 'center') {
      return <IntroDetail steps={steps} sectorSummary={sectorSummary} />;
    }
    return null;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full z-40 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-350 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transitionDuration: '350ms' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-white transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-lg"></i>
        </button>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
