import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import PersonAvatar from "./PersonAvatar";
import { formatRelativeDate } from "../../lib/dateUtils";
import type { Person } from "../../types";

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  const navigate = useNavigate();
  const relativeDate = formatRelativeDate(person.lastRememberedAt);

  return (
    <button
      onClick={() => navigate(`/people/${person.id}`)}
      className="group w-full text-left bg-white rounded-2xl p-4 border border-miora-blue/20 hover:border-miora-blue/40 hover:shadow-md hover:shadow-miora-astral/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-miora-turbulent/30 focus-visible:ring-offset-2"
    >
      <div className="flex items-center justify-between mb-3">
        <PersonAvatar name={person.name} size="md" />
        <ChevronRight
          size={16}
          className="text-miora-meditative/40 group-hover:text-miora-turbulent transition-colors"
          strokeWidth={1.5}
        />
      </div>

      <h3 className="font-display text-base font-medium text-miora-astral leading-snug">
        {person.name}
      </h3>

      {person.nickname && (
        <p className="text-xs text-miora-meditative italic mt-0.5">
          &ldquo;{person.nickname}&rdquo;
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-miora-blue/15">
        <p className="text-xs text-miora-turbulent font-medium tabular-nums">
          {person.remembranceCount} {person.remembranceCount === 1 ? "memory" : "memories"}
        </p>
        <p className="text-[11px] text-miora-meditative mt-0.5">
          {relativeDate ? `Last remembered ${relativeDate}` : "Not yet remembered"}
        </p>
      </div>
    </button>
  );
}
