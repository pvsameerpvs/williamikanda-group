"use client";
import React from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useAnimation,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

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
    <>
      {!isHome && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}

      <section
        className={[
          "relative overflow-hidden transition-colors pt-0 duration-500 bg-white dark:bg-neutral-900",
          isHome
            ? "min-h-[calc(100dvh-64px)] md:min-h-[calc(100svh-64px)] flex"
            : "",
        ].join(" ")}
        aria-labelledby="about-heading"
      >
        {!isHome && <div className="mt-4 md:mt-6" />}

        <BackgroundDecor />

        <div
          className={[
            "container-pad w-full grid md:grid-cols-2 gap-10 md:gap-14 items-center",
            isHome ? "py-12 md:py-0" : "py-16 md:py-20",
          ].join(" ")}
        >
          {/* LEFT: centered text + balls */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative text-black dark:text-white"
          >
            <BallsClusterLeft />

            <div className="relative z-10 mx-auto max-w-2xl ">
              <h2
                id="about-heading"
                className="text-3xl md:text-4xl font-bold tracking-tight text-center"
              >
                About Us
              </h2>
              <p className="mt-4 md:mt-5 leading-8 text-black/70 dark:text-white/80 text-sm md:text-[15px]">
                {t.about.content ??
                  "The world’s sporting ecosystem is shifting from opaque and centralized to transparent and data-driven. At WILLIAMIKANDA GROUP, we believe in disciplined training, measurable progress, and community impact—using technology and care to build real pathways for talent."}
              </p>
            </div>
          </motion.div>

          {/* RIGHT: image + balls */}
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
                  src="/about.jpeg"
                  alt="About"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent dark:from-black/50" />
              </div>

              <BallsClusterRight />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ----------------------------- Background Decor ----------------------------- */
function BackgroundDecor() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)] bg-black/5 dark:bg-white/5" />
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
/** DX-Ball style: click/tap any ball to bounce fast around screen edges, then return */
function Ball({
  size,
  className,
  floatDelay = 0,
  speed = 2.2, // idle bob speed
  rotate = false,
  parallaxY,
}: {
  size: number;
  className?: string;
  floatDelay?: number;
  speed?: number;
  rotate?: boolean;
  parallaxY?: number;
}) {
  const prefersReduced = useReducedMotion();
  const [free, setFree] = React.useState(false);
  const shellRef = React.useRef<HTMLDivElement | null>(null);

  // viewport position when in free mode
  const [pos, setPos] = React.useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // velocity in px/s
  const vel = React.useRef({ vx: 680, vy: 620 }); // FAST
  const last = React.useRef<number | null>(null);
  const sizeRef = React.useRef({ w: size, h: size });

  // spring back controls
  const springControls = useAnimation();

  const startRun = React.useCallback(
    (ev?: React.MouseEvent) => {
      if (prefersReduced || free) return;
      const shell = shellRef.current;
      if (!shell) return;

      const rect = shell.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };

      setPos({ top: rect.top, left: rect.left });
      setFree(true);

      // initial direction: from click vector or random
      const angle = ev
        ? Math.atan2(
            ev.clientY - (rect.top + rect.height / 2) || 1,
            ev.clientX - (rect.left + rect.width / 2) || 1
          )
        : Math.random() * Math.PI * 2;

      const speedMag = 820; // even faster burst
      vel.current = {
        vx: Math.cos(angle) * speedMag,
        vy: Math.sin(angle) * speedMag,
      };
      last.current = null;

      // stop after a while and spring back
      window.setTimeout(() => setFree(false), 3800);
    },
    [free, prefersReduced]
  );

  // RAF loop for bouncing when free
  React.useEffect(() => {
    if (!free) return;
    let raf = 0;

    const tick = (ts: number) => {
      if (last.current == null) {
        last.current = ts;
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = (ts - last.current) / 1000;
      last.current = ts;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const { w, h } = sizeRef.current;

      let { left, top } = pos;
      let { vx, vy } = vel.current;

      left += vx * dt;
      top += vy * dt;

      if (left <= 0) {
        left = 0;
        vx = Math.abs(vx);
      } else if (left + w >= vw) {
        left = vw - w;
        vx = -Math.abs(vx);
      }
      if (top <= 0) {
        top = 0;
        vy = Math.abs(vy);
      } else if (top + h >= vh) {
        top = vh - h;
        vy = -Math.abs(vy);
      }

      vel.current = { vx, vy };
      setPos({ left, top });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [free, pos]);

  // when leaving free mode, spring back to origin smoothly
  React.useEffect(() => {
    if (!free) {
      springControls.start({
        x: 0,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 22 },
      });
    }
  }, [free, springControls]);

  return (
    <div
      className={["absolute", className].filter(Boolean).join(" ")}
      ref={shellRef}
    >
      {/* free-floating overlay clone while in "free" mode */}
      {free && (
        <div
          className="fixed z-[60] pointer-events-none"
          style={{
            top: pos.top,
            left: pos.left,
            width: size,
            height: size,
          }}
        >
          <motion.div
            className="will-change-transform"
            animate={{ scale: 1.02 }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              repeatType: "mirror",
            }}
          >
            <Image
              src="/animationBall.png"
              alt=""
              width={size}
              height={size}
              className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] dark:drop-shadow-[0_8px_24px_rgba(255,255,255,0.25)] select-none"
              priority
              draggable={false}
            />
          </motion.div>
        </div>
      )}

      {/* Normal in-flow ball (click to start bounce) */}
      <div className="relative">
        <motion.div
          onClick={startRun}
          onPointerDown={(e) => e.stopPropagation()}
          className="cursor-pointer"
          animate={springControls}
          whileTap={{ scale: prefersReduced ? 1 : 0.94 }}
        >
          <motion.div
            animate={prefersReduced || free ? undefined : { y: [0, -14, 0] }}
            transition={
              prefersReduced || free
                ? undefined
                : {
                    duration: speed,
                    repeat: Infinity,
                    delay: floatDelay,
                    ease: "easeInOut",
                  }
            }
            style={parallaxY && !free ? { y: parallaxY } : undefined}
          >
            <motion.div
              animate={
                rotate && !prefersReduced && !free
                  ? { rotate: [0, 8, -6, 0] }
                  : undefined
              }
              transition={
                rotate && !free
                  ? {
                      duration: speed * 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
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
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {!prefersReduced && !free && (
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
  color = "255,215,0",
  strength = 0.5,
}: {
  className?: string;
  color?: string;
  strength?: number;
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

/* ----------------------------- Left cluster (ONLY 2 BALLS) ----------------------------- */
function BallsClusterLeft() {
  const { scrollYProgress } = useScroll();
  const p1 = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const p2 = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <>
      <Glow className="-z-0 -left-12 top-10 h-44 w-44" strength={0.3} />
      <Glow className="-z-0 left-28 -top-8 h-36 w-36" strength={0.22} />

      <Ball
        size={56}
        className="-top-4 -left-4 sm:-left-6 opacity-25"
        floatDelay={0.05}
        speed={2.2}
        parallaxY={p1.get()}
      />
      <Ball
        size={72}
        className="top-20 left-14 opacity-20"
        floatDelay={0.4}
        speed={2.6}
        rotate
        parallaxY={p2.get()}
      />
    </>
  );
}

/* ----------------------------- Right cluster (ONLY 2 BALLS) ----------------------------- */
function BallsClusterRight() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <Glow className="top-4 right-6 h-28 w-28" strength={0.22} />
      <Glow className="bottom-8 right-8 h-40 w-40" strength={0.3} />

      <Ball
        size={62}
        className="top-6 right-8 opacity-30"
        floatDelay={0.15}
        speed={2.3}
      />
      <Ball
        size={48}
        className="bottom-10 right-12 opacity-35"
        floatDelay={0.35}
        speed={2.1}
        rotate
      />
    </>
  );
}
