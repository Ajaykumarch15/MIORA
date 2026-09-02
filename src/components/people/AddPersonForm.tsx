import { useState, type FormEvent } from "react";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import PhotoUpload from "../ui/PhotoUpload";
import SelectField from "../ui/SelectField";
import { RELATIONSHIP_OPTIONS } from "../../types";

interface AddPersonFormProps {
  onSubmit: (data: {
    name: string;
    nickname?: string;
    relationship?: string;
    description?: string;
    photoUrl?: string;
  }) => void;
  loading?: boolean;
}

export default function AddPersonForm({ onSubmit, loading }: AddPersonFormProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);

  const trimmedName = name.trim();
  const nameValid = trimmedName.length > 0 && trimmedName.length <= 100;
  const descriptionValid = description.length <= 200;
  const isValid = nameValid && descriptionValid;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      name: trimmedName,
      relationship: relationship || undefined,
      description: description.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <PhotoUpload
            value={photoFile ? URL.createObjectURL(photoFile) : null}
            onChange={setPhotoFile}
          />
        </div>

        <div>
          <label
            htmlFor="person-name"
            className="block text-[13px] font-medium text-miora-turbulent mb-2.5"
          >
            Their name
          </label>
          <input
            id="person-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Someone important to you"
            autoFocus
            required
            maxLength={100}
            className="w-full h-16 px-4 rounded-[14px] bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all"
          />
          {touched && !nameValid && (
            <p className="text-[13px] text-amber-600/80 mt-2" role="alert">
              {trimmedName.length === 0
                ? "Please tell us who you'd like to create this space for."
                : "Name is too long."}
            </p>
          )}
        </div>

        <SelectField
          label="How do you know them?"
          value={relationship}
          onChange={setRelationship}
          options={RELATIONSHIP_OPTIONS}
          placeholder="Select a relationship (optional)"
          id="person-relationship"
        />

        <div>
          <label
            htmlFor="person-description"
            className="block text-[13px] font-medium text-miora-turbulent mb-2.5"
          >
            A few words about them
          </label>
          <div className="relative">
            <textarea
              id="person-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes them special to you?"
              maxLength={200}
              rows={5}
              className="w-full px-4 py-4 rounded-[14px] bg-white/80 border border-[rgba(80,105,130,0.22)] text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-turbulent/50 focus:shadow-[0_0_0_3px_rgba(79,111,143,0.08)] transition-all resize-none min-h-[145px]"
            />
            <span className="absolute bottom-3 right-4 text-[12px] text-miora-meditative/50 tabular-nums">
              {description.length}/200
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full h-[68px] rounded-full bg-[#1F3853] text-white font-medium text-[16px] flex items-center justify-center gap-3 transition-all duration-200 hover:bg-[#294763] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,55,80,0.12)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Heart size={18} strokeWidth={1.5} />
          )}
          <span>Create their space</span>
          {!loading && <ArrowRight size={18} strokeWidth={1.5} />}
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[14px] text-miora-turbulent/60">
        <Sparkles size={14} strokeWidth={1.5} />
        <span>You can add memories and moments later.</span>
      </div>
    </form>
  );
}
