"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Clock3,
  FileCheck2,
  GitCompareArrows,
  Play,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { createCasePlan } from "@/lib/case-plan";
import { formatNumber, periodDays } from "@/lib/history";
import type { Scenario } from "@/lib/types";
import { CoverageBreakdown } from "./coverage-breakdown";

const chapters = ["Zauważ", "Zrozum", "Przygotuj"];
export function ContestDemo({ scenario }: { scenario: Scenario }) {
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const candidate = scenario.periods.find(
    (period) => period.status === "potential",
  );
  const baseline = scenario.periods.filter(
    (period) => period.status === "included",
  );
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);
  if (!candidate) return null;
  const plan = createCasePlan(scenario, [candidate.id]);
  const days = periodDays(candidate);
  return (
    <div className="contest-demo">
      <div className="demo-topline">
        <span className="demo-person">
          <span className="small-avatar accent-mint">{scenario.initials}</span>{" "}
          Historia {scenario.name === "Ola" ? "Oli" : scenario.name} · fikcyjny
          przykład
        </span>
        <span>
          <Clock3 size={14} aria-hidden="true" /> 3 kroki · około 90 sekund
        </span>
      </div>
      <div
        className="demo-chapters"
        role="group"
        aria-label="Rozdziały demonstracji"
      >
        {chapters.map((chapter, index) => (
          <button
            key={chapter}
            aria-label={`Rozdział ${index + 1}: ${chapter}`}
            aria-current={step === index ? "step" : undefined}
            onClick={() => setStep(index)}
          >
            <span>
              {step > index ? (
                <Check size={13} aria-hidden="true" />
              ) : (
                `0${index + 1}`
              )}
            </span>
            {chapter}
          </button>
        ))}
      </div>
      <div className="demo-scene" key={step}>
        <div className="demo-story">
          <span className="eyebrow">
            {
              [
                "01 / PRACA, KTÓREJ ŁATWO NIE ZAUWAŻYĆ",
                "02 / ZROZUM, SKĄD BIERZE SIĘ WYNIK",
                "03 / OD WYNIKU DO NASTĘPNEGO KROKU",
              ][step]
            }
          </span>
          <h1 ref={headingRef} tabIndex={-1}>
            {
              [
                <>
                  Ta praca była.
                  <br />
                  <em>Warto do niej wrócić.</em>
                </>,
                <>
                  Dwie umowy.
                  <br />
                  <em>Każdy dzień tylko raz.</em>
                </>,
                <>
                  Wiesz już więcej.
                  <br />
                  <em>Przygotuj podsumowanie.</em>
                </>,
              ][step]
            }
          </h1>
          <p>
            {
              [
                "Ola pracowała na etacie i na zleceniu. Część zlecenia trwała już po zakończeniu etatu. Samo spojrzenie na etaty nie pokazuje całej historii.",
                `Zlecenie trwało ${formatNumber(days)} dni, ale większość pokrywa się z etatem. Po usunięciu powtórzeń pozostaje ${formatNumber(plan.additionalDays)} dni poza podstawą — do sprawdzenia, po potwierdzeniu warunków i dokumentów.`,
                "Wybierz okres i sprawdź dostępność dokumentów. Otrzymasz podsumowanie dla kadr z jawną listą braków, gotowe do wydruku lub skopiowania.",
              ][step]
            }
          </p>
          <div className="demo-takeaway">
            <span>
              {step === 0 ? (
                <Play size={17} aria-hidden="true" />
              ) : step === 1 ? (
                <GitCompareArrows size={18} aria-hidden="true" />
              ) : (
                <FileCheck2 size={18} aria-hidden="true" />
              )}
            </span>
            <strong>
              {
                [
                  "Jedna konkretna sprawa, od początku do końca.",
                  "Możesz sprawdzić każdy fragment wyniku.",
                  "Ty wybierasz zakres. Ty widzisz podgląd.",
                ][step]
              }
            </strong>
          </div>
        </div>
        <div className={`demo-visual demo-visual-${step}`}>
          {step === 0 && (
            <div className="demo-baseline-card">
              <span className="eyebrow">PODSTAWA FIKCYJNEJ HISTORII</span>
              <strong>
                {formatNumber(plan.baselineDays)}
                <small>dni z etatów</small>
              </strong>
              <div className="demo-mini-lanes">
                <span>
                  Etat <i />
                </span>
                <span>
                  Zlecenie <i />
                  <b>?</b>
                </span>
              </div>
              <div className="demo-discovery">
                <span>Jeszcze jeden rozdział</span>
                <h2>A co z wcześniejszym zleceniem?</h2>
                <p>Sprawdź, co wydarzyło się poza etatem.</p>
                <ArrowRight size={23} aria-hidden="true" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="demo-breakdown-card">
              <div className="demo-result-top">
                <span className="eyebrow">ZLECENIE RÓWNOLEGLE DO ETATU</span>
                <GitCompareArrows size={22} aria-hidden="true" />
              </div>
              <h2>
                +{formatNumber(plan.additionalDays)}{" "}
                <span>dni do sprawdzenia</span>
              </h2>
              <p>
                {formatNumber(days)} dni umowy −{" "}
                {formatNumber(days - plan.additionalDays)} dni w podstawie
              </p>
              <CoverageBreakdown period={candidate} coveredBy={baseline} />
              <div className="demo-exact-note">
                <CheckCheck size={18} aria-hidden="true" /> Dokładne daty. Bez
                podwójnego liczenia.
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="demo-action-card">
              <span className="demo-action-icon">
                <FileCheck2 size={31} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="eyebrow">PLAN DO ROZMOWY Z PRACODAWCĄ</span>
              <h2>
                Nie zostajesz
                <br />z samą liczbą.
              </h2>
              <ol>
                {[
                  "Wybierz okres do sprawdzenia",
                  "Zobacz warunki i dokumenty",
                  "Przejrzyj wybrany zakres",
                  "Przygotuj wiadomość i kartę",
                ].map((label, index) => (
                  <li key={label}>
                    <span>{index + 1}</span>
                    {label}
                  </li>
                ))}
              </ol>
              <div className="demo-action-safety">
                <ShieldCheck size={16} aria-hidden="true" /> Symulacja — nic nie
                zostaje wysłane
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="demo-navigation">
        <div>
          <button
            className="icon-button"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            aria-label="Poprzedni rozdział"
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <span>{step + 1} z 3</span>
          {step > 0 && (
            <button className="text-link demo-reset" onClick={() => setStep(0)}>
              <RotateCcw size={14} aria-hidden="true" /> Od początku
            </button>
          )}
        </div>
        {step < 2 ? (
          <button
            className="button button-primary"
            onClick={() => setStep(step + 1)}
          >
            {step === 0 ? "Pokaż pominięty okres" : "Zobacz następny krok"}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        ) : (
          <Link
            className="button button-primary"
            href={`/sprawa/${scenario.id}`}
          >
            Przygotuj podsumowanie dla kadr <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="demo-permanent-note">
        <ShieldCheck size={16} aria-hidden="true" />
        <p>
          Niezależny prototyp. Fikcyjne dane i warunkowe wyniki. Bez integracji
          ZUS i bez potwierdzania uprawnień.
        </p>
      </div>
    </div>
  );
}
