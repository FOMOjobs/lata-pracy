import { act, render, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  clearDemoProfile,
  setDemoScenario,
  useDemoProfile,
} from "@/lib/demo-profile";
import { DemoProfileSync } from "@/components/demo-profile-sync";

const key = "lata-pracy:profile:v1";

describe("kontekst fikcyjnej osoby", () => {
  it("zaczyna od Oli, synchronizuje widoki i zapisuje wyłącznie identyfikator", () => {
    const first = renderHook(() => useDemoProfile());
    const second = renderHook(() => useDemoProfile());
    expect(first.result.current.scenarioId).toBe("ola");
    act(() => first.result.current.selectScenario("marek"));
    expect(second.result.current.scenarioId).toBe("marek");
    expect(sessionStorage.getItem(key)).toBe("marek");
    first.unmount();
    second.unmount();
    expect(renderHook(() => useDemoProfile()).result.current.scenarioId).toBe("marek");
  });

  it("odtwarza znany identyfikator po nowym uruchomieniu widoku", () => {
    sessionStorage.setItem(key, "kasia");
    expect(renderHook(() => useDemoProfile()).result.current.scenarioId).toBe("kasia");
  });

  it.each(["unknown", '{"name":"Ola"}', "", "MAREK"])(
    "odrzuca uszkodzony lub nieznany zapis: %s",
    (saved) => {
      sessionStorage.setItem(key, saved);
      expect(renderHook(() => useDemoProfile()).result.current.scenarioId).toBe("ola");
    },
  );

  it("utrzymuje wybór w pamięci przy niedostępnym zapisie przeglądarki", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const first = renderHook(() => useDemoProfile());
    act(() => first.result.current.selectScenario("kasia"));
    first.unmount();
    expect(renderHook(() => useDemoProfile()).result.current.scenarioId).toBe("kasia");
  });

  it("resetuje zamontowane widoki i nie usuwa niezależnych wyborów sprawy", () => {
    sessionStorage.setItem("lata-pracy:case:v1:marek", "case-example");
    const profile = renderHook(() => useDemoProfile());
    act(() => profile.result.current.selectScenario("marek"));
    act(() => clearDemoProfile());
    expect(profile.result.current.scenarioId).toBe("ola");
    expect(sessionStorage.getItem(key)).toBeNull();
    expect(sessionStorage.getItem("lata-pracy:case:v1:marek")).toBe("case-example");
  });

  it("renderuje stabilną Olę w SSR niezależnie od stanu klienta", () => {
    const profile = renderHook(() => useDemoProfile());
    act(() => profile.result.current.selectScenario("marek"));
    function ServerView() {
      return <span>{useDemoProfile().scenarioId}</span>;
    }
    expect(renderToString(<ServerView />)).toBe("<span>ola</span>");
    expect(profile.result.current.scenarioId).toBe("marek");
  });

  it("ustawia kontekst bezpośrednio otwartej usługi po stronie klienta", () => {
    const profile = renderHook(() => useDemoProfile());
    const route = render(<DemoProfileSync scenarioId="kasia" />);
    expect(profile.result.current.scenarioId).toBe("kasia");
    route.rerender(<DemoProfileSync scenarioId="marek" />);
    expect(profile.result.current.scenarioId).toBe("marek");
  });

  it("nie przyjmuje nieznanego identyfikatora w wywołaniu spoza TypeScript", () => {
    const profile = renderHook(() => useDemoProfile());
    act(() => {
      // A runtime boundary must still validate values supplied by plain JS.
      Reflect.apply(setDemoScenario, undefined, ["not-a-scenario"]);
    });
    expect(profile.result.current.scenarioId).toBe("ola");
    expect(sessionStorage.getItem(key)).toBeNull();
  });
});
