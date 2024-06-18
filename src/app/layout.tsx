import React from "react";
import type { Metadata } from "next";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import "@/styles/app.css";

const authorName = "Pierre-Olivier Boisvert";

export const metadata: Metadata = {
  title: {
    default: `${authorName} | Software Engineer`,
    template: "%s | poboisvert",
  },
  description:
    "Frontend developer experienced in building web-based applications for all kinds of devices.",
  authors: [{ name: authorName }],
  metadataBase: new URL("https://poboisvert.dev"),
  keywords:
    "software development, portfolio, full stack developer, nextjs, react, golang, python, web development, freelance developer, Montreal developer, software engineer, tech skills, programming languages",
  alternates: {
    canonical: "https://poboisvert.dev",
  },
  openGraph: {
    title: `${authorName} | Software Engineer`,
    description:
      "Frontend developer experienced in building web-based applications for all kinds of devices.",
    url: "https://poboisvert.dev",
    siteName: `${authorName} Website`,
    locale: "en_GB",
    type: "website",
  },

  generator: "poboisvert",
  applicationName: "poboisvert Designs",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              function setTheme(newTheme) {
                window.__theme = newTheme;
                window.__onThemeChange(newTheme);
                document.documentElement.className = newTheme;
              }
              // this will be overwritten in our React component
              window.__onThemeChange = function () {};
              // this will be triggered by our React component
              window.__setPreferredTheme = function (newTheme) {
                setTheme(newTheme);
                try {
                  localStorage.setItem("theme", JSON.stringify(window.__theme));
                } catch (err) {}
              };
              // detect system theme and monitor for changes
              const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
              darkQuery.addListener(function (event) {
                window.__setPreferredTheme(event.matches ? "dark" : "light");
              });
              let preferredTheme;
              // try to get saved theme
              try {
                preferredTheme = JSON.parse(localStorage.getItem("theme"));
              } catch (err) {}  
              // initialize preferredTheme
              if (preferredTheme) {
                finalTheme = preferredTheme
              } else {
                finalTheme = darkQuery.matches ? "dark" : "light"
              }
              setTheme(finalTheme);
            })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
