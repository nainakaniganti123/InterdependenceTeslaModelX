
import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface CounterStat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
}

const stats: CounterStat[] = [
  { value: 12, suffix: '+', label: 'Countries Involved', icon: 'ri-global-line', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { value: 500, suffix: '+', label: 'Suppliers Worldwide', icon: 'ri-building-2-line', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { value: 100, suffix: 'K+', prefix: '$', label: 'Vehicle Starting Price', icon: 'ri-price-tag-3-line', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { value: 4680, suffix: '', label: 'Battery Cell Format (mm)', icon: 'ri-battery-2-charge-line', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { value: 85, suffix: '%', label: 'Rare Earths from China', icon: 'ri-earth-line', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { value: 40000, suffix: '+', label: 'Supercharger Stations', icon: 'ri-charging-pile-2-line', color: 'text-teal-400', bg: 'bg-teal-500/10' },
];

function AnimatedCounter({ value, suffix, prefix = '', duration = 1800 }: { value: number; suffix: string; prefix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [started, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

export default function DataCounters() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden" id="data-counters">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-xs font-bold tracking-widest text-gray-400 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4 inline-block">
            By The Numbers
          </span>
          <h2 className="text-4xl font-black text-white mt-3">
            The Scale of Interdependence
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`${stat.bg} border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 hover:scale-105 transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 80}ms`, transitionDuration: '600ms' }}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.bg} mx-auto mb-3`}>
                <i className={`${stat.icon} text-xl ${stat.color}`} />
              </div>
              <div className={`text-3xl font-black ${stat.color} mb-1`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
