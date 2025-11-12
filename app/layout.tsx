import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n";
import WhatsAppFab from "@/components/WhatsAppFab";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WILLIAMIKANDA GROUP",
  description: "Premium sports & services organization since 2014.",
  // Use logo.png for all icons
  icons: {
    icon: [
      { url: "/logo.png" }, // standard favicon
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: ["/logo.png"],
    apple: [
      { url: "/logo.png" }, // Apple touch icon
    ],
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Extra links for widest browser support (optional but safe) */}
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>

      <body
        className={`${inter.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <I18nProvider>
            {/* <div className="pt-6">
              <Navbar />
            </div> */}
            <main>{children}</main>
            <Footer />
            {/* Floating WhatsApp button */}
            <WhatsAppFab
              phone="+971 565822845" // full number with country code
              message="Hi WILLIAMIKANDA GROUP! I’m interested in your academy."
            />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
