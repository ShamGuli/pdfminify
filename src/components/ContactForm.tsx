"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-6 shadow-md shadow-slate-200 sm:p-7">
      {submitted ? (
        <div className="space-y-2 text-sm text-slate-700">
          <h2 className="text-lg font-semibold text-slate-900">
            Thank you for your message!
          </h2>
          <p>
            We&apos;ve received your note. For urgent questions, you can also
            email{" "}
            <a
              href="mailto:hello@pdfminify.com"
              className="text-primary underline-offset-2 hover:underline"
            >
              hello@pdfminify.com
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-xs font-medium text-slate-700">
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary/20 placeholder:text-slate-400 focus:border-primary focus:ring-2"
                placeholder="Your name"
                required
              />
            </label>
            <label className="space-y-1">
              <span className="block text-xs font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary/20 placeholder:text-slate-400 focus:border-primary focus:ring-2"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>

          <label className="space-y-1">
            <span className="block text-xs font-medium text-slate-700">
              Message
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block min-h-[140px] w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary/20 placeholder:text-slate-400 focus:border-primary focus:ring-2"
              placeholder="How can we help?"
              required
            />
          </label>

          <button
            type="submit"
            className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-primary/40 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Send message
          </button>

          <p className="pt-2 text-xs text-slate-500">
            Or email us directly:{" "}
            <a
              href="mailto:hello@pdfminify.com"
              className="text-primary underline-offset-2 hover:underline"
            >
              hello@pdfminify.com
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

