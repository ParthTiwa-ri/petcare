import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth-no-edge";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) return redirect("/login");
  return session;
}
