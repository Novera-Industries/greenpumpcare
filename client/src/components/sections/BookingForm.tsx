"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white rounded-card shadow-card p-8">
      <h3 className="font-heading text-2xl font-bold text-text mb-6">
        Request a booking
      </h3>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-heading text-xl font-semibold text-text mb-2">
              Request received!
            </h4>
            <p className="text-gray-600">
              We&apos;ll get back to you within 24 hours to confirm your
              appointment.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Service type
              </label>
              <select
                required
                className="w-full border border-gray-300 rounded-input px-4 py-3 text-text bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}. ${s.price}
                  </option>
                ))}
                <option value="bundle">HP + HRV bundle. $299</option>
                <option value="other">Other / not sure</option>
              </select>
            </div>

            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(902) 555-0123"
                  className="w-full border border-gray-300 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="123 Main St, Halifax"
                className="w-full border border-gray-300 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Message (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Any details about your system or preferred timing..."
                className="w-full border border-gray-300 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Send className="w-4 h-4" />
              Submit request
            </Button>

            <p className="text-center text-xs text-gray-400">
              Free estimates. No obligation.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
