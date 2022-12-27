interface Result {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}
interface RootObject {
    response_code: number;
    results: Result[];
}
declare let questionHeading: HTMLElement | null;
declare let quizOptionName: HTMLCollectionOf<Element>;
declare let rightansCount: HTMLElement | null;
declare let wrongansCount: HTMLElement | null;
declare let questionCount: HTMLElement | null;
declare let finishbtn: HTMLElement | null;
declare let userOption: HTMLElement | null;
declare let quizOption: HTMLElement | null;
declare let finishresult: HTMLElement | null;
declare let answerPage: HTMLElement | null;
declare let questionIndexCounter: number;
declare let correctAnsCounter: number;
declare let incorrectAnsCounter: number;
declare let currentQuestion: number;
declare let totalQuestion: number;
declare let questionArray: string[];
declare let answerArray: string[];
declare let originalArray: string[];
declare function sortArrayRandomly(array: string[]): string[];
declare function generateQuestion(): string;
declare function getConvertedData<T>(): Promise<T>;
declare function quizInit(): void;
declare function checker(index: number): void;
declare let strtBtn: HTMLElement | null;
declare let nextbtn: HTMLElement | null;
declare function checkUserChoice(userAns: string, index: number): boolean;
declare function refresh(): void;
declare function showAllAnswer(): void;
