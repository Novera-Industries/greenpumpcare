import { Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { MobileMarquee } from "@/components/ui/MobileMarquee";

const SYSTEMS = [
  {
    name: "Ductless Mini-Split",
    icon: "💧",
    items: [
      "Full disassembly of indoor unit (panels, filters, louvers)",
      "High-pressure evaporator coil wash",
      "Barrel fan deep clean",
      "Eco-friendly antimicrobial treatment",
      "Drain pan flush and condensate line clearing",
      "Outdoor unit visual inspection",
      "Before and after photo documentation",
      "Written service report",
    ],
  },
  {
    name: "HRV/ERV",
    icon: "🌬️",
    items: [
      "Heat exchange core removal and deep cleaning",
      "Filter assessment and replacement recommendation",
      "Condensate drain and pan flush",
      "Airflow balance check (supply vs. exhaust)",
      "Performance verification and testing",
      "Written performance report",
    ],
  },
  {
    name: "Ducted Heat Pump",
    icon: "🔧",
    items: [
      "Evaporator coil deep clean",
      "Blower assembly cleaning",
      "Drain pan sanitation",
      "Standard filter replacement included",
      "Electrical connection inspection",
      "Thermostat calibration",
      "Full system performance test",
      "Before and after photo documentation",
      "Written service report",
    ],
  },
];

export function DeepCleanDetails() {
  return (
    <AnimatedSection className="section bg-bg-light">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-text mb-3 tracking-tight">
            What&apos;s included in every deep clean
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Every care plan service is a full professional deep clean. Not a filter rinse. Here&apos;s exactly what we do.
          </p>
        </div>

        {/* Desktop: stagger grid */}
        <StaggerContainer className="hidden md:grid grid-cols-3 gap-6">
          {SYSTEMS.map((system) => (
            <StaggerItem key={system.name}>
              <SystemCard system={system} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile: forward marquee */}
        <MobileMarquee speed={56} itemClassName="w-[290px] shrink-0 flex">
          {SYSTEMS.map((system) => (
            <SystemCard key={system.name} system={system} />
          ))}
        </MobileMarquee>
      </div>
    </AnimatedSection>
  );
}

function SystemCard({ system }: { system: (typeof SYSTEMS)[number] }) {
  return (
    <div className="bg-white rounded-card shadow-card p-7 h-full w-full flex flex-col text-center md:text-left">
      <div className="text-3xl mb-3">{system.icon}</div>
      <h3 className="font-heading text-lg font-semibold text-text mb-5">
        {system.name}
      </h3>
      <ul className="space-y-2.5 flex-1">
        {system.items.map((item) => (
          <li
            key={item}
            className="flex items-start justify-center md:justify-start text-left gap-2.5 text-sm text-gray-700"
          >
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
