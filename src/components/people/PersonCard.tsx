import { useNavigate } from "react-router-dom";
import { ChevronRight, Snowflake, Pencil, Archive, Trash2 } from "lucide-react";
import PersonAvatar from "./PersonAvatar";
import DropdownMenu from "../ui/DropdownMenu";
import { formatRelativeDate } from "../../lib/dateUtils";
import { useMiora } from "../../context/MioraContext";
import type { Person } from "../../types";

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  const navigate = useNavigate();
  const { archivePerson, requestDeletion } = useMiora();
  const relativeDate = formatRelativeDate(person.lastRememberedAt);

  const menuItems = [
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => navigate(`/people/${person.id}`),
    },
    {
      label: "Archive",
      icon: Archive,
      onClick: () => navigate(`/people/${person.id}/archive`),
    },
    {
      label: "Delete",
      icon: Trash2,
      danger: true,
      onClick: () => requestDeletion(person.id),
    },
  ];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/people/${person.id}`)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/people/${person.id}`); }}
      className="group w-full text-left bg-white rounded-2xl p-5 border border-miora-blue/20 hover:border-miora-blue/40 hover:shadow-md hover:shadow-miora-astral/5 shadow-sm shadow-miora-astral/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-miora-turbulent/30 focus-visible:ring-offset-2 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <PersonAvatar name={person.name} size="lg" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-medium text-miora-astral leading-snug truncate">
                {person.name}
              </h3>
              {person.nickname && (
                <p className="text-sm text-miora-meditative mt-0.5 truncate">
                  {person.nickname}
                </p>
              )}
              {!person.nickname && person.relationship && (
                <p className="text-sm text-miora-meditative mt-0.5 truncate">
                  {person.relationship}
                </p>
              )}
            </div>

            <DropdownMenu items={menuItems} />
          </div>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-miora-blue/30" />
            <Snowflake size={12} className="text-miora-blue/50 shrink-0" strokeWidth={1.5} />
            <div className="flex-1 h-px bg-miora-blue/30" />
          </div>

          <p className="text-sm text-miora-turbulent font-medium tabular-nums">
            {person.remembranceCount}{" "}
            {person.remembranceCount === 1 ? "memory" : "memories"}
          </p>
          <p className="text-xs text-miora-meditative mt-0.5">
            {relativeDate ? `Last remembered ${relativeDate}` : "Not yet remembered"}
          </p>
        </div>

        <ChevronRight
          size={18}
          className="text-miora-meditative/40 group-hover:text-miora-turbulent transition-colors mt-2 shrink-0"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
