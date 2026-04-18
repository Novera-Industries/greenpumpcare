import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact GreenPump Care | Heat Pump Cleaning Halifax NS",
  description:
    "Contact GreenPump Care at (782) 830-5900 or info@greenpumpcare.com. 3600 Kempt Rd 212, Halifax, NS B3K 4X8. Open Mon-Fri 8am-8pm, Sat 10am-5pm. Book online anytime.",
  slug: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
