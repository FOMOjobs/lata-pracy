"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  FileText,
  GitCompareArrows,
  History,
  LayoutDashboard,
  List,
  LockKeyhole,
  Plus,
  Route,
  ShieldCheck,
} from "lucide-react";
import { scenarios } from "@/data/scenarios";
import {
  approximateDuration,
  formatDateRange,
  formatNumber,
  parseDay,
  summarizeHistory,
} from "@/lib/history";
import { statusMeta } from "@/lib/legal";
import type { PeriodStatus, Scenario, WorkPeriod } from "@/lib/types";
import { Brand } from "./brand";
import { LegalInfo } from "./legal-info";
import { Modal } from "./modal";
import { StatusBadge } from "./status-badge";
import { HistoryExplorer } from "./history-explorer";
import { DocumentPreparation } from "./document-preparation";
import { useCaseSession } from "@/lib/case-session";

const workTypeLabels = {
  employment: "Umowa o pracę",
  contract: "Umowa zlecenia",
  business: "Działalność gospodarcza",
};
function WorkIcon({
  period,
  size = 20,
}: {
  period: WorkPeriod;
  size?: number;
}) {
  const Icon =
    period.type === "business"
      ? Building2
      : period.type === "contract"
        ? FileText
        : BriefcaseBusiness;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}

