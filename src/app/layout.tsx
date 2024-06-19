import React from "react";
import type { Metadata } from "next";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import initTheme from "@/lib/theme";

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
  metadataBase: new URL("https://boisvert.blockchain"),
  keywords:
    "software development, portfolio, full stack developer, nextjs, react, golang, python, web development, freelance developer, Montreal developer, software engineer, tech skills, programming languages",
  alternates: {
    canonical: "https://boisvert.blockchain",
  },
  openGraph: {
    title: `${authorName} | Software Engineer`,
    description:
      "Frontend developer experienced in building web-based applications for all kinds of devices.",
    url: "https://boisvert.blockchain",
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
          type='text/javascript'
          dangerouslySetInnerHTML={{ __html: initTheme }}
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
