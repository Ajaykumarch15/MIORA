import { useEffect, useCallback, type ReactNode } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
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
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div
          className="mx-auto max-w-lg bg-miora-paper rounded-t-[28px] max-h-[85dvh] flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-center pt-3 pb-2 px-5">
            <div className="w-10 h-1 rounded-full bg-miora-line" />
          </div>
          <div className="overflow-y-auto px-5 pb-8 overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
