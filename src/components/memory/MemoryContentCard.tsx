import { Quote, MessageCircle, Heart, MapPin, Image } from "lucide-react";
import type { RemembranceContext } from "../../types";

interface MemoryContentCardProps {
  context: RemembranceContext;
}

const TYPE_CONFIG = {
  memory: { icon: Image, label: "The memory" },
  conversation: { icon: MessageCircle, label: "The conversation" },
  feeling: { icon: Heart, label: "The feeling" },
  place: { icon: MapPin, label: "The place" },
};

export default function MemoryContentCard({ context }: MemoryContentCardProps) {
  const config = TYPE_CONFIG[context.type];

  return (
    <div className="bg-white/80 rounded-2xl border border-miora-blue/10 p-6 md:p-8 mb-6">
      <div className="flex items-start gap-4">
        {/* Quote Icon */}
        <div className="w-10 h-10 rounded-xl bg-miora-diamond/50 flex items-center justify-center shrink-0 mt-1">
          <Quote
            size={18}
            className="text-miora-turbulent/60"
            strokeWidth={1.5}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Label */}
          <h2 className="text-[15px] font-medium text-miora-astral mb-4">
            {config.label}
          </h2>

          {/* Content */}
          <div className="text-[16px] md:text-[17px] text-miora-charcoal leading-[1.8] whitespace-pre-wrap">
            {context.content}
          </div>
        </div>
      </div>
    </div>
  );
}
