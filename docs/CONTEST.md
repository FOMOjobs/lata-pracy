# Lata Pracy w mObywatel Challenge

## Kierunek zgłoszenia

**Jedna sprawa od początku do końca: od pominiętego okresu pracy do projektu pakietu dla pracodawcy.** Lata Pracy są autorską koncepcją usługi, która mogłaby być częścią cyfrowych usług obywatelskich. Obecny prototyp działa samodzielnie i nie jest częścią oficjalnego mObywatela.

Informacje o konkursie sprawdzono 11.11.2026 na [stronie organizatora](https://mobywatel.ai/). Strona dopuszcza pojedynczą sprawę i wymaga klikalnego prototypu dostępnego bez logowania; podaje termin 30.11.2026 do końca dnia czasu polskiego. Polskie modele i technologie są mile widziane, lecz nieobowiązkowe. Przed wysłaniem trzeba sprawdzić aktualne zasady i działanie formularza.

## Co pokazujemy

| Obszar oceny wskazany przez organizatora | Rozwiązanie w projekcie                                                                          | Dowód lub brakująca weryfikacja                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Prostota i wygoda                        | Wybór okresu → zakres nazw dokumentów → podgląd → potwierdzenie symulacji                        | `/sprawa/ola`, testy pełnej ścieżki                                             |
| Jedna kompletna sprawa                   | Użytkownik kończy z kartą oraz projektem wiadomości, które może skopiować, pobrać lub wydrukować | Funkcjonalna ścieżka; druk do sprawdzenia w przeglądarce                        |
| Prywatność i kontrola                    | Użytkownik wybiera okresy i nazwy dokumentów; ten sam zakres trafia do karty i wiadomości        | Testy pomijania niewybranych nazw; brak uploadu i rzeczywistej wysyłki          |
| Dostępność                               | Prosty język, etykiety, klawiatura, jawny fokus, widok listy, ograniczony ruch                   | Elementy zaimplementowane; audyt czytnika i kontrastu pozostaje do wykonania    |
| Zrozumiały efekt                         | Przełączane porównanie i dokładne rozbicie nakładających się dat                                 | Ola: 1126 dni zlecenia = 945 w podstawie + 181 poza podstawą                    |
| Link bez logowania                       | Kod aplikacji nie wymaga kont, API ani usług zewnętrznych do przejścia demonstracji              | **Publiczny hosting i test incognito wymagają przygotowania przed zgłoszeniem** |
| Polskie modele / technologie             | Autorski projekt i interfejs po polsku; obecna wersja nie wywołuje PLLuM ani Bielika             | W zgłoszeniu nie deklarować działającej integracji z modelem                    |

To mapowanie funkcji do kierunków opisanych na stronie konkursu, nie oficjalny system punktowy ani wynik porównawczy z innymi uczestnikami.

## Co wykorzystano z raportu badawczego

Przekazany raport pomógł wybrać trzy założenia: aktualny problem stażu, prowadzenie od odkrycia do działania i świadomy wybór zakresu informacji. Wdrożono je w porównaniu, demonstracji i przygotowaniu pakietu.

Oceny typu „9,7/10” są opinią autora raportu. Jego wewnętrzne identyfikatory cytowań nie są odsyłaczami do publikacji. Statystyki, informacje o usługach, 24-miesięcznych terminach i deklaracje o zastosowaniu modeli wymagają osobnego sprawdzenia, zanim trafią do publicznego opisu. Prototyp nie używa tych liczb do obliczeń ani nie przyznaje prawa do urlopu.

## Pozycjonowanie

Prezentujemy usługę dla osoby, której historia łączy etat, zlecenia lub działalność. Jej wyróżniki to możliwość prześledzenia wyniku do dat, sprawdzenia warunków i samodzielnego wybrania zakresu projektu pakietu. Prototyp pokazuje tę ścieżkę w języku polskim na fikcyjnych danych.

Nie deklarujemy pomiaru przewagi nad prototypem organizatora: nie przeprowadzono porównawczego badania użyteczności. Nie dodajemy godła, oznaczeń oficjalnej aplikacji, wizerunków patronów ani pozornych potwierdzeń ZUS.

## Przed wysłaniem

1. Przygotować stabilny publiczny adres HTTPS bez bramki logowania, działający do ogłoszenia wyników; sprawdzić link w trybie prywatnym.
2. Przejść `/demo` → `/sprawa/ola` na telefonie, klawiaturą i z powiększeniem. Sprawdzić wydruk i polskie znaki w pliku.
3. Dać 3–5 osobom zadanie: „sprawdź zlecenie Oli i przygotuj projekt pakietu”. Zmierzyć rzeczywisty czas, błędy i zrozumienie warunkowego wyniku. Nie przedstawiać planowanych pomiarów jako wykonanych badań.
4. Zweryfikować prawne TODO ze specjalistą. Oddzielić wersję demonstracyjną od wizji integracji.
5. Przećwiczyć [prezentację](PITCH.md), uzupełnić dane autora, właściwy link i [projekt opisu](SUBMISSION.md). Zgłoszenie i zgody wysyła właściciel projektu.
