import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/AppFooter";
import React, { ReactNode } from "react";
import PetContextProvider from "@/context/petContext";

import SearchContextProvider from "@/context/searchContext";
import prisma from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth-no-edge";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) return redirect("/login");
  const data = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] min-h-screen mx-auto flex flex-col px-2">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
        <Toaster position="top-right" />
      </div>
    </>
  );
}
