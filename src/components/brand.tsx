import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Lata Pracy — strona główna"
    >
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        Lata<span className="brand-weight">Pracy</span>
        <span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
