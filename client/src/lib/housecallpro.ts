export const HCP_TOKEN = "e4455f1737a54ebdb8d82f85e1a4c04d";
export const HCP_ORG_NAME = "GreenPump-Care-Inc";

export const HCP_PORTAL_TOKEN = "8ce41dc13cbe4508b6bc16f0db748a5c";
export const HCP_PORTAL_URL = `https://client.housecallpro.com/customer_portal/request-link?token=${HCP_PORTAL_TOKEN}`;

export const BOOKING_MODAL_EVENT = "greenpump:open-booking-modal";

export function openBookingModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BOOKING_MODAL_EVENT));
}
