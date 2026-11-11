# Architektura

## Stos i przepływ danych

Next.js 16 z App Router, React 19, TypeScript strict, Tailwind CSS 4 z PostCSS i autorskimi stylami komponentów, Lucide React. Fonty są instalowane z Fontsource i serwowane przez aplikację; renderowanie nie wymaga Google Fonts ani zasobów z CDN.

Plik `src/data/scenarios.ts` zawiera dane zgodne z interfejsami z `src/lib/types.ts`. Strony App Router wyszukują scenariusz po identyfikatorze i przekazują serializowalne dane do komponentu klienckiego `Workspace`. Nieznany identyfikator wywołuje `notFound()`. `generateStaticParams` przygotowuje trzy znane historie.

Wspólny `Workspace` zapewnia nawigację, pulpit, oś czasu, szczegóły okresu, deklaracje dostępności dokumentów i eksport pełnego fikcyjnego zestawienia TXT. Dane nie są wysyłane na serwer ani zapisywane w localStorage. Dialogi używają natywnego `<dialog>` i `showModal()`; przeglądarka zarządza modalnością i fokusem.

## Jedna sesja przygotowania sprawy

`useCaseSession` w `src/lib/case-session.ts` udostępnia ten sam stan porównaniu, szczegółom dokumentów i kreatorowi. Używa `useSyncExternalStore`, stabilnego domyślnego obrazu dla renderowania serwerowego i zapisu per scenariusz w `sessionStorage`. Domyślnie wybrane są okresy `potential` i nazwy ich dokumentów; dostępność wszystkich dokumentów ma stan `unknown`.

Przechowywane są wybrane identyfikatory okresów i dokumentów, deklaracje `unknown` / `missing` / `have` oraz techniczna sygnatura zestawu. Nie ma nazw osób, dat, plików, treści dokumentów ani wiadomości. Odczyt filtruje identyfikatory według bieżących lokalnych danych; uszkodzony lub niedostępny zapis pozostawia działający stan w pamięci. Przy zablokowanym `sessionStorage` stan może nie przetrwać odświeżenia.

Wybory przechodzą przez nawigację, cofanie i odświeżenie tej samej karty. Nie utrwalamy kroku kreatora ani potwierdzenia przygotowania: ponowne wejście zachowuje zakres, ale wymaga ponownego przejrzenia i potwierdzenia projektu. Dostępność dokumentów nie zmienia `PeriodStatus` ani liczenia dni.

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

Moduły `HistoryExplorer`, `CoverageBreakdown`, `ContestDemo`, `CaseWizard` i `PacketPreview` oddzielają porównanie, demonstrację, przygotowanie i kartę. `DocumentPreparation` jest kontrolowanym komponentem współdzielonym przez szczegóły dokumentów i kreator. Oddziela deklarację dostępności od wyboru zakresu pakietu. Dla stanu `missing` pokazuje jawnie zredagowaną pomoc z `src/lib/document-guidance.ts`: właściwy następny krok, listę czynności i istniejące źródło urzędowe. Dopasowanie jest zapisane po identyfikatorach dokumentów; nie wnioskujemy reguły prawnej z tytułu dokumentu ani rodzaju umowy.

Funkcja `splitPeriodByCoverage` rozdziela konkretny okres na przylegające odcinki z dokładnymi datami. `createCasePlan` uwzględnia wyłącznie wybrane okresy ze statusem `potential` oraz niezmienioną podstawę; nieznane identyfikatory i okresy `review` nie awansują do kategorii potencjalnej. `createCaseDraft` filtruje nazwy dokumentów do wybranego zakresu, dołącza deklaracje dostępności oraz ograniczenia demonstracji. Karta i wiadomość korzystają z tych samych wyborów.

Kreator przed potwierdzeniem pokazuje samą kartę. Dopiero **„Przygotuj projekt”** otwiera finał z jednym głównym działaniem **„Drukuj kartę”**; wiadomość i pozostałe eksporty są w natywnym rozwinięciu **„Więcej możliwości”**. Komunikat końcowy odróżnia projekt przygotowany od dokumentów brakujących lub nieustalonych.

Ścieżki `/demo` oraz `/sprawa/[scenario]` są generowane statycznie dla lokalnych danych. Kopiowanie, zapis TXT i drukowanie są lokalnymi czynnościami w przeglądarce. Arkusz `experience.css` zawiera style nowych modułów i reguły wydruku wyłącznie karty. Nie ma endpointu wysyłającego wiadomość ani integracji modelu językowego.

Przy wzroście zakresu należy wydzielić z `Workspace` osobne moduły pulpitu, osi, dokumentów i eksportu. Ewentualny silnik reguł prawnych powinien mieć oddzielne, wersjonowane wejście i wynik z informacją o źródle oraz stopniu pewności. Obecne statusy demonstracyjne nie mogą automatycznie zostać takim silnikiem.
