"use client";

import { createContext, use, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  //states
  const [searchQuery, setSearchQuery] = useState("");
  //derived states

  //state handles
  function handleChangeSearchQuery(newValue: string) {
    setSearchQuery(newValue);
  }

  return (
    <SearchContext.Provider value={{ searchQuery, handleChangeSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
