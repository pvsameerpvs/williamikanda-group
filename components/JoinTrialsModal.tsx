"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type Slot = { id: string; x: number; y: number; label: string };
type Token = { id: string; slotId: string };

type FormationId = "4-3-3" | "4-2-3-1" | "3-5-2";

const BRAND = "#5B0C11"; // primary shirt color
const GK = "#f6c90e"; // goalkeeper color

/* -------------------------------------------------------------------------- */
/*                               Formations map                               */
/*  Coordinates are expressed as % inside the pitch container (0..100).       */
/* -------------------------------------------------------------------------- */
const FORMATIONS: Record<FormationId, Slot[]> = {
  "4-3-3": [
    { id: "gk", x: 50, y: 92, label: "GK" },
    { id: "lb", x: 16, y: 74, label: "LB" },
    { id: "lcb", x: 36, y: 72, label: "LCB" },
    { id: "rcb", x: 64, y: 72, label: "RCB" },
    { id: "rb", x: 84, y: 74, label: "RB" },
    { id: "lcm", x: 35, y: 54, label: "LCM" },
    { id: "cm", x: 50, y: 50, label: "CM" },
    { id: "rcm", x: 65, y: 54, label: "RCM" },
    { id: "lw", x: 24, y: 30, label: "LW" },
    { id: "st", x: 50, y: 24, label: "ST" },
    { id: "rw", x: 76, y: 30, label: "RW" },
  ],
  "4-2-3-1": [
    { id: "gk", x: 50, y: 92, label: "GK" },
    { id: "lb", x: 16, y: 74, label: "LB" },
    { id: "lcb", x: 36, y: 72, label: "LCB" },
    { id: "rcb", x: 64, y: 72, label: "RCB" },
    { id: "rb", x: 84, y: 74, label: "RB" },
    { id: "ldm", x: 40, y: 58, label: "LDM" },
    { id: "rdm", x: 60, y: 58, label: "RDM" },
    { id: "lam", x: 32, y: 40, label: "LAM" },
    { id: "cam", x: 50, y: 36, label: "CAM" },
    { id: "ram", x: 68, y: 40, label: "RAM" },
    { id: "st", x: 50, y: 22, label: "ST" },
  ],
  "3-5-2": [
    { id: "gk", x: 50, y: 92, label: "GK" },
    { id: "lcb", x: 30, y: 72, label: "LCB" },
    { id: "cb", x: 50, y: 70, label: "CB" },
    { id: "rcb", x: 70, y: 72, label: "RCB" },
    { id: "lwb", x: 18, y: 52, label: "LWB" },
    { id: "ldm", x: 40, y: 54, label: "LDM" },
    { id: "rdm", x: 60, y: 54, label: "RDM" },
    { id: "rwb", x: 82, y: 52, label: "RWB" },
    { id: "lam", x: 38, y: 36, label: "LAM" },
    { id: "ram", x: 62, y: 36, label: "RAM" },
    { id: "st", x: 50, y: 22, label: "ST" },
  ],
};

