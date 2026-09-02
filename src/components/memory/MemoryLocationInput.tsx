import { MapPin } from "lucide-react";

interface MemoryLocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemoryLocationInput({ value, onChange }: MemoryLocationInputProps) {
  return (
    <div className="flex-1">
      <label className="block text-[13px] font-medium text-miora-turbulent mb-2.5">
        Where were you? <span className="text-miora-meditative/60">(optional)</span>
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Somewhere meaningful"
          maxLength={100}
          className="w-full h-12 px-4 pl-11 rounded-xl bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[14px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all"
        />
        <MapPin
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-miora-meditative/50"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
