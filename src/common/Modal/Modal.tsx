import { ReactNode } from "react";
import styles from "./Modal.module.css";

export interface ModalProps {
  children: ReactNode;
  onConfirm?: () => void;
}

export default function Modal({ children, onConfirm }: ModalProps) {
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__box}>
        <div className={styles.modal__content}>
          <p>{children}</p>
        </div>
        <button onClick={onConfirm} className={styles.modal__btn}>
          확인
        </button>
      </div>
    </div>
  );
}
