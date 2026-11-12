# Architektura

## Stos i przepływ danych

Next.js 16 z App Router, React 19, TypeScript strict, Tailwind CSS 4 z PostCSS i autorskimi stylami komponentów, Lucide React. Fonty są instalowane z Fontsource i serwowane przez aplikację; renderowanie nie wymaga Google Fonts ani zasobów z CDN.

Plik `src/data/scenarios.ts` zawiera dane zgodne z interfejsami z `src/lib/types.ts`. Strony App Router wyszukują scenariusz po identyfikatorze i przekazują serializowalne dane do komponentu klienckiego `Workspace`. Nieznany identyfikator wywołuje `notFound()`. `generateStaticParams` przygotowuje trzy znane historie.

Wspólny `Workspace` zapewnia nawigację, pulpit, oś czasu, szczegóły okresu, deklaracje dostępności dokumentów i eksport pełnego fikcyjnego zestawienia TXT. Dane nie są wysyłane na serwer ani zapisywane w localStorage. Dialogi używają natywnego `<dialog>` i `showModal()`; przeglądarka zarządza modalnością i fokusem.

## Pulpit obywatela i kontekst demonstracji

`/` renderuje `CitizenHome`, autorski ekran wejścia do jednej usługi. Dotychczasowa strona opisowa pozostaje pod `/o-projekcie`. Pozostałe adresy zachowują znaczenie; łącznie istnieje 13 adresów treści. Wszystkie pozycje nawigacji prowadzą do działających ekranów. `citizen.css` używa własnego prefiksu klas, dzięki czemu styl pulpitu nie wymaga kolejnej warstwy nadpisań interfejsu historii.

`useDemoProfile` w `src/lib/demo-profile.ts` udostępnia `scenarioId` i `selectScenario`. Zapis `lata-pracy:profile:v1` w `sessionStorage` obejmuje tylko jeden z identyfikatorów fikcyjnych osób; domyślny obraz serwerowy wskazuje Olę. `DemoProfileSync` synchronizuje kontekst przy wejściu do trasy konkretnego scenariusza. Nie jest to konto, autoryzacja ani pobranie danych obywatela. Odczyt jest walidowany, a brak storage pozostawia działanie w pamięci.

Pulpit korzysta z istniejącego `useCaseSession` i planu wybranego scenariusza, żeby wskazać następny krok. Nie przechowuje nowego dokumentu wynikowego, PDF ani pozycji kreatora. CTA prowadzi wprost do `/pulpit/[scenario]`; powroty z modułu zachowują kontekst tej osoby.

## Jedna sesja przygotowania sprawy

`useCaseSession` w `src/lib/case-session.ts` udostępnia ten sam stan porównaniu, szczegółom dokumentów i kreatorowi. Używa `useSyncExternalStore`, stabilnego domyślnego obrazu dla renderowania serwerowego i zapisu per scenariusz w `sessionStorage`. Domyślnie wybrane są okresy `potential` i nazwy ich dokumentów; dostępność wszystkich dokumentów ma stan `unknown`.

Przechowywane są wybrane identyfikatory okresów i dokumentów, deklaracje `unknown` / `missing` / `have` oraz techniczna sygnatura zestawu. Nie ma nazw osób, dat, plików, treści dokumentów ani wiadomości. Odczyt filtruje identyfikatory według bieżących lokalnych danych; uszkodzony lub niedostępny zapis pozostawia działający stan w pamięci. Przy zablokowanym `sessionStorage` stan może nie przetrwać odświeżenia.

Wybory przechodzą przez nawigację, cofanie i odświeżenie tej samej karty. Nie utrwalamy kroku kreatora: ponowne wejście zachowuje zakres, ale otwiera początek trzech kroków. Nie ma osobnej bramki potwierdzania lokalnego eksportu. Dostępność dokumentów nie zmienia `PeriodStatus` ani liczenia dni.

## Liczenie unikalnych dni

Czysta funkcja `summarizeHistory` w `src/lib/history.ts` działa niezależnie od Reacta.

1. Weryfikuje ścisły format ISO `YYYY-MM-DD`, istnienie dat, kierunek zakresów i unikalność identyfikatorów okresów.
2. Zamienia daty na numery dni UTC, dzięki czemu zmiana czasu letniego nie zmienia długości okresu.
3. W danych początek i koniec są włącznie. W obliczeniu koniec zmienia się na wyłączny przez dodanie jednego dnia.
4. Przechodzi przez kategorie: `included`, `potential`, `review`. W obrębie kategorii zachowuje kolejność w danych.
5. Scala pokryte przedziały. Wkład okresu to wzrost długości unii po jego dodaniu.
6. Zwraca dni w każdej kategorii, wkład poszczególnych okresów, łączną liczbę unikalnych dni i liczbę pominiętych powtórzeń.

Kategorie są rozłączne. Dla trzykrotnego wystąpienia dnia liczba pominiętych powtórzeń wynosi dwa; nie jest to liczba unikalnych dni, w których doszło do nakładania. Interfejs używa określenia „powtórzenia dni”. Zmiana filtra i sortowania osi nie uruchamia liczenia na przefiltrowanych danych — podsumowanie pozostaje oparte na całej historii.

