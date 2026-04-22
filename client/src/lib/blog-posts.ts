export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  deck: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  keywords: string[];
  body: BlogSection[];
  faqs: BlogFAQ[];
  pullquote?: { text: string; attribution: string };
}

export type BlogCategory =
  | "Maintenance"
  | "HRV/ERV"
  | "Seasonal"
  | "Education"
  | "Troubleshooting"
  | "Health"
  | "Pricing"
  | "Efficiency";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Maintenance",
  "HRV/ERV",
  "Seasonal",
  "Education",
  "Troubleshooting",
  "Health",
  "Pricing",
  "Efficiency",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-often-clean-heat-pump",
    title: "How often should you clean your heat pump in Halifax?",
    metaTitle: "How Often Should You Clean Your Heat Pump? | GreenPump Care Halifax",
    metaDescription:
      "Halifax heat pumps need deep cleaning at least once a year. More if you have pets or allergies. Here's what the manufacturers recommend and why it matters for your warranty.",
    excerpt:
      "Manufacturers recommend annual cleaning, but Halifax's salt air and humidity mean your system may need attention sooner.",
    deck:
      "The short answer is at least once a year. The long answer depends on your home, your system, and how you use it.",
    category: "Maintenance",
    date: "2026-04-15",
    readTime: "5 min read",
    keywords: [
      "how often clean heat pump",
      "heat pump cleaning frequency Halifax",
      "annual heat pump maintenance",
      "Mitsubishi heat pump cleaning schedule",
    ],
    body: [
      {
        heading: "What the manufacturers say",
        paragraphs: [
          "Every major heat pump manufacturer, Mitsubishi, Daikin, Fujitsu, LG, Carrier, recommends annual professional cleaning as part of standard maintenance. Skip it, and you can void your warranty. That's usually buried in the fine print of the owner's manual, but it's there.",
          "Annual cleaning also keeps your system operating near its rated efficiency. A dirty coil or blocked fan can quietly cut performance by 10 to 25%, which shows up on your power bill long before it shows up as a breakdown.",
        ],
      },
      {
        heading: "When once a year isn't enough",
        paragraphs: [
          "A few situations push the cleaning schedule tighter than annual. If you have pets, the fur and dander pull into the coil faster than you'd expect. If anyone in the household has allergies or asthma, cleaner coils mean cleaner air. If your system runs year-round, which most Halifax homes do, between heating in the winter and dehumidifying in the summer, the total hours add up.",
          "In those cases, twice a year keeps things ahead of the problem. We see it most often with multi-pet households and homes near the harbour, where salt air accelerates corrosion and biofilm growth.",
        ],
      },
      {
        heading: "Signs you're overdue",
        paragraphs: [
          "Heat pumps tell you when they're unhappy. Musty smells when the blower kicks on, visible dust or mould on the fins, reduced airflow, higher running costs, or a hum that's louder than you remember. Any one of these is a nudge to book a clean.",
          "The other tell is simpler: if you can't remember the last professional service, it's time.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will cleaning my heat pump more than once a year damage it?",
        answer:
          "No. The cleaning process is non-invasive. We disassemble, wash with eco-friendly solutions, and reassemble. You can safely clean a system every 6 months with zero risk to the components.",
      },
      {
        question: "How long does an annual deep clean take?",
        answer:
          "About 1 to 1.5 hours per indoor head for ductless, 2 to 3 hours for ducted systems, and 30 to 60 minutes for HRV/ERV units. We never rush. Thoroughness matters more than speed.",
      },
      {
        question: "Does rinsing the filter count as cleaning?",
        answer:
          "It helps, but it's not the same. Filter rinsing catches about 20% of the buildup. The rest is on the coil, fan barrel, and drain pan. Parts you can't reach without disassembly.",
      },
    ],
    pullquote: {
      text: "A dirty coil can quietly cut system efficiency by 10 to 25%.",
      attribution: "Manufacturer performance guidance",
    },
  },

  {
    slug: "signs-hrv-needs-cleaning",
    title: "5 signs your HRV needs cleaning",
    metaTitle: "5 Signs Your HRV Needs Cleaning | GreenPump Care Halifax",
    metaDescription:
      "Musty smells, condensation on windows, higher energy bills. These are signs your HRV is overdue for a deep clean. A Halifax homeowner's guide from GreenPump Care.",
    excerpt:
      "Musty smells, window condensation, and higher energy bills are just the start. Here's what to watch for before your HRV fails.",
    deck:
      "Your HRV works hardest in winter. Exactly when nobody thinks to check on it. Here's how to spot a system that's overdue.",
    category: "HRV/ERV",
    date: "2026-04-08",
    readTime: "4 min read",
    keywords: [
      "HRV cleaning signs",
      "ERV maintenance Halifax",
      "air exchanger cleaning",
      "heat recovery ventilator cleaning",
    ],
    body: [
      {
        heading: "1. Musty or stale indoor air",
        paragraphs: [
          "An HRV is supposed to bring fresh air in. If the air smells stale or slightly sour, the core has likely become a growth surface for mould, bacteria, or biofilm. That's a clean-immediately issue.",
        ],
      },
      {
        heading: "2. Condensation on windows",
        paragraphs: [
          "Persistent window condensation in winter usually means the HRV isn't exchanging enough air. A clogged filter or dirty core chokes the airflow balance between intake and exhaust.",
          "If you're wiping windows every morning, your HRV is probably telling you something.",
        ],
      },
      {
        heading: "3. Louder than it used to be",
        paragraphs: [
          "HRVs run quietly when clean. A loud or vibrating unit usually points to a dirty fan, motor strain from airflow restriction, or a core that's lost its balance.",
        ],
      },
      {
        heading: "4. Energy bills creeping up",
        paragraphs: [
          "An HRV that can't exchange air efficiently forces your heat pump to work harder. The extra load shows up on your bill in December and January, when the heat pump is running the most.",
        ],
      },
      {
        heading: "5. It's been more than a year",
        paragraphs: [
          "The simplest sign. HRVs need an annual deep clean. Core pulled, washed, drain lines cleared, filters replaced. If you haven't had that done, it's due.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I clean my HRV myself?",
        answer:
          "You can rinse the filters yourself every 2 to 3 months. But the core, drain lines, and fan assembly need disassembly. That's the professional part.",
      },
      {
        question: "How much does an HRV cleaning cost?",
        answer:
          "GreenPump Care's HRV/ERV deep clean is $129. Full disassembly, core wash, filter replacement, drain line clearing, and a performance test.",
      },
      {
        question: "Is it worth bundling with a heat pump clean?",
        answer:
          "Yes. Our HP + HRV bundle is $299. A $29 saving over booking them separately, and both systems get serviced in one visit.",
      },
    ],
  },

  {
    slug: "halifax-winter-heat-pump-guide",
    title: "Heat pump maintenance guide for Halifax winters",
    metaTitle: "Halifax Winter Heat Pump Maintenance Guide | GreenPump Care",
    metaDescription:
      "Nova Scotia winters are tough on heat pumps. Here's how to prep your ductless, ducted, or multi-head system for cold-weather efficiency, from a Halifax cleaning specialist.",
    excerpt:
      "Nova Scotia winters are tough on heat pumps. Here's how to keep yours running efficiently through February.",
    deck:
      "Ice, salt air, and sub-zero nights all punish heat pumps. Here's what to check before the first cold snap. And what to leave to a pro.",
    category: "Seasonal",
    date: "2026-04-02",
    readTime: "6 min read",
    keywords: [
      "Halifax winter heat pump maintenance",
      "Nova Scotia heat pump winter",
      "cold weather heat pump tips",
      "heat pump snow",
    ],
    body: [
      {
        heading: "Before the first cold snap",
        paragraphs: [
          "The ideal time for a professional deep clean is October or early November. Before the heating season starts. A clean system runs cooler, pulls less current, and handles sub-zero weather with more headroom.",
          "If you missed the fall window, don't wait until spring. Mid-winter cleans are common and fix the same problems.",
        ],
      },
      {
        heading: "Keep the outdoor unit clear",
        paragraphs: [
          "The outdoor condenser needs airflow to defrost properly. Brush snow off the top and sides after every storm, and clear a foot of space around the unit so it can breathe.",
          "Never use hot water or a scraper. If ice has formed solid around the coils, shut the system off and call us. Aggressive ice removal damages fins.",
        ],
      },
      {
        heading: "Listen for the defrost cycle",
        paragraphs: [
          "Heat pumps automatically run defrost cycles in cold weather. You'll hear a brief pause, maybe some hissing, then normal operation resumes. That's healthy.",
          "If you hear constant ice, repeated long stalls, or the indoor head blowing cold air for more than a few minutes, the system may be low on refrigerant or struggling with a dirty coil. Both are fixable, but both need service.",
        ],
      },
      {
        heading: "Don't forget the HRV",
        paragraphs: [
          "HRVs work hardest in winter, pulling the moist indoor air out and the cold outdoor air in. A clogged core during heating season is the fastest way to get mould on your windows and condensation on your walls.",
          "We recommend bundling an HRV clean with your annual heat pump service, ideally in late fall.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I cover my outdoor unit in winter?",
        answer:
          "No. Covers trap moisture against the unit and can cause corrosion. The coils are designed to handle weather. Just keep snow off the top.",
      },
      {
        question: "My heat pump runs almost constantly. Is that normal in winter?",
        answer:
          "Mostly yes. Modern inverter-driven heat pumps run long, low-output cycles instead of short bursts. It's more efficient than the old on/off pattern. Constant cold air blowing, though, is not normal.",
      },
      {
        question: "When should I book a winter service?",
        answer:
          "Call us at the first sign of reduced heat, ice buildup, strange noises, or error codes. Waiting through a cold snap usually turns a service call into a repair call.",
      },
    ],
  },

  {
    slug: "diy-vs-professional-cleaning",
    title: "DIY vs. professional heat pump cleaning: what's the difference?",
    metaTitle: "DIY vs. Professional Heat Pump Cleaning | GreenPump Care",
    metaDescription:
      "Filter rinsing is a good habit, but it's only 20% of the job. Here's what a professional deep clean covers. And what's beyond the reach of a vacuum and a cloth.",
    excerpt:
      "Filter rinsing is a great start, but here's why a professional deep clean reaches where you can't.",
    deck:
      "Rinsing your filters is a good monthly habit. It's also the easiest 20% of the job. Here's what a pro clean adds.",
    category: "Education",
    date: "2026-03-26",
    readTime: "5 min read",
    keywords: [
      "DIY heat pump cleaning",
      "heat pump professional cleaning",
      "mini-split deep clean vs filter rinse",
    ],
    body: [
      {
        heading: "What you can do yourself",
        paragraphs: [
          "Pop the cover, pull the filters, rinse them in warm soapy water, let them air-dry, reinstall. That's roughly 10 minutes and should happen every 1 to 2 months.",
          "You can also vacuum the outside grill, wipe visible dust from the louvers, and clear leaves and debris from around the outdoor condenser. All good maintenance. None of it touches the stuff that actually matters most.",
        ],
      },
      {
        heading: "What's behind the filter",
        paragraphs: [
          "Past the filter sits the evaporator coil. It's a densely-packed grid of aluminium fins that air has to pass through. Over time, dust, pet dander, and mould biofilm coat every fin. And there's no way to reach it without removing the front panel and the barrel fan.",
          "The barrel fan itself, the long cylinder that moves air across the coil, is usually worse. It spins at thousands of RPM for thousands of hours. By year two, it looks like a pipe cleaner that's been through a vacuum bag.",
        ],
      },
      {
        heading: "What a deep clean does",
        paragraphs: [
          "A professional deep clean pulls the unit apart, wraps the wall to catch runoff, applies a coil-specific cleaner to break down biofilm, rinses it through with pressurised water, removes and washes the barrel fan, flushes the drain pan and condensate line, applies an antimicrobial treatment, reassembles, and runs a full performance test.",
          "It's work that needs tools, a drop sheet, and about an hour per indoor head. It also needs practice. The panels and clips break easily on older units if you don't know the trick.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it safe to spray coil cleaner myself?",
        answer:
          "The chemical part is the small problem. The larger issue is that you can't rinse the cleaner properly without removing the fan barrel and wrapping the wall. And DIY cleaner residue attracts more dust than before.",
      },
      {
        question: "How much does a deep clean cost?",
        answer:
          "Ductless mini-splits start at $199 per head. Ducted and multi-head systems start at $349. HRV/ERV is $129.",
      },
      {
        question: "How often should I rinse my filters between pro cleans?",
        answer:
          "Every 4 to 8 weeks during the heating and cooling seasons. Quick rinse, full dry, put them back.",
      },
    ],
  },

  {
    slug: "why-heat-pump-smells",
    title: "Why does my heat pump smell bad? (and how to fix it)",
    metaTitle: "Why Does My Heat Pump Smell? Causes and Fixes | GreenPump Care",
    metaDescription:
      "Musty, sour, or 'dirty sock' smells from your heat pump usually mean mould on the coil. Here's what's causing it and how a deep clean fixes it for good.",
    excerpt:
      "Musty, sour, or 'dirty sock' smells almost always point to one thing. And it's not your filter.",
    deck:
      "The most common call we get: 'It smells like a gym bag when it kicks on.' Here's what's happening.",
    category: "Troubleshooting",
    date: "2026-03-18",
    readTime: "4 min read",
    keywords: [
      "heat pump smells bad",
      "mini-split musty smell",
      "dirty sock syndrome heat pump",
      "mouldy heat pump smell",
    ],
    body: [
      {
        heading: "The 'dirty sock' smell, explained",
        paragraphs: [
          "When a heat pump sits idle in cooling mode, moisture collects on the coil. That moisture plus warm air plus dust creates the perfect environment for microbial growth. The industry actually calls it 'dirty sock syndrome'. It smells exactly like it sounds.",
          "The smell hits hardest when the unit first kicks on because the initial burst of airflow blows accumulated spores out into the room. Five minutes later it fades. That's not the problem clearing. That's your nose adjusting.",
        ],
      },
      {
        heading: "Why filters don't fix it",
        paragraphs: [
          "Filters catch dust before it reaches the coil. They don't kill mould that's already growing past them. You can replace filters every month forever and the smell will still be there because the source is the coil, the drain pan, and the fan barrel.",
          "Those three parts need disassembly. There is no other way.",
        ],
      },
      {
        heading: "How a deep clean fixes it",
        paragraphs: [
          "We remove the front panel, filters, barrel fan, and drain pan. The coil gets a dedicated coil cleaner that breaks down biofilm and kills the microbes living in it. The barrel fan gets washed separately. The drain pan and condensate line get flushed with an enzymatic cleaner that chews through the slime.",
          "Finish with an antimicrobial treatment, reassemble, run the system, and the smell is gone. Usually for the next 12 months.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use a DIY coil cleaner spray?",
        answer:
          "Consumer sprays break down some biofilm but leave residue behind. Residue attracts dust, which turns back into biofilm in weeks. You end up smelling worse than you started.",
      },
      {
        question: "Does running the fan-only mode help?",
        answer:
          "A little. It dries the coil after cooling. Doesn't kill existing mould, but prevents new growth between professional cleans.",
      },
      {
        question: "Is a smelly heat pump a health issue?",
        answer:
          "For most people it's an annoyance. For anyone with asthma, allergies, or immune sensitivity, airborne mould spores are genuinely a problem.",
      },
    ],
  },

  {
    slug: "mould-in-heat-pump",
    title: "Mould in your heat pump: signs, risks, and what to do",
    metaTitle: "Mould in Heat Pump: Signs and Solutions | GreenPump Care Halifax",
    metaDescription:
      "Mould in a heat pump is more common than most Halifax homeowners realize. Here are the signs, the health risks, and what a professional deep clean actually removes.",
    excerpt:
      "Mould grows in heat pumps faster than you'd think. Here are the signs and what to do about it.",
    deck:
      "A dark, humid, rarely-inspected space with a steady supply of dust. Heat pump coils might as well be designed for mould.",
    category: "Health",
    date: "2026-03-12",
    readTime: "5 min read",
    keywords: [
      "mould in heat pump",
      "mouldy mini-split",
      "black mould heat pump",
      "heat pump mould health risks",
    ],
    body: [
      {
        heading: "How mould ends up in a heat pump",
        paragraphs: [
          "The coil and drain pan stay damp through the cooling season. Dust and organic matter land on them continuously. Temperature is mild. That's three of the four things mould needs. The fourth is time, and time happens whether you want it to or not.",
          "Halifax's humidity and proximity to the ocean accelerate the process. We see visible mould growth on heat pumps as young as 18 months old in homes near the harbour.",
        ],
      },
      {
        heading: "Signs you probably have mould",
        paragraphs: [
          "Black or dark-grey streaks on the louvers. Musty smell on startup. Visible dust that feels slightly wet to the touch. Allergic symptoms that flare up when the system is running. Increased humidity in the room despite the heat pump running.",
          "If any of those apply, don't wait. Mould spores become airborne every time the fan kicks on.",
        ],
      },
      {
        heading: "What removes it",
        paragraphs: [
          "Surface-cleaning the visible mould does nothing. It's growing inside the coil. The only way to reach it is a full disassembly, coil-specific cleaner that kills and breaks down the biofilm, a thorough rinse, and an antimicrobial treatment to prevent regrowth.",
          "We do this routinely, every day. What surprises homeowners most is how much comes out. The runoff from an uncleaned coil looks like strong tea.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the mould in my heat pump 'black mould'?",
        answer:
          "Usually no. Most heat pump mould is common environmental mould (cladosporium, penicillium) rather than the toxic stachybotrys. All of it should still be removed. Spores are spores.",
      },
      {
        question: "Will cleaning fix it permanently?",
        answer:
          "It resets the clock. With annual deep cleans, the antimicrobial holds up well and mould stays away. Miss a year and it'll come back.",
      },
      {
        question: "Can I install a UV light to stop mould?",
        answer:
          "UV can help in some ducted systems but isn't effective in most ductless mini-splits because of geometry. Cleaning is the reliable answer.",
      },
    ],
  },

  {
    slug: "heat-pump-cleaning-cost-halifax",
    title: "Heat pump cleaning cost in Halifax: what to expect",
    metaTitle: "Heat Pump Cleaning Cost Halifax | Transparent Pricing | GreenPump Care",
    metaDescription:
      "Heat pump cleaning in Halifax ranges from $129 for HRV/ERV to $349 for ducted systems. Here's a full breakdown of what you'll pay and what's included.",
    excerpt:
      "A straight-up breakdown of what heat pump cleaning costs in Halifax. And what should be included at every price point.",
    deck:
      "No estimates, no gotchas. Here's what cleaning costs in Halifax today, by system type.",
    category: "Pricing",
    date: "2026-03-05",
    readTime: "5 min read",
    keywords: [
      "heat pump cleaning cost Halifax",
      "mini-split cleaning price",
      "ducted system cleaning cost",
      "HRV cleaning price Halifax",
    ],
    body: [
      {
        heading: "Ductless mini-split",
        paragraphs: [
          "A single-head ductless unit is $199 for a full deep clean. That's complete disassembly, coil wash, barrel fan clean, drain pan flush, antimicrobial treatment, and before/after photos.",
          "Multi-head systems are priced per head. A three-head system is three times the labour. No way around that.",
        ],
      },
      {
        heading: "Ducted heat pump",
        paragraphs: [
          "A full ducted system deep clean is $349 and takes 2 to 3 hours. That covers the air handler, evaporator coil, blower assembly, drain pan, condensate line, filter replacement, and a full performance test.",
          "Duct cleaning itself is a separate service and we don't include it in the deep clean. It's a different scope.",
        ],
      },
      {
        heading: "HRV / ERV",
        paragraphs: [
          "HRV/ERV cleaning is $129. Core removal, core wash, drain line clear, filter assessment and replacement, airflow balance check.",
          "If you book it together with your heat pump clean, the bundle is $299. $29 less than booking them separately.",
        ],
      },
      {
        heading: "Care Plans vs. one-off",
        paragraphs: [
          "If you plan to clean annually anyway, a Care Plan beats paying per-visit. Plans start at $15/month for HRV-only, $22/month for a single ductless head, or $35/month for a ducted system. All plans include scheduled cleanings, priority booking, and 10 to 20% off any additional service calls.",
          "Cancel any time. There's no contract.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are there any hidden fees?",
        answer:
          "No. Prices above are before HST. Travel surcharges only apply outside Halifax Regional Municipality, and we quote that upfront.",
      },
      {
        question: "Do you offer free estimates?",
        answer:
          "For standard heat pumps, yes. Pricing is public and fixed. For complex setups or unusual systems, we'll do a free virtual estimate by photo.",
      },
      {
        question: "What if the unit is in really bad shape?",
        answer:
          "Price doesn't change. The stated price covers the clean regardless of how dirty the unit is when we open it.",
      },
    ],
  },

  {
    slug: "heat-pump-cleaning-warranty",
    title: "Does cleaning my heat pump void the warranty?",
    metaTitle: "Heat Pump Cleaning and Warranty | GreenPump Care Halifax",
    metaDescription:
      "Professional cleaning doesn't void your heat pump warranty. It keeps it valid. Here's what the major brands actually require and how to document your service.",
    excerpt:
      "Professional cleaning doesn't void your warranty. In most cases, it's required to keep it valid.",
    deck:
      "There's a persistent myth that touching your heat pump voids the warranty. The truth is nearly the opposite.",
    category: "Education",
    date: "2026-02-26",
    readTime: "4 min read",
    keywords: [
      "heat pump warranty cleaning",
      "Mitsubishi heat pump warranty maintenance",
      "Daikin warranty cleaning requirement",
    ],
    body: [
      {
        heading: "What the major manufacturers require",
        paragraphs: [
          "Mitsubishi, Daikin, Fujitsu, LG, Carrier, and Lennox all require annual professional maintenance to keep warranties valid. It's in every owner's manual, usually a paragraph or two into the 'Warranty' section.",
          "'Professional' is the operative word. They expect a licensed technician, a service record, and documented proof. DIY rinsing doesn't count for warranty claims even if it physically cleans the system.",
        ],
      },
      {
        heading: "What the warranty actually covers",
        paragraphs: [
          "Compressor warranties tend to be the longest. 10 years is common. Parts are usually 5 to 7 years. Labour is often 1 to 2 years unless you bought an extended plan.",
          "When a compressor fails at year 8 and the manufacturer asks for maintenance records, a homeowner with no paperwork is out of luck. We've seen it happen.",
        ],
      },
      {
        heading: "How we document it",
        paragraphs: [
          "Every GreenPump Care service ends with a digital service report: date, technician, system model and serial number, service performed, and before/after photos. Keep it with your warranty paperwork.",
          "If you ever need to file a claim, the manufacturer will ask for exactly that.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I have to use the installer for warranty maintenance?",
        answer:
          "No. Any licensed HVAC technician qualifies. We maintain systems installed by every major contractor in Halifax.",
      },
      {
        question: "What if I skipped a year?",
        answer:
          "Don't panic. Book the clean now and get back on schedule. Manufacturers don't void warranties retroactively. They want to see a current, documented maintenance history at the time of a claim.",
      },
      {
        question: "Does changing filters count?",
        answer:
          "For most manufacturers, no. They specifically require professional cleaning of coils and components, not just filter changes.",
      },
    ],
  },

  {
    slug: "what-to-expect-deep-clean",
    title: "What to expect during a professional heat pump deep clean",
    metaTitle: "What to Expect During a Heat Pump Deep Clean | GreenPump Care",
    metaDescription:
      "A step-by-step walk-through of a professional heat pump deep clean. What we do, how long it takes, what you'll need to do, and what the before/after looks like.",
    excerpt:
      "A walk-through of exactly what happens during a deep clean. Start to finish.",
    deck:
      "First-time bookings sometimes ask what actually happens when a technician shows up. Here's the full sequence.",
    category: "Education",
    date: "2026-02-19",
    readTime: "6 min read",
    keywords: [
      "what to expect heat pump cleaning",
      "heat pump deep clean process",
      "professional heat pump cleaning steps",
    ],
    body: [
      {
        heading: "Before we arrive",
        paragraphs: [
          "Clear a space around the indoor unit. Roughly 3 feet below the head and 2 feet to either side. We'll bring a drop sheet and wall protection, but less clutter means less to move.",
          "If your system is on a high wall, let us know at booking. We bring our own ladders but sometimes need to know if a specific setup requires an extension.",
        ],
      },
      {
        heading: "On-site setup",
        paragraphs: [
          "Our technician greets you, confirms the system, and walks you through what they're going to do. You can stay in the room, watch the whole thing, or go about your day. Whichever.",
          "We lay down protective sheets, tape up the wall around the head, and position our rinse-catch setup. Takes about ten minutes.",
        ],
      },
      {
        heading: "The actual clean",
        paragraphs: [
          "Panel off. Filters out. Barrel fan removed (this is often where people are surprised. The fan comes completely out). Coil-specific cleaner applied, left to work for a few minutes, then rinsed with pressurised water until it runs clean.",
          "The barrel fan gets scrubbed separately. Drain pan and condensate line get flushed with an enzymatic cleaner. Antimicrobial treatment applied. Everything dries, then reassembly.",
          "Total active work: 60 to 90 minutes per head for ductless. 2 to 3 hours for ducted systems.",
        ],
      },
      {
        heading: "Before we leave",
        paragraphs: [
          "We run the system through a full cycle, heat, cool, fan-only, and verify airflow, temperature differential, and drainage. Before and after photos go in your service report.",
          "You get the digital report by email within the hour. It includes the work performed, readings, and the photos. Keep it with your warranty records.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need to be home the whole time?",
        answer:
          "No. Most customers let us in, then get back to their day. We'll text when we're 30 minutes out and again when we finish.",
      },
      {
        question: "Will it be messy?",
        answer:
          "Our wall-wrap and drop-sheet setup catches everything. We leave the space cleaner than we found it. Literally.",
      },
      {
        question: "Will my heat pump work better immediately?",
        answer:
          "Yes, noticeably. Quieter airflow, faster temperature recovery, and the stale smell. Gone within the first few minutes of operation.",
      },
    ],
  },

  {
    slug: "dirty-heat-pump-energy-bill",
    title: "How a dirty heat pump raises your energy bill",
    metaTitle: "How a Dirty Heat Pump Raises Your Energy Bill | GreenPump Care",
    metaDescription:
      "A dirty heat pump can cost you 10-25% more in electricity. Here's the math on why, and how a deep clean pays for itself in a single winter.",
    excerpt:
      "A dirty heat pump can cost you 10-25% more in electricity. Here's the math.",
    deck:
      "Most efficiency losses in a heat pump aren't dramatic. They're quiet. Which is exactly what makes them expensive.",
    category: "Efficiency",
    date: "2026-02-12",
    readTime: "5 min read",
    keywords: [
      "dirty heat pump energy bill",
      "heat pump efficiency loss",
      "heat pump electricity cost",
    ],
    body: [
      {
        heading: "Why dirty = less efficient",
        paragraphs: [
          "A heat pump moves heat by forcing air across a coil. When the coil is dusty or coated in biofilm, two things happen: the surface area drops, and the insulating layer slows heat transfer. The system compensates by running longer, which means more compressor hours, which means more electricity.",
          "Energy audits typically measure 10 to 25% efficiency loss in an uncleaned system. The exact number depends on how bad the buildup is.",
        ],
      },
      {
        heading: "What that costs in dollars",
        paragraphs: [
          "A typical Halifax home with a heat pump uses about $1,800 to $2,400 a year in electricity for heating and cooling. A 15% efficiency loss translates to $270 to $360 a year. That's every year it stays dirty.",
          "A $199 annual cleaning pays for itself in energy savings alone, before you count the warranty protection or the longer compressor life.",
        ],
      },
      {
        heading: "Why you don't notice until it's severe",
        paragraphs: [
          "Efficiency loss is gradual. A 2% drop month over month feels like nothing. But over three years, it adds up to 70% of what it used to deliver. Most homeowners adjust to it unconsciously, turning the thermostat up a degree at a time.",
          "The wake-up call is usually a surprise winter bill, a system that can't keep up on a cold night, or a compressor failure.",
        ],
      },
    ],
    faqs: [
      {
        question: "How can I measure my own efficiency loss?",
        answer:
          "Compare last winter's bill to this winter's, adjusted for weather. If it's up more than 10% with similar outdoor temperatures, cleaning is likely to help.",
      },
      {
        question: "Will a clean heat pump really pay for itself?",
        answer:
          "In a typical Halifax home, yes. The electricity savings usually cover the cost of the annual clean in the first 6 to 8 months.",
      },
      {
        question: "What else affects heat pump efficiency?",
        answer:
          "Refrigerant charge, filter condition, outdoor unit clearance, and thermostat setpoints all matter. Cleaning addresses the biggest lever.",
      },
    ],
  },

  {
    slug: "ductless-vs-ducted",
    title: "Ductless vs. ducted heat pumps: which suits your home?",
    metaTitle: "Ductless vs. Ducted Heat Pump: Comparison | GreenPump Care Halifax",
    metaDescription:
      "Ductless mini-splits vs. ducted heat pumps. A Halifax homeowner's guide to picking the right system, with real-world pros and cons from people who clean both every week.",
    excerpt:
      "Picking between ductless and ducted comes down to your home's layout, your budget, and how you actually live in it.",
    deck:
      "We clean both every week. Here are the honest tradeoffs nobody tells you at the sales pitch.",
    category: "Education",
    date: "2026-02-05",
    readTime: "6 min read",
    keywords: [
      "ductless vs ducted heat pump",
      "mini-split vs ducted system",
      "best heat pump for Halifax home",
    ],
    body: [
      {
        heading: "Ductless mini-splits",
        paragraphs: [
          "One outdoor unit feeds one or more wall-mounted indoor heads. Installation is lower-cost, zoning is excellent, and efficiency is typically higher because you can heat/cool only the rooms you're using.",
          "Downsides: the heads are visible, they need regular cleaning (every head separately), and temperature balance between rooms isn't automatic. You set each zone manually.",
        ],
      },
      {
        heading: "Ducted systems",
        paragraphs: [
          "One air handler distributes heat and cool through existing ductwork, usually in a basement or attic. Totally hidden inside the living space, even temperature throughout, and a single unit to maintain.",
          "Downsides: only works well if the home already has good ductwork, efficiency is lower than ductless, and the entire system runs together. No easy zoning.",
        ],
      },
      {
        heading: "Which one fits your home",
        paragraphs: [
          "Older Halifax homes (pre-1980s) usually don't have ductwork, and retrofitting is prohibitive. Ductless is almost always the answer there.",
          "Newer builds or mid-century homes with existing HVAC ducts can go either way. If you prioritize invisible installation and even temperatures, ducted wins. If you prioritize efficiency and zone control, ductless wins.",
          "Many customers end up with a hybrid: a ducted system for the main living area and a ductless head for a finished basement or addition.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which is cheaper to clean?",
        answer:
          "Per visit, ductless ($199/head) is cheaper than ducted ($349). But a three-head ductless system ($597) is more than one ducted unit.",
      },
      {
        question: "Which is more efficient?",
        answer:
          "Ductless, typically by 15 to 25%. No duct losses, and you're only heating the rooms you use.",
      },
      {
        question: "Which breaks down more often?",
        answer:
          "Roughly equivalent, assuming both are maintained. Neglected ductless heads fail slightly more often because mould and biofilm affect smaller components.",
      },
    ],
  },

  {
    slug: "hrv-vs-erv",
    title: "HRV vs. ERV: which is better for Nova Scotia homes?",
    metaTitle: "HRV vs. ERV for Nova Scotia Homes | GreenPump Care Halifax",
    metaDescription:
      "HRV or ERV in Nova Scotia? HRVs handle our cold winters well; ERVs manage summer humidity better. Here's how to pick. And why both need annual cleaning.",
    excerpt:
      "HRVs suit Nova Scotia's cold winters. ERVs handle summer humidity better. Here's how to decide.",
    deck:
      "Same purpose, slightly different approach. In a coastal climate like Halifax, the distinction matters more than you'd think.",
    category: "HRV/ERV",
    date: "2026-01-29",
    readTime: "5 min read",
    keywords: [
      "HRV vs ERV Nova Scotia",
      "air exchanger Halifax",
      "energy recovery ventilator",
      "heat recovery ventilator",
    ],
    body: [
      {
        heading: "What they do",
        paragraphs: [
          "Both HRVs and ERVs bring fresh outdoor air into your home while exhausting stale indoor air. Both recover heat from the exhaust stream so you're not losing the warmth you paid for. The difference is what happens to moisture.",
          "HRVs (heat recovery ventilators) transfer heat only. ERVs (energy recovery ventilators) transfer heat AND moisture. The incoming fresh air picks up some of the moisture from the outgoing stale air.",
        ],
      },
      {
        heading: "Why HRV wins most Halifax homes",
        paragraphs: [
          "Nova Scotia winters are long, cold, and mostly dry. Indoor humidity gets too high from cooking, showers, and breathing. An HRV pulls that moisture out along with the stale air, helping prevent window condensation and mould.",
          "For most Halifax homes, HRV is the right answer.",
        ],
      },
      {
        heading: "When ERV makes sense",
        paragraphs: [
          "If your home is extremely well-sealed and runs dry in winter (bloody noses, static shocks, cracking wood floors), an ERV can retain enough moisture to be comfortable. Summer humidity management is also easier with an ERV because it sheds some of the incoming humidity before it enters the house.",
          "In practice, ERVs are more common in new builds with high-performance envelopes. Older Halifax homes rarely need them.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I convert an HRV to an ERV?",
        answer:
          "Not directly. The cores are different. But you can often swap the core if your unit's manufacturer offers an ERV core for the same chassis.",
      },
      {
        question: "Do both need cleaning at the same interval?",
        answer:
          "Yes. Annual deep cleaning for both. The core design differs but the maintenance is essentially identical.",
      },
      {
        question: "What does each cost to clean?",
        answer:
          "$129 for either system. HRV and ERV clean the same from a service standpoint.",
      },
    ],
  },
];
