"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BOOKING_MODAL_EVENT } from "@/lib/housecallpro";
import {
  DUCTLESS_ONETIME_PRICING,
  DUCTLESS_EXTRA_HEAD_PRICE,
  ductlessOneTimePrice,
  COMPANY,
} from "@/lib/constants";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  requiresHeadCount?: boolean;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "ductless",
    name: "Ductless mini-split deep clean",
    description: "Complete disassembly, coil wash, antimicrobial treatment.",
    basePrice: 199,
    requiresHeadCount: true,
  },
  {
    id: "ducted",
    name: "Ducted system deep clean",
    description: "Full ducted system service with coil and component cleaning.",
    basePrice: 349,
  },
  {
    id: "hrv",
    name: "HRV/ERV cleaning",
    description: "Core, filters, and ductwork. Premium HRV service.",
    basePrice: 129,
  },
  {
    id: "bundle-mini-hrv",
    name: "Mini-split + HRV bundle",
    description: "Ductless mini-split deep clean + HRV/ERV cleaning in one visit.",
    basePrice: 299,
  },
  {
    id: "bundle-ducted-hrv",
    name: "Ducted + HRV bundle",
    description: "Ducted system deep clean + HRV/ERV cleaning in one visit.",
    basePrice: 449,
  },
  {
    id: "bundle-ducted-head",
    name: "Ducted + 1 ductless head bundle",
    description: "Ducted system deep clean + one ductless head cleaned in the same visit.",
    basePrice: 499,
  },
];

const HEAD_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const INITIAL_FORM = {
  serviceId: "ductless",
  headCount: 1,
  firstName: "",
  lastName: "",
  phone: "",
  street: "",
  unit: "",
  city: "",
  state: "NS",
  zip: "",
  country: "Canada",
  notes: "",
};

type FormState = typeof INITIAL_FORM;

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handler = () => {
      setForm(INITIAL_FORM);
      setStatus("idle");
      setErrorMessage("");
      setOpen(true);
    };
    window.addEventListener(BOOKING_MODAL_EVENT, handler);
    return () => window.removeEventListener(BOOKING_MODAL_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const selectedService =
    SERVICE_OPTIONS.find((s) => s.id === form.serviceId) ?? SERVICE_OPTIONS[0];

  const price =
    selectedService.requiresHeadCount && selectedService.id === "ductless"
      ? ductlessOneTimePrice(form.headCount)
      : selectedService.basePrice;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const serviceName =
      selectedService.requiresHeadCount && selectedService.id === "ductless"
        ? `${selectedService.name} — ${form.headCount} head${form.headCount > 1 ? "s" : ""}`
        : selectedService.name;

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      street: form.street,
      unit: form.unit,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
      service: {
        name: serviceName,
        description: selectedService.description,
        priceCents: price * 100,
        quantity: 1,
      },
      notes: form.notes,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data?.error || "Something went wrong. Please try again or call us."
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't reach the booking service. Please check your connection or call us."
      );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/55"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[101] flex items-start sm:items-center justify-center p-4 overflow-y-auto pointer-events-none"
          >
            <div className="w-full max-w-xl bg-white rounded-card shadow-elevated my-6 sm:my-auto pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2
                  id="booking-modal-title"
                  className="font-heading text-xl font-semibold text-text"
                >
                  Book your service
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-text hover:bg-stripe transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {status === "success" ? (
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />
                  <h3 className="font-heading text-2xl font-semibold text-text mb-3">
                    Booking request received
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
                    Thanks {form.firstName}. We&apos;ll reach out within one business
                    day to confirm your appointment time. You can also call us at{" "}
                    <a
                      href={COMPANY.phoneHref}
                      className="text-primary font-semibold hover:underline"
                    >
                      {COMPANY.phone}
                    </a>
                    .
                  </p>
                  <Button type="button" onClick={() => setOpen(false)} className="!px-8">
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Service */}
                  <Field label="Service" required>
                    <select
                      required
                      value={form.serviceId}
                      onChange={(e) => update("serviceId", e.target.value)}
                      className={inputClass}
                    >
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — from ${s.basePrice}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {selectedService.requiresHeadCount && (
                    <Field label="Number of indoor heads" required>
                      <select
                        required
                        value={form.headCount}
                        onChange={(e) =>
                          update("headCount", parseInt(e.target.value, 10))
                        }
                        className={inputClass}
                      >
                        {HEAD_COUNT_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n} head{n > 1 ? "s" : ""} — ${ductlessOneTimePrice(n)}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        ${DUCTLESS_ONETIME_PRICING[1]} base. Extra heads beyond 4 at $
                        {DUCTLESS_EXTRA_HEAD_PRICE} each.
                      </p>
                    </Field>
                  )}

                  {/* Price summary */}
                  <div className="flex items-center justify-between bg-stripe rounded-card px-4 py-3">
                    <span className="text-sm text-gray-600">Estimated price</span>
                    <span className="font-heading text-2xl font-bold text-primary">
                      ${price}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First name" required>
                      <input
                        type="text"
                        required
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Last name" required>
                      <input
                        type="text"
                        required
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  {/* Phone */}
                  <Field label="Phone number" required>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(902) 555-0123"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  {/* Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
                    <Field label="Street address" required>
                      <input
                        type="text"
                        required
                        autoComplete="address-line1"
                        value={form.street}
                        onChange={(e) => update("street", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Unit / Apt / Suite">
                      <input
                        type="text"
                        autoComplete="address-line2"
                        value={form.unit}
                        onChange={(e) => update("unit", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="City" required>
                      <input
                        type="text"
                        required
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Province / State" required>
                      <input
                        type="text"
                        required
                        autoComplete="address-level1"
                        value={form.state}
                        onChange={(e) => update("state", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Postal / ZIP code" required>
                      <input
                        type="text"
                        required
                        autoComplete="postal-code"
                        value={form.zip}
                        onChange={(e) => update("zip", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Country" required>
                      <input
                        type="text"
                        required
                        autoComplete="country-name"
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  {/* Notes */}
                  <Field label="Notes (optional)">
                    <textarea
                      rows={3}
                      placeholder="Anything we should know — preferred time, number of units, access instructions…"
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  {status === "error" && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-input p-3 text-sm text-red-700">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>Request booking</>
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, you agree to be contacted about your booking.
                    We&apos;ll never share your info.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-text mb-1.5">
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full border border-gray-200 rounded-input px-4 py-2.5 text-text text-sm bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition";
