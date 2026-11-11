import { legalSources } from "./legal";

export interface DocumentGuidance {
  nextAction: string;
  steps: string[];
  source: (typeof legalSources)[number];
}

const ministrySource = legalSources[1];
const zusSource = legalSources[2];

const insuranceEvidence: DocumentGuidance = {
  nextAction: "Sprawdź w instrukcji ZUS, jak ustalić dokument dla tego okresu.",
  steps: [
    "Otwórz poniższe wyjaśnienia ZUS i sprawdź, czy opis wniosku USP dotyczy szukanego okresu.",
    "Porównaj daty i tytuł ubezpieczenia z okresem, który chcesz wyjaśnić.",
    "Jeśli nie wiesz, jaki dokument może zostać wydany, ustal to z ZUS i omów dalsze dowody z pracodawcą.",
  ],
  source: zusSource,
};

const contractEvidence: DocumentGuidance = {
  nextAction:
    "Ustal ze zleceniodawcą, jak potwierdzić faktyczne wykonywanie umowy.",
  steps: [
    "Sprawdź, czy zachowała się umowa oraz korespondencja lub inne potwierdzenia wykonywania zlecenia.",
    "Jeżeli dokumentów brakuje, zapytaj zleceniodawcę o potwierdzenie rodzaju współpracy i dokładnych dat.",
    "Omów z pracodawcą, czy zgromadzone dowody wystarczą do oceny tego okresu.",
  ],
  source: ministrySource,
};

const previousEmployment: DocumentGuidance = {
  nextAction: "Sprawdź, gdzie uzyskać dokumentację poprzedniego zatrudnienia.",
  steps: [
    "Poszukaj dokumentacji z zakończonego zatrudnienia i sprawdź zapisane w niej daty.",
    "Jeśli dokumentu nie masz, skontaktuj się z byłym pracodawcą, aby ustalić możliwość jego uzyskania.",
    "Porównaj otrzymane informacje z dokumentacją obecnego pracodawcy.",
  ],
  source: ministrySource,
};

const currentEmployment: DocumentGuidance = {
  nextAction: "Ustal z pracodawcą, jakie dane są już w dokumentacji kadrowej.",
  steps: [
    "Sprawdź datę rozpoczęcia zatrudnienia w dostępnych dokumentach.",
    "Poproś pracodawcę o wskazanie, jakie okresy są już uwzględnione w Twojej historii.",
    "Zapisz rozbieżności do wyjaśnienia przed oceną dodatkowych okresów.",
  ],
  source: ministrySource,
};

const studentStatus: DocumentGuidance = {
  nextAction: "Ustal dokumenty dotyczące statusu studenta w czasie zlecenia.",
  steps: [
    "Sprawdź, jakie daty statusu ucznia lub studenta trzeba wyjaśnić dla wskazanego okresu.",
    "Ustal z uczelnią lub szkołą, jakie potwierdzenie tych informacji możesz uzyskać.",
    "Omów z pracodawcą podstawę niepodlegania ubezpieczeniom i potrzebne dowody. Brak zaświadczenia ZUS sam nie rozstrzyga oceny okresu.",
  ],
  source: ministrySource,
};

const earlyBusiness: DocumentGuidance = {
  nextAction:
    "Wyjaśnij tytuł ubezpieczenia w początkowych miesiącach działalności.",
  steps: [
    "Zestaw dokładne daty prowadzenia działalności i informacje o ewentualnych przerwach.",
    "Sprawdź dostępne dokumenty dotyczące ubezpieczenia i opłacania składek; brakujące informacje omów z ZUS.",
    "Ustal z pracodawcą, jakie dowody i wyjaśnienia są jeszcze potrzebne. Ten przypadek pozostaje do weryfikacji.",
  ],
  source: zusSource,
};

const businessDates: DocumentGuidance = {
  nextAction:
    "Odtwórz daty działalności, a następnie sprawdź je z pozostałymi dowodami.",
  steps: [
    "Sprawdź historię wpisu CEIDG, w szczególności rozpoczęcie działalności i zawieszenia.",
    "Porównaj daty z dokumentami dotyczącymi ubezpieczenia i składek.",
    "Przedstaw rozbieżności pracodawcy do wyjaśnienia. Sam wpis nie potwierdza wszystkich warunków zaliczenia okresu.",
  ],
  source: ministrySource,
};

const uncertainCooperation: DocumentGuidance = {
  nextAction: "Najpierw ustal rodzaj współpracy i jej rzeczywiste daty.",
  steps: [
    "Odszukaj umowę lub korespondencję dotyczącą dodatkowej współpracy.",
    "Poproś drugą stronę o wyjaśnienie rodzaju umowy i dat wykonywania pracy.",
    "Omów warunki i dowody z pracodawcą. Samo uzupełnienie dokumentów nie zmienia statusu tego okresu w demonstracji.",
  ],
  source: ministrySource,
};

const generalEvidence: DocumentGuidance = {
  nextAction: "Ustal z pracodawcą, jaki dokument wyjaśni ten konkretny brak.",
  steps: [
    "Zapisz nazwę brakującego dokumentu i okres, którego dotyczy.",
    "Ustal z pracodawcą potrzebny zakres potwierdzenia i właściwego wystawcę.",
    "Sprawdź sposób uzyskania dokumentu u wskazanego wystawcy. Aplikacja nie wystawia zaświadczeń.",
  ],
  source: ministrySource,
};

// Explicitly authored guidance for the local fiction, not rules inferred from
// document titles, the kind of contract, or declarations made in the interface.
const guidanceByDocumentId: Record<string, DocumentGuidance> = {
  "kasia-student-contract": contractEvidence,
  "kasia-student-status": studentStatus,
  "kasia-contract-zus": insuranceEvidence,
  "kasia-contract-agreement": contractEvidence,
  "kasia-job-certificate": previousEmployment,
  "kasia-job-current": currentEmployment,
  "marek-early-evidence": earlyBusiness,
  "marek-business-zus": insuranceEvidence,
  "marek-business-ceidg": businessDates,
  "marek-job-certificate": currentEmployment,
  "ola-job-certificate": previousEmployment,
  "ola-contract-zus": insuranceEvidence,
  "ola-contract-agreement": contractEvidence,
  "ola-review-docs": uncertainCooperation,
  "ola-current-docs": currentEmployment,
};

export function getDocumentGuidance(documentId: string): DocumentGuidance {
  return guidanceByDocumentId[documentId] ?? generalEvidence;
}
