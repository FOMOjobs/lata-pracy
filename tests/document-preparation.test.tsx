import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DocumentPreparation } from "@/components/document-preparation";
import { getDocumentGuidance } from "@/lib/document-guidance";
import { scenarios } from "@/data/scenarios";
import type { DocumentAvailability } from "@/lib/types";

const period = scenarios[2].periods[1];
const document = period.documents[0];
const documents = [{ document, period }];

function ControlledPreparation({ withScope = false }: { withScope?: boolean }) {
  const [availability, setAvailability] = useState<
    Record<string, DocumentAvailability>
  >({});
  const [selectedIds, setSelectedIds] = useState([document.id]);
  return (
    <DocumentPreparation
      documents={documents}
      availability={availability}
      onAvailabilityChange={(id, value) =>
        setAvailability((current) => ({ ...current, [id]: value }))
      }
      selectedDocumentIds={withScope ? selectedIds : undefined}
      onToggleSelected={
        withScope
          ? (id) =>
              setSelectedIds((current) =>
                current.includes(id)
                  ? current.filter((item) => item !== id)
                  : [...current, id],
              )
          : undefined
      }
    />
  );
}

describe("przygotowanie dokumentów i brakujący dowód", () => {
  it("prowadzi od konkretnego braku do kolejnego kroku i oficjalnego źródła", async () => {
    const user = userEvent.setup();
    render(<ControlledPreparation />);
    await user.selectOptions(
      screen.getByRole("combobox", { name: `Dostępność: ${document.title}` }),
      "missing",
    );
    expect(
      screen.getByText(`Brak do uzupełnienia: ${document.title}`),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Sprawdź w instrukcji ZUS, jak ustalić dokument dla tego okresu.",
      ),
    ).toBeVisible();
    await user.click(screen.getByText("Jak uzupełnić ten brak?"));
    expect(screen.getByText(/Co wiadomo:/)).toBeVisible();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(
      screen.getByRole("link", { name: /Oficjalne wyjaśnienia/ }),
    ).toHaveAttribute(
      "href",
      "https://www.zus.pl/baza-wiedzy/biezace-wyjasnienia-komorek-merytorycznych/-/asset_publisher/biezacewyjasnieniakomorekmerytorycznych/content/id/13660998",
    );
    expect(screen.getByText(/nie zmieniono statusu okresu/)).toBeVisible();
  });

  it("pozwala wrócić do deklaracji posiadania lub braku wiedzy bez zatwierdzania dokumentu", async () => {
    const user = userEvent.setup();
    render(<ControlledPreparation />);
    const select = screen.getByRole("combobox", {
      name: `Dostępność: ${document.title}`,
    });
    await user.selectOptions(select, "missing");
    await user.selectOptions(select, "have");
    expect(
      screen.queryByText("Jak uzupełnić ten brak?"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        "To deklaracja posiadania. Dokument nadal wymaga sprawdzenia.",
      ),
    ).toBeVisible();
    await user.selectOptions(select, "unknown");
    expect(select).toHaveValue("unknown");
    expect(
      screen.queryByText(
        "To deklaracja posiadania. Dokument nadal wymaga sprawdzenia.",
      ),
    ).not.toBeInTheDocument();
  });

  it("oddziela brak dokumentu od wyboru jego nazwy do projektu", async () => {
    const user = userEvent.setup();
    render(<ControlledPreparation withScope />);
    const checkbox = screen.getByRole("checkbox", {
      name: `Uwzględnij w projekcie: ${document.title}`,
    });
    const select = screen.getByRole("combobox", {
      name: `Dostępność: ${document.title}`,
    });
    await user.selectOptions(select, "missing");
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(select).toHaveValue("missing");
    expect(
      screen.getByText(`Brak do uzupełnienia: ${document.title}`),
    ).toBeVisible();
  });

  it("przekazuje wyłącznie deklarację dokumentu bez modyfikowania scenariusza", async () => {
    const user = userEvent.setup();
    const onAvailabilityChange = vi.fn();
    const onToggleSelected = vi.fn();
    const before = structuredClone(period);
    render(
      <DocumentPreparation
        documents={documents}
        availability={{}}
        onAvailabilityChange={onAvailabilityChange}
        selectedDocumentIds={[document.id]}
        onToggleSelected={onToggleSelected}
      />,
    );
    await user.selectOptions(screen.getByRole("combobox"), "missing");
    expect(onAvailabilityChange).toHaveBeenCalledExactlyOnceWith(
      document.id,
      "missing",
    );
    expect(onToggleSelected).not.toHaveBeenCalled();
    expect(period).toEqual(before);
    expect(period.status).toBe("potential");
  });

  it("pokazuje odrębne, nazwane kontrolki dla każdego dokumentu", () => {
    render(
      <DocumentPreparation
        documents={period.documents.map((item) => ({ document: item, period }))}
        availability={{}}
        onAvailabilityChange={() => {}}
      />,
    );
    const article = screen.getByRole("article", {
      name: period.documents[1].title,
    });
    expect(
      within(article).getByRole("combobox", {
        name: `Dostępność: ${period.documents[1].title}`,
      }),
    ).toHaveValue("unknown");
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("dla nowego dokumentu wskazuje potrzebę ustalenia wystawcy, bez zgadywania reguły", () => {
    const guidance = getDocumentGuidance("new-document-not-in-demo");
    expect(guidance.nextAction).toBe(
      "Ustal z pracodawcą, jaki dokument wyjaśni ten konkretny brak.",
    );
    expect(guidance.steps.join(" ")).toContain("właściwego wystawcę");
    expect(guidance.source.url).toBe(
      "https://www.gov.pl/web/rodzina/staz-pracy-qa",
    );
  });
});
