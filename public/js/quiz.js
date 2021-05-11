let nextBtn = document.getElementById('nextBtn');
let questionContainer = document.getElementById('question-container');
let answerList = document.getElementById('list');

let listItem = document.getElementById("classItem");


let currentSelection = [];
let genreAnswer = [];


let quiz = {
    questions: [{
            question: "What type of anime do you enjoy watching?",
            options: ["Shounen", "Shoujo"],
        },
        {
            question: "What is your preferred anime genre?",
            options: ["Action", "Horror", "Fantasy", "Comedy", "Drama", "Psychological", "Romance", "Mystery"],
        },
    ],
}



let i = 0;
optionsArray = quiz.questions[i].options;
questionsArray = quiz.questions[i].question;
let q = questionContainer;
let a = answerList;

function renderQuestion() {
    let currentOptions = quiz.questions[i].options;
    q.innerHTML = "<p>" + quiz.questions[i].question + "</p>";
    a.innerHTML = "";
    currentOptions.forEach(addListItem);
    console.log(currentOptions);
}

function addListItem(item) {
    a.innerHTML += `<li class="classItem" onclick="selectTest('${item}')">${item}</li>`;


}





// function selectChoices() {
//     document.querySelector('#list')
//         .addEventListener('click', event => {
//             let target = event.target;
//             target.setAttribute("style", "background-color: lightblue");
//             if (target.matches('li')) {
//                 let value = target.innerHTML
//                 console.log(value);
//             }
//         });

// };

function selectTest(value) {
    console.log(value);
    if (currentSelection.includes(value) === false) {
        currentSelection.push(value)

    }
}

function submitTest() {
    genreAnswer = genreAnswer.concat(currentSelection)
    currentSelection = [];
    if (i === quiz.questions.length - 1) {
        endQuiz();
    } else {
        i++;
        console.log(genreAnswer);
        renderQuestion();
    }
}

function endQuiz() {
    document.getElementById("quiz-box").innerHTML = "<h3>" + genreAnswer + "</h3>"
}

console.log(quiz.questions.length);
renderQuestion();