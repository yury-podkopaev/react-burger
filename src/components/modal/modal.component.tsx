import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { ModalProps } from "./modal.types";
import { useEffect } from "react";
import { ModalOverlay } from "../modal-overlay/modal-overlay.component";

export const Modal = (props: ModalProps) => {
  const modalRoot = document.getElementById("react-modals");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && props.onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return createPortal(
    <>
      <div className={styles.modal}>
        <header className={`pt-10 pl-10 pr-10 text text_type_main-medium`}>
          {props.header}
          <div className={styles.icon}>
          <CloseIcon type="primary" onClick={props.onClose} />
          </div>
        </header>
        <div className={`${styles.body}`}>{props.children}</div>
      </div>
      <ModalOverlay onClick={props.onClose}/>
    </>,
    modalRoot!
  );
};
