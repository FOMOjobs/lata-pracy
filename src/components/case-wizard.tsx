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
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { createCaseDraft, createCasePlan } from "@/lib/case-plan";
import { formatDateRange, formatNumber } from "@/lib/history";
import type { Scenario } from "@/lib/types";
import { PacketPreview } from "./packet-preview";
import { LegalInfo } from "./legal-info";

const steps = ["Wybierz okresy", "Ustal zakres pakietu", "Sprawdź i potwierdź"];

export function CaseWizard({ scenario }: { scenario: Scenario }) {
  const candidates = scenario.periods.filter(
    (period) => period.status === "potential",
  );
  const [step, setStep] = useState(0);
  const [selectedIds, setSelectedIds] = useState(
    candidates.map((period) => period.id),
  );
  const [selectedDocumentIds, setSelectedDocumentIds] = useState(
    candidates.flatMap((period) =>
      period.documents.map((document) => document.id),
    ),
  );
  const [acknowledged, setAcknowledged] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const plan = createCasePlan(scenario, selectedIds);
  const selectedDocuments = plan.documents.filter((document) =>
    selectedDocumentIds.includes(document.id),
  );
  const draft = createCaseDraft(scenario, selectedIds, selectedDocumentIds);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const toggle = (current: string[], id: string) =>
    current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
  function saveDraft() {
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", draft], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `lata-pracy-${scenario.id}-projekt-demo.txt`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
              {step < 3 ? `KROK ${step + 1} Z 3` : "PRZYGOTOWANIE ZAKOŃCZONE"} ·
              FIKCYJNY SCENARIUSZ
            </span>
            <h1 ref={headingRef} tabIndex={-1}>
              {
                [
                  "Zacznij od jednej historii.",
                  "Ty wybierasz zakres.",
                  "Zobacz, co przygotowujesz.",
                  "Plan gotowy. Decyzja należy do Ciebie.",
                ][step]
              }
            </h1>
            <p>
              {
                [
                  "Wybierz okresy, o których chcesz porozmawiać z pracodawcą. Etaty z przykładu są już w podstawie.",
                  "Wybierz nazwy dokumentów do ujęcia w projekcie. Nie przesyłasz żadnych plików, a zaznaczenie nie potwierdza posiadania dokumentu.",
                  "Przejrzyj zakres i projekt wiadomości. Ostatni przycisk kończy wyłącznie tę demonstrację.",
                  "Masz wybrane okresy, listę warunków i projekt wiadomości. W tej demonstracji nic nie zostało przekazane pracodawcy ani ZUS.",
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
                    onChange={() =>
                      setSelectedIds((current) => toggle(current, period.id))
                    }
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
                <h2>Nazwy dokumentów w projekcie</h2>
                <span>
                  {selectedDocuments.length} / {plan.documents.length}
                </span>
              </div>
              {plan.documents.map((document) => (
                <label
                  className={`document-check ${selectedDocumentIds.includes(document.id) ? "is-checked" : ""}`}
                  key={document.id}
                >
                  <input
                    type="checkbox"
                    checked={selectedDocumentIds.includes(document.id)}
                    onChange={() =>
                      setSelectedDocumentIds((current) =>
                        toggle(current, document.id),
                      )
                    }
                  />
                  <span>
                    <strong>{document.title}</strong>
                    <small>{document.hint}</small>
                  </span>
                </label>
              ))}
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
                    W podglądzie zobaczysz dokładnie wybrany zakres.
                  </strong>
                  <p>
                    Wiadomość obejmie wybrane okresy, warunki do sprawdzenia
                    oraz zaznaczone nazwy dokumentów.
                  </p>
                </div>
              </div>
            </div>
          )}
          {step >= 2 && (
            <>
              <div className="case-preview-wrapper">
                <PacketPreview
                  scenario={scenario}
                  selectedIds={selectedIds}
                  selectedDocumentIds={selectedDocumentIds}
                />
              </div>
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
                  <button className="button button-outline" onClick={copyDraft}>
                    <Clipboard size={16} aria-hidden="true" /> Skopiuj projekt
                  </button>
                  <button className="button button-outline" onClick={saveDraft}>
                    <ArrowDownToLine size={16} aria-hidden="true" /> Pobierz TXT
                  </button>
                  <button
                    className="button button-outline"
                    onClick={() => window.print()}
                  >
                    <Printer size={16} aria-hidden="true" /> Drukuj kartę
                  </button>
                </div>
                <p className="small muted">
                  W oknie drukowania możesz wybrać „Zapisz jako PDF”. Druk
                  obejmuje kartę z wybranym zakresem.
                </p>
                <p className="case-copy-status" role="status">
                  {copyStatus}
                </p>
              </section>
              {step === 2 && (
                <label className="case-acknowledgement">
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(event) => setAcknowledged(event.target.checked)}
                  />
                  <span>
                    Rozumiem, że to fikcyjna symulacja. Nic nie zostanie
                    wysłane, a wynik nie potwierdza uprawnień.
                  </span>
                </label>
              )}
              {step === 3 && (
                <div className="case-complete">
                  <CheckCheck size={25} aria-hidden="true" />
                  <div>
                    <h2>Projekt pakietu jest gotowy.</h2>
                    <p>
                      Możesz go przejrzeć, skopiować lub wydrukować. Rzeczywiste
                      zaliczenie okresu wymaga oceny warunków i dokumentów przez
                      pracodawcę.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="case-navigation">
            {step > 0 && step < 3 && (
              <button
                className="button button-outline"
                onClick={() => {
                  setStep(step - 1);
                  setAcknowledged(false);
                }}
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
                Zakończ symulację <Check size={17} aria-hidden="true" />
              </button>
            )}
            {step === 3 && (
              <>
                <button
                  className="button button-outline"
                  onClick={() => {
                    setStep(0);
                    setAcknowledged(false);
                    setCopyStatus("");
                  }}
                >
                  <RotateCcw size={16} aria-hidden="true" /> Przejdź ponownie
                </button>
                <Link
                  className="button button-primary"
                  href={`/pulpit/${scenario.id}`}
                >
                  Wróć do historii <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
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
              Wszystko dzieje się w tej demonstracji. Bez wysyłania danych.
            </span>
          </div>
          <LegalInfo label="Zasady i oficjalne źródła" />
        </aside>
      </div>
    </div>
  );
}
