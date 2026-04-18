import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { CarePlans } from "@/components/sections/CarePlans";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingCTA } from "@/components/sections/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <ProcessTimeline />
      <BeforeAfterSlider />
      <CarePlans />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
