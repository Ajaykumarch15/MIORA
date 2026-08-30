import type { ReactNode } from "react";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: "default" | "danger";
}

export default function StatusBadge({
  children,
  variant = "default",
}: StatusBadgeProps) {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variants = {
    default: "bg-miora-frost text-miora-muted",
    danger: "bg-miora-danger/10 text-miora-danger",
  };

  return (
    <span className={`${base} ${variants[variant]}`}>{children}</span>
  );
}
