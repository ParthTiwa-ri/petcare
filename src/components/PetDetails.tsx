"use client";
import { usePetContext } from "@/lib/hooks";

import Image from "next/image";
import PetButton from "./PetButton";
import { useTransition } from "react";
import { Pet } from "@prisma/client";

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
  return (
    <section className="bg-white px-7 py-5 border border-light flex-1 mb-9 mx-8">
      {pet?.notes}
    </section>
  );
}
