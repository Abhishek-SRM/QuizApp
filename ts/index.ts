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

let questionHeading = document.getElementById("questionBar");
let quizOptionName = document.getElementsByClassName('arc_opt');
let rightansCount = document.getElementById('right');
let wrongansCount = document.getElementById('wrong');
let questionCount = document.getElementById('questionCount');
let finishbtn = document.getElementById("finishBtn");
let userOption = document.getElementById('userOption');
let quizOption = document.getElementById('quizOption');
let finishresult = document.getElementById('userScore');
let answerPage = document.getElementById('allAnswers');


let questionIndexCounter: number = 0;
let correctAnsCounter: number = 0;
let incorrectAnsCounter: number = 0;
let currentQuestion: number = 0;
let totalQuestion: number = 1;

let questionArray: string[] = [];
let answerArray: string[] = [];

let originalArray: string[];


window.onload = () => {
  const quizOption = document.getElementById('quizOption');
  if (userOption != null && quizOption != null && finishresult != null && answerPage != null) {
    userOption.style.display = 'block';
    quizOption.style.display = 'none';
    finishresult.style.display = 'none';
    answerPage.style.display = 'none';
    showAllAnswer
  }
};

function sortArrayRandomly(array: string[]) {
  return array.concat().sort(() => 0.5 - Math.random());
}

function generateQuestion(): string {
  var e = (document.getElementById("level")) as HTMLSelectElement;
  var sel = e.selectedIndex;
  var dflevel = e.options[sel];

  var e = (document.getElementById("qztype")) as HTMLSelectElement;
  var sel = e.selectedIndex;
  var category = e.options[sel];

  return (`https://opentdb.com/api.php?amount=1&category=${category.value}&difficulty=${dflevel.value}&type=multiple`)
}

function getConvertedData<T>(): Promise<T> {
  return fetch(
    generateQuestion(),
    {
      method: "GET",
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json().then((data) => data as T);
  });
}

function quizInit() {
  getConvertedData<RootObject>()
    .then((data: RootObject) => {
      originalArray = [data.results[0].correct_answer, data.results[0].incorrect_answers[0], data.results[0].incorrect_answers[1], data.results[0].incorrect_answers[2]];

      questionArray.push(data.results[0].question);
      answerArray.push(data.results[0].correct_answer);

      let ansarray: string[] = sortArrayRandomly([data.results[0].correct_answer, data.results[0].incorrect_answers[0], data.results[0].incorrect_answers[1], data.results[0].incorrect_answers[2]]);
      questionHeading!.innerHTML = data.results[0].question;

      quizOptionName[0]!.innerHTML = ansarray[0];
      quizOptionName[1]!.innerHTML = ansarray[1];
      quizOptionName[2]!.innerHTML = ansarray[2];
      quizOptionName[3]!.innerHTML = ansarray[3];

      rightansCount!.innerHTML = String(correctAnsCounter);
      wrongansCount!.innerHTML = String(incorrectAnsCounter);
      questionCount!.innerHTML = String(totalQuestion);


    })
    .catch((error) => {
      /* show error message */
    });
}

function checker(index: number) {
  let status: boolean;
  let userAns: string = quizOptionName[index].innerHTML;
  status = checkUserChoice(userAns, index);

  totalQuestion = totalQuestion + 1;
  if (status) {
    correctAnsCounter = correctAnsCounter + 1;
    rightansCount!.innerHTML = String(correctAnsCounter);
  } else {
    incorrectAnsCounter = incorrectAnsCounter + 1;
    wrongansCount!.innerHTML = String(incorrectAnsCounter);
  }

}

let strtBtn = document.getElementById("startquiz");
strtBtn?.addEventListener("click", () => {
  if (userOption != null && quizOption != null && finishbtn != null) {
    userOption.style.display = 'none';
    quizOption.style.display = 'block';
    finishbtn.style.display = 'none';
    quizInit();
  }
});

let nextbtn = document.getElementById("nextBtn");
nextbtn?.addEventListener("click", () => {

  console.log(questionArray);
  if (totalQuestion <= 2) {
    quizInit();
    refresh();
  }
  else {
    if (finishbtn != null && nextbtn != null) {
      finishbtn.style.display = 'block';
      nextbtn.style.display = 'none';
    }
  }
});

finishbtn?.addEventListener("click", () => {

  if (userOption != null && quizOption != null && finishresult != null) {
    userOption.style.display = 'none';
    quizOption.style.display = 'none';
    finishresult.style.display = 'block';
  }

  let percecntage: number = 0;
  let percentind = document.getElementsByClassName('progress-bar');

  if (correctAnsCounter != 0) {
    percecntage = (correctAnsCounter / totalQuestion) * 100;
  }
  console.log(percecntage);

  let remark: string = ' ';
  if (percecntage >= 80) {
    remark = "Awesome";
  }
  else if (percecntage >= 40) {
    remark = "Great";
  }
  else if (percecntage <= 40) {
    remark = "Practice More";
  }

  document.querySelector('h6.text-body.text-success')!.innerHTML = String(correctAnsCounter);
  document.querySelector('h6.text-body.text-danger')!.innerHTML = String(incorrectAnsCounter);
  document.querySelector('.banner-start h3')!.innerHTML = String(remark);

});

function checkUserChoice(userAns: string, index: number): boolean {
  let isCorrect: boolean = false;
  if (userAns == originalArray[1]) {
    quizOptionName[index].classList.add("correct");
    isCorrect = true;
  }
  else {
    quizOptionName[index].classList.add("incorrect");
    isCorrect = false;
  }
  for (let i = 0; i <= 3; i++) {
    quizOptionName[i].classList.add("disabled");
  }
  return isCorrect;
}

function refresh() {
  for (let i = 0; i < quizOptionName.length; i++) {
    quizOptionName[i].classList.remove('correct');
    quizOptionName[i].classList.remove('incorrect');
    quizOptionName[i].classList.remove('disabled');
  }
}

function showAllAnswer() {
  if (userOption != null && quizOption != null && finishbtn != null && answerPage != null) {
    userOption.style.display = 'none';
    quizOption.style.display = 'none';
    finishbtn.style.display = 'none';
    answerPage.style.display = 'block';
    let questiondta = document.querySelector('div.col-lg-9 h1');
    for (let i = 0; i <= questionArray.length; i++) {
      questiondta!.innerHTML = questionArray[i];
    }
  }
}



