import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Brand } from "./brand";
import { LegalInfo } from "./legal-info";

export function PublicHeader({ active }: { active?: "scenarios" | "demo" }) {
  return (
    <header className="public-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Nawigacja główna">
          <Link
            href="/demo"
            aria-current={active === "demo" ? "page" : undefined}
          >
            Demo w 90 sekund
          </Link>
          <Link
            href="/scenariusze"
            aria-current={active === "scenarios" ? "page" : undefined}
          >
            Scenariusze
          </Link>
        </nav>
        <span className="demo-pill">
          <span /> Prototyp demonstracyjny
        </span>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>Twoja praca się liczy.</p>
          </div>
          <div className="footer-links">
            <LegalInfo />
            <a
              href="https://github.com/FOMOjobs/lata-pracy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Projekt na GitHub <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only"> (otwiera nową kartę)</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            Niezależny prototyp. Wyniki nie stanowią potwierdzenia prawnego.
          </span>
          <span>
            <LockKeyhole size={14} aria-hidden="true" /> Fikcyjne dane. Bez
            połączenia z ZUS.
          </span>
        </div>
      </div>
    </footer>
  );
}
