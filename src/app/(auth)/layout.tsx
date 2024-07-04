import Logo from "@/components/logo";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}
