import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  Person,
  Remembrance,
  RemembranceContext,
  ContextType,
  TimelineItem,
  AppSettings,
  MioraState,
} from "../types";
import { INITIAL_STATE } from "../data/seedData";
import { peopleApi } from "../api/people";
import { remembrancesApi, contextsApi } from "../api/contexts";
import { settingsApi } from "../api/settings";
import { ApiError, clearToken } from "../api/client";

type Action =
  | { type: "SET_INITIAL_DATA"; state: MioraState }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "ADD_PERSON"; person: Person }
  | { type: "ARCHIVE_PERSON"; person: Person }
  | { type: "RESTORE_PERSON"; person: Person }
  | { type: "REQUEST_DELETION"; person: Person }
  | { type: "CANCEL_DELETION"; person: Person }
  | { type: "REMEMBER_PERSON"; personId: string; remembrance: Remembrance }
  | { type: "ADD_CONTEXT"; context: RemembranceContext }
  | { type: "UPDATE_SETTINGS"; settings: AppSettings }
  | { type: "UPDATE_PERSON"; person: Person };

function reducer(state: MioraState, action: Action): MioraState {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return action.state;

    case "SET_LOADING":
      return state;

    case "SET_ERROR":
      return state;

    case "ADD_PERSON":
      return {
        ...state,
        people: [...state.people, action.person],
      };

    case "ARCHIVE_PERSON":
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.person.id ? action.person : p,
        ),
      };

    case "RESTORE_PERSON":
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.person.id ? action.person : p,
        ),
      };

    case "REQUEST_DELETION":
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.person.id ? action.person : p,
        ),
      };

    case "CANCEL_DELETION":
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.person.id ? action.person : p,
        ),
      };

    case "UPDATE_PERSON":
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.person.id ? action.person : p,
        ),
      };

    case "REMEMBER_PERSON": {
      const now = action.remembrance.rememberedAt;
      return {
        ...state,
        remembrances: [...state.remembrances, action.remembrance],
        people: state.people.map((p) =>
          p.id === action.personId
            ? {
                ...p,
                remembranceCount: p.remembranceCount + 1,
                lastRememberedAt: now,
              }
            : p,
        ),
      };
    }

    case "ADD_CONTEXT":
      return {
        ...state,
        contexts: [...state.contexts, action.context],
      };

    case "UPDATE_SETTINGS":
      return { ...state, settings: action.settings };

    default:
      return state;
  }
}

interface MioraContextValue {
  state: MioraState;
  loading: boolean;
  error: string | null;

  // Person selectors
  getActivePeople: () => Person[];
  getArchivedPeople: () => Person[];
  getPersonById: (id: string) => Person | undefined;

  // Remembrance selectors
  getRemembrances: (personId: string) => Remembrance[];
  getRemembranceById: (id: string) => Remembrance | undefined;

  // Context selectors
  getContextsForRemembrance: (remembranceId: string) => RemembranceContext[];

  // Timeline
  getTimelineItems: () => TimelineItem[];

  // Actions
  addPerson: (name: string, nickname?: string) => Promise<Person>;
  archivePerson: (personId: string) => Promise<void>;
  restorePerson: (personId: string) => Promise<void>;
  requestDeletion: (personId: string) => Promise<void>;
  cancelDeletion: (personId: string) => Promise<void>;
  processDeletions: () => void;
  rememberPerson: (personId: string) => Promise<Remembrance | null>;
  addContext: (
    remembranceId: string,
    type: ContextType,
    content: string,
  ) => Promise<RemembranceContext | null>;
  updateSettings: (settings: AppSettings) => Promise<void>;
  refreshData: () => Promise<void>;
}

const MioraContext = createContext<MioraContextValue | null>(null);

export function useMiora(): MioraContextValue {
  const ctx = useContext(MioraContext);
  if (!ctx) throw new Error("useMiora must be used within MioraProvider");
  return ctx;
}

