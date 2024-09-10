import React from "react";
import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className=" bg-slate-200 text-slate-900 dark:text-slate-200 dark:bg-slate-900 min-h-screen ">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
