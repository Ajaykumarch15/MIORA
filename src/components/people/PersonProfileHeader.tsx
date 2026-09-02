import { Pencil, Snowflake } from "lucide-react";
import type { Person } from "../../types";

interface PersonProfileHeaderProps {
  person: Person;
  onEdit?: () => void;
}

export default function PersonProfileHeader({
  person,
  onEdit,
}: PersonProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      {/* Photo */}
      <div className="relative mb-6">
        {person.photoUrl ? (
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg shadow-miora-astral/10">
            <img
              src={person.photoUrl}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg shadow-miora-astral/10 bg-miora-diamond/60 flex items-center justify-center">
            <span className="text-4xl font-display text-miora-astral/40">
              {person.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-white border border-miora-blue/20 shadow-md flex items-center justify-center text-miora-turbulent hover:text-miora-astral hover:bg-miora-diamond/30 transition-colors"
            aria-label="Edit profile"
          >
            <Pencil size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Name */}
      <h1 className="font-display text-[36px] font-medium text-miora-astral leading-tight mb-1">
        {person.name}
      </h1>

      {/* Relationship */}
      {(person.nickname || person.relationship) && (
        <p className="text-[16px] text-miora-meditative">
          {person.nickname || person.relationship}
        </p>
      )}

      {/* Decorative Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="w-16 h-px bg-miora-blue/30" />
        <Snowflake
          size={14}
          className="text-miora-blue/40 shrink-0"
          strokeWidth={1.5}
        />
        <div className="w-16 h-px bg-miora-blue/30" />
      </div>

      {/* Description */}
      {person.description && (
        <p className="text-[16px] text-miora-turbulent leading-relaxed max-w-lg">
          {person.description}
        </p>
      )}
    </div>
  );
}
