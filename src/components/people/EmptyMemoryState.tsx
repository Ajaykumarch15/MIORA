import { Plus, Sparkles } from "lucide-react";

interface EmptyMemoryStateProps {
  onAddMemory: () => void;
}

export default function EmptyMemoryState({ onAddMemory }: EmptyMemoryStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Botanical illustration */}
      <div className="w-20 h-20 rounded-full bg-miora-diamond/40 flex items-center justify-center mb-6">
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 text-miora-turbulent/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* Stem */}
          <path d="M24 40 V20" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M24 30 Q18 26 16 20 Q20 24 24 28" strokeLinecap="round" />
          <path d="M24 30 Q30 26 32 20 Q28 24 24 28" strokeLinecap="round" />
          <path d="M24 24 Q18 20 14 14 Q18 18 24 22" strokeLinecap="round" />
          <path d="M24 24 Q30 20 34 14 Q30 18 24 22" strokeLinecap="round" />
          {/* Top */}
          <circle cx="24" cy="14" r="2" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <h3 className="font-display text-[22px] text-miora-astral mb-2">
        Their story can begin here.
      </h3>

      <p className="text-[15px] text-miora-meditative text-center max-w-md mb-8">
        Add a photo, a thought, or a moment you'd like to remember.
      </p>

      <button
        onClick={onAddMemory}
        className="h-12 px-6 rounded-full bg-miora-astral text-white text-[15px] font-medium flex items-center gap-2 hover:bg-[#294763] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,55,80,0.12)]"
      >
        <Plus size={18} strokeWidth={1.5} />
        Add the first memory
      </button>

      <div className="flex items-center gap-2 mt-6 text-[13px] text-miora-meditative/60">
        <Sparkles size={12} strokeWidth={1.5} />
        <span>Every memory keeps them close.</span>
      </div>
    </div>
  );
}
