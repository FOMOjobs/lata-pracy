"use client";

import { useEffect } from "react";
import { setDemoScenario } from "@/lib/demo-profile";
import type { ScenarioId } from "@/lib/types";

/** Makes a directly opened service route the context of the citizen dashboard. */
export function DemoProfileSync({ scenarioId }: { scenarioId: ScenarioId }) {
  useEffect(() => {
    setDemoScenario(scenarioId);
  }, [scenarioId]);
  return null;
}
