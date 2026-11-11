# Produkt: Lata Pracy

Hasło: **Twoja praca się liczy**. Język interfejsu: polski.

## Cel

Pomóc osobie, która ma za sobą różne formy pracy, uporządkować okresy aktywności i przygotować się do rozmowy z pracodawcą o ich zaliczeniu do stażu. Prototyp pokazuje możliwości na trzech fikcyjnych historiach, bez zbierania danych użytkownika.

## Główna ścieżka

Start → wybór historii → porównanie na pulpicie → szczegóły okresu i dokumentów → podsumowanie dla kadr. Oś czasu pozostaje dostępna do sprawdzenia dat i równoległych okresów.

Ścieżka konkursowa: `/demo` → odkrycie dodatkowych dni → `/sprawa/[scenario]` → **„Wybierz okresy” → „Sprawdź dokumenty” → „Podsumowanie dla kadr”**. Ostatni krok łączy podgląd z działaniami **„Drukuj / zapisz jako PDF”** i **„Kopiuj wiadomość do kadr”**. Pełny tekst oraz TXT są pod **„Więcej możliwości”**. Nie ma dodatkowego checkboxa ani bramki zatwierdzającej lokalny eksport. Karta i wiadomość zawierają ten sam zakres oraz zadeklarowane braki. Spokojny komunikat wyjaśnia, że nic nie jest wysyłane, a zaliczenie okresów nadal wymaga sprawdzenia.

Pulpit ma jedno prowadzące porównanie i jeden główny przycisk przygotowania podsumowania dla kadr. Zaznaczenie potencjalnego okresu aktualizuje wyłącznie porównanie warunkowe; nie zmienia prawnych założeń danych ani TODO. Rozwinięcie pokazuje dokładne odcinki dat już pokrytych innymi okresami oraz nowe dni. Trzy kategorie są schowane pod **„Cała historia”**: opisują pełny fikcyjny zestaw niezależnie od wyboru w porównaniu. Kategoria wymagająca weryfikacji podkreśla liczbę okresów do wyjaśnienia, również gdy ich dodatkowy wkład wynosi zero. Usunięto powtarzające się karty promocyjne i dodatkowe wezwania do tego samego działania.

| Ekran       | Cel                                                              | Działanie                                                                |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Start       | Wyjaśnić wartość i granice produktu                              | CTA „Sprawdź swoją historię pracy”, kroki, zasady i źródła               |
| Scenariusze | Pozwolić bezpiecznie poznać prototyp                             | Kasia, Marek, Ola; każda karta prowadzi do właściwego pulpitu            |
| Pulpit      | Pokazać jeden następny krok i oddzielić wybór od pełnej historii | Prowadzące porównanie, „Cała historia” na żądanie, szczegóły i dokumenty  |
| Oś czasu    | Pokazać kolejność, równoległość i wymagania                      | Kliki w paski i nazwy, filtry, sortowanie, alternatywna lista, szczegóły |

## Scenariusze

- **Kasia:** wakacyjne zlecenie podczas studiów do weryfikacji, późniejsze zlecenie potencjalne oraz dwa etaty przyjęte jako uwzględnione.
- **Marek:** początek JDG z niekompletnymi danymi, dalszy okres działalności potencjalny i późniejszy etat. Nie przypisujemy historycznemu okresowi nieistniejących wówczas ulg.
- **Ola:** etaty, częściowo pokrywające się zlecenie i niepełna dokumentacja dodatkowej współpracy. Tylko 181 dni zlecenia przypada poza etatami. Dodatkowa współpraca ma 184 dni: 62 pokrywa etat, a 122 tylko potencjalne zlecenie. Jej zerowy wkład względem pełnej historii zależy więc również od okresu niepotwierdzonego. Jeśli zlecenie nie zostanie zaliczone, znaczenie współpracy trzeba ocenić osobno. Daty nie zostały zmienione dla uproszczenia prezentacji.

Datą końcową fikcyjnych historii jest 31.10.2026. Aplikacja nie przesuwa wyników wraz z zegarem urządzenia.

## Znaczenie statusów

