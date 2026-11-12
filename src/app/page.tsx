import type { Metadata } from "next";
import { CitizenHome } from "@/components/citizen-home";

export const metadata: Metadata = {
  title: "Pulpit obywatela",
  description:
    "Twoja przestrzeń w niezależnym prototypie aplikacji obywatelskiej. Wybierz fikcyjną historię i sprawdź usługę Lata Pracy.",
};

export default function Home() {
  return <CitizenHome />;
}
