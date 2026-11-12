"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, ChevronRight, CircleHelp,
  FileCheck2, Fingerprint, History, LayoutDashboard, LockKeyhole, Play,
  Route, ShieldCheck,
} from "lucide-react";
import { scenarios } from "@/data/scenarios";
import { createCasePlan } from "@/lib/case-plan";
import { useCaseSession } from "@/lib/case-session";
import { useDemoProfile } from "@/lib/demo-profile";
import { formatNumber, parseDay } from "@/lib/history";
import type { Scenario } from "@/lib/types";
import { Brand } from "./brand";
import { LegalInfo } from "./legal-info";

const greetings = { kasia: "Kasiu", marek: "Marku", ola: "Olu" };
const storyNames = { kasia: "Kasi", marek: "Marka", ola: "Oli" };

function HistoryPreview({ scenario }: { scenario: Scenario }) {
  const first = Math.min(...scenario.periods.map((period) => parseDay(period.start)));
  const last = Math.max(...scenario.periods.map((period) => parseDay(period.end)));
  const span = last - first + 1;
  return (
    <div className="citizen-history-preview" aria-hidden="true">
      <div className="citizen-visual-heading">
        <span><History size={15} /> Historia {storyNames[scenario.id]}</span>
        <span className="citizen-visual-dots"><i /><i /><i /></span>
      </div>
      <div className="citizen-history-years">
        <span>{new Date(first * 86_400_000).getUTCFullYear()}</span><span>2026</span>
      </div>
      <div className="citizen-history-lanes">
        {scenario.periods.map((period) => (
          <div className="citizen-history-lane" key={period.id}>
            <span>{period.type === "employment" ? "Etat" : period.type === "business" ? "Działalność" : "Zlecenie"}</span>
            <div><i
              className={`citizen-history-bar citizen-history-bar-${period.status}`}
              style={{
                left: `${((parseDay(period.start) - first) / span) * 100}%`,
                width: `${((parseDay(period.end) - parseDay(period.start) + 1) / span) * 100}%`,
              }}
            /></div>
          </div>
        ))}
      </div>
      <div className="citizen-visual-footnote"><ShieldCheck size={15} /> Każdy dzień tylko raz.</div>
    </div>
  );
}

