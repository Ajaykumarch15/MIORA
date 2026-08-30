import { Link } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import TimelineDateGroup from "../components/timeline/TimelineDateGroup";
import EmptyState from "../components/ui/EmptyState";
import { useMiora } from "../context/MioraContext";
import { groupByDate } from "../lib/dateUtils";
import type { TimelineItem as TimelineItemType } from "../types";

export default function ThoughtTimelinePage() {
  const { getTimelineItems } = useMiora();
  const allItems = getTimelineItems();
  const groups = groupByDate(allItems);

  const itemsByDate = new Map<string, TimelineItemType[]>();
  for (const item of allItems) {
    const dateKey = new Date(item.createdAt).toDateString();
    const existing = itemsByDate.get(dateKey) ?? [];
    existing.push(item);
    itemsByDate.set(dateKey, existing);
  }

  return (
    <div>
      <TopBar title="Thought Timeline" />

      <div className="px-6 pt-2 pb-8">
        <p className="text-miora-muted text-sm mb-6">
          A quiet record of what stays with you.
        </p>

        {groups.length === 0 ? (
          <EmptyState
            title="No thoughts yet"
            description="The moments you choose to remember will appear here."
            action={
              <Link
                to="/people"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-miora-frost text-miora-charcoal text-sm font-medium border border-miora-line transition-all hover:bg-miora-snow active:scale-[0.98]"
              >
                Go to People
              </Link>
            }
          />
        ) : (
          <div className="space-y-8">
            {groups.map((group) => (
              <TimelineDateGroup
                key={group.dateKey}
                group={group}
                items={itemsByDate.get(group.dateKey) ?? []}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
