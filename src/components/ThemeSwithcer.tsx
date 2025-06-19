"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setIsDark(currentTheme === "dark");
  }, []);

  function toggleTheme() {
    const newTheme = isDark ? "light" : "dark";
    if (newTheme === "light") {
      localStorage.setItem("theme", "light");
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    setIsDark(!isDark);
  }

  return (
    <div
      onClick={toggleTheme}
      className="rounded-full cursor-pointer dark:text-white hover:scale-105 transition-all"
      aria-label="Toggle Theme"
    >
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </div>
  );
}
