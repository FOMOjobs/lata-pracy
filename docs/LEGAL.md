# Podstawa informacyjna i granice prawne

Źródła sprawdzono **11.11.2026**. To dokumentacja niezależnego prototypu, nie opinia prawna ani kompletna implementacja przepisów.

## Oficjalne źródła

1. [Ustawa z 26 września 2025 r. o zmianie ustawy — Kodeks pracy oraz niektórych innych ustaw, Dz.U. 2025 poz. 1423](https://eli.gov.pl/eli/DU/2025/1423/ogl).
2. [MRPiPS: Staż pracy na nowych zasadach — pytania i odpowiedzi](https://www.gov.pl/web/rodzina/staz-pracy-qa).
3. [ZUS: „Stażowe” — nowe regulacje i zaświadczenia od 2026 r.](https://www.zus.pl/baza-wiedzy/biezace-wyjasnienia-komorek-merytorycznych/-/asset_publisher/biezacewyjasnieniakomorekmerytorycznych/content/id/13660998).

Te same odsyłacze są dostępne w dialogu „Zasady i źródła” w aplikacji.

## Zakres informacji wykorzystanej w prototypie

Zmiany rozszerzają katalog okresów, które mogą mieć znaczenie dla stażu pracowniczego, m.in. o zlecenia i działalność gospodarczą. Stosowanie zmian rozpoczyna się 1.01.2026 w sektorze finansów publicznych i 1.05.2026 u pozostałych pracodawców. Zaliczenie zależy od właściwych dla danego okresu warunków i jego udokumentowania. Równoległe okresy nie oznaczają wielokrotnego zaliczenia tego samego upływu czasu. [Źródło: MRPiPS](https://www.gov.pl/web/rodzina/staz-pracy-qa).

ZUS opisuje elektroniczny wniosek USP dotyczący odpowiednich okresów ubezpieczenia. Nie każdy przypadek będzie potwierdzany takim zaświadczeniem: np. brak podlegania ubezpieczeniom przy zleceniu studenckim wymaga odrębnego wyjaśnienia dowodów. Nie traktujemy braku zaświadczenia jako automatycznego wykluczenia. [Źródło: ZUS](https://www.zus.pl/baza-wiedzy/biezace-wyjasnienia-komorek-merytorycznych/-/asset_publisher/biezacewyjasnieniakomorekmerytorycznych/content/id/13660998).

## Co faktycznie robi kod

- Nie podejmuje decyzji prawnych. Status jest jawnym założeniem fikcyjnego scenariusza.
- Oblicza długość sumy przedziałów dat, usuwając powtórzenia.
- Rozdziela nowe dni według kolejności prezentacji: uwzględnione w przykładzie → potencjalne → do weryfikacji. To porządek demonstracji, nie ustawowa hierarchia tytułów.
- Podaje dokładne liczby dni kalendarzowych z oboma końcami okresu włącznie. Nie jest to pełny prawny algorytm ustalania stażu ani uprawnień.
- Przybliża prezentację lat i miesięcy przez 365 dni / rok i 30 dni / miesiąc. Wyjaśnienie jest dostępne przy wyniku oraz w eksporcie.
- Nie wlicza kategorii „do weryfikacji” do kategorii potencjalnej.

Nie obliczamy prawa do urlopu, świadczeń, dodatków, emerytury ani terminów roszczeń. Nie utożsamiamy stażu pracowniczego z okresem składkowym do emerytury.

## Prawne TODO przed obsługą prawdziwych historii

| TODO     | Co wymaga analizy                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------- |
| TODO-L01 | Pełna kwalifikacja każdego rodzaju aktywności i odpowiednie przesłanki ustawowe                          |
| TODO-L02 | Różnice między podleganiem ubezpieczeniom a opłaceniem składek, zbiegi tytułów i przerwy                 |
| TODO-L03 | Zlecenia osób niepodlegających ubezpieczeniom, status studenta i wystarczalność dowodów                  |
| TODO-L04 | Ulgi, zawieszenia i inne szczególne okresy działalności oraz historyczne przepisy właściwe dla dat       |
| TODO-L05 | Staż ogólny, zakładowy, urlopowy i inne odmienne cele obliczania                                         |
| TODO-L06 | Przepisy przejściowe, terminy udokumentowania, rodzaj pracodawcy i daty skutków                          |
| TODO-L07 | Prawny sposób agregowania lat, miesięcy, dni i części okresów, zatwierdzony zestaw przypadków brzegowych |
| TODO-L08 | Dopuszczalne dowody, alternatywy dla zaświadczenia i tryb postępowania przy brakach                      |
| TODO-L09 | Przegląd przez specjalistę prawa pracy i aktualizacja źródeł przed każdym wydaniem                       |

Szczegóły niepewnych okresów zawierają dodatkowe TODO odnoszące się do konkretnego przykładu. Żadne zaznaczenie checklisty nie usuwa tych TODO ani nie zmienia statusu.
