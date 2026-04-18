export const HCP_TOKEN = "e4455f1737a54ebdb8d82f85e1a4c04d";
export const HCP_ORG_NAME = "GreenPump-Care-Inc";
export const HCP_SCRIPT_SRC = `https://online-booking.housecallpro.com/script.js?token=${HCP_TOKEN}&orgName=${HCP_ORG_NAME}`;

export const HCP_PORTAL_TOKEN = "8ce41dc13cbe4508b6bc16f0db748a5c";
export const HCP_PORTAL_URL = `https://client.housecallpro.com/customer_portal/request-link?token=${HCP_PORTAL_TOKEN}`;

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}

export function openBookingModal() {
  if (typeof window !== "undefined" && window.HCPWidget?.openModal) {
    window.HCPWidget.openModal();
  }
}
