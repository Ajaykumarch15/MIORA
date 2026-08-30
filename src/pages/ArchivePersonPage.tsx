import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import TopBar from "../components/layout/TopBar";
import PersonProfileHeader from "../components/people/PersonProfileHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import Dialog from "../components/ui/Dialog";
import EmptyState from "../components/ui/EmptyState";
import { useMiora } from "../context/MioraContext";

export default function ArchivePersonPage() {
  const { personId } = useParams<{ personId: string }>();
  const navigate = useNavigate();
  const { getPersonById, archivePerson } = useMiora();
  const person = personId ? getPersonById(personId) : undefined;

  const [showConfirm, setShowConfirm] = useState(false);

  async function handleArchive() {
    if (!personId) return;
    await archivePerson(personId);
    setShowConfirm(false);
    navigate("/people");
  }

  if (!person || person.isArchived) {
    return (
      <div>
        <TopBar showBack />
        <EmptyState
          title="Not available"
          description={
            person?.isArchived
              ? "This person has already been archived."
              : "This person may have been removed."
          }
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

  return (
    <div>
      <TopBar title="Archive" showBack />

      <div className="px-6 pt-4 pb-8">
        <PersonProfileHeader person={person} />

        <div className="mt-8 px-2">
          <p className="text-[15px] text-miora-charcoal leading-relaxed text-center">
            Archive {person.name}?
          </p>
          <p className="text-sm text-miora-muted leading-relaxed text-center mt-3">
            They will be removed from your active People list.
            Their memories will remain safely preserved.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <PrimaryButton
            fullWidth
            onClick={() => setShowConfirm(true)}
          >
            Archive
          </PrimaryButton>
          <SecondaryButton
            fullWidth
            onClick={() => navigate(-1)}
          >
            Cancel
          </SecondaryButton>
        </div>
      </div>

      <Dialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title={`Archive ${person.name}?`}
        description="They will be removed from your active People list. Their memories will remain safely preserved."
      >
        <div className="flex flex-col gap-2.5 mt-1">
          <button
            onClick={handleArchive}
            className="w-full h-12 flex items-center justify-center rounded-full bg-miora-charcoal text-white text-[15px] font-medium transition-all hover:bg-miora-charcoal/90 active:scale-[0.98]"
          >
            Yes, archive
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="w-full h-12 flex items-center justify-center rounded-full text-miora-muted text-[15px] font-medium transition-colors hover:text-miora-charcoal"
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
}
