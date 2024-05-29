"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];
export default function AppHeader() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header className="flex justify-between  items-center border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex text-xs gap-2">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "text-white/70 py-1 px-2 rounded-sm hover:text-white focus:text-white transition",
                  {
                    "bg-black/10 text-white": route.path === pathname,
                  }
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
