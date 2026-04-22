"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MessageForm } from "@/components/sections/MessageForm";
import { MapPlaceholder } from "@/components/sections/MapPlaceholder";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { PageHero } from "@/components/layout/PageHero";
import { COMPANY } from "@/lib/constants";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: COMPANY.phone,
    href: COMPANY.phoneHref,
    description: "Mon to Fri 8am to 8pm, Sat 10am to 5pm",
  },
  {
    icon: Mail,
    title: "Email",
    value: COMPANY.email,
    href: COMPANY.emailHref,
    description: "We Reply Within 24 Hours",
  },
  {
    icon: MapPin,
    title: "Address",
    value: COMPANY.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(COMPANY.address.full)}`,
    description: "Halifax, Nova Scotia",
  },
  {
    icon: Clock,
    title: "Hours",
    value: COMPANY.hours.weekdays,
    description: `${COMPANY.hours.saturday} | ${COMPANY.hours.sunday}`,
  },
];

export function ContactContent() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk."
        accent="We're listening."
        subtitle={
          <>
            Send us a message, ask a question, or request a free estimate.
            <br />
            Mon to Fri 8 to 8, Sat 10 to 5.
          </>
        }
        badges={[
          { icon: Phone, label: "(782) 830-5900" },
          { icon: Clock, label: "Reply Within 24 Hours" },
          { icon: MapPin, label: "Halifax, NS" },
        ]}
      />

      {/* Form + Map */}
      <AnimatedSection className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Left: Message form */}
            <div>
              <MessageForm />
            </div>

            {/* Right: Map */}
            <div>
              <MapPlaceholder />
            </div>
          </div>

          {/* Contact info cards below — 4 col row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-6">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-card shadow-card p-5 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3"
              >
                <div className="w-10 h-10 bg-stripe rounded-full flex items-center justify-center shrink-0">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-text text-sm mb-0.5">
                    {card.title}
                  </h3>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="text-primary font-medium text-sm hover:underline block truncate"
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-text text-sm">{card.value}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-0.5">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <TrustBadges />
    </>
  );
}
