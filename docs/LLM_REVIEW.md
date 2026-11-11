# Lata Pracy — pełny opis prototypu i materiał do niezależnej recenzji

> Dokument do przekazania innemu modelowi językowemu, projektantowi UX lub recenzentowi technicznemu. Opisuje istniejący prototyp, jego ograniczenia i pytania do oceny. Fragmenty opisujące przyszłość nie oznaczają wdrożonych funkcji.
>
> Stan opisu: 11 listopada 2026 r. Język produktu: polski. Hasło: **„Twoja praca się liczy”**.

## 1. Streszczenie w jednej minucie

**Lata Pracy pomagają uporządkować wcześniejsze okresy aktywności zawodowej i przygotować projekt sprawy do dalszego sprawdzenia z pracodawcą.** Prototyp pokazuje problem na trzech fikcyjnych historiach: Kasi, Marka i Oli. Pozwala zobaczyć okresy przyjęte w przykładzie jako uwzględnione, okresy potencjalne oraz wymagające weryfikacji. Wyjaśnia wynik za pomocą konkretnych dat, zamiast ograniczać się do jednej liczby.

Najważniejsza demonstracja dotyczy Oli: jej zlecenie trwa 1126 dni, ale 945 z nich przypada na czas już pokryty etatem. Potencjalnie nowy fragment ma więc **181 dni**. Aplikacja pokazuje to rozbicie i nie dolicza całego zlecenia ponownie.

Użytkownik może następnie wybrać zakres projektu sprawy, określić deklarowaną dostępność dokumentów, dostać instrukcję dalszego działania przy brakach, obejrzeć kartę i jawnie potwierdzić przygotowanie projektu. Dopiero wtedy dostępne są druk, wiadomość do skopiowania i eksport TXT. Nic nie jest wysyłane do urzędu ani pracodawcy.

To samodzielny, niezależny prototyp konkursowy. Nie korzysta z rzeczywistych danych, integracji ZUS, logowania ani modelu językowego. Statusy prawne okresów są założeniami fikcyjnych scenariuszy, a nie wynikiem automatycznego rozstrzygnięcia.

**Ocena telefonu:** w kodzie są konkretne rozwiązania responsywne i dostępnościowe. Nie wykonano jeszcze pełnego przeglądu w prawdziwej przeglądarce, na telefonach ani badania użyteczności. Uczciwe stwierdzenie brzmi: „responsywność została zaimplementowana i wymaga sprawdzenia na urządzeniach”. Nie ma podstaw do deklaracji „idealnie działa na każdym telefonie”.

**Cel kolejnej iteracji:** dopracować jedną przekonującą ścieżkę od odkrycia problemu do przygotowania sprawy. Największą wartość mogą teraz dać testy z ludźmi, kontrola telefonu i wydruku oraz uproszczenie niejasnych miejsc.

## 2. Jak czytać ten dokument

Rozróżniamy cztery rodzaje informacji:

- **Zaimplementowane:** funkcja istnieje w kodzie.
- **Sprawdzone automatycznie:** określone zachowanie objęto testami albo kontrolą kompilacji.
- **Do sprawdzenia ręcznie:** kod wskazuje zamierzone zachowanie, ale nie ma potwierdzenia z rzeczywistego urządzenia lub użytkownika.
- **Kierunek rozwoju:** propozycja, której nie należy przedstawiać jako działającej funkcji.

Przejście testów jednostkowych nie potwierdza jakości wizualnej, zgodności prawnej, łatwości obsługi ani gotowości do wdrożenia produkcyjnego.

Dokument nie zawiera zrzutów ekranu. Model analizujący sam tekst nie powinien udawać, że obejrzał aplikację.

## 3. Repozytorium i stan wersji

Repozytorium: https://github.com/FOMOjobs/lata-pracy

Pierwszy Pull Request został scalony do gałęzi main:

https://github.com/FOMOjobs/lata-pracy/pull/1

Punkt odniesienia dla raportu:

- commit main: 28cb8ff5fc22c3635d2416104a04cf042c6513cc;
- ostatni commit implementacyjny gałęzi funkcjonalnej: a33286834788c2994415c3546adc4c56b62addd4;
- drzewo plików obu wskazanych wersji jest takie samo;
- raport opisuje tę wersję, a nie ewentualne późniejsze zmiany.

Stały odsyłacz do kodu:

https://github.com/FOMOjobs/lata-pracy/tree/28cb8ff5fc22c3635d2416104a04cf042c6513cc

W momencie sporządzania raportu nie potwierdzono stabilnego, publicznego adresu działającej aplikacji. Dostępne publicznie repozytorium nie zastępuje linku do prototypu w przeglądarce.

## 4. Kontekst konkursu i zamysł produktu

Projekt powstaje z myślą o mObywatel Challenge opisanym przez organizatora pod adresem https://mobywatel.ai/.

Według informacji przekazanych przez użytkownika i zapisanych w dokumentacji konkurs dopuszcza zarówno całą koncepcję aplikacji, jak i jedną sprawę rozwiązaną od początku do końca. Wymaga klikalnego prototypu dostępnego bez logowania. Podany termin zgłoszeń to 30 listopada 2026 r. do końca dnia czasu polskiego. Aktualne warunki należy jeszcze sprawdzić przed wysłaniem zgłoszenia.

Lata Pracy realizują wariant **jednej sprawy**: od zauważenia wcześniejszego okresu pracy do uporządkowanego projektu materiału do dalszej weryfikacji.

Zasadnicze pytanie produktu brzmi:

> „Które fragmenty mojej historii warto sprawdzić, co już mieści się w innych okresach i jaki następny krok mogę wykonać?”

Nie zbudowano pełnej aplikacji obywatelskiej ani katalogu wszystkich spraw urzędowych. Prototyp ma własną identyfikację wizualną i nie jest częścią oficjalnego mObywatela.

Polskie modele, takie jak Bielik i PLLuM, są w konkursie mile widziane, ale **nie są obecnie zintegrowane**. Interfejs w języku polskim nie jest dowodem użycia polskiego modelu. Nie należy dopisywać takiej integracji do zgłoszenia.

Nie przeprowadzono porównawczego badania z prototypem organizatora. Można opisać własne rozwiązania i ich uzasadnienie, ale nie ma zmierzonego dowodu przewagi.

## 5. Dla kogo powstała aplikacja

Główny odbiorca to osoba, której historia zawodowa łączy różne formy pracy i która nie wie:

- czy wcześniejszą aktywność warto zgłosić do sprawdzenia;
- które daty już pokrywają się z innym okresem;
- jak odróżnić pewne założenie przykładu od niepełnych informacji;
- jakie dokumenty przygotować i co zrobić, jeśli ich nie ma;
- jak przedstawić sprawę w uporządkowany sposób.

Trzy historie nie stanowią pełnego katalogu sytuacji prawnych. Pokazują trzy zrozumiałe problemy: zlecenie przed etatem, działalność przed etatem i nakładanie się dat.

Prototyp ma zmniejszać wysiłek związany z porządkowaniem informacji. Nie przyznaje praw, nie zastępuje rozstrzygnięcia pracodawcy i nie potwierdza dokumentów.

