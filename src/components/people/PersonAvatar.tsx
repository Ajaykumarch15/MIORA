const AVATAR_COLORS = [
  "bg-[#dce3eb] text-[#5a6e82]",
  "bg-[#e4dfe8] text-[#6b5e7a]",
  "bg-[#d9e2dc] text-[#4f6b5c]",
  "bg-[#e2ddd6] text-[#7a6e5e]",
  "bg-[#dde3e8] text-[#5c6a7a]",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface PersonAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export default function PersonAvatar({ name, size = "md" }: PersonAvatarProps) {
  const sizeClasses = {
    sm: "w-9 h-9 text-xs",
    md: "w-11 h-11 text-[13px]",
    lg: "w-16 h-16 text-base",
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium shrink-0 select-none ${sizeClasses[size]} ${getColor(name)}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
