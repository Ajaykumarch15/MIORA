import { Heart, Calendar, MapPin } from "lucide-react";
import type { RemembranceContext } from "../../types";

interface MemoryHeaderProps {
  context: RemembranceContext;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MemoryHeader({ context }: MemoryHeaderProps) {
  return (
    <div className="text-center mb-8">
      {/* Heart Icon */}
      <div className="w-12 h-12 rounded-full bg-white shadow-sm shadow-miora-astral/5 flex items-center justify-center mx-auto mb-5">
        <Heart
          size={20}
          className="text-miora-meditative/50"
          strokeWidth={1.5}
        />
      </div>

      {/* Title */}
      <h1 className="font-display text-[32px] md:text-[36px] font-medium text-miora-astral leading-tight mb-4">
        {context.title || "A special moment"}
      </h1>

      {/* Metadata */}
      <div className="flex items-center justify-center gap-3 text-[14px] text-miora-turbulent/70">
        {context.memoryDate && (
          <span className="flex items-center gap-1.5">
            <Calendar size={14} strokeWidth={1.5} />
            {formatDate(context.memoryDate)}
          </span>
        )}
        {context.memoryDate && context.location && (
          <span className="text-miora-blue/40">·</span>
        )}
        {context.location && (
          <span className="flex items-center gap-1.5">
            <MapPin size={14} strokeWidth={1.5} />
            {context.location}
          </span>
        )}
      </div>
    </div>
  );
}
