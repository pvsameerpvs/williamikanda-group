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

  // subtle parallax tilt for the image (desktop hover)
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
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerStagger}
      className="container-pad py-14 md:py-20"
      aria-labelledby="who-heading"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left image (slides in) */}
        <motion.div variants={slideLeft} className="will-change-transform">
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
                src="/who.jpg"
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
        <motion.div variants={slideRight} className="text-center md:text-left">
          <motion.h2
            id="who-heading"
            variants={fadeUp}
            className="
              dm-serif
              text-[clamp(24px,5vw,40px)]
              font-extrabold mb-3 text-black dark:text-white
            "
          >
            Who <span className="text-[#cd142a] not-italic">we are</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="
              smooch
              text-black/80 dark:text-white/80
              text-[clamp(14px,2.5vw,16px)]
              leading-relaxed md:leading-7
              max-w-[60ch] mx-auto md:mx-0 mb-5
            "
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
            className="
              relative
              md:pl-4
              italic text-black/85 dark:text-white/90
              max-w-[60ch] mx-auto md:mx-0
            "
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="hidden md:block absolute -left-4 -top-3 text-[#cd142a] text-2xl"
            >
              “
            </motion.span>
            <span className="not-italic tracking-tight">
              “We are on a mission to build champions — on the field, in faith,
              and in life.”
            </span>
            <span className="not-italic text-xs md:text-sm font-semibold text-[#cd142a] mt-2 block">
              — WILLIAMIKANDA TEAM
            </span>

            {/* shimmer underline */}
            <span className="pointer-events-none absolute -bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 h-0.5 w-24 md:w-28 bg-[#cd142a]/60 overflow-hidden">
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
    </motion.section>
  );
}
