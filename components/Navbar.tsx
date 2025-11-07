"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  // Animation presets
  const bar = {
    hidden: { y: -24, opacity: 0, scale: 0.98 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };
  const items = {
    hidden: { opacity: 0, y: 8 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.07 * i, duration: 0.32, ease: "easeOut" },
    }),
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Conatct" },
  ];

  return (
    <header className="z-50 py-6">
      <div className="container-pad">
        {/* Desktop bar */}
        <motion.nav
          variants={bar}
          initial="hidden"
          animate="show"
          className={clsx(
            "hidden md:flex items-center justify-between",
            "h-14 md:h-16 mt-3",
            "rounded-2xl text-white",
            "ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] px-3 md:px-4"
          )}
          style={{
            backgroundColor: "rgba(218, 2, 14, 0.35)", // 💡 transparent soft red
          }}
        >
          {/* Left: brand */}
          <motion.div variants={items} custom={0} className="pl-1 md:pl-2">
            <Link href="/" className="inline-flex items-center">
              <span
                className="
                  font-extrabold tracking-tight 
                  text-base sm:text-lg md:text-xl
                  max-w-[50vw] md:max-w-none truncate
                "
                title="WILLIAMIKANDA GROUP."
              >
                WILLIAMIKANDA<span className="opacity-90">GROUP</span>
                <span className="text-white">.</span>
              </span>
              <span className="sr-only">Home</span>
            </Link>
          </motion.div>

          {/* Center: links */}
          <div className="relative hidden sm:flex items-center gap-1 md:gap-2 lg:gap-3">
            {links.map((l, i) => {
              const isActive = pathname === l.href;
              const isHover = hoverIdx === i;
              return (
                <motion.div key={l.href} variants={items} custom={i + 1}>
                  <Link
                    href={l.href}
                    className={clsx(
                      "relative inline-flex items-center px-3 md:px-4 py-2 text-sm tracking-tight transition",
                      isActive
                        ? "font-bold text-white"
                        : "font-semibold text-white/90 hover:text-white"
                    )}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {(isActive || isHover) && (
                      <motion.span
                        layoutId="nav-bubble"
                        className="absolute inset-[-8px_-12px] md:inset-[-8px_-14px] rounded-full bg-white/10 ring-1 ring-white/15 shadow-[0_6px_18px_rgba(0,0,0,0.25)]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right: search | sign in | CTA */}
          <div className="flex items-center gap-2 md:gap-3 pr-2 md:pr-3">
            <motion.button
              variants={items}
              custom={links.length + 1}
              aria-label="Search"
              className="grid place-items-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/15 ring-1 ring-white/20 hover:bg-white/20 transition"
            >
              <Search size={18} />
            </motion.button>

            <div className="hidden sm:block h-6 w-px bg-white/25" aria-hidden />

            <motion.div
              variants={items}
              custom={links.length + 2}
              className="hidden sm:block"
            >
              <Link
                href="/signin"
                className="text-sm font-semibold text-white/90 hover:text-white"
              >
                Sign in
              </Link>
            </motion.div>
            <ThemeToggle />
            <motion.div variants={items} custom={links.length + 3}>
              <Link
                href="/join"
                className={clsx(
                  "inline-flex items-center justify-center h-9 md:h-10 px-3.5 md:px-4 rounded-xl",
                  "bg-white text-neutral-900 text-sm font-semibold",
                  "ring-1 ring-black/10 shadow-[0_10px_22px_rgba(0,0,0,0.25)]",
                  "hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.28)] transition"
                )}
              >
                Become a member
              </Link>
            </motion.div>
          </div>
        </motion.nav>

        {/* Mobile top row */}
        <motion.div
          variants={bar}
          initial="hidden"
          animate="show"
          className={clsx(
            "md:hidden flex items-center justify-between h-12 mt-3",
            "rounded-xl text-white",
            "ring-1 ring-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.32)] px-3"
          )}
          style={{
            backgroundColor: "rgba(218, 2, 14, 0.35)", // 💡 transparent soft red
          }}
        >
          <Link href="/" className="inline-flex items-center">
            <span
              className="text-base font-extrabold tracking-tight max-w-[60vw] truncate"
              title="WILLIAMIKANDA GROUP."
            >
              WILLIAMIKANDA GROUP<span className="text-white">.</span>
            </span>
            <span className="sr-only">Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="grid place-items-center h-10 w-10 rounded-full bg-white/15 ring-1 ring-white/20"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setOpen((s) => !s)}
              className={clsx(
                "h-10 w-10 grid place-items-center rounded-full ring-1 ring-white/20 transition",
                open ? "bg-white/20" : "bg-white/15 hover:bg-white/20"
              )}
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <Menu />
            </button>
          </div>
        </motion.div>

        {/* Mobile drawer (kept as-is) */}
        {open && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={clsx(
              "md:hidden mt-2 p-3 rounded-2xl text-white ring-1 ring-white/20 space-y-1",
              "bg-black/40 backdrop-blur-md shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            )}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "block rounded-xl px-4 py-3 transition",
                  pathname === l.href
                    ? "bg-white/20 font-bold"
                    : "bg-white/10 hover:bg-white/15 font-semibold"
                )}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="font-semibold"
              >
                Sign in
              </Link>
              <Link
                href="/join"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-white text-neutral-900 text-sm font-semibold"
              >
                Become a member
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
