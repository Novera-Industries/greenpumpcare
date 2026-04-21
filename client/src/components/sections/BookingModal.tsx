"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Loader2, Check, Minus, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BOOKING_MODAL_EVENT } from "@/lib/housecallpro";
import {
  SYSTEM_PLAN_PRICING,
  DUCTLESS_ONETIME_PRICING,
  ductlessOneTimePrice,
  CARE_PLANS,
  COMPANY,
  type SystemType,
  type PlanTier,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type BookingMode = "onetime" | "care_plan";

interface FormFields {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
}

const INITIAL_FORM: FormFields = {
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

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<BookingMode>("onetime");
  const [systems, setSystems] = useState<Set<SystemType>>(new Set(["ductless"]));
  const [ductlessHeads, setDuctlessHeads] = useState(1);
  const [carePlanTier, setCarePlanTier] = useState<PlanTier>("Comfort");
  const [form, setForm] = useState<FormFields>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handler = () => {
      setMode("onetime");
      setSystems(new Set(["ductless"]));
      setDuctlessHeads(1);
      setCarePlanTier("Comfort");
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

  function toggleSystem(sys: SystemType) {
    setSystems((prev) => {
      const next = new Set(prev);
      if (next.has(sys)) {
        if (next.size === 1) return prev;
        next.delete(sys);
      } else {
        next.add(sys);
      }
      return next;
    });
  }

  function update<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const hasDuctless = systems.has("ductless");
  const hasHrv = systems.has("hrv");
  const hasDucted = systems.has("ducted");

  const baseDuctlessPrice = hasDuctless ? ductlessOneTimePrice(ductlessHeads) : 0;
  const baseHrvPrice = hasHrv ? SYSTEM_PLAN_PRICING.hrv.oneTimePrice : 0;
  const baseDuctedPrice = hasDucted ? SYSTEM_PLAN_PRICING.ducted.oneTimePrice : 0;
  const subtotal = baseDuctlessPrice + baseHrvPrice + baseDuctedPrice;

  let bundleName: string | null = null;
  let bundleSavings = 0;
  let ductlessPrice = baseDuctlessPrice;
  let hrvPrice = baseHrvPrice;
  const ductedPrice = baseDuctedPrice;

  if (hasDuctless && hasDucted) {
    bundleName = "Ducted + ductless bundle";
    bundleSavings = 49;
    ductlessPrice = Math.max(0, baseDuctlessPrice - bundleSavings);
  } else if (hasHrv && (hasDuctless || hasDucted)) {
    bundleName = hasDuctless ? "Mini-split + HRV bundle" : "Ducted + HRV bundle";
    bundleSavings = 29;
    hrvPrice = Math.max(0, baseHrvPrice - bundleSavings);
  }

  const total = ductlessPrice + hrvPrice + ductedPrice;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const services: Array<{
      name: string;
      description: string;
      priceCents: number;
      quantity: number;
    }> = [];

    if (mode === "care_plan") {
      const plan = CARE_PLANS.find((p) => p.name === carePlanTier);
      services.push({
        name: `Care Plan inquiry — ${carePlanTier} ($${plan?.monthlyPrice ?? 0}/mo)`,
        description:
          plan?.description ??
          "Customer is interested in a Care Plan subscription. Reach out to build a custom solution.",
        priceCents: 0,
        quantity: 1,
      });
    } else {
      if (systems.has("ductless")) {
        services.push({
          name: `Ductless mini-split deep clean — ${ductlessHeads} head${ductlessHeads > 1 ? "s" : ""}`,
          description: "Complete disassembly, coil wash, antimicrobial treatment.",
          priceCents: ductlessPrice * 100,
          quantity: 1,
        });
      }
      if (systems.has("hrv")) {
        services.push({
          name: "HRV/ERV cleaning",
          description: "Core, filters, and ductwork. Premium HRV service.",
          priceCents: hrvPrice * 100,
          quantity: 1,
        });
      }
      if (systems.has("ducted")) {
        services.push({
          name: "Ducted system deep clean",
          description: "Full ducted system service with coil and component cleaning.",
          priceCents: ductedPrice * 100,
          quantity: 1,
        });
      }
    }

    const carePlanPrefix =
      mode === "care_plan"
        ? `Care Plan inquiry (${carePlanTier}). Customer would like a member to reach out to build a custom solution.${form.notes ? "\n\n" : ""}`
        : "";

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
      services,
      notes: carePlanPrefix + form.notes,
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
            className="fixed inset-0 z-[1300] bg-black/55"
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
            className="fixed inset-0 z-[1301] flex items-start sm:items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-xl bg-white rounded-card shadow-elevated my-6 sm:my-auto pointer-events-auto max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                <h2
                  id="booking-modal-title"
                  className="font-heading text-xl font-semibold text-text"
                >
                  Book Your Service
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
                <div className="p-8 text-center overflow-y-auto">
                  <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-5" />
                  <h3 className="font-heading text-2xl font-semibold text-text mb-3">
                    {mode === "care_plan" ? "Request Received" : "Booking Request Received"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
                    Thanks {form.firstName}.{" "}
                    {mode === "care_plan"
                      ? `A member will reach out within one business day to talk through the ${carePlanTier} plan and build a custom solution.`
                      : "We'll reach out within one business day to confirm your appointment time."}{" "}
                    You can also call us at{" "}
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
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
                  {/* Mode toggle */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      What Can We Help With?
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setMode("onetime")}
                        className={cn(
                          "relative rounded-xl border-2 p-3.5 text-left transition-all cursor-pointer",
                          mode === "onetime"
                            ? "border-primary bg-stripe ring-2 ring-primary"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                      >
                        <p className="font-semibold text-sm text-text">One-Time Service</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Book a single visit
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode("care_plan")}
                        className={cn(
                          "relative rounded-xl border-2 p-3.5 text-left transition-all cursor-pointer",
                          mode === "care_plan"
                            ? "border-primary bg-stripe ring-2 ring-primary"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                      >
                        <p className="font-semibold text-sm text-text">Subscription</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Monthly Care Plan
                        </p>
                      </button>
                    </div>
                  </div>

                  {mode === "care_plan" && (
                    <>
                      <div className="bg-stripe border border-primary/20 rounded-card p-4">
                        <p className="text-sm text-text leading-relaxed">
                          <strong>Interested in a subscription?</strong> Choose
                          the plan you&apos;d like to talk about and a member
                          will reach out to build your custom solution.
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
                          Choose A Care Plan
                        </p>
                        <div className="space-y-2.5">
                          {CARE_PLANS.map((plan) => {
                            const selected = carePlanTier === plan.name;
                            return (
                              <button
                                key={plan.name}
                                type="button"
                                onClick={() => setCarePlanTier(plan.name)}
                                className={cn(
                                  "w-full rounded-xl border-2 p-3.5 flex items-start gap-3 text-left transition-all cursor-pointer",
                                  selected
                                    ? "border-primary bg-stripe"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                                    selected
                                      ? "bg-primary border-primary"
                                      : "border-gray-300 bg-white"
                                  )}
                                >
                                  {selected && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-baseline justify-between gap-2 mb-1">
                                    <p className="font-semibold text-sm text-text">
                                      {plan.name}
                                      {plan.isPopular && (
                                        <span className="ml-2 inline-block text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded-pill align-middle">
                                          Popular
                                        </span>
                                      )}
                                    </p>
                                    <p className="font-heading font-bold text-primary text-sm tabular-nums shrink-0">
                                      ${plan.monthlyPrice}
                                      <span className="text-xs text-gray-500 font-normal">
                                        /mo
                                      </span>
                                    </p>
                                  </div>
                                  <p className="text-xs text-gray-500 leading-relaxed">
                                    {plan.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {mode === "onetime" && (
                  <>
                  {/* Systems */}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
                      Select Your Systems
                    </p>
                    <div className="space-y-2.5">
                      {/* Ductless */}
                      <div
                        className={cn(
                          "rounded-xl border-2 p-3.5 transition-all",
                          systems.has("ductless")
                            ? "border-primary bg-stripe"
                            : "border-gray-200 bg-white"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => toggleSystem("ductless")}
                            className="flex items-center gap-3 cursor-pointer flex-1 text-left"
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0",
                                systems.has("ductless")
                                  ? "bg-primary border-primary"
                                  : "border-gray-300 bg-white"
                              )}
                            >
                              {systems.has("ductless") && (
                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-text">
                                Ductless Mini-Split
                              </p>
                              <p className="text-xs text-gray-500">
                                From ${DUCTLESS_ONETIME_PRICING[1]}/visit
                              </p>
                            </div>
                          </button>
                          {systems.has("ductless") && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 font-medium hidden sm:block">
                                Heads:
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setDuctlessHeads((h) => Math.max(1, h - 1))
                                }
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer"
                                aria-label="Decrease heads"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-heading font-bold text-text w-5 text-center tabular-nums">
                                {ductlessHeads}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setDuctlessHeads((h) => Math.min(8, h + 1))
                                }
                                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer"
                                aria-label="Increase heads"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* HRV/ERV */}
                      <button
                        type="button"
                        onClick={() => toggleSystem("hrv")}
                        className={cn(
                          "w-full rounded-xl border-2 p-3.5 flex items-center gap-3 text-left transition-all cursor-pointer",
                          systems.has("hrv")
                            ? "border-primary bg-stripe"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                            systems.has("hrv")
                              ? "bg-primary border-primary"
                              : "border-gray-300 bg-white"
                          )}
                        >
                          {systems.has("hrv") && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-text">HRV/ERV</p>
                          <p className="text-xs text-gray-500">
                            ${SYSTEM_PLAN_PRICING.hrv.oneTimePrice}/visit
                          </p>
                        </div>
                      </button>

                      {/* Ducted */}
                      <button
                        type="button"
                        onClick={() => toggleSystem("ducted")}
                        className={cn(
                          "w-full rounded-xl border-2 p-3.5 flex items-center gap-3 text-left transition-all cursor-pointer",
                          systems.has("ducted")
                            ? "border-primary bg-stripe"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                            systems.has("ducted")
                              ? "bg-primary border-primary"
                              : "border-gray-300 bg-white"
                          )}
                        >
                          {systems.has("ducted") && (
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-text">
                            Ducted Heat Pump
                          </p>
                          <p className="text-xs text-gray-500">
                            ${SYSTEM_PLAN_PRICING.ducted.oneTimePrice}/visit
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Bundle savings banner */}
                  <AnimatePresence>
                    {bundleSavings > 0 && (
                      <motion.div
                        key={bundleName}
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-card p-3.5">
                          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-primary">
                              You&apos;re saving ${bundleSavings} with a bundle!
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {bundleName} — discount applied automatically below.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Price breakdown */}
                  <div className="bg-stripe rounded-card p-4 space-y-1.5">
                    {hasDuctless && (
                      <BreakdownRow
                        label={`Ductless (${ductlessHeads} head${ductlessHeads === 1 ? "" : "s"})`}
                        amount={baseDuctlessPrice}
                      />
                    )}
                    {hasHrv && <BreakdownRow label="HRV/ERV" amount={baseHrvPrice} />}
                    {hasDucted && <BreakdownRow label="Ducted" amount={baseDuctedPrice} />}
                    {bundleSavings > 0 && (
                      <div className="flex items-center justify-between text-sm font-medium text-primary">
                        <span>Bundle savings</span>
                        <span className="tabular-nums">−${bundleSavings}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-white">
                      <span className="text-sm font-semibold text-text">Estimated total</span>
                      <span className="font-heading text-2xl font-bold text-primary tabular-nums">
                        ${total}
                      </span>
                    </div>
                  </div>
                  </>
                  )}

                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First Name" required>
                      <input
                        type="text"
                        required
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Last Name" required>
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

                  <Field label="Phone Number" required>
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

                  <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
                    <Field label="Street Address" required>
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
                    <Field label="Postal / ZIP Code" required>
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

                  <Field label="Notes (Optional)">
                    <textarea
                      rows={3}
                      placeholder="Anything we should know — preferred time, access instructions…"
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
                      <>{mode === "care_plan" ? "Request Callback" : "Request Booking"}</>
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

function BreakdownRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex items-center justify-between text-sm text-gray-700">
      <span>{label}</span>
      <span className="tabular-nums text-gray-500">${amount}</span>
    </div>
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
