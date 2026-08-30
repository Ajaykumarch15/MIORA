import type { MioraState } from "../types";

const now = Date.now();
const hour = 60 * 60 * 1000;
const day = 24 * hour;

export const INITIAL_STATE: MioraState = {
  people: [
    {
      id: "p1",
      name: "Deepthi",
      nickname: "Deepu",
      remembranceCount: 42,
      lastRememberedAt: new Date(now - 2 * hour).toISOString(),
      isArchived: false,
      archivedAt: null,
      deletionRequestedAt: null,
      deletionScheduledFor: null,
    },
    {
      id: "p2",
      name: "James",
      nickname: "Jim",
      remembranceCount: 28,
      lastRememberedAt: new Date(now - 26 * hour).toISOString(),
      isArchived: false,
      archivedAt: null,
      deletionRequestedAt: null,
      deletionScheduledFor: null,
    },
    {
      id: "p3",
      name: "Jennie",
      nickname: "Jen",
      remembranceCount: 15,
      lastRememberedAt: new Date(now - 2 * day).toISOString(),
      isArchived: false,
      archivedAt: null,
      deletionRequestedAt: null,
      deletionScheduledFor: null,
    },
    {
      id: "p4",
      name: "Brian S",
      nickname: "Bri",
      remembranceCount: 7,
      lastRememberedAt: new Date(now - 8 * day).toISOString(),
      isArchived: false,
      archivedAt: null,
      deletionRequestedAt: null,
      deletionScheduledFor: null,
    },
    {
      id: "p5",
      name: "Roës",
      nickname: "Rose",
      remembranceCount: 3,
      lastRememberedAt: null,
      isArchived: false,
      archivedAt: null,
      deletionRequestedAt: null,
      deletionScheduledFor: null,
    },
  ],

  remembrances: [
    {
      id: "rem-1",
      personId: "p1",
      rememberedAt: new Date(now - 2 * hour).toISOString(),
    },
    {
      id: "rem-2",
      personId: "p1",
      rememberedAt: new Date(now - 1 * day).toISOString(),
    },
    {
      id: "rem-3",
      personId: "p2",
      rememberedAt: new Date(now - 26 * hour).toISOString(),
    },
    {
      id: "rem-4",
      personId: "p2",
      rememberedAt: new Date(now - 3 * day).toISOString(),
    },
    {
      id: "rem-5",
      personId: "p3",
      rememberedAt: new Date(now - 2 * day).toISOString(),
    },
    {
      id: "rem-6",
      personId: "p4",
      rememberedAt: new Date(now - 8 * day).toISOString(),
    },
  ],

  contexts: [
    {
      id: "ctx-1",
      remembranceId: "rem-1",
      type: "feeling",
      content: "Grateful for the quiet moments we shared.",
      createdAt: new Date(now - 2 * hour + 60000).toISOString(),
    },
    {
      id: "ctx-2",
      remembranceId: "rem-3",
      type: "memory",
      content: "The long walk by the lake last summer.",
      createdAt: new Date(now - 26 * hour + 60000).toISOString(),
    },
    {
      id: "ctx-3",
      remembranceId: "rem-5",
      type: "conversation",
      content: "We talked about what matters most.",
      createdAt: new Date(now - 2 * day + 60000).toISOString(),
    },
  ],

  settings: {
    thoughtCooldown: "5m",
  },

  nextId: 10,
};
