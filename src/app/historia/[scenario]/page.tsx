import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScenario, scenarios } from "@/data/scenarios";
import { Workspace } from "@/components/workspace";

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
    title: scenario ? `Oś czasu: ${scenario.name}` : "Nie znaleziono historii",
  };
}
export default async function TimelinePage({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const scenario = getScenario((await params).scenario);
  if (!scenario) notFound();
  return <Workspace key={scenario.id} scenario={scenario} screen="timeline" />;
}
