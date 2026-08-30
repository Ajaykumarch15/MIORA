import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import PersonCard from "./PersonCard";
import EmptyState from "../ui/EmptyState";
import type { Person } from "../../data/mockPeople";

interface PersonListProps {
  people: Person[];
}

export default function PersonList({ people }: PersonListProps) {
  if (people.length === 0) {
    return (
      <EmptyState
        icon={<UserPlus size={32} strokeWidth={1.2} />}
        title="Someone on your mind?"
        description="Add the people you want to remember."
        action={
          <Link
            to="/people/new"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-miora-accent text-white text-sm font-medium transition-all hover:bg-miora-accent/90 active:scale-[0.98]"
          >
            Add someone
          </Link>
        }
      />
    );
  }

  return (
    <div className="flex flex-col divide-y divide-miora-line/50">
      {people.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
