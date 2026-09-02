import { api } from "./client";
import type { Person } from "../types";

interface PersonResponse {
  id: string;
  name: string;
  nickname: string | null;
  relationship: string | null;
  description: string | null;
  photoUrl: string | null;
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
    relationship: r.relationship || undefined,
    description: r.description || undefined,
    photoUrl: r.photoUrl || undefined,
    remembranceCount: 0,
    lastRememberedAt: null,
    isArchived: r.archivedAt !== null,
    archivedAt: r.archivedAt,
    deletionRequestedAt: r.deletionRequestedAt,
    deletionScheduledFor: r.deletionScheduledFor,
  };
}

interface CreatePersonData {
  name: string;
  nickname?: string;
  relationship?: string;
  description?: string;
  photoUrl?: string;
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

  create: async (data: CreatePersonData): Promise<Person> => {
    const person = await api.post<PersonResponse>("/people", data);
    return mapPerson(person);
  },

  update: async (id: string, data: Partial<CreatePersonData>): Promise<Person> => {
    const person = await api.patch<PersonResponse>(`/people/${id}`, data);
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

  uploadPhoto: async (id: string, file: File): Promise<Person> => {
    const formData = new FormData();
    formData.append("photo", file);
    const person = await api.post<PersonResponse>(`/people/${id}/photo`, formData);
    return mapPerson(person);
  },
};
