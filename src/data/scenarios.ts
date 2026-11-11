import type { Scenario } from "@/lib/types";

export const scenarios: Scenario[] = [
  {
    id: "kasia",
    name: "Kasia",
    initials: "K",
    role: "Zlecenie + etat",
    accent: "blue",
    headline: "Pierwsza praca też ma znaczenie.",
    description:
      "Najpierw zlecenia, później etat. Zobacz, co warto sprawdzić w historii Kasi.",
    lesson:
      "Wcześniejsze zlecenia mogą mieć znaczenie — sprawdź ich udokumentowanie i warunki ubezpieczenia.",
    periods: [
      {
        id: "kasia-student",
        title: "Wakacyjna praca na zleceniu",
        organization: "Pracownia Lato",
        type: "contract",
        status: "review",
        start: "2017-07-01",
        end: "2017-09-30",
        description:
          "W tej fikcyjnej historii Kasia pracowała podczas studiów. Brakuje danych o jej statusie i podstawie niepodlegania ubezpieczeniom.",
        conditions: [
          "Ustal dokładne daty wykonywania zlecenia.",
          "Sprawdź status ucznia lub studenta i podstawę niepodlegania ubezpieczeniom.",
          "Ustal z pracodawcą, jakie dowody potwierdzą ten okres.",
        ],
        documents: [
          {
            id: "kasia-student-contract",
            title: "Umowa i potwierdzenie wykonywania zlecenia",
            hint: "Przykładowe dowody do omówienia z pracodawcą.",
          },
          {
            id: "kasia-student-status",
            title: "Dokument dotyczący statusu studenta",
            hint: "Do wyjaśnienia podstawy niepodlegania ubezpieczeniom.",
          },
        ],
        legalTodo:
          "TODO: potwierdzić podstawę zaliczenia tego konkretnego okresu i wystarczające dowody. Brak zaświadczenia ZUS nie oznacza automatycznie wykluczenia okresu.",
      },
      {
        id: "kasia-contract",
        title: "Umowa zlecenia",
        organization: "Studio Forma",
        type: "contract",
        status: "potential",
        start: "2018-01-01",
        end: "2019-12-31",
        description:
          "Dwa lata pracy na zleceniu przed pierwszym etatem. W scenariuszu założono możliwość udokumentowania ubezpieczenia, ale nie dokonano prawnej weryfikacji.",
        conditions: [
          "Potwierdź okres faktycznego wykonywania umowy.",
          "Sprawdź podleganie ubezpieczeniom emerytalnemu i rentowym.",
          "Przedstaw dokumenty pracodawcy do oceny.",
        ],
        documents: [
          {
            id: "kasia-contract-zus",
            title: "Zaświadczenie ZUS dotyczące okresu ubezpieczenia",
            hint: "Sprawdź możliwość uzyskania zaświadczenia przez wniosek USP w eZUS.",
          },
          {
            id: "kasia-contract-agreement",
            title: "Umowa zlecenia i potwierdzenie jej wykonywania",
            hint: "Sprawdź zgodność dat z pozostałymi dokumentami.",
          },
        ],
      },
      {
        id: "kasia-job-1",
        title: "Pierwszy etat",
        organization: "Pracownia Północ",
        type: "employment",
        status: "included",
        start: "2020-01-01",
        end: "2022-12-31",
        description:
          "Okres etatu przyjęty jako już uwzględniony wyłącznie na potrzeby demonstracji.",
        conditions: [
          "Porównaj daty zatrudnienia ze świadectwem pracy.",
          "Potwierdź uwzględnienie okresu w dokumentacji pracodawcy.",
        ],
        documents: [
          {
            id: "kasia-job-certificate",
            title: "Świadectwo pracy z poprzedniego etatu",
            hint: "W tym przykładzie dokument jest fikcyjny i nie jest przechowywany w aplikacji.",
          },
        ],
      },
      {
        id: "kasia-job-2",
        title: "Obecny etat",
        organization: "Zespół Horyzont",
        type: "employment",
        status: "included",
        start: "2023-01-01",
        end: "2026-10-31",
        description:
          "Obecne zatrudnienie w fikcyjnym zespole. Historia demonstracyjna kończy się 31 października 2026 r.",
        conditions: [
          "Sprawdź datę rozpoczęcia zatrudnienia.",
          "Porównaj dane z dokumentacją kadrową.",
        ],
        documents: [
          {
            id: "kasia-job-current",
            title: "Dokumentacja obecnego zatrudnienia",
            hint: "Do sprawdzenia u pracodawcy; aplikacja nie pobiera dokumentów.",
          },
        ],
      },
    ],
  },
  {
    id: "marek",
    name: "Marek",
    initials: "M",
    role: "JDG + etat",
    accent: "peach",
    headline: "Własna firma to część historii.",
    description:
      "Marek zamienił działalność na etat. Sprawdź, jakie dokumenty warto przygotować.",
    lesson:
      "Sam wpis do CEIDG nie rozstrzyga zaliczenia okresu. Znaczenie mają warunki ustawowe i dokumenty.",
    periods: [
      {
        id: "marek-early",
        title: "Początek działalności",
        organization: "Marek · usługi projektowe",
        type: "business",
        status: "review",
        start: "2015-04-01",
        end: "2015-09-30",
        description:
          "Brak kompletu danych o pierwszych miesiącach działalności. Scenariusz celowo pozostawia ten okres do sprawdzenia.",
        conditions: [
          "Ustal daty rzeczywistego prowadzenia działalności i ewentualnych zawieszeń.",
          "Wyjaśnij tytuł ubezpieczenia i sposób opłacenia składek.",
          "Ustal z pracodawcą brakujące dowody.",
        ],
        documents: [
          {
            id: "marek-early-evidence",
            title:
              "Dokumenty dotyczące ubezpieczenia w początkowym okresie JDG",
            hint: "Zakres dokumentów wymaga ustalenia dla konkretnego przypadku.",
          },
        ],
        legalTodo:
          "TODO: wyjaśnić fakty dotyczące składek i podstawę zaliczenia. Nie przypisujemy automatycznie preferencji ani ulg na podstawie daty rozpoczęcia JDG.",
      },
      {
        id: "marek-business",
        title: "Jednoosobowa działalność",
        organization: "Marek · usługi projektowe",
        type: "business",
        status: "potential",
        start: "2015-10-01",
        end: "2020-03-31",
        description:
          "W scenariuszu założono ciągłe prowadzenie JDG i możliwość potwierdzenia wymaganych składek. To założenie demonstracyjne.",
        conditions: [
          "Potwierdź rzeczywisty okres prowadzenia działalności, bez zawieszeń.",
          "Sprawdź opłacenie składek wymaganych dla tego rodzaju okresu.",
          "Przedstaw odpowiednie zaświadczenie pracodawcy.",
        ],
        documents: [
          {
            id: "marek-business-zus",
            title: "Zaświadczenie ZUS dla okresu działalności",
            hint: "Sprawdź możliwość złożenia wniosku USP w eZUS.",
          },
          {
            id: "marek-business-ceidg",
            title: "Historia wpisu CEIDG",
            hint: "Dokument pomocniczy do sprawdzenia dat; sam nie potwierdza wszystkich warunków.",
          },
        ],
      },
      {
        id: "marek-job",
        title: "Praca na etacie",
        organization: "Biuro Most",
        type: "employment",
        status: "included",
        start: "2020-04-01",
        end: "2026-10-31",
        description:
          "Etat przyjęty jako uwzględniona podstawa fikcyjnego przykładu.",
        conditions: [
          "Sprawdź daty w dokumentacji kadrowej.",
          "Potwierdź, jakie okresy pracodawca już uwzględnił.",
        ],
        documents: [
          {
            id: "marek-job-certificate",
            title: "Dokumentacja zatrudnienia na etacie",
            hint: "Sprawdź dane u pracodawcy.",
          },
        ],
      },
    ],
  },
  {
    id: "ola",
    name: "Ola",
    initials: "O",
    role: "Nakładające się okresy",
    accent: "mint",
    headline: "Dwie umowy. Jeden upływ czasu.",
    description:
      "Etat i dodatkowe zlecenia w tym samym czasie. Zobacz, jak unikamy podwójnego liczenia.",
    lesson:
      "Nakładające się okresy nie wydłużają historii dwukrotnie. Każdy dzień pokazujemy w podsumowaniu tylko raz.",
    periods: [
      {
        id: "ola-job-1",
        title: "Etat w agencji",
        organization: "Agencja Punkt",
        type: "employment",
        status: "included",
        start: "2018-01-01",
        end: "2021-12-31",
        description:
          "Pierwszy etat Oli. Jego dni są podstawą przykładu, także gdy równolegle trwało zlecenie.",
        conditions: [
          "Sprawdź daty w świadectwie pracy.",
          "Zestaw okres etatu z równoległymi zleceniami.",
        ],
        documents: [
          {
            id: "ola-job-certificate",
            title: "Świadectwo pracy z agencji",
            hint: "Pozwala porównać daty okresów.",
          },
        ],
      },
      {
        id: "ola-contract",
        title: "Zlecenie równolegle do etatu",
        organization: "Studio Linia",
        type: "contract",
        status: "potential",
        start: "2019-06-01",
        end: "2022-06-30",
        description:
          "Zlecenie częściowo pokrywa się z etatem. Nowe dni w podsumowaniu to wyłącznie okres od stycznia do czerwca 2022 r.",
        conditions: [
          "Sprawdź warunki ubezpieczenia w poszczególnych częściach okresu.",
          "Porównaj daty z okresem zatrudnienia na etacie.",
          "Potwierdź dokumenty dla części przypadającej poza etatem.",
        ],
        documents: [
          {
            id: "ola-contract-zus",
            title: "Zaświadczenie o ubezpieczeniu z tytułu zlecenia",
            hint: "Zakres ubezpieczenia może się różnić w trakcie trwania umowy.",
          },
          {
            id: "ola-contract-agreement",
            title: "Umowa i potwierdzenie wykonywania zlecenia",
            hint: "Sprawdź daty, szczególnie pierwsze półrocze 2022 r.",
          },
        ],
      },
      {
        id: "ola-review",
        title: "Dodatkowa współpraca",
        organization: "Kolektyw Rytm",
        type: "contract",
        status: "review",
        start: "2022-03-01",
        end: "2022-08-31",
        description:
          "Dokumentacja współpracy jest niepełna. Część dat pokrywa etat, a część wyłącznie zlecenie wymagające sprawdzenia.",
        conditions: [
          "Ustal rodzaj umowy i faktyczne daty współpracy.",
          "Sprawdź warunki ustawowe po wyjaśnieniu rodzaju umowy.",
          "Oddziel pokrycie etatem od pokrycia potencjalnym zleceniem.",
        ],
        documents: [
          {
            id: "ola-review-docs",
            title: "Umowa i dokumenty dotyczące dodatkowej współpracy",
            hint: "Brak danych nie jest potwierdzeniem prawa do doliczenia.",
          },
        ],
        legalTodo:
          "TODO: ustalić rodzaj umowy i dokumenty. Zero nowych dni dotyczy całej pokazanej historii, w tym potencjalnego zlecenia. Jeśli zlecenie nie zostanie zaliczone, znaczenie tej współpracy trzeba ocenić osobno.",
      },
      {
        id: "ola-job-2",
        title: "Obecny etat",
        organization: "Pracownia Dobry Kierunek",
        type: "employment",
        status: "included",
        start: "2022-07-01",
        end: "2026-10-31",
        description:
          "Obecny etat Oli, przyjęty jako uwzględniony w demonstracji.",
        conditions: [
          "Potwierdź początek zatrudnienia w dokumentacji kadrowej.",
          "Sprawdź, czy okresy zostały już ujęte u pracodawcy.",
        ],
        documents: [
          {
            id: "ola-current-docs",
            title: "Dokumentacja obecnego zatrudnienia",
            hint: "Aplikacja nie łączy się z systemem pracodawcy.",
          },
        ],
      },
    ],
  },
];

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
