"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(document.documentElement.classList.contains("dark") || isDark);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 rounded-full p-2 shadow hover:scale-110 transition-transform"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? (
        <span role="img" aria-label="Light mode">🌞</span>
      ) : (
        <span role="img" aria-label="Dark mode">🌙</span>
      )}
    </button>
  );
} 