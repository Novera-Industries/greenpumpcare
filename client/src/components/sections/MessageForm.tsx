"use client";

import { useState } from "react";
import { Send, CheckCircle, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function MessageForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data?.error ||
            "We couldn't send your message. Please try again or email us directly."
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't reach the contact service. Check your connection or email us directly."
      );
    }
  }

  return (
    <div className="bg-white rounded-card shadow-card p-8 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-text">
            Send us a message
          </h3>
          <p className="text-gray-500 text-sm">We reply within 24 hours.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 flex-1 flex flex-col justify-center"
          >
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-heading text-xl font-semibold text-text mb-2">
              Message received
            </h4>
            <p className="text-gray-600">
              Thanks for reaching out{name ? `, ${name.split(/\s+/)[0]}` : ""}.
              We&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4 flex-1 flex flex-col"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Name
              </label>
              <input
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-colors"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Subject
              </label>
              <input
                type="text"
                placeholder="What can we help with?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-200 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-colors"
              />
            </div>

            {/* Message */}
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-text mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us a bit about what you're looking for..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-200 rounded-input px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-colors resize-none flex-1 min-h-[120px]"
              />
            </div>

            {status === "error" && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-input p-3 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="md"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send message
                </>
              )}
            </Button>

            <p className="text-center text-xs text-gray-400">
              To book a service, use the Book button above.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
