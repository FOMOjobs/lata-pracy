import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Workspace } from "@/components/workspace";
import { scenarios } from "@/data/scenarios";
import { routerPush } from "./setup";

describe("praca z fikcyjną historią", () => {
  it("zostawia jedno porównanie, a trzy kategorie udostępnia po rozwinięciu całej historii", async () => {
    render(<Workspace scenario={scenarios[0]} screen="dashboard" />);
    expect(screen.getByRole("heading", { name: "Uwzględnione w przykładzie" })).not.toBeVisible();
    await userEvent.click(screen.getByText("Cała historia", { selector: "summary" }));
    expect(
      screen.getByRole("heading", { name: "Uwzględnione w przykładzie" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Potencjalnie do doliczenia" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Wymaga weryfikacji" }),
    ).toBeVisible();
    expect(screen.getByText("To przykład, nie decyzja.")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Otwórz oś czasu" }),
    ).toHaveAttribute("href", "/historia/kasia");
  });
  it("zmienia scenariusz z zachowaniem rodzaju ekranu", async () => {
    render(<Workspace scenario={scenarios[0]} screen="timeline" />);
    await userEvent.selectOptions(
      screen.getByLabelText("Scenariusz:"),
      "marek",
    );
    expect(routerPush).toHaveBeenCalledWith("/historia/marek");
  });
  it("filtruje okresy i przełącza na widok listy", async () => {
    render(<Workspace scenario={scenarios[2]} screen="timeline" />);
    await userEvent.click(
      screen.getByRole("button", { name: "Do weryfikacji" }),
    );
    expect(screen.getByText("Wyświetlono 1 z 4 okresów.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Do weryfikacji" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.queryByRole("button", { name: /^Etat w agencji,/ }),
    ).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Widok listy" }));
    expect(
      screen.getByRole("button", { name: /Dodatkowa współpraca/ }),
    ).toBeVisible();
    expect(
      screen.queryByRole("region", { name: /Interaktywna oś/ }),
    ).not.toBeInTheDocument();
  });
  it("sortuje listę od najnowszych", async () => {
    const { container } = render(
      <Workspace scenario={scenarios[0]} screen="timeline" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Widok listy" }));
    await userEvent.selectOptions(
      screen.getByLabelText("Kolejność okresów"),
      "newest",
    );
    expect(
      container.querySelector(".timeline-list-row strong"),
    ).toHaveTextContent("Obecny etat");
  });
  it("otwiera szczegóły nakładającego się okresu i pokazuje 181 nowych dni", async () => {
    render(<Workspace scenario={scenarios[2]} screen="timeline" />);
    await userEvent.click(
      screen.getByRole("button", { name: /^Zlecenie równolegle do etatu,/ }),
    );
    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByRole("heading", {
        name: "Zlecenie równolegle do etatu",
      }),
    ).toBeVisible();
    expect(within(dialog).getByText("181 dni")).toBeVisible();
    expect(within(dialog).getByText(/945 dni tego okresu/)).toBeVisible();
    expect(
      within(dialog).getByRole("heading", { name: "Co wymaga sprawdzenia?" }),
    ).toBeVisible();
    expect(within(dialog).getAllByRole("combobox")).toHaveLength(2);
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Zamknij okno" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("pokazuje TODO w niepewnym przypadku i zamyka szczegóły przez natywne cancel", async () => {
    render(<Workspace scenario={scenarios[0]} screen="dashboard" />);
    await userEvent.click(
      screen.getByRole("button", { name: /^Wakacyjna praca na zleceniu/ }),
    );
    expect(
      within(screen.getByRole("dialog")).getByText(/TODO: potwierdzić/),
    ).toBeVisible();
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: false, cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("zachowuje deklarację braku dokumentu bez zmiany statusów i wyliczeń", async () => {
    render(<Workspace scenario={scenarios[0]} screen="dashboard" />);
    await userEvent.click(screen.getByText("Cała historia", { selector: "summary" }));
    const before = screen.getByRole("heading", {
      name: "Potencjalnie do doliczenia",
    }).parentElement!.textContent;
    await userEvent.click(
      screen.getByRole("button", { name: "Lista dokumentów" }),
    );
    const selects = within(screen.getByRole("dialog")).getAllByRole("combobox");
    await userEvent.selectOptions(selects[0], "missing");
    expect(selects[0]).toHaveValue("missing");
    expect(
      within(screen.getByRole("dialog")).getByText(/Brak do uzupełnienia:/),
    ).toBeVisible();
    await userEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: "Zamknij okno",
      }),
    );
    expect(
      screen.getByRole("heading", { name: "Potencjalnie do doliczenia" })
        .parentElement!.textContent,
    ).toBe(before);
    await userEvent.click(
      screen.getByRole("button", { name: "Lista dokumentów" }),
    );
    expect(
      within(screen.getByRole("dialog")).getAllByRole("combobox")[0],
    ).toHaveValue("missing");
  });
  it("udostępnia źródła i ograniczenia bez opuszczania aplikacji", async () => {
    render(<Workspace scenario={scenarios[0]} screen="dashboard" />);
    await userEvent.click(
      screen.getByRole("button", { name: "Jak czytać wynik" }),
    );
    expect(screen.getByRole("dialog")).toBeVisible();
    expect(
      within(screen.getByRole("dialog")).getByRole("link", {
        name: /Ustawa z 26 września/,
      }),
    ).toHaveAttribute("href", "https://eli.gov.pl/eli/DU/2025/1423/ogl");
    expect(
      within(screen.getByRole("dialog")).getByText(/365 dni \/ rok/),
    ).toBeVisible();
  });
  it("przygotowuje plik TXT z oznaczeniem demonstracji", async () => {
    const createUrl = vi.fn((blob: Blob) =>
      blob.size > 0 ? "blob:demo" : "blob:empty",
    );
    vi.stubGlobal(
      "URL",
      Object.assign(URL, {
        createObjectURL: createUrl,
        revokeObjectURL: vi.fn(),
      }),
    );
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    render(<Workspace scenario={scenarios[2]} screen="dashboard" />);
    await userEvent.click(screen.getByText("Więcej", { selector: "summary" }));
    await userEvent.click(
      screen.getByRole("button", { name: /Pobierz podsumowanie/ }),
    );
    expect(createUrl).toHaveBeenCalledOnce();
    const anchor = click.mock.instances[0] as HTMLAnchorElement;
    expect(anchor.download).toBe("lata-pracy-ola-demo.txt");
    const blob = createUrl.mock.calls[0][0] as unknown as Blob;
    expect(blob.type).toBe("text/plain;charset=utf-8");
    const content = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsText(blob);
    });
    expect(content).toContain("Wynik nie potwierdza praw ani uprawnień");
    expect(content).toContain(
      "Potencjalnie do doliczenia: 181 dodatkowych dni",
    );
    expect(content).toContain("TODO:");
    expect(content).toContain("62 dni — pokryte etatem z podstawy przykładu");
    expect(content).toContain("122 dni — pokryte wyłącznie okresem potencjalnym");
    expect(content).toContain("jeśli nie zostanie zaliczony");
    expect(
      screen.getByText("Pobrano demonstracyjne podsumowanie w formacie TXT."),
    ).toBeInTheDocument();
    click.mockRestore();
  });

  it("nie ukrywa niepewnego okresu Oli za zerem i wyjaśnia źródła jego pokrycia", async () => {
    render(<Workspace scenario={scenarios[2]} screen="dashboard" />);
    await userEvent.click(screen.getByText("Cała historia", { selector: "summary" }));
    expect(screen.getByText("okres do wyjaśnienia")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: /^Dodatkowa współpraca/ }));
    const dialog = within(screen.getByRole("dialog"));
    expect(dialog.getByText("62 dni pokrywają się z etatem przyjętym w przykładzie.")).toBeVisible();
    expect(dialog.getByText("122 dni pokrywają się wyłącznie z okresem potencjalnym.")).toBeVisible();
    expect(dialog.getByText(/Jeśli nie zostanie zaliczony, znaczenie tej współpracy/)).toBeVisible();
    expect(dialog.queryByText(/Niezależnie od kwalifikacji/)).not.toBeInTheDocument();
  });

  it("na telefonie zaczyna od listy i zachowuje ręcznie wybrany widok po zmianie szerokości", async () => {
    let mobile = true;
    const listeners = new Set<() => void>();
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      get matches() { return mobile; },
      addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
    })));
    render(<Workspace scenario={scenarios[2]} screen="timeline" />);
    expect(screen.getByRole("button", { name: "Widok listy" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("region", { name: /Interaktywna oś/ })).not.toBeInTheDocument();
    act(() => { mobile = false; listeners.forEach((listener) => listener()); });
    expect(screen.getByRole("button", { name: "Widok osi czasu" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Widok listy" }));
    act(() => { mobile = true; listeners.forEach((listener) => listener()); });
    act(() => { mobile = false; listeners.forEach((listener) => listener()); });
    expect(screen.getByRole("button", { name: "Widok listy" })).toHaveAttribute("aria-pressed", "true");
  });
});
