# Testowanie i dostępność

## Automatyczna kontrola

Uruchom `npm ci`, następnie `npm run check`.

| Polecenie           | Zakres                                                |
| ------------------- | ----------------------------------------------------- |
| `npm run lint`      | ESLint, reguły Next.js i TypeScript, zero ostrzeżeń   |
| `npm run typecheck` | TypeScript strict bez generowania plików JS           |
| `npm test`          | Vitest + jsdom, testy obliczeń, danych i interakcji   |
| `npm run build`     | Produkcyjna kompilacja oraz generowanie stron Next.js |

Testy algorytmu zawierają niezależny model przypisujący konkretne dni do zbiorów dla 100 deterministycznie wygenerowanych historii. Testy interfejsu używają Testing Library i user-event. Zmiana deklaracji dostępności dokumentu jest sprawdzana pod kątem braku zmiany statusów okresów i wyniku; eksport jest czytany i kontrolowany pod kątem ograniczeń, właściwej liczby dni, zakresu i zadeklarowanych braków.

jsdom nie renderuje CSS ani natywnej warstwy modalnej. `showModal` i `close` są w testach zastąpione minimalnymi funkcjami ustawiającymi stan dialogu. Test cancel sprawdza obsługę zdarzenia, nie fizycznego klawisza Escape ani zachowania systemowego fokusu.

Weryfikacja lokalna 11.11.2026: lint bez ostrzeżeń, `next typegen` i kontrola typów TypeScript, **76 testów w 9 plikach** oraz produkcyjny build zakończyły się powodzeniem. Build wygenerował start, scenariusze, demo oraz pulpity, osie i przygotowanie sprawy dla wszystkich trzech osób. Skrypt kontroli typów najpierw generuje typy tras Next.js, aby działał również w świeżym checkoutcie przed pierwszym buildem.

Testy obejmują dokładne odcinki pokrycia dat, nakładanie dwóch wybranych okresów, wspólne wybory między ekranami, odtwarzanie i walidację zapisu sesji, ścieżkę „Nie mam dokumentu”, niezależność dostępności od zakresu pakietu, spójność karty z wiadomością, brak eksportu przed potwierdzeniem oraz schowek i jego odmowę. Test drukowania sprawdza wywołanie lokalnego `window.print`, nie wygląd wydruku. Kontrast wybranych par kolorów wcześniejszej iteracji obliczono statycznie; nie jest to audyt całego wyrenderowanego interfejsu.

## Ręczne sprawdzenie w przeglądarce

Uruchom `npm run dev`, otwórz adres z terminala.

