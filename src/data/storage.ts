import type { MioraState } from "../types";
import { INITIAL_STATE } from "./seedData";

const STORAGE_KEY = "miora-app-state";

export function loadState(): MioraState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_STATE };
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      Array.isArray(parsed.people) &&
      Array.isArray(parsed.remembrances) &&
      Array.isArray(parsed.contexts) &&
      typeof parsed.settings === "object" &&
      parsed.settings !== null
    ) {
      return {
        people: parsed.people,
        remembrances: parsed.remembrances,
        contexts: parsed.contexts,
        settings: parsed.settings,
        nextId: typeof parsed.nextId === "number" ? parsed.nextId : 100,
      };
    }
    return { ...INITIAL_STATE };
  } catch {
    return { ...INITIAL_STATE };
  }
}

export function saveState(state: MioraState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently fail
  }
}