## 6. Co faktycznie można zrobić

Główna ścieżka:

Start → wybór fikcyjnej osoby → pulpit z porównaniem → szczegóły okresu → dokumenty i braki → przygotowanie sprawy → podgląd → potwierdzenie → lokalny eksport.

Krótsza ścieżka prezentacji:

Demo Oli → odkrycie 181 potencjalnych dni → wyjaśnienie pokrycia dat → kreator sprawy → zadeklarowanie braków → przygotowany projekt.

W aplikacji istnieją:

- strona startowa;
- wybór trzech scenariuszy;
- pulpit dla każdej osoby;
- interaktywna oś czasu z alternatywną listą;
- okno szczegółów okresu;
- deklaracje dostępności dokumentów i instrukcje przy brakach;
- przygotowanie projektu sprawy;
- karta projektu, wiadomość, kopiowanie, TXT i druk;
- trzyetapowa demonstracja konkursowa;
- źródła i informacje o ograniczeniach.

Nie wszystkie elementy są osobnymi adresami. Szczegóły okresu otwierają się w dialogu, a kroki przygotowania sprawy zmieniają się w obrębie jednej strony.

## 7. Mapa adresów

| Adres | Zawartość |
| --- | --- |
| / | Start i wyjaśnienie wartości produktu |
| /scenariusze | Wybór Kasi, Marka lub Oli |
| /demo | Kierowana demonstracja historii Oli |
| /pulpit/kasia | Porównanie i podsumowanie Kasi |
| /pulpit/marek | Porównanie i podsumowanie Marka |
| /pulpit/ola | Porównanie i podsumowanie Oli |
| /historia/kasia | Oś czasu i lista Kasi |
| /historia/marek | Oś czasu i lista Marka |
| /historia/ola | Oś czasu i lista Oli |
| /sprawa/kasia | Przygotowanie sprawy Kasi |
| /sprawa/marek | Przygotowanie sprawy Marka |
| /sprawa/ola | Przygotowanie sprawy Oli |

Łącznie to 12 adresów treści. Dochodzą obsługa nieistniejącej strony i zasoby aplikacji. Nieznany identyfikator scenariusza prowadzi do 404.

## 8. Start: pierwsze wrażenie i obietnica

Strona startowa zawiera hasło „Twoja praca się liczy” i główne wezwanie:

**„Sprawdź swoją historię pracy”.**

Dodatkowa ścieżka prowadzi do demonstracji określonej jako „Zobacz różnicę w 90 sekund”. To zamierzony format prezentacji, a nie zmierzony czas wykonania zadania przez użytkownika.

Strona tłumaczy proces, korzysta z własnej ilustracji historii pracy i ujawnia, że jest to niezależna demonstracja na fikcyjnych danych. Ilustracja jest zbudowana w HTML/CSS, bez używania wizerunku rzeczywistej osoby.

Na komputerze nagłówek zawiera dodatkową nawigację. Na małym ekranie te linki są ukrywane; pozostaje dostęp przez główne wezwania na stronie. Nie ma osobnego mobilnego menu typu hamburger.

Pytania do oceny:

- Czy po kilku sekundach wiadomo, jaką jedną sprawę rozwiązujemy?
- Czy „historia pracy” nie sugeruje pobierania rzeczywistych danych?
- Czy pierwsza ilustracja na telefonie nie odsuwa najważniejszej treści zbyt daleko?
- Czy różnica między główną ścieżką a demonstracją jest zrozumiała?

## 9. Wybór trzech scenariuszy

Każda karta reprezentuje fikcyjną osobę z krótką historią i innym problemem.

**Kasia — zlecenie i etat.** Wcześniejsza aktywność obejmuje zlecenie podczas studiów wymagające sprawdzenia oraz późniejsze zlecenie oznaczone jako potencjalne.

**Marek — JDG i etat.** Początek działalności ma niekompletne informacje, dalszy fragment działalności jest potencjalny, a późniejszy etat stanowi podstawę przykładu.

**Ola — nakładające się okresy.** Zlecenie w dużej części pokrywa się z etatem. To najlepszy przykład do wyjaśnienia, dlaczego suma długości umów nie jest sumą unikalnych dni.

Awatary są literowe. Dane i organizacje są fikcyjne. Użytkownik nie tworzy konta i nie wpisuje własnych danych.

## 10. Pulpit: jedno prowadzące porównanie

Najważniejszy element pulpitu to interaktywny widok porównujący podstawę z wynikiem warunkowym.

Potencjalne okresy są początkowo wybrane. Użytkownik może je wyłączyć lub włączyć, a porównanie aktualizuje się zgodnie z wyborem.

Wartość bazowa obejmuje okresy przyjęte w scenariuszu jako uwzględnione. Wynik warunkowy dodaje tylko nowe dni wybranych potencjalnych okresów. Okresy wymagające weryfikacji nie powiększają tego porównania.

Rozwinięcie wyjaśnienia pokazuje dokładne fragmenty dat:

- już pokryte innym okresem;
- dodatkowe względem obecnej podstawy.

Pulpit prowadzi do następnego działania, np. ustalenia dostępności dokumentu albo przygotowania sprawy. Główne wezwanie to **„Przygotuj sprawę krok po kroku”**. Bez wybranego potencjalnego okresu nie powinno sugerować gotowego zakresu do przygotowania.

Poniżej znajdują się trzy kompaktowe kategorie całej historii:

- uwzględnione w przykładzie;
- potencjalnie do doliczenia;
- wymagające weryfikacji.

**Ważna różnica:** te trzy kategorie opisują całą historię, natomiast górne porównanie reaguje na wybrany zakres. Jest to podpisane w interfejsie. To jednak istotny punkt badania: użytkownik może oczekiwać, że wszystkie liczby na ekranie będą reagować na ten sam przełącznik.

Dni są podstawową miarą. Przybliżone lata i miesiące stanowią pomocniczy opis, bez sugerowania urzędowego sposobu wyliczenia.

Pulpit umożliwia także wejście do szczegółów okresów i osi czasu. Pełne podsumowanie całej historii TXT znajduje się w rozwinięciu „Więcej”. Jest czymś innym niż projekt sprawy ograniczony do wybranego zakresu.

## 11. Interaktywna oś czasu

Oś przedstawia okresy na skali rzeczywistych lat. Użytkownik może:

- otworzyć szczegóły przez nazwę lub pasek okresu;
- przełączyć oś na listę;
- filtrować wszystkie okresy albo jedną kategorię;
- zmienić kolejność od najstarszych lub najnowszych;
- przejść do innego scenariusza.

Pasek pokazuje rzeczywisty zakres dat całego okresu. Nie jest skracany do samej części dodatkowej. Dzięki temu nakładanie jest widoczne, a jego znaczenie wyjaśniają szczegóły i wyliczenie wkładu.

Podsumowanie dni i długość surowego paska odpowiadają na różne pytania. To musi być czytelne: „jak długo trwała aktywność?” oraz „ile wnosi niepowtórzonych dni?”.

Na telefonie oś ma własny obszar poziomego przewijania. Dostępny jest widok listy, ale domyślny widok nadal stanowi oś. Warto sprawdzić, czy użytkownicy odkrywają listę i przewijanie oraz czy lista nie byłaby lepszą mobilną wartością domyślną.

