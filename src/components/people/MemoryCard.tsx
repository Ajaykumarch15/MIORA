import { useNavigate } from "react-router-dom";
import { MessageCircle, Heart, MapPin, Quote, Image, MoreHorizontal } from "lucide-react";
import DropdownMenu from "../ui/DropdownMenu";
import type { RemembranceContext } from "../../types";

interface MemoryCardProps {
  context: RemembranceContext;
  date: string;
  personId: string;
}

const TYPE_CONFIG = {
  memory: { icon: Image, label: "Memory" },
  conversation: { icon: MessageCircle, label: "Conversation" },
  feeling: { icon: Heart, label: "Feeling" },
  place: { icon: MapPin, label: "Place" },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default function MemoryCard({ context, date, personId }: MemoryCardProps) {
  const navigate = useNavigate();
  const config = TYPE_CONFIG[context.type];
  const Icon = config.icon;

  function handleClick() {
    navigate(`/people/${personId}/memory/${context.id}`);
  }

  const menuItems = [
    { label: "Edit", icon: MoreHorizontal, onClick: (e: React.MouseEvent) => { e.stopPropagation(); navigate(`/people/${personId}/memory/${context.id}`); } },
    { label: "Delete", icon: MoreHorizontal, onClick: (e: React.MouseEvent) => { e.stopPropagation(); }, danger: true },
  ];

  if (context.photoUrl) {
    return (
      <button
        onClick={handleClick}
        className="group w-full text-left bg-white rounded-2xl border border-miora-blue/15 overflow-hidden hover:shadow-md hover:shadow-miora-astral/5 transition-all duration-200"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={context.photoUrl}
            alt={context.title || "Memory photo"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu items={menuItems} />
          </div>
        </div>
        <div className="p-5">
          {context.title && (
            <h3 className="font-medium text-miora-astral text-[15px] leading-snug mb-1">
              {context.title}
            </h3>
          )}
          <p className="text-[13px] text-miora-meditative line-clamp-2">
            {context.content}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-[12px] text-miora-meditative/70">{formatDate(date)}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
              <DropdownMenu items={menuItems} />
            </div>
          </div>
        </div>
      </button>
    );
  }

  if (context.type === "memory" && context.title) {
    return (
      <button
        onClick={handleClick}
        className="group w-full text-left bg-white rounded-2xl border border-miora-blue/15 p-5 hover:shadow-md hover:shadow-miora-astral/5 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="w-8 h-8 rounded-lg bg-miora-diamond/60 flex items-center justify-center">
            <Icon size={16} className="text-miora-turbulent" strokeWidth={1.5} />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu items={menuItems} />
          </div>
        </div>
        <h3 className="font-medium text-miora-astral text-[15px] leading-snug mb-2">
          {context.title}
        </h3>
        <p className="text-[13px] text-miora-meditative line-clamp-3">
          {context.content}
        </p>
        <div className="mt-4">
          <span className="text-[12px] text-miora-meditative/70">{formatDate(date)}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="group w-full text-left bg-white rounded-2xl border border-miora-blue/15 p-5 hover:shadow-md hover:shadow-miora-astral/5 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-miora-diamond/60 flex items-center justify-center">
          {context.type === "conversation" ? (
            <Quote size={16} className="text-miora-turbulent" strokeWidth={1.5} />
          ) : (
            <Icon size={16} className="text-miora-turbulent" strokeWidth={1.5} />
          )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu items={menuItems} />
        </div>
      </div>
      <p className="text-[15px] text-miora-astral leading-relaxed italic">
        "{context.content}"
      </p>
      {context.title && (
        <p className="text-[13px] text-miora-meditative mt-2">
          — {context.title}
        </p>
      )}
      <div className="mt-4">
        <span className="text-[12px] text-miora-meditative/70">{formatDate(date)}</span>
      </div>
    </button>
  );
}
