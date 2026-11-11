# Projekt zgłoszenia

Tekst do ręcznego przejrzenia i wklejenia przez właściciela projektu. Nie wysłano formularza ani żadnych zgód.

## Tytuł koncepcji

Lata Pracy — od historii pracy do podsumowania dla kadr

## Opis

<!-- submission-description:start -->

Lata Pracy to koncepcja jednej usługi w mObywatelu: pomaga osobie z historią etatów, zleceń lub działalności gospodarczej sprawdzić, do których wcześniejszych okresów warto wrócić, i przygotować rozmowę z pracodawcą o ich zaliczeniu do stażu.

Problem nie kończy się na pytaniu „ile lat pracuję?”. Trzeba ustalić daty, oddzielić okresy równoległe, zrozumieć warunki i znaleźć odpowiednie dowody. Nasz prototyp prowadzi przez tę ścieżkę: historia → wyjaśniony wynik → dokumenty i braki → podsumowanie dla kadr.

Najważniejsze jest to, że wynik da się zrozumieć. Użytkownik włącza wcześniejszy okres i widzi zmianę porównania. Oś pokazuje dokładne daty. W fikcyjnej historii Oli z 1126 dni zlecenia 945 pokrywa się z etatem, więc poza podstawą pozostaje 181 dni do sprawdzenia. Każdy dzień liczymy tylko raz.

Po odkryciu użytkownik nie zostaje z samą liczbą. Wybrane okresy przechodzą do tego samego podsumowania, a wybory zachowują się po cofnięciu i odświeżeniu w sesji karty. Pulpit prowadzi przez jeden wynik i jeden główny następny krok; szczegóły są dostępne na żądanie.

Gdy użytkownik wybiera „Nie mam dokumentu”, widzi konkretny brak, następne działanie i oficjalne źródło. Trzy kroki kończą się podsumowaniem dla kadr: kartą do wydruku lub zapisu PDF przez okno drukowania oraz wiadomością do skopiowania. Nie ma dodatkowego zatwierdzania udającego wysłanie wniosku. Karta i wiadomość pokazują te same okresy i braki; opcjonalne „Dostosuj zawartość” pozwala ograniczyć listę nazw dokumentów. Deklaracja posiadania nie zatwierdza dokumentu ani okresu.

Interfejs jest po polsku, z układami responsywnymi, obsługą klawiatury, tekstowymi statusami i ograniczeniem animacji. Na telefonie historia zaczyna się od listy; oś czasu pozostaje dostępna. Weryfikacja na rzeczywistych urządzeniach i pełny audyt dostępności pozostają do wykonania. Krótka ścieżka demonstracyjna pozwala poznać pomysł w trzech rozdziałach.

To niezależny prototyp na fikcyjnych danych, bez integracji ZUS, uploadu i rzeczywistej wysyłki. Nie potwierdza stażu ani prawa do świadczeń. Pokazuje oficjalne źródła, a przypadki wymagające analizy oznacza jako TODO. Podsumowanie jest obliczeniem kalendarzowym, nie automatyczną decyzją prawną.

Chcemy pokazać cyfrową usługę, która pomaga przejść jedną sprawę od początku do końca: od niepewności do zrozumiałego, przygotowanego następnego kroku. Twoja praca się liczy.
<!-- submission-description:end -->

## Link do prototypu

https://lata-pracy-demo.verbaltoucan.chatgpt.site

Publiczne demo opublikowano 12.11.2026. Zalecana strona wejścia: `/` z widocznym odsyłaczem do `/demo`. Odpowiedzi HTTPS stron sprawdzono bez nagłówków logowania. Przed zgłoszeniem przejdź jeszcze całą ścieżkę w oknie prywatnym: bez konta właściciela, hasła, zaproszenia ani logowania do hostingu.

## Dodatkowy link

https://github.com/FOMOjobs/lata-pracy

## Polskie modele i technologie

Obecna wersja nie wywołuje PLLuM ani Bielika. Autorski prototyp jest napisany w TypeScript i Next.js z polskim interfejsem. Ewentualny polski model językowy mógłby w przyszłości upraszczać wyjaśnienia na podstawie zatwierdzonych źródeł; nie jest to deklaracja działającej integracji.

## Dane autora i zgody

Imię / nazwa zespołu, e-mail, miejscowość i zgody: do uzupełnienia samodzielnie przez właściciela. Nie wpisujemy danych osobowych do repozytorium ani nie zaznaczamy zgód za autora.
