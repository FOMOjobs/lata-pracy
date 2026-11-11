"use client";

import { useId } from "react";
import { ArrowUpRight, CircleHelp, FileSearch, Info } from "lucide-react";
import { getDocumentGuidance } from "@/lib/document-guidance";
import { formatDateRange } from "@/lib/history";
import type {
  DemoDocument,
  DocumentAvailability,
  WorkPeriod,
} from "@/lib/types";

export interface PreparationDocument {
  document: DemoDocument;
  period: WorkPeriod;
}

interface DocumentPreparationProps {
  documents: PreparationDocument[];
  availability: Record<string, DocumentAvailability>;
  onAvailabilityChange: (id: string, value: DocumentAvailability) => void;
  selectedDocumentIds?: string[];
  onToggleSelected?: (id: string) => void;
}

export function DocumentPreparation({
  documents,
  availability,
  onAvailabilityChange,
  selectedDocumentIds,
  onToggleSelected,
}: DocumentPreparationProps) {
  const id = useId();
  const hasScopeSelection =
    selectedDocumentIds !== undefined && onToggleSelected !== undefined;

  if (documents.length === 0) {
    return (
      <p className="document-preparation-empty">
        Wybierz okres, aby zobaczyć dokumenty do sprawdzenia.
      </p>
    );
  }

  return (
    <div className="document-preparation">
      <p className="document-preparation-note" id={`${id}-note`}>
        Dostępność to Twoja deklaracja w fikcyjnym przykładzie. Nie potwierdza
        dokumentu ani prawa do zaliczenia okresu.
        {hasScopeSelection &&
          " Domyślnie podsumowanie obejmuje dokumenty wybranych okresów. Jego zawartość możesz dostosować poniżej."}
      </p>
      <div className="document-preparation-list">
        {documents.map(({ document, period }) => {
          const currentAvailability = availability[document.id] ?? "unknown";
          const guidance = getDocumentGuidance(document.id);
          const selectId = `${id}-${document.id}-availability`;
          const headingId = `${id}-${document.id}-title`;

          return (
            <article
              className={`document-preparation-item document-preparation-${currentAvailability}`}
              key={document.id}
              aria-labelledby={headingId}
            >
              <div className="document-preparation-heading">
                <FileSearch size={20} aria-hidden="true" />
                <div>
                  <h3 id={headingId}>{document.title}</h3>
                  <p className="document-preparation-period">
                    {period.title} · {formatDateRange(period)}
                  </p>
                </div>
              </div>
              <p className="document-preparation-hint">{document.hint}</p>
              <div className="document-preparation-controls">
                <div className="document-preparation-availability">
                  <label htmlFor={selectId}>
                    Dostępność:{" "}
                    <span className="sr-only">{document.title}</span>
                  </label>
                  <select
                    id={selectId}
                    value={currentAvailability}
                    aria-describedby={`${id}-note`}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (
                        value === "unknown" ||
                        value === "missing" ||
                        value === "have"
                      ) {
                        onAvailabilityChange(document.id, value);
                      }
                    }}
                  >
                    <option value="unknown">Nie wiem jeszcze</option>
                    <option value="missing">Nie mam dokumentu</option>
                    <option value="have">Mam — do sprawdzenia</option>
                  </select>
                </div>
              </div>

              {currentAvailability === "have" && (
                <p className="document-preparation-declaration">
                  <Info size={15} aria-hidden="true" />
                  To deklaracja posiadania. Dokument nadal wymaga sprawdzenia.
                </p>
              )}

              {currentAvailability === "missing" && (
                <div className="document-gap">
                  <div className="document-gap-summary">
                    <CircleHelp size={19} aria-hidden="true" />
                    <div>
                      <strong>Brak do uzupełnienia: {document.title}</strong>
                      <p>{guidance.nextAction}</p>
                    </div>
                  </div>
                  <details className="document-gap-details">
                    <summary>Jak uzupełnić ten brak?</summary>
                    <p className="document-gap-fact">
                      <strong>Co wiadomo:</strong> w fikcyjnej historii ten
                      dokument dotyczy okresu „{period.title}”,{" "}
                      {formatDateRange(period)}. Daty i warunki trzeba sprawdzić
                      z dokumentami.
                    </p>
                    <ol className="document-gap-steps">
                      {guidance.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                    <a
                      className="document-gap-source text-link"
                      href={guidance.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Oficjalne wyjaśnienia: {guidance.source.publisher}
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only"> (otwiera nową kartę)</span>
                    </a>
                    <p className="document-gap-limitation">
                      To plan uzupełnienia braku. Nie złożono wniosku, nie
                      wydano zaświadczenia i nie zmieniono statusu okresu.
                    </p>
                  </details>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {hasScopeSelection && (
        <details className="document-scope-options">
          <summary>Dostosuj zawartość</summary>
          <p>
            Wybierz nazwy dokumentów do podsumowania. Odznaczenie nazwy nie
            zmienia deklarowanej dostępności ani warunków zaliczenia okresu.
            Nie dołączasz żadnych plików.
          </p>
          <div className="document-scope-list">
            {documents.map(({ document }) => (
              <label className="document-preparation-scope" key={document.id}>
                <input
                  type="checkbox"
                  aria-label={`Uwzględnij w projekcie: ${document.title}`}
                  checked={selectedDocumentIds.includes(document.id)}
                  onChange={() => onToggleSelected(document.id)}
                />
                <span>{document.title}</span>
              </label>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
