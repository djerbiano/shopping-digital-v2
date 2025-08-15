"use client";

import { createContext, useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

const throwMissingProviderError = () => {
  throw new Error("AuthContext doit être utilisé dans AuthProvider");
};

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: throwMissingProviderError,
  isAdmin: false,
  loading: true,

  refreshProductsInFavorites: throwMissingProviderError,
  productsInFavorites: [],
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productsInFavorites, setProductsInFavorites] = useState([]);
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
  useEffect(() => {
    checkTokenValidity();
  }, []);

  const getProductsFromFavorites = async () => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const response = await fetch("/api/products/getProductsFromFavorites", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue lors de la récuperation des produits favoris");
      }
      setProductsInFavorites(data);
    } catch (error) {
      toast.error(error?.message || "Une erreur est survenue lors de la récuperation des produits favoris");
    } finally {
      setLoading(false);
    }
  };

  const refreshProductsInFavorites = async () => {
    setLoading(true);
    await getProductsFromFavorites();
  };

  const refreshAuth = async () => {
    setLoading(true);
    await checkTokenValidity();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        isAdmin,
        setIsAdmin,
        refreshAuth,
        refreshProductsInFavorites,
        productsInFavorites,
      }}
    >
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
