// components/CountryProgramsTabs.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ---------- Brand + Data ---------- */
const BRAND = { red: "#cd142a" };

type CountryKey = "cd" | "ae" | "pt" | "br";

type Country = {
  flag: string;
  name: string;
  badge: string;
  headline: string;
  paragraph: string;
  bullets: string[];
  location?: string;
  contact?: string;
  image?: string;
};

const countries: Record<CountryKey, Country> = {
  cd: {
    flag: "🇨🇩",
    name: "Congo (Kinshasa)",
    badge: "Talent ID",
    headline: "Kinshasa Trials & Academy Pathway",
    paragraph:
      "We host recurring open trials and structured academy intakes designed to identify and develop local talent. Athletes receive age-appropriate training blocks, performance reviews, and direct pathways into our international programs.",
    bullets: [
      "Venue: Stade des Martyrs (Gate 10)",
      "Age Groups: U9 · U15 · U23",
      "Focus: Fundamentals, game IQ, resilience",
      "Scholarship assessments for top performers",
    ],
    location: "Kinshasa, DR Congo",
    contact: "+243 975 331 634",
    image: "/int.jpg",
  },
  ae: {
    flag: "🇦🇪",
    name: "United Arab Emirates",
    badge: "Pro Pathway (D3)",
    headline: "Dubai Elite Blocks & Pro-Ready Environment",
    paragraph:
      "Our Dubai program delivers high-intensity technical sessions, position-specific coaching, and match analysis. Players train toward professional standards and may be shortlisted for trials with our partner club.",
    bullets: [
      "UEFA-licensed coaches & video analysis",
      "Position roles: GK · DEF · MID · ATT",
      "Seasonal elite camps & friendlies",
      "Shortlists for professional evaluations",
    ],
    location: "Dubai, Sharja, Ajman",
    image: "/int2.jpg",
  },
  pt: {
    flag: "🇵🇹",
    name: "Portugal",
    badge: "European Curriculum",
    headline: "European Methodology & Scouting Exposure",
    paragraph:
      "Train in a competitive European environment with emphasis on tactical understanding and decision-making. The program enhances technical consistency while offering exposure to a wider scouting network.",
    bullets: [
      "Game-centered tactical periodization",
      "Competitive fixtures where available",
      "Holistic player reports & feedback",
      "Integration support for student-athletes",
    ],
    location: "Lisbon & surrounding regions",
    image: "/int3.jpg",
  },
  br: {
    flag: "🇧🇷",
    name: "Brazil",
    badge: "Flair & Creativity",
    headline: "Brazilian Style: Creativity, Rhythm, Expression",
    paragraph:
      "Short-term exchange camps refine first touch, 1v1 attacking, and improvisation under pressure. Players learn to combine flair with structure while building confidence in the final third.",
    bullets: [
      "Creative attacking drills & small-sided games",
      "Agility, rhythm, and body feints",
      "Mentality: freedom, bravery, expression",
      "Match simulations with scenario coaching",
    ],
    location: "Rio & partner facilities",
    image: "/int4.jpg",
  },
};

/* ---------- Anim presets ---------- */
const fadeCard = {
  initial: { opacity: 0, y: 10, scale: 0.99 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.22 } },
};

