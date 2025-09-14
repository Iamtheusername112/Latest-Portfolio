import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminProvider } from "@/contexts/admin-context";
import ThemeTransition from "@/components/theme-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Iwu Francis - Full Stack Web Developer",
  description: "Experienced full stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative digital solutions.",
  keywords: "web developer, full stack, react, nextjs, javascript, portfolio",
  authors: [{ name: "Iwu Francis" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/favicon.svg",
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
            {children}
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
