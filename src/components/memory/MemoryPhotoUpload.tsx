import { useRef } from "react";
import { Camera } from "lucide-react";

interface MemoryPhotoUploadProps {
  onFilesSelected: (files: File[]) => void;
  currentCount: number;
  maxPhotos?: number;
}

export default function MemoryPhotoUpload({
  onFilesSelected,
  currentCount,
  maxPhotos = 10,
}: MemoryPhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const remaining = maxPhotos - currentCount;

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files.slice(0, remaining));
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) {
      onFilesSelected(files.slice(0, remaining));
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  if (remaining <= 0) return null;

  return (
    <div>
      <label className="block text-[13px] font-medium text-miora-turbulent mb-2.5">
        Add photos <span className="text-miora-meditative/60">(optional)</span>
      </label>
      <button
        type="button"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full py-10 rounded-xl border-[1.5px] border-dashed border-miora-turbulent/25 bg-miora-diamond/15 flex flex-col items-center gap-3 text-miora-turbulent/60 hover:border-miora-turbulent/40 hover:bg-miora-diamond/25 transition-colors cursor-pointer"
      >
        <Camera size={28} strokeWidth={1.5} />
        <div className="text-center">
          <p className="text-[15px] font-medium text-miora-turbulent/70">
            Add a photo or two
          </p>
          <p className="text-[13px] text-miora-meditative/60 mt-1">
            Photos can help bring a moment back.
          </p>
          <p className="text-[12px] text-miora-meditative/50 mt-1">
            Drag & drop images here, or click to browse
          </p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
        aria-label="Upload photos"
      />
    </div>
  );
}
