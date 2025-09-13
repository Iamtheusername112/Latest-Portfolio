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
  title: "John Doe - Full Stack Web Developer",
  description: "Experienced full stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative digital solutions.",
  keywords: "web developer, full stack, react, nextjs, javascript, portfolio",
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "John Doe - Full Stack Web Developer",
    description: "Experienced full stack web developer specializing in React, Next.js, Node.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
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
