export interface SstTimelineItem {
  period: string;
  headline: string;
  summary: string;
}

export interface SstConceptPoint {
  title: string;
  badge?: string;
  explanation: string;
}

export interface SstChapterVault {
  id: string;
  chapterNumber: number;
  title: string;
  discipline: 'Overview' | 'Geography' | 'History' | 'Political Science' | 'Economics';
  quickTagline: string;
  isHistoryTimeline?: boolean;
  timeline?: SstTimelineItem[];
  summaryPoints?: SstConceptPoint[];
}

export const SST_VAULT_CHAPTERS: SstChapterVault[] = [
  // CHAPTER 1: OVERVIEW
  {
    id: 'sst-ch-1',
    chapterNumber: 1,
    title: 'Understanding Social Science',
    discipline: 'Overview',
    quickTagline: 'Interconnection of Society, Traditions, Disciplines & Methods',
    isHistoryTimeline: false,
    summaryPoints: [
      {
        title: 'Meaning of Social Science',
        badge: 'Core Concept',
        explanation: 'Systematic study of human society, explaining not only what happens or where things are located, but why events occur and how society functions.',
      },
      {
        title: 'Four Core Disciplines in Grade 9',
        badge: 'Structure',
        explanation: 'Geography (Earth & surroundings), History (human past & change), Political Science (governance & power), Economics (resource allocation & choices).',
      },
      {
        title: 'Indian Knowledge Traditions (Pañchamahābhūtas)',
        badge: 'Indian Thought',
        explanation: 'The five primal elements—Pṛithvī (earth), Āpaḥ (water), Agni (fire), Vāyu (air), and Ākāśha (space)—illustrate nature as an interconnected living ecosystem.',
      },
      {
        title: 'Vasudhaiva Kuṭumbakam',
        badge: 'Philosophy',
        explanation: 'Ancient Vedic ideal meaning ‘the whole world is one family’, embodying global interdependence, mutual respect, and cultural connection.',
      },
      {
        title: 'Historical Sources of Evidence',
        badge: 'Methodology',
        explanation: 'History relies on Literary sources (manuscripts, Vedas), Epigraphic sources (inscriptions on pillars/caves), Numismatic sources (coins), and Archaeological remains.',
      },
    ],
  },

  // CHAPTER 2: GEOGRAPHY
  {
    id: 'sst-ch-2',
    chapterNumber: 2,
    title: 'Shaping of the Earth’s Surface',
    discipline: 'Geography',
    quickTagline: 'Plate Tectonics, Gradation Agents & Natural Landform Disasters',
    isHistoryTimeline: false,
    summaryPoints: [
      {
        title: 'Earth’s Interior & Lithosphere',
        badge: 'Structure',
        explanation: 'Earth comprises Crust (outer solid), Mantle (molten convection layer), and Core (fluid outer, dense solid inner). Lithosphere floats over the semi-molten Asthenosphere.',
      },
      {
        title: 'Plate Tectonics & Three Boundaries',
        badge: 'Tectonics',
        explanation: 'Convergent (plates collide &rarr; fold mountains like Himalayas), Divergent (plates separate &rarr; new crust like Mid-Atlantic Ridge), Transform (plates slide &rarr; earthquakes).',
      },
      {
        title: 'Weathering vs. Erosion',
        badge: 'Geomorphology',
        explanation: 'Weathering breaks rocks in place without moving (Physical, Chemical, Biological). Erosion involves wearing away and transport of rock debris by natural agents.',
      },
      {
        title: 'Landforms by Gradation Agents',
        badge: 'Landforms',
        explanation: 'Rivers form V-shaped valleys, waterfalls, meanders, and deltas; sea waves create cliffs and sea arches; glaciers carve U-shaped valleys and moraines; wind shapes sand dunes and yardangs.',
      },
      {
        title: 'Karst Topography & Natural Disasters',
        badge: 'Hazards',
        explanation: 'Underground water dissolves limestone creating stalactites, stalagmites, and sinkholes. Associated disasters include Landslides, Avalanches, and GLOFs (Glacial Lake Outburst Floods).',
      },
    ],
  },

  // CHAPTER 3: GEOGRAPHY
  {
    id: 'sst-ch-3',
    chapterNumber: 3,
    title: 'Atmosphere and Climate',
    discipline: 'Geography',
    quickTagline: 'Atmospheric Layers, Monsoon Mechanism, Seasons & Climate Action',
    isHistoryTimeline: false,
    summaryPoints: [
      {
        title: 'Atmospheric Composition & 5 Layers',
        badge: 'Atmosphere',
        explanation: 'Gases: Nitrogen (78%), Oxygen (21%), Argon (0.93%), CO₂ (0.04%). Layers: Troposphere (all weather), Stratosphere (ozone layer & flights), Mesosphere (meteors burn), Thermosphere (radio waves & auroras), Exosphere.',
      },
      {
        title: 'Weather vs. Climate',
        badge: 'Core Distinction',
        explanation: 'Weather refers to hour-to-hour/day-to-day conditions. Climate refers to the 30+ year average weather patterns over an extensive region.',
      },
      {
        title: 'Mechanism of Indian Monsoon',
        badge: 'Monsoon',
        explanation: 'Unequal heating of land and sea creates summer low pressure over northern India, pulling moisture-laden winds from the Indian Ocean (South-West Monsoon).',
      },
      {
        title: 'Retreating Monsoon & Coastal Rain',
        badge: 'Rainfall Pattern',
        explanation: 'During winter, winds reverse from land to sea (North-East Monsoon); passing over Bay of Bengal, they bring winter rain to the Tamil Nadu coast.',
      },
      {
        title: 'Climate Change & Carbon Footprint',
        badge: 'Environment',
        explanation: 'Excess greenhouse gas emissions trap solar heat leading to global warming, erratic floods (e.g. Punjab Floods case study), and extreme weather events.',
      },
    ],
  },

  // CHAPTER 4: HISTORY (SHORT CHRONOLOGICAL TIMELINE)
  {
    id: 'sst-ch-4',
    chapterNumber: 4,
    title: 'Early Humans and Beginning of Civilisation',
    discipline: 'History',
    quickTagline: 'From Stone Tools & Hunter-Gatherers to the First Bronze Age Cities',
    isHistoryTimeline: true,
    timeline: [
      {
        period: '~3.3 Million Years Ago',
        headline: 'First Stone Tools in Africa',
        summary: 'Earliest stone tool making begins, marking the birth of cognitive human behavior (tool-making hominins).',
      },
      {
        period: '~2 Million Years Ago',
        headline: 'Homo erectus Migrates Out of Africa',
        summary: 'Early upright humans develop handaxes and cleavers; earliest Indian tool sites at Attirampakkam (TN) and Isampur (Karnataka).',
      },
      {
        period: '~300,000 BCE',
        headline: 'Evolution of Homo sapiens',
        summary: 'Anatomically modern humans evolve in Africa and gradually spread across the globe.',
      },
      {
        period: '~12,000 BCE',
        headline: 'Climate Warming & Mesolithic Period',
        summary: 'Ice sheets retreat; humans use microlithic (tiny stone) tools for hunting and fishing; famous rock paintings at Bhimbetka (MP).',
      },
      {
        period: '~7000 BCE',
        headline: 'Neolithic Revolution at Mehrgarh',
        summary: 'Shift from food gathering to food production; barley, wheat, and zebu cattle domesticated; early village settlements on the Bolan River.',
      },
      {
        period: '~4000 BCE',
        headline: 'Chalcolithic Metal Age',
        summary: 'Smelting of copper begins alongside stone tools; pre-Harappan communities flourish at Kunal and Bhirrana.',
      },
      {
        period: '~3200 BCE',
        headline: 'Invention of Writing in Mesopotamia',
        summary: 'Sumerians invent Cuneiform script (wedge-shaped on clay tablets), creating the world’s first recorded literature and laws.',
      },
      {
        period: '~2600 – 1900 BCE',
        headline: 'Mature Bronze Age Civilisations',
        summary: 'Simultaneous peak of Sindhu-Sarasvatī (Harappan urban cities, Lothal dockyard, Dholavira reservoirs), Egypt (Pharaohs & pyramids), Mesopotamia (Hammurabi’s Code), and China (Shang dynasty & oracle bones).',
      },
    ],
  },

  // CHAPTER 5: HISTORY (SHORT CHRONOLOGICAL TIMELINE)
  {
    id: 'sst-ch-5',
    chapterNumber: 5,
    title: 'State and Society up to 1000 CE',
    discipline: 'History',
    quickTagline: 'From Vedic Janas to Mauryan, Gupta & Imperial Chola Administrations',
    isHistoryTimeline: true,
    timeline: [
      {
        period: '~1500 – 1000 BCE',
        headline: 'Early Vedic Period & Sapta-Sindhu',
        summary: 'Ṛigveda composed; society organized into kin-based clans (janas); participatory assemblies (Sabhā, Samiti, Vidhata); flexible occupational mobility.',
      },
      {
        period: '~1000 – 600 BCE',
        headline: 'Later Vedic Period & Iron Age',
        summary: 'Expansion into fertile Ganga valley; transition from tribal janas to territorial janapadas; Northern Black Polished Ware (NBPW); emergence of social institutions.',
      },
      {
        period: '~600 – 300 BCE',
        headline: 'Rise of 16 Mahājanapadas',
        summary: 'Magadha emerges supreme; monarchies (rājyas) and republics (gaṇas/saṁghas); teachings of Buddha and Mahavira; trade guilds (śhreṇīs) and silver punch-marked coins.',
      },
      {
        period: '321 – 185 BCE',
        headline: 'The Mauryan Empire',
        summary: 'Chandragupta Maurya unifies subcontinent; Kauṭilya writes Arthaśhāstra (Saptāṁga 7-limb state theory); Ashoka champions moral governance (Dhamma).',
      },
      {
        period: '300 BCE – 300 CE',
        headline: 'Sangam Era in Tamilakam',
        summary: 'Three crowned kings—Cheras, Cholas, Pandyas; vibrant trade with Rome via Muziris and Kaveripattinam; Karikala Chola constructs the Grand Anicut dam.',
      },
      {
        period: '320 – 550 CE',
        headline: 'Classical Gupta Period',
        summary: 'Decentralized multi-tier administration (bhuktis, viṣhayas, village councils); Queen Prabhavati Gupta rules as Vakataka regent; universities of Nalanda and Takshashila flourish.',
      },
      {
        period: '6th – 10th Century CE',
        headline: 'Regional Empires & Grassroots Chola Governance',
        summary: 'Tamil Bhakti poetry (12 Āḻvārs & 63 Nāyanmārs); Tripartite Struggle for Kannauj; Uttaramerur inscription details Kudavolai ballot-pot village democracy under Cholas.',
      },
    ],
  },

  // CHAPTER 6: POLITICAL SCIENCE (CIVICS)
  {
    id: 'sst-ch-6',
    chapterNumber: 6,
    title: 'Democracy',
    discipline: 'Political Science',
    quickTagline: 'Core Democratic Principles, Separation of Powers & Grassroots Governance',
    isHistoryTimeline: false,
    summaryPoints: [
      {
        title: 'Foundations of Indian Democracy',
        badge: 'Core Concept',
        explanation: 'Popular sovereignty where power lies with citizens via Universal Adult Franchise (18+). Supported by the world’s longest written Constitution (adopted 26 Nov 1949, enacted 26 Jan 1950).',
      },
      {
        title: 'Rule of Law & Separation of Powers',
        badge: 'Constitutional Pillars',
        explanation: 'No one is above the law. Checks and balances among Legislature (makes laws), Executive (implements laws), and independent Judiciary (interprets & protects Constitution).',
      },
      {
        title: '6 Fundamental Rights & Accountability',
        badge: 'Citizen Rights',
        explanation: 'Enforceable in courts (Arts 14–32). Reinforced by transparency tools like the Right to Information (RTI Act 2005) and independent watchdogs (CAG, CVC, Lokpal).',
      },
      {
        title: 'Forms of Democracy Across the World',
        badge: 'Comparative Politics',
        explanation: 'Direct Democracy (Switzerland) vs. Representative Indirect Democracy (India, USA). Parliamentary system (India, UK) vs. Presidential system (USA).',
      },
      {
        title: 'Grassroots Democracy & Women’s Empowerment',
        badge: 'Local Governance',
        explanation: 'Three-tier system (Union, State, Panchayati Raj). The Constitution mandates 1/3rd seats reserved for women (expanded to 50% reservation in 21 Indian States).',
      },
    ],
  },

  // CHAPTER 7: POLITICAL SCIENCE (CIVICS)
  {
    id: 'sst-ch-7',
    chapterNumber: 7,
    title: 'Elections',
    discipline: 'Political Science',
    quickTagline: 'Electoral Systems, Election Commission Machinery & Inclusive Voting',
    isHistoryTimeline: false,
    summaryPoints: [
      {
        title: 'Why Elections Matter (Psephology)',
        badge: 'Democratic Right',
        explanation: 'Elections ensure accountability, leadership renewal, and legitimacy. Psephology is the scientific study of elections and voting trends.',
      },
      {
        title: 'Electoral Systems: FPTP vs. PR-STV',
        badge: 'Voting Systems',
        explanation: 'First-Past-The-Post (FPTP) elects Lok Sabha & Vidhan Sabha members (candidate with most votes wins). Proportional Representation (PR-STV) elects President, VP, and Rajya Sabha.',
      },
      {
        title: 'Election Commission of India (ECI)',
        badge: 'Autonomous Body',
        explanation: 'Constitutional body under Article 324 established on 25 January 1950 (National Voters’ Day). Conducts free, fair, and impartial elections nationwide.',
      },
      {
        title: 'ECI Digital & Inclusivity Reforms',
        badge: 'Modern Tools',
        explanation: 'cVIGIL app (reporting model code violations), Suvidha (candidate permissions), Saksham app (PwD assistance), and 2024 Vote-from-Home for citizens aged 85+ and 40%+ disabled.',
      },
      {
        title: 'Anti-Defection Law (1985)',
        badge: 'Electoral Integrity',
        explanation: '52nd Constitutional Amendment prevents elected MPs/MLAs from betraying voters by switching political parties opportunistically after winning.',
      },
    ],
  },

  // CHAPTER 8: ECONOMICS
  {
    id: 'sst-ch-8',
    chapterNumber: 8,
    title: 'Building Blocks in Economics: The Problem of Choice',
    discipline: 'Economics',
    quickTagline: 'Scarcity, Opportunity Cost, PPC & 3 Economic Systems',
    isHistoryTimeline: false,
    summaryPoints: [
      {
        title: 'The Economic Problem: Scarcity & Choice',
        badge: 'Fundamentals',
        explanation: 'Derived from Greek ‘oikonomia’ (household management). Resources are limited/scarce, while human wants are unlimited and constantly expanding.',
      },
      {
        title: 'Opportunity Cost',
        badge: 'Key Definition',
        explanation: 'The value of the next best alternative that is given up when a choice is made (e.g. growing barley on a plot means sacrificing wheat).',
      },
      {
        title: 'Production Possibility Curve (PPC)',
        badge: 'Economic Tool',
        explanation: 'A downward-sloping curve showing the maximum alternative combinations of two goods that can be produced using available resources efficiently.',
      },
      {
        title: 'Three Central Questions of Every Economy',
        badge: 'Core Decisions',
        explanation: '1. What to produce? (consumer goods vs. capital goods) 2. How to produce? (labour-intensive vs. capital-intensive) 3. For whom to produce? (distribution).',
      },
      {
        title: 'Three Economic Systems',
        badge: 'Systems',
        explanation: 'Planned Economy (government controls resources, e.g. North Korea), Market Economy (demand & supply forces drive prices, e.g. USA), Mixed Economy (coexistence of public and private sector, e.g. India).',
      },
    ],
  },

  // CHAPTER 9: ECONOMICS
  {
    id: 'sst-ch-9',
    chapterNumber: 9,
    title: 'The Price Puzzle: What Drives the Market',
    discipline: 'Economics',
    quickTagline: 'Demand & Supply Laws, Market Equilibrium & Government Interventions',
    isHistoryTimeline: false,
    summaryPoints: [
      {
        title: 'Law of Demand',
        badge: 'Demand',
        explanation: 'Inverse relationship: when price rises, quantity demanded falls; when price falls, quantity demanded rises (downward-sloping DD curve). Driven by diminishing marginal utility.',
      },
      {
        title: 'Determinants of Demand',
        badge: 'Market Forces',
        explanation: 'Consumer income, tastes, future price expectations, substitute goods (tea & coffee), and complementary goods (car & petrol, smartphone & earphones).',
      },
      {
        title: 'Law of Supply',
        badge: 'Supply',
        explanation: 'Direct relationship: when price rises, quantity supplied increases; when price falls, quantity supplied decreases (upward-sloping SS curve).',
      },
      {
        title: 'Market Equilibrium',
        badge: 'Equilibrium',
        explanation: 'The point where Demand equals Supply (Qd = Qs). Below equilibrium price causes shortage (excess demand); above equilibrium causes surplus (excess supply).',
      },
      {
        title: 'Government Interventions: Price Ceiling vs. Price Floor',
        badge: 'Policy & Welfare',
        explanation: 'Price Ceiling sets maximum legal price to protect consumers (e.g. essential medicines). Price Floor sets minimum legal price to protect workers/farmers (e.g. minimum wage, MSP).',
      },
    ],
  },
];
