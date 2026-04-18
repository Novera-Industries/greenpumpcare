"use client";

import { Shield, Star, Leaf, Award } from "lucide-react";
import { StaggerContainer } from "@/components/ui/StaggerContainer";
import { StaggerItem } from "@/components/ui/StaggerItem";
import { COMPANY } from "@/lib/constants";

const badges = [
  {
    icon: Shield,
    label: `BBB ${COMPANY.bbbRating}-rated`,
    color: "text-bbb",
  },
  {
    icon: Star,
    label: `${COMPANY.googleRating} stars (${COMPANY.googleReviewCount} reviews)`,
    color: "text-star",
  },
  {
    icon: Leaf,
    label: "Eco-friendly products",
    color: "text-leaf",
  },
  {
    icon: Award,
    label: "Licensed & Insured",
    color: "text-primary",
  },
];

export function TrustBadges() {
  return (
    <div className="section-sm bg-bg-light">
      <div className="container">
        <StaggerContainer className="flex flex-wrap justify-center gap-4">
          {badges.map((badge) => (
            <StaggerItem key={badge.label}>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-pill shadow-card text-sm font-medium text-text">
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                {badge.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
