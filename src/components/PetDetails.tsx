"use client";
import { usePetContext } from "@/lib/hooks";

import Image from "next/image";
import PetButton from "./PetButton";
import { useEffect, useState, useTransition } from "react";
import { Pet } from "@prisma/client";
import { run } from "@/lib/gemini-api";
import logo from "../../public/images/google-gemini-icon.svg";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="h-full w-full flex flex-col">
      {!selectedPet ? (
        <div className="h-full w-full flex justify-center items-center">
          <EmptyView />
        </div>
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <PetNotes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type PetProps = {
  pet: Pet;
};

function EmptyView() {
  return <p className="text-2xl font-medium">No Pet Selected</p>;
}

function TopBar({ pet }: PetProps) {
  const { handleCheckoutPet } = usePetContext();
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex items-center bg-white border-b border-light py-5 px-8">
      <Image
        src={pet?.imageUrl}
        alt="selectedPetPhoto"
        width={75}
        height={75}
        className="h-[75px] w-[75px] rounded-full object-cover "
      />

      <h2 className="text-3xl font-semibol leading-7 ml-5">{pet?.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          disabled={isPending}
          onclick={async () =>
            startTransition(async () => {
              await handleCheckoutPet(pet.id);
            })
          }
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: PetProps) {
  return (
    <div className="flex justify-around py-10 px-5">
      <div>
        <h3 className="text-[13px] font-medium text-zinc-700 uppercase">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium text-zinc-700 uppercase">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
}

function PetNotes({ pet }: PetProps) {
  useEffect(() => {
    const aiRun = async () => {
      const text = await run(pet?.name, pet?.age, pet?.ownerName, pet?.notes);
      setAiSummary(text);
    };
    aiRun();
    return () => {
      setAiSummary(null);
    };
  }, [pet?.name, pet?.age, pet?.ownerName, pet?.notes]);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  return (
    <section className="bg-white relative px-7 py-5 border border-light flex-1 mb-9 mx-8">
      {pet?.notes}
      {aiSummary && (
        <div className="absolute flex flex-col items-center rounded-md bottom-1 right-1 p-4 bg-slate-200 w-1/2 ">
          <div className="flex gap-2 items-center justify-center text-lg">
            <Image
              src={logo}
              height={2}
              width={2}
              alt="Gemini Logo"
              className="h-5 w-5 inline-block"
            />
            AI Suggestion
          </div>
          {aiSummary}
        </div>
      )}
    </section>
  );
}
