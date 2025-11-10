import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n";
import WhatsAppFab from "@/components/WhatsAppFab"; // ⬅️ add this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WILLIAMIKANDA GROUP",
  description: "Premium sports & services organization since 2014.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-black dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <I18nProvider>
            {/* <div className="pt-6">
              <Navbar />
            </div> */}
            <main>{children}</main>
            <Footer />
            {/* Floating WhatsApp button */}
            <WhatsAppFab
              phone="+971 565822845" // ⬅️ put your full number (digits only, with country code)
              message="Hi WILLIAMIKANDA GROUP! I’m interested in your academy."
            />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
