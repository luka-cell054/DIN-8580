
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE'
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface QuizResult {
  questionId: number;
  isCorrect: boolean;
  timestamp: number;
}

export type ViewState = 'START' | 'QUIZ' | 'RESULT' | 'TEACHER';
