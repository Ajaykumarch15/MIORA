import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TopBar from "../components/layout/TopBar";
import BottomSheet from "../components/ui/BottomSheet";
import { useMiora } from "../context/MioraContext";
import { useAuth } from "../auth/AuthProvider";
import {
  COOLDOWN_OPTIONS,
  type ThoughtCooldownOption,
} from "../lib/settingsStorage";

function getCooldownLabel(value: ThoughtCooldownOption): string {
  return COOLDOWN_OPTIONS.find((o) => o.value === value)?.label ?? "5 min";
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { state, updateSettings } = useMiora();
  const { user, logout } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  async function handleSelect(value: ThoughtCooldownOption) {
    await updateSettings({ thoughtCooldown: value });
    setSheetOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <TopBar title="Settings" />

      <div className="px-6 pt-2 pb-8">
        {user && (
          <>
            <h2 className="text-[13px] font-medium text-miora-muted/70 uppercase tracking-wide mb-3">
              Account
            </h2>
            <div className="px-4 py-4 rounded-2xl bg-miora-frost/60 mb-6">
              <p className="text-[15px] font-medium text-miora-charcoal">{user.name}</p>
              <p className="text-[13px] text-miora-muted/60 mt-0.5">{user.email}</p>
            </div>
          </>
        )}

        <h2 className="text-[13px] font-medium text-miora-muted/70 uppercase tracking-wide mb-3">
          General
        </h2>

        <button
          onClick={() => setSheetOpen(true)}
          className="w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left transition-colors hover:bg-miora-frost/60 active:bg-miora-frost"
        >
          <div>
            <p className="text-[15px] font-medium text-miora-charcoal">
              Thought Cooldown
            </p>
            <p className="text-[13px] text-miora-muted/60 mt-0.5">
              Prevent accidental multiple taps.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[14px] text-miora-muted">
              {getCooldownLabel(state.settings.thoughtCooldown)}
            </span>
            <ChevronRight size={16} className="text-miora-muted/40" strokeWidth={1.5} />
          </div>
        </button>

        <h2 className="text-[13px] font-medium text-miora-muted/70 uppercase tracking-wide mt-8 mb-3">
          About
        </h2>

        <div className="flex flex-col">
          {[
            { label: "About MIORA", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Help & Support", href: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-between px-4 py-4 text-left transition-colors hover:bg-miora-frost/60 rounded-2xl"
            >
              <span className="text-[15px] text-miora-charcoal">
                {item.label}
              </span>
              <ChevronRight size={16} className="text-miora-muted/40" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-4 mt-4 text-left text-miora-danger text-[15px] font-medium rounded-2xl transition-colors hover:bg-miora-frost/60"
        >
          Log Out
        </button>
      </div>

      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div className="py-2">
          <h3 className="text-lg font-semibold text-miora-charcoal mb-1">
            Thought Cooldown
          </h3>
          <p className="text-sm text-miora-muted mb-5">
            How often would you like to remember someone?
          </p>

          <div className="flex flex-col gap-1">
            {COOLDOWN_OPTIONS.map((option) => {
              const isSelected = state.settings.thoughtCooldown === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left transition-all ${
                    isSelected
                      ? "bg-miora-frost ring-1 ring-miora-steel/30"
                      : "hover:bg-miora-frost/50 active:bg-miora-frost"
                  }`}
                >
                  <span className="text-[15px] text-miora-charcoal">
                    {option.label}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-miora-accent flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
