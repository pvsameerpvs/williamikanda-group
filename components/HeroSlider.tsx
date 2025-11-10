"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { ArrowBigRightDash, Target, Triangle, Medal } from "lucide-react";
import React from "react";

export default function HeroLanding() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // start paused by default
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Keep the real media element in sync with state
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.muted = true; // keep muted for mobile play
      v.play().catch(() => setIsPlaying(false));
    } else {
      v.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying((s) => !s);

  return (
    <section className="relative overflow-x-hidden">
      <Navbar />

      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/herobg.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25),rgba(0,0,0,0.85))]" />
        <div className="absolute inset-3 ring-1 ring-white/10 rounded-[28px] pointer-events-none" />
      </div>

      <div className="container-pad mx-auto max-w-7xl pt-6 md:pt-10 lg:pt-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* left copy */}
          <div className="relative md:z-[100] text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-extrabold leading-[0.95] text-[clamp(32px,8vw,72px)]"
            >
              <span className="block">BECOME A</span>
              <span className="block [text-shadow:_0_2px_0_rgba(0,0,0,0.4)]">
                <span className="pr-3">STAR</span>
                <span className="text-transparent stroke-white">
                  FOOTBALLER
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="mt-4 text-white/80 text-[clamp(14px,2.5vw,18px)] max-w-[55ch]"
            >
              With professional world-class player
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-7"
            >
              <Link
                href="/contact"
                className="
                  group inline-flex items-center gap-2
                  font-normal text-[clamp(14px,2.5vw,18px)]
                  transition-all  transform will-change-transform
                  hover:scale-[1.03]
                "
              >
                <span
                  className="
                     text-white font-extrabold
    group-hover:scale-105
    transition-transform duration-300
                  "
                >
                  Start Training Now
                </span>

                <ArrowBigRightDash
                  className="
                    h-4 w-4 mt-[1px] text-white/90
                    transition-transform duration-500 will-change-transform
                    group-hover:translate-x-[10px]
                  "
                />
              </Link>

              <style jsx>{`
                @keyframes gradientFlow {
                  0% {
                    background-position: 0% center;
                  }
                  50% {
                    background-position: 100% center;
                  }
                  100% {
                    background-position: 0% center;
                  }
                }
                .animate-gradientFlow {
                  animation: gradientFlow 4s ease-in-out infinite;
                }
              `}</style>
            </motion.div>
          </div>

          {/* right: video card (same wrapper) */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/15 backdrop-blur-md"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              {/* native video */}
              <video
                ref={videoRef}
                src="/herovid.mp4"
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
              />

              {/* always-on subtle fade; stronger when paused */}
              <div
                className="
                  pointer-events-none absolute inset-0 transition-opacity duration-300
                  bg-black
                "
                style={{
                  opacity: isPlaying ? 0.12 : 0.35,
                  mixBlendMode: "multiply" as any,
                }}
              />
            </div>

            {/* play / pause button (unchanged UI, just wired to state) */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/90 text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:scale-105 transition"
            >
              {isPlaying ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </motion.div>
        </div>

        {/* bottom: three feature cards */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard
            title="Self improvement"
            body="Every footballer getting better version of myself"
            icon="target"
          />
          <FeatureCard
            title="Originality"
            body="We appreciate & develop individual characteristics footballer"
            icon="triangle"
          />
          <FeatureCard
            title="Professionals"
            body="Every footballer is constantly sets new goals & achieves them"
            tag="PRO"
          />
        </div>
      </div>
    </section>
  );
}

/* -------- FeatureCard (unchanged) -------- */
const ICONS = { target: Target, triangle: Triangle, medal: Medal } as const;
type IconKey = keyof typeof ICONS;

function FeatureCard({
  title,
  body,
  tag,
  icon,
}: {
  title: string;
  body: string;
  tag?: string;
  icon?: IconKey;
}) {
  const ResolvedIcon = icon
    ? ICONS[icon]
    : tag?.toUpperCase() === "PRO"
    ? Medal
    : null;

  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl p-5 sm:p-6 min-h-[150px] text-white
                 bg-white/10 backdrop-blur-md ring-1 ring-white/20
                 hover:bg-white/12 hover:translate-y-[-2px] transition
                 shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
    >
      {tag && (
        <span className="absolute right-3 top-3 sm:right-4 sm:top-4 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md bg-white/90 text-neutral-900">
          {tag}
        </span>
      )}

      {ResolvedIcon && (
        <div className="mb-3 opacity-90">
          <ResolvedIcon width={26} height={26} />
        </div>
      )}

      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-white/80">{body}</p>

      <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(to_top,black,transparent_70%)] bg-gradient-to-t from-black/25 to-transparent" />
    </motion.div>
  );
}
