import {
  formatDateRange,
  formatNumber,
  periodDays,
  splitPeriodByCoverage,
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
