import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminProvider } from "@/contexts/admin-context";
import ThemeTransition from "@/components/theme-transition";
import DynamicMetadata from "@/components/dynamic-metadata";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Iwu Francis",
  description: "Experienced full stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative digital solutions.",
  keywords: "web developer, full stack, react, nextjs, javascript, portfolio",
  authors: [{ name: "Iwu Francis" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/favicon.svg", sizes: "180x180", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.ico"
  },
  openGraph: {
    title: "Iwu Francis - Full Stack Web Developer",
    description: "Experienced full stack web developer specializing in React, Next.js, Node.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          <AdminProvider>
            <ThemeTransition />
            <DynamicMetadata />
            {children}
            <Toaster richColors position="top-right" />
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
