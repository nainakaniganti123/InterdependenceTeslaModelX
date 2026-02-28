
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { impactData } from '../../../mocks/mindMapData';

export default function DisruptionSection() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: imageRef, visible: imageVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: cardsRef, visible: cardsVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section
      className="relative py-24 overflow-hidden"
      id="disruption"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 40%, #0f0a0a 70%, #0a0a0a 100%)' }}
    >
      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Red glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 z-0"
        style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.6) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 z-0"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.5) 0%, transparent 70%)', filter: 'blur(50px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div
            className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 transition-all duration-700 ${
              headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
            <span className="text-xs font-bold tracking-widest text-red-400 uppercase">
              Disruption Scenario
            </span>
          </div>
          <h2
            className={`text-5xl font-black text-white leading-tight mb-4 transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            What If China
            <br />
            <span className="text-red-500">Closed Its Borders?</span>
          </h2>
          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '280ms' }}
          >
            {impactData.subtitle}
          </p>
          <div
            className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-red-950/60 border border-red-700/50 rounded-full transition-all duration-700 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <i className="ri-alert-line text-red-400 text-sm" />
            <span className="text-red-300 text-sm font-bold">
              Disrupted: {impactData.disrupted}
            </span>
          </div>
        </div>

        {/* Hero Image */}
        <div
          ref={imageRef}
          className={`relative rounded-2xl overflow-hidden mb-12 transition-all duration-900 ease-out ${
            imageVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]'
          }`}
        >
          <div className="w-full h-72">
            <img
              src="https://readdy.ai/api/search-image?query=China%20border%20closure%20concept%2C%20aerial%20view%20of%20Shanghai%20port%20with%20massive%20cargo%20ships%20halted%20and%20blocked%2C%20red%20warning%20barriers%20across%20shipping%20lanes%2C%20dramatic%20overcast%20sky%20with%20red%20tinted%20light%20casting%20over%20the%20port%2C%20containers%20stacked%20high%2C%20sense%20of%20economic%20standstill%20and%20geopolitical%20tension%2C%20cinematic%20wide%20shot%2C%20dark%20moody%20atmosphere&width=1000&height=400&seq=disruption-china-port-v1&orientation=landscape"
              alt="China border closure disruption scenario"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,5,5,0.95) 100%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, transparent 60%, rgba(10,5,5,0.6) 100%)' }}
          />
        </div>

        {/* Consequence cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {impactData.consequences.map((c, i) => (
            <div
              key={i}
              className={`relative border rounded-2xl p-6 transition-all duration-700 hover:border-red-500/30 hover:scale-[1.02] group ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at top left, rgba(220,38,38,0.06) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <h4 className="text-white font-bold text-base mb-2">{c.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
