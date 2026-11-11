# Projekt zgłoszenia

Tekst do ręcznego przejrzenia i wklejenia przez właściciela projektu. Nie wysłano formularza ani żadnych zgód.

## Tytuł koncepcji

Lata Pracy — od pominiętego okresu do przygotowanej sprawy

## Opis

<!-- submission-description:start -->

Lata Pracy to koncepcja jednej usługi w mObywatelu: pomaga osobie z historią etatów, zleceń lub działalności gospodarczej sprawdzić, do których wcześniejszych okresów warto wrócić, i przygotować rozmowę z pracodawcą o ich zaliczeniu do stażu.

Problem nie kończy się na pytaniu „ile lat pracuję?”. Trzeba ustalić daty, oddzielić okresy równoległe, zrozumieć warunki i znaleźć odpowiednie dowody. Nasz prototyp prowadzi przez tę ścieżkę: historia → wyjaśniony wynik → wybór zakresu → podgląd → projekt pakietu.

Najważniejsze jest to, że wynik da się zrozumieć. Użytkownik włącza wcześniejszy okres i widzi zmianę porównania. Oś pokazuje dokładne daty. W fikcyjnej historii Oli z 1126 dni zlecenia 945 pokrywa się z etatem, więc poza podstawą pozostaje 181 dni do sprawdzenia. Każdy dzień liczymy tylko raz.

Po odkryciu użytkownik nie zostaje z samą liczbą. Wybiera okresy i nazwy dokumentów, widzi warunki wymagające potwierdzenia i sprawdza zakres projektu przed jawnym potwierdzeniem symulacji. Otrzymuje czytelną kartę i projekt wiadomości, które może skopiować, pobrać lub wydrukować. Całość pozostaje pod jego kontrolą.

Interfejs jest po polsku, responsywny, z obsługą klawiatury, tekstowymi statusami, alternatywną listą okresów i ograniczeniem animacji. Krótka ścieżka demonstracyjna pozwala poznać pomysł w trzech rozdziałach.

To niezależny prototyp na fikcyjnych danych, bez integracji ZUS, uploadu i rzeczywistej wysyłki. Nie potwierdza stażu ani prawa do świadczeń. Pokazuje oficjalne źródła, a przypadki wymagające analizy oznacza jako TODO. Podsumowanie jest obliczeniem kalendarzowym, nie automatyczną decyzją prawną.

Chcemy pokazać cyfrową usługę, która pomaga przejść jedną sprawę od początku do końca: od niepewności do zrozumiałego, przygotowanego następnego kroku. Twoja praca się liczy.
<!-- submission-description:end -->

## Link do prototypu

Do uzupełnienia po publicznym wdrożeniu. Zalecana strona wejścia: `/` z widocznym odsyłaczem do `/demo`. Link musi działać w oknie prywatnym bez konta właściciela, hasła, zaproszenia ani logowania do hostingu.

## Dodatkowy link

https://github.com/FOMOjobs/lata-pracy/pull/1

## Polskie modele i technologie

Obecna wersja nie wywołuje PLLuM ani Bielika. Autorski prototyp jest napisany w TypeScript i Next.js z polskim interfejsem. Ewentualny polski model językowy mógłby w przyszłości upraszczać wyjaśnienia na podstawie zatwierdzonych źródeł; nie jest to deklaracja działającej integracji.

## Dane autora i zgody

Imię / nazwa zespołu, e-mail, miejscowość i zgody: do uzupełnienia samodzielnie przez właściciela. Nie wpisujemy danych osobowych do repozytorium ani nie zaznaczamy zgód za autora.
