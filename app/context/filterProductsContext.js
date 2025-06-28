"use client";
import { createContext, useState } from "react";

export const FilterProductsContext = createContext();

export const FilterProductsContextProvider = ({ children }) => {
  const [categories, setCategories] = useState({
    Homme: false,
    Femme: false,
    Informatique: false,
    TvSon: false,
    Téléphonie: false,
  });
  return (
    <FilterProductsContext.Provider value={{ categories, setCategories }}>{children}</FilterProductsContext.Provider>
  );
};
