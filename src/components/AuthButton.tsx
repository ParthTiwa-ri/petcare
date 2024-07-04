"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
type AuthButtonProps = {
  actionType: "login" | "signup";
};
export default function AuthButton({ actionType }: AuthButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {actionType === "login" ? "Log In" : "Sign up"}
    </Button>
  );
}
