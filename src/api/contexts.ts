import { api } from "./client";
import type { Remembrance, RemembranceContext } from "../types";

interface RemembranceResponse {
  id: string;
  personId: string;
  createdAt: string;
  contexts: {
    id: string;
    type: string;
    content: string;
    createdAt: string;
  }[];
}

function mapRemembrance(r: RemembranceResponse): Remembrance {
  return {
    id: r.id,
    personId: r.personId,
    rememberedAt: r.createdAt,
  };
}

export const remembrancesApi = {
  list: async (personId: string): Promise<Remembrance[]> => {
    const items = await api.get<RemembranceResponse[]>(
      `/people/${personId}/remembrances`,
    );
    return items.map(mapRemembrance);
  },

  create: async (personId: string): Promise<Remembrance> => {
    const item = await api.post<RemembranceResponse>(
      `/people/${personId}/remembrances`,
    );
    return mapRemembrance(item);
  },
};

interface ContextResponse {
  id: string;
  remembranceId: string;
  type: string;
  content: string;
  createdAt: string;
}

function mapContext(c: ContextResponse): RemembranceContext {
  return {
    id: c.id,
    remembranceId: c.remembranceId,
    type: c.type as RemembranceContext["type"],
    content: c.content,
    createdAt: c.createdAt,
  };
}

export const contextsApi = {
  list: async (personId: string): Promise<RemembranceContext[]> => {
    const items = await api.get<ContextResponse[]>(
      `/people/${personId}/contexts`,
    );
    return items.map(mapContext);
  },

  create: async (
    personId: string,
    remembranceId: string,
    type: string,
    content: string,
  ): Promise<RemembranceContext> => {
    const item = await api.post<ContextResponse>(
      `/people/${personId}/contexts`,
      { remembranceId, type, content },
    );
    return mapContext(item);
  },
};
