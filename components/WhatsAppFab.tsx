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
          viewBox="0 0 32 32"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path
            fill="#FFFFFF"
            d="M19.11 16.91c-.28-.14-1.64-.8-1.89-.89s-.44-.14-.62.14-.71.89-.87 1.07-.32.21-.6.07a6.56 6.56 0 0 1-1.93-1.2 7.23 7.23 0 0 1-1.34-1.67c-.14-.25 0-.38.11-.52s.25-.32.39-.49a1.67 1.67 0 0 0 .26-.42.47.47 0 0 0 0-.46c0-.14-.62-1.49-.85-2.05s-.45-.48-.62-.49h-.53a1 1 0 0 0-.71.33 3.13 3.13 0 0 0-1 2.31 5.44 5.44 0 0 0 1.16 2.9 12.43 12.43 0 0 0 4.76 4.16 16.29 16.29 0 0 0 1.6.59 3.84 3.84 0 0 0 1.76.11 2.89 2.89 0 0 0 1.89-1.33 2.38 2.38 0 0 0 .17-1.33c-.06-.13-.23-.2-.51-.34zM26.59 5.41A13 13 0 0 0 4.1 23.88L3 29l5.23-1.37A13 13 0 0 0 26.59 5.41zm-1.7 19.48a10.73 10.73 0 0 1-9.19 2.95 10.64 10.64 0 0 1-4.65-1.67l-.33-.2-3.1.8.83-3-.22-.31a10.72 10.72 0 1 1 16.66 1.73z"
          />
        </svg>

        <span className="sr-only">Chat on WhatsApp</span>
      </span>
    </a>
  );
}
