"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

/** Motion variants */
const wrap = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SectionCTA() {
  const { t } = useI18n();
  const prefersReduced = useReducedMotion();

  // Parallax tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-20, 20], [6, -6]);
  const rotateY = useTransform(mx, [-20, 20], [-6, 6]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    mx.set((x / r.width) * 40);
    my.set((y / r.height) * 40);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="container-pad py-24 md:py-28 relative overflow-hidden">
      {/* Animated mesh background + orbs */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* soft radial wash */}
        <motion.div
          className="absolute -top-24 right-10 h-[28rem] w-[28rem]  blur-3xl"
          animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-10 h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{ background: "rgba(0,0,0,0.22)" }}
          animate={{ opacity: [0.1, 0.28, 0.1], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* diagonal gradient sweep */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* tiny floating particles */}
        <div className="absolute inset-0">
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full"
              style={{
                left: `${(i * 73) % 100}%`,
                top: `${(i * 37) % 100}%`,
                background:
                  i % 3 === 0 ? "rgba(205,20,42,0.9)" : "rgba(255,255,255,0.8)",
                filter: "blur(0.5px)",
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 4 + (i % 5),
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        variants={wrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mx-auto max-w-4xl"
      >
        <motion.div
          style={prefersReduced ? {} : { rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="
            relative overflow-hidden text-center rounded-2xl px-6 md:px-12 py-12 md:py-16
            border border-black/10 dark:border-white/10
            bg-white/70 dark:bg-neutral-900/70
            shadow-[0_18px_80px_rgba(0,0,0,0.12)] backdrop-blur-lg
          "
        >
          {/* border sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(120deg, rgba(205,20,42,0.22), transparent 35%, rgba(205,20,42,0.22))",
              mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              WebkitMask:
                "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              padding: 1,
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* light glint sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-16 h-24 rotate-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            }}
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* content */}
          <motion.h3
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-black dark:text-white"
          >
            {t.cta.title}
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-black/70 dark:text-white/80 max-w-2xl mx-auto mb-8 md:mb-10"
          >
            {t.cta.desc}
          </motion.p>

          {/* badges (optional vibe) */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
          >
            {[
              "UEFA-Licensed Staff",
              "Showcase Trials",
              "Scholarship Pathways",
            ].map((b, i) => (
              <span
                key={b}
                className="rounded-full px-3 py-1.5 text-xs md:text-sm border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md"
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* CTA button with shimmer */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Link
                href="/contact"
                className="
                  relative inline-flex items-center gap-2 rounded-full px-7 md:px-9 py-3.5
                  font-semibold uppercase tracking-wide
                  bg-[#cd142a] text-white
                  border border-[#cd142a]
                  shadow-[0_10px_28px_rgba(205,20,42,0.35)]
                  transition-all duration-300
                  hover:bg-white hover:text-black
                "
              >
                {t.cta.button}
                <ArrowRight className="h-4 w-4" />
                {/* shimmer overlay */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                >
                  <motion.span
                    className="absolute -inset-y-1 -left-1/2 w-1/2 rotate-12 bg-white/40"
                    style={{ filter: "blur(6px)" }}
                    animate={{ x: ["0%", "250%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* bottom shimmer bar */}
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-1/2 h-[2px] w-28 -translate-x-1/2 bg-[#cd142a]/70"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
