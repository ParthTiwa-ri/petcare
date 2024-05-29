import { petContext } from "@/context/petContext";
import { SearchContext } from "@/context/searchContext";
import { useContext } from "react";

export function usePetContext() {
  const context = useContext(petContext);

  if (!context) {
    throw new Error("Context used outside the scope");
  }
  return context;
}

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("Context used outside the scope");
  }
  return context;
}
