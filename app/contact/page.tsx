"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const BRAND = { red: "#cd142a" };

export default function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Collect form data without changing your UI structure
    const form = e.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullName") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const email = String(data.get("email") || "").trim();
    const dob = String(data.get("dob") || "").trim();
    const message = String(data.get("message") || "").trim();

    // Build WhatsApp payload & open chat to +971 5658 22845
    const phone = "971565822845"; // international format, no + or spaces
    const text = `New contact inquiry:%0AName: ${fullName}%0AContact: ${contact}%0AEmail: ${email}%0ADate of Birth: ${dob}%0AMessage: ${message}`;
    const waUrl = `https://wa.me/${phone}?text=${text}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <>
      {/* Sticky navbar like other sections */}
      {!isHome && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}

      <section
        className="relative overflow-hidden container-pad py-16 md:py-24 bg-white dark:bg-neutral-900"
        style={{
          background:
            "radial-gradient(120% 80% at 100% -20%, rgba(205,20,42,0.06) 0%, transparent 60%)",
        }}
      >
        {/* standard top margin below navbar */}
        {!isHome && <div className="mt-4 md:mt-6" />}

        {/* Animated floating football */}
        <motion.div
          className="absolute -right-10 md:right-24 top-10 md:top-16 w-36 h-36 md:w-52 md:h-52 opacity-80"
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/animationBall.png"
            alt="Football"
            fill
            className="object-contain pointer-events-none select-none"
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-black dark:text-white">
            Contact <span style={{ color: BRAND.red }}>Us</span>
          </h1>
          <p className="text-sm md:text-[15px] text-black/70 dark:text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Let’s connect! Whether you're looking to join the academy, book a
            trial, or simply ask a question — we’re here to help you take your
            game to the next level.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-2xl mx-auto grid gap-5 p-8 md:p-10 rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg border border-black/10 dark:border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              className="w-full rounded-xl px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#cd142a]/40 outline-none transition"
              placeholder="Enter your full name"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
              Contact Number (UAE)
            </label>
            <input
              required
              type="tel"
              pattern="[0-9+ ]*"
              name="contact"
              className="w-full rounded-xl px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#cd142a]/40 outline-none transition"
              placeholder="+971 50 123 4567"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              className="w-full rounded-xl px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#cd142a]/40 outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
              Date of Birth
            </label>
            <input
              required
              type="date"
              name="dob"
              className="w-full rounded-xl px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#cd142a]/40 outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-white">
              Message
            </label>
            <textarea
              rows={5}
              required
              name="message"
              className="w-full rounded-xl px-4 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#cd142a]/40 outline-none transition resize-none"
              placeholder="Tell us more about your goals or inquiry..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{
              y: -2,
              boxShadow: "0 10px 28px rgba(205,20,42,0.45)",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold tracking-wide uppercase text-white shadow-lg transition-all duration-300 ease-out"
            style={{
              background: "linear-gradient(90deg, #cd142a, #000)",
              border: `1px solid ${BRAND.red}`,
            }}
          >
            Send Message
          </motion.button>

          {/* Success message */}
          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-500 font-medium mt-2 text-center"
              >
                ✅ Thank you! Your message has been received.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </section>
    </>
  );
}
