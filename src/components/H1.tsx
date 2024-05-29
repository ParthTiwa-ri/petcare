import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type H1Props = {
  children: React.ReactNode;
  classname?: string;
};

export default function H1({ children, classname }: H1Props) {
  return (
    <h1 className={cn("text-xl leading-6 font-medium", classname)}>
      {children}
    </h1>
  );
}
