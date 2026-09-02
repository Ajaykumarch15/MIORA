import { useState, useRef, useEffect, type ReactNode } from "react";
import { MoreHorizontal, type LucideIcon } from "lucide-react";

export interface DropdownMenuItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger?: ReactNode;
}

export default function DropdownMenu({ items, trigger }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="p-1.5 rounded-lg text-miora-meditative/50 hover:text-miora-turbulent hover:bg-miora-blue/20 transition-colors"
        aria-label="More options"
      >
        {trigger || <MoreHorizontal size={18} strokeWidth={1.5} />}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 py-1.5 bg-white rounded-xl shadow-lg shadow-miora-astral/8 border border-miora-line/50 z-50">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onClick();
              }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] transition-colors ${
                item.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-miora-charcoal hover:bg-miora-frost/60"
              }`}
            >
              <item.icon size={15} strokeWidth={1.5} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
