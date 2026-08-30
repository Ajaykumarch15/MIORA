import { Brain, MessageCircle, Heart, MapPin, ChevronRight } from "lucide-react";
import type { ContextType } from "../../data/mockPeople";

interface ContextTypeOption {
  type: ContextType;
  label: string;
  description: string;
  icon: typeof Brain;
}

const CONTEXT_TYPES: ContextTypeOption[] = [
  {
    type: "memory",
    label: "Memory",
    description: "Something to remember",
    icon: Brain,
  },
  {
    type: "conversation",
    label: "Conversation",
    description: "Something you talked about",
    icon: MessageCircle,
  },
  {
    type: "feeling",
    label: "Feeling",
    description: "How they made you feel",
    icon: Heart,
  },
  {
    type: "place",
    label: "Place",
    description: "Where it happened",
    icon: MapPin,
  },
];

interface ContextTypeCardProps {
  type: ContextType;
  selected?: boolean;
  onSelect: (type: ContextType) => void;
}

export default function ContextTypeCard({
  type,
  selected = false,
  onSelect,
}: ContextTypeCardProps) {
  const option = CONTEXT_TYPES.find((c) => c.type === type);
  if (!option) return null;

  const Icon = option.icon;

  return (
    <button
      onClick={() => onSelect(type)}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all ${
        selected
          ? "bg-miora-frost ring-1 ring-miora-steel/30"
          : "hover:bg-miora-frost/50 active:bg-miora-frost"
      }`}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-miora-frost">
        <Icon size={18} className="text-miora-steel" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-miora-charcoal">
          {option.label}
        </p>
        <p className="text-[13px] text-miora-muted/60 mt-0.5">
          {option.description}
        </p>
      </div>
      <ChevronRight
        size={16}
        className="text-miora-muted/30 shrink-0"
        strokeWidth={1.5}
      />
    </button>
  );
}

export { CONTEXT_TYPES };
