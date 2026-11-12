import {
  formatDateRange,
  formatNumber,
  periodDays,
  splitPeriodByCoverage,
  splitPeriodByStatusCoverage,
} from "@/lib/history";
import type { WorkPeriod } from "@/lib/types";

export function CoverageBreakdown({
  period,
  coveredBy,
  coveredLabel = "Już w podstawie przykładu",
  additionalLabel = "Poza podstawą — do sprawdzenia",
}: {
  period: WorkPeriod;
  coveredBy: WorkPeriod[];
  coveredLabel?: string;
  additionalLabel?: string;
}) {
  const segments = splitPeriodByCoverage(period, coveredBy);
  const total = periodDays(period);
  return (
    <div className="coverage-breakdown">
      <div
        className="coverage-track"
        role="img"
        aria-label={segments
          .map(
            (segment) =>
              `${formatDateRange(segment)}: ${segment.days} dni, ${segment.kind === "covered" ? coveredLabel : additionalLabel}`,
          )
          .join("; ")}
      >
        {segments.map((segment) => (
          <span
            key={segment.start}
            className={`coverage-segment coverage-${segment.kind}`}
            style={{ flex: segment.days / total }}
          >
            <span>{formatNumber(segment.days)}</span>
          </span>
        ))}
      </div>
      <ol className="coverage-segments">
        {segments.map((segment) => (
          <li key={segment.start}>
            <i
              className={`coverage-dot coverage-${segment.kind}`}
              aria-hidden="true"
            />
            <span>
              <strong>
                {segment.kind === "covered" ? coveredLabel : additionalLabel}
              </strong>
              <small>{formatDateRange(segment)}</small>
            </span>
            <b>{formatNumber(segment.days)} dni</b>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ReviewCoverageBreakdown({
  period,
  periods,
}: {
  period: WorkPeriod;
  periods: WorkPeriod[];
}) {
  const segments = splitPeriodByStatusCoverage(
    period,
    periods.filter((item) => item.id !== period.id),
  );
  const total = (kind: (typeof segments)[number]["kind"]) =>
    segments
      .filter((segment) => segment.kind === kind)
      .reduce((sum, segment) => sum + segment.days, 0);
  const labels = {
    included: "Pokryte etatem z podstawy przykładu",
    potential: "Pokryte wyłącznie okresem potencjalnym",
    uncovered: "Poza etatami i okresami potencjalnymi",
  };
  return (
    <section
      className="coverage-review-breakdown"
      aria-label="Źródła pokrycia dat"
    >
      <h3>Co pokrywa te daty?</h3>
      {total("included") > 0 && (
        <p>
          {formatNumber(total("included"))} dni pokrywają się z etatem przyjętym
          w przykładzie.
        </p>
      )}
      {total("potential") > 0 && (
        <p>
          <strong>
            {formatNumber(total("potential"))} dni pokrywają się wyłącznie z
            okresem potencjalnym.
          </strong>{" "}
          Jeśli nie zostanie zaliczony, znaczenie tej współpracy trzeba ocenić
          osobno.
        </p>
      )}
      {total("uncovered") > 0 && (
        <p>
          {formatNumber(total("uncovered"))} dni jest poza etatami i okresami
          potencjalnymi. Nadal wymagają wyjaśnienia — nie doliczamy ich do
          wyniku warunkowego.
        </p>
      )}
      <ol className="coverage-segments">
        {segments.map((segment) => (
          <li key={segment.start}>
            <i
              className={`coverage-dot coverage-${segment.kind === "included" ? "covered" : segment.kind === "potential" ? "conditional" : "additional"}`}
              aria-hidden="true"
            />
            <span>
              <strong>{labels[segment.kind]}</strong>
              <small>{formatDateRange(segment)}</small>
            </span>
            <b>{formatNumber(segment.days)} dni</b>
          </li>
        ))}
      </ol>
      <p className="small muted">
        Pokrycie dat nie potwierdza warunków zaliczenia ani przydatności
        dokumentów.
      </p>
    </section>
  );
}
