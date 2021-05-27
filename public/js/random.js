var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      english
      native
    }
    coverImage {
      large
    }
  }
}
`;
// Create random number
var randNum = Math.floor(Math.random() * 2000);
// Define our query variables and values that will be used in the query request
var variables = {
    id: randNum
};
// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
// Make the HTTP Api request
fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError);
// Handles the fetch
function handleResponse(response) {
    return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
    });
}
// What runs if fetch is successful
function handleData(data) {
    // If the title / cover image is not null, the code inside try will run
    try {
        let animeTitle
        if (data.data.Media.title.english == null) {
            // If there's no English title, we use the Japanese
            animeTitle = data.data.Media.title.native
        } else if (data.data.Media.title.english == null && data.data.Media.title.native == null) {
            // If there's no English OR Japanese, we display Title Not Found
            animeTitle = "Title Not Found"
        } else {
            // Default english title display
            animeTitle = data.data.Media.title.english
        }
        // Grabs the HTML element and adds the title and image
        document.getElementById("anime-img").src = data.data.Media.coverImage.large
        document.getElementById("anime-title").innerHTML = animeTitle
        document.getElementById("anime-img").onclick = () => (window.open(`http://google.com/search?q=Where+to+watch+${animeTitle}+anime`))
    } catch (e) {
        // This runs if information missing or error
        document.getElementById("anime-img").src = "https://image.api.playstation.com/vulcan/img/rnd/202010/1520/EfaKUXGWULuDpnL0Ai0eujhs.png"
        document.getElementById("anime-title").innerHTML = "Attack on Titan"
        document.getElementById("anime-img").onclick = () => (window.open('http://google.com/search?q=Where+to+watch+Attack+On+Titan+anime'))
    }
}
// This runs if fetch results in a 404 / 400 error
function handleError(error) {
    console.error(error);
    document.getElementById("anime-img").src = "https://image.api.playstation.com/vulcan/img/rnd/202010/1520/EfaKUXGWULuDpnL0Ai0eujhs.png"
    document.getElementById("anime-title").innerHTML = "Attack on Titan"
    document.getElementById("anime-img").onclick = () => (window.open('http://google.com/search?q=Where+to+watch+Attack+On+Titan+anime'))
}