"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleSelectedPet: (id: string) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (id: string) => void;
};

export const petContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  //states
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived states
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //state handles
  function handleSelectedPet(id: string) {
    setSelectedPetId(id);
  }

  function handleCheckoutPet(id: string) {
    setPets((prev) => prev.filter((item) => item.id !== id));
    setSelectedPetId(null);
  }

  return (
    <petContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectedPet,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
      }}
    >
      {children}
    </petContext.Provider>
  );
}
