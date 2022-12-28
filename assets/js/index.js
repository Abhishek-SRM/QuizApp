"use strict";
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
let questionIndexCounter = 0;
let correctAnsCounter = 0;
let incorrectAnsCounter = 0;
let currentQuestion = 0;
let totalQuestion = 1;
let questionArray = [];
let answerArray = [];
let originalArray;
window.onload = () => {
    const quizOption = document.getElementById('quizOption');
    if (userOption != null && quizOption != null && finishresult != null && answerPage != null) {
        userOption.style.display = 'block';
        quizOption.style.display = 'none';
        finishresult.style.display = 'none';
        answerPage.style.display = 'none';
        showAllAnswer;
    }
};
function sortArrayRandomly(array) {
    return array.concat().sort(() => 0.5 - Math.random());
}
function generateQuestion() {
    var e = (document.getElementById("level"));
    var sel = e.selectedIndex;
    var dflevel = e.options[sel];
    var e = (document.getElementById("qztype"));
    var sel = e.selectedIndex;
    var category = e.options[sel];
    return (`https://opentdb.com/api.php?amount=1&category=${category.value}&difficulty=${dflevel.value}&type=multiple`);
}
function getConvertedData() {
    return fetch(generateQuestion(), {
        method: "GET",
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json().then((data) => data);
    });
}
function quizInit() {
    getConvertedData()
        .then((data) => {
        originalArray = [data.results[0].correct_answer, data.results[0].incorrect_answers[0], data.results[0].incorrect_answers[1], data.results[0].incorrect_answers[2]];
        questionArray.push(data.results[0].question);
        answerArray.push(data.results[0].correct_answer);
        let ansarray = sortArrayRandomly([data.results[0].correct_answer, data.results[0].incorrect_answers[0], data.results[0].incorrect_answers[1], data.results[0].incorrect_answers[2]]);
        questionHeading.innerHTML = data.results[0].question;
        quizOptionName[0].innerHTML = ansarray[0];
        quizOptionName[1].innerHTML = ansarray[1];
        quizOptionName[2].innerHTML = ansarray[2];
        quizOptionName[3].innerHTML = ansarray[3];
        rightansCount.innerHTML = String(correctAnsCounter);
        wrongansCount.innerHTML = String(incorrectAnsCounter);
        questionCount.innerHTML = String(totalQuestion);
    })
        .catch((error) => {
    });
}
function checker(index) {
    let status;
    let userAns = quizOptionName[index].innerHTML;
    status = checkUserChoice(userAns, index);
    totalQuestion = totalQuestion + 1;
    if (status) {
        correctAnsCounter = correctAnsCounter + 1;
        rightansCount.innerHTML = String(correctAnsCounter);
    }
    else {
        incorrectAnsCounter = incorrectAnsCounter + 1;
        wrongansCount.innerHTML = String(incorrectAnsCounter);
    }
}
let strtBtn = document.getElementById("startquiz");
strtBtn === null || strtBtn === void 0 ? void 0 : strtBtn.addEventListener("click", () => {
    if (userOption != null && quizOption != null && finishbtn != null) {
        userOption.style.display = 'none';
        quizOption.style.display = 'block';
        finishbtn.style.display = 'none';
        quizInit();
    }
});
let nextbtn = document.getElementById("nextBtn");
nextbtn === null || nextbtn === void 0 ? void 0 : nextbtn.addEventListener("click", () => {
    let userResponse = ' ';
    for (let i = 0; i < quizOptionName.length; i++) {
        if (quizOptionName[i].classList.contains('correct') || quizOptionName[i].classList.contains('incorrect')) {
            userResponse = 'OK';
        }
    }
    if (userResponse == 'OK') {
        if (totalQuestion <= 10) {
            quizInit();
            refresh();
        }
        else {
            if (finishbtn != null && nextbtn != null) {
                finishbtn.style.display = 'block';
                nextbtn.style.display = 'none';
            }
        }
    }
    else {
        window.alert('Choose Atleast one Option');
    }
});
finishbtn === null || finishbtn === void 0 ? void 0 : finishbtn.addEventListener("click", () => {
    if (userOption != null && quizOption != null && finishresult != null) {
        userOption.style.display = 'none';
        quizOption.style.display = 'none';
        finishresult.style.display = 'block';
    }
    let percecntage = 0;
    let percentind = document.getElementsByClassName('progress-bar');
    if (correctAnsCounter != 0) {
        percecntage = (correctAnsCounter / totalQuestion) * 100;
    }
    console.log(percecntage);
    let remark = ' ';
    if (percecntage >= 80) {
        remark = "Awesome";
    }
    else if (percecntage >= 40) {
        remark = "Great";
    }
    else if (percecntage <= 40) {
        remark = "Practice More";
    }
    document.querySelector('h6.text-body.text-success').innerHTML = String(correctAnsCounter);
    document.querySelector('h6.text-body.text-danger').innerHTML = String(incorrectAnsCounter);
    document.querySelector('.banner-start h3').innerHTML = String(remark);
});
function checkUserChoice(userAns, index) {
    let isCorrect = false;
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
    if (userOption != null && quizOption != null && finishresult != null && answerPage != null) {
        userOption.style.display = 'none';
        quizOption.style.display = 'none';
        finishresult.style.display = 'none';
        answerPage.style.display = 'block';
        let questionData = document.getElementsByTagName("button");
        let answerData = document.getElementsByClassName('answer');
        for (let i = 0; i < questionArray.length; i++) {
            questionData[i].innerHTML = questionArray[i];
            answerData[i].innerHTML = answerArray[i];
        }
    }
}
//# sourceMappingURL=index.js.map