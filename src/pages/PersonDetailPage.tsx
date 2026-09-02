import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus, MoreHorizontal, Archive, Trash2 } from "lucide-react";
import PersonProfileHeader from "../components/people/PersonProfileHeader";
import MemoryGrid from "../components/people/MemoryGrid";
import EmptyMemoryState from "../components/people/EmptyMemoryState";
import DropdownMenu from "../components/ui/DropdownMenu";
import EmptyState from "../components/ui/EmptyState";
import { useMiora } from "../context/MioraContext";

export default function PersonDetailPage() {
  const { personId } = useParams<{ personId: string }>();
  const navigate = useNavigate();
  const { getPersonById, getContextsForRemembrance, getRemembrances, requestDeletion } =
    useMiora();
  const person = personId ? getPersonById(personId) : undefined;

  if (!person) {
    return (
      <div>
        <EmptyState
          title="Person not found"
          description="This person may have been removed."
          action={
            <Link
              to="/people"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-miora-frost text-miora-charcoal text-sm font-medium border border-miora-line transition-all hover:bg-miora-snow active:scale-[0.98]"
            >
              Back to People
            </Link>
          }
        />
      </div>
    );
  }

  // Get all remembrances for this person
  const remembrances = getRemembrances(person.id);

  // Get all contexts (memories) for this person
  const allContexts = remembrances.flatMap((r) =>
    getContextsForRemembrance(r.id),
  );

  const menuItems = [
    {
      label: "Edit details",
      icon: MoreHorizontal,
      onClick: () => navigate(`/people/${person.id}/edit`),
    },
    {
      label: "Archive",
      icon: Archive,
      onClick: () => navigate(`/people/${person.id}/archive`),
    },
    {
      label: "Remove from People",
      icon: Trash2,
      danger: true,
      onClick: () => requestDeletion(person.id),
    },
  ];

  function handleAddMemory() {
    navigate(`/people/${person.id}/memory`);
  }

  return (
    <div
      className="min-h-dvh"
      style={{
        background: "linear-gradient(180deg, #F7F8F7 0%, #EAF0F5 100%)",
      }}
    >
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Back Navigation */}
        <div className="flex items-center justify-between py-6">
          <button
            onClick={() => navigate("/people")}
            className="flex items-center gap-2 text-[14px] text-miora-turbulent hover:text-miora-astral transition-colors group"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.5}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to People
          </button>

          <DropdownMenu items={menuItems} />
        </div>

        {/* Person Profile */}
        <PersonProfileHeader person={person} />

        {/* Add Memory CTA */}
        <div className="flex justify-center pb-12">
          <button
            onClick={handleAddMemory}
            className="h-14 px-8 rounded-full bg-miora-astral text-white text-[15px] font-medium flex items-center gap-2.5 hover:bg-[#294763] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,55,80,0.15)]"
          >
            <Plus size={18} strokeWidth={1.5} />
            Add a memory
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-miora-blue/20 mb-10" />

        {/* Memories Section */}
        {allContexts.length > 0 ? (
          <MemoryGrid contexts={allContexts} personName={person.name} personId={person.id} />
        ) : (
          <EmptyMemoryState onAddMemory={handleAddMemory} />
        )}

        {/* Bottom Spacer */}
        <div className="h-16" />
      </div>
    </div>
  );
}
