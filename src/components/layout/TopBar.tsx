import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface TopBarProps {
  title?: string;
  backTo?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
}

export default function TopBar({
  title,
  backTo,
  showBack = false,
  rightAction,
}: TopBarProps) {
  const navigate = useNavigate();

  function handleBack() {
    if (backTo) {
      navigate(backTo, { replace: false });
    } else {
      navigate(-1);
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-miora-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex items-center justify-between h-14 px-5 max-w-lg">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 rounded-full text-miora-charcoal hover:bg-miora-frost transition-colors shrink-0"
              aria-label="Go back"
            >
              <ChevronLeft size={24} strokeWidth={1.8} />
            </button>
          )}
          {title && (
            <h1 className="text-lg font-semibold text-miora-charcoal truncate">
              {title}
            </h1>
          )}
        </div>
        {rightAction && (
          <div className="flex items-center shrink-0">{rightAction}</div>
        )}
      </div>
    </header>
  );
}
