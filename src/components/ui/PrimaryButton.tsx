import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  children,
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 h-13 px-6 rounded-full
        bg-miora-accent text-white font-medium text-[15px]
        transition-all duration-150
        hover:bg-miora-accent/90 active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${fullWidth ? "w-full" : ""}
        ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!loading && rightIcon}
    </button>
  );
}
