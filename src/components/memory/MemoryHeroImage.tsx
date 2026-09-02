interface MemoryHeroImageProps {
  photoUrl: string;
  currentIndex?: number;
  totalCount?: number;
}

export default function MemoryHeroImage({
  photoUrl,
  currentIndex = 0,
  totalCount = 1,
}: MemoryHeroImageProps) {
  return (
    <div className="relative mb-4">
      <div className="aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden">
        <img
          src={photoUrl}
          alt="Memory photo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image Counter */}
      {totalCount > 1 && (
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[12px] font-medium">
          {currentIndex + 1} / {totalCount}
        </div>
      )}
    </div>
  );
}
