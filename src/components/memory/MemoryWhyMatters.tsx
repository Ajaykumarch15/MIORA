interface MemoryWhyMattersProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MemoryWhyMatters({ value, onChange }: MemoryWhyMattersProps) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-miora-turbulent mb-2.5">
        Why does this moment matter to you? <span className="text-miora-meditative/60">(optional)</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A few words about why you want to remember this..."
        maxLength={500}
        rows={4}
        className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[14px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all resize-none min-h-[120px]"
      />
    </div>
  );
}
