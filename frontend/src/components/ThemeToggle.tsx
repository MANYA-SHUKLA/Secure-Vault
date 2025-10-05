"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Simple theme toggle: toggles `dark` class on <html> and persists preference
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // Load preference
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    
    if (initialDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    setIsDark(initialDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    
    if (next) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center gap-1 rounded-md border border-gray-200 dark:border-neutral-700 px-2 py-1 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all duration-200 hover:shadow-sm hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4 transition-transform group-hover:rotate-12" /> : <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
