import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Snowflake } from "lucide-react";
import AddPersonForm from "../components/people/AddPersonForm";
import { useMiora } from "../context/MioraContext";

export default function AddPersonPage() {
  const navigate = useNavigate();
  const { addPerson } = useMiora();
  const [saving, setSaving] = useState(false);

  async function handleAdd(data: {
    name: string;
    nickname?: string;
    relationship?: string;
    description?: string;
    photoUrl?: string;
  }) {
    if (saving) return;
    setSaving(true);
    try {
      const person = await addPerson(data);
      navigate(`/people/${person.id}`);
    } catch {
      setSaving(false);
    }
  }

  return (
    <div
      className="min-h-dvh"
      style={{
        background: `
          radial-gradient(circle at 20% 20%, rgba(210, 223, 238, 0.5), transparent 35%),
          radial-gradient(circle at 80% 40%, rgba(220, 230, 240, 0.35), transparent 40%),
          #F5F7FA
        `,
      }}
    >
      <div className="flex min-h-dvh">
        {/* Left Panel - Emotional Introduction */}
        <div className="hidden lg:flex lg:w-[45%] xl:w-[48%] flex-col justify-between p-12 xl:p-16 relative">
          <div className="max-w-lg">
            <button
              onClick={() => navigate("/people")}
              className="flex items-center gap-2 text-[15px] text-miora-turbulent hover:text-miora-astral transition-colors mb-12 group"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.5}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to People
            </button>

            <h1
              className="font-display text-miora-astral leading-[0.95] tracking-[-0.02em] mb-8"
              style={{ fontSize: "clamp(52px, 5vw, 76px)" }}
            >
              Create a place
              <br />
              for someone.
            </h1>

            <div className="space-y-6">
              <p className="text-[20px] leading-[1.8] text-[#52677D]">
                Start with the person you'd
                <br />
                like to keep close.
              </p>
              <p className="text-[20px] leading-[1.8] text-[#52677D]">
                You can add memories and
                <br />
                moments whenever you're ready.
              </p>
            </div>
          </div>

          <p className="text-xs text-miora-meditative">
            A quiet place to remember.
          </p>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.08]">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-miora-astral" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-miora-astral" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-miora-astral" />
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="20"
                  x2="100"
                  y2="180"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-miora-astral"
                  transform={`rotate(${i * 15} 100 100)`}
                />
              ))}
            </svg>
          </div>

          {/* Floating Snowflakes */}
          <div className="absolute top-1/4 right-1/4 opacity-[0.12]">
            <Snowflake size={24} strokeWidth={1} className="text-miora-astral" />
          </div>
          <div className="absolute bottom-1/3 right-1/3 opacity-[0.08]">
            <Snowflake size={16} strokeWidth={1} className="text-miora-astral" />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-[rgba(80,105,130,0.12)]" />

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-end h-16 px-6">
            <button
              onClick={() => navigate("/people")}
              className="text-sm text-miora-turbulent hover:text-miora-astral transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Mobile Back Button */}
          <div className="lg:hidden px-6 pt-4">
            <button
              onClick={() => navigate("/people")}
              className="flex items-center gap-2 text-[15px] text-miora-turbulent hover:text-miora-astral transition-colors group"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.5}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to People
            </button>
          </div>

          {/* Mobile Heading */}
          <div className="lg:hidden px-6 pt-8 pb-6">
            <h1 className="font-display text-[40px] font-medium text-miora-astral leading-[0.95] tracking-[-0.02em]">
              Create a place
              <br />
              for someone.
            </h1>
            <p className="mt-4 text-[16px] text-[#52677D] leading-relaxed">
              Start with the person you'd like to keep close.
            </p>
          </div>

          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center px-6 py-8 lg:py-0">
            <div className="w-full max-w-[600px]">
              <AddPersonForm onSubmit={handleAdd} loading={saving} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
