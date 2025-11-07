"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const BRAND = { red: "#cd142a" };

export type Service = {
  name: string;
  desc: string;
  Icon: React.ComponentType<any>;
  image?: string;
  images?: string[];
  details: string[];
};

type Props = {
  open: Service | null;
  onClose: () => void;
};

export default function ServiceModal({ open, onClose }: Props) {
  const [index, setIndex] = useState(0);

  const gallery = useMemo(() => {
    if (!open) return [];
    return open.images?.length ? open.images : open.image ? [open.image] : [];
  }, [open]);

  const hasGallery = gallery.length > 0;

  const prev = useCallback(() => {
    if (!hasGallery) return;
    setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length, hasGallery]);

  const next = useCallback(() => {
    if (!hasGallery) return;
    setIndex((i) => (i + 1) % gallery.length);
  }, [gallery.length, hasGallery]);

  // Esc + arrows + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setIndex(0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="dialog"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto mt-16 w-[92vw] max-w-4xl rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
              <h4 id="service-title" className="text-lg md:text-xl font-bold">
                {open.name}
              </h4>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body: gallery + details */}
            <div className="grid md:grid-cols-2">
              {/* Gallery */}
              <div className="relative h-60 md:h-[380px] bg-black/5 dark:bg-white/5 overflow-hidden">
                {hasGallery ? (
                  <>
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.div
                        key={gallery[index]}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -50) next();
                          if (info.offset.x > 50) prev();
                        }}
                      >
                        <Image
                          src={gallery[index]}
                          alt={`${open.name} ${index + 1}`}
                          fill
                          sizes="(max-width:768px) 100vw, 50vw"
                          className="object-cover select-none pointer-events-none"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Arrows */}
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={prev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-neutral-800/90 p-2 shadow hover:scale-105 transition"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={next}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-neutral-800/90 p-2 shadow hover:scale-105 transition"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    {/* Dots */}
                    {gallery.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {gallery.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2.5 rounded-full transition-all ${
                              i === index
                                ? "w-6 bg-[#cd142a]"
                                : "w-2.5 bg-white/70 dark:bg-white/50"
                            }`}
                            aria-label={`Go to image ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="grid place-items-center h-full text-sm text-black/60 dark:text-white/60">
                    No images available
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-5 md:p-6">
                <p className="text-black/70 dark:text-white/75">{open.desc}</p>

                <ul className="mt-4 space-y-2">
                  {open.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full"
                        style={{ background: BRAND.red }}
                      />
                      <span className="text-sm md:text-[15px] leading-relaxed text-black/80 dark:text-white/80">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={onClose}
                    className="rounded-full px-4 py-2 text-sm font-semibold border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 transition"
                  >
                    Close
                  </button>
                  <a
                    href="/contact"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                    style={{
                      background: BRAND.red,
                      boxShadow: "0 6px 24px rgba(205,20,42,0.35)",
                      border: `1px solid ${BRAND.red}`,
                    }}
                  >
                    Book a Trial
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
