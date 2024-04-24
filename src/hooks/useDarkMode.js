import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    document.querySelector("html").classList.contains("dark"),
  );

  useEffect(() => {
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };

    const darkModeToggle = document.querySelector("#dark-mode-toggle");
    darkModeToggle.addEventListener("click", toggleDarkMode);

    return () => {
      darkModeToggle.removeEventListener("click", toggleDarkMode);
    };
  }, [isDarkMode]);

  return { isDarkMode };
}
