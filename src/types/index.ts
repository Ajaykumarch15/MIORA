export interface Person {
  id: string;
  name: string;
  nickname?: string;
  relationship?: string;
  description?: string;
  photoUrl?: string;
  remembranceCount: number;
  lastRememberedAt: string | null;
  isArchived: boolean;
  archivedAt: string | null;
  deletionRequestedAt: string | null;
  deletionScheduledFor: string | null;
}

export const RELATIONSHIP_OPTIONS = [
  "Family",
  "Friend",
  "Partner",
  "Colleague",
  "Mentor",
  "Someone special",
  "Other",
] as const;

export interface Remembrance {
  id: string;
  personId: string;
  rememberedAt: string;
}

export type ContextType = "memory" | "conversation" | "feeling" | "place";

export interface RemembranceContext {
  id: string;
  remembranceId: string;
  type: ContextType;
  title?: string;
  content: string;
  photoUrl?: string;
  memoryDate?: string;
  location?: string;
  whyMatters?: string;
  createdAt: string;
}

export type ThoughtCooldownOption = "1m" | "5m" | "15m" | "30m";

export interface AppSettings {
  thoughtCooldown: ThoughtCooldownOption;
}

export type TimelineItemType = "remembrance" | "memory" | "conversation" | "feeling" | "place";

export interface TimelineItem {
  id: string;
  personId: string;
  personName: string;
  type: TimelineItemType;
  content: string;
  createdAt: string;
}

export interface MioraState {
  people: Person[];
  remembrances: Remembrance[];
  contexts: RemembranceContext[];
  settings: AppSettings;
  nextId: number;
}
