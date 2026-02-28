export const steps = [
  {
    step: 1,
    title: 'Lithium Mining',
    location: 'Atacama Desert, Chile & Western Australia',
    flag: '🇨🇱🇦🇺',
    sector: 'primary' as const,
    description:
      "Lithium is extracted from salt flats (salares) in Chile's Atacama Desert through brine evaporation, and from hard-rock spodumene deposits in Western Australia. This silvery-white metal is the core ingredient in every Tesla battery cell. Mining companies pump lithium-rich brine into large evaporation ponds, concentrating the lithium over months before chemical processing. Chile and Australia together supply over 70% of the world's lithium.",
    resources: [
      { type: 'natural' as const, label: 'Lithium brine / spodumene ore' },
      { type: 'natural' as const, label: 'Solar energy (evaporation)' },
      { type: 'human' as const, label: 'Mining engineers & equipment operators' },
      { type: 'capital' as const, label: 'Excavators, evaporation ponds, processing plants' },
    ],
    businesses: ['SQM (Chile)', 'Albemarle (USA/Chile)', 'Pilbara Minerals (Australia)', 'Ganfeng Lithium (China)'],
    image:
      'https://readdy.ai/api/search-image?query=vast%20lithium%20salt%20flat%20evaporation%20ponds%20in%20Atacama%20Desert%20Chile%2C%20turquoise%20and%20blue%20rectangular%20pools%20stretching%20to%20the%20horizon%20under%20bright%20blue%20sky%2C%20industrial%20lithium%20brine%20extraction%20operation%2C%20aerial%20view%2C%20arid%20desert%20landscape%20with%20mountains%20in%20background&width=800&height=420&seq=step1-lithium-mining&orientation=landscape',
  },
  {
    step: 2,
    title: 'Cobalt & Nickel Mining',
    location: 'Democratic Republic of Congo & Indonesia',
    flag: '🇨🇩🇮🇩',
    sector: 'primary' as const,
    description:
      "Cobalt is primarily mined in the Democratic Republic of Congo (DRC), which holds over 70% of global reserves. It is extracted as a by-product of copper mining. Nickel, another critical battery material, is mined in Indonesia from laterite deposits. Both metals are essential for the NCA chemistry used in Tesla's battery cells, providing energy density and thermal stability.",
    resources: [
      { type: 'natural' as const, label: 'Cobalt ore, nickel laterite deposits' },
      { type: 'human' as const, label: 'Underground miners, geologists, processing workers' },
      { type: 'capital' as const, label: 'Drilling rigs, smelters, ore crushers' },
    ],
    businesses: ['Glencore (Switzerland/DRC)', 'Vale (Brazil)', 'PT Vale Indonesia', 'Umicore (Belgium)'],
    image:
      'https://readdy.ai/api/search-image?query=large%20open%20pit%20copper%20cobalt%20mine%20in%20Democratic%20Republic%20of%20Congo%20Africa%2C%20massive%20terraced%20excavation%20with%20heavy%20mining%20trucks%20on%20winding%20roads%2C%20reddish%20brown%20earth%20and%20rock%20and%20industrial%20scale%20mining%20operation%20with%20processing%20facilities%20visible&width=800&height=420&seq=step2-cobalt-mining&orientation=landscape',
  },
  {
    step: 3,
    title: 'Aluminum & Steel Production',
    location: 'Canada, China & Germany',
    flag: '🇨🇦🇨🇳🇩🇪',
    sector: 'primary' as const,
    description:
      "Aluminum is produced by refining bauxite ore into alumina, then smelting it using electrolysis. Canada uses abundant hydroelectric power to smelt aluminum cheaply and cleanly. The Tesla Model X body uses a high-strength aluminum alloy for its frame and panels, making it lighter and more efficient. High-grade steel is sourced from Germany and South Korea for structural components.",
    resources: [
      { type: 'natural' as const, label: 'Bauxite ore, iron ore, coal' },
      { type: 'natural' as const, label: 'Hydroelectric power (Canada)' },
      { type: 'human' as const, label: 'Metallurgists, smelter operators, engineers' },
      { type: 'capital' as const, label: 'Electrolytic smelters, blast furnaces, rolling mills' },
    ],
    businesses: ['Rio Tinto Alcan (Canada)', 'Chalco (China)', 'ThyssenKrupp (Germany)', 'POSCO (South Korea)'],
    image:
      'https://readdy.ai/api/search-image?query=aluminum%20smelting%20facility%20interior%20with%20rows%20of%20electrolytic%20reduction%20cells%20glowing%20orange%20and%20yellow%2C%20molten%20aluminum%20production%2C%20industrial%20factory%20with%20workers%20in%20protective%20gear%2C%20bright%20light%20from%20molten%20metal%2C%20modern%20metallurgical%20plant&width=800&height=420&seq=step3-aluminum-smelting&orientation=landscape',
  },
  {
    step: 4,
    title: 'Rare Earth Extraction',
    location: 'Inner Mongolia, China & Mountain Pass, USA',
    flag: '🇨🇳🇺🇸',
    sector: 'primary' as const,
    description:
      "Rare earth elements, particularly neodymium and dysprosium, are mined primarily in China's Inner Mongolia region. These metals are critical for manufacturing the powerful permanent magnets inside Tesla's electric drive motors. Without these magnets, the motor cannot generate the torque needed to propel the vehicle. Extraction involves open-pit mining followed by complex chemical separation.",
    resources: [
      { type: 'natural' as const, label: 'Neodymium, dysprosium, praseodymium ores' },
      { type: 'human' as const, label: 'Chemical engineers, mine workers, refinery technicians' },
      { type: 'capital' as const, label: 'Chemical separation plants, open-pit mining equipment' },
    ],
    businesses: ['China Northern Rare Earth Group', 'MP Materials (USA)', 'Lynas Rare Earths (Australia)', 'Shin-Etsu Chemical (Japan)'],
    image:
      'https://static.readdy.ai/image/2622f6e3a7b28638439444865c646bbc/e57d16078b4b4cd01cbebb6ff66fc966.webp',
  },
  {
    step: 5,
    title: 'Battery Cell Manufacturing',
    location: 'Gigafactory Nevada, USA & Shanghai, China',
    flag: '🇺🇸🇨🇳',
    sector: 'secondary' as const,
    description:
      "Refined lithium, cobalt, and nickel are shipped to battery gigafactories where they are assembled into cylindrical battery cells (Tesla's 4680 format). At the Gigafactory in Sparks, Nevada, built in partnership with Panasonic, thousands of automated machines coat electrode foils, wind them into cells, fill them with electrolyte, and seal them. Each Tesla Model X battery pack contains thousands of individual cells.",
    resources: [
      { type: 'natural' as const, label: 'Lithium carbonate, cobalt sulfate, nickel sulfate' },
      { type: 'human' as const, label: 'Battery engineers, quality control technicians, assembly workers' },
      { type: 'capital' as const, label: 'Electrode coating machines, cell winding robots, clean rooms' },
    ],
    businesses: ['Tesla (USA)', 'Panasonic (Japan)', 'CATL (China)', 'LG Energy Solution (South Korea)'],
    image:
      'https://readdy.ai/api/search-image?query=Tesla%20Gigafactory%20battery%20manufacturing%20interior%2C%20rows%20of%20automated%20robotic%20assembly%20lines%20producing%20cylindrical%20battery%20cells%2C%20clean%20room%20environment%20with%20yellow%20robotic%20arms%2C%20modern%20high%E2%80%91tech%20factory%20floor%20with%20conveyor%20systems%20and%20quality%20inspection%20stations&width=800&height=420&seq=step5-battery-manufacturing&orientation=landscape',
  },
  {
    step: 6,
    title: 'Electric Motor Production',
    location: 'Fremont, California, USA',
    flag: '🇺🇸',
    sector: 'secondary' as const,
    description:
      "The rare earth magnets are used to manufacture Tesla's permanent magnet synchronous reluctance motors. The Model X uses a dual-motor all-wheel-drive setup. These motors are wound with copper wire sourced from Chile and Peru, assembled with precision bearings, and integrated with power electronics. Tesla manufactures these motors in-house at its Fremont facility to maintain quality control.",
    resources: [
      { type: 'natural' as const, label: 'Neodymium magnets, copper wire, steel laminations' },
      { type: 'human' as const, label: 'Electrical engineers, precision assembly technicians' },
      { type: 'capital' as const, label: 'CNC winding machines, precision assembly robots, testing rigs' },
    ],
    businesses: ['Tesla (USA)', 'Hitachi Metals (Japan)', 'Sumitomo Electric (Japan)', 'Bosch (Germany)'],
    image:
      'https://readdy.ai/api/search-image?query=electric%20vehicle%20motor%20manufacturing%2C%20precision%20assembly%20of%20permanent%20magnet%20electric%20motor%20with%20copper%20windings%20and%20silver%20rotor%2C%20clean%20industrial%20workshop%20with%20robotic%20arms%20and%20technicians%20in%20white%20coats%2C%20high%E2%80%91tech%20EV%20drivetrain%20production%20facility&width=800&height=420&seq=step6-motor-production&orientation=landscape',
  },
  {
    step: 7,
    title: 'Body Stamping & Frame',
    location: 'Fremont Factory, California, USA',
    flag: '🇺🇸',
    sector: 'secondary' as const,
    description:
      "Aluminum sheets and high-strength steel coils are fed into massive stamping presses that shape body panels under thousands of tons of pressure. Tesla uses a revolutionary Giga Press machine (made by IDRA in Italy) to die-cast large sections of the vehicle's underbody as single aluminum pieces, replacing hundreds of individual parts. Robotic welding arms then join the panels into a complete body shell.",
    resources: [
      { type: 'natural' as const, label: 'Aluminum alloy sheets, high-strength steel coils' },
      { type: 'human' as const, label: 'Press operators, welding technicians, quality inspectors' },
      { type: 'capital' as const, label: 'Giga Press die-casting machines, stamping presses, robotic welders' },
    ],
    businesses: ['Tesla (USA)', 'IDRA Group (Italy)', 'Novelis (USA/Canada)', 'Shiloh Industries (USA)'],
    image:
      'https://readdy.ai/api/search-image?query=Tesla%20Giga%20Press%20die%20casting%20machine%20in%20factory%2C%20enormous%20aluminum%20casting%20machine%20producing%20large%20vehicle%20underbody%20sections%2C%20bright%20industrial%20lighting%2C%20massive%20machinery%20with%20molten%20aluminum%20injection%2C%20modern%20automotive%20manufacturing%20plant%20interior&width=800&height=420&seq=step7-body-stamping&orientation=landscape',
  },
  {
    step: 8,
    title: 'Paint & Finishing',
    location: 'Fremont Factory, California, USA',
    flag: '🇺🇸',
    sector: 'secondary' as const,
    description:
      "The bare body shell is cleaned, treated with a zinc phosphate coating to prevent corrosion, then passed through an electrocoating bath. Multiple layers follow: primer, base coat, and a clear coat for gloss and UV protection. Tesla's paint shop uses water-based paints to reduce emissions. Metallic pigments are sourced from chemical suppliers in Germany and Japan. Robots apply paint with precision.",
    resources: [
      { type: 'natural' as const, label: 'Zinc phosphate, metallic pigments, water-based solvents' },
      { type: 'human' as const, label: 'Paint technicians, quality control inspectors' },
      { type: 'capital' as const, label: 'Electrocoating tanks, robotic paint sprayers, curing ovens' },
    ],
    businesses: ['Tesla (USA)', 'BASF Coatings (Germany)', 'PPG Industries (USA)', 'Axalta Coating Systems (USA)'],
    image:
      'https://readdy.ai/api/search-image?query=automotive%20paint%20shop%20with%20robotic%20arms%20spraying%20white%20paint%20on%20car%20body%2C%20modern%20vehicle%20painting%20facility%20with%20orange%20robotic%20sprayers%2C%20clean%20room%20environment%20with%20bright%20lighting%2C%20electric%20car%20body%20on%20conveyor%20being%20painted%20with%20precision%20automated%20equipment&width=800&height=420&seq=step8-paint-shop&orientation=landscape',
  },
  {
    step: 9,
    title: 'Final Vehicle Assembly',
    location: 'Fremont Factory, California, USA',
    flag: '🇺🇸',
    sector: 'secondary' as const,
    description:
      "In the final assembly hall, the painted body shell moves down a production line where hundreds of components are installed. Workers and robots fit the interior, including seats, dashboard, wiring harnesses (made in Mexico), glass (from AGC in Japan), and the distinctive Falcon Wing rear doors. The battery pack is bolted to the underfloor. Wheels and tires (from Michelin in France) are fitted. Each Model X takes approximately 3 to 5 days to complete.",
    resources: [
      { type: 'natural' as const, label: 'Glass, leather/vegan fabric, rubber (tires)' },
      { type: 'human' as const, label: 'Assembly line workers, logistics coordinators, quality engineers' },
      { type: 'capital' as const, label: 'Assembly robots, overhead conveyors, torque tools, testing equipment' },
    ],
    businesses: [
      'Tesla (USA)',
      'Aptiv (Ireland, wiring)',
      'AGC Inc. (Japan, glass)',
      'Michelin (France, tires)',
      'Lear Corporation (USA, seats)',
    ],
    image:
      'https://readdy.ai/api/search-image?query=Tesla%20vehicle%20final%20assembly%20line%20with%20white%20electric%20SUVs%20on%20production%20conveyor%2C%20workers%20installing%20components%2C%20bright%20modern%20factory%20with%20organized%20workstations%2C%20robotic%20arms%20and%20human%20workers%20collaborating%2C%20clean%20automotive%20manufacturing%20environment%20with%20multiple%20vehicles%20in%20various%20stages%20of%20assembly&width=800&height=420&seq=step9-final-assembly&orientation=landscape',
  },
  {
    step: 10,
    title: 'Software & OTA Updates',
    location: 'Palo Alto, California, USA & Global Teams',
    flag: '🇺🇸🌍',
    sector: 'tertiary' as const,
    description:
      "Tesla treats its vehicles as software platforms. Teams of software engineers develop the operating system that controls every function of the Model X, from the 17-inch touchscreen to the Autopilot driver-assistance system. The Full Self-Driving suite uses neural networks trained on billions of miles of driving data. Software updates are delivered wirelessly (over-the-air) to every Tesla, adding new features without requiring a dealership visit.",
    resources: [
      { type: 'human' as const, label: 'Software engineers, AI researchers, UX designers, data scientists' },
      { type: 'capital' as const, label: 'Cloud servers (AWS), supercomputer clusters (Dojo), development workstations' },
      { type: 'natural' as const, label: 'Electricity for data centers' },
    ],
    businesses: ['Tesla AI (USA)', 'Amazon Web Services (USA)', 'NVIDIA (USA — AI chips)', 'Mobileye (Israel — vision systems)'],
    image:
      'https://static.readdy.ai/image/2622f6e3a7b28638439444865c646bbc/57b9c7c17eefad41a3454185467b15ac.jpeg',
  },
  {
    step: 11,
    title: 'Sales, Delivery & Service',
    location: 'Tesla Showrooms & Service Centers Worldwide',
    flag: '🌍',
    sector: 'tertiary' as const,
    description:
      "Tesla sells its vehicles directly to consumers through its own showrooms and website, bypassing traditional dealerships. Customers configure their Model X online and receive delivery at a Tesla delivery center or at home. Tesla's global network of over 40,000 Supercharger stations allows owners to charge on long trips. Service centers handle repairs and maintenance. This direct-to-consumer model is the final stage of the product's journey.",
    resources: [
      { type: 'human' as const, label: 'Sales advisors, delivery specialists, service technicians, customer support agents' },
      { type: 'capital' as const, label: 'Showrooms, Supercharger networks, service center equipment, logistics fleet' },
      { type: 'natural' as const, label: 'Electricity for Supercharger network' },
    ],
    businesses: ['Tesla (USA, direct sales)', 'Tesla Energy (USA)', 'Various logistics partners', 'Local government (EV incentive programs)'],
    image:
      'https://readdy.ai/api/search-image?query=Tesla%20showroom%20interior%20with%20white%20Model%20X%20SUV%20on%20display%2C%20modern%20minimalist%20retail%20space%20with%20large%20glass%20windows%2C%20bright%20lighting%2C%20customers%20looking%20at%20vehicle%2C%20clean%20contemporary%20design%20with%20Tesla%20logo%2C%20premium%20automotive%20retail%20environment&width=800&height=420&seq=step11-sales-delivery&orientation=landscape',
  },
];

