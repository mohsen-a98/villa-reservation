import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const [theme, setTheme] = useState(
    (document.documentElement.classList.contains("dark") && "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      id="dark-mode-toggle"
      className="rounded p-1 transition hover:bg-gray-100 hover:dark:bg-gray-700"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        document.documentElement.classList.toggle("dark");
      }}
    >
      {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
    </button>
  );
}

export default DarkModeToggle;
