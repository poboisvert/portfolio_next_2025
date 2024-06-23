"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SvgIcon from "@/components/common/svg-icon";

function ToggleTheme() {
  const [mount, setMount] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (
    <button type='button' onClick={() => toggleTheme()} className={theme}>
      {theme === "light" ? (
        <SvgIcon className='w-5 h-5' id={"icon-moon"} title={"Dark mode"} />
      ) : (
        <SvgIcon className='w-5 h-5' id={"icon-sun"} title={"Light mode"} />
      )}
      <style jsx>{`
        button {
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          /* custom styles */
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          padding: 4px;
          border-radius: 2px;
        }
        .light {
          color: #2d3748;
        }
        .dark {
          color: #f6e05e;
        }
      `}</style>
    </button>
  );
}

export default ToggleTheme;
