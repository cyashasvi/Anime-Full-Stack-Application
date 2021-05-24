let nextBtn = document.getElementById('nextBtn');
let questionContainer = document.getElementById('question-container');
let answerList = document.getElementById('list');
let listItem = document.getElementById("classItem");
const confirmBtn = document.getElementById("confirmBtn");
let currentSelection = [];
let preferredGenre = [];
let quiz = {
    questions: [{
            question: "What type of anime do you enjoy watching? (choose one)",
            options: ["Shounen", "Shoujo"],
        },
        {
            question: "What is your preferred anime genre? (can choose multiple)",
            options: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Game", "Historical", "Horror", "Magic", "Military", "Mystery", 
                      "Parody", "Psychological", "Romance", "School", "Supernatural"],
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
    thisItem.setAttribute("style", "background-color: rgb(201, 218, 248)");
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
    document.getElementById("quiz-box").innerHTML = "<div id='genGenre'>" + "<h3>" + preferredGenre.join(' ') + "</h3>" +
        "<button class='p-2 rounded text-white bg-indigo-800 w-24 my-2' id='confirmBtn' type='button' onclick='viewResults()'>" + "Confirm" + "</button>" + "</div>"

}

const postToPreferences = async(e) => {
    console.log(preferredGenre);

    const response = await fetch('/api/preferences', {
        method: 'POST',
        body: JSON.stringify({ preferredGenre }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log("OK")
    } else {
        alert('failure to post');
    }

}

const getAnimeList = async(e) => {
<<<<<<< HEAD

    const prefereces = await fetch('/api/preferences').then(response => response.json())
    if (!prefereces.preferredGenre) {
        console.log("SOMETHING IS UP")
        return
    }
    const genres = prefereces.preferredGenre.split(',')
    console.log("==> ", genres)
=======
    console.log("preferredGenre in getAnimeList: ", preferredGenre);
    // const preferences = await fetch('/api/preferences').then(response => response.json())
    // console.log(preferences);
    // if(!preferences) {
    //     console.log("SOMETHING IS UP")
    //     return 
    // }
    // const genres = preferences.preferredGenre.split(',')
    // console.log("==> ", genres)
>>>>>>> 9adae500904837b5f6daea22d458751b766484c9

    const quizBox = $("#quiz-box")
    const grid = $(`<div id="genre-grid"> </div>`)
    $(quizBox).append(grid)
    const g = $("#genre-grid")

    // clearQuixBox();
    // ---------------------------------------------------------------------- //
    // create a grid of size 4 x4 
    // ==> row with 4 columns (flexed so it is mobile friendly)
    // ==> just a div with the appropiate css properties 
    // ==> per genre, create a "card"
    // ==> in that card put the animes in there
    // ==> once you are 

    // preferredGenres.map(genre => fetch)
    preferredGenre.map(genre => fetch('/api/anime/genre/' + genre).then(r => r.json()).then(data => {
        console.log("preferred genre fetch", data)
        // render the returned data
        const column = $(`<div id="${genre}-card">
                <h1 class="font-extrabold border-2 border-black bg-indigo-200" data-genre="${genre}" > ${genre} </h1>
                    <div class="divider" />
                    <div id="animes-${genre}">
                    </div>
             </div>`)
            $(g).append(column)
            const genreCard = $(`#animes-${genre}`)
            for (let i = 0; i < data.length; i++) {
                const item = $(`<div class="animeName cursor-pointer" id="${data[i].name}" onclick="window.open('http://google.com/search?q=Where+to+watch+${data[i].name}+anime','_blank')"> ${data[i].name } </div>`)
                $(genreCard).append(item)
            }
    }));

    // genres.map(genre => {
    //     // returns 10 anims per genre 
    //     fetch('/api/anime/genre/' + genre).then(r => r.json()).then(data => {
    //         const column = $(`<div id="${genre}-card">
    //             <h1 class="font-extrabold border-2 border-black bg-indigo-200" data-genre="${genre}" > ${genre} </h1>
    //                 <div class="divider" />
    //                 <div id="animes-${genre}">
    //                 </div>
    //          </div>`)
    //         $(g).append(column)

    //         $(`.bg-indigo-200`).click( (event) => {
    //             console.log("clicked")
    //            const genre = event.target.getAttribute("data-genre")
    //            fetch(`/api/anime/single/${genre}`)
    //         })

    //         const genreCard = $(`#animes-${genre}`)

    //         for (let i = 0; i < data.length; i++) {
    //             const name = data[i].name
    //             const item = $(`<div class="animeName cursor-pointer" id="${data[i].name}" onclick="window.open('http://google.com/search?q=Where+to+watch+${data[i].name}+anime','_blank')"> ${data[i].name } </div>`)
    //             $(genreCard).append(item)
    //         }
    //         console.log(data) // array of anime per genre 
    //     })
    // })

    // const response = await fetch('/api/genre/:genre', {

    //     method: 'GET',
    //     body: JSON.stringify({ preferredGenre }),
    //     headers: { 'Content-Type': 'application/json' },
    // });

    // if (response.ok) {
    //     document.location.replace('/');
    // } else {
    //     alert('failure to post');
    // }
}


function viewResults(e) {

    console.log("click works");
    postToPreferences();

    getAnimeList();

}

function clearQuixBox() {
    const gen = $("#genGenre");
    gen.html("");
}





renderQuestion();