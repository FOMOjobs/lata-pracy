# Testowanie i dostępność

## Automatyczna kontrola

Uruchom `npm ci`, następnie `npm run check`.

| Polecenie           | Zakres                                                |
| ------------------- | ----------------------------------------------------- |
| `npm run lint`      | ESLint, reguły Next.js i TypeScript, zero ostrzeżeń   |
| `npm run typecheck` | TypeScript strict bez generowania plików JS           |
| `npm test`          | Vitest + jsdom, testy obliczeń, danych i interakcji   |
| `npm run build`     | Produkcyjna kompilacja oraz generowanie stron Next.js |
| `npm run build:static` | Osobny build eksportu statycznego do `out/`, używany przy publikacji |

Testy algorytmu zawierają niezależny model przypisujący konkretne dni do zbiorów dla 100 deterministycznie wygenerowanych historii. Testy interfejsu używają Testing Library i user-event. Zmiana deklaracji dostępności dokumentu jest sprawdzana pod kątem braku zmiany statusów okresów i wyniku; eksport jest czytany i kontrolowany pod kątem ograniczeń, właściwej liczby dni, zakresu i zadeklarowanych braków.

jsdom nie renderuje CSS ani natywnej warstwy modalnej. `showModal` i `close` są w testach zastąpione minimalnymi funkcjami ustawiającymi stan dialogu. Test cancel sprawdza obsługę zdarzenia, nie fizycznego klawisza Escape ani zachowania systemowego fokusu.

Weryfikacja lokalna **12.11.2026**, po dodaniu pulpitu obywatela: `npm run check` zakończyło się powodzeniem — lint bez ostrzeżeń, `next typegen` i TypeScript strict, **102 testy w 12 plikach** oraz produkcyjny build. Osobny `npm run build:static` także przeszedł i przygotował `out/`. Buildy obejmują nowy pulpit, `/o-projekcie`, scenariusze, demo oraz trasy wszystkich trzech osób. Cztery arkusze CSS przeszły parsowanie PostCSS, a `git diff --check` nie wykazał błędów. Skrypt kontroli typów najpierw generuje typy tras Next.js, aby działał również w świeżym checkoutcie przed pierwszym buildem.

Testy obejmują dokładne odcinki pokrycia dat, nakładanie dwóch wybranych okresów, wspólne wybory między ekranami, odtwarzanie i walidację zapisu sesji, ścieżkę „Nie mam dokumentu”, niezależność dostępności od zakresu pakietu, spójność karty z wiadomością, bezpośredni eksport na końcu trzech kroków oraz schowek i jego odmowę. Test drukowania sprawdza wywołanie lokalnego `window.print`, nie wygląd wydruku. Kontrast wybranych par kolorów nowego pulpitu obliczono statycznie i poprawiono teksty pomocnicze oraz stany wyboru; nie jest to audyt całego wyrenderowanego interfejsu.

