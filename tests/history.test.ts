import { describe, expect, it } from "vitest";
import {
  approximateDuration,
  formatDate,
  parseDay,
  periodDays,
  splitPeriodByStatusCoverage,
  summarizeHistory,
} from "@/lib/history";
import type { PeriodStatus, WorkPeriod } from "@/lib/types";
import { scenarios } from "@/data/scenarios";

const period = (
  id: string,
  start: string,
  end: string,
  status: PeriodStatus = "included",
): WorkPeriod => ({
  id,
  title: id,
  organization: "Firma fikcyjna",
  type: "employment",
  status,
  start,
  end,
  description: "Demo",
  conditions: [],
  documents: [],
});

describe("źródła pokrycia niepewnego okresu", () => {
  it("odróżnia 62 dni etatu Oli od 122 dni pokrytych tylko potencjalnym zleceniem", () => {
    const ola = scenarios.find((scenario) => scenario.id === "ola")!;
    const review = ola.periods.find((item) => item.id === "ola-review")!;
    expect(splitPeriodByStatusCoverage(review, ola.periods)).toEqual([
      { start: "2022-03-01", end: "2022-06-30", days: 122, kind: "potential" },
      { start: "2022-07-01", end: "2022-08-31", days: 62, kind: "included" },
    ]);
    const withoutContract = ola.periods.filter((item) => item.id !== "ola-contract");
    expect(splitPeriodByStatusCoverage(review, withoutContract)).toEqual([
      { start: "2022-03-01", end: "2022-06-30", days: 122, kind: "uncovered" },
      { start: "2022-07-01", end: "2022-08-31", days: 62, kind: "included" },
    ]);
    expect(summarizeHistory(withoutContract).days).toEqual({
      included: 3045, potential: 0, review: 122,
    });
  });
  it("przy wielokrotnym pokryciu przypisuje dzień podstawie i nie traktuje review jako potwierdzenia", () => {
    const input = [
      period("potential", "2026-01-02", "2026-01-06", "potential"),
      period("included", "2026-01-04", "2026-01-05"),
      period("review", "2026-01-01", "2026-01-07", "review"),
    ];
    const original = structuredClone(input);
    const segments = splitPeriodByStatusCoverage(
      { start: "2026-01-01", end: "2026-01-07" }, input,
    );
    expect(segments.map(({ days, kind }) => ({ days, kind }))).toEqual([
      { days: 1, kind: "uncovered" },
      { days: 2, kind: "potential" },
      { days: 2, kind: "included" },
      { days: 1, kind: "potential" },
      { days: 1, kind: "uncovered" },
    ]);
    expect(segments.reduce((sum, item) => sum + item.days, 0)).toBe(7);
    expect(input).toEqual(original);
  });
});

describe("daty kalendarzowe, oba końce okresu włącznie", () => {
  it("liczy pojedynczy dzień i przejście przez koniec roku", () => {
    expect(periodDays({ start: "2026-01-01", end: "2026-01-01" })).toBe(1);
    expect(periodDays({ start: "2025-12-31", end: "2026-01-01" })).toBe(2);
  });
  it("uwzględnia rok przestępny", () => {
    expect(periodDays({ start: "2024-02-28", end: "2024-03-01" })).toBe(3);
    expect(periodDays({ start: "2025-02-28", end: "2025-03-01" })).toBe(2);
  });
  it("nie gubi dni przy zmianie czasu w Polsce", () => {
    expect(periodDays({ start: "2026-03-28", end: "2026-03-30" })).toBe(3);
    expect(periodDays({ start: "2026-10-24", end: "2026-10-26" })).toBe(3);
  });
  it.each([
    "2026-02-29",
    "2026-02-30",
    "2026-13-01",
    "2026-00-01",
    "2026-1-01",
    "bad",
    "2026-01-01T12:00:00Z",
  ])("odrzuca nieprawidłową datę %s", (value) => {
    expect(() => parseDay(value)).toThrow("Nieprawidłowa data");
  });
  it("odrzuca odwrócony zakres", () => {
    expect(() =>
      periodDays({ start: "2026-03-01", end: "2026-02-01" }),
    ).toThrow();
  });
  it("formatuje daty po polsku, bez zależności od strefy hosta", () => {
    expect(formatDate("2026-01-01")).toMatch(/1 sty 2026/);
  });
});