export const impactData = {
  title: 'What If China Closed Its Borders?',
  subtitle:
    "Scenario: China, the world's largest rare earth processor, suddenly bans all rare earth metal exports. Here's what would happen.",
  disrupted: 'Rare Earth Metals, China (Inner Mongolia)',
  consequences: [
    {
      icon: 'ri-factory-line',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      title: 'Immediate Production Halt',
      text: "China controls over 85% of global rare earth processing. Without Chinese rare earths, Tesla cannot manufacture the neodymium magnets inside its electric motors. Every Model X requires these magnets for both its front and rear motors, and there is currently no viable substitute that performs at the same level. Production would stop within weeks.",
    },
    {
      icon: 'ri-links-line',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      title: 'Supply Chain Collapse',
      text: "Hitachi Metals and Shin-Etsu Chemical, key magnet suppliers for Tesla, both depend on Chinese rare earth inputs. A Chinese border closure would force all motor production to pause simultaneously. This would cascade to the Fremont assembly plant, which would have no motors to install, halting all Model X production regardless of how many other parts are available.",
    },
    {
      icon: 'ri-money-dollar-circle-line',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      title: 'Skyrocketing Costs & Prices',
      text: "With rare earth supply severely restricted, prices of remaining stocks would spike dramatically. In 2010–2011, China briefly restricted rare earth exports and prices rose over 700%. Tesla would be forced to pass these costs onto consumers, potentially raising the Model X price by tens of thousands of dollars and slowing the global EV transition.",
    },
    {
      icon: 'ri-user-unfollow-line',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      title: 'Job Losses Across All Sectors',
      text: "A production shutdown would affect workers across all three economic sectors: miners in Australia and the USA (primary), factory workers at Gigafactories and the Fremont plant (secondary), and Tesla sales staff, software engineers, and service technicians worldwide (tertiary). Tens of thousands of jobs depend on this single supply chain functioning smoothly.",
    },
    {
      icon: 'ri-seedling-line',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      title: 'Long-Term Adaptation',
      text: "In the long run, Tesla and other manufacturers would invest heavily in rare earth recycling, develop alternative motor designs (such as induction motors that don't require rare earth magnets), and fund new rare earth processing facilities outside China, in Australia, Canada, and the USA. This would take 5 to 10 years and billions of dollars, demonstrating how deeply interdependence shapes industrial strategy.",
    },
  ],
  takeaway:
    "The Tesla Model X is not just a car — it is the result of dozens of countries, hundreds of businesses, and thousands of workers all depending on each other. When one link in this global chain breaks, every other link feels the impact. This is the essence of interdependence: no single country or company can produce a modern product entirely on its own.",
};

