import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search people...",
}: SearchInputProps) {
  return (
    <div className="relative max-w-md">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-miora-meditative"
        strokeWidth={1.5}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-miora-blue/25 text-miora-charcoal text-sm placeholder:text-miora-meditative/60 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-sm transition-colors"
      />
    </div>
  );
}
