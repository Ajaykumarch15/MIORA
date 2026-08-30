import { Camera, MessageCircle, Heart, MapPin, ChevronRight } from "lucide-react";
import type { ContextType } from "../../data/mockPeople";

interface ContextOption {
  type: ContextType;
  label: string;
  description: string;
  icon: typeof Camera;
  iconBg: string;
  iconColor: string;
}

const CONTEXT_OPTIONS: ContextOption[] = [
  {
    type: "memory",
    label: "Memory",
    description: "Something to remember",
    icon: Camera,
    iconBg: "bg-miora-frost",
    iconColor: "text-miora-steel",
  },
  {
    type: "conversation",
    label: "Conversation",
    description: "Something you talked about",
    icon: MessageCircle,
    iconBg: "bg-miora-frost",
    iconColor: "text-miora-steel",
  },
  {
    type: "feeling",
    label: "Feeling",
    description: "How they made you feel",
    icon: Heart,
    iconBg: "bg-miora-accent-soft",
    iconColor: "text-miora-accent",
  },
  {
    type: "place",
    label: "Place",
    description: "Where it happened",
    icon: MapPin,
    iconBg: "bg-miora-accent-soft",
    iconColor: "text-miora-accent",
  },
];

interface ContextTypeSelectorProps {
  selected: ContextType | null;
  onSelect: (type: ContextType) => void;
}

export default function ContextTypeSelector({
  selected,
  onSelect,
}: ContextTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {CONTEXT_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isSelected = selected === option.type;

        return (
          <button
            key={option.type}
            onClick={() => onSelect(option.type)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all ${
              isSelected
                ? "bg-miora-frost ring-1 ring-miora-steel/30"
                : "hover:bg-miora-frost/50"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${option.iconBg}`}
            >
              <Icon size={18} className={option.iconColor} strokeWidth={1.8} />
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
      })}
    </div>
  );
}
