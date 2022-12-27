export interface quiz {
  response_code: number;
  results?: ResultsEntity[] | null;
}
export interface ResultsEntity {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers?: string[] | null;
}
