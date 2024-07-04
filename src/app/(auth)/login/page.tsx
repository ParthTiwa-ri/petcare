import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import Link from "next/link";

export default function page() {
  return (
    <main>
      <H1 classname=" mb-5 text-center">Log In</H1>
      <AuthForm actionType="login" />
      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link className="font-medium" href="/signup">
          Sign up
        </Link>
      </p>
    </main>
  );
}
