import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { PublicHeader, PublicFooter } from "@/components/public-layout";

export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <main id="main" className="empty-page container">
        <Compass size={45} strokeWidth={1.3} aria-hidden="true" />
        <span className="eyebrow">404 · CHWILA NA ZMIANĘ KIERUNKU</span>
        <h1>
          Ta historia jeszcze
          <br />
          nie powstała.
        </h1>
        <p>Wybierz jeden z trzech dostępnych scenariuszy demonstracyjnych.</p>
        <Link className="button button-primary" href="/scenariusze">
          <ArrowLeft size={17} aria-hidden="true" /> Wróć do scenariuszy
        </Link>
      </main>
      <PublicFooter />
    </>
  );
}
