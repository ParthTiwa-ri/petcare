import { cn } from "@/lib/utils";
import React from "react";

type ContentBlockProps = {
  children: React.ReactNode;
  classname?: string;
};

export default function ContentBlock({
  children,
  classname,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#f7f8FA] rounded-md shadow-sm overflow-hidden h-full w-full",
        classname
      )}
    >
      {children}
    </div>
  );
}
