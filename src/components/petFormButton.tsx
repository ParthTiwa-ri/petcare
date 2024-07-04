import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type petButtonProps = {
  actionType: "add" | "edit";
};

export default function PetFormButton({ actionType }: petButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}
