"use client";

import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    theme: mounted ? theme : "system",
    setTheme,
    systemTheme: mounted ? systemTheme : "light",
    resolvedTheme: mounted ? resolvedTheme : "light",
    mounted,
  };
}
