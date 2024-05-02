import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  onConfirm?: () => void;
}

export default function Modal({ children, onConfirm }: ModalProps) {
  return (
    <div>
      <p>{children}</p>
      <button onClick={onConfirm}>OK</button>
    </div>
  );
}
