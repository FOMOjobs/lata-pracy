# Lata Pracy

**Twoja praca się liczy.** Autorski pulpit obywatela z jedną usługą doprowadzoną do podsumowania dla kadr. Niezależny, polskojęzyczny prototyp pomaga uporządkować historię zawodową i zobaczyć, jakie okresy warto zweryfikować w związku ze zmianami przepisów w 2026 r.

**Demo bez logowania:** https://lata-pracy-demo.verbaltoucan.chatgpt.site — na krótki pokaz otwórz [historię Oli](https://lata-pracy-demo.verbaltoucan.chatgpt.site/demo/).

> To nie jest oficjalna usługa państwowa ani porada prawna. Wszystkie osoby, firmy, daty i statusy w scenariuszach są fikcyjne. Wyniki nie potwierdzają prawa do zaliczenia okresu. Aplikacja nie integruje się z ZUS i nie przyjmuje rzeczywistych danych ani dokumentów.

## Uruchomienie — krok po kroku

1. Zainstaluj **Node.js 24 LTS** ze strony [nodejs.org](https://nodejs.org/) i [Git](https://git-scm.com/downloads). Projekt obsługuje Node.js 22 lub nowszy.
2. Otwórz Terminal (macOS / Linux) albo PowerShell (Windows).
3. Pobierz prototyp i przejdź do jego katalogu:

   ```sh
   git clone https://github.com/FOMOjobs/lata-pracy.git
   cd lata-pracy
   ```

   Polecenie pobiera gałąź `main`. Do czasu scalenia [PR #2](https://github.com/FOMOjobs/lata-pracy/pull/2) najnowszy pulpit sprawdzisz poleceniem `git switch feat/audit-ux-refinement`.

4. Zainstaluj zależności:

   ```sh
   npm ci
   ```

5. Uruchom aplikację:

   ```sh
   npm run dev
   ```

6. Wpisz w przeglądarce **http://localhost:3000**. Terminal zostaw otwarty. Aby zakończyć pracę serwera, naciśnij `Ctrl+C`.

Nie trzeba zakładać konta, tworzyć pliku `.env`, podpinać bazy danych ani konfigurować usług zewnętrznych. Fonty są dołączone lokalnie do aplikacji.

Jeśli port 3000 jest zajęty, przeczytaj adres wypisany w terminalu lub uruchom `npm run dev -- --port 3001` i otwórz http://localhost:3001. Jeśli terminal nie rozpoznaje `npm`, po instalacji Node.js zamknij go i otwórz ponownie.

## Sprawdź aplikację w 3 minuty

Zacznij na **pulpicie obywatela `/`**. Osobna ścieżka `/demo` prowadzi przez trzy rozdziały prezentacji Oli; dotychczasowy opis koncepcji jest pod `/o-projekcie`.

1. Na pulpicie obywatela wybierz fikcyjną **Olę** (domyślny przykład), potem kliknij **„Sprawdź swoją historię pracy”**. Przejdziesz bezpośrednio do `/pulpit/ola`, bez ponownego wybierania scenariusza.
2. W porównaniu Oli rozwiń **„Skąd bierze się ta różnica?”**. Z 1126 dni zlecenia 945 pokrywa się z etatem, a **181 dni pozostaje poza podstawą**, potencjalnie do sprawdzenia. Każdy dzień liczymy tylko raz.
3. Otwórz **„Warunki i dokumenty”**. Przy przykładowym zaświadczeniu ustaw **„Nie mam dokumentu”** i rozwiń **„Jak uzupełnić ten brak?”**. Zobaczysz następny krok i oficjalne źródło. To deklaracja, nie weryfikacja dokumentu ani okresu.
4. Zamknij szczegóły i kliknij **„Przygotuj podsumowanie dla kadr”**. Przejdź **„Wybierz okresy” → „Sprawdź dokumenty” → „Podsumowanie dla kadr”**. Jeśli chcesz ograniczyć listę nazw dokumentów, rozwiń **„Dostosuj zawartość”**. Dostępność i zakres pozostają osobnymi wyborami.
5. Na końcu od razu dostępne są **„Drukuj / zapisz jako PDF”** i **„Kopiuj wiadomość do kadr”**. Pełny tekst i TXT są pod **„Więcej możliwości”**. Karta i wiadomość zawierają ten sam zakres i zadeklarowane braki; nic nie jest wysyłane. Zapis PDF korzysta z systemowego okna drukowania.
6. Wróć przez **„Pulpit obywatela”**. Ola oraz wybory jej historii pozostają w tej karcie przeglądarki. Sekcja następnego kroku reaguje na wybrane okresy i dostępność dokumentów; nie oznacza zapisanego PDF ani zatwierdzonego stażu.
7. Wybierz **Kasię** lub **Marka** i sprawdź, czy odsyłacze prowadzą do właściwej osoby. Na `/historia/[scenario]` wypróbuj filtry, kolejność i widok listy; na telefonie lista jest widokiem początkowym. Rozwiń **„Cała historia”** na pulpicie modułu, aby obejrzeć pełne kategorie niezależne od wyboru w porównaniu.

Dodatkowa współpraca Oli ma **62 dni pokryte etatem i 122 dni pokryte tylko potencjalnym zleceniem**. Jej wkład 0 względem pełnej historii nie oznacza, że nie wymaga wyjaśnienia lub dokumentów.

Pulpit obywatela zapamiętuje tylko identyfikator fikcyjnej osoby w `sessionStorage` pod kluczem `lata-pracy:profile:v1`. Nie jest to konto ani logowanie. Wejście do historii konkretnej osoby synchronizuje ten wybór z pulpitem.

W nowej sesji potencjalne okresy i ich nazwy dokumentów są domyślnie wybrane, a ich dostępność ma stan **„Nie wiem jeszcze”**. Wybory są wspólne dla ekranów i zapisywane osobno dla scenariuszy w `sessionStorage`: zachowują się po nawigacji i odświeżeniu w tej samej karcie. Zapisywane są tylko identyfikatory fikcyjnych okresów i dokumentów oraz deklaracje dostępności — bez plików, danych osobowych i treści wiadomości. Bieżący krok kreatora nie jest utrwalany. Przy zablokowanym zapisie przeglądarki aplikacja działa w pamięci, ale odświeżenie może usunąć wybory.

## Ekrany

| Adres             | Zawartość                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `/`               | Pulpit obywatela, wybór fikcyjnej osoby, wejście do usługi i następny krok                              |
| `/o-projekcie`    | Opis koncepcji, działania i granic prototypu                                                             |
| `/scenariusze`    | Kasia — zlecenie + etat, Marek — JDG + etat, Ola — nakładające się okresy                               |
| `/pulpit/kasia`   | Pulpit wybranego scenariusza; działa też dla `marek` i `ola`                                            |
| `/historia/kasia` | Interaktywna oś czasu; działa też dla `marek` i `ola`                                                   |
| `/demo`           | Krótka, interaktywna prezentacja historii Oli w trzech rozdziałach                                      |
| `/sprawa/kasia`   | Trzy kroki do lokalnego podsumowania dla kadr; działa też dla `marek` i `ola` |

## Kontrola jakości

```sh
npm run lint       # ESLint, bez dopuszczonych ostrzeżeń
npm run typecheck  # TypeScript w trybie strict
npm test           # obliczenia, spójność danych i interakcje React w jsdom
npm run build      # produkcyjny build Next.js
npm run check      # wszystkie powyższe kolejno
```

Testy obejmują m.in. lata przestępne, zmianę czasu, błędne daty, zagnieżdżone i wielokrotne nakładanie okresów, niezależny model zbiorów dla 100 historii, scenariusz Oli, filtry, sortowanie, szczegóły, eksport TXT, rozbicie dat na odcinki, porównanie warunkowe, wspólne wybory między ekranami, zapis sesji, ścieżkę brakującego dokumentu, odrębność dostępności i zakresu pakietu, bezpośredni eksport na końcu trzech kroków oraz awaryjne kopiowanie. jsdom nie sprawdza układu, kontrastu, natywnego zarządzania fokusem ani wyniku drukowania. Procedura sprawdzenia w przeglądarce znajduje się w [docs/TESTING.md](docs/TESTING.md).

GitHub Actions wykonuje `npm ci`, `npm run check` i `npm run build:static` dla Pull Requestów do `main`.

## Wersja produkcyjna lokalnie

```sh
npm run build
npm start
```

Standardowy build działa na hostingu obsługującym Next.js 16 i Node.js 22+. Dostępny jest również wariant statyczny:

```sh
npm run build:static
```

Polecenie przygotowuje katalog `out/` do hostingu statycznego; w tym wariancie każda znana trasa ma własny plik HTML. Nie uruchamiaj `npm start` do serwowania `out/`. Konfigurację publikacji prototypu w Sites zapisuje `.openai/hosting.json`. Pulpit obywatela opublikowano 12.11.2026 jako wersję 2 demo. Kontrola HTTPS potwierdziła nowy ekran główny, wszystkie 13 stron treści, próbki zasobów i nieznaną historię (404); szczegóły są w `docs/TESTING.md`. Przejście całej ścieżki w oknie prywatnym i na rzeczywistym telefonie pozostaje do ręcznego sprawdzenia.

## Technologie i struktura

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Lucide React, lokalne fonty Manrope i DM Sans, Vitest i Testing Library. `package-lock.json` utrwala wersje instalowane przez `npm ci`.

```text
src/app/          ekrany podstawowe, demo, przygotowanie sprawy, metadane i style
src/components/  interfejs, oś czasu, porównanie, pakiet i checklista
src/data/        lokalne, fikcyjne scenariusze
src/lib/         typy, źródła i czysta funkcja licząca unikalne dni
tests/           testy jednostkowe i integracyjne w jsdom
docs/            produkt, architektura, prawo, testowanie, dalszy rozwój
```

## Dokumentacja

- [Produkt i zakres prototypu](docs/PRODUCT.md)
- [Źródła, ograniczenia i prawne TODO](docs/LEGAL.md)
- [Architektura i sposób liczenia](docs/ARCHITECTURE.md)
- [Testowanie i dostępność](docs/TESTING.md)
- [Kierunki dalszej rozbudowy](docs/ROADMAP.md)
- [Dopasowanie do konkursu i stan przygotowania](docs/CONTEST.md)
- [Scenariusz prezentacji w 90 sekund](docs/PITCH.md)
- [Gotowy projekt opisu zgłoszenia](docs/SUBMISSION.md)
