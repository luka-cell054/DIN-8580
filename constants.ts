
import { Question, QuestionType } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: QuestionType.MULTIPLE_CHOICE,
    text: "Was ist der primäre Zweck der DIN 8580?",
    options: [
      "Festlegung von Sicherheitsschrauben",
      "Einteilung aller Fertigungsverfahren in Hauptgruppen",
      "Normung von Maschinenelementen",
      "Regelung der Arbeitszeit in der Produktion"
    ],
    correctAnswer: "Einteilung aller Fertigungsverfahren in Hauptgruppen",
    explanation: "Die DIN 8580 dient der systematischen Einteilung aller Fertigungsverfahren nach gemeinsamen Merkmalen in sechs Hauptgruppen."
  },
  {
    id: 2,
    type: QuestionType.MULTIPLE_CHOICE,
    text: "Welches dieser Verfahren gehört zur Hauptgruppe 'Urformen'?",
    options: [
      "Bohren",
      "Gießen",
      "Schweißen",
      "Löten"
    ],
    correctAnswer: "Gießen",
    explanation: "Urformen ist das Fertigen eines festen Körpers aus formlosem Stoff (z.B. Schmelze beim Gießen) durch Schaffen des Zusammenhalts."
  },
  {
    id: 3,
    type: QuestionType.TRUE_FALSE,
    text: "Trennen ist das Ändern der Form eines festen Körpers unter Beibehaltung der Masse und des Zusammenhalts.",
    correctAnswer: "false",
    explanation: "Falsch. Das ist die Definition von Umformen. Trennen ist das Ändern der Form durch Vermindern des Zusammenhalts (z.B. Zerspanen)."
  },
  {
    id: 4,
    type: QuestionType.MULTIPLE_CHOICE,
    text: "Zu welcher Hauptgruppe gehört das 'Schweißen'?",
    options: [
      "Stoffeigenschaften ändern",
      "Umformen",
      "Fügen",
      "Beschichten"
    ],
    correctAnswer: "Fügen",
    explanation: "Fügen ist das dauerhafte Verbinden von zwei oder mehr Werkstücken, wozu das Schweißen als stoffschlüssiges Verfahren zählt."
  },
  {
    id: 5,
    type: QuestionType.TRUE_FALSE,
    text: "Beim Umformen bleibt die Masse des Werkstücks näherungsweise gleich.",
    correctAnswer: "true",
    explanation: "Richtig. Umformen ist das plastische Ändern der Form ohne Wegnahme von Material (Masse bleibt gleich)."
  },
  {
    id: 6,
    type: QuestionType.MULTIPLE_CHOICE,
    text: "Welches Verfahren gehört zur Hauptgruppe 'Stoffeigenschaften ändern'?",
    options: [
      "Härten",
      "Lackieren",
      "Sägen",
      "Walzen"
    ],
    correctAnswer: "Härten",
    explanation: "Härten ändert das Gefüge des Werkstoffs und damit seine mechanischen Eigenschaften, ohne die äußere Form wesentlich zu verändern."
  },
  {
    id: 7,
    type: QuestionType.TRUE_FALSE,
    text: "Beschichten ist das Aufbringen einer fest haftenden Schicht aus formlosem Stoff auf ein Werkstück.",
    correctAnswer: "true",
    explanation: "Richtig. Typische Beispiele sind Lackieren, Galvanisieren oder Pulverbeschichten."
  },
  {
    id: 8,
    type: QuestionType.MULTIPLE_CHOICE,
    text: "In welche Hauptgruppe lässt sich das 'Fräsen' einordnen?",
    options: [
      "Urformen",
      "Trennen",
      "Umformen",
      "Beschichten"
    ],
    correctAnswer: "Trennen",
    explanation: "Fräsen ist ein spanendes Fertigungsverfahren und gehört somit zur Hauptgruppe Trennen (Vermindern des Zusammenhalts)."
  },
  {
    id: 9,
    type: QuestionType.TRUE_FALSE,
    text: "Die DIN 8580 unterscheidet insgesamt 8 Hauptgruppen.",
    correctAnswer: "false",
    explanation: "Falsch. Die DIN 8580 definiert genau 6 Hauptgruppen: Urformen, Umformen, Trennen, Fügen, Beschichten und Stoffeigenschaften ändern."
  },
  {
    id: 10,
    type: QuestionType.MULTIPLE_CHOICE,
    text: "Welches dieser Verfahren ist KEIN Trennverfahren?",
    options: [
      "Drehen",
      "Schleifen",
      "Erodieren",
      "Kleben"
    ],
    correctAnswer: "Kleben",
    explanation: "Kleben gehört zur Hauptgruppe 'Fügen', da hier Werkstücke miteinander verbunden werden, statt Material abzutrennen."
  }
];
