import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Fingerprint,
  Layers3,
  Plus,
  Sparkles,
} from "lucide-react";

export function CareerIllustration() {
  return (
    <div
      className="career-art"
      role="img"
      aria-label="Ilustracja: różne etapy pracy tworzą jedną historię"
    >
      <div className="art-orbit art-orbit-one" />
      <div className="art-orbit art-orbit-two" />
      <span className="art-top-label">
        <span className="tiny-dot" /> PEŁNIEJSZY OBRAZ TWOJEJ PRACY
      </span>
      <div className="art-mini-label">
        <Fingerprint size={24} aria-hidden="true" />
        <span>
          Każda historia
          <br />
          <strong>jest inna.</strong>
        </span>
      </div>
      <div className="history-card">
        <div className="history-card-top">
          <span className="mini-brand">
            <Layers3 size={18} aria-hidden="true" /> Twoja historia
          </span>
          <span className="art-year">2017—2026</span>
        </div>
        <h2>
          Więcej
          <br />
          niż etat<span>.</span>
        </h2>
        <div className="art-timeline">
          <div className="art-row">
            <span className="art-point point-outline">
              <BriefcaseBusiness size={14} aria-hidden="true" />
            </span>
            <span>
              <strong>Pierwsze zlecenie</strong>
              <small>Tu zaczyna się Twoja historia</small>
            </span>
            <span className="art-tag">DO SPRAWDZENIA</span>
          </div>
          <div className="art-row">
            <span className="art-point">
              <Check size={15} aria-hidden="true" />
            </span>
            <span>
              <strong>Praca na etacie</strong>
              <small>Kolejny krok. Nowe doświadczenia.</small>
            </span>
          </div>
          <div className="art-row">
            <span className="art-point point-spark">
              <Sparkles size={15} aria-hidden="true" />
            </span>
            <span>
              <strong>Pełniejszy staż pracy</strong>
              <small>Sprawdź, co możesz doliczyć</small>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </div>
        </div>
        <div className="art-card-bottom">
          <span>Twoja droga ma znaczenie</span>
          <span className="art-bottom-icon">
            <ArrowDown size={16} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="art-floating">
        <span className="floating-icon">
          <Plus size={21} aria-hidden="true" />
        </span>
        <div>
          <strong>Odkryj pominięte okresy</strong>
          <span>Połącz fakty ze swojej historii.</span>
        </div>
      </div>
      <div className="art-caption">
        <span>01 / TWOJA DROGA ZAWODOWA</span>
        <span>
          KAŻDY ETAP SIĘ LICZY <ArrowUpRight size={13} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
