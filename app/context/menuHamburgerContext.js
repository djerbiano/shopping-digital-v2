"use client";
import { createContext, useState } from "react";
import useIsDesktop from "../_Components/hook/useIsDesktop";

export const MenuHamburgerContext = createContext();

export const MenuHamburgerContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();
  return (
    <MenuHamburgerContext.Provider value={{ isMenuOpen, setIsMenuOpen, isDesktop }}>
      {children}
    </MenuHamburgerContext.Provider>
  );
};
