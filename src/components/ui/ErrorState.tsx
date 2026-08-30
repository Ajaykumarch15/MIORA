import type { ReactNode } from "react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  retry?: ReactNode;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  retry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <h3 className="text-base font-medium text-miora-charcoal mb-1.5">
        {title}
      </h3>
      <p className="text-sm text-miora-muted max-w-[260px] leading-relaxed mb-5">
        {description}
      </p>
      {retry}
    </div>
  );
}