## 12. Szczegóły okresu

Okno szczegółów pokazuje:

- tytuł i fikcyjną organizację;
- typ aktywności;
- status przyjęty w scenariuszu;
- daty początku i końca;
- opis sytuacji;
- pełną długość okresu i jego wkład do unikalnych dni;
- wyjaśnienie nakładania;
- warunki do sprawdzenia;
- listę dokumentów;
- właściwe TODO prawne dla niepewnego przypadku.

Nie jest to ekran „zatwierdzenia okresu”. Zmiana deklaracji o posiadaniu dokumentu nie zmienia prawnego statusu ani liczby dni.

Dialog korzysta z natywnego elementu dialog i showModal. Ma tytuł i opis dla technologii asystujących. Obsługuje zamknięcie przyciskiem, zdarzeniem anulowania i kliknięciem tła. Kliknięcie wewnątrz treści nie powinno go zamykać. Przewijanie tła jest blokowane i przywracane.

Zachowanie natywnego fokusu, Escape, powrotu do elementu otwierającego i przewijania na Safari wymaga testu w rzeczywistej przeglądarce. Test jsdom nie jest dowodem poprawnego działania tych mechanizmów systemowych.

## 13. Trzy niezależne osie stanu

To jedna z najważniejszych decyzji w projekcie.

| Oś | Przykładowa wartość | Znaczenie |
| --- | --- | --- |
| Status okresu | Potencjalny | Założenie scenariusza dotyczące dalszego sprawdzenia |
| Dostępność dokumentu | Mam — do sprawdzenia | Deklaracja użytkownika o dostępności |
| Zakres projektu | Uwzględnij w projekcie | Czy nazwa dokumentu ma trafić do przygotowanego materiału |

Te stany nie zastępują się nawzajem.

„Mam — do sprawdzenia” nie oznacza autentycznego, kompletnego i zatwierdzonego dokumentu. „Uwzględnij w projekcie” nie oznacza faktycznego załączenia pliku. Potencjalny okres nie staje się prawnie potwierdzony po zaznaczeniu checkboxa.

Przykład: użytkownik może nie mieć zaświadczenia, ale uwzględnić jego nazwę w projekcie, żeby materiał jasno pokazywał brak. Może też wyłączyć tę nazwę z zakresu, zachowując osobną deklarację dostępności.

## 14. Obsługa brakującego dokumentu

Dostępność ma trzy stany:

- „Nie wiem jeszcze”;
- „Nie mam dokumentu”;
- „Mam — do sprawdzenia”.

Po wybraniu braku pojawia się nazwany problem i konkretne następne działanie. Rozwinięcie **„Jak uzupełnić ten brak?”** przedstawia znane informacje o okresie, kilka kroków i odsyłacz do istniejącego źródła urzędowego.

Instrukcje są opracowane dla dokumentów fikcyjnych scenariuszy. Nie powstają w rozmowie z AI. Dla nieznanego identyfikatora istnieje ostrożny opis ogólny.

To funkcja prowadząca do działania, bez pozornej integracji. Aplikacja nie pobiera zaświadczenia, nie składa wniosku i nie gwarantuje, że wskazany materiał wystarczy w konkretnej rzeczywistej sprawie.

Do sprawdzenia: czy treść pomocy jest dostatecznie konkretna, czy źródło rzeczywiście pomaga i czy rozbudowane wyjaśnienie nie przeciąża mobilnego ekranu.

## 15. Przygotowanie sprawy krok po kroku

### Krok 1: zakres okresów

Kreator przyjmuje wybrane potencjalne okresy. Okresy wymagające weryfikacji nie są automatycznie dopisywane do tego zakresu.

Wybór jest wspólny z pulpitem i innymi ekranami scenariusza. Użytkownik nie powinien zaczynać od nowa po każdym przejściu.

### Krok 2: dokumenty

Użytkownik deklaruje dostępność oraz osobno wybiera, które nazwy dokumentów mają znaleźć się w projekcie.

Brak dokumentu jest informacją do przekazania dalej, a nie błędem, który należy ukryć. Przy pustym zakresie dokumentów materiał sygnalizuje konieczność uzupełnienia.

### Krok 3: podgląd i potwierdzenie

Przed przygotowaniem dostępny jest podgląd samej karty. Użytkownik potwierdza zrozumienie demonstracyjnego charakteru, braku wysyłki i braku rozstrzygnięcia prawnego.

Dopiero przycisk **„Przygotuj projekt”** otwiera etap z eksportem. Wcześniej nie ma kompletu kontrolek drukowania, kopiowania i pobierania.

### Krok 4: gotowy projekt do dalszej pracy

Głównym działaniem jest **„Drukuj kartę”**. Rozwinięcie **„Więcej możliwości”** zawiera wiadomość, kopiowanie i TXT.

„Gotowy projekt” nie oznacza gotowej, zweryfikowanej sprawy. Komunikat końcowy uwzględnia brakujące lub nieustalone dokumenty. Użytkownik może wrócić do uzupełnienia.

Bieżący krok kreatora i potwierdzenie nie są zapisywane między ponownymi wejściami. Trwałość dotyczy zakresu i deklaracji, a nie zgody udzielonej kiedyś w innym przebiegu.

## 16. Karta, wiadomość i eksport

Karta pokazuje wybrane okresy, daty, fikcyjne organizacje, warunkowe dodatkowe dni, warunki do sprawdzenia, wybrane nazwy dokumentów, deklarowane braki i źródła.

Projekt ogranicza treść do wybranego zakresu. Nie jest pełnym dumpem całej historii; może zawierać zbiorczą wartość podstawy potrzebną do porównania. Karta i wiadomość powinny przedstawiać ten sam zakres i te same braki.

W aplikacji nie ma załączników. Lista nazw nie oznacza istnienia plików. Nie ma podpisu, urzędowego numeru sprawy ani potwierdzenia doręczenia.

Druk wywołuje natywne window.print. Użytkownik może skorzystać z opcji „Zapisz jako PDF” w przeglądarce lub systemie. Nie wdrożono osobnego generatora PDF.

TXT jest tworzony lokalnie jako Blob w UTF-8 z BOM dla polskich znaków. Kopiowanie używa API schowka. Przy odmowie aplikacja udostępnia ręczne zaznaczenie tekstu i instrukcję Ctrl+C lub odpowiednika na Macu.

Układ wydruku ma dedykowane reguły CSS. Ukrywa nawigację i elementy sterujące, pozostawiając kartę. Źródła mają również widoczne adresy. **Wygląd PDF i fizycznego wydruku nie został jeszcze potwierdzony.**

## 17. Demonstracja konkursowa

Adres /demo prowadzi przez historię Oli w trzech ręcznie przełączanych częściach:

1. **Zauważ:** pokaż podstawę i wcześniejsze zlecenie.
2. **Zrozum:** wyjaśnij różnicę między 1126 dniami całego okresu a 181 nowymi dniami.
3. **Przygotuj:** pokaż następny krok i przejdź do projektu sprawy.

