import { Pencil } from "lucide-react";

interface MemoryTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemoryTitleInput({ value, onChange }: MemoryTitleInputProps) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-miora-turbulent mb-2.5">
        Give this moment a name <span className="text-miora-meditative/60">(optional)</span>
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="A walk we didn't want to end"
          maxLength={100}
          className="w-full h-14 px-4 pr-12 rounded-xl bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all"
        />
        <Pencil
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-miora-meditative/40"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
