
export default function ImpactSection() {
  const consequences = [
    {
      icon: 'ri-factory-line',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      title: 'Immediate Production Halt',
      text: 'China supplies roughly 60% of the world\'s lithium and processes over 80% of it globally. Without Chinese lithium, Tesla\'s Gigafactory in Nevada would run out of battery-grade lithium carbonate within weeks. Every Tesla Model X requires approximately 12 kg of lithium in its battery pack — there is currently no substitute material that performs at the same level.',
    },
    {
      icon: 'ri-links-line',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      title: 'Supply Chain Collapse',
      text: 'Panasonic, CATL, and LG Energy Solution — Tesla\'s main battery cell suppliers — all depend on Chinese lithium processing. A Chinese border closure would force all three to pause cell production simultaneously. This would cascade upstream to mining companies in Australia and Chile who would lose their largest processing customer, and downstream to Tesla\'s Fremont assembly plant which would have no battery packs to install.',
    },
    {
      icon: 'ri-money-dollar-circle-line',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      title: 'Skyrocketing Costs & Prices',
      text: 'With lithium supply severely restricted, the price of remaining lithium stocks would spike dramatically — as seen during the 2021–2022 lithium shortage when prices rose over 500%. Tesla would be forced to pass these costs onto consumers, potentially raising the Model X price by tens of thousands of dollars, making it unaffordable for most buyers and slowing the global transition to electric vehicles.',
    },
    {
      icon: 'ri-user-unfollow-line',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      title: 'Job Losses Across All Sectors',
      text: 'A production shutdown would affect workers across all three economic sectors: miners in Australia and Chile (primary), factory workers at Gigafactories and the Fremont plant (secondary), and Tesla sales staff, software engineers, and service technicians worldwide (tertiary). Tens of thousands of jobs depend on this single supply chain functioning smoothly.',
    },
    {
      icon: 'ri-seedling-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      title: 'Long-Term Adaptation',
      text: 'In the long run, Tesla and other manufacturers would be forced to invest heavily in lithium recycling programs, develop sodium-ion battery alternatives, and fund new lithium processing facilities outside China — in countries like Canada, Australia, and the USA. This would take 5–10 years and billions of dollars, demonstrating how deeply interdependence shapes industrial strategy.',
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 mb-16">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg mb-4">
          <i className="ri-alert-line text-2xl text-white"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">What If China Closed Its Borders?</h2>
        <p className="text-gray-500 text-sm mt-2 text-center max-w-xl">
          Scenario: China — the world's largest lithium processor — suddenly bans all lithium exports. Here's what would happen to the Tesla Model X supply chain.
        </p>
        <div className="mt-4 px-4 py-2 bg-red-100 border border-red-300 rounded-full text-red-800 text-xs font-bold">
          ⚠ Disrupted Resource: Lithium Processing — China
        </div>
      </div>

      {/* Consequence Cards */}
      <div className="space-y-4">
        {consequences.map((c, i) => (
          <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-5 flex gap-4`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm flex-shrink-0 ${c.color}`}>
              <i className={`${c.icon} text-xl`}></i>
            </div>
            <div>
              <h4 className={`font-bold text-gray-900 mb-1`}>{c.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Key Takeaway */}
      <div className="mt-8 bg-gray-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-3">
          <i className="ri-lightbulb-line text-2xl text-yellow-400 flex-shrink-0 mt-0.5"></i>
          <div>
            <h4 className="font-bold text-lg mb-2">Key Takeaway: Interdependence Creates Vulnerability</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Tesla Model X is not just a car — it is the result of dozens of countries, hundreds of businesses, and thousands of workers all depending on each other. When one link in this global chain breaks, every other link feels the impact. This is the essence of <strong className="text-white">interdependence</strong>: no single country or company can produce a modern product entirely on its own.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