Są przyciski poprzedniego kroku, resetowania i wyboru rozdziału. Nie ma automatycznego przewijania na czas. Zmiana rozdziału przenosi fokus na nagłówek.

Oznaczenie „90 sekund” jest pomysłem na narrację. Nie wykonano pomiaru, że nowy użytkownik kończy tę ścieżkę w takim czasie.

Potencjał prezentacyjny wynika z jednej konkretnej zmiany w rozumieniu problemu: więcej umów nie musi oznaczać proporcjonalnie więcej stażu. Następnie można pokazać praktyczne działanie przy brakującym dokumencie.

## 18. Fikcyjne dane i dokładne liczby

Zestaw zawiera **11 okresów i 15 pozycji dokumentów**. Datą końcową historii jest 31 października 2026 r. Wyniki nie przesuwają się z zegarem urządzenia.

Długości poniżej liczone są z uwzględnieniem obu dat granicznych. Wkład oznacza niepowtórzone dni przypisane zgodnie z algorytmem prezentacji.

### Kasia

| Okres | Daty | Status | Pełne dni | Nowy wkład |
| --- | --- | --- | ---: | ---: |
| Zlecenie podczas studiów | 2017-07-01 — 2017-09-30 | Do weryfikacji | 92 | 92 |
| Późniejsze zlecenie | 2018-01-01 — 2019-12-31 | Potencjalny | 730 | 730 |
| Pierwszy etat | 2020-01-01 — 2022-12-31 | Uwzględniony | 1096 | 1096 |
| Kolejny etat | 2023-01-01 — 2026-10-31 | Uwzględniony | 1400 | 1400 |

Podstawa: **2496 dni**. Potencjalny dodatkowy wkład: **730 dni**. Wymagające weryfikacji: **92 niepowtórzone dni**. Porównanie po wybraniu potencjalnego zlecenia: **3226 dni**, nadal warunkowo.

### Marek

| Okres | Daty | Status | Pełne dni | Nowy wkład |
| --- | --- | --- | ---: | ---: |
| Początek JDG | 2015-04-01 — 2015-09-30 | Do weryfikacji | 183 | 183 |
| Dalszy fragment JDG | 2015-10-01 — 2020-03-31 | Potencjalny | 1644 | 1644 |
| Etat | 2020-04-01 — 2026-10-31 | Uwzględniony | 2405 | 2405 |

Podstawa: **2405 dni**. Potencjalny wkład: **1644 dni**. Wymagające weryfikacji: **183 niepowtórzone dni**. Porównanie po wybraniu działalności: **4049 dni**, nadal warunkowo.

Nie przypisujemy dawnym datom działalności ulg, które wówczas nie obowiązywały. Szczegóły wymagają analizy rzeczywistej dokumentacji i właściwych przepisów.

### Ola

| Okres | Daty | Status | Pełne dni | Nowy wkład |
| --- | --- | --- | ---: | ---: |
| Pierwszy etat | 2018-01-01 — 2021-12-31 | Uwzględniony | 1461 | 1461 |
| Zlecenie | 2019-06-01 — 2022-06-30 | Potencjalny | 1126 | 181 |
| Dodatkowa współpraca | 2022-03-01 — 2022-08-31 | Do weryfikacji | 184 | 0 |
| Kolejny etat | 2022-07-01 — 2026-10-31 | Uwzględniony | 1584 | 1584 |

Podstawa: **3045 dni**. Potencjalny wkład: **181 dni**. Warunkowe porównanie: **3226 dni**.

Zlecenie dzieli się na:

- 2019-06-01 — 2021-12-31: **945 dni** pokrytych etatem;
- 2022-01-01 — 2022-06-30: **181 dni** poza podstawą.

Okres do weryfikacji nadal istnieje, mimo że jego dodatkowy wkład wynosi zero. **Zero nowych dni nie oznacza braku niepewnego okresu.** Jego daty są już pokryte innymi okresami w całej historii.

Suma długości wszystkich okresów Oli wynosi 4355 dni. Unikalne pokrycie wynosi 3226 dni, a różnica 1129 oznacza powtórzone wystąpienia dni. Nie należy nazywać jej 1129 różnymi datami nakładania: przy więcej niż dwóch okresach ten sam dzień może wystąpić kilkakrotnie.

## 19. Jak działa liczenie bez podwójnego sumowania

To silnik operacji na przedziałach dat. Nie jest silnikiem kwalifikacji prawnej.

1. Data musi mieć format YYYY-MM-DD i odpowiadać rzeczywistej dacie.
2. Dni przeliczane są na liczby całkowite względem UTC, żeby uniknąć różnic długości doby przy zmianie czasu.
3. Koniec podany jako włączony do okresu zmienia się wewnętrznie na granicę wyłączną następnego dnia.
4. Przedziały są sortowane i łączone, gdy się nakładają lub stykają.
5. Długość połączonych przedziałów daje liczbę unikalnych dni.
6. Wkład okresu to przyrost długości sumy przedziałów po jego dodaniu.

Podsumowanie całej historii przypisuje dni według kolejności kategorii: uwzględnione, potencjalne, do weryfikacji. W obrębie kategorii znaczenie ma kolejność danych.

**To konwencja wyjaśniania wyniku, nie ustanowiona przez aplikację reguła pierwszeństwa prawnego.** Dzięki niej kategorie nie dublują dni.

Porównanie wybranego zakresu bierze podstawę i wybrane potencjalne okresy. Inny potencjalny okres może już pokrywać fragment kolejnego, więc rozbicie uwzględnia również wcześniejsze wybrane pozycje.

Funkcja dzieląca okres na odcinki zwraca konkretne daty pokryte oraz dodatkowe. To podstawa przejrzystego wyjaśnienia.

Chronione przypadki obejmują niepoprawne daty, odwrócony zakres, powtarzające się identyfikatory, rok przestępny, zagnieżdżenie przedziałów i nakładanie wielu okresów.

Przybliżone lata i miesiące korzystają z uproszczenia 365 dni na rok i 30 dni na miesiąc. Nie jest to prawny sposób wyznaczania stażu. Może prowadzić do mało naturalnych opisów granicznych, np. 12 miesięcy przed upływem 365 dni. Dokładne dni pozostają podstawą prezentacji.

## 20. Model danych i logika projektu sprawy

Główne typy:

| Typ | Najważniejsze pola |
| --- | --- |
| Scenario | id, imię fikcyjnej osoby, opis, akcent, okresy |
| WorkPeriod | id, tytuł, fikcyjna organizacja, typ, status, daty, opis, warunki, dokumenty, opcjonalne TODO |
| DemoDocument | id, tytuł, wskazówka |
| DocumentAvailability | unknown, missing, have |
| Stan sprawy | wybrane identyfikatory okresów i dokumentów oraz mapa dostępności |

Typy aktywności obejmują employment, contract i business. Statusy to included, potential i review. Same nazwy typów nie uruchamiają automatycznej reguły prawnej.

Plan sprawy przyjmuje tylko znane, wybrane potencjalne okresy. Odrzuca nieznane identyfikatory i nie rozszerza zakresu o okresy review. Dokumenty pochodzą z wybranych okresów.

