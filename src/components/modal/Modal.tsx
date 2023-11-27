import { createPortal } from "react-dom";
import "./index.css";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode | ReactNode[];
}

const Modal = ({ isOpen, onClose = () => {}, children }: ModalProps) => {
  const modalRoot = document.getElementById("modal-root");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRoot) {
      const newModalRoot = document.createElement("div");
      newModalRoot.setAttribute("id", "modal-root");
      document.body.appendChild(newModalRoot);
    }
  }, []);

  useEffect(() => {
    console.log();
    function handleClickOutside(event: MouseEvent) {
      event.stopPropagation();
      if (!modalRef?.current?.contains(event.target as Node)) {
        onClose();
      }
    }
    isOpen && window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Close modal"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
