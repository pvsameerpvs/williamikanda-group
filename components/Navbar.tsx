"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import clsx from "clsx";
import { ThemeToggle } from "./ThemeToggle";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // search UI
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // show/hide header on scroll
  const controls = useAnimation();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastY.current && y > 40;
      lastY.current = y;
      controls.start({
        y: goingDown ? -80 : 0,
        transition: { duration: 0.25, ease: "easeOut" },
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls]);

  // focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  // --- inline "find on page" highlighter ---
  const MARK_CLASS = "js-find-mark";
  function clearMarks() {
    document.querySelectorAll(`.${MARK_CLASS}`).forEach((el) => {
      const parent = el.parentNode as Node | null;
      if (!parent) return;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
    });
  }
  function highlight(term: string) {
    clearMarks();
    if (!term.trim()) return;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node: any) {
          const p = node.parentElement as HTMLElement | null;
          if (!p) return NodeFilter.FILTER_REJECT;
          const tag = p.tagName;
          if (
            ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"].includes(tag)
          )
            return NodeFilter.FILTER_REJECT;
          if (p.closest("header") || p.closest("#mobile-drawer"))
            return NodeFilter.FILTER_REJECT;
          if (
            !node.nodeValue ||
            !node.nodeValue.toLowerCase().includes(term.toLowerCase())
          )
            return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      } as any
    );

    const ranges: Range[] = [];
    const lower = term.toLowerCase();
    let n: Node | null;
    // @ts-ignore
    while ((n = walker.nextNode())) {
      const text = (n as Text).nodeValue!;
      let start = 0;
      for (;;) {
        const idx = text.toLowerCase().indexOf(lower, start);
        if (idx === -1) break;
        const r = document.createRange();
        r.setStart(n!, idx);
        r.setEnd(n!, idx + term.length);
        ranges.push(r);
        start = idx + term.length;
      }
    }
    ranges.forEach((r) => {
      const mark = document.createElement("mark");
      mark.className = MARK_CLASS;
      mark.style.background = "transparent";
      mark.style.padding = "0";
      mark.style.color = "inherit";
      mark.style.textDecoration = "underline";
      mark.style.textDecorationColor = "#cd142a";
      mark.style.textDecorationThickness = "2px";
      mark.style.textUnderlineOffset = "2px";
      r.surroundContents(mark);
    });

    const first = document.querySelector<HTMLElement>(`.${MARK_CLASS}`);
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    highlight(query);
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    router.push(`${url.pathname}?${url.searchParams.toString()}`, {
      scroll: false,
    });
  }

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const q = sp.get("q") || "";
    if (q) {
      setQuery(q);
      setSearchOpen(true);
      setTimeout(() => highlight(q), 150);
    }
    return () => clearMarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Entrance animations
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
    { href: "/contact", label: "Contact" },
  ];

  // Background logic
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 50));

  const isNonHome = pathname !== "/";
  const wantsSolid = isNonHome || scrolled; // solid on non-home or after scroll on home

  const sharedBg = wantsSolid ? "#54090e" : "rgba(0,0,0,0)"; // same for desktop + mobile
  const desktopShadow = wantsSolid ? "0 2px 10px rgba(0,0,0,0.25)" : "none";

  return (
    <>
      {/* Fixed header wrapper */}
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none pt-3">
        <motion.div animate={controls} className="pointer-events-auto">
          <div className="container-pad">
            {/* Desktop bar (≥ lg) */}
            <motion.nav
              variants={bar}
              initial="hidden"
              animate="show"
              className={clsx(
                "hidden lg:flex items-center justify-between",
                "h-14 lg:h-16 mt-3",
                "rounded-2xl text-white",
                "px-3 lg:px-4",
                "transition-all duration-500"
              )}
              style={{
                backgroundColor: sharedBg,
                boxShadow: desktopShadow,
              }}
            >
              {/* Left: brand */}
              <motion.div variants={items} custom={0} className="pl-1 lg:pl-2">
                <Link href="/" className="inline-flex items-center">
                  {/* Circle background with small padding */}
                  <div
                    className="
    relative flex items-center justify-center
    rounded-full p-[2px] /* 1 px extra padding */
    bg-white/90 shadow-md
  "
                  >
                    <div className="relative w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] lg:w-[72px] lg:h-[72px]">
                      <Image
                        src="/logo.png"
                        alt="WILLIAMIKANDA GROUP"
                        fill
                        priority
                        sizes="(max-width:768px) 70px, 90px"
                        className="object-contain rounded-full"
                      />
                    </div>
                  </div>

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
                          "relative inline-flex items-center px-3 lg:px-4 py-2 text-sm tracking-tight transition",
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
                            className="absolute inset-[-8px_-12px] lg:inset-[-8px_-14px] rounded-full bg-white/10"
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

              {/* Right: search | theme */}
              <div className="flex items-center gap-2 lg:gap-3 pr-2 lg:pr-3">
                {/* Compact expanding search pill */}
                <div className="relative flex items-center">
                  <motion.form
                    onSubmit={onSearchSubmit}
                    initial={false}
                    animate={{
                      width: searchOpen ? 200 : 0,
                      opacity: searchOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={clsx(
                      "overflow-hidden mr-2",
                      searchOpen ? "pointer-events-auto" : "pointer-events-none"
                    )}
                  >
                    <div
                      className="h-9 lg:h-10 rounded-full flex items-center gap-2 pl-3 pr-2 bg-white/90 text-neutral-900"
                      style={{ width: 200 }}
                    >
                      <Search size={16} className="opacity-70" />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search…"
                        className="w-full bg-transparent outline-none text-sm placeholder:opacity-60"
                        aria-label="Search"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery("");
                            clearMarks();
                            inputRef.current?.focus();
                          }}
                          className="p-1 rounded-full hover:bg-black/10"
                          aria-label="Clear"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </motion.form>

                  <motion.button
                    aria-label="Search"
                    onClick={() => setSearchOpen((s) => !s)}
                    whileTap={{ scale: 0.96 }}
                    className="grid place-items-center h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-white/15 hover:bg-white/20 transition"
                    title="Search"
                  >
                    <Search size={18} />
                  </motion.button>
                </div>

                <ThemeToggle />
              </div>
            </motion.nav>

            {/* Mobile/top bar (< lg) — now matches desktop (same bg, NO ring/shadow) */}
            <motion.div
              variants={bar}
              initial="hidden"
              animate="show"
              className={clsx(
                "lg:hidden flex items-center justify-between h-12 mt-3",
                "rounded-2xl text-white px-3",
                "transition-all duration-500"
              )}
              style={{ backgroundColor: sharedBg }}
            >
              <Link href="/" className="inline-flex items-center">
                <div className="relative w-[120px] h-[36px] sm:w-[140px] sm:h-[40px]">
                  {/* Skewed background */}
                  <div
                    className="
        absolute inset-0
        bg-white/90
        skew-x-[-12deg]
        rounded-md
        shadow-md
      "
                  />
                  {/* Logo image */}
                  <Image
                    src="/logo.png" // 👈 make sure this file is in /public
                    alt="WILLIAMIKANDA GROUP"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain relative z-10"
                  />
                </div>
                <span className="sr-only">Home</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  aria-label="Search"
                  onClick={() => setSearchOpen((s) => !s)}
                  className="grid place-items-center h-10 w-10 rounded-full bg-white/15 hover:bg-white/20 transition"
                >
                  <Search size={18} />
                </button>
                <button
                  onClick={() => setOpen((s) => !s)}
                  className={clsx(
                    "h-10 w-10 grid place-items-center rounded-full transition",
                    open ? "bg-white/20" : "bg-white/15 hover:bg-white/20"
                  )}
                  aria-label="Menu"
                  aria-expanded={open}
                  aria-controls="mobile-drawer"
                >
                  <Menu size={18} />
                </button>
              </div>
            </motion.div>

            {/* Mobile expanding search pill */}
            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  onSubmit={onSearchSubmit}
                  initial={{ opacity: 0, height: 0, y: -6 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -6 }}
                  className="lg:hidden mt-2"
                >
                  <div className="rounded-xl mx-1 flex items-center gap-2 pl-3 pr-2 h-11 bg-white/90 text-neutral-900">
                    <Search size={16} className="opacity-70" />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search…"
                      className="w-full bg-transparent outline-none text-sm placeholder:opacity-60"
                      aria-label="Search"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          clearMarks();
                          inputRef.current?.focus();
                        }}
                        className="p-1 rounded-full hover:bg-black/10"
                        aria-label="Clear"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Mobile drawer */}
            <AnimatePresence>
              {open && (
                <motion.div
                  id="mobile-drawer"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={clsx(
                    "lg:hidden mt-2 p-3 rounded-2xl text-white space-y-1",
                    // Subtle glass; keep it independent of header bg
                    "bg-black/40 backdrop-blur-md"
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
                    <ThemeToggle />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </header>

      {/* Spacer to prevent content jump under fixed header */}
      <div className="h-24 lg:h-28" />
    </>
  );
}