export const sectorSummary = [
  {
    id: 'primary',
    label: 'Primary Sector',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'ri-plant-line',
    iconBg: 'bg-emerald-500',
    steps: '4 Steps',
    description:
      "Involves the extraction of raw materials directly from the earth. For the Model X, this includes lithium mining in Chile, cobalt mining in the DRC, aluminum smelting in Canada, and rare earth extraction in China. These industries rely heavily on natural resources and capital equipment like mining machinery.",
  },
  {
    id: 'secondary',
    label: 'Secondary Sector',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'ri-tools-line',
    iconBg: 'bg-amber-500',
    steps: '5 Steps',
    description:
      "Involves turning raw materials into finished goods through manufacturing. For the Model X, this includes battery cell production in Nevada, motor manufacturing, body stamping, painting, and final assembly in Fremont, California. This sector relies heavily on capital resources (factories, robots) and human resources (skilled workers).",
  },
  {
    id: 'tertiary',
    label: 'Tertiary Sector',
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: 'ri-service-line',
    iconBg: 'bg-rose-500',
    steps: '2 Steps',
    description:
      "Involves providing services rather than physical goods. For the Model X, this includes Tesla's software engineering teams who develop Autopilot and the vehicle OS, as well as the global sales network, Supercharger infrastructure, and customer service. This sector is dominated by human resources, skilled professionals providing expertise and support.",
  },
];
