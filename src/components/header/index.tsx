import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

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

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      id="header"
      className="border-b border-dashed container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 md:px-8"
    >
      {/* Logo e navegação para telas grandes */}
      <section className="flex items-center gap-4">
        {/* Logo (escondida em telas pequenas) */}
        <Link href="/" className="hidden sm:block text-2xl font-bold">
          Tasks<span className="text-red-600"> + </span>
        </Link>
        {/* Links de navegação */}
        <nav className="hidden sm:flex gap-4">
          {session && (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/documents" className="hover:underline">
                Documents
              </Link>
            </>
          )}
        </nav>
      </section>

      {/* Botão do menu hambúrguer para telas pequenas */}
      <div className="sm:hidden flex items-center absolute left-4">
        <button
          className="flex items-center justify-center p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Ícones de ações (dark mode e login/logout) */}
      <section className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button
          className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 text-white" />
          ) : (
            <MoonIcon className="h-5 w-5 text-neutral-900" />
          )}
        </button>

        {/* Dropdown Menu para usuários logados */}
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex-row-reverse hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out flex items-center gap-2">
                {session.user?.name} <UserIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer"
              >
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/settings")}
                className="cursor-pointer"
              >
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer text-red-500"
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out"
          >
            <UserIcon className="h-5 w-5 text-black dark:text-white" />
          </button>
        )}
      </section>

      {/* Menu dropdown para telas pequenas */}
      {menuOpen && (
        <div className="absolute top-14 left-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-lg p-4 z-50">
          <nav className="flex flex-col gap-4">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/documents" className="hover:underline">
              Documents
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
