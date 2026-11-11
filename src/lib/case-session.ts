"use client";

import { useSyncExternalStore } from "react";
import type { DocumentAvailability, Scenario } from "./types";

export interface CaseSessionState {
  selectedPeriodIds: string[];
  selectedDocumentIds: string[];
  documentAvailability: Record<string, DocumentAvailability>;
}

interface Entry {
  signature: string;
  key: string;
  defaults: CaseSessionState;
  current: CaseSessionState;
  hydrated: boolean;
  periodIds: Set<string>;
  scopeDocumentIds: Set<string>;
  documentIds: Set<string>;
  listeners: Set<() => void>;
}

const PREFIX = "lata-pracy:case:v1:";
const entries = new Map<string, Entry>();

function getEntry(scenario: Scenario): Entry {
  // No names, dates, document contents or free text are stored in this session.
  const signature = JSON.stringify(
    scenario.periods.map((period) => [
      period.id,
      period.status,
      period.documents.map((document) => document.id),
    ]),
  );
  const existing = entries.get(scenario.id);
  if (existing?.signature === signature) return existing;
  const candidates = scenario.periods.filter(
    (period) => period.status === "potential",
  );
  const documents = scenario.periods.flatMap((period) => period.documents);
  const defaults: CaseSessionState = {
    selectedPeriodIds: candidates.map((period) => period.id),
    selectedDocumentIds: candidates.flatMap((period) =>
      period.documents.map((document) => document.id),
    ),
    documentAvailability: Object.fromEntries(
      documents.map((document) => [document.id, "unknown"]),
    ),
  };
  const entry: Entry = {
    signature,
    key: `${PREFIX}${scenario.id}`,
    defaults,
    current: defaults,
    hydrated: false,
    periodIds: new Set(defaults.selectedPeriodIds),
    scopeDocumentIds: new Set(defaults.selectedDocumentIds),
    documentIds: new Set(documents.map((document) => document.id)),
    listeners: new Set(),
  };
  entries.set(scenario.id, entry);
  return entry;
}

function hydrate(entry: Entry): CaseSessionState {
  if (entry.hydrated || typeof window === "undefined") return entry.current;
  entry.hydrated = true;
  try {
    const saved: unknown = JSON.parse(
      window.sessionStorage.getItem(entry.key) ?? "null",
    );
    if (
      !saved ||
      typeof saved !== "object" ||
      !("signature" in saved) ||
      saved.signature !== entry.signature ||
      !("state" in saved)
    )
      return entry.current;
    const state = saved.state;
    if (!state || typeof state !== "object") return entry.current;
    const value = state as Partial<CaseSessionState>;
    const ids = (input: unknown, allowed: Set<string>, fallback: string[]) =>
      Array.isArray(input)
        ? [
            ...new Set(
              input.filter(
                (item): item is string =>
                  typeof item === "string" && allowed.has(item),
              ),
            ),
          ]
        : fallback;
    const availability = value.documentAvailability;
    entry.current = {
      selectedPeriodIds: ids(
        value.selectedPeriodIds,
        entry.periodIds,
        entry.defaults.selectedPeriodIds,
      ),
      selectedDocumentIds: ids(
        value.selectedDocumentIds,
        entry.scopeDocumentIds,
        entry.defaults.selectedDocumentIds,
      ),
      documentAvailability: Object.fromEntries(
        [...entry.documentIds].map((id) => {
          const declared: unknown =
            availability && typeof availability === "object"
              ? availability[id]
              : undefined;
          return [
            id,
            declared === "missing" || declared === "have"
              ? declared
              : "unknown",
          ];
        }),
      ),
    };
  } catch {
    /* A blocked or corrupt session store leaves the in-memory demo usable. */
  }
  return entry.current;
}

function update(entry: Entry, next: CaseSessionState) {
  entry.current = next;
  entry.hydrated = true;
  try {
    window.sessionStorage.setItem(
      entry.key,
      JSON.stringify({ signature: entry.signature, state: next }),
    );
  } catch {
    /* Keep choices in memory if storage is unavailable. */
  }
  entry.listeners.forEach((listener) => listener());
}

export function useCaseSession(scenario: Scenario) {
  const entry = getEntry(scenario);
  const state = useSyncExternalStore(
    (listener) => {
      entry.listeners.add(listener);
      return () => entry.listeners.delete(listener);
    },
    () => hydrate(entry),
    () => entry.defaults,
  );
  const toggleId = (
    field: "selectedPeriodIds" | "selectedDocumentIds",
    id: string,
    allowed: Set<string>,
  ) => {
    if (!allowed.has(id)) return;
    const current = hydrate(entry);
    update(entry, {
      ...current,
      [field]: current[field].includes(id)
        ? current[field].filter((item) => item !== id)
        : [...current[field], id],
    });
  };
  return {
    state,
    togglePeriod: (id: string) =>
      toggleId("selectedPeriodIds", id, entry.periodIds),
    toggleDocument: (id: string) =>
      toggleId("selectedDocumentIds", id, entry.scopeDocumentIds),
    setDocumentAvailability: (id: string, value: DocumentAvailability) => {
      if (
        !entry.documentIds.has(id) ||
        !["unknown", "missing", "have"].includes(value)
      )
        return;
      const current = hydrate(entry);
      update(entry, {
        ...current,
        documentAvailability: { ...current.documentAvailability, [id]: value },
      });
    },
    reset: () => update(entry, entry.defaults),
  };
}

/** Clears only this prototype's demo choices; also used to isolate tests. */
export function clearCaseSessions() {
  if (typeof window !== "undefined") {
    try {
      const keys = Array.from(
        { length: window.sessionStorage.length },
        (_, index) => window.sessionStorage.key(index),
      );
      keys
        .filter((key): key is string => !!key?.startsWith(PREFIX))
        .forEach((key) => window.sessionStorage.removeItem(key));
    } catch {
      /* No browser storage is required. */
    }
  }
  entries.forEach((entry, id) => {
    entry.current = entry.defaults;
    entry.hydrated = true;
    entry.listeners.forEach((listener) => listener());
    if (entry.listeners.size === 0) entries.delete(id);
  });
}
