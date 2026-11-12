"use client";

import { useSyncExternalStore } from "react";
import type { ScenarioId } from "./types";

const PROFILE_KEY = "lata-pracy:profile:v1";
const DEFAULT_SCENARIO: ScenarioId = "ola";
let current: ScenarioId = DEFAULT_SCENARIO;
let hydrated = false;
const listeners = new Set<() => void>();

function isScenarioId(value: unknown): value is ScenarioId {
  return value === "kasia" || value === "marek" || value === "ola";
}

function browserSnapshot(): ScenarioId {
  if (hydrated || typeof window === "undefined") return current;
  hydrated = true;
  try {
    const saved = window.sessionStorage.getItem(PROFILE_KEY);
    if (isScenarioId(saved)) current = saved;
  } catch {
    // The fiction remains usable without browser storage.
  }
  return current;
}

function serverSnapshot(): ScenarioId {
  return DEFAULT_SCENARIO;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Stores only the identifier of a fictional scenario, never a real identity. */
export function setDemoScenario(scenarioId: ScenarioId) {
  if (!isScenarioId(scenarioId) || typeof window === "undefined") return;
  const previous = browserSnapshot();
  current = scenarioId;
  hydrated = true;
  try {
    window.sessionStorage.setItem(PROFILE_KEY, scenarioId);
  } catch {
    // Keep the current demo choice in memory until the page reloads.
  }
  if (previous !== current) listeners.forEach((listener) => listener());
}

export function useDemoProfile() {
  const scenarioId = useSyncExternalStore(
    subscribe,
    browserSnapshot,
    serverSnapshot,
  );
  return { scenarioId, selectScenario: setDemoScenario };
}

/** Resets the fictional profile without touching its independently saved case. */
export function clearDemoProfile() {
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(PROFILE_KEY);
    } catch {
      // An unavailable browser store should not block the in-memory reset.
    }
  }
  current = DEFAULT_SCENARIO;
  hydrated = listeners.size > 0;
  listeners.forEach((listener) => listener());
}
