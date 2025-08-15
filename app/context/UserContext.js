"use client";

import { createContext, useContext, useState, useEffect } from "react";

const throwMissingProviderError = () => {
  throw new Error("UserContext doit être utilisé dans UserProvider");
};

export const UserContext = createContext({
  dataProfile: null,
  setDataProfile: throwMissingProviderError,
  loadingProfile: true,
  errorProfile: null,
  refetchProfile: throwMissingProviderError,
});

export const UserProvider = ({ children }) => {
  const [dataProfile, setDataProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  const fetchUserData = async () => {
    setErrorProfile(null);
    setLoadingProfile(true);

    try {
      const response = await fetch("/api/users/dataUser", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setDataProfile(result);
      } else {
        setErrorProfile(result.message || "Erreur lors de la récupération du profil");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      setErrorProfile(error.message || "Erreur inconnue");
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const refetchProfile = async () => {
    await fetchUserData();
  };

  return (
    <UserContext.Provider
      value={{
        dataProfile,
        setDataProfile,
        loadingProfile,
        errorProfile,
        refetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// hook personnalisé
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throwMissingProviderError();
  }
  return context;
};