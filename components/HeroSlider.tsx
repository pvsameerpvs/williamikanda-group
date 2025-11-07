"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function HeroLanding() {
  return (
    <section className="relative overflow-hidden">
      <Navbar />
      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/herobg.JPG" // <<< put a wide stadium/night image here
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25),rgba(0,0,0,0.85))]" />
        <div className="absolute inset-0 ring-1 ring-white/10 rounded-[28px] m-3 pointer-events-none" />
      </div>

      <div className="container-pad mx-auto max-w-7xl pt-12 md:pt-16 lg:pt-20 pb-12">
        {/* top row: headline + video card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* left copy */}
          <div className="text-white">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-[72px] font-extrabold leading-[0.95]"
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
              className="mt-4 text-white/80 text-lg"
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
                className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 font-semibold px-5 py-3 ring-1 ring-black/10 hover:-translate-y-0.5 hover:shadow-xl transition"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* right: video/thumb card with play button */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/15 backdrop-blur-md"
          >
            {/* use either a poster image or <video> with poster */}
            <Image
              src="/hero-video-thumb.jpg" // <<< 16:9 image. If you keep video, use a small mp4/webm
              alt="Training clip"
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
              priority
            />

            {/* play button */}
            <button
              aria-label="Play video"
              className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 grid place-items-center h-14 w-14 rounded-full bg-white/90 text-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:scale-105 transition"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* bottom: three feature cards */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
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

function FeatureCard({
  title,
  body,
  tag,
  icon,
}: {
  title: string;
  body: string;
  tag?: string;
  icon?: "target" | "triangle";
}) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl p-6 min-h-[160px] text-white
                 bg-white/10 backdrop-blur-md ring-1 ring-white/20
                 hover:bg-white/12 hover:translate-y-[-2px] transition
                 shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
    >
      {tag && (
        <span className="absolute right-4 top-4 text-xs font-bold px-2 py-1 rounded-md bg-white/90 text-neutral-900">
          {tag}
        </span>
      )}

      <div className="mb-3 opacity-90">
        {icon === "target" ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8a4 4 0 104 4h2a6 6 0 11-6-6v2z" />
          </svg>
        ) : icon === "triangle" ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l8 16H4z" />
          </svg>
        ) : null}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-white/80">{body}</p>

      {/* glassy bottom blur to mimic screenshot */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(to_top,black,transparent_70%)] bg-gradient-to-t from-black/25 to-transparent" />
    </motion.div>
  );
}
