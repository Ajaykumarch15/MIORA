import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMiora } from "../context/MioraContext";
import { sortPeopleByRecency } from "../lib/dateUtils";
import PersonCard from "../components/people/PersonCard";
import AddPersonCard from "../components/people/AddPersonCard";
import PeopleEmptyState from "../components/people/PeopleEmptyState";
import SearchInput from "../components/ui/SearchInput";

export default function PeoplePage() {
  const navigate = useNavigate();
  const { getActivePeople } = useMiora();
  const sortedPeople = sortPeopleByRecency(getActivePeople());
  const [search, setSearch] = useState("");

  const filteredPeople = search
    ? sortedPeople.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : sortedPeople;

  const hasPeople = sortedPeople.length > 0;

  return (
    <div className="min-h-dvh bg-miora-diamond/50">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-12 py-10 lg:py-14">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-medium text-miora-astral leading-tight tracking-tight">
              People
            </h1>
            <p className="mt-2 text-[15px] text-miora-turbulent">
              The people you want to keep close.
            </p>
          </div>

          {hasPeople && (
            <button
              onClick={() => navigate("/people/new")}
              className="shrink-0 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-miora-astral text-miora-diamond font-medium text-sm transition-all hover:bg-miora-turbulent active:scale-[0.98]"
            >
              <span className="text-lg leading-none">+</span>
              Add someone
            </button>
          )}
        </div>

        {!hasPeople ? (
          <PeopleEmptyState onAdd={() => navigate("/people/new")} />
        ) : (
          <>
            {/* Search */}
            <div className="mb-8">
              <SearchInput value={search} onChange={setSearch} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPeople.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
              <AddPersonCard onClick={() => navigate("/people/new")} />
            </div>

            {filteredPeople.length === 0 && search && (
              <div className="text-center py-16">
                <p className="text-sm text-miora-meditative">
                  No people matching &ldquo;{search}&rdquo;
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
