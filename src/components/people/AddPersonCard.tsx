import { Plus } from "lucide-react";

interface AddPersonCardProps {
  onClick: () => void;
}

export default function AddPersonCard({ onClick }: AddPersonCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white rounded-2xl p-4 border-2 border-dashed border-miora-blue/30 hover:border-miora-blue/50 hover:bg-miora-diamond/30 transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[160px] focus:outline-none focus-visible:ring-2 focus-visible:ring-miora-turbulent/30 focus-visible:ring-offset-2"
    >
      <div className="w-10 h-10 rounded-full bg-miora-blue/20 flex items-center justify-center mb-2 group-hover:bg-miora-blue/30 transition-colors">
        <Plus size={18} className="text-miora-turbulent" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-medium text-miora-astral">
        Add someone
      </h3>
      <p className="text-[12px] text-miora-meditative mt-1 max-w-[180px] leading-relaxed">
        Create a space for someone you want to remember.
      </p>
    </button>
  );
}
