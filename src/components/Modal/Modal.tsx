import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect, type MouseEvent } from "react";
import NoteForm from "../NoteForm/NoteForm";

interface ModalProps {
  onClose: () => void;
  topic: string;
  page: number;
}

export default function Modal({ onClose, topic, page }: ModalProps) {
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} topic={topic} page={page} />
      </div>
    </div>,
    document.body
  );
}
