
import { useState } from 'react';

interface Resource {
  type: 'natural' | 'human' | 'capital';
  label: string;
}

interface StepCardProps {
  step: number;
  title: string;
  location: string;
  flag: string;
  sector: 'primary' | 'secondary' | 'tertiary';
  description: string;
  resources: Resource[];
  image: string;
  businesses: string[];
  isLast?: boolean;
}

const sectorConfig = {
  primary: {
    label: 'Primary Sector',
    bg: 'bg-emerald-500',
    light: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
    number: 'bg-emerald-500',
  },
  secondary: {
    label: 'Secondary Sector',
    bg: 'bg-amber-500',
    light: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    number: 'bg-amber-500',
  },
  tertiary: {
    label: 'Tertiary Sector',
    bg: 'bg-rose-500',
    light: 'bg-rose-50',
    border: 'border-rose-300',
    text: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-800',
    number: 'bg-rose-500',
  },
};

const resourceConfig = {
  natural: { bg: 'bg-green-100', text: 'text-green-800', icon: 'ri-leaf-line', label: 'Natural' },
  human: { bg: 'bg-sky-100', text: 'text-sky-800', icon: 'ri-user-line', label: 'Human' },
  capital: { bg: 'bg-violet-100', text: 'text-violet-800', icon: 'ri-tools-line', label: 'Capital' },
};

export default function StepCard({
  step,
  title,
  location,
  flag,
  sector,
  description,
  resources,
  image,
  businesses,
  isLast = false,
}: StepCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = sectorConfig[sector];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Step Number + Sector Badge */}
      <div className="flex flex-col items-center mb-4">
        <div className={`w-12 h-12 rounded-full ${cfg.number} text-white flex items-center justify-center font-bold text-lg shadow-lg z-10`}>
          {step}
        </div>
        <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold ${cfg.badge} border ${cfg.border}`}>
          {cfg.label}
        </div>
      </div>

      {/* Card */}
      <div
        className={`w-full max-w-2xl bg-white rounded-2xl shadow-md border ${cfg.border} overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl`}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Image */}
        <div className="w-full h-52 overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
              <p className="text-white/80 text-sm mt-0.5">{flag} {location}</p>
            </div>
            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${cfg.bg} text-white`}>
              Step {step}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-gray-700 text-sm leading-relaxed">{description}</p>

          {/* Resource Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {resources.map((r, i) => {
              const rc = resourceConfig[r.type];
              return (
                <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${rc.bg} ${rc.text}`}>
                  <i className={`${rc.icon} text-xs`}></i>
                  <span className="font-bold">{rc.label}:</span> {r.label}
                </span>
              );
            })}
          </div>

          {/* Businesses Involved */}
          <div className={`mt-4 p-3 rounded-lg ${cfg.light} border ${cfg.border}`}>
            <p className={`text-xs font-bold ${cfg.text} mb-1.5 flex items-center gap-1`}>
              <i className="ri-building-line"></i> Businesses Involved
            </p>
            <div className="flex flex-wrap gap-1.5">
              {businesses.map((b, i) => (
                <span key={i} className={`text-xs px-2 py-0.5 rounded-full bg-white border ${cfg.border} ${cfg.text} font-medium`}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Expand hint */}
          <div className={`mt-3 text-xs ${cfg.text} flex items-center gap-1 justify-end`}>
            <i className={`ri-arrow-${expanded ? 'up' : 'down'}-s-line`}></i>
            {expanded ? 'Click to collapse' : 'Click to expand'}
          </div>
        </div>
      </div>

      {/* Arrow connector */}
      {!isLast && (
        <div className="flex flex-col items-center my-3">
          <div className="w-0.5 h-8 bg-gray-300"></div>
          <i className="ri-arrow-down-s-line text-2xl text-gray-400 -mt-1"></i>
        </div>
      )}
    </div>
  );
}