Projekt wiadomości i karty używa tego samego zakresu. Uwzględnia deklarowaną dostępność, warunki, dokładne dni oraz oznaczenia demonstracji. Nie dodaje nazw dokumentów wyłączonych z projektu.

## 21. Ciągłość wyborów i zapis w przeglądarce

Wspólny stan wykorzystuje useSyncExternalStore, pamięć modułu i sessionStorage.

Klucz jest osobny dla scenariusza:

lata-pracy:case:v1:kasia

Analogicznie istnieją klucze dla Marka i Oli. Zapis obejmuje identyfikatory wybranych okresów, identyfikatory nazw dokumentów, mapę deklaracji oraz sygnaturę struktury scenariusza.

Nie zapisuje treści rzeczywistych dokumentów, przesyłanych plików, imienia użytkownika ani swobodnej treści wiadomości. Identyfikatory odwołują się do fikcyjnych danych aplikacji.

Domyślnie wybrane są potencjalne okresy i ich dokumenty, a dostępność ma stan nieustalony. Nie jest to oznaczenie, że dokumenty zostały odnalezione.

Zapis przechodzi walidację: znane identyfikatory, dozwolone wartości, usunięcie duplikatów i zgodność struktury. Celowo pusty wybór pozostaje pusty po odświeżeniu.

Przy zablokowanym lub uszkodzonym storage aplikacja korzysta z pamięci albo wartości domyślnych. Przy braku trwałego zapisu odświeżenie może utracić wybory. Obecnie nie ma osobnego komunikatu UI o awarii zapisu.

To mechanizm wygody w sesji przeglądarki. Nie jest kontem, szyfrowanym sejfem, synchronizacją między urządzeniami ani gwarancją bezpieczeństwa danych produkcyjnych. Sposób przywracania kart i kopiowania sesji zależy również od przeglądarki.

## 22. Architektura techniczna

Stos:

- Next.js 16, App Router;
- React 19;
- TypeScript w trybie strict;
- Tailwind CSS 4 wraz z rozbudowanym własnym CSS;
- Lucide React;
- lokalnie dostarczane fonty Manrope i DM Sans;
- Vitest, jsdom i Testing Library;
- ESLint oraz GitHub Actions.

Dokładne wersje zależności utrwala package-lock.json. Instalacja powtarzalna korzysta z npm ci.

Strony App Router są komponentami serwerowymi. Korzystają z parametrów scenariusza i generowania znanych wariantów tras. Interakcje realizują komponenty klienckie.

Dane demonstracyjne są częścią repozytorium. Nie ma bazy danych, API biznesowego, zewnętrznej autoryzacji ani sekretów wymaganych do przejścia demonstracji.

Build generuje strony dla trzech historii. Nie skonfigurowano pełnego statycznego eksportu przez output: "export". Obecna instrukcja produkcyjna zakłada uruchomienie Next.js w odpowiednim środowisku Node.

Wstępnie generowane strony są dobrą podstawą małego prototypu, lecz nie stanowią wyniku testu szybkości lub obciążenia. Nie wykonano pomiarów Core Web Vitals, Lighthouse ani testów dużego ruchu.

## 23. Mapa plików

| Obszar | Pliki i odpowiedzialność |
| --- | --- |
| Strony | src/app/page.tsx, scenariusze, demo, pulpit/[scenario], historia/[scenario], sprawa/[scenario] |
| Układ i metadane | src/app/layout.tsx, not-found.tsx, icon.svg |
| Główna przestrzeń pracy | src/components/workspace.tsx |
| Porównanie i daty | history-explorer.tsx, coverage-breakdown.tsx |
| Przygotowanie sprawy | case-wizard.tsx, document-preparation.tsx, packet-preview.tsx |
| Prezentacja | contest-demo.tsx |
| Elementy wspólne | brand.tsx, public-layout.tsx, modal.tsx, status-badge.tsx, legal-info.tsx |
| Ilustracja | career-illustration.tsx |
| Dane | src/data/scenarios.ts |
| Typy | src/lib/types.ts |
| Przedziały dat | src/lib/history.ts |
| Plan i eksport sprawy | src/lib/case-plan.ts |
| Wspólny stan | src/lib/case-session.ts |
| Instrukcje braków | src/lib/document-guidance.ts |
| Źródła prawne | src/lib/legal.ts |
| Style | src/app/globals.css, experience.css, flow-refinements.css |
| Testy | tests/ oraz konfiguracja Vitest |
| CI | .github/workflows/ci.yml |

Dokumentacja w repozytorium obejmuje README oraz docs/PRODUCT.md, ARCHITECTURE.md, LEGAL.md, TESTING.md, ROADMAP.md, CONTEST.md, PITCH.md i SUBMISSION.md.

Duże komponenty i warstwy stylów są miejscem do oceny utrzymania. Nie ma potrzeby przepisywania całej aplikacji tylko dlatego, że prototyp ma długie pliki. Refaktoryzacja powinna usuwać konkretną trudność albo zapobiegać stwierdzonej regresji.

## 24. Projekt wizualny i mikrointerakcje

Kierunek to autorski govtech: granat, jasny błękit, biel, spokojne powierzchnie, zaokrąglone karty, wyraźna typografia i liniowe ikony.

Przykładowe kolory to granat #142b4e, niebieski #3869c8 i jasne tło #eaf2ff. Nie użyto godła, symboliki urzędowej ani kopii identyfikacji mObywatela.

Istnieją stany hover, aktywne wybory, animacje wejścia i przejścia. Preferencja ograniczonego ruchu jest obsłużona w CSS. Zmiany kroków demonstracji i kreatora mają zarządzanie fokusem.

Fonty są dostarczane lokalnie z pakietów. Produkt nie wymaga pobierania ich z Google Fonts przy otwarciu.

W poprzednich iteracjach uproszczono pulpit: jedno porównanie i jeden główny następny krok zastąpiły powtarzające się karty i wezwania. Mniej częste opcje eksportu ukryto pod rozwinięciami.

Z kodu nie można ocenić, czy efekt jest „premium” w odbiorze. Potrzebne są obrazy z rzeczywistej przeglądarki i obserwacja użytkowników.

## 25. Co wiadomo o telefonie

### Zaimplementowane mechanizmy

- Metadane viewport odpowiadają szerokości urządzenia i nie blokują powiększania.
- Układy wielokolumnowe przechodzą na mniejszą liczbę kolumn.
- Na telefonie nawigacja boczna zmienia się w górne zakładki.
- Karty scenariuszy i główne sekcje układają się pionowo.
- Obszary boczne kreatora zmieniają położenie na mniejszych szerokościach.
- Główne przyciski mają zwykle wysokość około 48–52 px.
- Pola dostępności dokumentów mają wysokość co najmniej około 44 px.
- Oś przewija się we własnym obszarze.
- Istnieje alternatywny widok listy.
- Dialog ma ograniczenie szerokości i wysokości względem okna oraz przewijanie treści.
- Zastosowano reguły dla małych telefonów i szerszych ekranów.

### Miejsca wymagające uwagi

