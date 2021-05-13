let nextBtn = document.getElementById('nextBtn');
let questionContainer = document.getElementById('question-container');
let answerList = document.getElementById('list');
let listItem = document.getElementById("classItem");
const confirmBtn = document.getElementById("confirmBtn");
let currentSelection = [];
let preferredGenre = [];
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
    a.innerHTML += `<li class="classItem" value="${item}" onclick="selectTest('${item}')">${item}</li>`;
}

function selectTest(value) {
    console.log(value);
    if (currentSelection.includes(value) === false) {
        currentSelection.push(value)
    }
    let listItems = document.getElementsByClassName("classItem");
    let thisItem;
    Object.values(listItems).forEach(item => {
        if (item.getAttribute("value") == value) {
            thisItem = item;
        }
    });
    thisItem.setAttribute("style", "background-color: lightblue");
}

function submitTest() {
    preferredGenre = preferredGenre.concat(currentSelection)
    currentSelection = [];
    if (i === quiz.questions.length - 1) {
        endQuiz();
    } else {
        i++;
        console.log(preferredGenre);
        renderQuestion();
    }
}

function endQuiz() {
    document.getElementById("quiz-box").innerHTML = "<h3>" + preferredGenre.join(' ') + "</h3>" +
        "<button class='p-2 rounded text-white bg-blue-400 w-24 my-2' id='confirmBtn' type='button' onclick='viewResults()'>" + "Confirm" + "</button>"

}

const postToPreferences = async(e) => {
    console.log(preferredGenre);

    const response = await fetch('/api/preferences', {
        method: 'POST',
        body: JSON.stringify({ preferredGenre }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('failure to post');
    }
}


function viewResults() {
    console.log("click works");
    postToPreferences();

}



renderQuestion();