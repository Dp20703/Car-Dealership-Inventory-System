import { useEffect, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="tw-overlay animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="tw-modal animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="tw-modal-header">
          <h3
            id="modal-title"
            className="text-lg font-display font-semibold uppercase tracking-wide"
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted dark:text-text-darkMuted hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-text-light dark:hover:text-text-dark transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="tw-modal-body">{children}</div>
        {footer && <div className="tw-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
