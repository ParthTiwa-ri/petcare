import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

type PetButtonProps = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  onclick?: () => void;
};

export default function PetButton({
  children,
  onclick,
  actionType,
}: PetButtonProps) {
  if (actionType === "checkout") {
    return (
      <Button onClick={onclick} variant="secondary">
        {children}
      </Button>
    );
  }
  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }
}
