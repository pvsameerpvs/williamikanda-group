"use client";

import * as React from "react";

type WhatsAppFabProps = {
  /** Your WhatsApp phone number. Use digits only (with country code), e.g. "971501234567" */
  phone: string;
  /** Optional prefilled message */
  message?: string;
  /** Optional extra classNames for positioning/styling overrides */
  className?: string;
};

function digitsOnly(input: string) {
  return input.replace(/\D/g, "");
}

export default function WhatsAppFab({
  phone,
  message = "Hi WILLIAMIKANDA GROUP! I’d like to know more about your academy.",
  className = "",
}: WhatsAppFabProps) {
  const normalized = digitsOnly(phone);
  const href = `https://wa.me/${normalized}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={[
        "fixed right-4 bottom-4 md:right-6 md:bottom-8 z-[60]",
        className,
      ].join(" ")}
    >
      <span
        className="
          group grid place-items-center h-12 w-12 md:h-[54px] md:w-[54px]
          rounded-full
          bg-[#25D366] /* WhatsApp brand color */
          shadow-[0_6px_18px_rgba(37,211,102,0.45)]
          ring-1 ring-[#1ebe5b]/70
          hover:bg-[#1EBE5B]
          active:bg-[#19A94D]
          transition-all duration-200
          hover:scale-[1.05] active:scale-[0.96]
        "
      >
        {/* Official WhatsApp logo (white glyph, brand green background) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12.04 2C6.51 2 2 6.52 2 12.06c0 1.78.46 3.51 1.34 5.04L2 22l5.03-1.32a10.02 10.02 0 0 0 5 1.38h.02c5.53 0 10.04-4.52 10.04-10.06C22.08 6.52 17.57 2 12.04 2zm5.92 14.27c-.25.7-1.48 1.37-2.05 1.46-.53.09-1.21.13-1.98-.12-.45-.15-1.02-.32-1.75-.65a12.9 12.9 0 0 1-4.83-3.96c-.27-.32-1.14-1.51-1.14-2.88 0-1.37.72-2.06.97-2.35.25-.29.55-.36.72-.36h.51c.17 0 .39-.06.61.47.23.53.82 2 .9 2.14.08.14.12.3.03.48-.09.18-.14.28-.29.45-.14.18-.32.39-.46.52-.15.12-.31.26-.14.54.17.29.75 1.26 1.61 2.04 1.11.99 2.04 1.3 2.35 1.45.31.14.49.12.68-.07.2-.21.89-1.04 1.12-1.39.23-.35.47-.29.77-.18.31.12 1.97.95 2.31 1.11.33.16.56.25.65.38.08.15.08.85-.16 1.57z" />
        </svg>

        <span className="sr-only">Chat on WhatsApp</span>
      </span>
    </a>
  );
}
