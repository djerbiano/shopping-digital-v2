"use client";

import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
const throwMissingProviderError = () => {
  throw new Error("OrdersContext doit être utilisé dans OrdersContextProvider");
};

export const OrdersContext = createContext({
  ordersUser: null,
  setOrdersUser: throwMissingProviderError,
  loadingOrders: true,
  refetchOrders: throwMissingProviderError,
});

export const OrdersProvider = ({ children }) => {
  const [ordersUser, setOrdersUser] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const fetchOrders = async () => {
    setLoadingOrders(true);

    try {
      const response = await fetch("/api/orders/showOrderForUser", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Une erreur est survenue lors de la récupération des commandes.");
      } else {
        setOrdersUser(result);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      toast.error(error.message || "Une erreur est survenue lors de la récupération des commandes.");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const refetchOrders = async () => {
    await fetchOrders();
  };

  return (
    <OrdersContext.Provider
      value={{
        ordersUser,
        setOrdersUser,
        loadingOrders,
        refetchOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

// hook personnalisé
export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === null) {
    throwMissingProviderError();
  }
  return context;
};
