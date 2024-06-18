import React from "react";
import Link from "next/link";

interface LinkProps {
  className?: string;
  external?: boolean;
  href: string;
  label?: string;
}

const NextLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<LinkProps>
>(({ children, className, external = false, href, label }, ref) => {
  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        aria-label={label}
        rel='noopener noreferrer'
        target='_blank'
      >
        {children}
        <span className='sr-only'> (opens a new window)</span>
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={className} aria-label={label}>
      {children}
    </Link>
  );
});

export default NextLink;
