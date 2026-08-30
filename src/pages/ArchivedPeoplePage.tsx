import { Link, useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import TopBar from "../components/layout/TopBar";
import PersonAvatar from "../components/people/PersonAvatar";
import EmptyState from "../components/ui/EmptyState";
import { useMiora } from "../context/MioraContext";
import { formatAbsoluteDateTime } from "../lib/dateUtils";

export default function ArchivedPeoplePage() {
  const navigate = useNavigate();
  const { getArchivedPeople, restorePerson } = useMiora();
  const archived = getArchivedPeople();

  async function handleRestore(personId: string) {
    await restorePerson(personId);
    navigate(`/people/${personId}`);
  }

  return (
    <div>
      <TopBar title="Archived" showBack />

      <div className="pt-1 px-1">
        {archived.length === 0 ? (
          <EmptyState
            title="No archived people"
            description="People you archive will stay here."
            action={
              <Link
                to="/people"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-miora-frost text-miora-charcoal text-sm font-medium border border-miora-line transition-all hover:bg-miora-snow active:scale-[0.98]"
              >
                Back to People
              </Link>
            }
          />
        ) : (
          <div className="flex flex-col divide-y divide-miora-line/50">
            {archived.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-4 px-4 py-3.5"
              >
                <PersonAvatar name={person.name} />

                <div className="flex-1 min-w-0 py-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-semibold text-miora-charcoal leading-snug">
                      {person.name}
                    </span>
                    {person.nickname && (
                      <span className="text-[13px] text-miora-muted/70 italic">
                        &ldquo;{person.nickname}&rdquo;
                      </span>
                    )}
                  </div>
                  {person.archivedAt && (
                    <p className="text-xs text-miora-muted/60 mt-1">
                      Archived {formatAbsoluteDateTime(person.archivedAt)?.split(",")[0]}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleRestore(person.id)}
                  className="flex items-center gap-1.5 h-9 px-3.5 rounded-full text-miora-muted text-[13px] font-medium transition-colors hover:bg-miora-frost hover:text-miora-charcoal active:scale-[0.98]"
                  aria-label={`Restore ${person.name}`}
                >
                  <RotateCcw size={14} strokeWidth={1.8} />
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
