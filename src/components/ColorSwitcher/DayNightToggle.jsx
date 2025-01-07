import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DayNightToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode to the entire document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Toggle dark mode on/off
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full  text-white shadow-lg hover:bg-slate-500 transition-all"
    >
      {isDarkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
    </button>
  );
};

export default DayNightToggle;
