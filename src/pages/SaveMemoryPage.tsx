import { useParams, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { ArrowLeft, Heart, ArrowRight, Snowflake, Lock } from "lucide-react";
import MemoryTitleInput from "../components/memory/MemoryTitleInput";
import MemoryContentArea from "../components/memory/MemoryContentArea";
import MemoryDatePicker from "../components/memory/MemoryDatePicker";
import MemoryLocationInput from "../components/memory/MemoryLocationInput";
import MemoryPhotoUpload from "../components/memory/MemoryPhotoUpload";
import MemoryPhotoPreview from "../components/memory/MemoryPhotoPreview";
import MemoryWhyMatters from "../components/memory/MemoryWhyMatters";
import { useMiora } from "../context/MioraContext";

interface PhotoItem {
  file: File;
  preview: string;
}

export default function SaveMemoryPage() {
  const { personId } = useParams<{ personId: string }>();
  const navigate = useNavigate();
  const { getPersonById, addContext, state } = useMiora();
  const person = personId ? getPersonById(personId) : undefined;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memoryDate, setMemoryDate] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [whyMatters, setWhyMatters] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFilesSelected = useCallback((files: File[]) => {
    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 10));
  }, []);

  const handleRemovePhoto = useCallback((index: number) => {
    setPhotos((prev) => {
      const removed = prev[index];
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleAddMore = useCallback(() => {
    const input = document.querySelector<HTMLInputElement>('input[type="file"]');
    input?.click();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || !personId || saving) return;

    setSaving(true);
    try {
      // Find the latest remembrance for this person, or create one
      const remembrances = state.remembrances.filter(
        (r) => r.personId === personId
      );
      let remembranceId = remembrances[0]?.id;

      if (!remembranceId) {
        // This shouldn't happen as we come from RememberPage, but fallback
        navigate(`/people/${personId}`);
        return;
      }

      // Upload photos and get URLs
      let photoUrl: string | undefined;
      if (photos.length > 0) {
        // For now, use the first photo's preview as a demo
        // In production, you'd upload to the server
        photoUrl = photos[0].preview;
      }

      await addContext(
        remembranceId,
        "memory",
        content.trim(),
        title.trim() || undefined,
        photoUrl,
        memoryDate || undefined,
        location.trim() || undefined,
        whyMatters.trim() || undefined
      );

      navigate(`/people/${personId}`);
    } catch {
      setSaving(false);
    }
  }

  if (!person) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-miora-muted">Person not found.</p>
      </div>
    );
  }

  const isValid = content.trim().length > 0;

  return (
    <div
      className="min-h-dvh"
      style={{
        background: `
          radial-gradient(circle at 15% 30%, rgba(210, 223, 238, 0.4), transparent 30%),
          radial-gradient(circle at 85% 60%, rgba(220, 230, 240, 0.3), transparent 35%),
          linear-gradient(180deg, #F7F8F7 0%, #EAF0F5 100%)
        `,
      }}
    >
      <div className="max-w-[800px] mx-auto px-6 py-8">
        {/* Back Navigation */}
        <button
          onClick={() => navigate(`/people/${personId}`)}
          className="flex items-center gap-2 text-[14px] text-miora-turbulent hover:text-miora-astral transition-colors group mb-8"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.5}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to {person.name}
        </button>

        {/* Page Introduction */}
        <div className="text-center mb-10">
          <Snowflake
            size={24}
            className="text-miora-blue/50 mx-auto mb-4"
            strokeWidth={1.5}
          />
          <h1 className="font-display text-[40px] font-medium text-miora-astral leading-tight mb-4">
            Save a moment
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-miora-blue/30" />
            <Heart
              size={14}
              className="text-miora-blue/40"
              strokeWidth={1.5}
            />
            <div className="w-12 h-px bg-miora-blue/30" />
          </div>
          <p className="text-[16px] text-miora-turbulent">
            Some things are worth keeping close.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <MemoryTitleInput value={title} onChange={setTitle} />

          <MemoryContentArea value={content} onChange={setContent} />

          <div className="flex gap-4 flex-col sm:flex-row">
            <MemoryDatePicker value={memoryDate} onChange={setMemoryDate} />
            <MemoryLocationInput value={location} onChange={setLocation} />
          </div>

          <MemoryPhotoUpload
            onFilesSelected={handleFilesSelected}
            currentCount={photos.length}
          />

          <MemoryPhotoPreview
            photos={photos}
            onRemove={handleRemovePhoto}
            onAddMore={handleAddMore}
          />

          <MemoryWhyMatters value={whyMatters} onChange={setWhyMatters} />

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isValid || saving}
              className="w-full h-16 rounded-full bg-miora-astral text-white text-[16px] font-medium flex items-center justify-center gap-3 transition-all duration-200 hover:bg-[#294763] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,55,80,0.15)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {saving ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Heart size={18} strokeWidth={1.5} />
              )}
              <span>Save this moment</span>
              {!saving && <ArrowRight size={18} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Privacy Message */}
          <div className="flex items-center justify-center gap-2 text-[13px] text-miora-meditative/60 pb-8">
            <Lock size={12} strokeWidth={1.5} />
            <span>Your memories are private and safe with you.</span>
          </div>
        </form>
      </div>

      {/* Decorative Elements */}
      <div className="fixed left-0 top-1/4 w-32 h-64 opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 100 200" className="w-full h-full text-miora-astral">
          <path d="M50 200 Q30 150 40 100 Q50 50 50 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="35" cy="80" rx="15" ry="25" fill="currentColor" opacity="0.3" transform="rotate(-20 35 80)" />
          <ellipse cx="65" cy="100" rx="12" ry="20" fill="currentColor" opacity="0.2" transform="rotate(15 65 100)" />
        </svg>
      </div>
      <div className="fixed right-0 top-1/3 w-24 h-48 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 80 160" className="w-full h-full text-miora-astral">
          <circle cx="40" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="40" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="0.2" />
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="40"
              y1="50"
              x2="40"
              y2="110"
              stroke="currentColor"
              strokeWidth="0.2"
              transform={`rotate(${i * 22.5} 40 80)`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
