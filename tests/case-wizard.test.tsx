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
async function prepareProject(user: ReturnType<typeof userEvent.setup>) {
  await openPreview(user);
  await user.click(
    screen.getByRole("checkbox", {
      name: /Rozumiem, że to fikcyjna symulacja/,
    }),
  );
  await user.click(screen.getByRole("button", { name: "Przygotuj projekt" }));
}

const olaInsurance = "Zaświadczenie o ubezpieczeniu z tytułu zlecenia";
const olaAgreement = "Umowa i potwierdzenie wykonywania zlecenia";

describe("jedna sprawa z zachowaniem wyborów i potwierdzeniem projektu", () => {
  it("zachowuje wybrany zakres po opuszczeniu i ponownym otwarciu widoku", async () => {
    const user = userEvent.setup();
    const first = render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    );
    expect(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    ).toBeDisabled();
    first.unmount();
    render(<CaseWizard scenario={scenarios[2]} />);
    expect(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    ).not.toBeChecked();
    expect(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    );
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Sprawdź dokumenty i wybierz zakres",
    );
    await user.click(screen.getByRole("button", { name: "Wstecz" }));
    expect(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    ).toBeChecked();
  });

  it("zachowuje deklarowany brak i zakres dokumentów przy powrocie do sprawy", async () => {
    const user = userEvent.setup();
    const first = render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` }),
      "missing",
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: `Uwzględnij w projekcie: ${olaAgreement}`,
      }),
    );
    first.unmount();
    render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    expect(
      screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` }),
    ).toHaveValue("missing");
    expect(
      screen.getByRole("checkbox", {
        name: `Uwzględnij w projekcie: ${olaAgreement}`,
      }),
    ).not.toBeChecked();
  });

  it("pokazuje tylko wybrane nazwy i udostępnia eksporty dopiero po potwierdzeniu", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    await user.click(
      screen.getByRole("checkbox", {
        name: `Uwzględnij w projekcie: ${olaAgreement}`,
      }),
    );
    await user.click(screen.getByRole("button", { name: "Pokaż podgląd" }));
    const preview = screen.getByRole("article", {
      name: "Podgląd wybranego pakietu",
    });
    expect(within(preview).getByText(olaInsurance)).toBeVisible();
    expect(within(preview).queryByText(olaAgreement)).not.toBeInTheDocument();
    expect(within(preview).getByText("dostępność do ustalenia")).toBeVisible();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Drukuj kartę" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Pobierz TXT" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Skopiuj projekt" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Przygotuj projekt" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("checkbox", {
        name: /Rozumiem, że to fikcyjna symulacja/,
      }),
    );
    await user.click(screen.getByRole("button", { name: "Przygotuj projekt" }));
    expect(
      screen.getByRole("heading", { name: "Projekt pakietu przygotowany." }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Drukuj kartę" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Wróć do dokumentów do sprawdzenia" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Skopiuj projekt" }),
    ).not.toBeVisible();
    await user.click(screen.getByText("Więcej możliwości"));
    const draft = screen.getByRole("textbox", {
      name: "Fikcyjny projekt wiadomości do pracodawcy",
    }) as HTMLTextAreaElement;
    expect(draft).toHaveAttribute("readonly");
    expect(draft.value).toContain(olaInsurance);
    expect(draft.value).not.toContain(olaAgreement);
    expect(draft.value).toContain("NIE WYSŁANO WIADOMOŚCI");
    expect(
      screen.getByRole("link", { name: "Wróć do historii" }),
    ).toHaveAttribute("href", "/pulpit/ola");
  });

  it("pokazuje braki w karcie, wiadomości i zakończeniu bez zmiany dni", async () => {
    const user = userEvent.setup();
    render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("button", { name: "Wybierz zakres pakietu" }),
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` }),
      "missing",
    );
    await user.click(screen.getByRole("button", { name: "Pokaż podgląd" }));
    const preview = screen.getByRole("article", {
      name: "Podgląd wybranego pakietu",
    });
    expect(
      within(preview).getByText("brak dokumentu — do uzyskania"),
    ).toBeVisible();
    expect(within(preview).getByText("+181")).toBeVisible();
    await user.click(
      screen.getByRole("checkbox", {
        name: /Rozumiem, że to fikcyjna symulacja/,
      }),
    );
    await user.click(screen.getByRole("button", { name: "Przygotuj projekt" }));
    expect(
      screen.getByText(
        /Dostępność 2 z 2 wybranych dokumentów wymaga uzupełnienia lub ustalenia/,
      ),
    ).toBeVisible();
    await user.click(screen.getByText("Więcej możliwości"));
    expect(
      (screen.getByRole("textbox") as HTMLTextAreaElement).value,
    ).toContain(`${olaInsurance} (brak dokumentu — do uzyskania)`);
    await user.click(
      screen.getByRole("button", { name: "Wróć do brakujących dokumentów" }),
    );
    expect(
      screen.getByRole("combobox", { name: `Dostępność: ${olaInsurance}` }),
    ).toHaveValue("missing");
    expect(
      screen.queryByRole("button", { name: "Drukuj kartę" }),
    ).not.toBeInTheDocument();
  });

  it("nie sugeruje kompletu dowodów, gdy nie wybrano nazw dokumentów", async () => {
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

  it("kopiuje przygotowany projekt i uruchamia jedyne główne działanie — drukowanie", async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<CaseWizard scenario={scenarios[2]} />);
    await prepareProject(user);
    await user.click(screen.getByText("Więcej możliwości"));
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
    await prepareProject(user);
    await user.click(screen.getByText("Więcej możliwości"));
    await user.click(screen.getByRole("button", { name: "Skopiuj projekt" }));
    const draft = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(draft.selectionStart).toBe(0);
    expect(draft.selectionEnd).toBe(draft.value.length);
    expect(screen.getByRole("status")).toHaveTextContent("Zaznaczono projekt");
    copy.mockRestore();
  });
});
