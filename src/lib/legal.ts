export const DEMO_AS_OF = "2026-10-31";
export const SOURCES_VERIFIED_ON = "2026-11-11";
export const legalSources = [
  {
    title: "Ustawa z 26 września 2025 r.",
    publisher: "Dziennik Ustaw, poz. 1423",
    url: "https://eli.gov.pl/eli/DU/2025/1423/ogl",
  },
  {
    title: "Staż pracy na nowych zasadach — pytania i odpowiedzi",
    publisher: "Ministerstwo Rodziny, Pracy i Polityki Społecznej",
    url: "https://www.gov.pl/web/rodzina/staz-pracy-qa",
  },
  {
    title: "„Stażowe” — nowe regulacje i zaświadczenia od 2026 r.",
    publisher: "Zakład Ubezpieczeń Społecznych",
    url: "https://www.zus.pl/baza-wiedzy/biezace-wyjasnienia-komorek-merytorycznych/-/asset_publisher/biezacewyjasnieniakomorekmerytorycznych/content/id/13660998",
  },
];

export const statusMeta = {
  included: {
    label: "Uwzględnione w przykładzie",
    short: "Uwzględnione",
    description: "Etat przyjęty jako podstawa fikcyjnej historii.",
  },
  potential: {
    label: "Potencjalnie do doliczenia",
    short: "Potencjalne",
    description:
      "Dodatkowe dni, jeśli warunki i dokumenty zostaną potwierdzone.",
  },
  review: {
    label: "Wymaga weryfikacji",
    short: "Do weryfikacji",
    description:
      "Brak danych do oceny. Nie wliczamy ich do potencjalnego stażu.",
  },
} as const;
