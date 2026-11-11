import { formatDateRange, summarizeHistory } from "./history";
import { legalSources } from "./legal";
import type { DocumentAvailability, Scenario } from "./types";

export function describeDocumentAvailability(
  value: DocumentAvailability = "unknown",
) {
  return {
    unknown: "dostępność do ustalenia",
    missing: "brak dokumentu — do uzyskania",
    have: "deklaracja: mam — dokument do sprawdzenia",
  }[value];
}

/** Compare only explicitly selected potential periods against the demo baseline.
 * Review periods never become eligible through a UI selection. */
export function createCasePlan(scenario: Scenario, selectedIds: string[]) {
  const selected = new Set(selectedIds);
  const periods = scenario.periods.filter(
    (period) => period.status === "potential" && selected.has(period.id),
  );
  const baseline = scenario.periods.filter(
    (period) => period.status === "included",
  );
  const summary = summarizeHistory([...baseline, ...periods]);
  return {
    periods,
    baselineDays: summary.days.included,
    additionalDays: summary.days.potential,
    totalDays: summary.days.included + summary.days.potential,
    repeatedDays: Object.values(summary.contributions).reduce(
      (total, item) => total + item.repeatedDays,
      0,
    ),
    documents: periods.flatMap((period) => period.documents),
  };
}

export function createCaseDraft(
  scenario: Scenario,
  selectedIds: string[],
  selectedDocumentIds?: string[],
  documentAvailability: Record<string, DocumentAvailability> = {},
) {
  const plan = createCasePlan(scenario, selectedIds);
  if (plan.periods.length === 0) return "";
  const documents = plan.documents.filter(
    (document) =>
      selectedDocumentIds === undefined ||
      selectedDocumentIds.includes(document.id),
  );
  return [
    "FIKCYJNY PROJEKT — LATA PRACY, DEMONSTRACJA. NIE WYSŁANO WIADOMOŚCI.",
    "Temat: Prośba o weryfikację wcześniejszych okresów aktywności zawodowej",
    "",
    "Dzień dobry,",
    "proszę o sprawdzenie, czy poniższe okresy mogą zostać zaliczone do mojego stażu pracy po potwierdzeniu ustawowych warunków i dokumentów:",
    ...plan.periods.map(
      (period) =>
        `• ${period.title} — ${formatDateRange(period)} (${period.organization}, firma fikcyjna).`,
    ),
    "",
    "Do wyjaśnienia:",
    ...plan.periods.flatMap((period) =>
      period.conditions.map((condition) => `• ${condition}`),
    ),
    "",
    "Wybrane nazwy dokumentów do przygotowania (żaden plik nie został dołączony):",
    ...(documents.length
      ? documents.map(
          (document) =>
            `• ${document.title} (${describeDocumentAvailability(documentAvailability[document.id])})`,
        )
      : ["• Nie wybrano dokumentów — projekt wymaga uzupełnienia."]),
    "Dostępność dokumentów to deklaracje w fikcyjnym przykładzie. Nie zweryfikowano plików ani kompletności dowodów.",
    "",
    `W tym przykładzie unikalne dni poza podstawą wynoszą ${plan.additionalDays}. To zestawienie kalendarzowe, nie prawne potwierdzenie stażu ani uprawnień. Nakładające się dni nie zostały policzone ponownie.`,
    "Proszę o wskazanie, czy potrzebne są dodatkowe dokumenty lub wyjaśnienia.",
    "",
    `Z poważaniem,\n${scenario.name} (postać fikcyjna)`,
    "",
    "Źródła informacyjne:",
    ...legalSources.map((source) => `${source.title}: ${source.url}`),
    "",
    "Niezależny prototyp. Brak połączenia z ZUS i systemem pracodawcy. Wszystkie dane są demonstracyjne.",
  ].join("\n");
}
