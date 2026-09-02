import { Image, Plus } from "lucide-react";

interface MemoryPhotoGalleryProps {
  photos: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onAddMore?: () => void;
}

export default function MemoryPhotoGallery({
  photos,
  selectedIndex,
  onSelect,
  onAddMore,
}: MemoryPhotoGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Image size={14} className="text-miora-turbulent/60" strokeWidth={1.5} />
        <span className="text-[13px] font-medium text-miora-turbulent">
          Photos from this memory
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
              selectedIndex === index
                ? "ring-2 ring-miora-astral ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

        {onAddMore && (
          <button
            onClick={onAddMore}
            className="shrink-0 w-20 h-20 rounded-xl border-[1.5px] border-dashed border-miora-turbulent/25 flex flex-col items-center justify-center gap-1 text-miora-turbulent/50 hover:border-miora-turbulent/40 hover:bg-miora-diamond/20 transition-colors"
          >
            <Plus size={16} strokeWidth={1.5} />
            <span className="text-[10px]">Add more</span>
          </button>
        )}
      </div>
    </div>
  );
}