Nie wszystkie elementy mają równie duży obszar dotyku. Przełączniki osi i listy mają około 30 × 32 px, przycisk zamknięcia dialogu około 40 × 40 px, a bardzo krótki pasek okresu może mieć minimalną szerokość około 15 px. Istnieją też większe tekstowe sposoby otwierania szczegółów.

Część tekstów pomocniczych ma około 10–12 px. Na bardzo małym ekranie tekst mobilnej nawigacji może schodzić do 11 px. Wymaga to oceny czytelności i odstępów, a nie automatycznej deklaracji naruszenia lub spełnienia norm.

Oś na telefonie utrzymuje szerokość wewnętrzną około 760 px. To celowe przewijanie wykresu, lecz może być mało odkrywalne. Cała strona nie powinna przez to przewijać się poziomo; brak takiej regresji trzeba sprawdzić.

Ilustracja na starcie ma na małym ekranie znaczną wysokość. Należy ocenić, czy proporcje pierwszego ekranu dobrze prowadzą do działania.

Style są rozbudowane i częściowo nadpisują wcześniejsze reguły. Trzy główne pliki mają łącznie około **6818 linii**. Sama liczba nie dowodzi błędu ani wolnego działania, ale zwiększa ryzyko trudnej do przewidzenia kaskady przy kolejnych zmianach.

Nie sprawdzono jeszcze w praktyce długich tytułów, powiększenia, orientacji poziomej, systemowego powiększenia tekstu ani zachowania dialogu w różnych mobilnych przeglądarkach.

### Uczciwy wniosek

Istnieje realna implementacja responsywności. Nie ma jeszcze dowodu, że aplikacja jest znakomicie dopracowana na wszystkich telefonach. Najbliższy sensowny krok to weryfikacja i poprawienie konkretnych problemów, które ona ujawni.

Skalowanie układu na telefonie i skalowanie infrastruktury przy dużym ruchu to osobne kwestie. W drugim obszarze nie przeprowadzono testu obciążeniowego ani weryfikacji docelowego hostingu.

## 26. Dostępność: istniejące podstawy i brakujące dowody

Istniejące rozwiązania:

- język strony pl;
- odnośnik „Przejdź do treści”;
- semantyczne przyciski i kontrolki formularzy;
- tekstowe opisy statusów;
- etykiety selektorów;
- widoczny styl fokusu;
- aria-pressed dla wybranych przełączników;
- informacja o aktywnym kroku;
- dialog z nazwą i opisem;
- możliwość korzystania z listy zamiast samej osi;
- informowanie o nowych komunikatach w odpowiednich miejscach;
- obsługa preferencji ograniczonego ruchu;
- brak blokady powiększania strony;
- opis otwarcia źródeł w nowej karcie.

Do sprawdzenia pozostają kontrast wszystkich stanów, kolejność fokusu, fizyczna obsługa klawiatury i Escape, VoiceOver/TalkBack, powiększenie, reflow i rzeczywiste obszary dotyku.

Nie wykonano pełnego audytu zgodności WCAG. Należy unikać deklaracji „w pełni dostępna” lub konkretnego poziomu zgodności bez odpowiedniego sprawdzenia.

## 27. Prywatność i granice bezpieczeństwa

W obecnym prototypie:

- nie ma formularza na rzeczywiste dane osobowe;
- nie ma uploadu;
- nie ma połączenia z ZUS lub CEIDG;
- nie ma konta ani logowania;
- nie ma wysyłania projektu do pracodawcy;
- nie ma wywołania modelu AI;
- wybory przechowywane są lokalnie jako identyfikatory i znaczniki fikcyjnych danych;
- eksport powstaje po stronie przeglądarki.

To ogranicza zakres informacji przetwarzanych przez kod aplikacji. Nie uprawnia jednak do obietnicy, że każdy przyszły hosting jest pozbawiony logów lub że gotowy produkt produkcyjny nie potrzebuje analizy bezpieczeństwa.

API schowka wymaga odpowiedniego kontekstu bezpieczeństwa. Publiczny prototyp powinien korzystać z HTTPS. Obecność trybu awaryjnego kopiowania nie zastępuje sprawdzenia tego na urządzeniu.

Metadane ustawiają noindex/nofollow. To dyrektywa dla robotów, nie kontrola dostępu.

Nie ma service workera, potwierdzonej pracy offline ani wdrożonej PWA. Nie należy obiecywać tych właściwości.

## 28. Podstawa prawna i TODO

Aplikacja odsyła do następujących źródeł:

- https://eli.gov.pl/eli/DU/2025/1423/ogl
- https://www.gov.pl/web/rodzina/staz-pracy-qa
- https://www.zus.pl/baza-wiedzy/biezace-wyjasnienia-komorek-merytorycznych/-/asset_publisher/biezacewyjasnieniakomorekmerytorycznych/content/id/13660998

Dokumentacja zapisuje datę sprawdzenia 11 listopada 2026 r. Niniejszy raport opisuje użyte źródła; nie zastępuje odrębnej aktualnej analizy prawnej.

Istotne TODO do dalszej pracy:

1. Dokładna kwalifikacja poszczególnych typów aktywności i wyjątków.
2. Rozróżnienie znaczenia podlegania ubezpieczeniu, opłacenia składek i potwierdzenia okresu.
3. Sytuacje studentów i inne szczególne przypadki.
4. Historyczne okresy JDG, przerwy i brakujące informacje.
5. Różnica między celem ogólnym, zakładowym, urlopowym i innymi zastosowaniami stażu.
6. Przepisy przejściowe, właściwe terminy i kategoria pracodawcy.
7. Prawny sposób agregacji okresów i ustalania stażu kalendarzowego.
8. Wymagane i akceptowane dowody w konkretnym przypadku.
9. Weryfikacja ekspercka i utrzymywanie aktualności po zmianach przepisów.

Prototyp nie wylicza prawa do 26 dni urlopu, świadczeń ani emerytury. Nie potwierdza, że sam typ umowy wystarczy do zaliczenia okresu.

Drugi model powinien wskazywać pytania wymagające źródła, a nie dopowiadać reguły z pamięci.

## 29. Testy i kontrola jakości

Ostatnia zakończona kontrola implementacji, opisana w repozytorium na 11 listopada 2026 r.:

| Kontrola | Wynik |
| --- | --- |
| ESLint z limitem zero ostrzeżeń | Powodzenie |
| Generowanie typów tras Next.js i TypeScript strict | Powodzenie |
| Vitest | 76 testów w 9 plikach, powodzenie |
| Produkcyjny build | Powodzenie |

Raport nie oznacza, że wykonano ponownie te kontrole wyłącznie z powodu jego przygotowania.

Testy obejmują m.in.:

- walidację dat i długości okresów;
- lata przestępne i odporność na zmianę czasu;
- okresy sąsiadujące, nakładające się i zagnieżdżone;
- niezależny model zbiorów dni dla 100 deterministycznie generowanych historii;
- poprawność fikcyjnych scenariuszy;
- rozbicie pokrycia na dokładne daty;
- filtrowanie i sortowanie;
- otwieranie szczegółów i obsługę anulowania;
- wybór okresów i zakres nazw dokumentów;
- brak wpływu dostępności dokumentu na wynik i status;
- odtwarzanie wyborów oraz walidację sessionStorage;
- zachowanie celowo pustego wyboru;
- awarie zapisu;
- ciągłość między zamontowaniami ekranów;
- instrukcję przy brakującym dokumencie;
- spójność karty i wiadomości;
- brak eksportu przed potwierdzeniem;
- kopiowanie, odmowę schowka i wywołanie drukowania.

