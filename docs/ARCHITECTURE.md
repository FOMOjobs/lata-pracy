# Architektura

## Stos i przepływ danych

Next.js 16 z App Router, React 19, TypeScript strict, Tailwind CSS 4 z PostCSS i autorskimi stylami komponentów, Lucide React. Fonty są instalowane z Fontsource i serwowane przez aplikację; renderowanie nie wymaga Google Fonts ani zasobów z CDN.

Plik `src/data/scenarios.ts` zawiera dane zgodne z interfejsami z `src/lib/types.ts`. Strony App Router wyszukują scenariusz po identyfikatorze i przekazują serializowalne dane do komponentu klienckiego `Workspace`. Nieznany identyfikator wywołuje `notFound()`. `generateStaticParams` przygotowuje trzy znane historie.

Wspólny `Workspace` zapewnia nawigację, pulpit, oś czasu, szczegóły okresu, roboczą checklistę i eksport TXT. Dane nie są wysyłane na serwer ani zapisywane w localStorage. Stan interfejsu jest lokalny dla aktualnie zamontowanego widoku. Dialogi używają natywnego `<dialog>` i `showModal()`; przeglądarka zarządza modalnością i fokusem.

## Liczenie unikalnych dni

Czysta funkcja `summarizeHistory` w `src/lib/history.ts` działa niezależnie od Reacta.

1. Weryfikuje ścisły format ISO `YYYY-MM-DD`, istnienie dat, kierunek zakresów i unikalność identyfikatorów okresów.
2. Zamienia daty na numery dni UTC, dzięki czemu zmiana czasu letniego nie zmienia długości okresu.
3. W danych początek i koniec są włącznie. W obliczeniu koniec zmienia się na wyłączny przez dodanie jednego dnia.
4. Przechodzi przez kategorie: `included`, `potential`, `review`. W obrębie kategorii zachowuje kolejność w danych.
5. Scala pokryte przedziały. Wkład okresu to wzrost długości unii po jego dodaniu.
6. Zwraca dni w każdej kategorii, wkład poszczególnych okresów, łączną liczbę unikalnych dni i liczbę pominiętych powtórzeń.

Kategorie są rozłączne. Dla trzykrotnego wystąpienia dnia liczba pominiętych powtórzeń wynosi dwa; nie jest to liczba unikalnych dni, w których doszło do nakładania. Interfejs używa określenia „powtórzenia dni”. Zmiana filtra i sortowania osi nie uruchamia liczenia na przefiltrowanych danych — podsumowanie pozostaje oparte na całej historii.

Przykład Oli: 3045 dni w kategorii uwzględnionej, 181 nowych potencjalnych dni i 0 nowych dni do weryfikacji. Oś nadal pokazuje pełne okresy każdej umowy. Wymagający sprawdzenia okres pozostaje widoczny mimo zerowego wkładu.

## Dostępność i responsywność

Semantyczne nagłówki i regiony, link pomijający nawigację, etykiety pól i przycisków ikonowych, `aria-current` dla nawigacji, `aria-pressed` dla filtrów, natywne checkboxy i dialogi, komunikaty `role=status`, tekstowe oznaczenia obok kolorów, widoczne style fokusu i `prefers-reduced-motion`. Oś ma własny obszar przewijania i alternatywny widok listy.

## Brak konfiguracji usług

Nie ma bazy danych, autoryzacji, analityki aplikacji, API ZUS, kluczy, sekretów ani uploadu. Linki do źródeł otwierają zewnętrzne strony dopiero po kliknięciu. Eksport generowany jest lokalnie w przeglądarce jako Blob; jego URL jest zwalniany po pobraniu.

## Rozbudowa

Druga iteracja dodaje osobne moduły `HistoryExplorer`, `CoverageBreakdown`, `ContestDemo`, `CaseWizard` i `PacketPreview`. Funkcja `splitPeriodByCoverage` rozdziela konkretny okres na przylegające odcinki z dokładnymi datami. `createCasePlan` uwzględnia wyłącznie wybrane okresy ze statusem `potential` oraz niezmienioną podstawę; nieznane identyfikatory i okresy `review` nie awansują do kategorii potencjalnej. `createCaseDraft` filtruje nazwy dokumentów do wybranego zakresu i zawsze dołącza ograniczenia demonstracji.

Ścieżki `/demo` oraz `/sprawa/[scenario]` są generowane statycznie dla lokalnych danych. Kopiowanie, zapis TXT i drukowanie są lokalnymi czynnościami w przeglądarce. Arkusz `experience.css` zawiera style nowych modułów i reguły wydruku wyłącznie karty. Nie ma endpointu wysyłającego wiadomość ani integracji modelu językowego.

Przy wzroście zakresu należy wydzielić z `Workspace` osobne moduły pulpitu, osi, dokumentów i eksportu. Ewentualny silnik reguł prawnych powinien mieć oddzielne, wersjonowane wejście i wynik z informacją o źródle oraz stopniu pewności. Obecne statusy demonstracyjne nie mogą automatycznie zostać takim silnikiem.
