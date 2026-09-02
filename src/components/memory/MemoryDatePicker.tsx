import { Calendar } from "lucide-react";

interface MemoryDatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemoryDatePicker({ value, onChange }: MemoryDatePickerProps) {
  return (
    <div className="flex-1">
      <label className="block text-[13px] font-medium text-miora-turbulent mb-2.5">
        When was this?
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 pl-11 rounded-xl bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[14px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all [color-scheme:light]"
        />
        <Calendar
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-miora-meditative/50 pointer-events-none"
          strokeWidth={1.5}
        />
      </div>
      <p className="text-[12px] text-miora-meditative/60 mt-2">
        Leave it empty if you don't remember exactly.
      </p>
    </div>
  );
}
