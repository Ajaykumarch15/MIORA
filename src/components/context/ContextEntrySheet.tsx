import { useRef, useEffect } from "react";
import BottomSheet from "../ui/BottomSheet";
import PrimaryButton from "../ui/PrimaryButton";
import type { ContextType } from "../../data/mockPeople";

const CONTEXT_QUESTIONS: Record<ContextType, string> = {
  memory: "What do you remember?",
  conversation: "What did you talk about?",
  feeling: "How did they make you feel?",
  place: "Where does this remind you of?",
};

const CONTEXT_PLACEHOLDERS: Record<ContextType, string> = {
  memory: "Write a memory...",
  conversation: "What did you talk about?",
  feeling: "How did you feel?",
  place: "Where was it?",
};

const CONTEXT_LABELS: Record<ContextType, string> = {
  memory: "Memory",
  conversation: "Conversation",
  feeling: "Feeling",
  place: "Place",
};

interface ContextEntrySheetProps {
  isOpen: boolean;
  type: ContextType | null;
  content: string;
  onContentChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
  saving?: boolean;
}

export default function ContextEntrySheet({
  isOpen,
  type,
  content,
  onContentChange,
  onSave,
  onClose,
  saving = false,
}: ContextEntrySheetProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, type]);

  if (!type) return null;

  const canSave = content.trim().length > 0 && !saving;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="py-2">
        <h3 className="text-lg font-semibold text-miora-charcoal mb-1">
          {CONTEXT_LABELS[type]}
        </h3>
        <p className="text-sm text-miora-muted mb-5">
          {CONTEXT_QUESTIONS[type]}
        </p>

        <label htmlFor="context-textarea" className="sr-only">
          {CONTEXT_LABELS[type]}
        </label>
        <textarea
          ref={textareaRef}
          id="context-textarea"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={CONTEXT_PLACEHOLDERS[type]}
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl bg-miora-frost border border-miora-line/70 text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-steel/60 focus:bg-white transition-colors resize-none"
        />

        <div className="mt-5">
          <PrimaryButton
            fullWidth
            disabled={!canSave}
            onClick={onSave}
            loading={saving}
          >
            Save Context
          </PrimaryButton>
        </div>
      </div>
    </BottomSheet>
  );
}
