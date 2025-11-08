"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  ArrowRight,
  Trophy,
  Users,
  Calendar,
  Clock,
  Shield,
} from "lucide-react";
import { JSX } from "react";

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

type Tier = {
  title: string;
  slug: string;
  age: string;
  blurb: string;
  bullets: { icon: JSX.Element; text: string }[];
};

/** Helper: build WA link */
function waLink(phone: string, msg: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

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

  /** Program tiers */
  const tiers: Tier[] = [
    {
      title: "Under 9",
      slug: "u9",
      age: "Ages 6–9",
      blurb:
        "Build the perfect foundation—ball mastery, fun games, and confidence in every touch.",
      bullets: [
        { icon: <Users size={16} />, text: "Small groups • high reps" },
        { icon: <Calendar size={16} />, text: "2 sessions / week" },
        { icon: <Shield size={16} />, text: "Safe & supportive" },
      ],
    },
    {
      title: "Under 15",
      slug: "u15",
      age: "Ages 10–15",
      blurb:
        "Technique + decision-making with modern European training for real match impact.",
      bullets: [
        { icon: <Trophy size={16} />, text: "League & showcases" },
        { icon: <Clock size={16} />, text: "90-min sessions" },
        { icon: <Shield size={16} />, text: "Strength & prevention" },
      ],
    },
    {
      title: "Under 23",
      slug: "u23",
      age: "Ages 16–23",
      blurb:
        "Position-specific coaching, video analysis, and pathways to trials & scholarships.",
      bullets: [
        { icon: <Trophy size={16} />, text: "Trials & scouting links" },
        { icon: <Calendar size={16} />, text: "3–4 sessions / week" },
        { icon: <Shield size={16} />, text: "Sports science support" },
      ],
    },
  ];

  const phone = "971501234567"; // <-- set your WhatsApp number here

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
        {/* soft radial wash (brand tint) */}
        <motion.div
          className="absolute -top-24 right-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: "rgba(205,20,42,0.18)" }}
          animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-10 h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{ background: "rgba(0,0,0,0.22)" }}
          animate={{ opacity: [0.1, 0.28, 0.1], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Card shell (tilt) */}
      <motion.div
        variants={wrap}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mx-auto max-w-6xl"
      >
        <motion.div
          style={prefersReduced ? {} : { rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="
            relative overflow-hidden rounded-2xl px-6 md:px-10 py-10 md:py-14
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

          {/* header content */}
          <motion.h3
            variants={fadeUp}
            className="text-center text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-black dark:text-white"
          >
            {t.cta.title}
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="text-center text-black/70 dark:text-white/80 max-w-3xl mx-auto mb-8"
          >
            {t.cta.desc}
          </motion.p>

          {/* badges */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
          >
            {[
              "UEFA-Licensed Staff",
              "Showcase Trials",
              "Scholarship Pathways",
            ].map((b) => (
              <span
                key={b}
                className="rounded-full px-3 py-1.5 text-xs md:text-sm border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md"
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* ===== Program Cards ===== */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          >
            {tiers.map((tier, idx) => {
              const contactHref = `/contact?program=${tier.slug}`;
              const waMsg = `Hi WILLIAMIKANDA GROUP! I’m interested in the ${tier.title} program.`;
              const whatsHref = waLink(phone, waMsg);

              return (
                <motion.article
                  key={tier.slug}
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: idx * 0.06,
                  }}
                  className="
                    group relative overflow-hidden rounded-2xl p-5 md:p-6
                    bg-white/80 dark:bg-neutral-900/80
                    border border-black/10 dark:border-white/10
                    shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                    hover:-translate-y-1.5 hover:shadow-[0_16px_60px_rgba(0,0,0,0.16)]
                    transition-all
                  "
                >
                  {/* sheen */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(80% 60% at 20% 0%, rgba(205,20,42,0.12), transparent 60%)",
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
                        {tier.title}
                      </h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/80">
                        {tier.age}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                      {tier.blurb}
                    </p>

                    {/* bullets */}
                    <ul className="mt-4 space-y-2 text-sm">
                      {tier.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-black/80 dark:text-white/80"
                        >
                          <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-black/5 dark:bg-white/10">
                            {b.icon}
                          </span>
                          <span>{b.text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* actions */}
                    <div className="mt-5 flex items-center gap-2">
                      {/* <a
                        href={whatsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center justify-center
                          rounded-full px-4 py-2 text-xs md:text-sm font-semibold
                          bg-[#25D366] text-white
                          shadow-[0_8px_22px_rgba(37,211,102,0.35)]
                          hover:translate-y-[-1px] active:translate-y-0
                          transition
                        "
                        aria-label={`WhatsApp ${tier.title}`}
                      >
                        WhatsApp
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </a> */}

                      <Link
                        href={contactHref}
                        className="
                          inline-flex items-center justify-center
                          rounded-full px-4 py-2 text-xs md:text-sm font-semibold
                          bg-[#cd142a] text-white
                          shadow-[0_8px_22px_rgba(205,20,42,0.35)]
                          hover:bg-white hover:text-black border border-transparent hover:border-black/10
                          hover:translate-y-[-1px] active:translate-y-0
                          transition
                        "
                        aria-label={`Contact for ${tier.title}`}
                      >
                        Contact
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Primary CTA (kept) */}
          {/* <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="
                  relative inline-flex items-center gap-2 rounded-full px-7 md:px-9 py-3.5
                  font-semibold uppercase tracking-wide
                  bg-[#cd142a] text-white border border-[#cd142a]
                  shadow-[0_10px_28px_rgba(205,20,42,0.35)]
                  transition-all duration-300
                  hover:bg-white hover:text-black
                "
              >
                {t.cta.button}
                <ArrowRight className="h-4 w-4" />
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
          </motion.div> */}

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