Wcześniejszą wersję publicznego [demo](https://lata-pracy-demo.verbaltoucan.chatgpt.site), sprzed dodania pulpitu obywatela, wdrożono 12.11.2026. Kontrola HTTP bez nagłówków Cookie i Authorization potwierdziła 200 dla wszystkich 12 stron treści oraz próbek JS/CSS i 404 dla `/historia/nieznany/`. To kontrola publikacji i routingu, nie test interakcji JavaScript ani sesja w prywatnym oknie przeglądarki.

Nowa iteracja obejmuje testy wyboru fikcyjnej osoby, stabilnego SSR, walidacji i blokady zapisu profilu, nawigacji, zachowania deklaracji i następnego kroku pulpitu. Po dodaniu `/o-projekcie` kontrola statycznych stron i publikacji obejmuje 13 adresów treści.

## Ręczne sprawdzenie w przeglądarce

Uruchom `npm run dev`, otwórz adres z terminala.

1. Sprawdź całą ścieżkę: pulpit obywatela `/` → wybór Oli → „Sprawdź swoją historię pracy” → `/pulpit/ola` → szczegóły → „Przygotuj podsumowanie dla kadr” → trzy kroki → końcowa karta → powrót do pulpitu obywatela. Osoba i deklaracje muszą pozostać; nie należy sugerować zapisanego PDF ani urzędowego rozstrzygnięcia.
2. Powtórz ją dla Kasi, Marka i Oli. Na pulpicie obywatela zmień osobę i sprawdź odsyłacze w menu oraz główne CTA. Zmień scenariusz również w module i na osi, a potem wróć do `/`: pulpit ma wskazać tę samą osobę. Odśwież stronę i sprawdź zachowanie sesji.
3. U Oli porównaj pełny okres zlecenia z wkładem 181 dni. Potwierdź 945 dni zlecenia widocznych już w etacie. Przy dodatkowej współpracy sprawdź osobno 62 dni pokryte etatem i 122 dni pokryte tylko potencjalnym zleceniem. Jej 184 powtórzone dni dają wkład 0 wyłącznie względem pełnej pokazanej historii; nie powinno paść zalecenie pominięcia dokumentów. Pełna historia ma 1129 powtórzeń wystąpień dni.
4. W dokumentach ustaw „Nie mam dokumentu”. Rozwiń „Jak uzupełnić ten brak?” i sprawdź konkretny następny krok oraz odsyłacz do źródła. Zmień stan na „Mam — do sprawdzenia”, potem „Nie wiem jeszcze”. Żaden wybór nie powinien zatwierdzać dokumentu, zmieniać statusu okresu ani liczby dni.
5. Na telefonie potwierdź początkowy widok listy, a na komputerze oś. Ręcznie przełącz widok i zmień szerokość: wybór użytkownika ma pozostać. Przełącz filtry i kolejność. Liczby całej historii nie powinny się zmieniać.
6. Otwórz nieistniejący adres `/historia/nieznany` i sprawdź ekran 404 z powrotem do scenariuszy.
7. Pod „Więcej” na pulpicie sprawdź pełne podsumowanie TXT: polskie znaki, nazwa scenariusza, statusy, warunki, TODO i oznaczenie demonstracji.
8. Na pulpicie włącz i wyłącz potencjalny okres w porównaniu. Wartość powinna wracać do podstawy. Rozwiń wyjaśnienie i porównaj daty z osią. Rozwiń „Cała historia”: jej liczby nie powinny się zmieniać wraz z wyborem w porównaniu. Kategoria wymagająca weryfikacji ma wyraźnie pokazać liczbę okresów do wyjaśnienia, także przy zerowym dodatkowym wkładzie.
9. Przejdź z wybranym zakresem do `/sprawa/ola`, cofnij się i odśwież kartę. Okresy, zakres nazw i deklaracje dostępności powinny pozostać; po nowym wejściu kreator wraca do pierwszego kroku. Przełącz scenariusz i sprawdź oddzielność jego wyborów.
10. W kroku dokumentów ustaw brak i pozostaw nazwę w zakresie. Brak powinien znaleźć się na karcie i w wiadomości. Rozwiń „Dostosuj zawartość”, odznacz nazwę i sprawdź, że znika z obu; dostępność ma pozostać niezależna. Bez wybranych nazw karta musi informować o konieczności uzupełnienia. Podstawowe deklaracje nie powinny wymagać otwarcia tego rozwinięcia.
11. Przejdź do trzeciego kroku „Podsumowanie dla kadr”. Karta oraz „Drukuj / zapisz jako PDF” i „Kopiuj wiadomość do kadr” mają być dostępne od razu, bez checkboxa oświadczenia lub kolejnego zatwierdzenia. Pełny tekst i TXT są pod „Więcej możliwości”. Sprawdź spokojny komunikat o lokalnym podsumowaniu i braku wysyłki oraz widoczne pozostałe braki.
12. Sprawdź kopiowanie (także gdy przeglądarka odmawia dostępu do schowka), TXT i wydruk / zapis PDF. Wydruk ma zawierać tylko kartę z wybranym zakresem, deklaracjami, źródłami i oznaczeniem demonstracji. Nic nie powinno być wysyłane ani załączane.
13. Odznacz w module wszystkie potencjalne okresy i wróć do pulpitu obywatela: następny krok powinien kierować do wyboru okresów. Przy wybranych okresach zmieniaj dostępność dokumentów; pomoc ma odpowiadać tym deklaracjom bez przyznawania uprawnień. Sprawdź także działające `/o-projekcie`, `/demo` i `/scenariusze`.
14. Sprawdź aplikację przy zablokowanym zapisie przeglądarki: powinna nadal działać w pamięci. Odświeżenie może wtedy przywrócić wartości domyślne; nie powinno sugerować odzyskania wcześniej niezapisanych wyborów.

## Klawiatura i czytnik ekranu

- Użyj wyłącznie Tab, Shift+Tab, Enter, Spacja, strzałki dla selektorów i Escape.
- Pierwszy Tab powinien ujawnić „Przejdź do treści”. Kontroluj widoczność fokusu i kolejność nawigacji.
- Otwórz dialog z klawiatury: fokus powinien wejść do niego i pozostać w nim do zamknięcia. Escape powinien zamknąć okno, a fokus wrócić do elementu otwierającego. Sprawdź też zamknięcie przyciskiem i kliknięciem tła.
- Potwierdź, że kliknięcie zawartości dialogu nie zamyka go.
- Sprawdź etykiety formularzy, nagłówki, tekstowe statusy, aktywną nawigację i odczyt nowych komunikatów.
- Zweryfikuj działanie przy powiększeniu do 200% oraz preferencji ograniczonego ruchu.

## Rozmiary i kontrast

Sprawdź 320, 360, 390, 430, 768, 1024 i 1440 px szerokości. Na pulpicie obywatela sprawdź dolną nawigację i bezpieczny odstęp od dołu ekranu; nie może zasłaniać treści ani działań. Zweryfikuj widoczność głównego CTA przed ilustracją. Na telefonie zweryfikuj realne obszary dotyku małych przełączników i zamykania dialogu, czytelność tekstów pomocniczych oraz położenie głównego CTA na stronie startowej. Strona nie powinna przewijać się poziomo; tylko sam obszar osi może mieć poziomy scroll. Dialog musi mieścić się w oknie z własnym przewijaniem. Zweryfikuj tekst, fokus i interakcje za pomocą narzędzia kontrastu i audytu dostępności. Nie deklarujemy formalnej zgodności WCAG bez audytu.

## Ograniczenia weryfikacji

W środowisku implementacji nie było narzędzia `cua_repl.js` do sterowania współdzieloną przeglądarką; `sites-preview status` zgłosiło „preview relay unavailable”. Nie wykonano wizualnego przeglądu, testów E2E w prawdziwej przeglądarce, pełnego audytu kontrastu wyrenderowanego interfejsu ani badań z użytkownikami. Wyniki lint, typów, testów jsdom i obu buildów są raportowane w PR; powyższe kroki manualne pozostają do wykonania przed prezentacją konkursową.