Testy interfejsu działają w jsdom. Nie renderuje on CSS ani prawdziwej warstwy natywnego dialogu. showModal i close są w testach zastąpione minimalnymi implementacjami. Router jest symulowany w testowanych interakcjach.

Brakujące dowody:

- rzeczywiste E2E w przeglądarce;
- przegląd wizualny wszystkich ekranów;
- testy na iOS i Androidzie;
- pełny audyt kontrastu i czytnika;
- potwierdzenie wyglądu PDF;
- badania z użytkownikami;
- pomiary wydajności;
- test obciążeniowy;
- formalna weryfikacja prawna.

## 30. Jak uruchomić aplikację

Wymaganie zadeklarowane w projekcie: Node.js co najmniej 22. README zaleca Node 24 LTS. Nie oznacza to przetestowania każdego wydania Node 22.

Polecenia po pobraniu repozytorium i wejściu do jego katalogu:

~~~bash
npm ci
npm run dev
~~~

Następnie należy otworzyć adres podany w terminalu, zwykle http://localhost:3000.

Bezpośrednio można wejść na:

- http://localhost:3000/demo
- http://localhost:3000/pulpit/ola
- http://localhost:3000/sprawa/ola

Pełna kontrola:

~~~bash
npm run check
~~~

Poszczególne kroki:

~~~bash
npm run lint
npm run typecheck
npm test
npm run build
~~~

Uruchomienie wersji produkcyjnej:

~~~bash
npm run build
npm run start
~~~

Zatrzymanie serwera: Ctrl+C w terminalu.

Nie potrzeba kluczy API, konta ZUS ani konfiguracji bazy. Localhost odnosi się do komputera, na którym działa serwer. Uruchomienie go w zdalnym środowisku programistycznym nie uruchamia automatycznie aplikacji na laptopie użytkownika.

Otwierając aplikację z telefonu, trzeba zadbać o dostęp do serwera w swojej sieci lub skorzystać z publicznego hostingu. Ten raport nie potwierdza przygotowania takiego adresu.

## 31. Czego nie ma i czego nie należy dopowiadać

Nie wdrożono:

- importu prawdziwej historii pracy;
- edycji i dodawania własnych okresów;
- OCR, analizy PDF i przesyłania plików;
- integracji ZUS, eZUS, CEIDG, mObywatelem lub skrzynką urzędu;
- logowania i weryfikacji tożsamości;
- silnika automatycznej kwalifikacji prawnej;
- asystenta AI, Bielika ani PLLuM;
- podpisu elektronicznego;
- składania wniosku lub wysyłki wiadomości;
- urzędowego potwierdzenia wyniku;
- dedykowanego generatora PDF;
- powiadomień i przypomnień;
- systemu kont, bazy i synchronizacji;
- potwierdzonej pracy offline;
- publicznego wdrożenia zweryfikowanego na potrzeby tego raportu.

Nie ma powodu dodawać wszystkich tych funkcji przed konkursem. Każda rozszerza zakres, zależności i ryzyko niezrozumienia demonstracji.

## 32. Najważniejsze ryzyka produktu

| Ryzyko | Dlaczego ma znaczenie | Co sprawdzić najpierw |
| --- | --- | --- |
| Wynik warunkowy zostanie odebrany jako decyzja prawna | Podważa zaufanie do produktu | Poprosić użytkownika o wyjaśnienie wyniku własnymi słowami |
| Dwa zakresy liczb na pulpicie są mylone | Wybór wpływa na porównanie, ale nie na całą historię | Wyłączyć okres i zapytać, dlaczego dolne liczby pozostały |
| „Mam dokument” jest odczytane jako zatwierdzenie | Deklaracja nie weryfikuje dowodu | Sprawdzić rozumienie trzech niezależnych osi stanu |
| 0 dni do weryfikacji sugeruje brak problemów | Niepewny okres może być w całości pokryty innymi datami | Pokazać dodatkową współpracę Oli |
| Oś na telefonie wymaga odkrycia przewijania | Użytkownik może nie znaleźć fragmentu historii | Obserwować pierwsze użycie bez podpowiedzi |
| Małe teksty i kontrolki | Mogą utrudniać odczyt i obsługę | Telefon, powiększenie i pomiar rzeczywistego układu |
| Eksport brzmi zbyt urzędowo | Projekt może zostać uznany za złożony wniosek | Zapytanie „co zostało teraz wysłane?” |
| Zapis sesji jest niewidoczny przy awarii | Po odświeżeniu mogą zniknąć wybory | Test z zablokowanym storage |
| Nadpisywanie CSS utrudnia zmiany | Poprawka jednego ekranu może psuć inny | Kontrola szerokości po każdej zmianie stylów |
| Brak publicznego adresu | Nie da się zgłosić repo zamiast klikalnego demo | Stabilny HTTPS i test incognito |

## 33. Co warto dopracować przed dodawaniem funkcji

### Priorytet 1: potwierdzić główną ścieżkę

Dać 3–5 osobom zadanie:

> „Sprawdź zlecenie Oli i przygotuj projekt sprawy. Jeśli nie masz któregoś dokumentu, pokaż, co zrobisz dalej.”

Obserwować bez prowadzenia za rękę. Zapisać czas, miejsca zatrzymania, błędne oczekiwania i interpretację wyniku. Nie trzeba od razu tworzyć systemu analitycznego.

Ważniejsze od samego czasu jest zrozumienie, że 181 dni jest wynikiem warunkowym, dokumenty pozostają deklaracją, a projekt nigdzie nie został wysłany.

### Priorytet 2: telefon i wydruk

Sprawdzić kluczową ścieżkę na prawdziwym telefonie i skorygować konkretne problemy: rozmiar tekstu, dotyk, kolejność sekcji, dialog, oś, kopiowanie i PDF.

To może dać większy efekt niż kolejny ekran promocyjny.

### Priorytet 3: jeden czytelny efekt prezentacji

Pokazać kolejno: 1126 dni zlecenia → 945 już pokrytych → 181 potencjalnie nowych → brak dokumentu → konkretny następny krok → projekt karty.

W ten sposób demonstracja ma problem, wyjaśnienie i rezultat. Nie potrzebuje udawać połączenia z urzędem.

### Priorytet 4: prawdziwy link i podstawy prawne

Przygotować stabilny publiczny adres bez logowania, sprawdzić go w trybie prywatnym i skonsultować najbardziej widoczne sformułowania prawne. To warunki wiarygodnego zgłoszenia.

### Późniejsze możliwości, tylko przy potwierdzonej potrzebie

Rzeczywiste dane, integracje, import dokumentów lub asystent mogą być kierunkiem rozwoju. Powinny odpowiadać na zaobserwowany problem użytkownika i mieć jasno określoną granicę odpowiedzialności.

