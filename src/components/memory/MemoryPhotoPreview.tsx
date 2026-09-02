import { X, Plus } from "lucide-react";

interface MemoryPhotoPreviewProps {
  photos: Array<{ file: File; preview: string }>;
  onRemove: (index: number) => void;
  onAddMore: () => void;
  maxPhotos?: number;
}

export default function MemoryPhotoPreview({
  photos,
  onRemove,
  onAddMore,
  maxPhotos = 10,
}: MemoryPhotoPreviewProps) {
  if (photos.length === 0) return null;

  return (
    <div>
      <div className="flex gap-3 flex-wrap">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative w-20 h-20 rounded-lg overflow-hidden group"
          >
            <img
              src={photo.preview}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove photo"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </div>
        ))}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={onAddMore}
            className="w-20 h-20 rounded-lg border-[1.5px] border-dashed border-miora-turbulent/25 flex flex-col items-center justify-center gap-1 text-miora-turbulent/50 hover:border-miora-turbulent/40 hover:bg-miora-diamond/20 transition-colors"
          >
            <Plus size={18} strokeWidth={1.5} />
            <span className="text-[10px]">Add more</span>
          </button>
        )}
      </div>
      <p className="text-[12px] text-miora-meditative/60 mt-3">
        You can add up to {maxPhotos} photos.
      </p>
    </div>
  );
}
