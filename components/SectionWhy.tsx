"use client";

import Image from "next/image";
import { GraduationCap, Medal, Building2, Trophy } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Light:  --brand-red: #cd142a; --brand-fg: #000; --brand-bg: #fff
 * Dark:   --brand-red: #cd142a; --brand-fg: #fff; --brand-bg: #0a0a0a
 */

const features = [
  {
    title: "UEFA-Licensed Coaching",
    desc: "Position-specific plans, video feedback and weekly progress reviews with elite coaches.",
    Icon: Medal,
  },
  {
    title: "European Curriculum",
    desc: "Game-centred methodology that develops technique, decision-making and leadership.",
    Icon: GraduationCap,
  },
  {
    title: "Pro-Grade Facilities",
    desc: "High-performance turf, GPS tracking, recovery zones and performance analysis.",
    Icon: Building2,
  },
  {
    title: "Trials & Scholarships",
    desc: "Showcases, scouting links and university guidance for real career pathways.",
    Icon: Trophy,
  },
];

/* ----------------------------- Motion Variants ----------------------------- */
const sectionFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const staggerWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhyChooseUs() {
  // subtle parallax tilt on the image
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-20, 20], [6, -6]);
  const rotateY = useTransform(mx, [-20, 20], [-6, 6]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mx.set((x / rect.width) * 40);
    my.set((y / rect.height) * 40);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionFade}
      className="relative overflow-hidden bg-[var(--brand-bg)] text-[var(--brand-fg)] antialiased"
      style={{
        backgroundImage:
          "radial-gradient(120% 80% at 50% -20%, rgba(205,20,42,0.08) 0%, transparent 60%)",
      }}
    >
      {/* theme vars (kept inline; remove if you set globally) */}
      <style jsx>{`
        :root {
          --brand-red: #cd142a;
          --brand-fg: #000000;
          --brand-bg: #ffffff;
          --card-border: rgba(0, 0, 0, 0.12);
          --muted: rgba(0, 0, 0, 0.68);
          --chip: rgba(255, 255, 255, 0.82);
          --ring: rgba(0, 0, 0, 0.1);
          --icon-bg: rgba(205, 20, 42, 0.08);
          --icon-br: rgba(205, 20, 42, 0.22);
        }
        .dark :root,
        :root:has(.dark) {
          --brand-red: #cd142a;
          --brand-fg: #ffffff;
          --brand-bg: #0a0a0a;
          --card-border: rgba(255, 255, 255, 0.14);
          --muted: rgba(255, 255, 255, 0.72);
          --chip: rgba(10, 10, 10, 0.7);
          --ring: rgba(255, 255, 255, 0.1);
          --icon-bg: rgba(205, 20, 42, 0.12);
          --icon-br: rgba(205, 20, 42, 0.3);
        }
      `}</style>

      {/* container rhythm (kept) */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 py-12 md:py-20">
        {/* Heading */}
        <motion.header
          variants={staggerWrap}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="
              leading-tight md:leading-tight
              text-[clamp(28px,6vw,40px)] md:text-5xl
              font-normal
              [text-wrap:balance]
              dm-serif /* your global mapper will give DM Serif Display to h2 */
            "
          >
            Why choose{" "}
            <span className="text-[var(--brand-red)] not-italic">us?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="
              mt-3 md:mt-4 mx-auto max-w-2xl
              text-[clamp(14px,2.8vw,16px)] md:text-[15px]
              leading-7 md:leading-8 text-[var(--muted)]
              smooch /* applies Smooch Sans */
            "
          >
            From fundamentals to pro pathways, we blend elite coaching, European
            methodology, and character-building values so every player
            thrives—on and off the pitch.
          </motion.p>
        </motion.header>

        {/* Feature ring + image */}
        <motion.div
          variants={staggerWrap}
          className="
            mt-8 md:mt-14
            grid grid-cols-1 items-start gap-8 md:gap-12
            md:grid-cols-[1fr_minmax(0,520px)_1fr]
          "
        >
          {/* Left features */}
          <ul className="order-2 md:order-1 space-y-8 md:space-y-12">
            {features.slice(0, 2).map(({ title, desc, Icon }, i) => (
              <motion.li
                key={i}
                variants={slideLeft}
                className="text-center md:text-right"
              >
                <div className="inline-flex w-full md:w-auto items-start md:justify-end gap-0 md:gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full p-0"
                    style={{
                      background: "var(--icon-bg)",
                      border: "1px solid var(--icon-br)",
                    }}
                  >
                    <Icon className="h-5 w-5" color="var(--brand-red)" />
                  </motion.div>
                  <div className="max-w-xs text-left md:text-right">
                    <h3
                      className="
                        leading-snug md:leading-snug
                        text-[clamp(16px,3.5vw,18px)]
                        font-normal dm-serif
                      "
                    >
                      {title}
                    </h3>
                    <p
                      className="
                        mt-1
                        text-[clamp(13px,3.2vw,14px)]
                        md:text-sm
                        leading-6 md:leading-7
                        text-[var(--muted)]
                        smooch
                      "
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Center image with parallax tilt */}
          <motion.div
            variants={fadeUp}
            className="order-1 md:order-2 mx-auto w-full max-w-[520px]"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <motion.div
              className="rounded-[18px] p-2 md:p-3"
              style={{ background: "rgba(205,20,42,0.12)" }}
            >
              <motion.div
                style={{ rotateX, rotateY }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="overflow-hidden rounded-[14px] ring-1 ring-[var(--ring)] md:[cursor:grab]"
              >
                <Image
                  src="/academy-why.jpg"
                  alt="WILLIAMIKANDA Academy training"
                  width={520}
                  height={640}
                  className="h-auto w-full object-cover"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* chips */}
            <div className="mt-3 md:mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {["UEFA-licensed staff", "Video analysis", "Showcase events"].map(
                (c, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      rounded-full px-3 py-1.5
                      text-[clamp(11px,3vw,13px)] md:text-sm
                      smooch
                    "
                    style={{
                      background: "var(--chip)",
                      border: "1px solid var(--card-border)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {c}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>

          {/* Right features */}
          <ul className="order-3 space-y-8 md:space-y-12">
            {features.slice(2).map(({ title, desc, Icon }, i) => (
              <motion.li
                key={i}
                variants={slideRight}
                className="text-center md:text-left"
              >
                <div className="inline-flex w-full md:w-auto items-start gap-0 md:gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                    style={{
                      background: "var(--icon-bg)",
                      border: "1px solid var(--icon-br)",
                    }}
                  >
                    <Icon className="h-5 w-5" color="var(--brand-red)" />
                  </motion.div>
                  <div className="max-w-xs text-left">
                    <h3
                      className="
                        leading-snug md:leading-snug
                        text-[clamp(16px,3.5vw,18px)]
                        font-normal dm-serif
                      "
                    >
                      {title}
                    </h3>
                    <p
                      className="
                        mt-1
                        text-[clamp(13px,3.2vw,14px)]
                        md:text-sm
                        leading-6 md:leading-7
                        text-[var(--muted)]
                        smooch
                      "
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-8 md:mt-12 flex justify-center"
        >
          <motion.a
            href="/contact"
            whileHover={{
              y: -2,
              boxShadow: "0 10px 28px rgba(205,20,42,0.45)",
            }}
            whileTap={{ scale: 0.98 }}
            className="
              inline-flex items-center justify-center rounded-full
              px-6 py-3 text-sm md:text-base
              font-semibold uppercase tracking-wide
              border border-[var(--brand-red)]
              shadow-[0_4px_20px_rgba(205,20,42,0.25)]
              bg-[var(--brand-red)] text-[var(--brand-bg)]
              hover:bg-[var(--brand-bg)] hover:text-[var(--brand-fg)]
              transition-all duration-300 ease-out
              smooch
            "
          >
            Get a FREE trial
          </motion.a>
        </motion.div>
      </div>

      {/* Subtle animated brand glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 md:h-80 md:w-80 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(205,20,42,0.25), transparent)",
          filter: "blur(30px)",
        }}
      />
    </motion.section>
  );
}
