import { UserPlus } from "lucide-react";

interface PeopleEmptyStateProps {
  onAdd: () => void;
}

export default function PeopleEmptyState({ onAdd }: PeopleEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-8">
      <div className="w-16 h-16 rounded-full bg-miora-blue/20 flex items-center justify-center mb-6">
        <UserPlus size={28} className="text-miora-turbulent" strokeWidth={1.2} />
      </div>

      <h2 className="font-display text-2xl font-medium text-miora-astral leading-snug">
        Someone worth remembering?
      </h2>

      <p className="mt-3 text-[15px] text-miora-turbulent leading-relaxed max-w-sm">
        Create a quiet space for the people you want to keep close.
      </p>

      <button
        onClick={onAdd}
        className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-miora-astral text-miora-diamond font-medium text-[15px] transition-all hover:bg-miora-turbulent active:scale-[0.98]"
      >
        <span className="text-lg leading-none">+</span>
        Add someone
      </button>
    </div>
  );
}
