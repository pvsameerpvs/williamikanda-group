"use client";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePathname } from "next/navigation";

/* ----------------------------- Anim helpers ----------------------------- */
const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const slideRight = {
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
};

export default function SectionAbout() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <section
      className={[
        "relative overflow-hidden transition-colors pt-0 duration-500 bg-white dark:bg-neutral-900",
        isHome
          ? "min-h-[calc(100dvh-64px)] md:min-h-[calc(100svh-64px)] flex"
          : "",
      ].join(" ")}
      aria-labelledby="about-heading"
    >
      {/* Background: soft grid + vignette */}
      <BackgroundDecor />

      <div
        className={[
          "container-pad w-full grid md:grid-cols-2 gap-10 md:gap-14 items-center",
          isHome ? "py-12 md:py-0" : "py-16 md:py-20",
        ].join(" ")}
      >
        {/* LEFT: text + decorative balls */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="relative text-black dark:text-white"
        >
          <BallsClusterLeft />

          <div className="relative z-10">
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              About Us
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-black/70 dark:text-white/80 text-base sm:text-lg">
              {t.about.content ??
                "The world’s sporting ecosystem is shifting from opaque and centralized to transparent and data-driven. At WILLIAMIKANDA GROUP, we believe in disciplined training, measurable progress, and community impact—using technology and care to build real pathways for talent."}
            </p>
          </div>
        </motion.div>

        {/* RIGHT: image + overlay balls */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="relative"
        >
          <div
            className="
              relative rounded-2xl overflow-hidden
              ring-1 ring-black/10 dark:ring-white/10
              shadow-[0_30px_80px_rgba(0,0,0,0.2)]
              bg-white/50 dark:bg-white/5 backdrop-blur-sm transition-all duration-500
              max-w-[720px] mx-auto
            "
          >
            <div className="relative w-full h-0 pb-[62%]">
              <Image
                src="/about.jpg"
                alt="About"
                fill
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent dark:from-black/50" />
            </div>

            {/* Balls floating over the image */}
            <BallsClusterRight />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- Background Decor ----------------------------- */
function BackgroundDecor() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {/* Vignette */}
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)] bg-black/5 dark:bg-white/5" />
      {/* Dotted grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px, 24px 24px",
          backgroundPosition: "0 0, 12px 12px",
          color: "#000",
          mixBlendMode: "normal",
        }}
      />
    </div>
  );
}

/* ----------------------------- Reusable Pieces ----------------------------- */
function Ball({
  size,
  className,
  floatDelay = 0,
  speed = 2.2,
  rotate = false,
  parallaxY,
}: {
  size: number;
  className?: string; // absolute positioning
  floatDelay?: number;
  speed?: number;
  rotate?: boolean;
  parallaxY?: number; // additional translateY from scroll
}) {
  const prefersReduced = useReducedMotion();
  return (
    <div className={["absolute", className].filter(Boolean).join(" ")}>
      <div className="relative">
        {/* PNG ball */}
        <motion.div
          animate={prefersReduced ? undefined : { y: [0, -14, 0] }}
          transition={
            prefersReduced
              ? undefined
              : {
                  duration: speed,
                  repeat: Infinity,
                  delay: floatDelay,
                  ease: "easeInOut",
                }
          }
          style={parallaxY ? { y: parallaxY } : undefined}
        >
          <motion.div
            animate={
              rotate && !prefersReduced ? { rotate: [0, 8, -6, 0] } : undefined
            }
            transition={
              rotate
                ? { duration: speed * 1.6, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <Image
              src="/animationBall.png"
              alt=""
              width={size}
              height={size}
              className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] dark:drop-shadow-[0_8px_24px_rgba(255,255,255,0.25)] select-none"
              priority
            />
          </motion.div>
        </motion.div>
        {/* Shadow pulse */}
        {!prefersReduced && (
          <motion.div
            className="mx-auto mt-1 h-2 w-16 rounded-full bg-black/25 dark:bg-black/40 blur-md"
            animate={{ opacity: [0.32, 0.18, 0.32] }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay: floatDelay,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </div>
  );
}

function Glow({
  className,
  color = "255,215,0", // gold
  strength = 0.5,
}: {
  className?: string;
  color?: string; // r,g,b
  strength?: number; // 0..1
}) {
  return (
    <div
      aria-hidden
      className={[
        "absolute rounded-full blur-2xl pointer-events-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        background: `radial-gradient(60% 60% at 50% 50%, rgba(${color},${Math.min(
          0.6,
          strength + 0.2
        )}), rgba(${color},${Math.max(
          0.08,
          strength - 0.25
        )}) 60%, transparent 70%)`,
        opacity: 0.9,
      }}
    />
  );
}

/* ----------------------------- Left cluster ----------------------------- */
function BallsClusterLeft() {
  const { scrollYProgress } = useScroll();
  // Subtle parallax for the left cluster
  const p1 = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const p2 = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <>
      {/* Glows behind text */}
      <Glow className="-z-0 -left-12 top-10 h-44 w-44" strength={0.35} />
      <Glow className="-z-0 left-28 -top-8 h-36 w-36" strength={0.25} />

      {/* 5 floating balls with varied sizes/timings */}
      <Ball
        size={44}
        className="-top-6 -left-4 sm:-left-6 opacity-20"
        floatDelay={0.0}
        parallaxY={p1.get()}
      />
      <Ball
        size={72}
        className="top-12 -left-10 sm:-left-12 opacity-20"
        floatDelay={0.35}
        speed={2.4}
      />
      <Ball
        size={54}
        className="top-28 left-20 opacity-15 hidden sm:block"
        floatDelay={0.6}
        speed={2.1}
        rotate
      />
      <Ball
        size={38}
        className="top-40 -left-2 opacity-25"
        floatDelay={0.8}
        speed={2.0}
      />
      <Ball
        size={62}
        className="top-4 left-28 opacity-15 hidden md:block"
        floatDelay={0.2}
        speed={2.6}
        parallaxY={p2.get()}
      />
    </>
  );
}

/* ----------------------------- Right cluster (over image) ----------------------------- */
function BallsClusterRight() {
  const prefersReduced = useReducedMotion();

  // Orbit animation for one ball
  const orbit = prefersReduced
    ? {}
    : {
        rotate: 360,
        transition: { duration: 16, ease: "linear", repeat: Infinity },
      };

  return (
    <>
      {/* top-right subtle glows */}
      <Glow className="top-4 right-6 h-28 w-28" strength={0.25} />
      <Glow className="bottom-8 right-8 h-40 w-40" strength={0.35} />

      {/* Floating singles */}
      <Ball
        size={42}
        className="hidden sm:block top-4 right-5 opacity-35"
        floatDelay={0.2}
        speed={2.2}
      />
      <Ball
        size={58}
        className="hidden md:block top-20 right-16 opacity-25"
        floatDelay={0.6}
        speed={2.3}
        rotate
      />
      <Ball
        size={48}
        className="bottom-10 right-8 opacity-35"
        floatDelay={0.1}
        speed={2.0}
      />

      {/* Orbit group */}
      <div className="absolute left-6 bottom-6 w-28 h-28 opacity-40">
        <motion.div
          className="relative w-full h-full"
          animate={orbit as any}
          style={{ transformOrigin: "50% 50%" }}
        >
          <div className="absolute inset-0 rounded-full ring-1 ring-white/30 dark:ring-white/10" />
          <Image
            src="/animationBall.png"
            alt=""
            width={18}
            height={18}
            className="absolute -top-2 left-1/2 -translate-x-1/2 select-none"
            priority
          />
        </motion.div>
      </div>
    </>
  );
}
