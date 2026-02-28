
import { useState, useRef, useEffect } from 'react';

interface TooltipTerm {
  term: string;
  fact: string;
  icon: string;
  color: string;
}

const tooltipTerms: TooltipTerm[] = [
  { term: 'Lithium', fact: 'A single Tesla Model X battery pack contains ~12 kg of lithium — enough to fill a small backpack.', icon: 'ri-flashlight-line', color: 'text-emerald-400' },
  { term: 'Cobalt', fact: 'Over 70% of the world\'s cobalt comes from the Democratic Republic of Congo, often mined by hand.', icon: 'ri-mountain-line', color: 'text-blue-400' },
  { term: 'Giga Press', fact: 'Tesla\'s Giga Press (made by IDRA, Italy) casts the entire car underbody as ONE piece, replacing 70+ parts.', icon: 'ri-tools-line', color: 'text-amber-400' },
  { term: 'Rare Earths', fact: 'China controls 85%+ of global rare earth processing — a single geopolitical event could halt all EV production.', icon: 'ri-earth-line', color: 'text-rose-400' },
  { term: 'Autopilot', fact: 'Tesla\'s Autopilot neural network has been trained on over 3 billion miles of real-world driving data.', icon: 'ri-robot-line', color: 'text-violet-400' },
  { term: 'Supercharger', fact: 'Tesla\'s global Supercharger network has over 40,000 stations — the largest fast-charging network on Earth.', icon: 'ri-charging-pile-2-line', color: 'text-teal-400' },
];

interface TooltipProps {
  term: string;
  fact: string;
  icon: string;
  color: string;
}

function Tooltip({ term, fact, icon, color }: TooltipProps) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <span ref={ref} className="relative inline-block">
      <span
        className={`cursor-pointer font-bold border-b border-dashed border-current ${color} hover:opacity-80 transition-opacity`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(v => !v)}
      >
        {term}
      </span>
      <span
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 transition-all duration-200 pointer-events-none ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <span className="block bg-gray-900 border border-white/20 rounded-xl p-3 shadow-2xl text-left">
          <span className="flex items-center gap-1.5 mb-1.5">
            <span className={`w-4 h-4 flex items-center justify-center`}>
              <i className={`${icon} text-sm ${color}`} />
            </span>
            <span className={`text-xs font-bold ${color}`}>{term}</span>
          </span>
          <span className="text-gray-300 text-xs leading-relaxed block">{fact}</span>
        </span>
        <span className="block w-2.5 h-2.5 bg-gray-900 border-r border-b border-white/20 rotate-45 mx-auto -mt-1.5" />
      </span>
    </span>
  );
}

export default function FloatingTooltips() {
  return (
    <section className="relative py-20 bg-gray-950 overflow-hidden" id="key-terms">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 inline-block">
          Key Terms
        </span>
        <h2 className="text-4xl font-black text-white mt-3 mb-4">
          💬 Hover for Quick Facts
        </h2>
        <p className="text-gray-400 text-base mb-10 max-w-xl mx-auto">
          Hover or tap any highlighted term below to reveal a fast fact about its role in the Tesla Model X supply chain.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 text-left leading-loose text-gray-300 text-base">
          The Tesla Model X is built on a foundation of critical materials. {' '}
          <Tooltip {...tooltipTerms[0]} /> {' '}
          is extracted from salt flats in Chile and hard-rock mines in Australia. {' '}
          <Tooltip {...tooltipTerms[1]} /> {' '}
          is sourced from the DRC and refined into battery-grade chemicals. These materials are combined with {' '}
          <Tooltip {...tooltipTerms[3]} /> {' '}
          from China to build the powerful electric motors. The body is formed using a revolutionary {' '}
          <Tooltip {...tooltipTerms[2]} /> {' '}
          machine, casting the underbody as a single piece. Once assembled, the vehicle runs on Tesla's {' '}
          <Tooltip {...tooltipTerms[4]} /> {' '}
          software, updated wirelessly. Owners can charge at any of Tesla's global {' '}
          <Tooltip {...tooltipTerms[5]} /> {' '}
          stations worldwide.
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {tooltipTerms.map(t => (
            <Tooltip key={t.term} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
