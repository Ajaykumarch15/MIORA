import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, RotateCcw } from "lucide-react";
import TopBar from "../components/layout/TopBar";
import PersonProfileHeader from "../components/people/PersonProfileHeader";
import PersonMemorySummary from "../components/people/PersonMemorySummary";
import RecentRemembrances from "../components/people/RecentRemembrances";
import PrimaryButton from "../components/ui/PrimaryButton";
import SecondaryButton from "../components/ui/SecondaryButton";
import EmptyState from "../components/ui/EmptyState";
import { useMiora } from "../context/MioraContext";
import {
  getCooldownMs,
  getCooldownRemaining,
  formatCooldownRemaining,
} from "../lib/settingsStorage";

export default function PersonDetailPage() {
  const { personId } = useParams<{ personId: string }>();
  const navigate = useNavigate();
  const { getPersonById, restorePerson, state } = useMiora();
  const person = personId ? getPersonById(personId) : undefined;

  const cooldownMs = getCooldownMs(state.settings.thoughtCooldown);
  const cooldownRemaining = getCooldownRemaining(
    person?.lastRememberedAt ?? null,
    cooldownMs,
  );
  const isOnCooldown = cooldownRemaining > 0;

  const [remainingText, setRemainingText] = useState(
    formatCooldownRemaining(cooldownRemaining),
  );

  useEffect(() => {
    if (!isOnCooldown) return;
    const interval = setInterval(() => {
      const remaining = getCooldownRemaining(
        person?.lastRememberedAt ?? null,
        cooldownMs,
      );
      setRemainingText(formatCooldownRemaining(remaining));
      if (remaining <= 0) clearInterval(interval);
    }, 10000);
    return () => clearInterval(interval);
  }, [isOnCooldown, person?.lastRememberedAt, cooldownMs]);

  if (!person) {
    return (
      <div>
        <TopBar showBack />
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

  async function handleRestore() {
    if (!personId) return;
    await restorePerson(personId);
    navigate("/people");
  }

  return (
    <div>
      <TopBar showBack />
      <div className="px-6 pt-2 pb-8">
        <PersonProfileHeader person={person} />

        {person.isArchived && (
          <div className="mt-4 text-center">
            <p className="text-[13px] text-miora-muted italic">
              This person is archived
            </p>
          </div>
        )}

        <div className="mt-8">
          <PersonMemorySummary person={person} />
        </div>

        {isOnCooldown && !person.isArchived && (
          <div className="mt-4 text-center">
            <p className="text-[13px] text-miora-muted">
              Available again in {remainingText}
            </p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          {person.isArchived ? (
            <PrimaryButton
              fullWidth
              onClick={handleRestore}
              leftIcon={<RotateCcw size={18} strokeWidth={2} />}
            >
              Restore to People
            </PrimaryButton>
          ) : (
            <PrimaryButton
              fullWidth
              onClick={() => navigate(`/people/${person.id}/remembrance`)}
              leftIcon={<Heart size={18} fill="currentColor" strokeWidth={0} />}
            >
              Remember
            </PrimaryButton>
          )}

          {!person.isArchived && (
            <SecondaryButton
              fullWidth
              onClick={() => navigate(`/people/${person.id}/archive`)}
            >
              Archive
            </SecondaryButton>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-[15px] font-medium text-miora-charcoal mb-4">
            Thought timeline
          </h2>
          <RecentRemembrances personId={person.id} />
        </div>
      </div>
    </div>
  );
}
