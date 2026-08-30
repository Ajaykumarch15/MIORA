import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import TopBar from "../components/layout/TopBar";
import ContextTypeCard from "../components/context/ContextTypeCard";
import ContextEntrySheet from "../components/context/ContextEntrySheet";
import EmptyState from "../components/ui/EmptyState";
import { useMiora } from "../context/MioraContext";
import type { ContextType } from "../types";

export default function AddContextPage() {
  const { personId } = useParams<{ personId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getPersonById, addContext } = useMiora();

  const remembranceId = searchParams.get("remembrance");
  const person = personId ? getPersonById(personId) : undefined;

  const [selectedType, setSelectedType] = useState<ContextType | null>(null);
  const [content, setContent] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const processingRef = useRef(false);

  const handleSelectType = useCallback((type: ContextType) => {
    setSelectedType(type);
    setSheetOpen(true);
    setContent("");
  }, []);

  const handleSave = useCallback(async () => {
    const trimmed = content.trim();
    if (!trimmed || !selectedType || processingRef.current) return;
    processingRef.current = true;
    setSaving(true);

    if (remembranceId) {
      await addContext(remembranceId, selectedType, trimmed);
    }

    setSaving(false);
    setSheetOpen(false);
    navigate(`/people/${personId}`);
  }, [content, selectedType, remembranceId, personId, navigate, addContext]);

  const handleSkip = useCallback(() => {
    navigate(`/people/${personId}`);
  }, [personId, navigate]);

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
      <TopBar title="Add Context" showBack />

      <div className="flex-1 px-6 pt-4 pb-6">
        <p className="text-miora-muted text-sm mb-6">
          Make this memory richer.
        </p>

        <div className="flex flex-col gap-2">
          <ContextTypeCard type="memory" onSelect={handleSelectType} />
          <ContextTypeCard type="conversation" onSelect={handleSelectType} />
          <ContextTypeCard type="feeling" onSelect={handleSelectType} />
          <ContextTypeCard type="place" onSelect={handleSelectType} />
        </div>

        <div className="mt-8">
          <button
            onClick={handleSkip}
            className="w-full h-13 flex items-center justify-center text-sm font-medium text-miora-muted hover:text-miora-charcoal transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>

      <ContextEntrySheet
        isOpen={sheetOpen}
        type={selectedType}
        content={content}
        onContentChange={setContent}
        onSave={handleSave}
        onClose={() => setSheetOpen(false)}
        saving={saving}
      />
    </div>
  );
}
