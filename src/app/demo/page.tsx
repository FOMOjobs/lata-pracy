import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getScenario } from "@/data/scenarios";
import { ContestDemo } from "@/components/contest-demo";
import { PublicFooter, PublicHeader } from "@/components/public-layout";

export const metadata: Metadata = { title: "Zobacz różnicę w 90 sekund" };
export default function DemoPage() {
  const scenario = getScenario("ola");
  if (!scenario) throw new Error("Brak fikcyjnego scenariusza demonstracji.");
  return (
    <>
      <PublicHeader active="demo" />
      <main id="main" className="demo-page container">
        <Link className="back-link" href="/">
          <ArrowLeft size={16} aria-hidden="true" /> Strona główna
        </Link>
        <ContestDemo scenario={scenario} />
      </main>
      <PublicFooter />
    </>
  );
}
