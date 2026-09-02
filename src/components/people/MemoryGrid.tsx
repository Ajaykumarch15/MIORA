import { useState } from "react";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import MemoryCard from "./MemoryCard";
import type { RemembranceContext } from "../../types";

interface MemoryGridProps {
  contexts: RemembranceContext[];
  personName: string;
  personId: string;
}

export default function MemoryGrid({ contexts, personName, personId }: MemoryGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = [
    { key: "memory", label: "Memories" },
    { key: "conversation", label: "Conversations" },
    { key: "feeling", label: "Feelings" },
    { key: "place", label: "Places" },
  ];

  const filteredContexts = contexts.filter((ctx) => {
    const matchesSearch =
      !searchQuery ||
      ctx.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ctx.title?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = !activeFilter || ctx.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-[20px] font-display font-medium text-miora-astral">
            Moments with {personName}
          </h2>
          <p className="text-[14px] text-miora-meditative mt-1">
            Small things, important things, and everything in between.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-miora-meditative/50"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories..."
              className="w-full sm:w-56 h-10 pl-9 pr-4 rounded-xl bg-white border border-miora-blue/20 text-[13px] text-miora-charcoal placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/40 transition-colors"
            />
          </div>
          <button className="h-10 px-4 rounded-xl bg-white border border-miora-blue/20 text-[13px] text-miora-turbulent hover:bg-miora-diamond/30 transition-colors flex items-center gap-2">
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filter
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() =>
              setActiveFilter(activeFilter === filter.key ? null : filter.key)
            }
            className={`px-4 py-2 rounded-full text-[13px] whitespace-nowrap transition-colors ${
              activeFilter === filter.key
                ? "bg-miora-astral text-white"
                : "bg-white border border-miora-blue/20 text-miora-turbulent hover:bg-miora-diamond/30"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredContexts.length > 0 ? (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredContexts.map((context) => (
              <MemoryCard
                key={context.id}
                context={context}
                date={context.createdAt}
                personId={personId}
              />
            ))}
          </div>
          {filteredContexts.length > 6 && (
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white border border-miora-blue/20 shadow-md flex items-center justify-center text-miora-turbulent hover:bg-miora-diamond/30 transition-colors hidden xl:flex">
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[14px] text-miora-meditative">
            {searchQuery || activeFilter
              ? "No memories match your search."
              : "No memories yet."}
          </p>
        </div>
      )}
    </div>
  );
}