export function MioraProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(
    () => localStorage.getItem("miora-auth-token"),
  );

  // Listen for auth token changes
  useEffect(() => {
    const checkToken = () => {
      const newToken = localStorage.getItem("miora-auth-token");
      if (newToken !== authToken) {
        setAuthToken(newToken);
      }
    };

    window.addEventListener("storage", checkToken);
    const interval = setInterval(checkToken, 500);
    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, [authToken]);

  // Load initial data from API
  const loadInitialData = useCallback(async () => {
    const token = localStorage.getItem("miora-auth-token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [people, archivedPeople, settings] = await Promise.all([
        peopleApi.list(),
        peopleApi.listArchived(),
        settingsApi.get(),
      ]);

      // Load remembrances and contexts for all people
      const allPeople = [...people, ...archivedPeople];
      const remembranceLists = await Promise.all(
        allPeople.map((p) => remembrancesApi.list(p.id)),
      );
      const allRemembrances = remembranceLists.flat();

      const contextLists = await Promise.all(
        allPeople.map((p) => contextsApi.list(p.id)),
      );
      const allContexts = contextLists.flat();

      // Update person remembrance counts
      const remembranceCounts = new Map<string, number>();
      const lastRemembered = new Map<string, string>();
      for (const r of allRemembrances) {
        remembranceCounts.set(
          r.personId,
          (remembranceCounts.get(r.personId) || 0) + 1,
        );
        const existing = lastRemembered.get(r.personId);
        if (!existing || r.rememberedAt > existing) {
          lastRemembered.set(r.personId, r.rememberedAt);
        }
      }

      const enrichedPeople = allPeople.map((p) => ({
        ...p,
        remembranceCount: remembranceCounts.get(p.id) || 0,
        lastRememberedAt: lastRemembered.get(p.id) || null,
      }));

      dispatch({
        type: "SET_INITIAL_DATA",
        state: {
          people: enrichedPeople,
          remembrances: allRemembrances,
          contexts: allContexts,
          settings,
          nextId: 100,
        },
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        setError(null);
        setLoading(false);
        return;
      }
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Failed to load data";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData, authToken]);

  // Person selectors
  const getActivePeople = useCallback(
    () => state.people.filter((p) => !p.isArchived),
    [state.people],
  );

  const getArchivedPeople = useCallback(
    () => state.people.filter((p) => p.isArchived),
    [state.people],
  );

  const getPersonById = useCallback(
    (id: string) => state.people.find((p) => p.id === id),
    [state.people],
  );

  // Remembrance selectors
  const getRemembrances = useCallback(
    (personId: string) =>
      state.remembrances
        .filter((r) => r.personId === personId)
        .sort(
          (a, b) =>
            new Date(b.rememberedAt).getTime() -
            new Date(a.rememberedAt).getTime(),
        ),
    [state.remembrances],
  );

  const getRemembranceById = useCallback(
    (id: string) => state.remembrances.find((r) => r.id === id),
    [state.remembrances],
  );

  // Context selectors
  const getContextsForRemembrance = useCallback(
    (remembranceId: string) =>
      state.contexts.filter((c) => c.remembranceId === remembranceId),
    [state.contexts],
  );

  // Timeline
  const getTimelineItems = useCallback((): TimelineItem[] => {
    const personMap = new Map(state.people.map((p) => [p.id, p.name]));
    const items: TimelineItem[] = [];

    for (const r of state.remembrances) {
      const personName = personMap.get(r.personId) ?? "Unknown";
      items.push({
        id: r.id,
        personId: r.personId,
        personName,
        type: "remembrance",
        content: "Remembered",
        createdAt: r.rememberedAt,
      });

      const remembranceContexts = state.contexts.filter(
        (c) => c.remembranceId === r.id,
      );
      for (const ctx of remembranceContexts) {
        items.push({
          id: ctx.id,
          personId: r.personId,
          personName,
          type: ctx.type,
          content: ctx.content,
          createdAt: ctx.createdAt,
        });
      }
    }

    return items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [state.people, state.remembrances, state.contexts]);

  // Actions
  const addPerson = useCallback(
    async (name: string, nickname?: string): Promise<Person> => {
      const person = await peopleApi.create(name, nickname);
      dispatch({ type: "ADD_PERSON", person });
      return person;
    },
    [],
  );

  const archivePersonAction = useCallback(async (personId: string) => {
    const person = await peopleApi.archive(personId);
    dispatch({ type: "ARCHIVE_PERSON", person });
  }, []);

  const restorePersonAction = useCallback(async (personId: string) => {
    const person = await peopleApi.restore(personId);
    dispatch({ type: "RESTORE_PERSON", person });
  }, []);

  const requestDeletionAction = useCallback(async (personId: string) => {
    const person = await peopleApi.requestDeletion(personId);
    dispatch({ type: "REQUEST_DELETION", person });
  }, []);

  const cancelDeletionAction = useCallback(async (personId: string) => {
    const person = await peopleApi.cancelDeletion(personId);
    dispatch({ type: "CANCEL_DELETION", person });
  }, []);

  const processDeletionsAction = useCallback(() => {
    // Deletion processing is handled by the backend
  }, []);

  const rememberPersonAction = useCallback(
    async (personId: string): Promise<Remembrance | null> => {
      const person = state.people.find((p) => p.id === personId);
      if (!person) return null;

      const remembrance = await remembrancesApi.create(personId);
      dispatch({ type: "REMEMBER_PERSON", personId, remembrance });

      // Update person's remembranceCount and lastRememberedAt
      const updatedPerson = {
        ...person,
        remembranceCount: person.remembranceCount + 1,
        lastRememberedAt: remembrance.rememberedAt,
      };
      dispatch({ type: "UPDATE_PERSON", person: updatedPerson });

      return remembrance;
    },
    [state.people],
  );

  const addContextAction = useCallback(
    async (
      remembranceId: string,
      type: ContextType,
      content: string,
    ): Promise<RemembranceContext | null> => {
      const remembrance = state.remembrances.find(
        (r) => r.id === remembranceId,
      );
      if (!remembrance) return null;

      const context = await contextsApi.create(
        remembrance.personId,
        remembranceId,
        type,
        content,
      );
      dispatch({ type: "ADD_CONTEXT", context });
      return context;
    },
    [state.remembrances],
  );

  const updateSettingsAction = useCallback(
    async (settings: AppSettings) => {
      const updated = await settingsApi.update(settings);
      dispatch({ type: "UPDATE_SETTINGS", settings: updated });
    },
    [],
  );

  const refreshData = useCallback(async () => {
    await loadInitialData();
  }, [loadInitialData]);

  const value: MioraContextValue = {
    state,
    loading,
    error,
    getActivePeople,
    getArchivedPeople,
    getPersonById,
    getRemembrances,
    getRemembranceById,
    getContextsForRemembrance,
    getTimelineItems,
    addPerson,
    archivePerson: archivePersonAction,
    restorePerson: restorePersonAction,
    requestDeletion: requestDeletionAction,
    cancelDeletion: cancelDeletionAction,
    processDeletions: processDeletionsAction,
    rememberPerson: rememberPersonAction,
    addContext: addContextAction,
    updateSettings: updateSettingsAction,
    refreshData,
  };

  return (
    <MioraContext.Provider value={value}>{children}</MioraContext.Provider>
  );
}
