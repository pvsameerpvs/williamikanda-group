"use client";

import { useEffect } from "react";

type Slot = {
  city: string;
  venue: string;
  date: string;
  time: string;
  note?: string;
};

export default function ScheduleModal({
  open,
  onClose,
  schedule,
}: {
  open: boolean;
  onClose: () => void;
  schedule: Slot[];
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      {/* Panel */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10">
        <div className="flex items-start justify-between gap-6 border-b border-black/5 dark:border-white/10 p-5">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Trial Schedule — AL WILLIAMIKANDA FC
            </h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              Bring valid ID and football boots. For more info, visit{" "}
              <a
                href="/contact"
                className="font-semibold text-[#5B0C11] underline-offset-4 hover:underline"
              >
                /contact
              </a>
              .
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-500 hover:bg-black/5 hover:text-neutral-700 dark:hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <ul className="divide-y divide-black/5 dark:divide-white/10">
          {schedule.map((s, i) => (
            <li key={i} className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-5">
              <div className="col-span-2">
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {s.city}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  {s.venue}
                </div>
              </div>
              <div className="sm:text-right sm:col-span-3">
                <div className="text-sm font-medium text-neutral-900 dark:text-white">
                  {s.date}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  {s.time}
                </div>
                {s.note && (
                  <div className="mt-1 inline-flex rounded-full bg-[#5B0C11]/10 px-2 py-0.5 text-[11px] font-semibold text-[#5B0C11]">
                    {s.note}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 p-5">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#5B0C11] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#5B0C11]/90"
          >
            Contact for Details
          </a>
          <button
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
