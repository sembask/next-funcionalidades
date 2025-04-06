import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tasks Sembask</title>
        <meta name="description" content="Tasks by Sembask" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href={geistSans.style.fontFamily}
          rel="stylesheet"
          className={geistSans.className}
        />
        <link
          href={geistMono.style.fontFamily}
          rel="stylesheet"
          className={geistMono.className}
        />
      </Head>

      <main className=" container mx-auto border-t border-dashed flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
        {/* Imagem */}
        <div className="relative w-full max-w-sm h-48">
          <Image
            src="/assets/hero.png"
            alt="Dashboard"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <h2 className="text-center text-2xl font-semibold mt-6 dark:text-white">
          Sistema feito para você organizar seus estudos e tarefas
        </h2>

        <div className="flex flex-wrap sm:flex-row flex-col items-center justify-around gap-6 mt-6">
          <section>
            <span className="bg-white dark:bg-neutral-800 text-black dark:text-white border border-gray-300 dark:border-neutral-700 rounded-lg px-6 py-2 shadow-md hover:shadow-lg transition">
              + 7 mil posts
            </span>
          </section>
          <section>
            <span className="bg-white dark:bg-neutral-800 text-black dark:text-white border  border-gray-300 dark:border-neutral-700 rounded-lg px-6 py-2 shadow-md hover:shadow-lg transition">
              + 1 mil comentários
            </span>
          </section>
        </div>
      </main>
    </div>
  );
}
