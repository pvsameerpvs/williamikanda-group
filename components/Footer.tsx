"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const ACCENT = "#cd142a"; // brand red

  return (
    <footer
      className="
        relative
        text-black dark:text-white
        bg-white dark:bg-black
        border-t border-black/10 dark:border-white/10
        overflow-hidden
      "
    >
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute -top-28 right-[-10%] h-72 w-72 rounded-full blur-[100px] opacity-20"
        style={{ background: ACCENT }}
      />
      <div
        className="pointer-events-none absolute top-1/3 left-[-10%] h-72 w-72 rounded-full blur-[110px] opacity-15"
        style={{ background: ACCENT }}
      />

      <div className="container-pad py-12 md:py-14">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand / Intro */}
          <div>
            <h4 className="text-xl font-extrabold tracking-tight">
              WILLIAMIKANDA <span className="font-black">GROUP</span>
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
              Football • Catering • Transport • Accessories • Community
            </p>

            {/* UAE-only pill */}
            <div
              className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-black/10 dark:ring-white/15"
              style={{ background: "rgba(0,0,0,0.03)" }}
            >
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ background: ACCENT }}
              />
              <span>Operating in the UAE</span>
            </div>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              <Social href="https://instagram.com" label="Instagram">
                <Instagram size={18} />
              </Social>
              <Social href="https://facebook.com" label="Facebook">
                <Facebook size={18} />
              </Social>
              <Social href="https://youtube.com" label="YouTube">
                <Youtube size={18} />
              </Social>
              <Social href="https://williamikanda.group" label="Website">
                <Globe size={18} />
              </Social>
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-sm font-semibold tracking-wide text-black/80 dark:text-white/80">
              Company
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <FooterLink href="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink href="/services">Services</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h5 className="text-sm font-semibold tracking-wide text-black/80 dark:text-white/80">
              Sectors
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <FooterLink href="/contact#academy">
                  Football Academy
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/about#training">
                  Techlab & Training
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/services#transport">Transport</FooterLink>
              </li>

              <li>
                <FooterLink href="/contact#accessories">Accessories</FooterLink>
              </li>
            </ul>
          </div>

          {/* UAE Contact */}
          <div>
            <h5 className="text-sm font-semibold tracking-wide text-black/80 dark:text-white/80">
              Contact (UAE)
            </h5>

            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-start gap-2 text-black/70 dark:text-white/75">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Dubai, United Arab Emirates</span>
              </p>
              <p className="flex items-start gap-2 text-black/70 dark:text-white/75">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <a href="tel:+971565822845" className="hover:underline">
                  +971565822845
                </a>
              </p>
              <p className="flex items-start gap-2 text-black/70 dark:text-white/75">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <a href="tel:+971507084372" className="hover:underline">
                  +971507084372
                </a>
              </p>
              <p className="flex items-start gap-2 text-black/70 dark:text-white/75">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <a href="tel:+971543190427" className="hover:underline">
                  +971543190427
                </a>
              </p>
              <p className="flex items-start gap-2 text-black/70 dark:text-white/75">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a
                  href="mailto:williamikanda9@gmail.com"
                  className="hover:underline"
                >
                  williamikanda9@gmail.com
                </a>
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="
                mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                bg-white text-neutral-900 hover:bg-neutral-100
                dark:bg-white dark:text-neutral-900
                ring-2 shadow-sm transition
              "
              style={{ borderColor: ACCENT }}
            >
              Get in touch
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* bottom bar */}
    </footer>
  );
}

/* ---------- small helpers ---------- */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group inline-flex items-center gap-1 text-black/70 dark:text-white/75
        hover:text-black dark:hover:text-white transition
      "
    >
      <span className="relative">
        {children}
        <span
          className="absolute left-0 -bottom-0.5 block h-px w-0 bg-current transition-all duration-300 group-hover:w-full"
          aria-hidden
        />
      </span>
    </Link>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="
        grid h-9 w-9 place-items-center rounded-full
        ring-1 ring-black/10 dark:ring-white/15
        bg-white text-neutral-900
        hover:-translate-y-0.5 hover:shadow transition
        dark:bg-white dark:text-neutral-900
      "
      style={{ boxShadow: "0 8px 18px rgba(0,0,0,0.12)" }}
    >
      {children}
    </a>
  );
}
