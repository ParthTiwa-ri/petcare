import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import React from "react";

export default function page() {
  return (
    <main>
      <H1 classname="my-8">Your Account</H1>
      <ContentBlock classname="h-[500px] flex items-center justify-center">
        Logged in as...
      </ContentBlock>
    </main>
  );
}
