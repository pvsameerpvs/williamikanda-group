"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";

/**
 * Light:  --brand-red: #cd142a; --brand-fg: #000; --brand-bg: #fff
 * Dark:   --brand-red: #cd142a; --brand-fg: #fff; --brand-bg: #0a0a0a
 */

const features = [
  {
    title: "UEFA-Licensed Coaching",
    desc: "Led by UEFA-certified professionals providing structured, position-specific programs and personalized mentorship for every player.",
  },
  {
    title: "European Curriculum",
    desc: "Our methodology is built on modern European training standards, combining tactical intelligence, creativity, and technical precision.",
  },
  {
    title: "Pro-Grade Facilities",
    desc: "Train on world-class synthetic turf with GPS tracking, performance analytics, and recovery suites designed for elite development.",
  },
  {
    title: "Trials & Scholarships",
    desc: "Access international showcases, scouting networks, and scholarship pathways that open doors to professional clubs and universities.",
  },
  {
    title: "Sports Science Integration",
    desc: "Data-driven insights, fitness monitoring, and nutrition guidance help players optimize physical performance and minimize injuries.",
  },
  {
    title: "Character & Leadership",
    desc: "We focus on respect, discipline, and teamwork—building not just great players, but strong individuals who lead on and off the field.",
  },
  {
    title: "International Exposure",
    desc: "Partner clubs, exchange programs, and friendly matches with European academies prepare players for global football standards.",
  },
  {
    title: "Career Development Support",
    desc: "From video portfolios to trial preparation, our team helps athletes showcase their talent and transition into professional environments.",
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

/* ========================================================================== */
/*                              MAIN COMPONENT                                */
/* ========================================================================== */
export default function WhyChooseUs() {
  // desktop tilt
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
      {/* theme vars (inline for portability) */}
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

      {/* container */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 py-12 md:py-20">
        {/* Heading */}
        <motion.header
          variants={staggerWrap}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="leading-tight md:leading-tight text-[clamp(28px,6vw,40px)] md:text-5xl font-normal dm-serif"
          >
            Why choose{" "}
            <span className="text-[var(--brand-red)] not-italic">us?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 md:mt-4 mx-auto max-w-2xl text-[clamp(14px,2.8vw,16px)] md:text-[15px] leading-7 md:leading-8 text-[var(--muted)] smooch"
          >
            From fundamentals to pro pathways, we blend elite coaching, European
            methodology, and character-building values so every player
            thrives—on and off the pitch.
          </motion.p>
        </motion.header>

        {/* ===== Mobile: image + carousel (≤ md) ===== */}
        <div className="mt-8 md:mt-10 md:hidden">
          {/* Mobile center image (smaller) */}
          <CenterTiltImage
            onMove={() => {}}
            onLeave={() => {}}
            rotateX={useMotionValue(0)} // disable tilt on touch for smoother UX
            rotateY={useMotionValue(0)}
            src="/academy-why.jpeg"
            wrapperClass="max-w-[360px]"
            imgWidth={360}
            imgHeight={280}
          />

          {/* Mobile carousel */}
          <div className="mt-6">
            <MobileFeatureCarousel items={features} />
          </div>
        </div>

        {/* ===== Desktop / Tablet Layout (≥ md) ===== */}
        <motion.div
          variants={staggerWrap}
          className="mt-8 md:mt-14 hidden md:grid grid-cols-1 items-start gap-8 md:gap-12 md:grid-cols-[1fr_minmax(0,520px)_1fr]"
        >
          {/* Left 4 */}
          <ul className="space-y-8 lg:space-y-10">
            {features.slice(0, 4).map(({ title, desc }, i) => (
              <motion.li key={i} variants={slideLeft} className="text-right">
                <FeatureItem title={title} desc={desc} align="right" />
              </motion.li>
            ))}
          </ul>

          {/* Center Image (tilt) */}
          <CenterTiltImage
            onMove={onMove}
            onLeave={onLeave}
            rotateX={rotateX}
            rotateY={rotateY}
            src="/academy-why.jpeg"
            wrapperClass="max-w-[500px]"
            imgWidth={500}
            imgHeight={420}
          />

          {/* Right 4 */}
          <ul className="space-y-8 lg:space-y-10">
            {features.slice(4).map(({ title, desc }, i) => (
              <motion.li key={i} variants={slideRight} className="text-left">
                <FeatureItem title={title} desc={desc} align="left" />
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-10 md:mt-12 flex justify-center"
        >
          <motion.a
            href="/contact"
            whileHover={{
              y: -2,
              boxShadow: "0 10px 28px rgba(205,20,42,0.45)",
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold uppercase tracking-wide border border-[var(--brand-red)] shadow-[0_4px_20px_rgba(205,20,42,0.25)] bg-[var(--brand-red)] text-[var(--brand-bg)] hover:bg-[var(--brand-bg)] hover:text-[var(--brand-fg)] transition-all duration-300 ease-out smooch"
          >
            Get a FREE trial
          </motion.a>
        </motion.div>
      </div>

      {/* soft brand glow */}
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

/* ========================================================================== */
/*                              SUBCOMPONENTS                                 */
/* ========================================================================== */

function FeatureItem({
  title,
  desc,
  align = "left",
}: {
  title: string;
  desc: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`inline-flex w-full items-start gap-3 ${
        align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs ${align === "right" ? "text-right" : "text-left"}`}
      >
        <h3 className="leading-snug text-[17px] font-normal dm-serif">
          {title}
        </h3>
        <p className="mt-1 text-[14px] leading-6 text-[var(--muted)] smooch">
          {desc}
        </p>
      </div>
    </div>
  );
}

function CenterTiltImage({
  onMove,
  onLeave,
  rotateX,
  rotateY,
  src,
  wrapperClass = "max-w-[500px]",
  imgWidth = 500,
  imgHeight = 420,
}: {
  onMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLeave: () => void;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  src: string;
  wrapperClass?: string;
  imgWidth?: number;
  imgHeight?: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`mx-auto w-full ${wrapperClass}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="rounded-[16px] p-3"
        style={{ background: "rgba(205,20,42,0.12)" }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="overflow-hidden rounded-[12px] ring-1 ring-[var(--ring)]"
        >
          <Image
            src={src}
            alt="WILLIAMIKANDA Academy training"
            width={imgWidth}
            height={imgHeight}
            className="h-auto w-full object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
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
              className="rounded-full px-3 py-1.5 text-[13px] smooch"
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
  );
}

function MobileFeatureCarousel({
  items,
}: {
  items: { title: string; desc: string }[];
}) {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  const updateArrows = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth - 2;
    setCanLeft(scrollLeft > 2);
    setCanRight(scrollLeft < maxScroll);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [updateArrows]);

  const scrollByCard = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 16;
    const cardWidth = card ? card.offsetWidth : el.clientWidth * 0.85;
    el.scrollBy({
      left: (dir === "next" ? 1 : -1) * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* subtle edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[var(--brand-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--brand-bg)] to-transparent" />

      {/* track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 py-2 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* hide scrollbar (webkit) */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {items.map(({ title, desc }, idx) => (
          <article
            key={idx}
            data-card
            className="snap-center shrink-0 w-[86%] xs:w-[80%] sm:w-[70%] rounded-2xl p-4 ring-1 ring-[var(--card-border)] bg-[var(--brand-bg)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] relative overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(to_top,transparent,black_70%)] bg-gradient-to-t from-black/10 to-transparent" />
            <h3 className="text-[18px] leading-snug dm-serif">{title}</h3>
            <p className="mt-1 text-[14px] leading-6 text-[var(--muted)] smooch">
              {desc}
            </p>
          </article>
        ))}
      </div>

      {/* arrows (auto-hide first/last) */}
      {canLeft && (
        <button
          aria-label="Previous"
          onClick={() => scrollByCard("prev")}
          className="absolute left-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-[var(--card-border)] bg-[var(--chip)] shadow-sm active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
      )}
      {canRight && (
        <button
          aria-label="Next"
          onClick={() => scrollByCard("next")}
          className="absolute right-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-[var(--card-border)] bg-[var(--chip)] shadow-sm active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </button>
      )}
    </div>
  );
}
