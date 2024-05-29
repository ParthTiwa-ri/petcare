"use client";
import React, { useContext } from "react";
import petPlaceholder from "../../public/images/pet-placeholder.png";
import Image from "next/image";
import { Pet } from "@/lib/types";
import { petContext } from "@/context/petContext";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function PetList() {
  const { pets, handleSelectedPet, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery)
  );
  return (
    <ul className=" bg-white  border-b border-black/[0.08]">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            className={cn(
              "flex items-center gap-3  px-5 h-[70px] cursor-pointer w-full text-base hover:bg-[#EFF1F2]  transition",
              {
                "bg-[#EFF1F2]": selectedPetId === pet.id,
              }
            )}
            onClick={() => handleSelectedPet(pet.id)}
          >
            <Image
              src={pet.imageUrl}
              alt="petPlaceholder"
              className="w-[45px] h-[45px] rounded-full object-cover "
              width={45}
              height={45}
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
