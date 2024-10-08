import Image from "next/image";
import previewImage from "/public/images/petsoft-preview.png";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] p-10 min-h-screen flex xl:flex-row  flex-col items-center justify-center gap-10">
      <Image src={previewImage} quality={40} alt="previewImage" />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold max-w-[500px] my-6 ">
          Manage your <span className=" font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetCare to easily keep track of pets under care. Get lifetime
          access for $299.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
