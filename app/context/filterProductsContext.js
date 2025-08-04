"use client";
import { createContext, useState, useContext } from "react";
const throwMissingProviderError = () => {
  throw new Error("FilterProductsContext doit être utilisé dans FilterProductsContextProvider");
};
const defaultCategories = {
  Homme: false,
  Femme: false,
  Informatique: false,
  TvSon: false,
  Téléphonie: false,
};

export const FilterProductsContext = createContext({
  categories: defaultCategories,
  setCategories: throwMissingProviderError,
});

export const FilterProductsContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(defaultCategories);
  return (
    <FilterProductsContext.Provider value={{ categories, setCategories }}>{children}</FilterProductsContext.Provider>
  );
};

// hook personnalisé
export const useFilterProducts = () => {
  const context = useContext(FilterProductsContext);
  if (!context) {
    throwMissingProviderError();
  }
  return context;
};
