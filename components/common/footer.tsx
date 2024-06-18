import * as React from "react";
import NextLink from "@/components/common/nextlink";
import SvgIcon from "@/components/common/svg-icon";
import type { IconId } from "@/components/common/svg-icon";
import { profile } from "@/lib/content";

interface FooterLinkProps {
  href: string;
  label: string;
  iconId: IconId;
  iconTitle: string;
}

const SocialLinkItem = ({
  href,
  label,
  iconId,
  iconTitle,
}: FooterLinkProps) => {
  const linkClassName =
    "flex text-gray-800 focus-outline hover:text-neon-blue dark:text-gray-400 dark:hover:text-green";
  const iconClassName = "w-8 h-8";
  return (
    <li className='p-4'>
      <NextLink href={href} className={linkClassName} label={label} external>
        <SvgIcon className={iconClassName} id={iconId} title={iconTitle} />
      </NextLink>
    </li>
  );
};
const Footer = () => {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className='flex flex-col justify-center items-center w-full max-w-3xl mx-auto p-4'>
      <ul className='flex items-center'>
        <SocialLinkItem
          href={profile.instagram}
          label='Instagram'
          iconId='icon-instagram'
          iconTitle='Instagram logo'
        />
        <SocialLinkItem
          href={profile.github}
          label='GitHub'
          iconId='icon-github'
          iconTitle='GitHub logo'
        />

        <SocialLinkItem
          href={profile.linkedin}
          label='LinkedIn'
          iconId='icon-linkedin'
          iconTitle='LinkedIn logo'
        />
      </ul>
      <p className='text-center text-sm'>
        {profile.name} © {currentYear} | Make No Small Plan
      </p>
    </footer>
  );
};

export default Footer;
