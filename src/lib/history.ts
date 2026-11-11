import type { PeriodStatus, WorkPeriod } from "./types";

const DAY_MS = 86_400_000;
type Range = { start: number; end: number };

/** UTC day numbers; end is exclusive internally, inclusive in the demo data. */
export function parseDay(value: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
    throw new Error(`Nieprawidłowa data: ${value}`);
  const date = new Date(`${value}T00:00:00.000Z`);
  if (
    !Number.isFinite(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    throw new Error(`Nieprawidłowa data: ${value}`);
  }
  return date.getTime() / DAY_MS;
}

function toRange(period: Pick<WorkPeriod, "start" | "end">): Range {
  const start = parseDay(period.start);
  const end = parseDay(period.end) + 1;
  if (end <= start)
    throw new Error("Koniec okresu nie może poprzedzać początku.");
  return { start, end };
}

export function periodDays(period: Pick<WorkPeriod, "start" | "end">): number {
  const range = toRange(period);
  return range.end - range.start;
}

function union(ranges: Range[]): Range[] {
  const sorted = ranges
    .map((range) => ({ ...range }))
    .sort((a, b) => a.start - b.start || a.end - b.end);
  const merged: Range[] = [];
  for (const range of sorted) {
    const last = merged.at(-1);
    if (last && range.start <= last.end)
      last.end = Math.max(last.end, range.end);
    else merged.push(range);
  }
  return merged;
}

function measure(ranges: Range[]): number {
  return union(ranges).reduce((sum, range) => sum + range.end - range.start, 0);
}

export interface PeriodContribution {
  days: number;
  additionalDays: number;
  repeatedDays: number;
}

/** Statuses are authored demo assumptions, never an automatic legal decision. */
export function summarizeHistory(periods: WorkPeriod[]) {
  const ids = new Set(periods.map((period) => period.id));
  if (ids.size !== periods.length)
    throw new Error("Identyfikatory okresów muszą być unikalne.");
  const days: Record<PeriodStatus, number> = {
    included: 0,
    potential: 0,
    review: 0,
  };
  const contributions: Record<string, PeriodContribution> = {};
  let covered: Range[] = [];
  let rawDays = 0;
  for (const status of ["included", "potential", "review"] as const) {
    for (const period of periods.filter((item) => item.status === status)) {
      const range = toRange(period);
      const before = measure(covered);
      covered = union([...covered, range]);
      const additionalDays = measure(covered) - before;
      const total = range.end - range.start;
      days[status] += additionalDays;
      rawDays += total;
      contributions[period.id] = {
        days: total,
        additionalDays,
        repeatedDays: total - additionalDays,
      };
    }
  }
  const uniqueDays = measure(covered);
  return {
    days,
    contributions,
    uniqueDays,
    repeatedDays: rawDays - uniqueDays,
  };
}

export const numberFormatter = new Intl.NumberFormat("pl-PL");
export const formatNumber = (value: number) => numberFormatter.format(value);

/** An explicitly approximate display, not the legal method of calculating seniority. */
export function approximateDuration(days: number): string {
  if (days === 0) return "0 dni";
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const yearLabel =
    years === 1 ? "rok" : years > 1 && years < 5 ? "lata" : "lat";
  if (years && months) return `${years} ${yearLabel} ${months} mies.`;
  if (years) return `${years} ${yearLabel}`;
  if (months) return `${months} mies.`;
  return `${days} dni`;
}

export function formatDate(value: string): string {
  parseDay(value);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export const formatDateRange = (period: Pick<WorkPeriod, "start" | "end">) =>
  `${formatDate(period.start)} – ${formatDate(period.end)}`;
