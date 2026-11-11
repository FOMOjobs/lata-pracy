import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CaseWizard } from "@/components/case-wizard";
import { scenarios } from "@/data/scenarios";

async function openDocuments(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "Sprawdź dokumenty" }));
}
async function openSummary(user: ReturnType<typeof userEvent.setup>) {
  await openDocuments(user);
  await user.click(screen.getByRole("button", { name: "Pokaż podsumowanie" }));
}

const olaInsurance = "Zaświadczenie o ubezpieczeniu z tytułu zlecenia";
const olaAgreement = "Umowa i potwierdzenie wykonywania zlecenia";
const printLabel = "Drukuj / zapisz jako PDF";
const copyLabel = "Kopiuj wiadomość do kadr";

describe("podsumowanie dla kadr w trzech krokach", () => {
  it("zachowuje wybrany zakres po opuszczeniu i ponownym otwarciu widoku", async () => {
    const user = userEvent.setup();
    const first = render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }));
    expect(screen.getByRole("button", { name: "Sprawdź dokumenty" })).toBeDisabled();
    first.unmount();
    render(<CaseWizard scenario={scenarios[2]} />);
    expect(screen.getByRole("checkbox", { name: /Zlecenie równolegle/ })).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Sprawdź dokumenty" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: printLabel })).not.toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }));
    await openDocuments(user);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Sprawdź dostępność dokumentów");
    await user.click(screen.getByRole("button", { name: "Wstecz" }));
    expect(screen.getByRole("checkbox", { name: /Zlecenie równolegle/ })).toBeChecked();
  });

  it("zachowuje deklarowany brak i dostosowany zakres dokumentów po powrocie", async () => {
    const user = userEvent.setup();
    const first = render(<CaseWizard scenario={scenarios[2]} />);
    await openDocuments(user);
    await user.selectOptions(screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` }), "missing");
    for (const checkbox of screen.getAllByRole("checkbox")) {
      expect(checkbox).not.toBeVisible();
    }
    await user.click(screen.getByText("Dostosuj zawartość"));
    await user.click(screen.getByRole("checkbox", { name: `Uwzględnij w projekcie: ${olaAgreement}` }));
    first.unmount();
    render(<CaseWizard scenario={scenarios[2]} />);
    await openDocuments(user);
    expect(screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` })).toHaveValue("missing");
    await user.click(screen.getByText("Dostosuj zawartość"));
    expect(screen.getByRole("checkbox", { name: `Uwzględnij w projekcie: ${olaAgreement}` })).not.toBeChecked();
  });

  it("od razu udostępnia druk i kopiowanie podsumowania wyłącznie wybranego zakresu", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[2]} />);
    await openDocuments(user);
    await user.click(screen.getByText("Dostosuj zawartość"));
    await user.click(screen.getByRole("checkbox", { name: `Uwzględnij w projekcie: ${olaAgreement}` }));
    await user.click(screen.getByRole("button", { name: "Pokaż podsumowanie" }));
    const preview = screen.getByRole("article", { name: "Podsumowanie dla kadr" });
    expect(within(preview).getByText(olaInsurance)).toBeVisible();
    expect(within(preview).queryByText(olaAgreement)).not.toBeInTheDocument();
    expect(within(preview).getByText("dostępność do ustalenia")).toBeVisible();
    expect(screen.getByRole("button", { name: printLabel })).toBeEnabled();
    expect(screen.getByRole("button", { name: copyLabel })).toBeVisible();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Przygotuj projekt" })).not.toBeInTheDocument();
    expect(screen.getByText("Podsumowanie zostaje na Twoim urządzeniu.")).toBeVisible();
    expect(screen.getByRole("textbox")).not.toBeVisible();
    expect(screen.getByRole("button", { name: "Pobierz TXT" })).not.toBeVisible();
    await user.click(screen.getByText("Więcej możliwości"));
    const draft = screen.getByRole("textbox", { name: "Fikcyjna wiadomość do kadr" }) as HTMLTextAreaElement;
    expect(draft).toHaveAttribute("readonly");
    expect(draft.value).toContain(olaInsurance);
    expect(draft.value).not.toContain(olaAgreement);
    expect(draft.value).toContain("NIE WYSŁANO WIADOMOŚCI");
    expect(screen.getByRole("button", { name: "Pobierz TXT" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Wróć do historii" })).toHaveAttribute("href", "/pulpit/ola");
    expect(screen.getByRole("list", { name: "Etapy przygotowania" }).children).toHaveLength(3);
  });

  it("pokazuje braki w karcie i wiadomości bez zmiany dni", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[2]} />);
    await openDocuments(user);
    await user.selectOptions(screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` }), "missing");
    await user.click(screen.getByRole("button", { name: "Pokaż podsumowanie" }));
    const preview = screen.getByRole("article", { name: "Podsumowanie dla kadr" });
    expect(within(preview).getByText("brak dokumentu — do uzyskania")).toBeVisible();
    expect(within(preview).getByText("+181")).toBeVisible();
    expect(screen.getByText(/Dostępność 2 z 2 wybranych dokumentów wymaga uzupełnienia lub ustalenia/)).toBeVisible();
    await user.click(screen.getByText("Więcej możliwości"));
    expect((screen.getByRole("textbox") as HTMLTextAreaElement).value).toContain(`${olaInsurance} (brak dokumentu — do uzyskania)`);
    await user.click(screen.getByRole("button", { name: "Wróć do brakujących dokumentów" }));
    expect(screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` })).toHaveValue("missing");
    expect(screen.queryByRole("button", { name: printLabel })).not.toBeInTheDocument();
  });

  it("nie sugeruje kompletu dowodów, gdy nie wybrano nazw dokumentów", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[0]} />);
    await openDocuments(user);
    await user.click(screen.getByText("Dostosuj zawartość"));
    for (const checkbox of screen.getAllByRole("checkbox")) await user.click(checkbox);
    expect(screen.getByRole("status")).toHaveTextContent("podsumowanie będzie oznaczone jako wymagające uzupełnienia");
    await user.click(screen.getByRole("button", { name: "Pokaż podsumowanie" }));
    const preview = screen.getByRole("article", { name: "Podsumowanie dla kadr" });
    expect(within(preview).getByText("Nie wybrano dokumentów. Podsumowanie wymaga uzupełnienia.")).toBeVisible();
    expect(screen.getByRole("button", { name: printLabel })).toBeEnabled();
  });

  it("kopiuje wiadomość z widocznego przycisku bez dodatkowej bramki i uruchamia druk", async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<CaseWizard scenario={scenarios[2]} />);
    await openSummary(user);
    await user.click(screen.getByRole("button", { name: copyLabel }));
    expect(await navigator.clipboard.readText()).toContain("unikalne dni poza podstawą wynoszą 181");
    expect(screen.getByRole("status")).toHaveTextContent("Nic nie zostało wysłane");
    expect(screen.getByRole("textbox")).not.toBeVisible();
    await user.click(screen.getByRole("button", { name: printLabel }));
    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });

  it("automatycznie pokazuje i zaznacza tekst, gdy schowek jest niedostępny", async () => {
    const user = userEvent.setup();
    const copy = vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("Brak dostępu"));
    render(<CaseWizard scenario={scenarios[2]} />);
    await openSummary(user);
    expect(screen.getByRole("textbox")).not.toBeVisible();
    await user.click(screen.getByRole("button", { name: copyLabel }));
    const draft = screen.getByRole("textbox", { name: "Fikcyjna wiadomość do kadr" }) as HTMLTextAreaElement;
    expect(draft).toBeVisible();
    expect(draft).toHaveFocus();
    expect(draft.selectionStart).toBe(0);
    expect(draft.selectionEnd).toBe(draft.value.length);
    expect(screen.getByRole("status")).toHaveTextContent("Zaznaczono wiadomość");
    copy.mockRestore();
  });
});
