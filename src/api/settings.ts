import { api } from "./client";
import type { AppSettings } from "../types";

interface SettingsResponse {
  id: string;
  thoughtCooldown: string;
  updatedAt: string;
}

function mapSettings(r: SettingsResponse): AppSettings {
  return { thoughtCooldown: r.thoughtCooldown as AppSettings["thoughtCooldown"] };
}

export const settingsApi = {
  get: async (): Promise<AppSettings> => {
    const s = await api.get<SettingsResponse>("/settings");
    return mapSettings(s);
  },

  update: async (settings: Partial<AppSettings>): Promise<AppSettings> => {
    const s = await api.patch<SettingsResponse>("/settings", settings);
    return mapSettings(s);
  },
};
