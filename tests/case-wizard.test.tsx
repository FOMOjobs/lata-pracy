import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CaseWizard } from "@/components/case-wizard";
import { scenarios } from "@/data/scenarios";

async function openPreview(user: ReturnType<typeof userEvent.setup>) {
  await user.click(
    screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
  );
  await user.click(screen.getByRole("button", { name: "Pokaż podgląd" }));
}

describe("przygotowanie jednej sprawy od początku do końca", () => {
  it("wymaga wybranego okresu i pozwala poprawić wybór", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    );
    expect(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    ).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Wybierz co najmniej jeden okres",
    );
    await user.click(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    );
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Ty wybierasz zakres",
    );
    await user.click(screen.getByRole("button", { name: "Wstecz" }));
    expect(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    ).toBeChecked();
  });
  it("respektuje wybrane nazwy dokumentów i wymaga potwierdzenia symulacji", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: /Umowa i potwierdzenie wykonywania zlecenia/,
      }),
    );
    await user.click(screen.getByRole("button", { name: "Pokaż podgląd" }));
    const preview = screen.getByRole("article", {
      name: "Podgląd wybranego pakietu",
    });
    expect(
      within(preview).getByText(
        "Zaświadczenie o ubezpieczeniu z tytułu zlecenia",
      ),
    ).toBeVisible();
    expect(
      within(preview).queryByText("Umowa i potwierdzenie wykonywania zlecenia"),
    ).not.toBeInTheDocument();
    const draft = screen.getByRole("textbox", {
      name: "Fikcyjny projekt wiadomości do pracodawcy",
    });
    expect(draft).toHaveAttribute("readonly");
    expect((draft as HTMLTextAreaElement).value).toContain(
      "NIE WYSŁANO WIADOMOŚCI",
    );
    expect(
      screen.getByRole("button", { name: "Zakończ symulację" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("checkbox", {
        name: /Rozumiem, że to fikcyjna symulacja/,
      }),
    );
    await user.click(screen.getByRole("button", { name: "Zakończ symulację" }));
    expect(
      screen.getByRole("heading", { name: "Projekt pakietu jest gotowy." }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Wróć do historii" }),
    ).toHaveAttribute("href", "/pulpit/ola");
  });
  it("pokazuje brak dokumentów jako brak, zamiast sugerować kompletny pakiet", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[0]} />);
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    for (const checkbox of screen.getAllByRole("checkbox"))
      await user.click(checkbox);
    expect(screen.getByRole("status")).toHaveTextContent(
      "projekt będzie oznaczony jako wymagający uzupełnienia",
    );
    await user.click(screen.getByRole("button", { name: "Pokaż podgląd" }));
    expect(
      screen.getByText("Nie wybrano dokumentów. Projekt wymaga uzupełnienia."),
    ).toBeVisible();
  });
  it("kopiuje wyłącznie przygotowany projekt i uruchamia lokalne drukowanie", async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<CaseWizard scenario={scenarios[2]} />);
    await openPreview(user);
    await user.click(screen.getByRole("button", { name: "Skopiuj projekt" }));
    expect(await navigator.clipboard.readText()).toContain(
      "unikalne dni poza podstawą wynoszą 181",
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Nic nie zostało wysłane",
    );
    await user.click(screen.getByRole("button", { name: "Drukuj kartę" }));
    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });
  it("umożliwia ręczne kopiowanie, gdy schowek jest niedostępny", async () => {
    const user = userEvent.setup();
    const copy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockRejectedValueOnce(new Error("Brak dostępu"));
    render(<CaseWizard scenario={scenarios[2]} />);
    await openPreview(user);
    await user.click(screen.getByRole("button", { name: "Skopiuj projekt" }));
    const draft = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(draft.selectionStart).toBe(0);
    expect(draft.selectionEnd).toBe(draft.value.length);
    expect(screen.getByRole("status")).toHaveTextContent("Zaznaczono projekt");
    copy.mockRestore();
  });
});
