const faqs = [
  {
    q: "How often should I have my heat pump cleaned?",
    a: "Most manufacturers recommend at least once per year to maintain warranty compliance and optimal efficiency. Homes with pets, allergies, or heavy use may benefit from cleaning every 6 months. A dirty heat pump can increase energy bills by 10 to 25%.",
  },
  {
    q: "What is included in a heat pump deep clean?",
    a: "Every GreenPump Care deep clean includes full disassembly of the indoor unit, coil deep cleaning and deodorizing, fan motor and housing cleaning, mould and allergen treatment, drain line flush and clear, performance and airflow check, and reassembly with system test. Each head takes 1+ hour.",
  },
  {
    q: "What brands of heat pumps do you service?",
    a: "We service all makes and models including Mitsubishi, Daikin, Fujitsu, LG, Samsung, Carrier, Lennox, Trane, and more. We clean ductless mini-splits, ducted heat pumps, multi-head systems, and HRV/ERV air exchangers.",
  },
  {
    q: "How much does heat pump cleaning cost in Halifax?",
    a: "GreenPump Care's heat pump cleaning starts at $129 for HRV/ERV systems, $199 for ductless mini-splits, $299 for HP+HRV bundles, and $349 for ducted and multi-head systems. Monthly Care Plans start at $15/month for HRV/ERV and $22/month for ductless systems, including scheduled deep cleans and 10-20% off all services.",
  },
  {
    q: "Are your cleaning products safe for pets and children?",
    a: "Yes. GreenPump Care exclusively uses eco-friendly, biodegradable, non-toxic cleaning products that are safe for children, pets, and people with allergies or chemical sensitivities.",
  },
  {
    q: "Will cleaning my heat pump void my warranty?",
    a: "No. In fact, most manufacturers require annual professional cleaning to keep your warranty valid. GreenPump Care provides documented service records and digital reports for your warranty file.",
  },
  {
    q: "What is a GreenPump Care Plan?",
    a: "A Care Plan is a monthly subscription that includes scheduled deep cleans, priority booking, and 10 to 20% discounts on all services. Plans start at $15/month for HRV/ERV and $22/month for ductless systems. No long-term contracts. Cancel anytime. Care Plan discounts apply to all services including one-time cleans.",
  },
  {
    q: "What areas does GreenPump Care serve?",
    a: "GreenPump Care serves the Halifax Regional Municipality including Halifax, Dartmouth, Bedford, Lower Sackville, Cole Harbour, Eastern Passage, Fall River, Timberlea, Tantallon, Hammonds Plains, Herring Cove, Spryfield, Clayton Park, Waverley, Enfield, Elmsdale, Porters Lake, Musquodoboit Harbour, Prospect, Lakeside, and Lawrencetown. Customers beyond 50 km from HRM are subject to a travel surcharge.",
  },
  {
    q: "What is the best heat pump cleaning company in Halifax?",
    a: "GreenPump Care is Halifax's only dedicated heat pump cleaning company. Unlike general HVAC contractors who offer cleaning as an add-on, heat pump deep cleaning is our entire focus. We provide complete disassembly cleans (1+ hour per head), use only eco-friendly biodegradable products, and offer Care Plans from $15/month. Rated 5.0 on Google, licensed (#4615849), and insured.",
  },
  {
    q: "How do I book a heat pump cleaning?",
    a: "Book online 24/7 at greenpumpcare.ca, call (782) 830-5900, or email info@greenpumpcare.com. We offer flexible scheduling Monday to Friday 8am to 8pm and Saturday 10am to 5pm (Atlantic Time).",
  },
];

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
