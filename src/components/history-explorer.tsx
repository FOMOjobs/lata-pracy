"use client";

import Link from "next/link";
import { useId } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  GitCompareArrows,
  Plus,
} from "lucide-react";
import { createCasePlan } from "@/lib/case-plan";
import { useCaseSession } from "@/lib/case-session";
import { formatDateRange, formatNumber } from "@/lib/history";
import type { Scenario, WorkPeriod } from "@/lib/types";
import { CoverageBreakdown } from "./coverage-breakdown";

export function HistoryExplorer({
  scenario,
  onInspect,
}: {
  scenario: Scenario;
  onInspect: (period: WorkPeriod) => void;
}) {
  const { state, togglePeriod } = useCaseSession(scenario);
  const selectedIds = state.selectedPeriodIds;
  const id = useId();
  const candidates = scenario.periods.filter(
    (period) => period.status === "potential",
  );
  const baseline = scenario.periods.filter(
    (period) => period.status === "included",
  );
  const plan = createCasePlan(scenario, selectedIds);
  const missingDocument = plan.documents.find(
    (document) => state.documentAvailability[document.id] === "missing",
  );
  const uncheckedDocument = plan.documents.find(
    (document) => state.documentAvailability[document.id] !== "have",
  );
  const maximum =
    createCasePlan(
      scenario,
      candidates.map((period) => period.id),
    ).totalDays || 1;
  return (
    <section className="history-explorer" aria-labelledby={`${id}-title`}>
      <div className="explorer-heading">
        <div>
          <span className="eyebrow">
            <GitCompareArrows size={15} aria-hidden="true" /> TWÓJ NASTĘPNY KROK
          </span>
          <h2 id={`${id}-title`}>Sprawdź wcześniejszy okres pracy.</h2>
          <p>
            Włącz okres i zobacz, ile dni znajduje się poza podstawą tego
            przykładu.
          </p>
        </div>
        <span className="explorer-label">Porównanie warunkowe</span>
      </div>
      <div className="explorer-body">
        <div className="explorer-choices">
          <p className="explorer-base">
            <Check size={16} aria-hidden="true" /> Etaty są już w podstawie
            przykładu
          </p>
          {candidates.map((period) => (
            <div
              className={`explorer-choice ${selectedIds.includes(period.id) ? "is-selected" : ""}`}
              key={period.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(period.id)}
                  onChange={() => togglePeriod(period.id)}
                />
                <span>
                  <strong>{period.title}</strong>
                  <small>{formatDateRange(period)}</small>
                </span>
              </label>
              <button className="text-link" onClick={() => onInspect(period)}>
                Warunki i dokumenty{" "}
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>
          ))}
          <p className="explorer-hint">
            Okresy wymagające weryfikacji pozostają poza porównaniem.
          </p>
        </div>
        <div className="explorer-result">
          <div className="comparison-line">
            <span>Podstawa przykładu</span>
            <strong>
              {formatNumber(plan.baselineDays)} <small>dni</small>
            </strong>
          </div>
          <div className="comparison-track" aria-hidden="true">
            <i style={{ width: `${(plan.baselineDays / maximum) * 100}%` }} />
          </div>
          <div className="comparison-line comparison-after">
            <span>Z wybranym okresem, warunkowo</span>
            <strong>
              {formatNumber(plan.totalDays)} <small>dni</small>
            </strong>
          </div>
          <div
            className="comparison-track comparison-track-after"
            aria-hidden="true"
          >
            <i style={{ width: `${(plan.baselineDays / maximum) * 100}%` }} />
            <b style={{ width: `${(plan.additionalDays / maximum) * 100}%` }} />
          </div>
          <p
            className={`comparison-delta ${plan.additionalDays ? "has-addition" : ""}`}
            role="status"
          >
            <Plus size={17} aria-hidden="true" />
            <strong>
              {formatNumber(plan.additionalDays)} dni poza podstawą
            </strong>
            <span>
              {selectedIds.length
                ? "Zaliczenie wymaga sprawdzenia warunków i dokumentów."
                : "Wybierz wcześniejszy okres po lewej lub powyżej."}
            </span>
          </p>
        </div>
      </div>
      <dl className="explorer-facts">
        <div>
          <dt>Co wiemy</dt>
          <dd>
            {selectedIds.length
              ? `${formatNumber(plan.additionalDays)} dni wybranych okresów jest poza podstawą. Każdy dzień liczymy raz.`
              : "Nie wybrano okresu do porównania."}
          </dd>
        </div>
        <div>
          <dt>Co trzeba ustalić</dt>
          <dd>
            Warunki zaliczenia i dokumenty nie zostały prawnie zweryfikowane.
          </dd>
        </div>
        <div>
          <dt>Co zrobić teraz</dt>
          <dd>
            {missingDocument
              ? `Uzupełnij brak: ${missingDocument.title}. Instrukcję znajdziesz przy dokumencie.`
              : uncheckedDocument
                ? `Zacznij od dokumentu: ${uncheckedDocument.title}.`
                : selectedIds.length
                  ? "Przejrzyj wybrany zakres i przygotuj projekt do rozmowy z pracodawcą."
                  : "Wybierz co najmniej jeden wcześniejszy okres."}
          </dd>
        </div>
      </dl>
      {plan.periods.length > 0 && (
        <details className="explorer-explanation">
          <summary>Skąd bierze się ta różnica?</summary>
          {plan.periods.map((period, index) => (
            <div key={period.id}>
              <h3>{period.title}</h3>
              <CoverageBreakdown
                period={period}
                coveredBy={[...baseline, ...plan.periods.slice(0, index)]}
                coveredLabel="Już ujęte w porównaniu"
                additionalLabel="Nowe dni w tym porównaniu"
              />
            </div>
          ))}
        </details>
      )}
      <div className="explorer-footer">
        <p>To symulacja na fikcyjnych danych, nie potwierdzenie stażu.</p>
        {plan.periods.length ? (
          <Link
            className="button button-primary"
            href={`/sprawa/${scenario.id}`}
          >
            Przygotuj sprawę krok po kroku{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : (
          <span className="explorer-hint">
            Wybierz okres, aby przygotować sprawę.
          </span>
        )}
      </div>
    </section>
  );
}
