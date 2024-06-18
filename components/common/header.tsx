import React from "react";
import NextLink from "@/components/common/nextlink";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/context/ThemeContext";
import { getProfileGitHub } from "@/lib/fetch";

const ThemeToggleButton = dynamic(
  () => import("@/components/common/toggleTheme"),
  {
    ssr: false,
  }
);

const Header = async () => {
  const data = await getProfileGitHub();
  return (
    <header className='sticky top-0 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 dark:bg-midnight light:bg-light bg-white z-[50]'>
      <NextLink
        href='/'
        className='flex flex-row items-center focus-outline'
        label='juliomalves.dev'
      >
        <Image
          alt='Pierre-Olivier Boisvert'
          className='w-12 h-auto border-2 border-neon-blue dark:border-green rounded-full'
          src={data.avatar_url}
          width='48'
          height='48'
          priority={true}
        />
        <span className='pl-3 text-neon-blue dark:text-green text-xl font-semibold'>
          poboisvert.dev
        </span>
      </NextLink>
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    </header>
  );
};

export default Header;
