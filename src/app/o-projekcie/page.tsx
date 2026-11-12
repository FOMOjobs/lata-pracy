import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck2,
  GitCompareArrows,
  History,
  LockKeyhole,
  MousePointer2,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PublicFooter, PublicHeader } from "@/components/public-layout";
import { CareerIllustration } from "@/components/career-illustration";
import { LegalInfo } from "@/components/legal-info";

export const metadata: Metadata = { title: "O projekcie" };

export default function AboutProject() {
  return (
    <>
      <PublicHeader active="about" />
      <main id="main">
        <section className="hero container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="tiny-dot" /> NOWE SPOJRZENIE NA STAŻ PRACY{" "}
              <span className="year-tag">2026</span>
            </div>
            <h1>
              Twoja praca
              <br />
              <span>się liczy.</span>
              <span className="hero-title-dot" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p className="hero-description">
              Zlecenia, własna firma, lata na etacie.
              <br className="desktop-break" /> Twoja historia to więcej, niż
              myślisz. Zobacz, które okresy warto sprawdzić i co może powiększyć
              Twój staż pracy.
            </p>
            <Link
              className="button button-primary hero-cta"
              href="/scenariusze"
            >
              Sprawdź swoją historię pracy{" "}
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
            <Link href="/demo" className="hero-demo-link">
              <span>
                <Play size={14} aria-hidden="true" />
              </span>{" "}
              Zobacz różnicę w 90 sekund{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <div className="hero-reassurance">
              <span>
                <Check size={15} aria-hidden="true" /> Bez logowania
              </span>
              <span>
                <Check size={15} aria-hidden="true" /> Na fikcyjnych przykładach
              </span>
            </div>
            <a className="discover-link" href="#jak-to-dziala">
              <span>
                <ArrowDown size={15} aria-hidden="true" />
              </span>{" "}
              Najpierw zobacz, jak to działa
            </a>
          </div>
          <CareerIllustration />
        </section>
        <div className="trust-strip">
          <div className="container trust-inner">
            <span>
              <ShieldCheck size={20} aria-hidden="true" />
              <strong>Twoja prywatność jest ważna</strong>
            </span>
            <span>
              <LockKeyhole size={16} aria-hidden="true" /> Bez prawdziwych
              danych
            </span>
            <span>
              <GitCompareArrows size={17} aria-hidden="true" /> Bez połączenia z
              ZUS
            </span>
            <span>
              <FileCheck2 size={17} aria-hidden="true" /> Wyniki do weryfikacji
            </span>
          </div>
        </div>
        <section className="how-section container" id="jak-to-dziala">
          <div className="section-intro">
            <div>
              <span className="eyebrow">
                MNIEJ NIEPEWNOŚCI. WIĘCEJ JASNOŚCI.
              </span>
              <h2>
                Twoja historia.
                <br />
                Krok po kroku.
              </h2>
            </div>
            <p>
              Nie musisz znać wszystkich przepisów.
              <br />
              Zacznij od uporządkowania tego, co już wiesz.
            </p>
          </div>
          <div className="steps-grid">
            {[
              {
                n: "01",
                icon: MousePointer2,
                title: "Wybierz historię",
                text: "Poznaj jeden z trzech fikcyjnych scenariuszy. Znajdź sytuację podobną do swojej.",
              },
              {
                n: "02",
                icon: History,
                title: "Zobacz pełny obraz",
                text: "Przejdź przez okresy pracy na osi czasu. Nakładające się dni liczymy tylko raz.",
              },
              {
                n: "03",
                icon: FileCheck2,
                title: "Sprawdź, co przygotować",
                text: "Zobacz warunki i listę dokumentów, które warto omówić z pracodawcą.",
              },
            ].map(({ n, icon: Icon, title, text }) => (
              <article className="step-card" key={n}>
                <div className="step-card-top">
                  <span className="step-icon">
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="step-number">{n}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="context-section container">
          <div className="context-icon">
            <Sparkles size={28} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div>
            <span className="eyebrow">ZMIANY W PRZEPISACH W 2026 R.</span>
            <h2>Warto wrócić do wcześniejszych lat.</h2>
            <p>
              Niektóre okresy zlecenia i działalności gospodarczej mogą zostać
              zaliczone do stażu po spełnieniu ustawowych warunków. Pomożemy Ci
              zobaczyć, co wymaga sprawdzenia.
            </p>
          </div>
          <LegalInfo
            label="Poznaj zasady i źródła"
            className="button button-outline"
          />
        </section>
        <section className="bottom-cta container">
          <div>
            <span className="eyebrow">ZACZNIJ OD JEDNEJ HISTORII</span>
            <h2>Każdy etap ma znaczenie.</h2>
            <p>
              Sprawdź prototyp. Bez konta, bez dokumentów, we własnym tempie.
            </p>
          </div>
          <Link href="/scenariusze" className="button button-primary">
            Poznaj scenariusze <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
