import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  GitCompareArrows,
  ShieldCheck,
} from "lucide-react";
import { scenarios } from "@/data/scenarios";
import { PublicHeader, PublicFooter } from "@/components/public-layout";

export const metadata: Metadata = { title: "Wybierz historię" };

export default function ScenariosPage() {
  return (
    <>
      <PublicHeader active="scenarios" />
      <main id="main" className="scenario-page container">
        <Link className="back-link" href="/">
          <ArrowLeft size={16} aria-hidden="true" /> Strona główna
        </Link>
        <div className="scenario-heading">
          <span className="eyebrow">KROK 01 / POZNAJ MOŻLIWOŚCI</span>
          <h1>
            Różne drogi.
            <br />
            <span>Każda się liczy.</span>
          </h1>
          <p>
            Wybierz fikcyjną historię i zobacz, jak działa Lata Pracy.
            <br />
            Nie musisz podawać żadnych swoich danych.
          </p>
        </div>
        <div className="scenario-grid">
          {scenarios.map((scenario, index) => {
            const Icon = [BriefcaseBusiness, Building2, GitCompareArrows][
              index
            ];
            return (
              <Link
                href={`/pulpit/${scenario.id}`}
                className={`scenario-card accent-${scenario.accent}`}
                key={scenario.id}
              >
                <div className="scenario-card-top">
                  <span className="scenario-avatar">
                    {scenario.initials}
                    <span>
                      <Icon size={18} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="scenario-number">0{index + 1}</span>
                </div>
                <span className="scenario-category">{scenario.role}</span>
                <h2>
                  Historia{" "}
                  {scenario.name === "Kasia"
                    ? "Kasi"
                    : scenario.name === "Marek"
                      ? "Marka"
                      : "Oli"}
                </h2>
                <h3>{scenario.headline}</h3>
                <p>{scenario.description}</p>
                <div className="scenario-mini-timeline" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="scenario-card-bottom">
                  <span>
                    Zobacz historię{" "}
                    {scenario.name === "Kasia"
                      ? "Kasi"
                      : scenario.name === "Marek"
                        ? "Marka"
                        : "Oli"}
                  </span>
                  <ArrowRight size={19} aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="scenario-assurance">
          <ShieldCheck size={22} aria-hidden="true" />
          <div>
            <strong>To bezpieczna przestrzeń do poznania prototypu.</strong>
            <p>
              Wszystkie osoby, firmy i okresy są fikcyjne. Oznaczenia nie
              potwierdzają prawa do zaliczenia stażu.
            </p>
          </div>
          <span>
            <Check size={15} aria-hidden="true" /> Bez logowania
          </span>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
