"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  ChevronRight,
  Clipboard,
  Eye,
  FileCheck2,
  FileText,
  LockKeyhole,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { createCaseDraft, createCasePlan } from "@/lib/case-plan";
import { useCaseSession } from "@/lib/case-session";
import { formatDateRange, formatNumber } from "@/lib/history";
import type { Scenario } from "@/lib/types";
import { DocumentPreparation } from "./document-preparation";
import { PacketPreview } from "./packet-preview";
import { LegalInfo } from "./legal-info";

const steps = ["Wybierz okresy", "Ustal zakres pakietu", "Sprawdź i potwierdź"];

export function CaseWizard({ scenario }: { scenario: Scenario }) {
  const { state, togglePeriod, toggleDocument, setDocumentAvailability } =
    useCaseSession(scenario);
  const {
    selectedPeriodIds: selectedIds,
    selectedDocumentIds,
    documentAvailability,
  } = state;
  const candidates = scenario.periods.filter(
    (period) => period.status === "potential",
  );
  const [step, setStep] = useState(0);
  const [acknowledged, setAcknowledged] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const plan = createCasePlan(scenario, selectedIds);
  const selectedDocuments = plan.documents.filter((document) =>
    selectedDocumentIds.includes(document.id),
  );
  const pendingDocuments = selectedDocuments.filter(
    (document) => documentAvailability[document.id] !== "have",
  );
  const missingDocuments = selectedDocuments.filter(
    (document) => documentAvailability[document.id] === "missing",
  );
  const draft = createCaseDraft(
    scenario,
    selectedIds,
    selectedDocumentIds,
    documentAvailability,
  );
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  function saveDraft() {
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", draft], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `lata-pracy-${scenario.id}-projekt-demo.txt`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setCopyStatus(
      "Pobrano fikcyjny projekt wiadomości. Nic nie zostało wysłane.",
    );
  }
  async function copyDraft() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Brak schowka");
      await navigator.clipboard.writeText(draft);
      setCopyStatus(
        "Skopiowano fikcyjny projekt wiadomości. Nic nie zostało wysłane.",
      );
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopyStatus("Zaznaczono projekt. Skopiuj go skrótem Ctrl+C lub ⌘C.");
    }
  }
  function revise(nextStep: number) {
    setStep(nextStep);
    setAcknowledged(false);
    setCopyStatus("");
  }

  return (
    <div className="case-wizard">
      <ol className="case-stepper" aria-label="Etapy przygotowania">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={step === index ? "step" : undefined}
            className={step > index ? "is-done" : ""}
          >
            <span>
              {step > index ? (
                <Check size={15} aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <strong>{label}</strong>
            {index < 2 && <ChevronRight size={17} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="case-workspace">
        <section className="case-content">
          <div className="case-content-heading">
            <span className="eyebrow">
              {step < 3 ? `KROK ${step + 1} Z 3` : "PROJEKT PRZYGOTOWANY"} ·
              FIKCYJNY SCENARIUSZ
            </span>
            <h1 ref={headingRef} tabIndex={-1}>
              {
                [
                  "Zacznij od jednej historii.",
                  "Sprawdź dokumenty i wybierz zakres.",
                  "Sprawdź wybrany zakres.",
                  "Masz projekt. Wiesz, co sprawdzić dalej.",
                ][step]
              }
            </h1>
            <p>
              {
                [
                  "Zachowaliśmy Twój wybór z historii. Wybierz okresy do rozmowy z pracodawcą; etaty z przykładu są już w podstawie.",
                  "Określ, czy masz dokument do sprawdzenia. Osobno wybierasz, które nazwy uwzględnić w projekcie. Nie przesyłasz żadnych plików.",
                  "Przejrzyj kartę i zadeklarowaną dostępność dokumentów. Dopiero po potwierdzeniu przygotujesz projekt do skopiowania lub druku.",
                  "Projekt obejmuje wybrany zakres i pokazuje braki. Nic nie zostało przekazane pracodawcy ani ZUS; dokumenty i warunki nadal wymagają oceny.",
                ][step]
              }
            </p>
          </div>
          {step === 0 && (
            <div className="case-period-choices">
              {candidates.map((period) => (
                <label
                  className={`case-period-choice ${selectedIds.includes(period.id) ? "is-selected" : ""}`}
                  key={period.id}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(period.id)}
                    onChange={() => togglePeriod(period.id)}
                  />
                  <span className="case-period-text">
                    <strong>{period.title}</strong>
                    <small>{formatDateRange(period)}</small>
                    <p>{period.description}</p>
                  </span>
                </label>
              ))}
              {scenario.periods.some(
                (period) => period.status === "review",
              ) && (
                <div className="case-uncertain">
                  <ShieldCheck size={19} aria-hidden="true" />
                  <div>
                    <strong>Niepełne dane pozostają do weryfikacji.</strong>
                    <p>
                      Takie okresy nie zwiększają porównania. Ich wyjaśnienia i
                      TODO znajdziesz w pełnej historii.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {step === 1 && (
            <div className="case-document-choices">
              <div className="case-section-label">
                <FileCheck2 size={20} aria-hidden="true" />
                <h2>Dokumenty do sprawdzenia</h2>
                <span>
                  {selectedDocuments.length} / {plan.documents.length} w
                  projekcie
                </span>
              </div>
              <DocumentPreparation
                documents={plan.periods.flatMap((period) =>
                  period.documents.map((document) => ({ document, period })),
                )}
                availability={documentAvailability}
                onAvailabilityChange={setDocumentAvailability}
                selectedDocumentIds={selectedDocumentIds}
                onToggleSelected={toggleDocument}
              />
              {selectedDocuments.length === 0 && (
                <p className="case-incomplete" role="status">
                  Bez wybranych nazw dokumentów projekt będzie oznaczony jako
                  wymagający uzupełnienia.
                </p>
              )}
              <div className="case-scope-note">
                <Eye size={20} aria-hidden="true" />
                <div>
                  <strong>
                    „Mam dokument” i „uwzględnij w projekcie” to dwa osobne
                    wybory.
                  </strong>
                  <p>
                    Dostępność jest deklaracją, a nie weryfikacją dokumentu.
                    Zmiana jej nie zatwierdza okresu ani nie zmienia liczby dni.
                  </p>
                </div>
              </div>
            </div>
          )}
          {step >= 2 && (
            <div className="case-preview-wrapper">
              <PacketPreview
                scenario={scenario}
                selectedIds={selectedIds}
                selectedDocumentIds={selectedDocumentIds}
                documentAvailability={documentAvailability}
              />
            </div>
          )}
          {step === 2 && (
            <label className="case-acknowledgement">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(event) => setAcknowledged(event.target.checked)}
              />
              <span>
                Rozumiem, że to fikcyjna symulacja. Nic nie zostanie wysłane, a
                wynik nie potwierdza uprawnień.
              </span>
            </label>
          )}
          {step === 3 && (
            <>
              <div className="case-complete">
                <CheckCheck size={25} aria-hidden="true" />
                <div>
                  <h2>Projekt pakietu przygotowany.</h2>
                  <p>
                    {selectedDocuments.length === 0
                      ? "Nie wybrano nazw dokumentów. Projekt wymaga uzupełnienia."
                      : pendingDocuments.length > 0
                        ? `Dostępność ${pendingDocuments.length} z ${selectedDocuments.length} wybranych dokumentów wymaga uzupełnienia lub ustalenia. Sprawdź wskazane braki przed rzeczywistą rozmową.`
                        : "Zadeklarowano posiadanie wybranych dokumentów. Nadal trzeba sprawdzić ich treść, kompletność i warunki zaliczenia okresów."}
                  </p>
                  {pendingDocuments.length > 0 && (
                    <button className="text-link" onClick={() => revise(1)}>
                      {missingDocuments.length > 0
                        ? "Wróć do brakujących dokumentów"
                        : "Wróć do dokumentów do sprawdzenia"}{" "}
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
              <details className="case-more-options">
                <summary>Więcej możliwości</summary>
                <section className="case-draft-section">
                  <div className="case-section-label">
                    <FileText size={20} aria-hidden="true" />
                    <h2>Projekt wiadomości</h2>
                  </div>
                  <label className="sr-only" htmlFor="case-draft">
                    Fikcyjny projekt wiadomości do pracodawcy
                  </label>
                  <textarea
                    ref={draftRef}
                    id="case-draft"
                    readOnly
                    value={draft}
                    rows={10}
                  />
                  <div className="case-draft-actions">
                    <button
                      className="button button-outline"
                      onClick={copyDraft}
                    >
                      <Clipboard size={16} aria-hidden="true" /> Skopiuj projekt
                    </button>
                    <button
                      className="button button-outline"
                      onClick={saveDraft}
                    >
                      <ArrowDownToLine size={16} aria-hidden="true" /> Pobierz
                      TXT
                    </button>
                  </div>
                  <p className="case-copy-status" role="status">
                    {copyStatus}
                  </p>
                </section>
                <button className="text-link" onClick={() => revise(0)}>
                  Popraw wybór okresów i dokumentów{" "}
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
                <Link className="text-link" href={`/pulpit/${scenario.id}`}>
                  Wróć do historii <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </details>
            </>
          )}
          <div className="case-navigation">
            {step > 0 && step < 3 && (
              <button
                className="button button-outline"
                onClick={() => revise(step - 1)}
              >
                <ArrowLeft size={16} aria-hidden="true" /> Wstecz
              </button>
            )}
            {step < 2 && (
              <button
                className="button button-primary"
                disabled={plan.periods.length === 0}
                onClick={() => setStep(step + 1)}
              >
                {step === 0 ? "Wybierz zakres pakietu" : "Pokaż podgląd"}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            )}
            {step === 2 && (
              <button
                className="button button-primary"
                disabled={!acknowledged}
                onClick={() => setStep(3)}
              >
                Przygotuj projekt <Check size={17} aria-hidden="true" />
              </button>
            )}
            {step === 3 && (
              <button
                className="button button-primary"
                onClick={() => window.print()}
              >
                <Printer size={17} aria-hidden="true" /> Drukuj kartę
              </button>
            )}
          </div>
          {step === 3 && (
            <p className="small muted case-print-hint">
              W oknie drukowania możesz wybrać „Zapisz jako PDF”. Druk obejmuje
              samą kartę z wybranym zakresem.
            </p>
          )}
          {step === 0 && plan.periods.length === 0 && (
            <p className="case-selection-hint" role="status">
              Wybierz co najmniej jeden okres, aby przejść dalej.
            </p>
          )}
        </section>
        <aside className="case-summary">
          <span className="case-summary-icon">
            <FileCheck2 size={24} aria-hidden="true" />
          </span>
          <span className="eyebrow">TWÓJ ZAKRES</span>
          <h2>
            Jedna sprawa.
            <br />
            Jasny następny krok.
          </h2>
          <dl>
            <div>
              <dt>Wybrane okresy</dt>
              <dd>{plan.periods.length}</dd>
            </div>
            <div>
              <dt>Nazwy dokumentów</dt>
              <dd>{selectedDocuments.length}</dd>
            </div>
            <div>
              <dt>Nowe dni poza podstawą</dt>
              <dd>+{formatNumber(plan.additionalDays)}</dd>
            </div>
          </dl>
          <p>
            Wartość jest warunkowa. Wybór nie zatwierdza dokumentów ani prawa do
            doliczenia.
          </p>
          <div className="case-summary-privacy">
            <LockKeyhole size={17} aria-hidden="true" />
            <span>
              Wybory są zachowane w tej karcie przeglądarki. Bez wysyłania
              danych.
            </span>
          </div>
          <LegalInfo label="Zasady i oficjalne źródła" />
        </aside>
      </div>
    </div>
  );
}
