document.addEventListener("DOMContentLoaded", function() {

    const getPrefList = async() => {

        const prefereces = await fetch('/api/preferences').then(response => response.json())
        const genres = prefereces.preferredGenre.split(',')
        console.log("==> ", genres)

        const quizBox = $("#quiz-box")
        const grid = $(`<div class = "row" id="genre-grid"> </div>`)
        $(quizBox).append(grid)
        const g = $("#genre-grid")

        genres.map(genre => {
            // returns 10 anims per genre 
            fetch('/api/anime/genre/' + genre).then(r => r.json()).then(async data => {
                const column = $(`<div class = "indigo lighten-3 col s6" id="${genre}-card">
                    <h1 class="font-extrabold border-2 border-black bg-indigo-200"> ${genre} </h1>
                        <div class="divider" />
                        <div id="animes-${genre}">
                        </div>
                 </div>`)
                $(g).append(column)

                const genreCard = $(`#animes-${genre}`)
                for (let i = 0; i < data.length; i++) {
                    var animeData = data;
                    var animeName = animeData[i].name;
                    var animeNameClean = animeName.trim()
                    const item = $(`<div class="animeName cursor-pointer"  id="${animeData[i].name}" onclick="window.open('http://google.com/search?q=Where+to+watch+${data[i].name}+anime','_blank')"> <img src="" class="genreImage" id="g-img-${animeNameClean}">${data[i].name }</div>`)
                    $(genreCard).append(item)
                    getGridImage(animeData[i].name, animeNameClean);
                }
                console.log(data) // array of anime per genre

            })
        })
    }


    getPrefList();
});