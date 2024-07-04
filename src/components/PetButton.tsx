"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PetForm from "./PetForm";

type PetButtonProps = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  onclick?: () => void;
  disabled?: boolean;
};

export default function PetButton({
  children,
  onclick,
  disabled,
  actionType,
}: PetButtonProps) {
  const [isFormOpen, setFormOpen] = useState(false);

  if (actionType === "checkout") {
    return (
      <Button disabled={disabled} onClick={onclick} variant="secondary">
        {children}
      </Button>
    );
  }

  if (actionType === "add" || actionType === "edit") {
    return (
      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <DialogTrigger asChild>
          {actionType === "add" ? (
            <Button size="icon">
              <PlusIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button variant="secondary">{children}</Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Add new pet</DialogTitle>
          </DialogHeader>
          <PetForm
            actionType={actionType}
            onFormSubmission={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
