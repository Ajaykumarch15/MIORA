import { api } from "./client";
import type { Remembrance, RemembranceContext } from "../types";

interface RemembranceResponse {
  id: string;
  personId: string;
  createdAt: string;
  contexts: {
    id: string;
    type: string;
    title: string | null;
    content: string;
    photoUrl: string | null;
    memoryDate: string | null;
    location: string | null;
    whyMatters: string | null;
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
  title: string | null;
  content: string;
  photoUrl: string | null;
  memoryDate: string | null;
  location: string | null;
  whyMatters: string | null;
  createdAt: string;
}

function mapContext(c: ContextResponse): RemembranceContext {
  return {
    id: c.id,
    remembranceId: c.remembranceId,
    type: c.type as RemembranceContext["type"],
    title: c.title || undefined,
    content: c.content,
    photoUrl: c.photoUrl || undefined,
    memoryDate: c.memoryDate || undefined,
    location: c.location || undefined,
    whyMatters: c.whyMatters || undefined,
    createdAt: c.createdAt,
  };
}

interface CreateContextData {
  remembranceId: string;
  type: string;
  content: string;
  title?: string;
  photoUrl?: string;
  memoryDate?: string;
  location?: string;
  whyMatters?: string;
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
    data: CreateContextData,
  ): Promise<RemembranceContext> => {
    const item = await api.post<ContextResponse>(
      `/people/${personId}/contexts`,
      data,
    );
    return mapContext(item);
  },

  update: async (
    id: string,
    data: Partial<CreateContextData>,
  ): Promise<RemembranceContext> => {
    const item = await api.patch<ContextResponse>(`/contexts/${id}`, data);
    return mapContext(item);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/contexts/${id}`);
  },

  uploadPhoto: async (id: string, file: File): Promise<RemembranceContext> => {
    const formData = new FormData();
    formData.append("photo", file);
    const item = await api.post<ContextResponse>(`/contexts/${id}/photo`, formData);
    return mapContext(item);
  },
};
