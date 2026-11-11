# Lata Pracy

**Twoja praca się liczy.** Niezależny, polskojęzyczny prototyp konkursowy, który pomaga uporządkować historię zawodową i zobaczyć, jakie okresy warto zweryfikować w związku ze zmianami przepisów w 2026 r.

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

   Polecenie pobiera gałąź `main`. Jeśli sprawdzasz zmiany z Pull Requestu, przełącz się na gałąź wskazaną w tym PR.

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

Na krótki pokaz wybierz **„Zobacz różnicę w 90 sekund”** albo otwórz `/demo`. Trzy rozdziały prowadzą od historii Oli przez rozbicie 1126 dni zlecenia na 945 dni już w podstawie i 181 nowych dni, aż do podsumowania dla kadr.

1. Na stronie startowej kliknij **„Sprawdź swoją historię pracy”**.
2. Wybierz **Kasię**. Pulpit prowadzi przez jedno porównanie i główne działanie **„Przygotuj podsumowanie dla kadr”**. Rozwiń **„Cała historia”**, aby zobaczyć kategorie całego fikcyjnego zestawienia, niezależne od wybranego porównania.
3. Kliknij okres albo **„Otwórz oś czasu”**. Otwórz szczegóły, przeczytaj warunki i zobacz dokumenty do przygotowania.
4. Wypróbuj filtry, widok listy i kolejność okresów. Na telefonie historia rozpoczyna się od listy; możesz przełączyć ją na oś z własnym przewijaniem poziomym. Oba widoki otwierają te same szczegóły.
5. Przełącz scenariusz na **Olę**. Jej zlecenie ma **181 dni poza etatami**, potencjalnie do sprawdzenia; pokrywających się dni nie doliczamy drugi raz. W szczegółach dodatkowej współpracy zobaczysz **62 dni pokryte etatem i 122 dni pokryte tylko potencjalnym zleceniem**. Wynik 0 względem całej historii nie oznacza, że ten okres lub jego dokumenty nie wymagają uwagi.
6. Otwórz **„Listę dokumentów”**. Przy przykładowym dokumencie ustaw **„Nie mam dokumentu”**, a potem rozwiń **„Jak uzupełnić ten brak?”**. Zobaczysz konkretny następny krok i oficjalne źródło. Dostępność jest deklaracją, nie weryfikacją dokumentu ani prawa do zaliczenia okresu.
7. W głównym porównaniu włącz lub wyłącz wcześniejszy okres i rozwiń wyjaśnienie dat. Rozwinięcie **„Cała historia”** dotyczy pełnego zestawu, a kategoria wymagająca weryfikacji podkreśla liczbę okresów do wyjaśnienia. **„Więcej” → „Pobierz podsumowanie całej historii TXT”** zapisuje pełne fikcyjne zestawienie; **„Jak czytać wynik”** otwiera zasady i źródła.
8. Kliknij **„Przygotuj podsumowanie dla kadr”**. Przejdź trzy kroki: **„Wybierz okresy” → „Sprawdź dokumenty” → „Podsumowanie dla kadr”**. Wybory i deklaracje przejdą między ekranami. Jeśli chcesz ograniczyć listę nazw dokumentów, rozwiń **„Dostosuj zawartość”**; dostępność i zakres pozostają osobnymi wyborami.
9. Na końcu od razu dostępne są **„Drukuj / zapisz jako PDF”** i **„Kopiuj wiadomość do kadr”**. Pełny tekst i TXT znajdziesz pod **„Więcej możliwości”**. Braki pozostają na karcie i w wiadomości. Nie ma checkboxa udającego zatwierdzenie wniosku; podsumowanie powstaje lokalnie i nic nie jest wysyłane. Zapis PDF zależy od opcji systemowego okna drukowania.

W nowej sesji potencjalne okresy i ich nazwy dokumentów są domyślnie wybrane, a ich dostępność ma stan **„Nie wiem jeszcze”**. Wybory są wspólne dla ekranów i zapisywane osobno dla scenariuszy w `sessionStorage`: zachowują się po nawigacji i odświeżeniu w tej samej karcie. Zapisywane są tylko identyfikatory fikcyjnych okresów i dokumentów oraz deklaracje dostępności — bez plików, danych osobowych i treści wiadomości. Bieżący krok kreatora nie jest utrwalany. Przy zablokowanym zapisie przeglądarki aplikacja działa w pamięci, ale odświeżenie może usunąć wybory.

## Ekrany

| Adres             | Zawartość                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `/`               | Strona startowa, CTA, wyjaśnienie działania                                                             |
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

GitHub Actions wykonuje `npm ci` i `npm run check` dla Pull Requestów do `main`.

## Wersja produkcyjna lokalnie

```sh
npm run build
npm start
```

Standardowy build działa na hostingu obsługującym Next.js 16 i Node.js 22+. Dostępny jest również wariant statyczny:

```sh
npm run build:static
```

Polecenie przygotowuje katalog `out/` do hostingu statycznego; w tym wariancie każda znana trasa ma własny plik HTML. Nie uruchamiaj `npm start` do serwowania `out/`. Konfigurację publikacji prototypu w Sites zapisuje `.openai/hosting.json`. Publiczne demo opublikowano 12.11.2026; sprawdzono odpowiedzi HTTPS dla 12 stron oraz nieznanego adresu (404). Przejście całej ścieżki w oknie prywatnym i na rzeczywistym telefonie pozostaje do ręcznego sprawdzenia.

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
