"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { logIn, signUp } from "@/actions/actions";

import AuthButton from "./AuthButton";
import { Button } from "./ui/button";
import { set } from "zod";
type TAuthForm = {
  actionType: "signup" | "login";
};

export default function AuthForm({ actionType }: TAuthForm) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);

    if (actionType === "signup") {
      const err = await signUp(formData);
      if (err) {
        setError(err.message);
      }
    } else {
      const err = await logIn(formData);
      if (err) {
        setError(err.message);
      }
    }
    if (error) {
      console.log(error);
    }
    setPending(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          maxLength={100}
          defaultValue="example@gmail.com"
        />
      </div>
      <div className="mb-4 space-y-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          defaultValue="example"
        />
      </div>
      <Button disabled={pending}>
        {actionType === "login" ? "Log In" : "Sign up"}
      </Button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </form>
  );
}
