import { Check, FileText, ShieldCheck } from "lucide-react";
import { createCasePlan, describeDocumentAvailability } from "@/lib/case-plan";
import { formatDateRange, formatNumber } from "@/lib/history";
import { legalSources } from "@/lib/legal";
import type { DocumentAvailability, Scenario } from "@/lib/types";

export function PacketPreview({
  scenario,
  selectedIds,
  selectedDocumentIds,
  documentAvailability = {},
}: {
  scenario: Scenario;
  selectedIds: string[];
  selectedDocumentIds: string[];
  documentAvailability?: Record<string, DocumentAvailability>;
}) {
  const plan = createCasePlan(scenario, selectedIds);
  const documents = plan.documents.filter((document) =>
    selectedDocumentIds.includes(document.id),
  );
  return (
    <article
      className="packet-preview printable-packet"
      aria-label="Podsumowanie dla kadr"
    >
      <header className="packet-heading">
        <span className="packet-wordmark">
          Lata<strong>Pracy</strong>.
        </span>
        <span className="packet-stamp">KARTA ROBOCZA · DEMO</span>
      </header>
      <div className="packet-title">
        <span className="eyebrow">
          HISTORIA: {scenario.name.toLocaleUpperCase("pl-PL")} · POSTAĆ FIKCYJNA
        </span>
        <h2>
          Podsumowanie
          <br />
          dla kadr.
        </h2>
        <p>
          Okresy i dokumenty do rozmowy z kadrami. Stan fikcyjnej historii:
          31.10.2026.
        </p>
      </div>
      <div className="packet-callout">
        <ShieldCheck size={19} aria-hidden="true" />
        <p>
          <strong>Dokument demonstracyjny.</strong> Nie potwierdza stażu ani
          uprawnień. Nic nie zostało wysłane; nie dołączono żadnych plików.
        </p>
      </div>
      <dl className="packet-numbers">
        <div>
          <dt>Podstawa przykładu</dt>
          <dd>
            {formatNumber(plan.baselineDays)} <span>dni</span>
          </dd>
        </div>
        <div>
          <dt>Poza podstawą, do sprawdzenia</dt>
          <dd>
            +{formatNumber(plan.additionalDays)} <span>dni</span>
          </dd>
        </div>
      </dl>
      <section>
        <h3>
          <span>01</span> Wybrane okresy
        </h3>
        <ul className="packet-periods">
          {plan.periods.map((period) => (
            <li key={period.id}>
              <FileText size={18} aria-hidden="true" />
              <div>
                <strong>{period.title}</strong>
                <span>
                  {formatDateRange(period)} · {period.organization} (firma
                  fikcyjna)
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>
          <span>02</span> Co wymaga potwierdzenia
        </h3>
        <ul className="packet-conditions">
          {[
            ...new Set(plan.periods.flatMap((period) => period.conditions)),
          ].map((condition) => (
            <li key={condition}>
              <Check size={14} aria-hidden="true" />
              {condition}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>
          <span>03</span> Dokumenty do przygotowania
        </h3>
        {documents.length > 0 ? (
          <ul className="packet-documents">
            {documents.map((document) => (
              <li key={document.id}>
                <span className="packet-empty-box" aria-hidden="true" />
                <span>
                  <strong>{document.title}</strong>
                  <small className="packet-document-status">
                    {describeDocumentAvailability(
                      documentAvailability[document.id],
                    )}
                  </small>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="packet-missing">
            Nie wybrano dokumentów. Podsumowanie wymaga uzupełnienia.
          </p>
        )}
        <p className="packet-small">
          To zakres wybrany przez osobę korzystającą z demonstracji, nie
          potwierdzenie posiadania ani kompletności dokumentów. Dostępność to
          deklaracja w przykładzie; dokumentów nie zweryfikowano.
        </p>
      </section>
      <section className="packet-sources">
        <h3>
          <span>04</span> Źródła do sprawdzenia
        </h3>
        {legalSources.map((source) => (
          <a
            href={source.url}
            key={source.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {source.title}
            <span aria-hidden="true">{source.url}</span>
            <span className="sr-only"> (otwiera nową kartę)</span>
          </a>
        ))}
      </section>
      <footer className="packet-footer">
        <strong>Twoja praca się liczy.</strong>
        <span>Niezależny prototyp · Fikcyjne dane · Bez integracji ZUS</span>
      </footer>
    </article>
  );
}
