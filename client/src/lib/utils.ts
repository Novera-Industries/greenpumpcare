import { clsx, type ClassValue } from "clsx";

/** Merge tailwind classes with clsx */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Format price as "$199" */
export function formatPrice(price: number): string {
  return `$${price}`;
}

/** Format phone for display */
export function formatPhone(phone: string): string {
  return phone;
}
