import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/AppFooter";
import React, { ReactNode } from "react";
import PetContextProvider from "@/context/petContext";
import { Pet } from "@/lib/types";
import SearchContextProvider from "@/context/searchContext";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) {
    throw new Error("Could not fetch pets list");
  }
  const data: Pet[] = await response.json();
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] min-h-screen mx-auto flex flex-col px-2">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