Przykład Oli: 3045 dni w kategorii uwzględnionej, 181 nowych potencjalnych dni i 0 nowych dni do weryfikacji względem całej historii. Dodatkowa współpraca ma 62 dni pokryte podstawą i 122 dni pokryte wyłącznie potencjalnym zleceniem. Interfejs rozróżnia te źródła pokrycia; zero nie oznacza wyjaśnienia statusu ani zbędności dowodów. Oś nadal pokazuje pełne okresy. Kategoria w rozwinięciu „Cała historia” podkreśla liczbę okresów wymagających wyjaśnienia.

## Dostępność i responsywność

Semantyczne nagłówki i regiony, link pomijający nawigację, etykiety pól i przycisków ikonowych, `aria-current` dla nawigacji, `aria-pressed` dla filtrów, natywne checkboxy i dialogi, komunikaty `role=status`, tekstowe oznaczenia obok kolorów, widoczne style fokusu i `prefers-reduced-motion`. Oś ma własny obszar przewijania i alternatywny widok listy. Na małym ekranie początkowym widokiem historii jest lista; jawny wybór użytkownika zachowuje pierwszeństwo przy zmianie szerokości. Odczyt `matchMedia` korzysta z `useSyncExternalStore` oraz stabilnego obrazu serwerowego, aby respektować hydratację.

## Brak konfiguracji usług

Nie ma bazy danych, autoryzacji, analityki aplikacji, API ZUS, kluczy, sekretów ani uploadu. Linki do źródeł otwierają zewnętrzne strony dopiero po kliknięciu. Eksport generowany jest lokalnie w przeglądarce jako Blob; jego URL jest zwalniany po pobraniu.

## Rozbudowa

Moduły `HistoryExplorer`, `CoverageBreakdown`, `ContestDemo`, `CaseWizard` i `PacketPreview` oddzielają porównanie, demonstrację, przygotowanie i kartę. `DocumentPreparation` jest kontrolowanym komponentem współdzielonym przez szczegóły dokumentów i kreator. Oddziela deklarację dostępności od wyboru zakresu. Opcjonalne checkboxy nazw znajdują się pod rozwinięciem „Dostosuj zawartość”, zamiast konkurować z podstawową deklaracją przy każdym dokumencie. Dla stanu `missing` pokazuje jawnie zredagowaną pomoc z `src/lib/document-guidance.ts`: właściwy następny krok, listę czynności i istniejące źródło urzędowe. Dopasowanie jest zapisane po identyfikatorach dokumentów; nie wnioskujemy reguły prawnej z tytułu dokumentu ani rodzaju umowy.

Funkcja `splitPeriodByCoverage` rozdziela konkretny okres na przylegające odcinki z dokładnymi datami. `splitPeriodByStatusCoverage` rozróżnia pokrycie podstawą (`included`), wyłącznie okresami potencjalnymi (`potential`) i fragment bez takiego pokrycia. Nie zmienia statusów okresów ani nie orzeka o ich zaliczeniu. `createCasePlan` uwzględnia wyłącznie wybrane okresy ze statusem `potential` oraz niezmienioną podstawę; nieznane identyfikatory i okresy `review` nie awansują do kategorii potencjalnej. `createCaseDraft` filtruje nazwy dokumentów do wybranego zakresu, dołącza deklaracje dostępności oraz ograniczenia demonstracji. Karta i wiadomość korzystają z tych samych wyborów.

Kreator ma trzy kroki: wybór okresów, sprawdzenie dokumentów i podsumowanie dla kadr. Ostatni krok łączy kartę z działaniami **„Drukuj / zapisz jako PDF”** oraz **„Kopiuj wiadomość do kadr”**. Pełna wiadomość i TXT pozostają pod **„Więcej możliwości”**. Nie ma checkboxa oświadczenia ani dodatkowego ekranu zatwierdzenia. Komunikat odróżnia przygotowane podsumowanie od dokumentów brakujących lub nieustalonych. Druk nadal używa systemowego okna przeglądarki; nie ma dedykowanego generatora PDF. Po odmowie API schowka rozwijana jest pełna wiadomość do ręcznego zaznaczenia i skopiowania.

Ścieżki `/demo` oraz `/sprawa/[scenario]` są generowane dla lokalnych danych. Standardowy `npm run build` zachowuje tryb uruchamiany przez Next.js. Opcjonalny `npm run build:static` włącza eksport do `out/` oraz adresy z końcowym ukośnikiem; nie dodaje usług serwerowych. To wariant do publikacji demonstratora na hostingu statycznym, opisanym w `.openai/hosting.json`. Kopiowanie, zapis TXT i drukowanie są lokalnymi czynnościami w przeglądarce. Arkusz `experience.css` zawiera style nowych modułów i reguły wydruku wyłącznie karty. Nie ma endpointu wysyłającego wiadomość ani integracji modelu językowego. Dodanie pulpitu nie wprowadza serwera Python ani kodu i grafik z paczki organizatora.

Przy wzroście zakresu należy wydzielić z `Workspace` osobne moduły pulpitu, osi, dokumentów i eksportu. Ewentualny silnik reguł prawnych powinien mieć oddzielne, wersjonowane wejście i wynik z informacją o źródle oraz stopniu pewności. Obecne statusy demonstracyjne nie mogą automatycznie zostać takim silnikiem.
