import { describe, expect, it } from "vitest";
import { getScenario, scenarios } from "@/data/scenarios";
import { DEMO_AS_OF } from "@/lib/legal";
import { summarizeHistory } from "@/lib/history";

describe("spójność demonstracyjnych historii", () => {
  it("udostępnia trzy scenariusze i nie zgaduje nieznanego identyfikatora", () => {
    expect(scenarios.map((scenario) => scenario.id)).toEqual([
      "kasia",
      "marek",
      "ola",
    ]);
    expect(getScenario("nieznany")).toBeUndefined();
  });
  it.each(scenarios)(
    "$name: zapewnia warunki, dokumenty i jawne TODO dla okresów do weryfikacji",
    (scenario) => {
      for (const period of scenario.periods) {
        expect(period.start <= period.end && period.end <= DEMO_AS_OF).toBe(
          true,
        );
        expect(period.conditions.length).toBeGreaterThan(0);
        expect(period.documents.length).toBeGreaterThan(0);
        if (period.status === "review")
          expect(period.legalTodo).toContain("TODO:");
      }
      const summary = summarizeHistory(scenario.periods);
      expect(
        summary.days.included + summary.days.potential + summary.days.review,
      ).toBe(summary.uniqueDays);
    },
  );
  it("nie powtarza identyfikatorów dokumentów między scenariuszami", () => {
    const ids = scenarios.flatMap((scenario) =>
      scenario.periods.flatMap((period) =>
        period.documents.map((document) => document.id),
      ),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
