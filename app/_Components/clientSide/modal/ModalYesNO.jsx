"use client";

import React from "react";
import { useModal } from "../../../context/ModalContext";
import styles from "./modal.module.css";

export default function Modal() {
  const { isOpen, modalContent, onConfirm, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeModal} aria-modal="true" role="dialog" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div id="modal-title" className={styles.content}>
          {modalContent}
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btnYes}
            onClick={() => { onConfirm(); closeModal();}}
            aria-label="Confirmer"
          >
            Oui
          </button>
          <button className={styles.btnNo} onClick={closeModal} aria-label="Annuler">
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