describe("unikalne dni historii", () => {
  it("obsługuje pustą historię", () => {
    expect(summarizeHistory([])).toMatchObject({
      uniqueDays: 0,
      repeatedDays: 0,
      days: { included: 0, potential: 0, review: 0 },
    });
  });
  it("nie dodaje luki pomiędzy okresami", () => {
    expect(
      summarizeHistory([
        period("a", "2026-01-01", "2026-01-02"),
        period("b", "2026-01-04", "2026-01-05"),
      ]).uniqueDays,
    ).toBe(4);
  });
  it("liczy wspólny dzień graniczny tylko raz", () => {
    const summary = summarizeHistory([
      period("a", "2026-01-01", "2026-01-03"),
      period("b", "2026-01-03", "2026-01-05"),
    ]);
    expect(summary.uniqueDays).toBe(5);
    expect(summary.repeatedDays).toBe(1);
  });
  it("scala nakładanie łańcuchowe i całkowicie zawarty okres", () => {
    const summary = summarizeHistory([
      period("a", "2026-01-01", "2026-01-05"),
      period("b", "2026-01-04", "2026-01-08"),
      period("c", "2026-01-07", "2026-01-10"),
      period("d", "2026-01-02", "2026-01-03"),
    ]);
    expect(summary.days.included).toBe(10);
    expect(summary.repeatedDays).toBe(6);
    expect(summary.contributions.d.additionalDays).toBe(0);
  });
  it("przypisuje dni według kategorii, niezależnie od kolejności statusów wejścia", () => {
    const summary = summarizeHistory([
      period("review", "2026-01-01", "2026-01-10", "review"),
      period("potential", "2026-01-03", "2026-01-08", "potential"),
      period("included", "2026-01-05", "2026-01-06"),
    ]);
    expect(summary.days).toEqual({ included: 2, potential: 4, review: 4 });
    expect(summary.uniqueDays).toBe(10);
    expect(summary.repeatedDays).toBe(8);
  });
  it("przy identycznych okresach w jednej kategorii przydziela wkład tylko raz", () => {
    const summary = summarizeHistory([
      period("a", "2026-01-01", "2026-01-05", "potential"),
      period("b", "2026-01-01", "2026-01-05", "potential"),
    ]);
    expect(summary.days.potential).toBe(5);
    expect(summary.contributions.b).toEqual({
      days: 5,
      additionalDays: 0,
      repeatedDays: 5,
    });
  });
  it("nie modyfikuje danych i odrzuca powtórzone identyfikatory", () => {
    const input = [
      period("a", "2026-01-02", "2026-01-05"),
      period("b", "2026-01-01", "2026-01-03"),
    ];
    const original = structuredClone(input);
    summarizeHistory(input);
    expect(input).toEqual(original);
    expect(() => summarizeHistory([input[0], input[0]])).toThrow("unikalne");
  });
  it("zgadza się z niezależnym modelem zbiorów dla 100 wygenerowanych historii", () => {
    let seed = 2026;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed;
    };
    const date = (day: number) =>
      new Date(Date.UTC(2026, 0, day)).toISOString().slice(0, 10);
    const statuses = ["included", "potential", "review"] as const;
    for (let run = 0; run < 100; run++) {
      const input = Array.from({ length: 12 }, (_, index) => {
        const start = 1 + (random() % 20);
        return period(
          `${index}`,
          date(start),
          date(start + (random() % 12)),
          statuses[random() % 3],
        );
      });
      const owned = new Map<number, PeriodStatus>();
      for (const status of statuses)
        for (const item of input.filter((item) => item.status === status)) {
          for (let day = parseDay(item.start); day <= parseDay(item.end); day++)
            if (!owned.has(day)) owned.set(day, status);
        }
      const summary = summarizeHistory(input);
      expect(summary.uniqueDays).toBe(owned.size);
      for (const status of statuses)
        expect(summary.days[status]).toBe(
          [...owned.values()].filter((value) => value === status).length,
        );
      expect(
        Object.values(summary.contributions).reduce(
          (sum, item) => sum + item.additionalDays,
          0,
        ),
      ).toBe(owned.size);
    }
  });
  it("w przykładzie Oli dolicza wyłącznie 181 dni zlecenia poza etatem", () => {
    const ola = scenarios.find((scenario) => scenario.id === "ola")!;
    const summary = summarizeHistory(ola.periods);
    expect(summary.days).toEqual({ included: 3045, potential: 181, review: 0 });
    expect(summary.contributions["ola-contract"].additionalDays).toBe(181);
    expect(summary.contributions["ola-review"].additionalDays).toBe(0);
    expect(summary.repeatedDays).toBe(1129);
  });
  it("pokazuje jawnie umowne przybliżenie długości", () => {
    expect(approximateDuration(0)).toBe("0 dni");
    expect(approximateDuration(7)).toBe("7 dni");
    expect(approximateDuration(181)).toBe("6 mies.");
    expect(approximateDuration(730)).toBe("2 lata");
  });
});
