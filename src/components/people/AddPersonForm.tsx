import { useState, type FormEvent } from "react";
import PrimaryButton from "../ui/PrimaryButton";

interface AddPersonFormProps {
  onSubmit: (data: { name: string; nickname?: string }) => void;
  loading?: boolean;
}

export default function AddPersonForm({ onSubmit, loading }: AddPersonFormProps) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [touched, setTouched] = useState(false);

  const trimmedName = name.trim();
  const trimmedNickname = nickname.trim();
  const nameValid = trimmedName.length > 0 && trimmedName.length <= 100;
  const isValid = nameValid;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      name: trimmedName,
      nickname: trimmedNickname || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
      <div className="flex flex-col gap-6">
        <div>
          <label
            htmlFor="person-name"
            className="block text-[13px] font-medium text-miora-muted mb-2.5"
          >
            Name
          </label>
          <input
            id="person-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Their name"
            autoFocus
            required
            maxLength={100}
            className="w-full h-12 px-4 rounded-xl bg-miora-frost border border-miora-line/70 text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-steel/60 focus:bg-white transition-colors"
          />
          {touched && !nameValid && (
            <p className="text-xs text-miora-danger mt-2" role="alert">
              {trimmedName.length === 0
                ? "Please enter a name."
                : "Name is too long."}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="person-nickname"
            className="block text-[13px] font-medium text-miora-muted mb-2.5"
          >
            Nickname <span className="text-miora-muted/50">(optional)</span>
          </label>
          <input
            id="person-nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="What you call them"
            maxLength={50}
            className="w-full h-12 px-4 rounded-xl bg-miora-frost border border-miora-line/70 text-miora-charcoal text-[15px] placeholder:text-miora-muted/40 focus:outline-none focus:border-miora-steel/60 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="mt-auto pt-8">
        <PrimaryButton type="submit" fullWidth disabled={!isValid} loading={loading}>
          Add to MIORA
        </PrimaryButton>
      </div>
    </form>
  );
}
