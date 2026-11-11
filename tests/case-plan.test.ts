import { describe, expect, it } from "vitest";
import { createCaseDraft, createCasePlan } from "@/lib/case-plan";
import { splitPeriodByCoverage } from "@/lib/history";
import { scenarios } from "@/data/scenarios";

describe("dokładne rozdzielenie pokrywających się dat", () => {
  it("dzieli środek okresu bez gubienia dni granicznych", () => {
    expect(
      splitPeriodByCoverage({ start: "2026-01-01", end: "2026-01-10" }, [
        { start: "2026-01-03", end: "2026-01-05" },
      ]),
    ).toEqual([
      { start: "2026-01-01", end: "2026-01-02", days: 2, kind: "additional" },
      { start: "2026-01-03", end: "2026-01-05", days: 3, kind: "covered" },
      { start: "2026-01-06", end: "2026-01-10", days: 5, kind: "additional" },
    ]);
  });
  it("scala powtórzenia i przycina pokrycie do badanego okresu", () => {
    expect(
      splitPeriodByCoverage({ start: "2026-01-05", end: "2026-01-10" }, [
        { start: "2026-01-01", end: "2026-01-08" },
        { start: "2026-01-07", end: "2026-01-20" },
      ]),
    ).toEqual([
      { start: "2026-01-05", end: "2026-01-10", days: 6, kind: "covered" },
    ]);
  });
  it("ignoruje zakresy poza okresem i uwzględnia pojedynczy dzień przestępny", () => {
    expect(
      splitPeriodByCoverage({ start: "2024-02-29", end: "2024-02-29" }, [
        { start: "2024-02-01", end: "2024-02-28" },
        { start: "2024-03-01", end: "2024-03-03" },
      ]),
    ).toEqual([
      { start: "2024-02-29", end: "2024-02-29", days: 1, kind: "additional" },
    ]);
  });
  it("pokazuje konkretne odcinki zlecenia Oli", () => {
    const ola = scenarios[2];
    const contract = ola.periods.find(
      (period) => period.id === "ola-contract",
    )!;
    expect(
      splitPeriodByCoverage(
        contract,
        ola.periods.filter((period) => period.status === "included"),
      ),
    ).toEqual([
      { start: "2019-06-01", end: "2021-12-31", days: 945, kind: "covered" },
      { start: "2022-01-01", end: "2022-06-30", days: 181, kind: "additional" },
    ]);
  });
  it("odrzuca nieprawidłowy zakres pokrycia", () => {
    expect(() =>
      splitPeriodByCoverage({ start: "2026-01-01", end: "2026-01-02" }, [
        { start: "2026-02-30", end: "2026-03-01" },
      ]),
    ).toThrow();
  });
});

describe("warunkowe porównanie i zakres pakietu", () => {
  it.each([
    { scenario: scenarios[0], baseline: 2496, additional: 730 },
    { scenario: scenarios[1], baseline: 2405, additional: 1644 },
    { scenario: scenarios[2], baseline: 3045, additional: 181 },
  ])(
    "przelicza wybrane okresy: $scenario.name",
    ({ scenario, baseline, additional }) => {
      const ids = scenario.periods
        .filter((period) => period.status === "potential")
        .map((period) => period.id);
      expect(createCasePlan(scenario, ids)).toMatchObject({
        baselineDays: baseline,
        additionalDays: additional,
        totalDays: baseline + additional,
      });
      expect(createCasePlan(scenario, [])).toMatchObject({
        baselineDays: baseline,
        additionalDays: 0,
        totalDays: baseline,
      });
    },
  );
  it("nie awansuje okresu do weryfikacji przez wybór identyfikatora", () => {
    const plan = createCasePlan(scenarios[0], [
      "kasia-student",
      "unknown",
      "kasia-job-1",
    ]);
    expect(plan.periods).toEqual([]);
    expect(plan.additionalDays).toBe(0);
    expect(plan.documents).toEqual([]);
  });
  it("nie liczy dwa razy wybranego okresu ani zbiegu potencjalnych okresów", () => {
    const first = scenarios[0].periods[1];
    const scenario = {
      ...scenarios[0],
      periods: [
        { ...first, id: "a", start: "2026-01-01", end: "2026-01-05" },
        { ...first, id: "b", start: "2026-01-03", end: "2026-01-07" },
      ],
    };
    expect(createCasePlan(scenario, ["a", "a", "b"]).additionalDays).toBe(7);
  });
  it("generuje projekt wyłącznie dla wybranych okresów i nazw dokumentów", () => {
    const draft = createCaseDraft(
      scenarios[0],
      ["kasia-contract"],
      ["kasia-contract-zus"],
    );
    expect(draft).toContain("Zaświadczenie ZUS dotyczące okresu ubezpieczenia");
    expect(draft).not.toContain(
      "Umowa zlecenia i potwierdzenie jej wykonywania",
    );
    expect(draft).not.toContain("Wakacyjna praca na zleceniu");
    expect(draft).not.toContain("Pracownia Północ");
    expect(draft).toContain("NIE WYSŁANO WIADOMOŚCI");
    expect(draft).toContain("żaden plik nie został dołączony");
    expect(draft).toContain("https://eli.gov.pl/eli/DU/2025/1423/ogl");
  });
  it("jawnie pokazuje brak dokumentów i nie tworzy projektu bez okresu", () => {
    expect(createCaseDraft(scenarios[2], ["ola-contract"], [])).toContain(
      "Nie wybrano dokumentów",
    );
    expect(createCaseDraft(scenarios[2], [])).toBe("");
  });
  it("zachowuje deklarację braku w wybranym zakresie i nie ujawnia niewybranych dokumentów", () => {
    const availability = {
      "ola-contract-zus": "missing" as const,
      "ola-contract-agreement": "have" as const,
    };
    const draft = createCaseDraft(
      scenarios[2],
      ["ola-contract"],
      ["ola-contract-zus"],
      availability,
    );
    expect(draft).toContain(
      "Zaświadczenie o ubezpieczeniu z tytułu zlecenia (brak dokumentu — do uzyskania)",
    );
    expect(draft).not.toContain("Umowa i potwierdzenie wykonywania zlecenia");
    expect(draft).toContain("unikalne dni poza podstawą wynoszą 181");
    expect(draft).toContain(
      "Nie zweryfikowano plików ani kompletności dowodów",
    );
  });
  it("określa mam jako deklarację i zachowuje brak wiedzy jako osobny stan", () => {
    const draft = createCaseDraft(scenarios[0], ["kasia-contract"], undefined, {
      "kasia-contract-zus": "have",
    });
    expect(draft).toContain("deklaracja: mam — dokument do sprawdzenia");
    expect(draft).toContain("dostępność do ustalenia");
    expect(draft).not.toContain("dokumenty zweryfikowane");
  });
});
