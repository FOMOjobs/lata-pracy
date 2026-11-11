# Lata Pracy w mObywatel Challenge

## Kierunek zgłoszenia

**Jedna sprawa od początku do końca: od wcześniejszego okresu pracy do podsumowania dla kadr.** Lata Pracy są autorską koncepcją usługi, która mogłaby być częścią cyfrowych usług obywatelskich. Obecny prototyp działa samodzielnie i nie jest częścią oficjalnego mObywatela.

Informacje o konkursie sprawdzono 11.11.2026 na [stronie organizatora](https://mobywatel.ai/). Strona dopuszcza pojedynczą sprawę i wymaga klikalnego prototypu dostępnego bez logowania; podaje termin 30.11.2026 do końca dnia czasu polskiego. Polskie modele i technologie są mile widziane, lecz nieobowiązkowe. Przed wysłaniem trzeba sprawdzić aktualne zasady i działanie formularza.

## Co pokazujemy

| Obszar oceny wskazany przez organizatora | Rozwiązanie w projekcie                                                                                                                    | Dowód lub brakująca weryfikacja                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Prostota i wygoda                        | Jedno prowadzące porównanie; wybór okresu → dokumenty i braki → podsumowanie z drukiem i kopiowaniem                                   | `/sprawa/ola`; wybory wspólne dla ekranów i zachowane w sesji karty                            |
| Jedna kompletna sprawa                   | Brak dokumentu prowadzi do instrukcji i źródła; końcowa karta od razu udostępnia druk i kopiowanie, a TXT pozostaje opcją dodatkową | Funkcjonalna ścieżka; druk i przebieg z użytkownikami do sprawdzenia                           |
| Prywatność i kontrola                    | Dostępność jest deklaracją; opcjonalne „Dostosuj zawartość” oddziela zakres nazw od dostępności; karta i wiadomość zachowują ten sam zakres i braki            | Zapis sesji obejmuje wyłącznie identyfikatory i znaczniki; brak uploadu i rzeczywistej wysyłki |
| Dostępność                               | Prosty język, etykiety, klawiatura, jawny fokus, lista jako początek mobilnej historii, większe kontrolki, ograniczony ruch                                                             | Elementy zaimplementowane; audyt czytnika i kontrastu pozostaje do wykonania                   |
| Zrozumiały efekt                         | Przełączane porównanie i dokładne rozbicie nakładających się dat                                                                           | Ola: 1126 dni zlecenia = 945 w podstawie + 181 poza podstawą                                   |
| Link bez logowania                       | Kod aplikacji nie wymaga kont, API ani usług zewnętrznych do przejścia demonstracji                                                        | **Publiczny hosting i test incognito wymagają przygotowania przed zgłoszeniem**                |
| Polskie modele / technologie             | Autorski projekt i interfejs po polsku; obecna wersja nie wywołuje PLLuM ani Bielika                                                       | W zgłoszeniu nie deklarować działającej integracji z modelem                                   |

To mapowanie funkcji do kierunków opisanych na stronie konkursu, nie oficjalny system punktowy ani wynik porównawczy z innymi uczestnikami.

## Co wykorzystano z raportu badawczego

Przekazany raport pomógł wybrać trzy założenia: aktualny problem stażu, prowadzenie od odkrycia do działania i świadomy wybór zakresu informacji. Wdrożono je w porównaniu, demonstracji i przygotowaniu pakietu. Doprecyzowana ścieżka obsługuje także brak dowodu: wskazuje brakujący dokument, konkretny krok i źródło, bez zmieniania prawnego statusu okresu.

Domyślnie potencjalne okresy i nazwy ich dokumentów są wybrane, a dostępność ma stan „Nie wiem jeszcze”. Nie przedstawiamy takiej wartości domyślnej jako odnalezienia lub weryfikacji dokumentu. `sessionStorage` zachowuje wybory w tej samej karcie; nie przechowuje rzeczywistych dokumentów ani treści wiadomości.

Oceny typu „9,7/10” są opinią autora raportu. Jego wewnętrzne identyfikatory cytowań nie są odsyłaczami do publikacji. Statystyki, informacje o usługach, 24-miesięcznych terminach i deklaracje o zastosowaniu modeli wymagają osobnego sprawdzenia, zanim trafią do publicznego opisu. Prototyp nie używa tych liczb do obliczeń ani nie przyznaje prawa do urlopu.

## Pozycjonowanie

Prezentujemy usługę dla osoby, której historia łączy etat, zlecenia lub działalność. Jej wyróżniki to możliwość prześledzenia wyniku do dat, sprawdzenia warunków i samodzielnego wybrania zakresu projektu pakietu. Prototyp pokazuje tę ścieżkę w języku polskim na fikcyjnych danych.

Nie deklarujemy pomiaru przewagi nad prototypem organizatora: nie przeprowadzono porównawczego badania użyteczności. Nie dodajemy godła, oznaczeń oficjalnej aplikacji, wizerunków patronów ani pozornych potwierdzeń ZUS.

## Przed wysłaniem

1. Przygotować stabilny publiczny adres HTTPS bez bramki logowania, działający do ogłoszenia wyników; sprawdzić link w trybie prywatnym.
2. Przejść `/demo` → `/sprawa/ola` na telefonie, klawiaturą i z powiększeniem. Sprawdzić brak dokumentu, zachowanie wyborów po nawigacji i odświeżeniu, końcową kartę bez dodatkowego zatwierdzania, kopiowanie, wydruk i polskie znaki w pliku.
3. Dać 3–5 osobom zadanie: „sprawdź zlecenie Oli i przygotuj podsumowanie dla kadr”. Zmierzyć rzeczywisty czas, błędy i zrozumienie warunkowego wyniku. Nie przedstawiać planowanych pomiarów jako wykonanych badań.
4. Zweryfikować prawne TODO ze specjalistą. Oddzielić wersję demonstracyjną od wizji integracji.
5. Przećwiczyć [prezentację](PITCH.md), uzupełnić dane autora, właściwy link i [projekt opisu](SUBMISSION.md). Zgłoszenie i zgody wysyła właściciel projektu.
