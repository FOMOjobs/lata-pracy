"use client";

import { useState } from "react";
import { ArrowUpRight, BookOpen, Info, ShieldCheck } from "lucide-react";
import { legalSources } from "@/lib/legal";
import { Modal } from "./modal";

export function LegalInfo({
  label = "O prototypie",
  className = "text-link",
}: {
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>
        <Info size={16} aria-hidden="true" />
        {label}
      </button>
      {open && (
        <Modal
          title="Jasne zasady. Bez obietnic."
          description="Niezależny prototyp konkursowy. Wszystkie osoby, firmy i historie są fikcyjne."
          onClose={() => setOpen(false)}
        >
          <div className="notice">
            <ShieldCheck size={22} aria-hidden="true" />
            <p>
              To nie jest oficjalna usługa państwowa ani porada prawna. Wynik
              demonstracji nie potwierdza uprawnień. Nie łączymy się z ZUS i nie
              pobieramy danych osobowych.
            </p>
          </div>
          <h3>Co zmieniło się w 2026 r.?</h3>
          <p className="body-copy">
            Przepisy rozszerzają katalog okresów możliwych do zaliczenia m.in. o
            zlecenia i działalność gospodarczą, po spełnieniu odpowiednich
            warunków. Zmiany stosuje się od 1 stycznia 2026 r. w sektorze
            finansów publicznych, a od 1 maja u pozostałych pracodawców.
          </p>
          <p className="body-copy">
            W aplikacji statusy są założeniami fikcyjnych scenariuszy. Każdy
            dzień liczymy raz. Wyświetlane lata i miesiące są przybliżeniem (365
            dni / rok, 30 dni / miesiąc); dokładne wartości podajemy w dniach.
            Okresy do weryfikacji nie zwiększają potencjalnego wyniku.
          </p>
          <h3>
            <BookOpen size={18} aria-hidden="true" /> Oficjalne źródła
          </h3>
          <div className="source-list">
            {legalSources.map((source) => (
              <a
                href={source.url}
                key={source.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {source.title}
                  <small>{source.publisher}</small>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
                <span className="sr-only"> (otwiera nową kartę)</span>
              </a>
            ))}
          </div>
          <p className="small muted">
            Źródła sprawdzono 11 listopada 2026 r. Przypadki wymagające
            interpretacji oznaczamy jako TODO. Zaliczenie konkretnego okresu
            wymaga oceny dokumentów i warunków przez pracodawcę.
          </p>
        </Modal>
      )}
    </>
  );
}
