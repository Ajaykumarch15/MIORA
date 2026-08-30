import { Heart, Brain, MessageCircle, MapPin } from "lucide-react";
import PersonAvatar from "../people/PersonAvatar";
import { getTimeLabel } from "../../lib/dateUtils";
import type { TimelineItem as TimelineItemType } from "../../data/mockPeople";

const TYPE_CONFIG: Record<
  TimelineItemType["type"],
  { label: string; icon: typeof Heart }
> = {
  remembrance: { label: "Remembered", icon: Heart },
  memory: { label: "Memory", icon: Brain },
  conversation: { label: "Conversation", icon: MessageCircle },
  feeling: { label: "Feeling", icon: Heart },
  place: { label: "Place", icon: MapPin },
};

interface TimelineItemProps {
  item: TimelineItemType;
  isLast: boolean;
}

export default function TimelineItem({ item, isLast }: TimelineItemProps) {
  const config = TYPE_CONFIG[item.type];
  const Icon = config.icon;
  const time = getTimeLabel(item.createdAt);

  return (
    <div className="flex gap-3.5">
      {/* Timeline marker and line */}
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-miora-accent mt-[7px] shrink-0" />
        {!isLast && (
          <div className="w-px flex-1 bg-miora-line/60 my-1" />
        )}
      </div>

      {/* Content */}
      <div className="pb-7 flex-1 min-w-0">
        {/* Person + time */}
        <div className="flex items-center gap-2.5 mb-1.5">
          <PersonAvatar name={item.personName} size="sm" />
          <span className="text-[14px] font-medium text-miora-charcoal">
            {item.personName}
          </span>
          <span className="text-[12px] text-miora-muted/60">
            {time}
          </span>
        </div>

        {/* Type label + content */}
        <div className="ml-[46px]">
          <div className="flex items-center gap-1.5 mb-0.5">
            <Icon
              size={13}
              className="text-miora-accent/60 shrink-0"
              strokeWidth={1.8}
            />
            <span className="text-[12px] font-medium text-miora-muted/70 uppercase tracking-wide">
              {config.label}
            </span>
          </div>
          {item.type !== "remembrance" && (
            <p className="text-[15px] text-miora-charcoal leading-relaxed">
              {item.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
