"use client";

import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { openBookingModal } from "@/lib/housecallpro";
import { COMPANY } from "@/lib/constants";

export function ArticleActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button onClick={openBookingModal} size="md">
        Book online
        <ArrowRight className="w-4 h-4" />
      </Button>
      <Button href={COMPANY.phoneHref} variant="secondary" size="md">
        <Phone className="w-4 h-4" />
        {COMPANY.phone}
      </Button>
    </div>
  );
}
