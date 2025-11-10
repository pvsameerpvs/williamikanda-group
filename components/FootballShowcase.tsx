"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ScheduleModal from "./ScheduleModal";
import JoinTrialsModal from "./JoinTrialsModal";

const BRAND = { maroon: "#5B0C11" };

/* --------------------------- Simple theme toggler -------------------------- */
function useThemeClass() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Read initial state from <html class="dark"> (set by ThemeInitScript below)
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
  };

  return { theme, toggle };
}

function ThemeToggle() {
  const { theme, toggle } = useThemeClass();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ring-1 ring-black/10 dark:ring-white/20 text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="i">{theme === "dark" ? "🌙" : "☀️"}</span>
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}

/* --------------------------- Sortable diamond tile -------------------------- */
function SortableDiamond({ id, src }: { id: string; src: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={[
        "group relative aspect-square w-28 sm:w-32 md:w-40 lg:w-44",
        "rotate-45 overflow-hidden rounded-[22px]",
        "bg-white/70 dark:bg-white/5",
        isDragging ? "ring-2 ring-[#5B0C11]/60 dark:ring-[#5B0C11]/70" : "",
      ].join(" ")}
    >
      {/* Counter-rotate inner so the image is upright */}
      <div className="absolute inset-0 -rotate-45">
        <Image
          src={src}
          alt="AL WILLIAMIKANDA FC showcase image"
          fill
          sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, (max-width: 1024px) 10rem, 11rem"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          priority={false}
        />
        {/* subtle vignette for both themes */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/10 via-transparent to-black/10" />
      </div>
    </div>
  );
}

/* ------------------------------- Main section ------------------------------ */
export default function FootballShowcase({
  images = [
    "/gallary1.jpeg",
    "/gallary2.jpeg",
    "/gallary3.jpeg",
    "/gallary4.jpeg",
    "/gallary5.jpeg",
    "/gallary6.jpeg",
    "/gallary7.jpeg",
    "/coach.jpeg",
    "/gallary9.jpeg",
    "/internatinal8.jpeg",
  ],
  onOrderChange,
}: {
  images?: string[];
  onOrderChange?: (order: string[]) => void;
}) {
  // Use stable numeric ids "0","1","2",... to map directly to images[index]
  const initial = images.slice(0, 10).map((_, i) => String(i));
  const [order, setOrder] = useState<string[]>(initial);
  const [open, setOpen] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  // Professional sample schedule (edit or replace with your data)
  const scheduleData: Array<{
    city: string;
    venue: string;
    date: string;
    time: string;
    note?: string;
  }> = [
    {
      city: "Dubai",
      venue: "Al Quoz Sports Complex",
      date: "Sat, 14 Jun 2025",
      time: "09:00–12:00",
      note: "U17 & U19",
    },
    {
      city: "Dubai",
      venue: "Dubai Sports City – Pitch 5",
      date: "Fri, 20 Jun 2025",
      time: "17:30–20:30",
      note: "Open Trials 15–30",
    },
    {
      city: "Lisbon",
      venue: "Estádio Universitário – Field B",
      date: "Sat, 28 Jun 2025",
      time: "10:00–13:00",
      note: "Portugal intake",
    },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));
    const next = arrayMove(order, oldIndex, newIndex);
    setOrder(next);
    onOrderChange?.(next.map((id) => images[Number(id)]));
  }

  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950 py-8 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-3 md:px-6">
        {/* Header / Highlight */}
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              AL WILLIAMIKANDA FC Trials & Showcase
            </h2>
            <p className="mt-2 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-[rgba(91,12,17,0.12)] dark:bg-[rgba(91,12,17,0.25)]"
                style={{ color: BRAND.maroon }}
              >
                2025–2026 Season Update
              </span>
              <br />
              WILLIAMIKANDA Group has launched its own football club in Dubai
              and Portugal called <strong>AL WILLIAMIKANDA FC</strong>.
              Footballers aged <strong>15–30</strong> interested in joining our
              trials can contact us directly for details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenJoin(true)}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors duration-300 hover:opacity-95"
              style={{ backgroundColor: BRAND.maroon }}
            >
              Join Trials
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-black/10 dark:ring-white/20 text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              View Schedule
            </button>
          </div>
        </div>

        {/* Diamond Grid */}
        <div className="mt-8 md:mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-5 md:gap-6 place-items-center">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={order} strategy={rectSortingStrategy}>
              {order.map((id) => (
                <SortableDiamond key={id} id={id} src={images[Number(id)]} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      <ScheduleModal
        open={open}
        onClose={() => setOpen(false)}
        schedule={scheduleData}
      />
      <JoinTrialsModal open={openJoin} onClose={() => setOpenJoin(false)} />
    </section>
  );
}
