"use client";

import { createContext, useEffect, useState, useContext } from "react";

const throwMissingProviderError = () => {
  throw new Error("AuthContext doit être utilisé dans AuthProvider");
};

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: throwMissingProviderError,
  isAdmin: false,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await fetch("/api/verifyToken", {
          method: "POST",
          credentials: "include",
        });
        const result = await response.json();
        // result = { success: boolean, isAdmin?: boolean }
        if (response.ok && result.success === true) {
          setIsAuthenticated(true);
          setIsAdmin(result?.isAdmin || false);
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Erreur de vérification du token :", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throwMissingProviderError();
  }
  return context;
};
