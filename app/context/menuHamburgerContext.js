"use client";
import { createContext, useState, useContext } from "react";
import useIsDesktop from "../_Components/hook/useIsDesktop";

const throwMissingProviderError = () => {
  throw new Error("MenuHamburgerContext doit être utilisé dans MenuHamburgerContextProvider");
};

export const MenuHamburgerContext = createContext({
  isMenuOpen: false,
  setIsMenuOpen: throwMissingProviderError,
  isDesktop: false,
});
export const MenuHamburgerContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();
  return (
    <MenuHamburgerContext.Provider value={{ isMenuOpen, setIsMenuOpen, isDesktop }}>
      {children}
    </MenuHamburgerContext.Provider>
  );
};

// hook personnalisé
export const useMenuHamburger = () => {
  const context = useContext(MenuHamburgerContext);
  if (!context) {
    throwMissingProviderError();
  }
  return context;
};
