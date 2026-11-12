import { act, render, renderHook, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CitizenHome } from "@/components/citizen-home";
import { scenarios } from "@/data/scenarios";
import { useCaseSession } from "@/lib/case-session";

const ola = scenarios[2];
const insuranceId = "ola-contract-zus";
const agreementId = "ola-contract-agreement";
const insuranceTitle = "Zaświadczenie o ubezpieczeniu z tytułu zlecenia";

function primaryAction() {
  return within(screen.getByRole("main")).getByRole("link", {
    name: "Sprawdź swoją historię pracy",
  });
}

function expectContinuation(name: string, scenarioId = "ola") {
  const section = screen.getByRole("region", { name });
  expect(
    within(section).getByRole("link", { name: "Kontynuuj przygotowanie" }),
  ).toHaveAttribute("href", `/sprawa/${scenarioId}`);
  return section;
}

describe("pulpit obywatela", () => {
  it("zaczyna od fikcyjnej Oli i prowadzi bezpośrednio do jej historii", () => {
    render(<CitizenHome />);

    expect(screen.getByRole("status")).toHaveTextContent("Dzień dobry, Olu");
    expect(
      screen.getByRole("button", { name: "Historia: Ola" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(primaryAction()).toHaveAttribute("href", "/pulpit/ola");
    expect(screen.getByText(/\+181/)).toBeVisible();
    expect(screen.getByText(/Wartość warunkowa/)).toBeVisible();
    expectContinuation("Ustal dostępność dokumentów");
  });

  it("zmienia osobę, wynik i odsyłacze obu wersji nawigacji", async () => {
    const user = userEvent.setup();
    render(<CitizenHome />);

    for (const person of [
      { name: "Marek", greeting: "Marku", id: "marek", delta: /\+1\s?644/ },
      { name: "Kasia", greeting: "Kasiu", id: "kasia", delta: /\+730/ },
    ]) {
      await user.click(
        screen.getByRole("button", { name: `Historia: ${person.name}` }),
      );
      expect(screen.getByRole("status")).toHaveTextContent(
        `Dzień dobry, ${person.greeting}`,
      );
      expect(primaryAction()).toHaveAttribute("href", `/pulpit/${person.id}`);
      expect(screen.getByText(person.delta)).toBeVisible();
      for (const navigationName of ["Pulpit obywatela", "Nawigacja mobilna"]) {
        const navigation = within(
          screen.getByRole("navigation", { name: navigationName }),
        );
        expect(navigation.getByRole("link", { name: "Historia pracy" }))
          .toHaveAttribute("href", `/pulpit/${person.id}`);
        expect(navigation.getByRole("link", { name: "Podsumowanie" }))
          .toHaveAttribute("href", `/sprawa/${person.id}`);
        expect(navigation.getByRole("link", { name: "Pulpit" }))
          .toHaveAttribute("aria-current", "page");
      }
    }
    expect(
      screen.getByRole("button", { name: "Historia: Ola" }),
    ).toHaveAttribute("aria-pressed", "false");
    expectContinuation("Ustal dostępność dokumentów", "kasia");
  });

  it("po odznaczeniu okresu kieruje do historii, zamiast sugerować gotowe podsumowanie", () => {
    const session = renderHook(() => useCaseSession(ola));
    render(<CitizenHome />);

    act(() => session.result.current.togglePeriod("ola-contract"));

    const section = screen.getByRole("region", {
      name: "Wybierz okres do porównania",
    });
    expect(within(section).getByRole("link", { name: "Wróć do historii" }))
      .toHaveAttribute("href", "/pulpit/ola");
    expect(within(section).queryByRole("link", { name: "Kontynuuj przygotowanie" }))
      .not.toBeInTheDocument();
    expect(screen.getByText(/\+0/)).toBeVisible();
    expect(session.result.current.state.selectedPeriodIds).toEqual([]);
  });

  it("nazywa brakujący dokument i zachowuje warunkową liczbę dni", () => {
    const session = renderHook(() => useCaseSession(ola));
    render(<CitizenHome />);

    act(() => session.result.current.setDocumentAvailability(insuranceId, "missing"));

    const section = expectContinuation("Uzupełnij brak dokumentu");
    expect(within(section).getByText(new RegExp(insuranceTitle))).toBeVisible();
    expect(screen.getByText(/\+181/)).toBeVisible();
    expect(session.result.current.state.documentAvailability[agreementId]).toBe("unknown");
  });

  it("przy deklaracji posiadania nadal przypomina o sprawdzeniu treści i warunków", () => {
    const session = renderHook(() => useCaseSession(ola));
    render(<CitizenHome />);

    act(() => {
      session.result.current.setDocumentAvailability(insuranceId, "have");
      session.result.current.setDocumentAvailability(agreementId, "have");
    });

    const section = expectContinuation("Przejrzyj podsumowanie dla kadr");
    expect(within(section).getByText(/Ich treść i warunki zaliczenia nadal wymagają sprawdzenia/))
      .toBeVisible();
    expect(screen.getByText(/\+181/)).toBeVisible();
  });

  it("odróżnia pusty zakres dokumentów od ustalonej dostępności", () => {
    const session = renderHook(() => useCaseSession(ola));
    render(<CitizenHome />);

    act(() => {
      session.result.current.toggleDocument(insuranceId);
      session.result.current.toggleDocument(agreementId);
    });

    const section = expectContinuation("Ustal zakres podsumowania");
    expect(within(section).getByText(/lista nazw dokumentów jest pusta/)).toBeVisible();
    expect(session.result.current.state.documentAvailability[insuranceId]).toBe("unknown");
    expect(screen.getByText(/\+181/)).toBeVisible();
  });

  it("uwzględnia brak tylko w wybranym zakresie i zachowuje go po ponownym włączeniu", () => {
    const session = renderHook(() => useCaseSession(ola));
    render(<CitizenHome />);

    act(() => {
      session.result.current.setDocumentAvailability(insuranceId, "missing");
      session.result.current.setDocumentAvailability(agreementId, "have");
    });
    expectContinuation("Uzupełnij brak dokumentu");

    act(() => session.result.current.toggleDocument(insuranceId));
    expectContinuation("Przejrzyj podsumowanie dla kadr");
    expect(session.result.current.state.documentAvailability[insuranceId]).toBe("missing");

    act(() => session.result.current.toggleDocument(insuranceId));
    expectContinuation("Uzupełnij brak dokumentu");
    expect(screen.getByText(/\+181/)).toBeVisible();
  });

  it("udostępnia źródła i granice prototypu bez opuszczania pulpitu", async () => {
    const user = userEvent.setup();
    render(<CitizenHome />);

    await user.click(
      screen.getByRole("button", { name: "Poznaj zasady i źródła" }),
    );

    const dialog = within(screen.getByRole("dialog"));
    expect(dialog.getByText(/nie jest oficjalna usługa państwowa ani porada prawna/))
      .toBeVisible();
    expect(dialog.getByRole("link", { name: /Ustawa z 26 września 2025/ }))
      .toHaveAttribute("href", "https://eli.gov.pl/eli/DU/2025/1423/ogl");
    expect(primaryAction()).toHaveAttribute("href", "/pulpit/ola");
  });
});