1. Sprawdź całą ścieżkę: start → scenariusz → porównanie → szczegóły i dokumenty → przygotowanie sprawy → podgląd karty → potwierdzenie → wydruk lub dodatkowy eksport.
2. Powtórz ją dla Kasi, Marka i Oli. Zmień scenariusz selektorem zarówno na pulpicie, jak i osi.
3. U Oli porównaj pełny okres zlecenia z wkładem 181 dni. Potwierdź 945 dni zlecenia widocznych już w etacie, 184 powtórzone dni dodatkowej współpracy oraz 1129 powtórzeń łącznie.
4. W dokumentach ustaw „Nie mam dokumentu”. Rozwiń „Jak uzupełnić ten brak?” i sprawdź konkretny następny krok oraz odsyłacz do źródła. Zmień stan na „Mam — do sprawdzenia”, potem „Nie wiem jeszcze”. Żaden wybór nie powinien zatwierdzać dokumentu, zmieniać statusu okresu ani liczby dni.
5. Przełącz filtry, kolejność i widok listy. Liczby całej historii nie powinny się zmieniać.
6. Otwórz nieistniejący adres `/historia/nieznany` i sprawdź ekran 404 z powrotem do scenariuszy.
7. Pod „Więcej” na pulpicie sprawdź pełne podsumowanie TXT: polskie znaki, nazwa scenariusza, statusy, warunki, TODO i oznaczenie demonstracji.
8. Na pulpicie włącz i wyłącz potencjalny okres w porównaniu. Wartość powinna wracać do podstawy. Rozwiń wyjaśnienie i porównaj daty z osią. Trzy kategorie całej historii poniżej nie powinny się zmieniać; potwierdź ich wyraźny podpis.
9. Przejdź z wybranym zakresem do `/sprawa/ola`, cofnij się i odśwież kartę. Okresy, zakres nazw i deklaracje dostępności powinny pozostać; po nowym wejściu krok kreatora oraz potwierdzenie wracają do początku. Przełącz scenariusz i sprawdź oddzielność jego wyborów.
10. W przygotowaniu sprawy ustaw dokument jako brakujący, ale pozostaw jego nazwę w projekcie. Brak powinien znaleźć się na karcie i w wiadomości. Odznacz nazwę i sprawdź, że znika z obu; jej dostępność ma pozostać niezależna. Bez wybranych nazw karta musi informować o konieczności uzupełnienia.
11. Przed potwierdzeniem sprawdź sam podgląd karty: nie powinno być eksportów ani pełnej wiadomości. Po zaznaczeniu zrozumienia symulacji kliknij „Przygotuj projekt”. Główne działanie to „Drukuj kartę”; wiadomość, TXT i kopiowanie są pod „Więcej możliwości”. Komunikat końcowy ma uczciwie pokazać pozostałe braki.
12. Sprawdź kopiowanie (także gdy przeglądarka odmawia dostępu do schowka), TXT i wydruk / zapis PDF. Wydruk ma zawierać tylko kartę z wybranym zakresem, deklaracjami, źródłami i oznaczeniem demonstracji. Nic nie powinno być wysyłane ani załączane.
13. Sprawdź aplikację przy zablokowanym zapisie przeglądarki: powinna nadal działać w pamięci. Odświeżenie może wtedy przywrócić wartości domyślne; nie powinno sugerować odzyskania wcześniej niezapisanych wyborów.

## Klawiatura i czytnik ekranu

- Użyj wyłącznie Tab, Shift+Tab, Enter, Spacja, strzałki dla selektorów i Escape.
- Pierwszy Tab powinien ujawnić „Przejdź do treści”. Kontroluj widoczność fokusu i kolejność nawigacji.
- Otwórz dialog z klawiatury: fokus powinien wejść do niego i pozostać w nim do zamknięcia. Escape powinien zamknąć okno, a fokus wrócić do elementu otwierającego. Sprawdź też zamknięcie przyciskiem i kliknięciem tła.
- Potwierdź, że kliknięcie zawartości dialogu nie zamyka go.
- Sprawdź etykiety formularzy, nagłówki, tekstowe statusy, aktywną nawigację i odczyt nowych komunikatów.
- Zweryfikuj działanie przy powiększeniu do 200% oraz preferencji ograniczonego ruchu.

## Rozmiary i kontrast

Sprawdź 320, 375, 768, 1024 i 1440 px szerokości. Strona nie powinna przewijać się poziomo; tylko sam obszar osi może mieć poziomy scroll. Dialog musi mieścić się w oknie z własnym przewijaniem. Zweryfikuj tekst, fokus i interakcje za pomocą narzędzia kontrastu i audytu dostępności. Nie deklarujemy formalnej zgodności WCAG bez audytu.

## Ograniczenia weryfikacji

W środowisku implementacji nie było narzędzia `cua_repl.js` do sterowania współdzieloną przeglądarką. Nie wykonano wizualnego przeglądu, testów E2E w prawdziwej przeglądarce, pełnego audytu kontrastu wyrenderowanego interfejsu ani badań z użytkownikami. Wyniki lint, typów, testów jsdom i produkcyjnego buildu są raportowane w PR; powyższe kroki manualne pozostają do wykonania przed prezentacją konkursową.
