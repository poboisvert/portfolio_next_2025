"use client";

import React, { useState, useEffect, useContext } from "react";
const ThemeContext = React.createContext("light");

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(global.window?.__theme || "light");

  const toggleTheme = () => {
    global.window.__setPreferredTheme(theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    // Script to useState component toggle
    global.window.__onThemeChange = setTheme;
  }, []);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
