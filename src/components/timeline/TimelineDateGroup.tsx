import TimelineItem from "./TimelineItem";
import type { TimelineItem as TimelineItemType } from "../../data/mockPeople";

interface DateGroup {
  label: string;
  dateKey: string;
  items: { id: string; createdAt: string }[];
}

interface TimelineDateGroupProps {
  group: DateGroup;
  items: TimelineItemType[];
}

export default function TimelineDateGroup({
  group,
  items,
}: TimelineDateGroupProps) {
  return (
    <div>
      <h3 className="text-[13px] font-medium text-miora-muted/70 mb-4 tracking-wide">
        {group.label}
      </h3>
      <div>
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
