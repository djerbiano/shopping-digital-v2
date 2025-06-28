"use client";
import { createContext, useState } from "react";

export const FilterProductsContext = createContext();

export const FilterProductsContextProvider = ({ children }) => {
  const [categories, setCategories] = useState({
    Homme: true,
    Femme: true,
    Informatique: true,
    TvSon: true,
    Téléphonie: true,
  });
  return (
    <FilterProductsContext.Provider value={{ categories, setCategories }}>{children}</FilterProductsContext.Provider>
  );
};
