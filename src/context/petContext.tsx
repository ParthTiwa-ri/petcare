"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  handleSelectedPet: (id: Pet["id"]) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (id: Pet["id"]) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>;
};

export const petContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data: pets,
  children,
}: PetContextProviderProps) {
  //states
  // const [pets, setPets] = useState(data);

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // useEffect(() => {
  //   setPets(data);
  // }, [data]);

  //derived states
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //state handles
  function handleSelectedPet(id: Pet["id"]) {
    setSelectedPetId(id);
  }

  async function handleCheckoutPet(petId: Pet["id"]) {
    const error = await deletePet(petId);
    if (error) {
      toast.warning(error.message);
      return;
    }

    setSelectedPetId(null);
  }

  async function handleAddPet(newPet: PetEssentials) {
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
    // setPets((prev) => [...prev, { ...newPet, id: Date.now().toString() }]);
  }

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  return (
    <petContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectedPet,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </petContext.Provider>
  );
}
