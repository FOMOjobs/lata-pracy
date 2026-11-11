# Testowanie i dostępność

## Automatyczna kontrola

Uruchom `npm ci`, następnie `npm run check`.

| Polecenie           | Zakres                                                |
| ------------------- | ----------------------------------------------------- |
| `npm run lint`      | ESLint, reguły Next.js i TypeScript, zero ostrzeżeń   |
| `npm run typecheck` | TypeScript strict bez generowania plików JS           |
| `npm test`          | Vitest + jsdom, testy obliczeń, danych i interakcji   |
| `npm run build`     | Produkcyjna kompilacja oraz generowanie stron Next.js |

Testy algorytmu zawierają niezależny model przypisujący konkretne dni do zbiorów dla 100 deterministycznie wygenerowanych historii. Testy interfejsu używają Testing Library i user-event. Zaznaczenie dokumentu jest sprawdzane pod kątem braku zmiany statusów; eksport jest czytany i kontrolowany pod kątem ograniczeń oraz właściwej liczby dni.

jsdom nie renderuje CSS ani natywnej warstwy modalnej. `showModal` i `close` są w testach zastąpione minimalnymi funkcjami ustawiającymi stan dialogu. Test cancel sprawdza obsługę zdarzenia, nie fizycznego klawisza Escape ani zachowania systemowego fokusu.

Weryfikacja lokalna 11.11.2026: lint bez ostrzeżeń, kontrola typów, **58 testów w 6 plikach** i produkcyjny build zakończyły się powodzeniem. Build wygenerował start, scenariusze, demo oraz pulpity, osie i przygotowanie sprawy dla wszystkich trzech osób. Skrypt kontroli typów najpierw generuje typy tras Next.js, aby działał również w świeżym checkoutcie przed pierwszym buildem.

Nowe testy obejmują dokładne odcinki pokrycia dat, nakładanie dwóch wybranych okresów, wybór zakresu, spójność karty z wiadomością, blokadę zakończenia bez potwierdzenia symulacji, schowek i jego odmowę. Test drukowania sprawdza wywołanie lokalnego `window.print`, nie wygląd wydruku. Kontrast wybranych nowych par kolorów obliczono statycznie; nie jest to audyt całego wyrenderowanego interfejsu.

## Ręczne sprawdzenie w przeglądarce

Uruchom `npm run dev`, otwórz adres z terminala.

1. Sprawdź całą ścieżkę: start → scenariusz → pulpit → oś → szczegóły → dokumenty → pobranie TXT.
2. Powtórz ją dla Kasi, Marka i Oli. Zmień scenariusz selektorem zarówno na pulpicie, jak i osi.
3. U Oli porównaj pełny okres zlecenia z wkładem 181 dni. Potwierdź 945 dni zlecenia widocznych już w etacie, 184 powtórzone dni dodatkowej współpracy oraz 1129 powtórzeń łącznie.
4. Zaznacz dokument, zamknij i ponownie otwórz dialog w tym samym widoku. Oznaczenie powinno pozostać. Po nawigacji do innego ekranu powinno zniknąć, zgodnie z komunikatem.
5. Przełącz filtry, kolejność i widok listy. Liczby całej historii nie powinny się zmieniać.
6. Otwórz nieistniejący adres `/historia/nieznany` i sprawdź ekran 404 z powrotem do scenariuszy.
7. Sprawdź plik TXT: polskie znaki, nazwa scenariusza, statusy, warunki, TODO i oznaczenie demonstracji.
8. Na pulpicie włącz i wyłącz potencjalny okres w porównaniu. Wartość powinna wracać do podstawy. Rozwiń wyjaśnienie i porównaj daty z osią.
9. Przejdź trzy rozdziały `/demo`, następnie całą ścieżkę `/sprawa/ola`. Odznacz jedną nazwę dokumentu i upewnij się, że znika zarówno z karty, jak i wiadomości. Bez potwierdzenia symulacji nie powinno dać się jej zakończyć.
10. Sprawdź kopiowanie (także gdy przeglądarka odmawia dostępu do schowka), TXT i wydruk / zapis PDF. Wydruk ma zawierać tylko kartę z wybranym zakresem, źródłami i oznaczeniem demonstracji. Nic nie powinno być wysyłane ani załączane.

## Klawiatura i czytnik ekranu

- Użyj wyłącznie Tab, Shift+Tab, Enter, Spacja, strzałki dla selektorów i Escape.
- Pierwszy Tab powinien ujawnić „Przejdź do treści”. Kontroluj widoczność fokusu i kolejność nawigacji.
- Otwórz dialog z klawiatury: fokus powinien wejść do niego i pozostać w nim do zamknięcia. Escape powinien zamknąć okno, a fokus wrócić do elementu otwierającego. Sprawdź też zamknięcie przyciskiem i kliknięciem tła.
- Potwierdź, że kliknięcie zawartości dialogu nie zamyka go.
- Sprawdź etykiety formularzy, nagłówki, tekstowe statusy, aktywną nawigację i odczyt nowych komunikatów.
- Zweryfikuj działanie przy powiększeniu do 200% oraz preferencji ograniczonego ruchu.

## Rozmiary i kontrast

Sprawdź 320, 375, 768, 1024 i 1440 px szerokości. Strona nie powinna przewijać się poziomo; tylko sam obszar osi może mieć poziomy scroll. Dialog musi mieścić się w oknie z własnym przewijaniem. Zweryfikuj tekst, fokus i interakcje za pomocą narzędzia kontrastu i audytu dostępności. Nie deklarujemy formalnej zgodności WCAG bez audytu.

## Ograniczenia weryfikacji pierwszego PR

W środowisku implementacji nie było narzędzia `cua_repl.js` do sterowania współdzieloną przeglądarką. Nie wykonano wizualnego przeglądu, testów E2E w prawdziwej przeglądarce ani pomiaru kontrastu. Wyniki lint, typów, testów jsdom i produkcyjnego buildu są raportowane w PR; powyższe kroki manualne pozostają do wykonania przed prezentacją konkursową.
