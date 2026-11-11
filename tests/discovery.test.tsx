import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HistoryExplorer } from "@/components/history-explorer";
import { ContestDemo } from "@/components/contest-demo";
import { scenarios } from "@/data/scenarios";

describe("odkrywanie wpływu wybranego okresu", () => {
  it("wyjaśnia również powtórzenia pomiędzy dwoma wybranymi okresami", async () => {
    const contract = scenarios[0].periods[1];
    const scenario = {
      ...scenarios[0],
      periods: [
        {
          ...scenarios[0].periods[2],
          id: "baseline",
          start: "2026-01-10",
          end: "2026-01-10",
        },
        {
          ...contract,
          id: "first",
          title: "Pierwsze zlecenie",
          start: "2026-01-01",
          end: "2026-01-05",
        },
        {
          ...contract,
          id: "second",
          title: "Drugie zlecenie",
          start: "2026-01-03",
          end: "2026-01-07",
        },
      ],
    };
    render(<HistoryExplorer scenario={scenario} onInspect={() => {}} />);
    expect(screen.getByRole("status")).toHaveTextContent("7 dni poza podstawą");
    await userEvent.click(screen.getByText("Skąd bierze się ta różnica?"));
    expect(screen.getByText("2 dni")).toBeVisible();
    expect(screen.getByText("3 dni")).toBeVisible();
  });
  it("aktualizuje warunkowy wynik i wyjaśnia dni bez zmiany scenariusza", async () => {
    render(<HistoryExplorer scenario={scenarios[2]} onInspect={() => {}} />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "181 dni poza podstawą",
    );
    const checkbox = screen.getByRole("checkbox", {
      name: /Zlecenie równolegle/,
    });
    expect(checkbox).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent(
      "181 dni poza podstawą",
    );
    expect(screen.getByText("3226")).toBeVisible();
    await userEvent.click(screen.getByText("Skąd bierze się ta różnica?"));
    expect(screen.getByText("945 dni")).toBeVisible();
    expect(screen.getByText("181 dni")).toBeVisible();
    await userEvent.click(checkbox);
    expect(screen.getByRole("status")).toHaveTextContent("0 dni poza podstawą");
  });
  it("daje dostęp do warunków i prowadzi do przygotowania sprawy", async () => {
    const inspect = vi.fn();
    render(<HistoryExplorer scenario={scenarios[0]} onInspect={inspect} />);
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
    await userEvent.click(
      screen.getByRole("button", { name: "Warunki i dokumenty" }),
    );
    expect(inspect).toHaveBeenCalledWith(scenarios[0].periods[1]);
    expect(
      screen.getByRole("link", { name: "Przygotuj podsumowanie dla kadr" }),
    ).toHaveAttribute("href", "/sprawa/kasia");
  });
});

describe("trzy rozdziały demonstracji", () => {
  it("prowadzi od problemu przez wyjaśnienie do przygotowania sprawy", async () => {
    render(<ContestDemo scenario={scenarios[2]} />);
    expect(
      screen.getByRole("button", { name: "Poprzedni rozdział" }),
    ).toBeDisabled();
    await userEvent.click(
      screen.getByRole("button", { name: "Pokaż pominięty okres" }),
    );
    expect(
      screen.getByRole("heading", { name: /\+181 dni do sprawdzenia/ }),
    ).toBeVisible();
    expect(screen.getByText("945 dni")).toBeVisible();
    await userEvent.click(
      screen.getByRole("button", { name: "Zobacz następny krok" }),
    );
    expect(
      screen.getByRole("link", { name: "Przygotuj podsumowanie dla kadr" }),
    ).toHaveAttribute("href", "/sprawa/ola");
    await userEvent.click(screen.getByRole("button", { name: "Od początku" }));
    expect(
      screen.getByRole("button", { name: "Pokaż pominięty okres" }),
    ).toBeVisible();
  });
  it("pozwala wybrać rozdział i cofnąć się bez automatycznego timera", async () => {
    render(<ContestDemo scenario={scenarios[2]} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Rozdział 2: Zrozum" }),
    );
    expect(
      screen.getByRole("button", { name: "Rozdział 2: Zrozum" }),
    ).toHaveAttribute("aria-current", "step");
    await userEvent.click(
      screen.getByRole("button", { name: "Poprzedni rozdział" }),
    );
    expect(
      screen.getByRole("button", { name: "Rozdział 1: Zauważ" }),
    ).toHaveAttribute("aria-current", "step");
  });
});
