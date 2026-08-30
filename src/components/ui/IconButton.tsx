import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
  size?: "sm" | "md";
}

export default function IconButton({
  children,
  label,
  size = "md",
  disabled,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeClasses =
    size === "sm" ? "w-9 h-9" : "w-10 h-10";

  return (
    <button
      disabled={disabled}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full
        text-miora-charcoal
        transition-all duration-150
        hover:bg-miora-frost active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed
        ${sizeClasses}
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
