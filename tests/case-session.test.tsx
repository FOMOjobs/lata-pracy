import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { clearCaseSessions, useCaseSession } from "@/lib/case-session";
import { scenarios } from "@/data/scenarios";

describe("wybory jednej sprawy", () => {
  it("udostępnia zmiany dwóm widokom i zachowuje je po ponownym zamontowaniu", () => {
    const first = renderHook(() => useCaseSession(scenarios[2]));
    const second = renderHook(() => useCaseSession(scenarios[2]));
    act(() => {
      first.result.current.togglePeriod("ola-contract");
      first.result.current.toggleDocument("ola-contract-agreement");
      first.result.current.setDocumentAvailability(
        "ola-contract-zus",
        "missing",
      );
    });
    expect(second.result.current.state.selectedPeriodIds).toEqual([]);
    expect(second.result.current.state.selectedDocumentIds).not.toContain(
      "ola-contract-agreement",
    );
    first.unmount();
    second.unmount();
    const again = renderHook(() => useCaseSession(scenarios[2]));
    expect(
      again.result.current.state.documentAvailability["ola-contract-zus"],
    ).toBe("missing");
    expect(again.result.current.state.selectedPeriodIds).toEqual([]);
  });
  it("odtwarza wybory po odświeżeniu, również celowo pusty zakres", () => {
    const first = renderHook(() => useCaseSession(scenarios[0]));
    act(() => first.result.current.togglePeriod("kasia-contract"));
    const saved = sessionStorage.getItem("lata-pracy:case:v1:kasia")!;
    expect(saved).not.toContain("Studio Forma");
    expect(saved).not.toContain("2018-01-01");
    first.unmount();
    clearCaseSessions();
    sessionStorage.setItem("lata-pracy:case:v1:kasia", saved);
    const reloaded = renderHook(() => useCaseSession(scenarios[0]));
    expect(reloaded.result.current.state.selectedPeriodIds).toEqual([]);
  });
  it("odrzuca nieznane i niepewne okresy oraz nie uznaje deklaracji za weryfikację", () => {
    const first = renderHook(() => useCaseSession(scenarios[0]));
    act(() => first.result.current.toggleDocument("kasia-contract-zus"));
    const saved = JSON.parse(
      sessionStorage.getItem("lata-pracy:case:v1:kasia")!,
    );
    first.unmount();
    clearCaseSessions();
    saved.state.selectedPeriodIds = [
      "kasia-student",
      "unknown",
      "kasia-contract",
      "kasia-contract",
    ];
    saved.state.selectedDocumentIds = [
      "kasia-student-status",
      "unknown",
      "kasia-contract-zus",
    ];
    saved.state.documentAvailability = {
      "kasia-contract-zus": "verified",
      unknown: "have",
    };
    sessionStorage.setItem("lata-pracy:case:v1:kasia", JSON.stringify(saved));
    const next = renderHook(() => useCaseSession(scenarios[0]));
    expect(next.result.current.state.selectedPeriodIds).toEqual([
      "kasia-contract",
    ]);
    expect(next.result.current.state.selectedDocumentIds).toEqual([
      "kasia-contract-zus",
    ]);
    expect(
      next.result.current.state.documentAvailability["kasia-contract-zus"],
    ).toBe("unknown");
    expect(next.result.current.state.documentAvailability).not.toHaveProperty(
      "unknown",
    );
  });
  it("izoluje scenariusze i nie zmienia okresów przy deklarowaniu dokumentów", () => {
    const kasia = renderHook(() => useCaseSession(scenarios[0]));
    const ola = renderHook(() => useCaseSession(scenarios[2]));
    act(() => {
      kasia.result.current.togglePeriod("kasia-contract");
      ola.result.current.setDocumentAvailability("ola-contract-zus", "have");
      ola.result.current.togglePeriod("ola-review");
    });
    expect(ola.result.current.state.selectedPeriodIds).toEqual([
      "ola-contract",
    ]);
    expect(kasia.result.current.state.selectedPeriodIds).toEqual([]);
    expect(
      kasia.result.current.state.documentAvailability["kasia-contract-zus"],
    ).toBe("unknown");
  });
  it("działa przy uszkodzonym i zablokowanym sessionStorage", () => {
    sessionStorage.setItem("lata-pracy:case:v1:kasia", "invalid-json");
    const first = renderHook(() => useCaseSession(scenarios[0]));
    expect(first.result.current.state.selectedPeriodIds).toEqual([
      "kasia-contract",
    ]);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    act(() =>
      first.result.current.setDocumentAvailability(
        "kasia-contract-zus",
        "missing",
      ),
    );
    expect(
      first.result.current.state.documentAvailability["kasia-contract-zus"],
    ).toBe("missing");
  });
  it("resetuje zamontowane widoki bez ponownego odczytu starego zapisu", () => {
    const first = renderHook(() => useCaseSession(scenarios[0]));
    act(() => first.result.current.togglePeriod("kasia-contract"));
    act(() => clearCaseSessions());
    expect(first.result.current.state.selectedPeriodIds).toEqual([
      "kasia-contract",
    ]);
    expect(sessionStorage.getItem("lata-pracy:case:v1:kasia")).toBeNull();
  });
  it("renderuje domyślny snapshot SSR zamiast odczytywać wybory przeglądarki", () => {
    const client = renderHook(() => useCaseSession(scenarios[0]));
    act(() => client.result.current.togglePeriod("kasia-contract"));
    function ServerView() {
      const { state } = useCaseSession(scenarios[0]);
      return <span>{state.selectedPeriodIds.length}</span>;
    }
    expect(renderToString(<ServerView />)).toBe("<span>1</span>");
  });
});
