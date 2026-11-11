# Produkt: Lata Pracy

Hasło: **Twoja praca się liczy**. Język interfejsu: polski.

## Cel

Pomóc osobie, która ma za sobą różne formy pracy, uporządkować okresy aktywności i przygotować się do rozmowy z pracodawcą o ich zaliczeniu do stażu. Prototyp pokazuje możliwości na trzech fikcyjnych historiach, bez zbierania danych użytkownika.

## Główna ścieżka

Start → wybór historii → pulpit → oś czasu → szczegóły okresu → robocza lista dokumentów.

Rozbudowana ścieżka konkursowa: `/demo` → odkrycie dodatkowych dni → `/sprawa/[scenario]` → wybór okresów → zakres nazw dokumentów → podgląd karty i projektu wiadomości → jawne potwierdzenie symulacji. Karta i wiadomość zawierają ten sam wybrany zakres. Można je skopiować, pobrać jako TXT lub wydrukować kartę z okna przeglądarki.

Na pulpicie dostępne jest interaktywne porównanie. Zaznaczenie potencjalnego okresu aktualizuje wyłącznie porównanie warunkowe; nie zmienia zapisanych statusów, trzech kart podsumowania ani prawnego TODO. Rozwinięcie pokazuje dokładne odcinki dat już pokrytych etatem oraz dni poza podstawą.

| Ekran       | Cel                                                     | Działanie                                                                |
| ----------- | ------------------------------------------------------- | ------------------------------------------------------------------------ |
| Start       | Wyjaśnić wartość i granice produktu                     | CTA „Sprawdź swoją historię pracy”, kroki, zasady i źródła               |
| Scenariusze | Pozwolić bezpiecznie poznać prototyp                    | Kasia, Marek, Ola; każda karta prowadzi do właściwego pulpitu            |
| Pulpit      | Rozdzielić podstawę przykładu od warunkowych możliwości | Trzy statystyki, lista okresów, dokumenty, pobieranie TXT                |
| Oś czasu    | Pokazać kolejność, równoległość i wymagania             | Kliki w paski i nazwy, filtry, sortowanie, alternatywna lista, szczegóły |

## Scenariusze

- **Kasia:** wakacyjne zlecenie podczas studiów do weryfikacji, późniejsze zlecenie potencjalne oraz dwa etaty przyjęte jako uwzględnione.
- **Marek:** początek JDG z niekompletnymi danymi, dalszy okres działalności potencjalny i późniejszy etat. Nie przypisujemy historycznemu okresowi nieistniejących wówczas ulg.
- **Ola:** etaty, częściowo pokrywające się zlecenie i niepełna dokumentacja dodatkowej współpracy. Tylko 181 dni zlecenia przypada poza etatem; dni współpracy są już pokryte innymi okresami.

Datą końcową fikcyjnych historii jest 31.10.2026. Aplikacja nie przesuwa wyników wraz z zegarem urządzenia.

## Znaczenie statusów

„Uwzględnione w przykładzie” jest założeniem scenariusza. „Potencjalnie do doliczenia” oznacza warunkowe dodatkowe dni. „Wymaga weryfikacji” oznacza brak danych; dni te nie zwiększają wyniku potencjalnego. Statusy są zapisane w danych, a nie rozstrzygane na podstawie samego typu umowy.

Zaznaczenie dokumentu służy wyłącznie jako robocza checklista, nie stanowi przesłania, weryfikacji ani akceptacji dokumentu. Oznaczenia istnieją w pamięci bieżącego ekranu; po nawigacji są zerowane.

## Kierunek wizualny

Autorska identyfikacja: symbol rosnących etapów, granat, jasny błękit, biel, lokalne fonty Manrope i DM Sans, liniowe ikony Lucide. Bez godła, symboliki urzędowej i kopiowania mObywatela. Własna ilustracja historii pracy jest zbudowana w HTML/CSS; nie używa wizerunku osoby.

Interfejs dopasowuje się do telefonu, tabletu i komputera. Na telefonie boczna nawigacja zmienia się w górne zakładki; oś przewija się we własnym obszarze. Widok listy zapewnia dostęp do tych samych szczegółów.

## Kryteria akceptacji

- Wszystkie cztery ekrany oraz trzy scenariusze działają bez logowania i konfiguracji usług.
- Status i ograniczenia wyniku są widoczne przed interpretowaniem liczb.
- Każdy okres ujawnia daty, opis, warunki i dokumenty; niepewne przypadki mają TODO.
- Kategorie podsumowania nie przypisują tego samego dnia więcej niż raz.
- Eksport jest plikiem TXT z oznaczeniem demonstracji i dokładnymi liczbami dni.
- Przyciski, formularze i dialogi mają etykiety; dostępne są widoczne fokusem sterowanie klawiaturą, tekstowe statusy i ograniczenie animacji.

## Poza zakresem

Rzeczywiste dane, edycja historii, upload dokumentów, logowanie, baza danych, automatyczne reguły kwalifikacji prawnej, integracje ZUS/CEIDG, ustalanie urlopu i świadczeń, podpisywanie i składanie wniosków, produkcyjne wdrożenie. Nie są sugerowane jako działające funkcje.

Potwierdzenie w przygotowaniu sprawy kończy lokalną symulację. Nie jest wysyłką do pracodawcy ani urzędu. Nazwy dokumentów nie są plikami ani potwierdzeniem ich istnienia. Stan wyborów znika po opuszczeniu ekranu lub odświeżeniu.
