"use client";

import { createContext, useContext, useState } from "react";

const throwMissingProviderError = () => {
  throw new Error("ModalContext doit être utilisé dans ModalProvider");
};

export const ModalContext = createContext({
  isOpen: false,
  modalContent: null,
  onConfirm: throwMissingProviderError,
  openModal: throwMissingProviderError,
  closeModal: throwMissingProviderError,
});

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const openModal = ({ content, onYes }) => {
    setModalContent(content);
    setOnConfirm(() => onYes);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setOnConfirm(() => () => {});
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalContent,
        onConfirm,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// hook personnalisé
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throwMissingProviderError();
  }
  return context;
};
