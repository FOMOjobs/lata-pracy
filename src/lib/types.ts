export type PeriodStatus = "included" | "potential" | "review";
export type WorkType = "employment" | "contract" | "business";
export type ScenarioId = "kasia" | "marek" | "ola";

export interface DemoDocument {
  id: string;
  title: string;
  hint: string;
}

export interface WorkPeriod {
  id: string;
  title: string;
  organization: string;
  type: WorkType;
  status: PeriodStatus;
  start: string;
  end: string;
  description: string;
  conditions: string[];
  documents: DemoDocument[];
  legalTodo?: string;
}

export interface Scenario {
  id: ScenarioId;
  name: string;
  initials: string;
  role: string;
  headline: string;
  description: string;
  lesson: string;
  accent: "blue" | "peach" | "mint";
  periods: WorkPeriod[];
}
