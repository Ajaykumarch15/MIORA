import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  id?: string;
}

export default function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  id,
}: SelectFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-[13px] font-medium text-miora-turbulent mb-2.5"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-16 px-4 pr-10 rounded-[14px] bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[15px] appearance-none focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-miora-meditative/60 pointer-events-none"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
