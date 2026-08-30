import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function SecondaryButton({
  children,
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 h-13 px-6 rounded-full
        bg-miora-frost text-miora-charcoal font-medium text-[15px]
        border border-miora-line
        transition-all duration-150
        hover:bg-miora-snow active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${fullWidth ? "w-full" : ""}
        ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-miora-muted/30 border-t-miora-muted rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  );
}
