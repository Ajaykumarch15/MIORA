import { Heart } from "lucide-react";

interface MemoryReflectionCardProps {
  whyMatters: string;
}

export default function MemoryReflectionCard({ whyMatters }: MemoryReflectionCardProps) {
  return (
    <div className="bg-white/80 rounded-2xl border border-miora-blue/10 p-6 md:p-8 mb-6 relative overflow-hidden">
      <div className="flex items-start gap-4">
        {/* Heart Icon */}
        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0 mt-1">
          <Heart
            size={18}
            className="text-rose-400"
            strokeWidth={1.5}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <h2 className="text-[15px] font-medium text-miora-astral mb-3">
            Why this matters
          </h2>

          {/* Content */}
          <p className="text-[15px] text-miora-turbulent leading-[1.7]">
            {whyMatters}
          </p>
        </div>
      </div>

      {/* Decorative Botanical */}
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-miora-astral">
          <path d="M80 90 Q60 70 70 50 Q80 30 80 10" fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="65" cy="40" rx="12" ry="18" fill="currentColor" opacity="0.3" transform="rotate(-15 65 40)" />
          <ellipse cx="85" cy="55" rx="10" ry="15" fill="currentColor" opacity="0.2" transform="rotate(10 85 55)" />
          <circle cx="80" cy="15" r="3" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
