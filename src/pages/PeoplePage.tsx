import { Link } from "react-router-dom";
import { Plus, ChevronRight } from "lucide-react";
import TopBar from "../components/layout/TopBar";
import PersonList from "../components/people/PersonList";
import { useMiora } from "../context/MioraContext";
import { sortPeopleByRecency } from "../lib/dateUtils";

export default function PeoplePage() {
  const { getActivePeople, getArchivedPeople } = useMiora();
  const sortedPeople = sortPeopleByRecency(getActivePeople());
  const archivedCount = getArchivedPeople().length;

  return (
    <div>
      <TopBar
        title="People"
        rightAction={
          <Link
            to="/people/new"
            className="w-9 h-9 rounded-full bg-miora-charcoal/90 text-miora-paper flex items-center justify-center transition-all hover:bg-miora-charcoal active:scale-95"
            aria-label="Add person"
          >
            <Plus size={18} strokeWidth={2} />
          </Link>
        }
      />
      <div className="pt-1 px-1">
        <PersonList people={sortedPeople} />

        {archivedCount > 0 && (
          <Link
            to="/archived"
            className="flex items-center justify-between px-4 py-3.5 mt-2 text-left transition-colors hover:bg-miora-frost/60 rounded-2xl"
          >
            <span className="text-[14px] text-miora-muted">
              Archived
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] text-miora-muted/60 tabular-nums">
                {archivedCount}
              </span>
              <ChevronRight size={16} className="text-miora-muted/40" strokeWidth={1.5} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
