# Dalsza rozbudowa

## Po iteracji audytowej i dodaniu pulpitu obywatela

Wdrożona iteracja upraszcza pulpit i finał podsumowania, rozróżnia pokrycie pewne w przykładzie od potencjalnego oraz zaczyna mobilną historię od listy. Autorski pulpit obywatela osadza tę usługę w nawigacji: wybrana fikcyjna osoba, jej historia, dokumenty, podsumowanie i powrót. Dotychczasowy opis jest pod `/o-projekcie`. Nie dodaje kalkulatora uprawnień, AI, rejestrów ani pustych usług. Kolejny krok to weryfikacja tych zmian, a nie powiększanie katalogu funkcji.

## Następne działania

1. Wykonać przegląd w rzeczywistej przeglądarce, na urządzeniu mobilnym i z czytnikiem ekranu. Zmierzyć kontrast i komfort rozmiarów tekstu; zrealizować procedurę z `TESTING.md`.
2. Dać 3–5 osobom zadanie: „z pulpitu obywatela otwórz historię Oli, sprawdź zlecenie, zaznacz brak dokumentu, przygotuj podsumowanie dla kadr i wróć na pulpit”. Sprawdzić, czy rozumieją 181 dni, zależność 122 dni współpracy od potencjalnego zlecenia oraz brak wysyłki. Zmierzyć czas i błędy bez prowadzenia uczestnika.
3. Uzupełnić prawne TODO z `LEGAL.md` przy udziale specjalisty prawa pracy. Dla każdej implementowanej reguły przygotować źródło, datę obowiązywania i przypadki testowe.
4. Dodać testy E2E w Chrome/Firefox/WebKit, testy automatycznej dostępności i zrzuty regresyjne dla pulpitu obywatela i głównych ekranów usługi.
5. Podzielić komponent przestrzeni pracy na osobne moduły i wyodrębnić generowanie eksportu przed dalszym zwiększaniem zakresu.

## Przed prawdziwymi historiami

Najpierw określić cel obliczania stażu i wymagane dane. Zaprojektować wprowadzanie i walidację okresów oraz oddzielić fakty, deklaracje użytkownika i decyzje uprawnionego podmiotu. Dopiero później ustalić zasady przechowywania i usuwania danych, bezpieczeństwa, prywatności i odpowiedzialności za aktualność reguł.

Nie dodawać uploadu, autoryzacji, bazy danych ani połączenia z ZUS jako domyślnego rozszerzenia tego demonstratora. Każda integracja wymaga osobnego zakresu i upoważnienia.
