import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pet Care",
  description: "Pet care for personlized pet-care for customers's pet.",
  metadataBase: new URL("petcare.parthtiwari.in"),
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      url: "/favicons/apple-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "36x36",
      url: "/favicons/android-icon-36x36.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/favicons/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicons/favicon-16x16.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-[#E5E8EC] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
