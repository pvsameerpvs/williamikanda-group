"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, GraduationCap, ShieldCheck, Globe2 } from "lucide-react";
import ServiceModal, { Service } from "./ServiceModal";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const BRAND = { red: "#cd142a" };

/* Motion variants */
const wrap = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const services: Service[] = [
  {
    name: "Elite Training",
    desc: "UEFA-licensed coaches, position-specific drills, and video analysis for measurable progress.",
    Icon: Trophy,
    images: [
      "/Elitetraining.jpeg",
      "/Elitetraining2.jpeg",
      "/Elitetraining3.jpeg",
      "/Elitetraining4.jpeg",
      "/Elitetraining5.jpeg",
      "/Elitetraining6.jpeg",
      "/Elitetraining7.jpeg",
      "/Elitetraining8.jpeg",
    ],
    details: [
      "Position training: GK, Defense, Midfield, Attack",
      "Weekly video feedback & performance tracking",
      "Micro/macro cycles with clear milestones",
      "Fitness, agility, and injury-prevention blocks",
      "Individual Development Plans (IDP) for each player",
    ],
  },
  {
    name: "Academy Admissions",
    desc: "Trials, age-group placements (U7–U18), and tailored development plans for each athlete.",
    Icon: GraduationCap,
    images: [
      "/team.jpeg",
      "/admission2.jpeg",
      "/admission.jpeg",
      "/admission3.jpeg",
      "/admission5.jpeg",
      "/admission6.jpeg",
      "/player.jpeg",
    ],
    details: [
      "Open & invitation-only trials throughout the season",
      "Transparent placement to the right age & level",
      "Parent onboarding & monthly progress reports",
      "Scholarship consideration for top prospects",
      "Code of conduct & safeguarding briefings",
    ],
  },
  {
    name: "Player Care & Safety",
    desc: "Sports physio guidance, recovery protocols, and safe, structured sessions on pro-grade turf.",
    Icon: ShieldCheck,
    images: ["/medical.jpeg", "/injury.jpg"],
    details: [
      "On-site first aid & physio consultation slots",
      "RICE protocol & return-to-play supervision",
      "Hydration & recovery guidelines per session",
      "Heat policies & wet-weather alternatives",
      "Insurance & emergency coverage guidance",
    ],
  },
  {
    name: "International Pathways",
    desc: "Showcases, scouting links, and scholarship guidance across the UAE, Europe, and Africa.",
    Icon: Globe2,
    images: [
      "/internatinal.jpeg",
      "/international3.jpeg",
      "/admition.jpg",
      "/elit.jpg",
    ],
    details: [
      "Showcase events with pro scouts & universities",
      "CV, highlights, and reference letter support",
      "Trial logistics & pre-trial preparation plans",
      "Visa/relocation advisory via trusted partners",
      "Academic-athletic pathway counselling",
    ],
  },
];

export default function SectionServices() {
  const [open, setOpen] = useState<Service | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {/* Navbar on non-home pages with standard spacing and responsive stickiness */}
      {!isHome && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}

      <section
        id="services"
        className="
          container-pad 
          py-14 md:py-18 lg:py-20 
          scroll-mt-28
        "
      >
        {/* standard distance after navbar */}
        {!isHome && <div className="mt-4 md:mt-6" />}

        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-3 text-black dark:text-white text-center"
          >
            Services
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-center text-black/70 dark:text-white/70 max-w-2xl mx-auto mb-8 md:mb-10"
          >
            We provide world-class football development with a clear pathway
            from grassroots to the professional game.
          </motion.p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <motion.button
                key={s.name}
                type="button"
                onClick={() => setOpen(s)}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="
                  group relative text-left rounded-2xl overflow-hidden w-full
                  bg-white dark:bg-neutral-900/70
                  border border-black/10 dark:border-white/10
                  shadow-[0_6px_30px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_10px_36px_rgba(205,20,42,0.18)]
                  transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cd142a]
                "
              >
                {/* top pill accent */}
                <span
                  className="absolute -top-1 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full"
                  style={{ background: BRAND.red }}
                />

                {/* cover image (first if multi) */}
                <div className="relative h-40 sm:h-44 md:h-48 w-full">
                  <Image
                    src={
                      s.images?.[0] ??
                      (s as any).image ??
                      "/services/placeholder.jpg"
                    }
                    alt={s.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-xl"
                      style={{
                        background: "rgba(205,20,42,0.10)",
                        border: "1px solid rgba(205,20,42,0.28)",
                      }}
                    >
                      <s.Icon className="h-6 w-6" color={BRAND.red} />
                    </div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {s.name}
                    </h3>
                  </div>

                  <p className="text-sm md:text-[15px] leading-relaxed text-black/70 dark:text-white/75">
                    {s.desc}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 text-[#cd142a] font-semibold">
                    Learn more
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modal kept separate */}
      <ServiceModal open={open} onClose={() => setOpen(null)} />
    </>
  );
}