„Uwzględnione w przykładzie” jest założeniem scenariusza. „Potencjalnie do doliczenia” oznacza warunkowe dodatkowe dni. „Wymaga weryfikacji” oznacza brak danych; dni te nie zwiększają wyniku potencjalnego. Statusy są zapisane w danych, a nie rozstrzygane na podstawie samego typu umowy.

Dostępność dokumentu jest osobną deklaracją: **„Nie wiem jeszcze”**, **„Nie mam dokumentu”** lub **„Mam — do sprawdzenia”**. Rozwinięcie **„Dostosuj zawartość”** pozwala opcjonalnie zmienić zakres nazw dokumentów. Checkbox **„Uwzględnij w projekcie”** określa wyłącznie tę zawartość. Deklaracja dostępności, włączenie nazwy do projektu i prawna weryfikacja to różne rzeczy. Aplikacja zapisuje tylko deklarację oraz wybór zakresu na fikcyjnych danych.

**„Nie mam dokumentu”** ujawnia konkretny brak i następne działanie. Natywne rozwinięcie **„Jak uzupełnić ten brak?”** pokazuje znane informacje o okresie, 2–3 kroki i właściwe istniejące źródło urzędowe. To instrukcja dalszego sprawdzenia, nie wniosek, integracja ani automatyczna zmiana statusu okresu.

Wybór okresów, zakres nazw dokumentów i ich dostępność są wspólne dla ekranów danego scenariusza. W nowej sesji wybrane są potencjalne okresy i ich dokumenty, a dostępność pozostaje nieustalona. `sessionStorage` zachowuje te wybory po nawigacji i odświeżeniu w tej samej karcie. Nie zapisujemy plików, danych osobowych ani tekstu wiadomości. Bieżący krok kreatora nie jest zapisywany. Przy niedostępnym zapisie przeglądarki zachowujemy stan w pamięci do odświeżenia.

## Kierunek wizualny

Autorska identyfikacja: symbol rosnących etapów, granat, jasny błękit, biel, lokalne fonty Manrope i DM Sans, liniowe ikony Lucide. Bez godła, symboliki urzędowej i kopiowania mObywatela. Własna ilustracja historii pracy jest zbudowana w HTML/CSS; nie używa wizerunku osoby.

Interfejs dopasowuje się do telefonu, tabletu i komputera. Na telefonie boczna nawigacja zmienia się w górne zakładki, a historia początkowo pokazuje listę. Użytkownik może wybrać oś z przewijaniem we własnym obszarze; oba widoki otwierają te same szczegóły. Ręcznie wybrany widok nie jest nadpisywany samą zmianą szerokości. Powiększone kontrolki i poprawione teksty wymagają jeszcze kontroli na rzeczywistych urządzeniach.

## Kryteria akceptacji

- Wszystkie cztery ekrany oraz trzy scenariusze działają bez logowania i konfiguracji usług.
- Status i ograniczenia wyniku są widoczne przed interpretowaniem liczb.
- Każdy okres ujawnia daty, opis, warunki i dokumenty; niepewne przypadki mają TODO.
- Kategorie podsumowania nie przypisują tego samego dnia więcej niż raz.
- Końcowy podgląd od razu udostępnia druk i kopiowanie; TXT pozostaje opcją dodatkową. Wszystkie formy zawierają oznaczenie demonstracji i dokładne liczby dni.
- Przyciski, formularze i dialogi mają etykiety; dostępne są widoczne fokusem sterowanie klawiaturą, tekstowe statusy i ograniczenie animacji.

## Poza zakresem

Rzeczywiste dane, edycja historii, upload dokumentów, logowanie, baza danych, automatyczne reguły kwalifikacji prawnej, integracje ZUS/CEIDG, ustalanie urlopu i świadczeń, podpisywanie i składanie wniosków oraz produkcyjna obsługa rzeczywistych historii. Nie są sugerowane jako działające funkcje.

Podsumowanie jest lokalnym materiałem do dalszej rozmowy z kadrami. Jego wydrukowanie, skopiowanie lub pobranie nie jest wysyłką do pracodawcy ani urzędu. Nazwy dokumentów nie są plikami ani potwierdzeniem ich istnienia. Deklaracja „Mam — do sprawdzenia” nie potwierdza autentyczności, kompletności ani spełnienia warunków zaliczenia okresu.
