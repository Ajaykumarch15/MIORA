import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, Lock, MoreHorizontal } from "lucide-react";
import MemoryHeader from "../components/memory/MemoryHeader";
import MemoryHeroImage from "../components/memory/MemoryHeroImage";
import MemoryContentCard from "../components/memory/MemoryContentCard";
import MemoryReflectionCard from "../components/memory/MemoryReflectionCard";
import MemoryPhotoGallery from "../components/memory/MemoryPhotoGallery";
import DropdownMenu from "../components/ui/DropdownMenu";
import { useMiora } from "../context/MioraContext";

export default function MemoryDetailPage() {
  const { personId, memoryId } = useParams<{ personId: string; memoryId: string }>();
  const navigate = useNavigate();
  const { getPersonById, getContextsForRemembrance, getRemembrances } = useMiora();

  const person = personId ? getPersonById(personId) : undefined;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Find the context (memory) by ID
  const remembrances = personId ? getRemembrances(personId) : [];
  const allContexts = remembrances.flatMap((r) =>
    getContextsForRemembrance(r.id)
  );
  const context = allContexts.find((c) => c.id === memoryId);

  if (!person || !context) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center">
          <p className="text-miora-muted mb-4">Memory not found.</p>
          <button
            onClick={() => navigate("/people")}
            className="text-[14px] text-miora-turbulent hover:text-miora-astral transition-colors"
          >
            Back to People
          </button>
        </div>
      </div>
    );
  }

  // Collect all photos (for now, just the main photo)
  const photos: string[] = context.photoUrl ? [context.photoUrl] : [];

  const menuItems = [
    {
      label: "Edit memory",
      icon: Pencil,
      onClick: () => navigate(`/people/${personId}/memory/${memoryId}/edit`),
    },
    {
      label: "Delete memory",
      icon: Trash2,
      danger: true,
      onClick: () => {
        // TODO: Implement delete with confirmation
        navigate(`/people/${personId}`);
      },
    },
  ];

  function handleAddMore() {
    // TODO: Implement add more photos
  }

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
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/people/${personId}`)}
            className="flex items-center gap-2 text-[14px] text-miora-turbulent hover:text-miora-astral transition-colors group"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.5}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to {person.name}
          </button>

          <DropdownMenu items={menuItems} />
        </div>

        {/* Memory Header */}
        <MemoryHeader context={context} />

        {/* Hero Image */}
        {context.photoUrl && (
          <div className="mb-6">
            <MemoryHeroImage
              photoUrl={context.photoUrl}
              currentIndex={selectedPhotoIndex}
              totalCount={photos.length}
            />
          </div>
        )}

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <MemoryPhotoGallery
            photos={photos}
            selectedIndex={selectedPhotoIndex}
            onSelect={setSelectedPhotoIndex}
            onAddMore={handleAddMore}
          />
        )}

        {/* Memory Content */}
        <MemoryContentCard context={context} />

        {/* Why This Matters */}
        {context.whyMatters && (
          <MemoryReflectionCard whyMatters={context.whyMatters} />
        )}

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate(`/people/${personId}/memory/${memoryId}/edit`)}
            className="flex-1 h-12 rounded-xl border border-miora-blue/30 text-miora-astral text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-white/60 transition-colors"
          >
            <Pencil size={16} strokeWidth={1.5} />
            Edit memory
          </button>
          <button
            onClick={() => {
              // TODO: Implement delete with confirmation
              navigate(`/people/${personId}`);
            }}
            className="flex-1 h-12 rounded-xl bg-miora-astral text-white text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#294763] transition-colors"
          >
            <Trash2 size={16} strokeWidth={1.5} />
            Delete memory
          </button>
        </div>

        {/* Privacy Message */}
        <div className="flex items-center justify-center gap-2 text-[13px] text-miora-meditative/60 pb-8">
          <Lock size={12} strokeWidth={1.5} />
          <span>Your memories are private and safe with you.</span>
        </div>
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
