const STORAGE_KEY = "miora-settings";

export type ThoughtCooldownOption = "1m" | "5m" | "15m" | "30m";

export interface AppSettings {
  thoughtCooldown: ThoughtCooldownOption;
}

export const COOLDOWN_OPTIONS: {
  value: ThoughtCooldownOption;
  label: string;
  ms: number;
}[] = [
  { value: "1m", label: "1 min", ms: 1 * 60 * 1000 },
  { value: "5m", label: "5 min", ms: 5 * 60 * 1000 },
  { value: "15m", label: "15 min", ms: 15 * 60 * 1000 },
  { value: "30m", label: "30 min", ms: 30 * 60 * 1000 },
];

const DEFAULT_SETTINGS: AppSettings = {
  thoughtCooldown: "5m",
};

export function getCooldownMs(option: ThoughtCooldownOption): number {
  return COOLDOWN_OPTIONS.find((o) => o.value === option)?.ms ?? DEFAULT_SETTINGS.thoughtCooldown
    ? COOLDOWN_OPTIONS.find((o) => o.value === DEFAULT_SETTINGS.thoughtCooldown)!.ms
    : 0;
}

export function getSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.thoughtCooldown === "string" &&
      COOLDOWN_OPTIONS.some((o) => o.value === parsed.thoughtCooldown)
    ) {
      return { thoughtCooldown: parsed.thoughtCooldown };
    }
    return { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // silently fail
  }
}

export function getCooldownRemaining(
  lastRememberedAt: string | null,
  cooldownMs: number,
): number {
  if (!lastRememberedAt || cooldownMs === 0) return 0;
  const elapsed = Date.now() - new Date(lastRememberedAt).getTime();
  const remaining = cooldownMs - elapsed;
  return remaining > 0 ? remaining : 0;
}

export function formatCooldownRemaining(ms: number): string {
  if (ms <= 0) return "";
  const minutes = Math.ceil(ms / (60 * 1000));
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) return `${hours} hour${hours === 1 ? "" : "s"}`;
  return `${hours} hour${hours === 1 ? "" : "s"}, ${remainingMins} min`;
}
