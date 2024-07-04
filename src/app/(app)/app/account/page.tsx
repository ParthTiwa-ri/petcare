import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutBtn from "@/components/SignOutBtn";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main>
      <H1 classname="my-8">Your Account</H1>
      <ContentBlock classname="h-[500px] flex flex-col gap-3 items-center justify-center">
        Logged in as...{session?.user?.email}
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
