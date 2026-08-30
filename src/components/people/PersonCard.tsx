import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import PersonAvatar from "./PersonAvatar";
import { formatRelativeDate } from "../../lib/dateUtils";
import type { Person } from "../../data/mockPeople";

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  const navigate = useNavigate();
  const relativeDate = formatRelativeDate(person.lastRememberedAt);

  return (
    <button
      onClick={() => navigate(`/people/${person.id}`)}
      className="w-full flex items-center gap-4 px-1 py-3.5 text-left transition-colors hover:bg-miora-frost/60 active:bg-miora-frost rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-miora-steel/30 focus-visible:ring-offset-2 focus-visible:ring-offset-miora-paper"
    >
      <PersonAvatar name={person.name} />

      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-[15px] font-semibold text-miora-charcoal leading-snug truncate">
            {person.name}
          </span>
          {person.nickname && (
            <span className="text-[13px] text-miora-muted/70 italic shrink-0">
              &ldquo;{person.nickname}&rdquo;
            </span>
          )}
        </div>
        <p className="text-xs text-miora-muted/60 mt-1 leading-relaxed">
          {relativeDate ?? "Never remembered"}
        </p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 pr-1">
        <Heart
          size={14}
          className="text-miora-accent"
          fill="currentColor"
          strokeWidth={0}
        />
        <span className="text-[13px] font-medium text-miora-muted tabular-nums">
          {person.remembranceCount}
        </span>
      </div>
    </button>
  );
}
