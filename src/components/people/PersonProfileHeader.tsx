import PersonAvatar from "./PersonAvatar";
import type { Person } from "../../data/mockPeople";

interface PersonProfileHeaderProps {
  person: Person;
}

export default function PersonProfileHeader({ person }: PersonProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <PersonAvatar name={person.name} size="lg" />
      <h1 className="text-xl font-semibold text-miora-charcoal mt-4 truncate max-w-full px-2">
        {person.name}
      </h1>
      {person.nickname && (
        <p className="text-sm text-miora-muted mt-1">
          &ldquo;{person.nickname}&rdquo;
        </p>
      )}
    </div>
  );
}
