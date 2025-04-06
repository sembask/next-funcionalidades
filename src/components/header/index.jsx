import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };
  return (
    <>
      <header className="container mx-auto flex justify-between items-center px-6 py-4">
        <section>
          <nav>
            <Link href="/" className="text-2xl font-bold">
              Tasks
              <span className="text-red-600 text-2xl "> + </span>
            </Link>
            <Link href="/" className="ml-6">
              Painel
            </Link>
            <Link href="/" className="ml-6">
              Documentos
            </Link>
          </nav>
        </section>
        <section className="flex items-center gap-4">
          <button className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out">
            {darkMode ? (
              <SunIcon
                className="h-5 w-5t text-white"
                onClick={toggleDarkMode}
              />
            ) : (
              <MoonIcon
                className="h-5 w-5 text-neutral-900"
                onClick={toggleDarkMode}
              />
            )}
          </button>
          <button className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out">
            <UserIcon className="h-5 w-5 text-black dark:text-white"></UserIcon>
          </button>
        </section>
      </header>
    </>
  );
}
