import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

interface PhotoUploadProps {
  value: string | null;
  onChange: (file: File | null) => void;
  size?: number;
}

export default function PhotoUpload({ value, onChange, size = 180 }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    onChange(file);
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        className="relative rounded-full transition-all duration-200 group"
        style={{ width: size, height: size }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Person photo"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-miora-muted hover:text-miora-charcoal hover:bg-miora-frost transition-colors"
              aria-label="Remove photo"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </>
        ) : (
          <div
            className="w-full h-full rounded-full border-[1.5px] border-dashed border-miora-turbulent/30 bg-miora-diamond/20 flex flex-col items-center justify-center gap-1.5 text-miora-turbulent/60 group-hover:border-miora-turbulent/50 group-hover:bg-miora-diamond/30 transition-colors"
          >
            <Camera size={24} strokeWidth={1.5} />
            <span className="text-[13px] font-medium">Add a photo</span>
            <span className="text-[11px] text-miora-meditative/60">Optional</span>
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        aria-label="Upload photo"
      />
    </div>
  );
}