/* ---------- Component ---------- */
export default function CountryProgramsTabs() {
  const [active, setActive] = useState<CountryKey>("cd");
  const tabs = Object.entries(countries) as [CountryKey, Country][];

  return (
    <section className="w-full">
      {/* Pill Tabs Bar */}
      <div
        className="
  mx-auto w-full max-w-5xl
  
  px-2 py-2
   text-white
  
  transition-colors duration-300
  dark:bg-[#5B0C11]/20 dark:text-white
  dark:shadow-[0_18px_44px_rgba(91,12,17,0.35)]
"
      >
        {/* centered tabs */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="inline-flex justify-center items-center gap-2 px-1 w-full flex-wrap md:flex-nowrap md:justify-center">
            {tabs.map(([key, c]) => {
              const isActive = key === active;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  aria-pressed={isActive}
                  className="
  relative shrink-0
  h-9 md:h-10 px-3 md:px-4
  rounded-[999px]
  text-[13px] md:text-[14px] font-semibold
  bg-[#9B2A2F]/90 text-white
  hover:bg-[#7E1D22]/85
  active:bg-[#5B0C11]
  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B2A2F]/40
  transition-colors duration-300
  dark:bg-[#7E1D22]/85 dark:hover:bg-[#5B0C11]/75 dark:active:bg-[#3A080B]
"
                >
                  {isActive && (
                    <motion.span
                      layoutId="pill-active"
                      className="
                        absolute inset-0 rounded-[999px]
                        bg-[rgb(123,97,255,0.12)]
                        ring-1 ring-[rgb(123,97,255,0.3)]
                        dark:bg-[rgb(123,97,255,0.16)]
                        dark:ring-[rgb(123,97,255,0.35)]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                    />
                  )}

                  <span className="relative inline-flex items-center gap-2">
                    <span className="text-sm md:text-base leading-none">
                      {c.flag}
                    </span>
                    <span
                      className={
                        isActive ? "text-neutral-900 dark:text-white" : ""
                      }
                    >
                      {c.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Panel */}
      <div className="mx-auto mt-6 w-full max-w-5xl">
        <div className="min-h-[470px] md:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              {...fadeCard}
              className="
                relative overflow-hidden
                rounded-2xl
                ring-1 ring-black/10 bg-white/80 text-neutral-900
                shadow-[0_18px_60px_rgba(0,0,0,0.10)]
                dark:ring-white/10 dark:bg-neutral-900/80 dark:text-white
                backdrop-blur-md
              "
            >
              {/* top text block */}
              <div className="p-5 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-full">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: BRAND.red }}
                    />
                    {countries[active].badge}
                  </span>
                  {countries[active].location && (
                    <span className="text-xs md:text-sm opacity-80">
                      📍 {countries[active].location}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-lg md:text-2xl font-semibold">
                  {countries[active].headline}
                </h3>

                <p className="mt-2 text-[14px] md:text-base opacity-85 leading-7">
                  {countries[active].paragraph}
                </p>

                <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                  {countries[active].bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[14px] md:text-[15px] opacity-90"
                    >
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: BRAND.red }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {countries[active].contact && (
                  <div className="mt-4 text-xs md:text-sm opacity-90">
                    📞 Contact:{" "}
                    <span className="font-medium">
                      {countries[active].contact}
                    </span>
                  </div>
                )}
              </div>

              {/* image footer */}
              <div className="relative h-48 md:h-56 w-full">
                {countries[active].image ? (
                  <Image
                    src={countries[active].image!}
                    alt={`${countries[active].name} program`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 800px, 100vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg,#111,#333 40%,#666 100%)",
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 text-neutral-900 px-3 py-1.5 ring-1 ring-black/10 dark:bg-neutral-800/90 dark:text-white dark:ring-white/10">
                    <span className="text-base leading-none">
                      {countries[active].flag}
                    </span>
                    <span className="text-xs md:text-sm font-semibold">
                      {countries[active].name}
                    </span>
                  </div>

                  <Link
                    href="/contact"
                    className="rounded-full bg-[#cd142a] text-white text-xs md:text-sm font-semibold px-3 py-1.5 ring-1 ring-[#cd142a] shadow-[0_8px_24px_rgba(205,20,42,0.35)] hover:bg-white hover:text-black transition"
                  >
                    Join / Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-5 text-[14px] md:text-[15px] leading-7 opacity-90 text-center">
          Wherever you join us — Africa, the Middle East, Europe, or South
          America — our commitment is the same: disciplined training, character
          building, and a real pathway from grassroots to professional football.
        </p>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
