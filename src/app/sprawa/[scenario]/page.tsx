import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { getScenario, scenarios } from "@/data/scenarios";
import { CaseWizard } from "@/components/case-wizard";
import { PublicFooter, PublicHeader } from "@/components/public-layout";

export function generateStaticParams() {
  return scenarios.map(({ id }) => ({ scenario: id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenario: string }>;
}): Promise<Metadata> {
  const scenario = getScenario((await params).scenario);
  return {
    title: scenario
      ? `Przygotuj sprawę: ${scenario.name}`
      : "Nie znaleziono historii",
  };
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const scenario = getScenario((await params).scenario);
  if (!scenario) notFound();
  return (
    <div className="case-route">
      <PublicHeader />
      <main id="main" className="case-page container">
        <div className="case-page-toolbar">
          <Link href={`/pulpit/${scenario.id}`} className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Wróć do historii:{" "}
            {scenario.name}
          </Link>
          <span>
            <LockKeyhole size={14} aria-hidden="true" /> Bez logowania · Bez
            wysyłania
          </span>
        </div>
        <CaseWizard key={scenario.id} scenario={scenario} />
      </main>
      <PublicFooter />
    </div>
  );
}
