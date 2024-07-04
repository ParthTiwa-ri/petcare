import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main>
      <H1 classname=" mb-5 text-center">Sign up</H1>
      <AuthForm actionType="signup" />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link className="font-medium" href="/login">
          Login
        </Link>
      </p>
    </main>
  );
}
