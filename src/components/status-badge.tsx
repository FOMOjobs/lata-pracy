import { Check, CircleHelp, Plus } from "lucide-react";
import { statusMeta } from "@/lib/legal";
import type { PeriodStatus } from "@/lib/types";

export function StatusBadge({
  status,
  short = false,
}: {
  status: PeriodStatus;
  short?: boolean;
}) {
  const Icon =
    status === "included" ? Check : status === "potential" ? Plus : CircleHelp;
  return (
    <span className={`status-badge status-${status}`}>
      <Icon size={13} aria-hidden="true" />
      {short ? statusMeta[status].short : statusMeta[status].label}
    </span>
  );
}
