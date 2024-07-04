"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { logIn, signUp } from "@/actions/actions";

import AuthButton from "./AuthButton";
type TAuthForm = {
  actionType: "signup" | "login";
};

export default function AuthForm({ actionType }: TAuthForm) {
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={100} />
      </div>
      <div className="mb-4 space-y-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
        />
      </div>
      <AuthButton actionType={actionType} />
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </form>
  );
}