/* -------------------------------------------------------------------------- */
/*                              DnD primitives                                */
/* -------------------------------------------------------------------------- */
function DropSlot({
  slot,
  children,
}: {
  slot: Slot;
  children?: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: slot.id });
  return (
    <div
      ref={setNodeRef}
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
    >
      <div
        className={[
          "h-10 w-10 rounded-full border-2",
          "border-white/70 dark:border-white/30",
          isOver ? "ring-2 ring-[#5B0C11]/60" : "",
        ].join(" ")}
      />
      <div className="pointer-events-auto -mt-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

function PlayerChip({
  id,
  label,
  gk = false,
}: {
  id: string;
  label: string;
  gk?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    background: gk ? GK : BRAND,
  };
  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={[
        "rounded-full px-3 py-1.5 text-xs font-semibold",
        "text-white shadow-md select-none focus:outline-none focus:ring-2 focus:ring-white/60",
        isDragging ? "opacity-80" : "opacity-100",
      ].join(" ")}
      aria-label={`Drag ${label}`}
    >
      {label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Modal                                    */
/* -------------------------------------------------------------------------- */
export default function JoinTrialsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const [formation, setFormation] = useState<FormationId>("4-3-3");
  const [slots, setSlots] = useState<Slot[]>(FORMATIONS["4-3-3"]);
  const defaultTokens: Token[] = useMemo(
    () => slots.map((s) => ({ id: `p-${s.id}`, slotId: s.id })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formation]
  );
  const [tokens, setTokens] = useState<Token[]>(defaultTokens);

  const [fullName, setFullName] = useState("");
  const [fav, setFav] = useState<string>("st");
  const [error, setError] = useState<string>("");

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Rebuild slots & tokens on formation change
  useEffect(() => {
    const next = FORMATIONS[formation];
    setSlots(next);
    setTokens(next.map((s) => ({ id: `p-${s.id}`, slotId: s.id })));
    // pick a sensible default fav if current not present
    if (!next.find((s) => s.id === fav))
      setFav(next.find((s) => s.id !== "gk")?.id ?? next[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formation]);

  if (!open) return null;

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over) return;
    setTokens((prev) =>
      prev.map((t) =>
        t.id === active.id ? { ...t, slotId: String(over.id) } : t
      )
    );
  }

  function resetBoard() {
    setTokens(slots.map((s) => ({ id: `p-${s.id}`, slotId: s.id })));
    setFav(
      slots.find((s) => s.id === "st")?.id ||
        slots.find((s) => s.id !== "gk")?.id ||
        ""
    );
    setError("");
  }

  function submit() {
    const name = fullName.trim();
    if (!name) {
      setError("Please enter your full name.");
      return;
    }
    if (!fav) {
      setError("Please select a favourite position.");
      return;
    }
    setError("");

    // Build payload (ready for API)
    const payload = {
      name,
      favouritePosition: fav,
      formation,
      layout: tokens.map((t) => ({ id: t.id, slotId: t.slotId })),
    };

    // WhatsApp: open chat with pre-filled text to +971 565822845
    const favLabel =
      slots.find((s) => s.id === fav)?.label ?? fav.toUpperCase();
    const phone = "971565822845"; // WhatsApp requires international format without '+' or spaces
    const text = `Hi! I'd like to join trials.\nName: ${name}\nFavourite: ${favLabel}\nFormation: ${formation}`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Example: navigate to /contact with query params (kept from your code)
    const params = new URLSearchParams({
      name: payload.name,
      fav: payload.favouritePosition,
      f: formation,
    });
    window.location.href = `/contact?${params.toString()}`;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 md:p-6 overflow-y-auto"
      style={{ WebkitOverflowScrolling: "touch" as any }}
    >
      {/* Backdrop */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[1100px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-neutral-900 dark:ring-white/10 max-h-[100svh] overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 justify-between border-b border-black/5 p-4 md:p-5 dark:border-white/10">
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white truncate">
              Join Trials — Choose Your Position
            </h3>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300">
              Drag the shirts onto the pitch. Fill your name & favourite
              position, then submit.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              Formation
            </label>
            <select
              value={formation}
              onChange={(e) => setFormation(e.target.value as FormationId)}
              className="rounded-lg border border-black/10 bg-white px-2 py-1 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#5B0C11]/40 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
            >
              <option value="4-3-3">4-3-3</option>
              <option value="4-2-3-1">4-2-3-1</option>
              <option value="3-5-2">3-5-2</option>
            </select>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-full p-2 text-neutral-500 hover:bg-black/5 hover:text-neutral-700 dark:hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Content wrapper: mobile = entire modal scrolls; desktop = inner scroll */}
        <div className="h-auto md:h-[calc(92svh-84px)] overflow-visible md:overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 md:p-5 h-full overflow-x-hidden">
            {/* Left: instructions + form */}
            <div className="md:col-span-2 space-y-4 overflow-visible">
              <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 md:p-4">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                  How to select your position
                </h4>
                <ol className="list-decimal pl-4 space-y-1 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
                  <li>
                    Pick a <span className="font-semibold">formation</span> from
                    the dropdown.
                  </li>
                  <li>
                    <span className="font-semibold">Drag</span> the shirts to
                    the exact spots you like.
                  </li>
                  <li>
                    Choose your{" "}
                    <span className="font-semibold">favourite position</span>{" "}
                    from the list.
                  </li>
                  <li>
                    Enter your <span className="font-semibold">full name</span>{" "}
                    and hit <span className="font-semibold">Submit</span>.
                  </li>
                </ol>
                <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                  Tip: Goalkeeper chip is yellow. Mobile & tablet supported.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#5B0C11]/40 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Favourite Position
                </label>
                <select
                  value={fav}
                  onChange={(e) => setFav(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#5B0C11]/40 dark:border-white/10 dark:bg-neutral-800 dark:text-white"
                >
                  {slots.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/60 dark:text-red-200">
                  {error}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  onClick={resetBoard}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10"
                >
                  Reset
                </button>
                <button
                  onClick={submit}
                  className="ml-auto rounded-full bg-[#5B0C11] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#5B0C11]/90"
                >
                  Submit & Contact
                </button>
              </div>
            </div>

            {/* Right: pitch — desktop gets its own scrollable area */}
            <div className="md:col-span-3 h-full overflow-visible md:overflow-y-auto overflow-x-hidden overscroll-contain">
              <div className="md:sticky md:top-0 z-0">
                <div
                  className="relative mx-auto aspect-[2/3] w-full max-w-[560px] overflow-hidden rounded-2xl border border-black/10 bg-[url('/pitch-texture.jpg')] bg-cover bg-center dark:border-white/10"
                  style={{ backgroundColor: "#0b4e1d" }}
                >
                  {/* pitch lines */}
                  <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
                    <svg viewBox="0 0 100 150" className="h-full w-full">
                      <rect
                        x="1"
                        y="1"
                        width="98"
                        height="148"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.8"
                      />
                      <line
                        x1="1"
                        y1="75"
                        x2="99"
                        y2="75"
                        stroke="white"
                        strokeWidth="0.6"
                      />
                      <circle
                        cx="50"
                        cy="75"
                        r="9"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.6"
                      />
                      <rect
                        x="30"
                        y="1"
                        width="40"
                        height="16"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.6"
                      />
                      <rect
                        x="30"
                        y="133"
                        width="40"
                        height="16"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.6"
                      />
                    </svg>
                  </div>

                  {/* drop targets & chips */}
                  <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    {slots.map((s) => {
                      const token = tokens.find((t) => t.slotId === s.id);
                      return (
                        <DropSlot key={s.id} slot={s}>
                          {token && (
                            <PlayerChip
                              id={token.id}
                              label={s.label}
                              gk={s.id === "gk"}
                            />
                          )}
                        </DropSlot>
                      );
                    })}
                  </DndContext>
                </div>
                <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400 px-2">
                  Drag any shirt to try different roles. GK is yellow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
