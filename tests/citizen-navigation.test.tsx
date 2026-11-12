import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TimelinePage from "@/app/historia/[scenario]/page";
import CasePage from "@/app/sprawa/[scenario]/page";
import { PublicHeader } from "@/components/public-layout";
import { useDemoProfile } from "@/lib/demo-profile";
import { useCaseSession } from "@/lib/case-session";
import { scenarios } from "@/data/scenarios";
import { routerPush } from "./setup";

describe("powrót z usługi do pulpitu obywatela", () => {
  it("zapamiętuje osobę z bezpośredniej trasy i aktualizuje ją przy zmianie historii", async () => {
    const profile = renderHook(() => useDemoProfile());
    render(await TimelinePage({ params: Promise.resolve({ scenario: "marek" }) }));
    expect(profile.result.current.scenarioId).toBe("marek");
    expect(screen.getByRole("link", { name: "Pulpit obywatela" })).toHaveAttribute("href", "/");
    await userEvent.selectOptions(screen.getByLabelText("Scenariusz:"), "kasia");
    expect(routerPush).toHaveBeenCalledWith("/historia/kasia");
    expect(profile.result.current.scenarioId).toBe("kasia");
  });

  it("zachowuje wybory dokumentów po opuszczeniu usługi i powrocie do tej osoby", async () => {
    const user = userEvent.setup();
    const profile = renderHook(() => useDemoProfile());
    const route = render(await CasePage({ params: Promise.resolve({ scenario: "kasia" }) }));
    await user.click(screen.getByRole("button", { name: "Sprawdź dokumenty" }));
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Dostępność: Zaświadczenie ZUS dotyczące okresu ubezpieczenia" }),
      "missing",
    );
    route.unmount();
    act(() => profile.result.current.selectScenario("ola"));
    act(() => profile.result.current.selectScenario("kasia"));
    const session = renderHook(() => useCaseSession(scenarios[0]));
    expect(profile.result.current.scenarioId).toBe("kasia");
    expect(session.result.current.state.documentAvailability["kasia-contract-zus"]).toBe("missing");
    expect(session.result.current.state.selectedPeriodIds).toEqual(["kasia-contract"]);
    render(await CasePage({ params: Promise.resolve({ scenario: "kasia" }) }));
    await user.click(screen.getByRole("button", { name: "Sprawdź dokumenty" }));
    expect(screen.getByRole("combobox", { name: "Dostępność: Zaświadczenie ZUS dotyczące okresu ubezpieczenia" })).toHaveValue("missing");
    await user.click(screen.getByRole("button", { name: "Pokaż podsumowanie" }));
    expect(screen.getByRole("link", { name: "Wróć do pulpitu obywatela" })).toHaveAttribute("href", "/");
  });

  it("udostępnia wejście do pulpitu i opis koncepcji bez fikcyjnych usług", () => {
    render(<PublicHeader active="about" />);
    expect(screen.getByRole("link", { name: "Pulpit obywatela" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "O projekcie" })).toHaveAttribute("href", "/o-projekcie");
    expect(screen.getByRole("link", { name: "O projekcie" })).toHaveAttribute("aria-current", "page");
  });
});
