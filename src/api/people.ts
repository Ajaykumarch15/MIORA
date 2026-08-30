import { api } from "./client";
import type { Person } from "../types";

interface PersonResponse {
  id: string;
  name: string;
  nickname: string | null;
  createdAt: string;
  archivedAt: string | null;
  deletionRequestedAt: string | null;
  deletionScheduledFor: string | null;
}

function mapPerson(r: PersonResponse): Person {
  return {
    id: r.id,
    name: r.name,
    nickname: r.nickname || undefined,
    remembranceCount: 0,
    lastRememberedAt: null,
    isArchived: r.archivedAt !== null,
    archivedAt: r.archivedAt,
    deletionRequestedAt: r.deletionRequestedAt,
    deletionScheduledFor: r.deletionScheduledFor,
  };
}

export const peopleApi = {
  list: async (): Promise<Person[]> => {
    const people = await api.get<PersonResponse[]>("/people");
    return people.map(mapPerson);
  },

  listArchived: async (): Promise<Person[]> => {
    const people = await api.get<PersonResponse[]>("/people/archived");
    return people.map(mapPerson);
  },

  get: async (id: string): Promise<Person> => {
    const person = await api.get<PersonResponse>(`/people/${id}`);
    return mapPerson(person);
  },

  create: async (name: string, nickname?: string): Promise<Person> => {
    const person = await api.post<PersonResponse>("/people", { name, nickname });
    return mapPerson(person);
  },

  archive: async (id: string): Promise<Person> => {
    const person = await api.post<PersonResponse>(`/people/${id}/archive`);
    return mapPerson(person);
  },

  restore: async (id: string): Promise<Person> => {
    const person = await api.post<PersonResponse>(`/people/${id}/restore`);
    return mapPerson(person);
  },

  requestDeletion: async (id: string): Promise<Person> => {
    const person = await api.post<PersonResponse>(`/people/${id}/deletion`);
    return mapPerson(person);
  },

  cancelDeletion: async (id: string): Promise<Person> => {
    const person = await api.delete<PersonResponse>(`/people/${id}/deletion`);
    return mapPerson(person);
  },
};
