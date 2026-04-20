import type { Metadata } from "next";
import { Work_Sans, Inter } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyPhoneCTA } from "@/components/layout/StickyPhoneCTA";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BookingModal } from "@/components/sections/BookingModal";
import { ChatBubble } from "@/components/layout/ChatBubble";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Heat Pump Cleaning Halifax | GreenPump Care. Deep Clean Specialists",
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Halifax's dedicated heat pump cleaning company. Complete disassembly deep cleans for ductless, ducted, multi-head & HRV/ERV systems. Eco-friendly products. From $129. Book online 24/7.",
  keywords: [
    "heat pump cleaning Halifax",
    "heat pump deep clean",
    "ductless mini-split cleaning",
    "ducted heat pump cleaning",
    "HRV cleaning Halifax",
    "best heat pump cleaning company",
    "HVAC cleaning Halifax",
    "eco-friendly heat pump cleaning",
    "heat pump maintenance Nova Scotia",
  ],
  metadataBase: new URL(COMPANY.website),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Heat Pump Cleaning Halifax | GreenPump Care",
    description:
      "Halifax's dedicated heat pump cleaning company. Complete disassembly deep cleans from $129. Eco-friendly products. Book online 24/7.",
    siteName: COMPANY.name,
    locale: "en_CA",
    type: "website",
    url: COMPANY.website,
    images: [{ url: `${COMPANY.website}/images/og-image.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heat Pump Cleaning Halifax | GreenPump Care",
    description:
      "Halifax's dedicated heat pump cleaning company. Complete disassembly deep cleans from $129. Eco-friendly. Book online 24/7.",
    images: [`${COMPANY.website}/images/og-image.jpg`],
  },
  other: {
    "geo.region": "CA-NS",
    "geo.placename": "Halifax",
    "geo.position": "44.6605;-63.6083",
    ICBM: "44.6605, -63.6083",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyPhoneCTA />
        <LocalBusinessSchema />
        <FAQSchema />
        <BookingModal />
        <ChatBubble />
        <Script
          id="housecall-pro-chat-bubble"
          src="https://chat.housecallpro.com/proChat.js"
          strategy="afterInteractive"
          data-color="#09A47A"
          data-organization="68da54a6-10d0-473f-b040-00c32a597360"
        />
      </body>
    </html>
  );
}
