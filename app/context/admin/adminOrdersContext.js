"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const throwMissingProviderError = () => {
  throw new Error("AdminOrdersContext doit être utilisé dans AdminOrdersProvider");
};

export const AdminOrdersContext = createContext({
  orders: null,
  setOrders: throwMissingProviderError,
  loadingOrders: true,
  refetchOrders: throwMissingProviderError,
  currentPage: 1,
  setCurrentPage: throwMissingProviderError,
  filters: { status: [] },
  setFilters: throwMissingProviderError,
});

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: [] });

  const fetchOrders = useCallback(
    async (page = currentPage, currentFilters = filters) => {
      setLoadingOrders(true);

      try {
        const queryParams = new URLSearchParams({ page: page.toString() });

        if (Array.isArray(currentFilters.status) && currentFilters.status.length > 0) {
          currentFilters.status.forEach((status) => {
            queryParams.append("status", status);
          });
        }

        const response = await fetch(`/api/admin/orders?${queryParams.toString()}`, {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          toast.error(result?.message || "Erreur lors de la récupération des commandes");
        } else {
          setOrders(result);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        toast.error(error?.message || "Erreur de connexion");
      } finally {
        setLoadingOrders(false);
      }
    },
    [currentPage, filters]
  );

  useEffect(() => {
    fetchOrders(currentPage, filters);
  }, [currentPage, filters, fetchOrders]);

  const refetchOrders = async (page = currentPage, currentFilters = filters) => {
    await fetchOrders(page, currentFilters);
  };

  return (
    <AdminOrdersContext.Provider
      value={{
        orders,
        setOrders,
        loadingOrders,
        refetchOrders,
        currentPage,
        setCurrentPage,
        filters,
        setFilters,
      }}
    >
      {children}
    </AdminOrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(AdminOrdersContext);
  if (context === null) {
    throwMissingProviderError();
  }
  return context;
};
