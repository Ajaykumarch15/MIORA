import { useParams, Link } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { Heart } from "lucide-react";
import TopBar from "../components/layout/TopBar";
import PersonProfileHeader from "../components/people/PersonProfileHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
import EmptyState from "../components/ui/EmptyState";
import RememberConfirmation from "../components/remembrance/RememberConfirmation";
import { useMiora } from "../context/MioraContext";
import {
  getCooldownMs,
  getCooldownRemaining,
  formatCooldownRemaining,
} from "../lib/settingsStorage";

export default function RememberPage() {
  const { personId } = useParams<{ personId: string }>();
  const { getPersonById, rememberPerson, state } = useMiora();
  const person = personId ? getPersonById(personId) : undefined;

  const [isRecording, setIsRecording] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastRemembranceId, setLastRemembranceId] = useState<string | null>(null);
  const processingRef = useRef(false);

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

  const handleRemember = useCallback(async () => {
    if (!person || processingRef.current || isOnCooldown) return;
    processingRef.current = true;
    setIsRecording(true);

    setTimeout(async () => {
      const remembrance = await rememberPerson(person.id);
      setLastRemembranceId(remembrance?.id ?? null);
      setIsRecording(false);
      setShowConfirmation(true);
    }, 800);
  }, [person, isOnCooldown, rememberPerson]);

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

  return (
    <div className="flex flex-col min-h-dvh">
      <TopBar showBack />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-miora-muted text-sm mb-6">
          You remembered
        </p>

        <PersonProfileHeader person={person} />

        {isOnCooldown ? (
          <>
            <p className="text-miora-muted/60 text-[13px] mt-6 max-w-[260px] leading-relaxed italic">
              Take your time. You remembered {person.name} recently.
            </p>
            <div className="mt-8 px-6 py-4 rounded-2xl bg-miora-frost/60">
              <p className="text-[13px] text-miora-muted">
                You can remember them again in
              </p>
              <p className="text-lg font-semibold text-miora-charcoal mt-1 tabular-nums">
                {remainingText}
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-miora-muted/60 text-[13px] mt-6 max-w-[240px] leading-relaxed italic">
              Sometimes someone simply comes to mind.
            </p>
            <div className="mt-10 w-full max-w-[320px]">
              <PrimaryButton
                fullWidth
                onClick={handleRemember}
                loading={isRecording}
                disabled={isRecording}
                leftIcon={<Heart size={18} fill="currentColor" strokeWidth={0} />}
              >
                {isRecording ? "Recording..." : `Remember ${person.name}`}
              </PrimaryButton>
            </div>
          </>
        )}
      </div>

      <RememberConfirmation
        isOpen={showConfirmation}
        person={person}
        remembranceId={lastRemembranceId}
      />
    </div>
  );
}
