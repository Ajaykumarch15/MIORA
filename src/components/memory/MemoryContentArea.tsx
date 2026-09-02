import { Sparkles } from "lucide-react";

interface MemoryContentAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemoryContentArea({ value, onChange }: MemoryContentAreaProps) {
  return (
    <div>
      <label className="block text-[15px] font-medium text-miora-astral mb-3">
        What would you like to remember?
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write about a moment, a thought, a feeling, or something you don't want to forget..."
          maxLength={2000}
          rows={8}
          className="w-full px-5 py-4 rounded-xl bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[15px] leading-relaxed placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all resize-none min-h-[220px]"
        />
        <Sparkles
          size={14}
          className="absolute bottom-4 right-4 text-miora-meditative/30"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
