let nextBtn = document.getElementById('nextBtn');
let questionContainer = document.getElementById('question-container');
let answerList = document.getElementById('list');

let listItem = document.getElementById("classItem");


let typeAnswer;
let genreAnswer = [];


let quiz = {
    questions: [{
            question: "What type of anime do you enjoy watching?",
            options: ["Shounen", "Shoujo", "Any"],
            selectedAnswer: typeAnswer
        },
        {
            question: "What is your preferred anime genre?",
            options: ["Action", "Horror", "Fantasy", "Comedy", "Drama", "Psychological", "Romance", "Mystery"],
            selectedAnswer: genreAnswer
        },
        {
            question: "What type of anime do you enjoy watching?",
            options: ["Shounen", "Shoujo", "Any"],
            selectedAnswer: typeAnswer
        },
    ],
}



i = 0;
optionsArray = quiz.questions[i].options;
questionsArray = quiz.questions[i].question;
let q = questionContainer;
let a = answerList;

function renderQuestion() {

    q.innerHTML = "<p>" + quiz.questions[i].question + "</p";

    optionsArray.forEach(addListItem);
    console.log(optionsArray);
}

function addListItem(item) {
    document.getElementById(a.innerHTML += `<li id="classItem">${item}</li>`);

    selectChoices();
}



// q.innerHTML = quiz.questions[current].question;
// a.innerHTML = quiz.questions[current].options;


function next() {
    removeOldListItems();
    let current = 0;
    let questionIndex = current + 1;

    if (current < quiz.questions.length - 1) {
        current++;
        questionIndex = current + 1;
        q.innerHTML = quiz.questions[current].question;
    }
    if (current < quiz.questions[current].options.length - 1) {

        let opArray = quiz.questions[current].options;
        opArray.forEach(addNextItem);

        function addNextItem(item) {


            document.getElementById(a.innerHTML += `<li id="classItem">${item}</li>`);
        }

    }



}

function removeOldListItems() {
    let e = document.querySelector("ul");
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function selectChoices() {
    document.querySelector('#list')
        .addEventListener('click', event => {
            let target = event.target;
            if (target.matches('li')) {
                let value = target.innerHTML
                console.log(value);
            }
        });

};




renderQuestion();