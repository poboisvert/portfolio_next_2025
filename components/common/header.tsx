import React from "react";
import NextLink from "@/components/common/nextlink";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/context/ThemeContext";
import { profile } from "@/lib/content";
import { getProfileGitHub } from "@/lib/fetch";
import SpotifyModal from "./spotify";

const ThemeToggleButton = dynamic(
  () => import("@/components/common/toggleTheme")
);

const Header = async () => {
  const data = await getProfileGitHub();
  return (
    <header className='sticky top-0 w-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 dark:bg-midnight light:bg-lightgray bg-lightgray z-[50] rounded-lg'>
      <div className='flex flex-wrap items-center w-full'>
        {/* dark mode - without text - icons only */}
        <div className='p-2 text-gray-800 rounded-lg flex items-center w-full justify-between'>
          <div className='flex flex-row flex-wrap items-center'>
            <NextLink
              href='https://portfolio-next14-sandy.vercel.app/'
              className='flex flex-row items-center focus-outline'
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
                {profile.websiteTitle}
              </span>
            </NextLink>
          </div>

          <div className='flex flex-row flex-wrap items-center'>
            <span className='px-2 mr-2 border-r border-gray-800'>
              <SpotifyModal />
            </span>

            <span className='px-1 hover:text-white cursor-pointer dark:bg-gray-800 bg-gray-200 rounded-full'>
              <i className='w-8 p-2'>
                <ThemeProvider>
                  <ThemeToggleButton />
                </ThemeProvider>
              </i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
