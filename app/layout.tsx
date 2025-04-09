import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pierre-Olivier Boisvert Portfolio - Blockchain Expertise",
  description:
    "Professional portfolio showcasing blockchain development and design expertise",
  keywords: "blockchain, web3, decentralized, cryptocurrency, smart contracts",
  openGraph: {
    title: "Pierre-Olivier Boisvert Portfolio - Blockchain Expertise",
    description:
      "Professional portfolio showcasing blockchain development and design expertise",
    url: "https://boisvert.blockchain",
    siteName: "boisvert.blockchain",
    images: [
      {
        url: "https://example.com/pierre-olivier-boisvert-profile-picture.jpg",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pierre-Olivier Boisvert Portfolio - Blockchain Expertise",
    description:
      "Professional portfolio showcasing blockchain development and design expertise",
    images: [
      {
        url: "https://example.com/pierre-olivier-boisvert-profile-picture.jpg",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable}>
      <body className='font-sans antialiased'>{children}</body>
    </html>
  );
}