export function Workspace({
  scenario,
  screen,
}: {
  scenario: Scenario;
  screen: "dashboard" | "timeline";
}) {
  const router = useRouter();
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<WorkPeriod | null>(null);
  const { state: caseState, setDocumentAvailability } =
    useCaseSession(scenario);
  const [downloaded, setDownloaded] = useState(false);
  const summary = summarizeHistory(scenario.periods);
  const documents = scenario.periods.flatMap((period) =>
    period.documents.map((document) => ({ document, period })),
  );

  function downloadSummary() {
    const text = [
      "LATA PRACY — PODSUMOWANIE DEMONSTRACYJNE",
      "Twoja praca się liczy.",
      `Scenariusz: ${scenario.name} — ${scenario.role}. Wszystkie dane są fikcyjne.`,
      "Stan fikcyjnej historii: 31.10.2026. Niezależny prototyp, bez integracji ZUS.",
      "Wynik nie potwierdza praw ani uprawnień. Ocena wymaga weryfikacji dokumentów i warunków przez pracodawcę.",
      "",
      `Uwzględnione w przykładzie: ${summary.days.included} unikalnych dni`,
      `Potencjalnie do doliczenia: ${summary.days.potential} dodatkowych dni (warunkowo)`,
      `Do weryfikacji: ${summary.days.review} dodatkowych dni (nie wliczono do potencjalnego stażu)`,
      `Pominięte powtórzenia dni: ${summary.repeatedDays}`,
      "",
      ...scenario.periods.flatMap((period) => [
        `${period.title} | ${formatDateRange(period)} | ${statusMeta[period.status].label}`,
        `Wkład do kategorii: ${summary.contributions[period.id].additionalDays} dni. Pominięte powtórzenia: ${summary.contributions[period.id].repeatedDays}.`,
        ...period.conditions.map(
          (condition) => `  Do sprawdzenia: ${condition}`,
        ),
        ...period.documents.map((document) => `  Dokument: ${document.title}`),
        ...(period.legalTodo ? [period.legalTodo] : []),
        "",
      ]),
      "Przybliżenia w interfejsie: 365 dni = rok; 30 dni = miesiąc. Nie jest to prawna metoda ustalania stażu.",
      "Źródła i ograniczenia: dokumentacja docs/LEGAL.md w repozytorium https://github.com/FOMOjobs/lata-pracy",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `lata-pracy-${scenario.id}-demo.txt`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Brand light />
        <div className="sidebar-divider" />
        <span className="sidebar-label">TWOJA PRZESTRZEŃ</span>
        <nav className="app-nav" aria-label="Nawigacja historii">
          <Link
            href={`/pulpit/${scenario.id}`}
            className={screen === "dashboard" ? "active" : ""}
            aria-current={screen === "dashboard" ? "page" : undefined}
          >
            <LayoutDashboard size={19} aria-hidden="true" /> Pulpit{" "}
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href={`/historia/${scenario.id}`}
            className={screen === "timeline" ? "active" : ""}
            aria-current={screen === "timeline" ? "page" : undefined}
          >
            <History size={19} aria-hidden="true" /> Oś czasu{" "}
            <span className="nav-count">{scenario.periods.length}</span>
          </Link>
          <button onClick={() => setDocumentsOpen(true)}>
            <FileCheck2 size={19} aria-hidden="true" /> Lista dokumentów
          </button>
        </nav>
        <div className="sidebar-bottom">
          <LegalInfo label="Zasady i źródła" className="sidebar-help" />
          <span>
            <span className="tiny-dot" /> NIEZALEŻNY PROTOTYP
          </span>
        </div>
      </aside>
      <div className="app-body">
        <header className="app-topbar">
          <div className="app-breadcrumb">
            Twoja przestrzeń <ChevronRight size={14} aria-hidden="true" />
            <strong>{screen === "dashboard" ? "Pulpit" : "Oś czasu"}</strong>
          </div>
          <div className="app-topbar-right">
            <span className="demo-pill">
              <span /> Tryb demo
            </span>
            <span className={`small-avatar accent-${scenario.accent}`}>
              {scenario.initials}
              <span className="sr-only">Scenariusz: {scenario.name}</span>
            </span>
          </div>
        </header>
        <main id="main" className="workspace-main">
          <div className="workspace-toolbar">
            <Link href="/scenariusze" className="back-link">
              <ArrowLeft size={15} aria-hidden="true" /> Wszystkie historie
            </Link>
            <div className="scenario-switch">
              <label htmlFor="scenario-select">Scenariusz:</label>
              <select
                id="scenario-select"
                value={scenario.id}
                onChange={(event) =>
                  router.push(
                    `/${screen === "dashboard" ? "pulpit" : "historia"}/${event.target.value}`,
                  )
                }
              >
                {scenarios.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — {item.role}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} aria-hidden="true" />
            </div>
          </div>
          <div className="workspace-heading">
            <div>
              <span className="eyebrow">
                HISTORIA{" "}
                {scenario.name === "Kasia"
                  ? "KASI"
                  : scenario.name === "Marek"
                    ? "MARKA"
                    : "OLI"}{" "}
                · FIKCYJNY SCENARIUSZ
              </span>
              <h1>
                {screen === "dashboard" ? (
                  <>
                    Twój staż. <span>Pełniejszy obraz.</span>
                  </>
                ) : (
                  <>
                    Każdy etap <span>Twojej historii.</span>
                  </>
                )}
              </h1>
              <p>
                {screen === "dashboard"
                  ? "Zobacz, co już uwzględniono, a do czego warto wrócić."
                  : "Kliknij wybrany okres, żeby zobaczyć warunki i dokumenty do sprawdzenia."}
              </p>
            </div>
            <details className="workspace-more">
              <summary>Więcej</summary>
              <div>
                <button className="text-link" onClick={downloadSummary}>
                  <ArrowDownToLine size={16} aria-hidden="true" /> Pobierz
                  podsumowanie całej historii TXT
                </button>
              </div>
            </details>
          </div>
          <div className="demo-notice">
            <ShieldCheck size={18} aria-hidden="true" />
            <p>
              <strong>To przykład, nie decyzja.</strong> Dane są fikcyjne.
              Zaliczenie okresów wymaga weryfikacji warunków i dokumentów.
            </p>
            <LegalInfo label="Jak czytać wynik" />
          </div>
          {screen === "dashboard" ? (
            <>
              <HistoryExplorer
                scenario={scenario}
                onInspect={setSelectedPeriod}
              />
              <p className="categories-caption">
                Trzy kategorie całej fikcyjnej historii — niezależnie od wyboru
                w porównaniu.
              </p>
              <div className="stats-grid stats-compact">
                {(["included", "potential", "review"] as const).map(
                  (status) => {
                    const Icon =
                      status === "included"
                        ? CheckCheck
                        : status === "potential"
                          ? Plus
                          : CircleHelp;
                    const count = scenario.periods.filter(
                      (period) => period.status === status,
                    ).length;
                    return (
                      <article
                        className={`stat-card stat-${status}`}
                        key={status}
                      >
                        <div className="stat-card-top">
                          <span className="stat-icon">
                            <Icon size={20} aria-hidden="true" />
                          </span>
                          <span>
                            {count} {count === 1 ? "okres" : "okresy"}
                          </span>
                        </div>
                        <h2>{statusMeta[status].label}</h2>
                        <span className="stat-value">
                          {formatNumber(summary.days[status])}{" "}
                          <small>dni</small>
                        </span>
                        <span className="stat-exact">
                          ok. {approximateDuration(summary.days[status])}
                        </span>
                      </article>
                    );
                  },
                )}
              </div>
              <p className="calculation-note">
                Lata i miesiące są orientacyjne. Dokładny wynik pokazujemy w
                dniach. <LegalInfo label="Sposób liczenia" />
              </p>
              <div className="dashboard-history">
                <section className="panel history-preview">
                  <div className="panel-heading">
                    <div>
                      <span className="eyebrow">POŁĄCZ WSZYSTKIE ETAPY</span>
                      <h2>Twoja droga zawodowa</h2>
                    </div>
                    <Link
                      className="text-link"
                      href={`/historia/${scenario.id}`}
                    >
                      Otwórz oś czasu{" "}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="preview-periods">
                    {scenario.periods.map((period) => (
                      <button
                        className="preview-period"
                        key={period.id}
                        onClick={() => setSelectedPeriod(period)}
                      >
                        <span
                          className={`period-icon period-icon-${period.status}`}
                        >
                          <WorkIcon period={period} />
                        </span>
                        <span className="preview-period-text">
                          <strong>{period.title}</strong>
                          <small>{formatDateRange(period)}</small>
                        </span>
                        <StatusBadge status={period.status} short />
                        <ChevronRight size={17} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                  <div className="unique-note">
                    <GitCompareArrows size={19} aria-hidden="true" />
                    <span>
                      {summary.repeatedDays > 0 ? (
                        <>
                          <strong>
                            {formatNumber(summary.repeatedDays)} powtórzeń dni
                            pominięto.
                          </strong>{" "}
                          Każdy dzień liczymy tylko raz.
                        </>
                      ) : (
                        <>
                          <strong>Każdy dzień liczymy tylko raz.</strong> Także
                          gdy umowy się nakładają.
                        </>
                      )}
                    </span>
                  </div>
                </section>
              </div>
            </>
          ) : (
            <Timeline scenario={scenario} onSelect={setSelectedPeriod} />
          )}
          <div className="workspace-footer">
            <span>
              <LockKeyhole size={13} aria-hidden="true" /> Bez danych osobowych.
              Bez integracji ZUS.
            </span>
            <span>Stan fikcyjnej historii: 31.10.2026</span>
          </div>
          <p className="sr-only" role="status">
            {downloaded
              ? "Pobrano demonstracyjne podsumowanie w formacie TXT."
              : ""}
          </p>
        </main>
      </div>
      {selectedPeriod && (
        <Modal
          wide
          title={selectedPeriod.title}
          description={`${selectedPeriod.organization} · ${formatDateRange(selectedPeriod)}`}
          onClose={() => setSelectedPeriod(null)}
        >
          <div className="period-detail-meta">
            <StatusBadge status={selectedPeriod.status} />
            <span>{workTypeLabels[selectedPeriod.type]}</span>
          </div>
          <p className="body-copy">{selectedPeriod.description}</p>
          <div className="detail-stats">
            <div>
              <span>Cały okres</span>
              <strong>
                {formatNumber(summary.contributions[selectedPeriod.id].days)}{" "}
                dni
              </strong>
            </div>
            <div>
              <span>Nowe dni w tej kategorii</span>
              <strong>
                {formatNumber(
                  summary.contributions[selectedPeriod.id].additionalDays,
                )}{" "}
                dni
              </strong>
            </div>
          </div>
          {summary.contributions[selectedPeriod.id].repeatedDays > 0 && (
            <div className="notice">
              <GitCompareArrows size={21} aria-hidden="true" />
              <p>
                <strong>
                  {formatNumber(
                    summary.contributions[selectedPeriod.id].repeatedDays,
                  )}{" "}
                  dni tego okresu uwzględniamy już w innych okresach.
                </strong>{" "}
                Nie dodajemy ich ponownie. W pierwszej kolejności pokazujemy
                etaty z przykładu, potem okresy potencjalne, a na końcu
                wymagające weryfikacji.
              </p>
            </div>
          )}
          <h3>Co wymaga sprawdzenia?</h3>
          <ul className="condition-list">
            {selectedPeriod.conditions.map((condition, index) => (
              <li key={condition}>
                <span>{index + 1}</span>
                {condition}
              </li>
            ))}
          </ul>
          <h3>
            <FileCheck2 size={19} aria-hidden="true" /> Dokumenty do
            przygotowania
          </h3>
          <p className="small muted">
            Dostępność jest Twoją deklaracją w przykładzie. Nie potwierdza
            treści dokumentów ani prawa do zaliczenia okresu.
          </p>
          <DocumentPreparation
            documents={selectedPeriod.documents.map((document) => ({
              document,
              period: selectedPeriod,
            }))}
            availability={caseState.documentAvailability}
            onAvailabilityChange={setDocumentAvailability}
          />
          {selectedPeriod.legalTodo && (
            <div className="todo-note">
              <CircleHelp size={20} aria-hidden="true" />
              <p>{selectedPeriod.legalTodo}</p>
            </div>
          )}
          <div className="detail-disclaimer">
            <ShieldCheck size={16} aria-hidden="true" /> Fikcyjny przykład.
            Sprawdź warunki i dokumenty z pracodawcą.
          </div>
        </Modal>
      )}
      {documentsOpen && (
        <Modal
          wide
          title="Spokojnie. Dokument po dokumencie."
          description="Lista pomocnicza dla wybranego, fikcyjnego scenariusza. Nie wgrywaj żadnych plików."
          onClose={() => setDocumentsOpen(false)}
        >
          <p className="small muted">
            Wybory pozostają w tej karcie przeglądarki także po przejściu do
            przygotowania sprawy. „Mam — do sprawdzenia” jest deklaracją; nie
            zmienia statusu okresu ani liczby dni.
          </p>
          <DocumentPreparation
            documents={documents}
            availability={caseState.documentAvailability}
            onAvailabilityChange={setDocumentAvailability}
          />
          <div className="notice">
            <BookOpen size={21} aria-hidden="true" />
            <p>
              To lista orientacyjna. Wystarczalność dowodów i spełnienie
              warunków wymagają indywidualnego sprawdzenia z pracodawcą.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Timeline({
  scenario,
  onSelect,
}: {
  scenario: Scenario;
  onSelect: (period: WorkPeriod) => void;
}) {
  const [filter, setFilter] = useState<PeriodStatus | "all">("all");
  const [view, setView] = useState<"timeline" | "list">("timeline");
  const [order, setOrder] = useState("oldest");
  const summary = summarizeHistory(scenario.periods);
  const periods = scenario.periods
    .filter((period) => filter === "all" || period.status === filter)
    .toSorted((a, b) =>
      order === "oldest"
        ? a.start.localeCompare(b.start)
        : b.start.localeCompare(a.start),
    );
  const firstYear = Math.min(
    ...scenario.periods.map((period) => Number(period.start.slice(0, 4))),
  );
  const lastYear = Math.max(
    ...scenario.periods.map((period) => Number(period.end.slice(0, 4))),
  );
  const start = parseDay(`${firstYear}-01-01`);
  const total = parseDay(`${lastYear + 1}-01-01`) - start;
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => firstYear + index,
  );
  return (
    <>
      <div className="timeline-summary">
        <span>
          <Route size={19} aria-hidden="true" />
          <strong>{scenario.periods.length} okresy w historii</strong>
        </span>
        <span>
          <Check size={16} aria-hidden="true" />{" "}
          {formatNumber(summary.days.included)} dni uwzględnionych w przykładzie
        </span>
        <span>
          <Plus size={16} aria-hidden="true" />{" "}
          {formatNumber(summary.days.potential)} dni potencjalnie do doliczenia
        </span>
      </div>
      <section className="panel timeline-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">TWOJA DROGA, KROK PO KROKU</span>
            <h2>Oś czasu historii zawodowej</h2>
          </div>
          <div
            className="view-toggle"
            role="group"
            aria-label="Sposób wyświetlania"
          >
            <button
              onClick={() => setView("timeline")}
              aria-pressed={view === "timeline"}
              aria-label="Widok osi czasu"
            >
              <History size={17} aria-hidden="true" />
            </button>
            <button
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              aria-label="Widok listy"
            >
              <List size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="timeline-controls">
          <div
            className="filter-buttons"
            role="group"
            aria-label="Filtruj okresy"
          >
            <button
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              Wszystkie <span>{scenario.periods.length}</span>
            </button>
            {(["included", "potential", "review"] as const).map((status) => (
              <button
                key={status}
                aria-pressed={filter === status}
                onClick={() => setFilter(status)}
              >
                <i className={`legend-dot legend-${status}`} />
                {statusMeta[status].short}
              </button>
            ))}
          </div>
          <label className="sort-control">
            <span className="sr-only">Kolejność okresów</span>
            <select
              value={order}
              onChange={(event) => setOrder(event.target.value)}
            >
              <option value="oldest">Od najstarszych</option>
              <option value="newest">Od najnowszych</option>
            </select>
          </label>
        </div>
        <p className="timeline-instruction">
          <span className="tiny-dot" />{" "}
          {view === "timeline"
            ? "Kliknij pasek okresu lub jego nazwę, aby poznać szczegóły. Na małym ekranie przesuń oś w bok."
            : "Wybierz okres z listy, aby poznać szczegóły."}
        </p>
        {view === "timeline" ? (
          <div
            className="timeline-scroll"
            role="region"
            aria-label="Interaktywna oś czasu, przewijana poziomo"
            tabIndex={0}
          >
            <div className="timeline-chart">
              <div className="chart-axis">
                <span>OKRES AKTYWNOŚCI</span>
                <div>
                  {years.map((year) => (
                    <span key={year}>{year}</span>
                  ))}
                </div>
              </div>
              {periods.map((period) => {
                const left = ((parseDay(period.start) - start) / total) * 100;
                const width =
                  ((parseDay(period.end) + 1 - parseDay(period.start)) /
                    total) *
                  100;
                return (
                  <div className="chart-row" key={period.id}>
                    <button
                      className="chart-row-label"
                      onClick={() => onSelect(period)}
                    >
                      <span
                        className={`period-icon period-icon-${period.status}`}
                      >
                        <WorkIcon period={period} size={17} />
                      </span>
                      <span>
                        <strong>{period.title}</strong>
                        <small>{period.organization}</small>
                      </span>
                    </button>
                    <div className="chart-track">
                      <div className="chart-grid" aria-hidden="true">
                        {years.map((year) => (
                          <i key={year} />
                        ))}
                      </div>
                      <button
                        className={`chart-bar chart-bar-${period.status}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        onClick={() => onSelect(period)}
                        aria-label={`${period.title}, ${formatDateRange(period)}, ${statusMeta[period.status].label}. Pokaż szczegóły.`}
                      >
                        <span>
                          {period.type === "business"
                            ? "JDG"
                            : period.type === "employment"
                              ? "Etat"
                              : "Zlecenie"}
                        </span>
                        <span className="bar-end-dot" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="timeline-list">
            {periods.map((period) => (
              <button
                className="timeline-list-row"
                key={period.id}
                aria-label={`${period.title}, ${period.organization}, ${formatDateRange(period)}, ${statusMeta[period.status].label}. Pokaż szczegóły.`}
                onClick={() => onSelect(period)}
              >
                <span className={`period-icon period-icon-${period.status}`}>
                  <WorkIcon period={period} />
                </span>
                <span className="timeline-list-text">
                  <strong>{period.title}</strong>
                  <small>
                    {period.organization} · {formatDateRange(period)}
                  </small>
                </span>
                <StatusBadge status={period.status} short />
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
        <div className="timeline-legend">
          {(["included", "potential", "review"] as const).map((status) => (
            <span key={status}>
              <i className={`legend-dot legend-${status}`} />
              {statusMeta[status].label}
            </span>
          ))}
        </div>
        <p className="sr-only" role="status">
          Wyświetlono {periods.length} z {scenario.periods.length} okresów.
        </p>
      </section>
      <div className="timeline-bottom">
        <section className="overlap-explainer">
          <span className="overlap-icon">
            <GitCompareArrows size={25} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <span className="eyebrow">JEDEN DZIEŃ. JEDNO ZLICZENIE.</span>
            <h2>
              {summary.repeatedDays
                ? `${formatNumber(summary.repeatedDays)} powtórzeń dni pominięto.`
                : "Umowy mogą się nakładać. Dni — nie."}
            </h2>
            <p>
              {summary.repeatedDays
                ? "Oś pokazuje pełne okresy każdej umowy. W podsumowaniu usuwamy powtórzenia: najpierw etaty z przykładu, następnie okresy potencjalne, na końcu te do weryfikacji."
                : "W tym przykładzie okresy się nie nakładają. Gdyby trwały równolegle, do podsumowania trafiłby każdy dzień tylko raz."}
            </p>
          </div>
        </section>
        <Link className="timeline-return-card" href={`/pulpit/${scenario.id}`}>
          <LayoutDashboard size={23} strokeWidth={1.5} aria-hidden="true" />
          <span>
            Wróć do pełnego obrazu<strong>Zobacz podsumowanie</strong>
          </span>
          <ArrowRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
