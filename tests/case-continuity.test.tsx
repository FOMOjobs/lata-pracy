import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Workspace } from "@/components/workspace";
import { CaseWizard } from "@/components/case-wizard";
import { scenarios } from "@/data/scenarios";

describe("ciągłość sprawy między ekranami", () => {
  it("przenosi zakres i brak dokumentu z pulpitu do kreatora i z powrotem", async () => {
    const user = userEvent.setup();
    const dashboard = render(
      <Workspace scenario={scenarios[2]} screen="dashboard" />,
    );
    expect(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    ).toBeChecked();
    await user.click(screen.getByRole("button", { name: "Lista dokumentów" }));
    await user.selectOptions(
      within(screen.getByRole("dialog")).getByRole("combobox", {
        name: "Dostępność: Zaświadczenie o ubezpieczeniu z tytułu zlecenia",
      }),
      "missing",
    );
    dashboard.unmount();
    const wizard = render(<CaseWizard scenario={scenarios[2]} />);
    await user.click(
      screen.getByRole("button", { name: "Sprawdź dokumenty" }),
    );
    expect(
      screen.getByRole("combobox", {
        name: "Dostępność: Zaświadczenie o ubezpieczeniu z tytułu zlecenia",
      }),
    ).toHaveValue("missing");
    await user.click(screen.getByText("Dostosuj zawartość"));
    await user.click(
      screen.getByRole("checkbox", {
        name: "Uwzględnij w projekcie: Umowa i potwierdzenie wykonywania zlecenia",
      }),
    );
    await user.click(screen.getByRole("button", { name: "Wstecz" }));
    await user.click(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    );
    wizard.unmount();
    render(<Workspace scenario={scenarios[2]} screen="dashboard" />);
    expect(
      screen.getByRole("checkbox", { name: /Zlecenie równolegle/ }),
    ).not.toBeChecked();
    expect(screen.getByText("0 dni poza podstawą")).toBeVisible();
    await user.click(screen.getByText("Cała historia"));
    expect(
      screen.getByRole("heading", { name: "Potencjalnie do doliczenia" })
        .parentElement,
    ).toHaveTextContent("181");
  });
});
