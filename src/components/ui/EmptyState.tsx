import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {icon && (
        <div className="text-miora-snow mb-4">{icon}</div>
      )}
      <h3 className="text-base font-medium text-miora-charcoal mb-1.5">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-miora-muted max-w-[260px] leading-relaxed mb-5">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
