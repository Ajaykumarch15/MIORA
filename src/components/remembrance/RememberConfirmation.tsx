import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import BottomSheet from "../ui/BottomSheet";
import PrimaryButton from "../ui/PrimaryButton";
import type { Person } from "../../data/mockPeople";

interface RememberConfirmationProps {
  isOpen: boolean;
  person: Person;
  remembranceId: string | null;
}

export default function RememberConfirmation({
  isOpen,
  person,
  remembranceId,
}: RememberConfirmationProps) {
  const navigate = useNavigate();

  function handleDone() {
    navigate(`/people/${person.id}`);
  }

  function handleAddContext() {
    if (!remembranceId) return;
    navigate(`/people/${person.id}/context?remembrance=${remembranceId}`);
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={handleDone}>
      <div className="flex flex-col items-center text-center py-4">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full bg-miora-accent-soft flex items-center justify-center mb-5">
          <Check size={28} className="text-miora-accent" strokeWidth={2.5} />
        </div>

        <h2 className="text-lg font-semibold text-miora-charcoal mb-1.5">
          Thought recorded
        </h2>
        <p className="text-sm text-miora-muted mb-8 leading-relaxed">
          {person.name} has been remembered.
        </p>

        <div className="w-full space-y-3">
          <PrimaryButton fullWidth onClick={handleAddContext}>
            Add Context
          </PrimaryButton>
          <button
            onClick={handleDone}
            className="w-full h-13 flex items-center justify-center text-sm font-medium text-miora-muted hover:text-miora-charcoal transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
