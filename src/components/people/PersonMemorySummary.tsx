import { Heart, Clock } from "lucide-react";
import { formatRelativeDate, formatAbsoluteDateTime } from "../../lib/dateUtils";
import type { Person } from "../../data/mockPeople";

interface PersonMemorySummaryProps {
  person: Person;
}

export default function PersonMemorySummary({ person }: PersonMemorySummaryProps) {
  const relativeDate = formatRelativeDate(person.lastRememberedAt);
  const absoluteDate = formatAbsoluteDateTime(person.lastRememberedAt);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-miora-frost/60">
        <Heart size={18} className="text-miora-accent shrink-0" fill="currentColor" strokeWidth={0} />
        <div className="min-w-0">
          <p className="text-lg font-semibold text-miora-charcoal leading-tight tabular-nums">
            {person.remembranceCount}
          </p>
          <p className="text-xs text-miora-muted mt-0.5">
            {person.remembranceCount === 1 ? "memory" : "memories"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-miora-frost/60">
        <Clock size={18} className="text-miora-muted shrink-0" strokeWidth={1.8} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-miora-charcoal leading-tight truncate">
            {relativeDate ?? "Never"}
          </p>
          <p className="text-xs text-miora-muted mt-0.5">
            {absoluteDate ? "Last remembered" : "Not yet remembered"}
          </p>
        </div>
      </div>
    </div>
  );
}