export function CitizenHome() {
  const { scenarioId, selectScenario } = useDemoProfile();
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[2];
  const { state } = useCaseSession(scenario);
  const plan = createCasePlan(scenario, state.selectedPeriodIds);
  const documents = plan.documents.filter((document) => state.selectedDocumentIds.includes(document.id));
  const missing = documents.filter((document) => state.documentAvailability[document.id] === "missing");
  const unknown = documents.filter((document) => !state.documentAvailability[document.id] || state.documentAvailability[document.id] === "unknown");
  const historyHref = `/pulpit/${scenario.id}`;
  const summaryHref = `/sprawa/${scenario.id}`;
  const next = plan.periods.length === 0
    ? {
        label: "Wybierz okres do porównania",
        description: "Nie ma teraz wybranego wcześniejszego okresu. W historii wybierzesz, co warto sprawdzić.",
        action: "Wróć do historii", href: historyHref,
      }
    : documents.length === 0
      ? {
          label: "Ustal zakres podsumowania",
          description: "Okres jest wybrany, ale lista nazw dokumentów jest pusta. Wróć do niej przed rozmową z kadrami.",
          action: "Kontynuuj przygotowanie", href: summaryHref,
        }
      : missing.length > 0
        ? {
            label: "Uzupełnij brak dokumentu",
            description: `Brakuje: ${missing[0].title}. Przy dokumencie znajdziesz instrukcję następnego działania.`,
            action: "Kontynuuj przygotowanie", href: summaryHref,
          }
        : unknown.length > 0
          ? {
              label: "Ustal dostępność dokumentów",
              description: "Zaznacz, czy masz dokumenty do wybranego okresu. Brak zamienimy w konkretny następny krok.",
              action: "Kontynuuj przygotowanie", href: summaryHref,
            }
          : {
              label: "Przejrzyj podsumowanie dla kadr",
              description: "Zadeklarowano posiadanie wybranych dokumentów. Ich treść i warunki zaliczenia nadal wymagają sprawdzenia.",
              action: "Kontynuuj przygotowanie", href: summaryHref,
            };
  const navigation = [
    { href: "/", label: "Pulpit", icon: LayoutDashboard, current: true },
    { href: historyHref, label: "Historia pracy", icon: History, current: false },
    { href: summaryHref, label: "Podsumowanie", icon: FileCheck2, current: false },
  ];

  return (
    <div className="citizen-app">
      <aside className="citizen-sidebar">
        <div className="citizen-sidebar-brand"><Brand /><span>Twoja przestrzeń</span></div>
        <span className="citizen-nav-eyebrow">NA CO DZIEŃ</span>
        <nav className="citizen-side-nav" aria-label="Pulpit obywatela">
          {navigation.map(({ href, label, icon: Icon, current }) => (
            <Link href={href} key={label} aria-current={current ? "page" : undefined}>
              <Icon size={20} aria-hidden="true" /><span>{label}</span>{current && <i aria-hidden="true" />}
            </Link>
          ))}
        </nav>
        <div className="citizen-sidebar-bottom">
          <Link href="/o-projekcie"><CircleHelp size={18} aria-hidden="true" /> O projekcie <ArrowUpRight size={14} aria-hidden="true" /></Link>
          <div className="citizen-independent"><ShieldCheck size={18} aria-hidden="true" /><span>Niezależny prototyp.<br />Fikcyjne historie, prawdziwy problem.</span></div>
        </div>
      </aside>
      <div className="citizen-body">
        <header className="citizen-topbar">
          <div className="citizen-mobile-brand"><Brand /></div>
          <div className="citizen-topbar-title"><span className="citizen-live-dot" aria-hidden="true" />Pulpit obywatela</div>
          <span className="citizen-demo-label"><span aria-hidden="true" />Fikcyjne dane</span>
        </header>
        <main id="main" className="citizen-main">
          <section className="citizen-welcome" aria-labelledby="citizen-welcome-title">
            <div>
              <p className="citizen-greeting" role="status">Dzień dobry, {greetings[scenario.id]} <span aria-hidden="true">✳</span></p>
              <h1 id="citizen-welcome-title">Ważne sprawy.<br /><span>Jasny następny krok.</span></h1>
            </div>
            <Link href="/demo" className="citizen-demo-link" aria-label="Zobacz pomysł w 90 sekund"><span><Play size={15} aria-hidden="true" /></span><span>Zobacz pomysł<br /><strong>w 90 sekund</strong></span><ArrowUpRight size={17} aria-hidden="true" /></Link>
          </section>
          <div className="citizen-profile-bar">
            <div className="citizen-profile-label"><span className="citizen-overline">POZNAJ PROTOTYP</span><span>Wybierz fikcyjną historię</span></div>
            <div className="citizen-profile-choices" role="group" aria-label="Wybierz fikcyjną historię">
              {scenarios.map((person) => (
                <button type="button" key={person.id} aria-pressed={scenario.id === person.id} aria-label={`Historia: ${person.name}`} onClick={() => selectScenario(person.id)}>
                  <span className={`citizen-avatar citizen-avatar-${person.accent}`} aria-hidden="true">{person.initials}</span><span>{person.name}</span>
                </button>
              ))}
            </div>
          </div>
          <section className="citizen-service" aria-labelledby="citizen-service-title">
            <div className="citizen-service-content">
              <span className="citizen-service-category"><BriefcaseBusiness size={17} aria-hidden="true" /> PRACA I UPRAWNIENIA</span>
              <h2 id="citizen-service-title">Twoja praca<br /><em>się liczy.</em></h2>
              <p>Zlecenia, własna firma, lata na etacie. Zobacz, do których okresów warto wrócić.</p>
              <Link href={historyHref} className="citizen-primary-action">Sprawdź swoją historię pracy <ArrowRight size={19} aria-hidden="true" /></Link>
              <span className="citizen-service-note"><LockKeyhole size={14} aria-hidden="true" /> Bez logowania. Na fikcyjnym przykładzie.</span>
            </div>
            <div className="citizen-service-visual">
              <HistoryPreview scenario={scenario} />
              <div className="citizen-result-peek">
                <span className="citizen-result-icon"><Route size={21} aria-hidden="true" /></span>
                <div><span>W wybranym porównaniu</span><strong>+{formatNumber(plan.additionalDays)} <small>dni poza etatami</small></strong></div>
                <span className="citizen-result-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
              </div>
              <p className="citizen-result-caption">Wartość warunkowa — zaliczenie wymaga sprawdzenia.</p>
            </div>
          </section>
          <div className="citizen-journey" aria-label="Od historii do podsumowania">
            <span><i>01</i> Zrozum historię</span><ChevronRight size={14} aria-hidden="true" /><span><i>02</i> Sprawdź dokumenty</span><ChevronRight size={14} aria-hidden="true" /><span><i>03</i> Przygotuj podsumowanie</span>
          </div>
          <div className="citizen-support-grid">
            <section className="citizen-next-step" aria-labelledby="citizen-next-title">
              <div className="citizen-section-top"><span className="citizen-overline">TWÓJ NASTĘPNY KROK</span><span className="citizen-small-badge">Historia {storyNames[scenario.id]}</span></div>
              <h2 id="citizen-next-title">{next.label}</h2><p>{next.description}</p>
              <Link href={next.href} className="citizen-text-action">{next.action}<ArrowRight size={17} aria-hidden="true" /></Link>
            </section>
            <section className="citizen-data-card" aria-labelledby="citizen-data-title">
              <span className="citizen-data-icon"><Fingerprint size={25} strokeWidth={1.6} aria-hidden="true" /></span>
              <div><h2 id="citizen-data-title">Dane pod Twoją kontrolą.</h2><p>W tej karcie zachowujemy wybór historii i dokumentów oraz Twoje deklaracje. Nie przesyłasz plików ani prawdziwych danych.</p><LegalInfo label="Poznaj zasady i źródła" className="citizen-text-action" /></div>
            </section>
          </div>
          <footer className="citizen-footer"><span>Autorska koncepcja aplikacji obywatelskiej. <strong>To nie jest usługa państwowa.</strong></span><Link href="/o-projekcie">O prototypie <ArrowUpRight size={14} aria-hidden="true" /></Link></footer>
        </main>
      </div>
      <nav className="citizen-bottom-nav" aria-label="Nawigacja mobilna">
        {navigation.map(({ href, label, icon: Icon, current }) => (
          <Link href={href} key={label} aria-current={current ? "page" : undefined}><Icon size={21} aria-hidden="true" /><span>{label}</span></Link>
        ))}
      </nav>
    </div>
  );
}
