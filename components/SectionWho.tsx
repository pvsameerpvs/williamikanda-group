"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* ----------------------------- Motion Variants ----------------------------- */
const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SectionWho() {
  const prefersReduced = useReducedMotion();

  // subtle parallax tilt for the image
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-20, 20], [6, -6]);
  const rotateY = useTransform(mx, [-20, 20], [-6, 6]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    mx.set((x / r.width) * 40); // maps to -20..20
    my.set((y / r.height) * 40);
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
      variants={containerStagger}
      className="container-pad py-16 md:py-24"
      aria-labelledby="who-heading"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left image (slides in) */}
        <motion.div variants={slideLeft} className="will-change-transform">
          {/* Perspective wrapper enhances 3D tilt rendering */}
          <div
            className="rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] overflow-hidden"
            style={{ perspective: 1000 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <motion.div
              style={prefersReduced ? undefined : { rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <Image
                src="/who.jpg" // change to your image
                width={900}
                height={600}
                alt="WILLIAMIKANDA GROUP — who we are"
                className="rounded-2xl w-full h-auto object-cover select-none"
                draggable={false}
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right content (slides in) */}
        <motion.div variants={slideRight}>
          <motion.h2
            id="who-heading"
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold mb-4 text-black dark:text-white"
          >
            Who <span className="text-[#cd142a]">we are</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-black/70 dark:text-white/80 leading-7 mb-5"
          >
            <strong>WILLIAMIKANDA GROUP</strong> is a sports and development
            organization founded by <strong>Mr. William Mikanda</strong> on
            December 25, 2014, with a vision to inspire youth through football
            and faith.
            <br />
            <br />
            Our academy focuses on nurturing talent, character, and discipline,
            offering players a real pathway from grassroots to professional
            football. We operate internationally — with programs across the UAE,
            Portugal, and Africa — providing world-class training environments.
          </motion.p>

          {/* animated quote */}
          <motion.blockquote
            variants={fadeUp}
            className="relative pl-4 italic text-black/80 dark:text-white/90"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute -left-4 -top-3 text-[#cd142a] text-2xl"
            >
              “
            </motion.span>
            “We are on a mission to build champions — on the field, in faith,
            and in life.”
            <span className="not-italic text-sm font-semibold text-[#cd142a] mt-1 block">
              — WILLIAMIKANDA TEAM
            </span>
            {/* shimmer underline */}
            <span className="pointer-events-none absolute -bottom-2 left-0 h-0.5 w-28 bg-[#cd142a]/60 overflow-hidden">
              <motion.span
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: 1 }}
                className="block h-full w-full bg-white/70 mix-blend-overlay"
              />
            </span>
          </motion.blockquote>
        </motion.div>
      </div>

      {/* ------------------ Team Section (optional) ------------------
          Uncomment to enable and re-add icon imports at top.
      
      <motion.div variants={containerStagger} className="mt-16 text-center">
        <motion.h3
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold mb-10 text-black dark:text-white"
        >
          Meet Our Team
        </motion.h3>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {teamMembers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
              className="rounded-2xl p-5 border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_36px_rgba(205,20,42,0.28)] transition-all duration-300"
            >
              <Image
                src={m.image}
                alt={m.name}
                width={150}
                height={150}
                className="mx-auto mb-3 rounded-full object-cover border-2 border-[#cd142a]"
              />
              <h4 className="text-lg font-semibold text-black dark:text-white">
                {m.name}
              </h4>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                {m.role}
              </p>
              <div className="flex justify-center gap-4 text-[#cd142a]">
                <motion.a whileHover={{ y: -2 }} href={m.socials.fb} aria-label="Facebook">
                  <Facebook size={18} />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} href={m.socials.ig} aria-label="Instagram">
                  <Instagram size={18} />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} href={m.socials.li} aria-label="LinkedIn">
                  <Linkedin size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      ---------------------------------------------------------------- */}
    </motion.section>
  );
}

/* --------------------------- Team Data --------------------------- 
const teamMembers = [
  {
    name: "William Mikanda",
    role: "Founder & President",
    image: "/team/william.jpg",
    socials: { fb: "#", ig: "#", li: "#" },
  },
  {
    name: "Diana Panga",
    role: "Vice President",
    image: "/team/diana.jpg",
    socials: { fb: "#", ig: "#", li: "#" },
  },
  {
    name: "Naomi Ngoy",
    role: "Head of Academy Operations",
    image: "/team/naomi.jpg",
    socials: { fb: "#", ig: "#", li: "#" },
  },
  {
    name: "John Mbala",
    role: "Technical Director",
    image: "/team/john.jpg",
    socials: { fb: "#", ig: "#", li: "#" },
  },
];
-------------------------------------------------------------------- */
