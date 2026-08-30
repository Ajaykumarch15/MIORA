import { useEffect, useCallback, type ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
}: DialogProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-sm bg-miora-paper rounded-[24px] p-6 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <h2 className="text-lg font-semibold text-miora-charcoal mb-2">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm text-miora-muted leading-relaxed mb-5">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
