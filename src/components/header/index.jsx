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
import { Button } from "@/components/ui/button";

export function Header() {
  const { data: session, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);
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
    router.push("/login"); // Redireciona para a página de login
  };

  return (
    <>
      <header
        id="header"
        className="  border-b border-dashed container mx-auto flex justify-between items-center px-6 py-4"
      >
        <section>
          <nav>
            <Link href="/" className="text-2xl font-bold">
              Tasks
              <span className="text-red-600 text-2xl "> + </span>
            </Link>
            {session && (
              <Link href="/dashboard" className="ml-6">
                Dashboard
              </Link>
            )}
            {session && (
              <Link href="/dashboard" className="ml-6">
                Documents
              </Link>
            )}
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
          {/* {session ? (
            <button
              // Link="/login"
              onClick={() => signOut()}
              className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out flex items-center flex-row-reverse gap-2"
            >
              {" "}
              Olá {session?.user?.name}
              <UserIcon className="h-5 w-5 dark"></UserIcon>
            </button> */}

          {/* Dropdown Menu para usuários logados */}

          {/* Verifica se o usuário está logado */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out flex items-center gap-2">
                  Olá {session?.user?.name}
                  <UserIcon className="h-5 w-5 dark"></UserIcon>
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
            // Redireciona para login se não estiver logado
            <button
              onClick={handleLoginRedirect}
              className="hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full p-2 transition-colors duration-300 ease-in-out"
            >
              <UserIcon className="h-5 w-5 text-black dark:text-white"></UserIcon>
            </button>
          )}
        </section>
      </header>
    </>
  );
}
