import {
  Droplets,
  Wind,
  AirVent,
  Package,
  Clock,
  Camera,
  Leaf,
  ShieldCheck,
  CalendarClock,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  Wind,
  AirVent,
  Package,
  Clock,
  Camera,
  Leaf,
  ShieldCheck,
  CalendarClock,
  Wrench,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Wrench;
}