Asystent nie powinien samodzielnie rozstrzygać prawa. Ewentualna warstwa językowa mogłaby wyjaśniać już ustalone dane i źródła. Obecny prototyp nie wymaga modelu, żeby wykazać swoją wartość.

## 34. Lista ręcznej weryfikacji telefonu i dostępności

To plan, a nie lista wykonanych badań.

| Obszar | Przypadki |
| --- | --- |
| Telefon | 320, 360, 390 i 430 px; pion i poziom |
| Tablet i komputer | 768, 800, 1024 i 1440 px |
| Przeglądarki | Safari na iPhonie i Chrome na Androidzie; przeglądarka desktopowa |
| Powiększenie | 200%, większy tekst systemowy, wąski obszar treści |
| Ruch | Włączone ograniczenie animacji |
| Klawiatura | Tab, Shift+Tab, Enter, Spacja, selektory, Escape |
| Czytnik | VoiceOver lub TalkBack |
| Dialog | Otwarcie, fokus, zamknięcie, powrót, scroll, obrót urządzenia |
| Oś | Przewijanie lokalne, krótkie paski, lista, filtry i sortowanie |
| Dokumenty | Wszystkie deklaracje, rozwinięta pomoc, długie tytuły |
| Sesja | Nawigacja, odświeżenie, pusty zakres, brak storage |
| Eksport | Odmowa schowka, polskie znaki, PDF i podział stron |
| Zgłoszenie | Link HTTPS w prywatnym oknie, bez konta |

Oczekiwane kryteria:

- poziomo przewija się tylko oś, a nie cały dokument;
- tekst i główne działania nie są ucinane;
- dialog mieści się w oknie i daje się zamknąć;
- główny następny krok jest łatwy do odnalezienia;
- zmiana deklaracji dokumentu nie „zatwierdza” okresu;
- karta i wiadomość mają identyczny zakres;
- eksport nie zawiera wyłączonych pozycji;
- po zakończeniu wiadomo, co jeszcze wymaga sprawdzenia;
- nigdzie nie powstaje wrażenie rzeczywistej wysyłki.

## 35. Gotowy prompt dla drugiego modelu

Poniższy tekst można wkleić razem z całym raportem:

---

Jesteś niezależnym recenzentem produktu govtech, UX, dostępności i architektury frontendowej. Przeanalizuj opis prototypu „Lata Pracy”. Zależy mi na mocnym zgłoszeniu konkursowym, ale chcę utrzymać mały, spójny zakres.

Oceniaj istniejącą aplikację na podstawie dowodów w raporcie. Rozdziel funkcje wdrożone, sprawdzone automatycznie, wymagające testu ręcznego i jedynie proponowane.

Jeśli nie masz dostępu do działającej aplikacji, powiedz to. Nie opisuj wyglądu ekranów tak, jakbyś je oglądał. Jeśli masz dostęp do internetu, sprawdź aktualne zasady konkursu i źródła prawne, podając datę oraz adresy. Jeśli nie masz, wskaż pytania do weryfikacji, bez wymyślania odpowiedzi.

Przygotuj odpowiedź w następującym zakresie:

1. Wyjaśnij w jednym akapicie, jaką sprawę użytkownika rozwiązuje ten projekt.
2. Wskaż trzy najmocniejsze elementy i dowody, które uzasadniają ich wartość.
3. Wskaż pięć najpoważniejszych słabości, oddzielając zaobserwowany fakt od hipotezy.
4. Oceń główną ścieżkę: odkrycie okresu → wyjaśnienie dat → dokumenty i braki → podgląd → projekt. Gdzie użytkownik może nie wiedzieć, co zrobić?
5. Sprawdź ryzyko pomylenia statusu okresu, deklaracji dostępności dokumentu i zakresu projektu. Zaproponuj najkrótsze możliwe poprawki językowe.
6. Oceń, czy dwa zakresy liczb na pulpicie i przypadek zera dodatkowych dni przy niepewnym okresie są dostatecznie zrozumiałe.
7. Oceń strategię mobilnej osi czasu. Czy najpierw przetestować obecną wersję, zmienić domyślny widok na listę, czy uprościć sterowanie? Uzasadnij.
8. Oceń moment potwierdzenia i eksport. Co może wywołać fałszywe przekonanie o wysłaniu lub zatwierdzeniu sprawy?
9. Wskaż, co usunąć, skrócić lub schować głębiej. Nie zakładaj, że poprawa oznacza dodanie funkcji.
10. Zaproponuj maksymalnie trzy zmiany przed konkursem. Dla każdej podaj problem, oczekiwany efekt, koszt względny, ryzyko i prosty sposób sprawdzenia.
11. Jeśli proponujesz nową funkcję, nazwij istniejącą potrzebę, której obecny interfejs nie obsługuje. Wskaż, co trzeba uprościć, aby nowa funkcja nie zwiększyła przeciążenia.
12. Zaproponuj scenariusz demonstracji do około 90 sekund: co dokładnie kliknąć, powiedzieć i pokazać, bez deklarowania nieistniejących integracji.
13. Ułóż pięć pytań i jedno zadanie do krótkiego badania z osobą nietechniczną.
14. Wypisz twierdzenia, których nie wolno używać w zgłoszeniu bez dalszych dowodów.
15. Zakończ decyzją: co zrobić teraz, co później i czego na razie nie budować.

Dodatkowe zasady:

- Nie obiecuj zwycięstwa ani nie twórz pozornie obiektywnego wyniku punktowego bez kryteriów.
- Nie wymyślaj reguł polskiego prawa i terminów.
- Nie zamieniaj prototypu jednej sprawy w pełną aplikację obywatelską.
- Nie proponuj chatbota, OCR, PWA, powiadomień lub integracji wyłącznie dlatego, że brzmią nowocześnie.
- Nie przedstawiaj Bielika ani PLLuM jako istniejącej integracji.
- Nie utożsamiaj 76 testów z mobilną, prawną lub dostępnościową certyfikacją.
- Nie uznawaj opisu CSS za dowód dobrego wyglądu na urządzeniu.
- Preferuj poprawki, których sens da się sprawdzić jednym konkretnym zadaniem użytkownika.

---

## 36. Najkrótszy opis do przekazania dalej

Lata Pracy to polski, niezależny prototyp govtech pokazujący jedną sprawę od początku do końca: uporządkowanie wcześniejszych okresów aktywności i przygotowanie projektu materiału do sprawdzenia z pracodawcą. Trzy fikcyjne historie pokazują zlecenie, JDG i nakładanie dat. Najmocniejszy przykład to Ola: ze 1126 dni zlecenia tylko 181 przypada poza etatem. Użytkownik widzi wyjaśnienie dat, wybiera zakres, deklaruje dokumenty i braki, otrzymuje instrukcję działania, ogląda kartę i potwierdza przygotowanie projektu. Eksport jest lokalny; nie ma integracji ani wysyłki. Stos to Next.js, TypeScript, Tailwind i Lucide. Ostatnia kontrola: lint, typy, 76 testów i build zakończone powodzeniem. Responsywność jest wdrożona, ale wymaga testów na telefonie. Priorytetem są zrozumiałość, dopracowanie ścieżki, sprawdzenie wydruku i publiczny link, bez dokładania zbędnych funkcji.

